/* ==========================================================================
   VIVAHA — FORM VALIDATION
   Small, dependency-free validators used by contact / login / register /
   planner forms. Attaches error text beneath the field and toggles
   .has-error on the parent .form-group.
   ========================================================================== */

const VivahaForms = (() => {

  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[6-9]\d{9}$/ // Indian mobile numbers, after normalization strips spaces/dashes/+91
  };

  // Placeholders across the app show "+91 98765 43210" / "98765 43210" formatting,
  // so validation has to tolerate that instead of demanding 10 bare digits.
  function normalizePhone(value) {
    return value.replace(/[\s\-()]/g, "").replace(/^\+?91/, "");
  }

  function setError(input, message) {
    const group = input.closest(".form-group");
    if (!group) return;
    group.classList.add("has-error");
    const errEl = group.querySelector(".form-error");
    if (errEl) errEl.textContent = message;
  }

  function clearError(input) {
    const group = input.closest(".form-group");
    if (!group) return;
    group.classList.remove("has-error");
  }

  function validateField(input) {
    const rule = input.dataset.validate;
    const value = input.value.trim();
    if (!rule) return true;

    if (rule.includes("required") && !value) {
      setError(input, I18N.t("common.required"));
      return false;
    }
    if (rule.includes("email") && value && !patterns.email.test(value)) {
      setError(input, I18N.t("auth.errors.emailInvalid"));
      return false;
    }
    if (rule.includes("phone") && value && !patterns.phone.test(normalizePhone(value))) {
      setError(input, I18N.t("auth.errors.phoneInvalid"));
      return false;
    }
    if (rule.includes("minlen8") && value && value.length < 8) {
      setError(input, I18N.t("auth.errors.passwordShort"));
      return false;
    }
    if (rule.includes("minlen10") && value && value.length < 10) {
      setError(input, I18N.t("auth.errors.messageShort"));
      return false;
    }
    if (rule.includes("match")) {
      const target = document.getElementById(input.dataset.matchTarget);
      if (target && value !== target.value) {
        setError(input, I18N.t("auth.errors.passwordMismatch"));
        return false;
      }
    }
    if (rule.includes("checked") && input.type === "checkbox" && !input.checked) {
      setError(input, I18N.t("auth.errors.termsRequired"));
      return false;
    }
    clearError(input);
    return true;
  }

  function validateForm(form) {
    let valid = true;
    form.querySelectorAll("[data-validate]").forEach(input => {
      if (!validateField(input)) valid = false;
    });
    return valid;
  }

  function wireLiveValidation(form) {
    form.querySelectorAll("[data-validate]").forEach(input => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => {
        if (input.closest(".form-group")?.classList.contains("has-error")) validateField(input);
      });
    });
  }

  function wireVisibilityToggle(root = document) {
    root.querySelectorAll(".toggle-visibility").forEach(btn => {
      btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector("input");
        const isPw = input.type === "password";
        input.type = isPw ? "text" : "password";
        btn.innerHTML = `<i class="fa-solid ${isPw ? "fa-eye-slash" : "fa-eye"}"></i>`;
      });
    });
  }

  return { validateField, validateForm, wireLiveValidation, wireVisibilityToggle };
})();
