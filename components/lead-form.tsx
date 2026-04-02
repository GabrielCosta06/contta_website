"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { challengeOptions, siteConfig } from "@/lib/site-content";

type ContactChannel = "email" | "whatsapp";
type FieldName = "name" | "company" | "challenge" | "contactChannel" | "contact" | "consent";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_REGEX = /^\d{10,13}$/;

const defaultFeedback =
  "Recebemos seu cenário. A equipe da Contta vai responder pelo canal informado.";

export function LeadForm() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const companyRef = useRef<HTMLInputElement | null>(null);
  const challengeRef = useRef<HTMLSelectElement | null>(null);
  const channelRef = useRef<HTMLInputElement | null>(null);
  const contactRef = useRef<HTMLInputElement | null>(null);
  const consentRef = useRef<HTMLInputElement | null>(null);

  const [contactChannel, setContactChannel] = useState<ContactChannel>("whatsapp");
  const [errors, setErrors] = useState<Errors>({});
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; message: string } | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!isDirty) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const values = readFormValues(form, contactChannel);
    const nextErrors = validateForm(values);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback({
        tone: "error",
        message: "Revise os campos destacados antes de enviar.",
      });
      focusFirstError(nextErrors, {
        name: nameRef.current,
        company: companyRef.current,
        challenge: challengeRef.current,
        contactChannel: channelRef.current,
        contact: contactRef.current,
        consent: consentRef.current,
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
        signal: controller.signal,
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json().catch(() => null)
        : null;

      if (!response.ok) {
        throw new Error(data?.message || "Não foi possível enviar agora.");
      }

      form.reset();
      setContactChannel("whatsapp");
      setErrors({});
      setFeedback({
        tone: "success",
        message: data?.message || defaultFeedback,
      });
      setIsDirty(false);
    } catch (error) {
      setFeedback({
        tone: "error",
        message: resolveErrorMessage(error),
      });
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (fieldName: FieldName) => {
    setIsDirty(true);
    setFeedback(null);
    setErrors((current) => {
      if (!current[fieldName]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[fieldName];
      return nextErrors;
    });
  };

  const contactInputMode = contactChannel === "email" ? "email" : "tel";
  const contactPlaceholder =
    contactChannel === "email"
      ? "Ex.: financeiro@empresa.com.br..."
      : "Ex.: (19) 99836-8671...";

  return (
    <form
      className="lead-form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      onInputCapture={() => setIsDirty(true)}
      onChangeCapture={() => setIsDirty(true)}
      aria-busy={isSubmitting}
    >
      <div className={`field${errors.name ? " is-invalid" : ""}`}>
        <label htmlFor="name">Nome</label>
        <input
          ref={nameRef}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ex.: Ana Ribeiro..."
          aria-describedby="error-name"
          aria-invalid={Boolean(errors.name)}
          onChange={() => handleFieldChange("name")}
        />
        <p className="field-error" id="error-name">
          {errors.name}
        </p>
      </div>

      <div className={`field${errors.company ? " is-invalid" : ""}`}>
        <label htmlFor="company">Empresa</label>
        <input
          ref={companyRef}
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Ex.: Ateliê Norte..."
          aria-describedby="error-company"
          aria-invalid={Boolean(errors.company)}
          onChange={() => handleFieldChange("company")}
        />
        <p className="field-error" id="error-company">
          {errors.company}
        </p>
      </div>

      <div className={`field${errors.challenge ? " is-invalid" : ""}`}>
        <label htmlFor="challenge">Principal Desafio</label>
        <select
          ref={challengeRef}
          id="challenge"
          name="challenge"
          aria-describedby="error-challenge"
          aria-invalid={Boolean(errors.challenge)}
          defaultValue=""
          onChange={() => handleFieldChange("challenge")}
        >
          <option value="">Selecione o foco principal</option>
          {challengeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="field-error" id="error-challenge">
          {errors.challenge}
        </p>
      </div>

      <fieldset
        className={`choice-field${errors.contactChannel ? " is-invalid" : ""}`}
        aria-describedby="error-contact-channel"
      >
        <legend>Canal Preferido</legend>
        <div className="choice-field__options" aria-describedby="error-contact-channel">
          <label className="choice-option">
            <input
              ref={channelRef}
              type="radio"
              name="contactChannel"
              value="whatsapp"
              checked={contactChannel === "whatsapp"}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setContactChannel(event.target.value as ContactChannel);
                handleFieldChange("contactChannel");
              }}
            />
            <span>WhatsApp</span>
          </label>

          <label className="choice-option">
            <input
              type="radio"
              name="contactChannel"
              value="email"
              checked={contactChannel === "email"}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setContactChannel(event.target.value as ContactChannel);
                handleFieldChange("contactChannel");
              }}
            />
            <span>E-mail</span>
          </label>
        </div>
        <p className="field-error" id="error-contact-channel">
          {errors.contactChannel}
        </p>
      </fieldset>

      <div className={`field${errors.contact ? " is-invalid" : ""}`}>
        <label htmlFor="contact">
          {contactChannel === "email" ? "E-mail para Retorno" : "WhatsApp para Retorno"}
        </label>
        <input
          ref={contactRef}
          id="contact"
          name="contact"
          type={contactChannel === "email" ? "email" : "tel"}
          inputMode={contactInputMode}
          autoComplete={contactChannel === "email" ? "email" : "tel-national"}
          spellCheck={contactChannel === "email" ? false : undefined}
          placeholder={contactPlaceholder}
          aria-describedby="contact-hint error-contact"
          aria-invalid={Boolean(errors.contact)}
          onChange={() => handleFieldChange("contact")}
        />
        <p className="field-hint" id="contact-hint">
          {contactChannel === "email"
            ? "Use o e-mail que deve receber a leitura inicial."
            : "Use o WhatsApp com DDD para receber o retorno."}
        </p>
        <p className="field-error" id="error-contact">
          {errors.contact}
        </p>
      </div>

      <label className={`consent-field${errors.consent ? " is-invalid" : ""}`}>
        <input
          ref={consentRef}
          type="checkbox"
          name="consent"
          value="yes"
          aria-describedby="error-consent"
          aria-invalid={Boolean(errors.consent)}
          onChange={() => handleFieldChange("consent")}
        />
        <span>
          Concordo com o uso desses dados para contato comercial da Contta, conforme a{" "}
          <a href="/privacy">Política de Privacidade</a>.
        </span>
      </label>
      <p className="field-error" id="error-consent">
        {errors.consent}
      </p>

      <div className="form-actions">
        <button className="button button--primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar Cenário para Leitura Inicial"}
        </button>
        <a
          className="text-link"
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prefiro Seguir pelo WhatsApp
        </a>
      </div>

      <div
        className={`status-panel${feedback ? ` is-${feedback.tone}` : ""}`}
        role="status"
        aria-live="polite"
        hidden={!feedback}
      >
        {feedback?.message}
      </div>
    </form>
  );
}

function readFormValues(form: HTMLFormElement, contactChannel: ContactChannel) {
  const formData = new FormData(form);

  return {
    name: String(formData.get("name") || "").trim(),
    company: String(formData.get("company") || "").trim(),
    challenge: String(formData.get("challenge") || "").trim(),
    contact: String(formData.get("contact") || "").trim(),
    contactChannel,
    consent: formData.get("consent") === "yes",
    source: "website",
    page: window.location.pathname,
    submittedAt: new Date().toISOString(),
  };
}

function validateForm(values: ReturnType<typeof readFormValues>) {
  const nextErrors: Errors = {};

  if (values.name.length < 2) {
    nextErrors.name = "Informe seu nome.";
  }

  if (values.company.length < 2) {
    nextErrors.company = "Informe o nome da empresa.";
  }

  if (!values.challenge) {
    nextErrors.challenge = "Selecione o principal desafio.";
  }

  if (!values.contactChannel) {
    nextErrors.contactChannel = "Escolha se prefere retorno por e-mail ou WhatsApp.";
  }

  if (!values.contact) {
    nextErrors.contact =
      values.contactChannel === "email"
        ? "Informe um e-mail para retorno."
        : "Informe um WhatsApp com DDD.";
  } else if (values.contactChannel === "email" && !EMAIL_REGEX.test(values.contact)) {
    nextErrors.contact = "Informe um e-mail válido.";
  } else if (
    values.contactChannel === "whatsapp" &&
    !WHATSAPP_REGEX.test(values.contact.replace(/\D/g, ""))
  ) {
    nextErrors.contact = "Informe um WhatsApp com DDD válido.";
  }

  if (!values.consent) {
    nextErrors.consent = "Autorize o contato comercial para enviar.";
  }

  return nextErrors;
}

function focusFirstError(errors: Errors, fieldRefs: Record<FieldName, HTMLElement | null>) {
  const orderedFields: FieldName[] = [
    "name",
    "company",
    "challenge",
    "contactChannel",
    "contact",
    "consent",
  ];

  for (const fieldName of orderedFields) {
    if (errors[fieldName]) {
      fieldRefs[fieldName]?.focus();
      break;
    }
  }
}

function resolveErrorMessage(error: unknown) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "O envio demorou mais do que o esperado. Tente novamente ou siga pelo WhatsApp.";
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Não foi possível enviar agora. Tente novamente ou siga pelo WhatsApp.";
}
