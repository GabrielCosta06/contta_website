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
  const status = document.getElementById("form-status");
  const emailInput = form?.elements.namedItem("email");
  const whatsappInput = form?.elements.namedItem("whatsapp");
  const fallback = document.getElementById("message-fallback");
  const fallbackMessage = document.getElementById("fallback-message");
  const retryEmailLink = document.getElementById("retry-email-link");
  const copyMessageButton = document.getElementById("copy-message-button");

  if (
    !form ||
    !status ||
    !(emailInput instanceof HTMLInputElement) ||
    !(whatsappInput instanceof HTMLInputElement) ||
    !(fallback instanceof HTMLElement) ||
    !(fallbackMessage instanceof HTMLTextAreaElement) ||
    !(retryEmailLink instanceof HTMLAnchorElement) ||
    !(copyMessageButton instanceof HTMLButtonElement)
  ) {
    return;
  }

  const setStatus = (message, state) => {
    status.textContent = message;
    status.dataset.state = state || "";
  };

  const syncContactValidity = () => {
    const hasEmail = emailInput.value.trim() !== "";
    const hasWhatsapp = whatsappInput.value.trim() !== "";
    const message =
      hasEmail || hasWhatsapp
        ? ""
        : "Informe pelo menos um e-mail ou WhatsApp para retorno.";

    emailInput.setCustomValidity(message);
    whatsappInput.setCustomValidity(message);
  };

  const copyFallbackMessage = async () => {
    fallbackMessage.focus();
    fallbackMessage.select();
    fallbackMessage.setSelectionRange(0, fallbackMessage.value.length);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fallbackMessage.value);
      } else {
        document.execCommand("copy");
      }

      copyMessageButton.textContent = "Mensagem copiada";
      setStatus(
        "Mensagem copiada. Você pode enviar para contato@contta.com.br ou continuar no WhatsApp.",
        "success"
      );
    } catch (error) {
      setStatus(
        "Não foi possível copiar automaticamente. Selecione a mensagem abaixo e copie manualmente.",
        "error"
      );
    }
  };

  syncContactValidity();
  emailInput.addEventListener("input", syncContactValidity);
  whatsappInput.addEventListener("input", syncContactValidity);
  copyMessageButton.addEventListener("click", copyFallbackMessage);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    setStatus("", "");
    fallback.hidden = true;
    copyMessageButton.textContent = "Copiar mensagem";
    syncContactValidity();

    if (!form.reportValidity()) {
      setStatus("Revise os campos obrigatórios antes de continuar.", "error");
      return;
    }

    const data = new FormData(form);

    if (data.get("consent") !== "yes") {
      setStatus("É preciso autorizar o contato comercial para enviar os dados.", "error");
      return;
    }

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const whatsapp = String(data.get("whatsapp") || "").trim();
    const businessName = String(data.get("business_name") || "").trim();
    const challenge = String(data.get("challenge") || "").trim();

    const subject = businessName
      ? `Diagnóstico inicial Contta - ${businessName}`
      : "Diagnóstico inicial Contta";
    const body = [
      "Olá, equipe Contta.",
      "",
      "Quero solicitar um diagnóstico inicial.",
      "",
      `Nome: ${name}`,
      `Empresa: ${businessName}`,
      `E-mail: ${email || "Não informado"}`,
      `WhatsApp: ${whatsapp || "Não informado"}`,
      "",
      "Principal desafio:",
      challenge,
    ].join("\n");

    const fallbackText = [
      `Assunto: ${subject}`,
      "Para: contato@contta.com.br",
      "",
      body,
    ].join("\n");
    const mailtoUrl =
      `mailto:contato@contta.com.br?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    fallbackMessage.value = fallbackText;
    retryEmailLink.href = mailtoUrl;
    fallback.hidden = false;
    setStatus(
      "Tentando abrir seu aplicativo de e-mail. Se nada acontecer, use a mensagem pronta abaixo ou continue pelo WhatsApp.",
      "success"
    );

    window.location.href = mailtoUrl;
  });
}
