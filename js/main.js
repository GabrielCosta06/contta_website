document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  initHeaderState();
  initMobileMenu();
  initSmoothScroll(prefersReducedMotion);
  initReveal(prefersReducedMotion);
  initLeadForm();
});

function initHeaderState() {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

function initMobileMenu() {
  const toggle = document.querySelector(".site-nav__toggle");
  const panel = document.getElementById("site-menu");
  const header = document.querySelector(".site-header");

  if (!toggle || !panel || !header) {
    return;
  }

  const setOpen = (isOpen) => {
    panel.dataset.open = String(isOpen);
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen && window.innerWidth < 901);
  };

  setOpen(false);

  toggle.addEventListener("click", () => {
    setOpen(panel.dataset.open !== "true");
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 901) {
        setOpen(false);
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth >= 901 || panel.dataset.open !== "true") {
      return;
    }

    if (!header.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 901) {
      setOpen(false);
    }
  });
}

function initSmoothScroll(prefersReducedMotion) {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const header = document.querySelector(".site-header");
      const offset = header ? header.offsetHeight + 14 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  });
}

function initReveal(prefersReducedMotion) {
  const items = Array.from(document.querySelectorAll(".reveal"));

  if (!items.length) {
    return;
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -48px 0px",
    }
  );

  items.forEach((item) => observer.observe(item));
}

function initLeadForm() {
  const form = document.getElementById("lead-form");
  const feedback = document.getElementById("form-feedback");
  const submitButton = document.getElementById("submit-button");
  const submitLabel = submitButton?.querySelector(".button__label");

  if (
    !(form instanceof HTMLFormElement) ||
    !(feedback instanceof HTMLElement) ||
    !(submitButton instanceof HTMLButtonElement) ||
    !(submitLabel instanceof HTMLElement)
  ) {
    return;
  }

  const fieldConfig = {
    name: {
      input: document.getElementById("name"),
      error: document.getElementById("error-name"),
      wrapper: form.querySelector('[data-field="name"]'),
      validate: (value) => (value.trim().length >= 2 ? "" : "Informe seu nome."),
    },
    company: {
      input: document.getElementById("company"),
      error: document.getElementById("error-company"),
      wrapper: form.querySelector('[data-field="company"]'),
      validate: (value) => (value.trim().length >= 2 ? "" : "Informe o nome da empresa."),
    },
    challenge: {
      input: document.getElementById("challenge"),
      error: document.getElementById("error-challenge"),
      wrapper: form.querySelector('[data-field="challenge"]'),
      validate: (value) => (value.trim() ? "" : "Selecione o principal desafio."),
    },
    contact: {
      input: document.getElementById("contact"),
      error: document.getElementById("error-contact"),
      wrapper: form.querySelector('[data-field="contact"]'),
      validate: validateContact,
    },
    consent: {
      input: document.getElementById("consent"),
      error: document.getElementById("error-consent"),
      wrapper: form.querySelector('[data-field="consent"]'),
      validate: (_, element) => (element.checked ? "" : "Autorize o contato comercial para enviar."),
    },
  };

  const defaultSubmitLabel = submitLabel.textContent || "Enviar";
  const apiEndpoint = form.dataset.apiEndpoint || form.getAttribute("action") || "";

  if (!Object.values(fieldConfig).every(isFieldBinding)) {
    return;
  }

  const setFeedback = (message, state) => {
    feedback.hidden = false;
    feedback.textContent = message;
    feedback.dataset.state = state || "";
  };

  const clearFeedback = () => {
    feedback.hidden = true;
    feedback.textContent = "";
    feedback.dataset.state = "";
  };

  const setFieldError = (fieldName, message) => {
    const field = fieldConfig[fieldName];
    field.error.textContent = message;
    field.wrapper.classList.toggle("is-invalid", Boolean(message));
    field.input.setAttribute("aria-invalid", String(Boolean(message)));
  };

  const clearFieldError = (fieldName) => {
    setFieldError(fieldName, "");
  };

  const setBusy = (isBusy) => {
    form.setAttribute("aria-busy", String(isBusy));
    submitButton.disabled = isBusy;
    submitLabel.textContent = isBusy ? "Enviando..." : defaultSubmitLabel;
  };

  const validateField = (fieldName) => {
    const field = fieldConfig[fieldName];
    const value = getFieldValue(field.input);
    const message = field.validate(value, field.input);
    setFieldError(fieldName, message);
    return !message;
  };

  const validateForm = () => {
    let isValid = true;

    Object.keys(fieldConfig).forEach((fieldName) => {
      const valid = validateField(fieldName);
      if (!valid) {
        isValid = false;
      }
    });

    return isValid;
  };

  Object.entries(fieldConfig).forEach(([fieldName, field]) => {
    const eventName = field.input instanceof HTMLSelectElement ? "change" : "input";

    field.input.addEventListener(eventName, () => {
      clearFieldError(fieldName);
      clearFeedback();
    });

    field.input.addEventListener("blur", () => {
      validateField(fieldName);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearFeedback();

    if (!validateForm()) {
      setFeedback("Revise os campos destacados antes de enviar.", "error");
      return;
    }

    if (!apiEndpoint) {
      setFeedback("O endpoint do formulário ainda não está configurado.", "error");
      return;
    }

    const payload = {
      name: getFieldValue(fieldConfig.name.input).trim(),
      company: getFieldValue(fieldConfig.company.input).trim(),
      challenge: getFieldValue(fieldConfig.challenge.input).trim(),
      contact: getFieldValue(fieldConfig.contact.input).trim(),
      consent: true,
      source: "website",
      page: window.location.pathname,
      submittedAt: new Date().toISOString(),
    };

    setBusy(true);

    try {
      const response = await postLead(apiEndpoint, payload);
      const successMessage =
        response?.message ||
        "Recebemos seu cenário. A equipe da Contta vai responder pelo contato informado.";

      form.reset();
      Object.keys(fieldConfig).forEach(clearFieldError);
      setFeedback(successMessage, "success");
    } catch (error) {
      setFeedback(resolveErrorMessage(error), "error");
    } finally {
      setBusy(false);
    }
  });
}

function isFieldBinding(field) {
  return (
    field?.input instanceof HTMLElement &&
    field?.error instanceof HTMLElement &&
    field?.wrapper instanceof HTMLElement &&
    typeof field?.validate === "function"
  );
}

function getFieldValue(element) {
  if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
    return element.value || "";
  }

  return "";
}

function validateContact(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Informe um WhatsApp ou e-mail para retorno.";
  }

  if (trimmed.includes("@")) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmed) ? "" : "Informe um e-mail válido.";
  }

  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13
    ? ""
    : "Informe um WhatsApp com DDD ou um e-mail válido.";
}

async function postLead(endpoint, payload) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json().catch(() => null) : null;

    if (!response.ok) {
      throw new Error(data?.message || "Não foi possível enviar agora.");
    }

    return data;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function resolveErrorMessage(error) {
  if (error?.name === "AbortError") {
    return "O envio demorou mais que o esperado. Tente novamente ou siga pelo WhatsApp.";
  }

  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message;
  }

  return "Não foi possível enviar agora. Tente novamente ou siga pelo WhatsApp.";
}
