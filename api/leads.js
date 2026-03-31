const RESEND_API_URL = "https://api.resend.com/emails";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CHALLENGE_LABELS = {
  "precificacao-e-margem": "Precificacao e margem",
  "caixa-e-pendencias": "Caixa e pendencias",
  "regime-e-risco-fiscal": "Regime, imposto ou Fator R",
  "quadro-completo": "Revisar o quadro completo",
};

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Allow", "POST, OPTIONS");
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, {
      ok: false,
      message: "Use POST para enviar o formulario.",
    });
    return;
  }

  try {
    const payload = await parseRequestBody(req);
    const lead = validateLeadPayload(payload);

    await sendLeadEmail(lead);

    sendJson(res, 200, {
      ok: true,
      message:
        "Recebemos seu cenário. A equipe da Contta vai responder pelo contato informado.",
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      sendJson(res, 400, {
        ok: false,
        message: error.message,
      });
      return;
    }

    console.error("[api/leads] failed to process lead", error);

    sendJson(res, 500, {
      ok: false,
      message: "Nao foi possivel enviar agora. Tente novamente em instantes.",
    });
  }
};

module.exports._internals = {
  normalizeDigits,
  parseRequestBody,
  validateLeadPayload,
  sendLeadEmail,
};

class ValidationError extends Error {}

async function parseRequestBody(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  if (typeof req.body === "string") {
    return parseJson(req.body);
  }

  if (Buffer.isBuffer(req.body)) {
    return parseJson(req.body.toString("utf8"));
  }

  const raw = await readStream(req);
  return raw ? parseJson(raw) : {};
}

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new ValidationError("Os dados enviados estao invalidos.");
  }
}

function readStream(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      resolve(data);
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}

function validateLeadPayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new ValidationError("Os dados enviados estao invalidos.");
  }

  const name = normalizeString(payload.name);
  const company = normalizeString(payload.company);
  const challenge = normalizeString(payload.challenge);
  const contact = normalizeString(payload.contact);
  const page = normalizeString(payload.page) || "/";
  const source = normalizeString(payload.source) || "website";
  const submittedAt = normalizeSubmittedAt(payload.submittedAt);

  if (name.length < 2) {
    throw new ValidationError("Informe um nome valido.");
  }

  if (company.length < 2) {
    throw new ValidationError("Informe uma empresa valida.");
  }

  if (!challenge) {
    throw new ValidationError("Selecione o principal desafio.");
  }

  if (!isValidContact(contact)) {
    throw new ValidationError("Informe um WhatsApp com DDD ou e-mail valido.");
  }

  if (payload.consent !== true) {
    throw new ValidationError("Autorize o contato comercial para enviar.");
  }

  if (source !== "website") {
    throw new ValidationError("A origem do envio esta invalida.");
  }

  return {
    name,
    company,
    challenge,
    challengeLabel: CHALLENGE_LABELS[challenge] || challenge,
    contact,
    contactType: EMAIL_REGEX.test(contact) ? "email" : "whatsapp",
    consent: true,
    source,
    page,
    submittedAt,
  };
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function normalizeSubmittedAt(value) {
  const parsed = typeof value === "string" ? Date.parse(value) : Number.NaN;
  return Number.isNaN(parsed) ? new Date().toISOString() : new Date(parsed).toISOString();
}

function isValidContact(value) {
  if (EMAIL_REGEX.test(value)) {
    return true;
  }

  const digits = normalizeDigits(value);
  return digits.length >= 10 && digits.length <= 13;
}

async function sendLeadEmail(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = process.env.LEAD_TO_EMAIL || "contato@contta.com.br";

  if (!apiKey || !from) {
    throw new Error("Missing Resend lead configuration.");
  }

  const replyTo = lead.contactType === "email" ? lead.contact : undefined;
  const subject = `Novo lead site Contta - ${lead.company}`;
  const text = buildEmailText(lead);
  const html = buildEmailHtml(lead);

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Resend request failed: ${response.status} ${details}`.trim());
  }
}

function buildEmailText(lead) {
  return [
    "Novo lead do site Contta",
    "",
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `Principal desafio: ${lead.challengeLabel}`,
    `Contato: ${lead.contact}`,
    `Origem: ${lead.source}`,
    `Pagina: ${lead.page}`,
    `Enviado em: ${lead.submittedAt}`,
    "",
    "Proxima etapa prometida ao lead: leitura inicial do cenario.",
  ].join("\n");
}

function buildEmailHtml(lead) {
  const rows = [
    ["Nome", lead.name],
    ["Empresa", lead.company],
    ["Principal desafio", lead.challengeLabel],
    ["Contato", lead.contact],
    ["Origem", lead.source],
    ["Pagina", lead.page],
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
    '<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#58676c;">O proximo passo prometido ao lead e uma leitura inicial do cenario com foco em margem, caixa e contexto fiscal.</p>',
    '<table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">',
    rows,
    "</table>",
    "</div>",
    "</div>",
  ].join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sendJson(res, statusCode, payload) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    res.status(statusCode).json(payload);
    return;
  }

  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}
