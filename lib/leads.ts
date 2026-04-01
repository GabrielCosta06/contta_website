import { Pool } from "pg";

import { challengeOptions } from "@/lib/site-content";

const RESEND_API_URL = "https://api.resend.com/emails";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10,13}$/;

const challengeLabels = Object.fromEntries(
  challengeOptions.map((option) => [option.value, option.label])
) as Record<string, string>;

declare global {
  // eslint-disable-next-line no-var
  var __conttaLeadPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __conttaLeadTableReady: Promise<void> | undefined;
}

export type ContactChannel = "email" | "whatsapp";

export type LeadRecord = {
  name: string;
  company: string;
  challenge: string;
  challengeLabel: string;
  contact: string;
  contactChannel: ContactChannel;
  contactType: ContactChannel;
  consent: true;
  source: "website";
  page: string;
  submittedAt: string;
};

export class ValidationError extends Error {}

export function hasLeadDeliveryTarget() {
  const canSendEmail = Boolean(process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL);
  const canPersist = Boolean(process.env.DATABASE_URL);
  return canSendEmail || canPersist;
}

export function validateLeadPayload(payload: unknown): LeadRecord {
  if (!payload || typeof payload !== "object") {
    throw new ValidationError("Os dados enviados estão inválidos.");
  }

  const data = payload as Record<string, unknown>;
  const name = normalizeString(data.name);
  const company = normalizeString(data.company);
  const challenge = normalizeString(data.challenge);
  const contact = normalizeString(data.contact);
  const contactChannel = normalizeChannel(data.contactChannel);
  const page = normalizeString(data.page) || "/";
  const source = normalizeString(data.source) || "website";
  const submittedAt = normalizeSubmittedAt(data.submittedAt);

  if (name.length < 2) {
    throw new ValidationError("Informe um nome válido.");
  }

  if (company.length < 2) {
    throw new ValidationError("Informe uma empresa válida.");
  }

  if (!challengeLabels[challenge]) {
    throw new ValidationError("Selecione o principal desafio.");
  }

  if (!contactChannel) {
    throw new ValidationError("Escolha se prefere retorno por e-mail ou WhatsApp.");
  }

  if (!isValidContact(contact, contactChannel)) {
    throw new ValidationError(
      contactChannel === "email"
        ? "Informe um e-mail válido."
        : "Informe um WhatsApp com DDD válido."
    );
  }

  if (data.consent !== true) {
    throw new ValidationError("Autorize o contato comercial para enviar.");
  }

  if (source !== "website") {
    throw new ValidationError("A origem do envio está inválida.");
  }

  return {
    name,
    company,
    challenge,
    challengeLabel: challengeLabels[challenge],
    contact,
    contactChannel,
    contactType: contactChannel,
    consent: true,
    source: "website",
    page,
    submittedAt,
  };
}

export async function sendLeadEmail(lead: LeadRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = process.env.LEAD_TO_EMAIL || "contato@contta.com.br";

  if (!apiKey || !from) {
    return;
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Novo lead site Contta - ${lead.company}`,
      text: buildEmailText(lead),
      html: buildEmailHtml(lead),
      reply_to: lead.contactType === "email" ? lead.contact : undefined,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Resend request failed: ${response.status} ${details}`.trim());
  }
}

export async function persistLeadIfConfigured(lead: LeadRecord) {
  if (!process.env.DATABASE_URL) {
    return false;
  }

  const pool = getLeadPool();
  await ensureLeadTable(pool);

  await pool.query(
    `
      INSERT INTO website_leads (
        name,
        company,
        challenge,
        challenge_label,
        contact,
        contact_type,
        contact_channel,
        consent,
        source,
        page,
        submitted_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )
    `,
    [
      lead.name,
      lead.company,
      lead.challenge,
      lead.challengeLabel,
      lead.contact,
      lead.contactType,
      lead.contactChannel,
      lead.consent,
      lead.source,
      lead.page,
      lead.submittedAt,
    ]
  );

  return true;
}

function getLeadPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Missing DATABASE_URL.");
  }

  if (!globalThis.__conttaLeadPool) {
    globalThis.__conttaLeadPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      ssl: process.env.DATABASE_URL.includes("localhost")
        ? undefined
        : { rejectUnauthorized: false },
    });
  }

  return globalThis.__conttaLeadPool;
}

function ensureLeadTable(pool: Pool) {
  if (!globalThis.__conttaLeadTableReady) {
    globalThis.__conttaLeadTableReady = pool
      .query(
        `
          CREATE TABLE IF NOT EXISTS website_leads (
            id BIGSERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            company TEXT NOT NULL,
            challenge TEXT NOT NULL,
            challenge_label TEXT NOT NULL,
            contact TEXT NOT NULL,
            contact_type TEXT NOT NULL,
            contact_channel TEXT NOT NULL,
            consent BOOLEAN NOT NULL DEFAULT TRUE,
            source TEXT NOT NULL DEFAULT 'website',
            page TEXT NOT NULL DEFAULT '/',
            submitted_at TIMESTAMPTZ NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          )
        `
      )
      .then(() => undefined)
      .catch((error) => {
        globalThis.__conttaLeadTableReady = undefined;
        throw error;
      });
  }

  return globalThis.__conttaLeadTableReady;
}

function buildEmailText(lead: LeadRecord) {
  return [
    "Novo lead do site Contta",
    "",
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `Principal desafio: ${lead.challengeLabel}`,
    `Canal preferido: ${lead.contactChannel === "email" ? "E-mail" : "WhatsApp"}`,
    `Contato: ${lead.contact}`,
    `Origem: ${lead.source}`,
    `Página: ${lead.page}`,
    `Enviado em: ${lead.submittedAt}`,
    "",
    "Próxima etapa prometida ao lead: leitura inicial do cenário.",
  ].join("\n");
}

function buildEmailHtml(lead: LeadRecord) {
  const rows = [
    ["Nome", lead.name],
    ["Empresa", lead.company],
    ["Principal desafio", lead.challengeLabel],
    ["Canal preferido", lead.contactChannel === "email" ? "E-mail" : "WhatsApp"],
    ["Contato", lead.contact],
    ["Origem", lead.source],
    ["Página", lead.page],
    ["Enviado em", lead.submittedAt],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 12px;font-weight:700;border:1px solid #d8e3df;">${escapeHtml(
          label
        )}</td><td style="padding:10px 12px;border:1px solid #d8e3df;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  return [
    '<div style="font-family:Arial,sans-serif;color:#152327;background:#f6f3ec;padding:24px;">',
    '<div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d8e3df;border-radius:18px;padding:24px;">',
    '<p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0f766e;">Novo lead do site</p>',
    '<h1 style="margin:0 0 18px;font-size:28px;line-height:1.1;color:#0b3c36;">Contta Business</h1>',
    '<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#58676c;">O próximo passo prometido ao lead é uma leitura inicial do cenário com foco em margem, caixa e contexto fiscal.</p>',
    '<table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">',
    rows,
    "</table>",
    "</div>",
    "</div>",
  ].join("");
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeChannel(value: unknown): ContactChannel | null {
  return value === "email" || value === "whatsapp" ? value : null;
}

function normalizeSubmittedAt(value: unknown) {
  const parsed = typeof value === "string" ? Date.parse(value) : Number.NaN;
  return Number.isNaN(parsed) ? new Date().toISOString() : new Date(parsed).toISOString();
}

function normalizeDigits(value: string) {
  return value.replace(/\D/g, "");
}

function isValidContact(value: string, channel: ContactChannel) {
  if (channel === "email") {
    return EMAIL_REGEX.test(value);
  }

  return PHONE_REGEX.test(normalizeDigits(value));
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
