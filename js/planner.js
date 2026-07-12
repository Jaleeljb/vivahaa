/* ==========================================================================
   VIVAHA — WEDDING PLANNER WIZARD
   Renders each step from a declarative STEP_DEFS list, keeps a running
   selection state, calculates a live budget from VivahaData.plannerCosts,
   and saves the finished plan to localStorage (scoped to the logged-in user).
   ========================================================================== */

(function () {

  const STEP_DEFS = [
    { key: "type", type: "single", icons: { traditional: "fa-om", destination: "fa-plane", royal: "fa-chess-rook", modern: "fa-shapes", beach: "fa-umbrella-beach", interfaith: "fa-hands-holding-circle" } },
    { key: "venue", type: "single", icons: { banquet: "fa-building", resort: "fa-hotel", palace: "fa-landmark", lawn: "fa-tree", beach: "fa-umbrella-beach", hotel: "fa-hotel" } },
    { key: "food", type: "single", icons: { veg: "fa-leaf", nonveg: "fa-drumstick-bite", jain: "fa-seedling", vegan: "fa-carrot", regional: "fa-bowl-food" }, perGuest: true },
    { key: "decoration", type: "single", icons: { floral: "fa-seedling", royal: "fa-chess-rook", modern: "fa-shapes", boho: "fa-umbrella-beach", themed: "fa-palette" } },
    { key: "music", type: "single", icons: { dj: "fa-compact-disc", liveband: "fa-guitar", classical: "fa-music", choreographer: "fa-person-walking", none: "fa-ban" } },
    { key: "photography", type: "single", icons: { basic: "fa-camera", standard: "fa-film", premium: "fa-satellite-dish", none: "fa-ban" } },
    { key: "bridal", type: "multi", icons: { makeup: "fa-wand-magic-sparkles", mehendi: "fa-hand-sparkles", styling: "fa-shirt", jewellery: "fa-gem", none: "fa-ban" } },
    { key: "invitations", type: "single", icons: { digital: "fa-mobile-screen", printed: "fa-envelope", boxed: "fa-gift", none: "fa-ban" } },
    { key: "guests", type: "counter" },
    { key: "budget", type: "review" }
  ];

  const state = {
    type: null, venue: null, food: null, decoration: null, music: null,
    photography: null, bridal: [], invitations: null, guests: 300
  };

  let currentStep = 0;

  function optionKeysFor(stepKey) {
    return Object.keys(VivahaData.plannerCosts[stepKey] || {});
  }

  function fmtINR(n) {
    return "₹" + Math.round(n).toLocaleString("en-IN");
  }

  function calcBudget() {
    const c = VivahaData.plannerCosts;
    const lines = [];
    let total = 0;

    if (state.type) { const v = c.type[state.type] || 0; if (v) { lines.push({ key: "type", label: state.type, amount: v }); total += v; } }
    if (state.venue) { const v = c.venue[state.venue] || 0; lines.push({ key: "venue", label: state.venue, amount: v }); total += v; }
    if (state.food) { const v = (c.food[state.food] || 0) * state.guests; lines.push({ key: "food", label: state.food, amount: v }); total += v; }
    if (state.decoration) { const v = c.decoration[state.decoration] || 0; lines.push({ key: "decoration", label: state.decoration, amount: v }); total += v; }
    if (state.music) { const v = c.music[state.music] || 0; if (v) { lines.push({ key: "music", label: state.music, amount: v }); total += v; } }
    if (state.photography) { const v = c.photography[state.photography] || 0; if (v) { lines.push({ key: "photography", label: state.photography, amount: v }); total += v; } }
    state.bridal.forEach(sel => { const v = c.bridal[sel] || 0; if (v) { lines.push({ key: "bridal", label: sel, amount: v }); total += v; } });
    if (state.invitations) { const v = c.invitations[state.invitations] || 0; if (v) { lines.push({ key: "invitations", label: state.invitations, amount: v }); total += v; } }

    return { lines, total };
  }

  function renderStepsNav() {
    const nav = document.getElementById("wizardStepsNav");
    if (!nav) return;
    nav.innerHTML = STEP_DEFS.map((s, i) => `
      <div class="wizard-step ${i === currentStep ? "is-active" : ""} ${i < currentStep ? "is-done" : ""}" data-step-index="${i}">
        <div class="dot">${i < currentStep ? '<i class="fa-solid fa-check"></i>' : i + 1}</div>
        <span data-i18n="planner.steps.${s.key}"></span>
      </div>`).join("");
    I18N.applyToDom(nav);
    nav.querySelectorAll(".wizard-step").forEach(el => {
      el.addEventListener("click", () => {
        const idx = parseInt(el.dataset.stepIndex, 10);
        if (idx <= currentStep) { goToStep(idx); return; }
        if (idx === currentStep + 1) {
          if (!currentStepIsValid()) { Vivaha.toast(I18N.t("common.required"), "info"); return; }
          goToStep(idx);
        }
      });
    });
  }

  function optionCardHTML(stepKey, optKey, icon, selected) {
    const cost = VivahaData.plannerCosts[stepKey][optKey];
    const priceLabel = stepKey === "food"
      ? (cost ? fmtINR(cost) + " " + I18N.t("common.perGuest") : "")
      : (cost ? fmtINR(cost) : (optKey === "none" ? "" : ""));
    return `
      <div class="option-card ${selected ? "selected" : ""}" data-opt="${optKey}" tabindex="0" role="button">
        <i class="fa-solid ${icon}"></i>
        <h4 style="margin-bottom:2px;" data-i18n="planner.${stepKey}.${optKey}"></h4>
        ${priceLabel ? `<div class="opt-price">${priceLabel}</div>` : ""}
      </div>`;
  }

  function renderStepBody() {
    const body = document.getElementById("wizardBody");
    if (!body) return;
    const def = STEP_DEFS[currentStep];

    if (def.type === "single" || def.type === "multi") {
      const opts = optionKeysFor(def.key);
      body.innerHTML = `
        <h3 data-i18n="planner.${def.key}.title"></h3>
        <div class="option-grid" style="margin-top: var(--sp-5);">
          ${opts.map(o => optionCardHTML(def.key, o, def.icons[o] || "fa-star",
            def.type === "multi" ? state[def.key].includes(o) : state[def.key] === o)).join("")}
        </div>`;
      body.querySelectorAll(".option-card").forEach(card => {
        card.addEventListener("click", () => selectOption(def, card.dataset.opt));
        card.addEventListener("keypress", (e) => { if (e.key === "Enter") selectOption(def, card.dataset.opt); });
      });
    } else if (def.type === "counter") {
      body.innerHTML = `
        <h3 data-i18n="planner.guests.title"></h3>
        <p data-i18n="planner.guests.subtitle"></p>
        <div class="guest-counter" style="margin-top: var(--sp-6);">
          <button type="button" id="guestMinus" aria-label="Decrease"><i class="fa-solid fa-minus"></i></button>
          <output id="guestCountOutput">${state.guests}</output>
          <button type="button" id="guestPlus" aria-label="Increase"><i class="fa-solid fa-plus"></i></button>
        </div>
        <input type="range" min="50" max="2000" step="10" value="${state.guests}" class="budget-slider" id="guestSlider" aria-label="Guest count slider">`;
      const output = document.getElementById("guestCountOutput");
      const slider = document.getElementById("guestSlider");
      const sync = (val) => { state.guests = Math.max(50, Math.min(2000, val)); output.textContent = state.guests; slider.value = state.guests; renderBudgetPanel(); };
      document.getElementById("guestMinus").addEventListener("click", () => sync(state.guests - 10));
      document.getElementById("guestPlus").addEventListener("click", () => sync(state.guests + 10));
      slider.addEventListener("input", (e) => sync(parseInt(e.target.value, 10)));
    } else if (def.type === "review") {
      renderReviewStep(body);
    }

    document.getElementById("wizardPrevBtn").style.visibility = currentStep === 0 ? "hidden" : "visible";
    const nextBtn = document.getElementById("wizardNextBtn");
    nextBtn.style.display = currentStep === STEP_DEFS.length - 1 ? "none" : "inline-flex";
    I18N.applyToDom(body);
    renderBudgetPanel();
  }

  function selectOption(def, optKey) {
    if (def.type === "single") {
      state[def.key] = optKey;
    } else {
      if (optKey === "none") {
        state[def.key] = state[def.key].includes("none") ? [] : ["none"];
      } else {
        let arr = state[def.key].filter(x => x !== "none");
        arr = arr.includes(optKey) ? arr.filter(x => x !== optKey) : [...arr, optKey];
        state[def.key] = arr;
      }
    }
    renderStepBody();
  }

  function renderBudgetPanel() {
    const panel = document.getElementById("budgetPanel");
    if (!panel) return;
    const { lines, total } = calcBudget();
    const grouped = {};
    lines.forEach(l => { grouped[l.key] = (grouped[l.key] || 0) + l.amount; });
    panel.innerHTML = `
      <h4 data-i18n="dashboard.budget.categoryBreakdown"></h4>
      ${Object.keys(grouped).length ? Object.entries(grouped).map(([key, amt]) => `
        <div class="budget-line"><span data-i18n="planner.steps.${key}"></span><span>${fmtINR(amt)}</span></div>
      `).join("") : `<p class="form-hint">${I18N.t("planner.guests.subtitle", "")}</p>`}
      <div class="budget-total">
        <span data-i18n="planner.budget.total"></span>
        <strong>${fmtINR(total)}</strong>
      </div>
      <p class="form-hint" style="margin-top:var(--sp-3);" data-i18n="planner.budget.disclaimer"></p>`;
    I18N.applyToDom(panel);
  }

  function renderReviewStep(body) {
    const { lines, total } = calcBudget();
    const loggedIn = VivahaAuth.isLoggedIn();
    body.innerHTML = `
      <h3 data-i18n="planner.budget.title"></h3>
      <p data-i18n="planner.budget.subtitle"></p>
      <div class="card" style="margin-top:var(--sp-5);">
        <div class="card-body">
          ${lines.map(l => `
            <div class="budget-line">
              <span data-i18n="planner.${l.key}.${l.label}"></span>
              <span>${fmtINR(l.amount)}${l.key === "food" ? " (" + state.guests + " " + I18N.t("common.guests") + ")" : ""}</span>
            </div>`).join("")}
          <div class="budget-total">
            <span data-i18n="planner.budget.total"></span>
            <strong>${fmtINR(total)}</strong>
          </div>
        </div>
      </div>
      <p class="form-hint" style="margin-top:var(--sp-4);" data-i18n="planner.budget.disclaimer"></p>
      <div id="reviewCta" style="margin-top:var(--sp-6);"></div>`;

    const cta = document.getElementById("reviewCta");
    if (loggedIn) {
      cta.innerHTML = `<button class="btn btn-gold btn-lg btn-block" id="savePlanBtn" data-i18n="planner.budget.saveBtn"></button>`;
      document.getElementById("savePlanBtn").addEventListener("click", savePlan);
    } else {
      cta.innerHTML = `
        <p class="chip chip-outline" style="display:block;text-align:center;padding: var(--sp-3);" data-i18n="planner.budget.loginPrompt"></p>
        <a href="login.html" id="loginToSaveLink" class="btn btn-maroon btn-lg btn-block" style="margin-top:var(--sp-3);" data-i18n="planner.budget.loginBtn"></a>`;
      // Without this, everything the person just chose would vanish the moment
      // they leave for the login page — stash it and hand it back after login.
      document.getElementById("loginToSaveLink").addEventListener("click", () => {
        sessionStorage.setItem("vivaha_pending_plan", JSON.stringify(state));
        sessionStorage.setItem("vivaha_redirect_after_login", "planner.html");
      });
    }
    I18N.applyToDom(body);
  }

  function savePlan() {
    const user = VivahaAuth.currentUser();
    if (!user) { location.href = "login.html"; return; }
    const { lines, total } = calcBudget();
    const plans = JSON.parse(localStorage.getItem("vivaha_plans") || "[]");
    plans.push({
      id: "plan_" + Date.now(), userId: user.id, createdAt: new Date().toISOString(),
      selections: { ...state }, total, guests: state.guests
    });
    localStorage.setItem("vivaha_plans", JSON.stringify(plans));
    Vivaha.toast(I18N.t("toast.planSaved"), "success");
    setTimeout(() => { location.href = "dashboard.html?tab=plans"; }, 900);
  }

  function goToStep(index) {
    currentStep = Math.max(0, Math.min(STEP_DEFS.length - 1, index));
    renderStepsNav();
    renderStepBody();
    const body = document.getElementById("wizardBody");
    if (body && typeof body.scrollIntoView === "function") body.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function currentStepIsValid() {
    const def = STEP_DEFS[currentStep];
    if (def.type === "single") return !!state[def.key];
    if (def.type === "multi") return state[def.key].length > 0;
    return true; // counter & review steps have no blocking requirement
  }

  function wireNav() {
    document.getElementById("wizardPrevBtn").addEventListener("click", () => goToStep(currentStep - 1));
    document.getElementById("wizardNextBtn").addEventListener("click", () => {
      if (!currentStepIsValid()) {
        Vivaha.toast(I18N.t("common.required"), "info");
        return;
      }
      goToStep(currentStep + 1);
    });
  }

  function restorePendingPlanSelections() {
    // If the person built a plan while logged out, then logged in, prefill from sessionStorage
    // and jump straight back to the review step instead of making them redo the whole wizard.
    const pending = sessionStorage.getItem("vivaha_pending_plan");
    if (pending) {
      try {
        Object.assign(state, JSON.parse(pending));
        currentStep = STEP_DEFS.length - 1;
      } catch {}
      sessionStorage.removeItem("vivaha_pending_plan");
    }
  }

  document.addEventListener("vivaha:ready", () => {
    if (!document.getElementById("wizardBody")) return;
    restorePendingPlanSelections();
    wireNav();
    renderStepsNav();
    renderStepBody();
  });
  document.addEventListener("vivaha:rerender", () => {
    if (!document.getElementById("wizardBody")) return;
    renderStepsNav();
    renderStepBody();
  });
})();
