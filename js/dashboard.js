/* ==========================================================================
   VIVAHA — CUSTOMER DASHBOARD
   Guards the page behind login, then renders each tab from localStorage
   data (plans from the planner, a seeded sample of bookings, and the
   shared wishlist).
   ========================================================================== */

(function () {
  if (!document.getElementById("dashRoot")) return;

  if (!VivahaAuth.requireAuth()) return; // stops execution + redirects if logged out
  const user = VivahaAuth.currentUser();

  const BOOKINGS_KEY = "vivaha_bookings";
  const NOTIF_READ_KEY = "vivaha_notif_read_" + user.id;
  // Vendor categories mostly match illustration keys 1:1; "decorators" is the exception.
  const VENDOR_ILLUSTRATION = { caterers: "catering", decorators: "floral", photographers: "photography", music: "music", makeup: "makeup", invitations: "invitations" };

  function fmtINR(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }
  function fmtDate(iso, lang) {
    try { return new Date(iso).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return iso; }
  }

  function seedBookingsIfEmpty() {
    const all = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
    if (all.some(b => b.userId === user.id)) return;
    const seed = [
      { id: "bk1", userId: user.id, name: "The Ivory Grand Banquet", type: "venue", date: "2027-01-18", amount: 650000, status: "confirmed" },
      { id: "bk2", userId: user.id, name: "Frame & Fable Studios", type: "vendor", date: "2027-01-18", amount: 280000, status: "pending" },
      { id: "bk3", userId: user.id, name: "DJ Rhythm Republic", type: "vendor", date: "2027-01-17", amount: 90000, status: "confirmed" }
    ];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...all, ...seed]));
  }

  function getUserBookings() {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]").filter(b => b.userId === user.id);
  }
  function getUserPlans() {
    return JSON.parse(localStorage.getItem("vivaha_plans") || "[]").filter(p => p.userId === user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  /* ---------------- Tab switching ---------------- */
  function switchTab(tab) {
    document.querySelectorAll(".dash-nav button").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
    document.querySelectorAll(".dash-panel").forEach(p => p.classList.toggle("active", p.id === "panel-" + tab));
    history.replaceState(null, "", `dashboard.html?tab=${tab}`);
    renderPanel(tab);
  }

  function renderPanel(tab) {
    const lang = I18N.lang();
    if (tab === "overview") renderOverview();
    if (tab === "profile") renderProfile();
    if (tab === "plans") renderPlans(lang);
    if (tab === "bookings") renderBookings(lang);
    if (tab === "wishlist") renderWishlist(lang);
    if (tab === "budget") renderBudget(lang);
    if (tab === "notifications") renderNotifications(lang);
    if (tab === "settings") renderSettings();
  }

  /* ---------------- Overview ---------------- */
  function renderOverview() {
    const el = document.getElementById("panel-overview");
    const bookings = getUserBookings();
    const plans = getUserPlans();
    const wishlistCount = Vivaha.getWishlist().length;
    let daysToGo = "—";
    if (user.weddingDate) {
      const diff = Math.ceil((new Date(user.weddingDate) - new Date()) / 86400000);
      daysToGo = diff > 0 ? diff : 0;
    }
    const totalBudget = plans.length ? plans[0].total : bookings.reduce((s, b) => s + b.amount, 0);

    el.querySelector("#statDays").textContent = daysToGo;
    el.querySelector("#statBudget").textContent = fmtINR(totalBudget);
    el.querySelector("#statVendors").textContent = bookings.length;
    el.querySelector("#statWishlist").textContent = wishlistCount;
  }

  /* ---------------- Profile ---------------- */
  function renderProfile() {
    const form = document.getElementById("profileForm");
    if (form.dataset.wired) { fillProfile(form); return; }
    form.dataset.wired = "true";
    fillProfile(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!VivahaForms.validateForm(form)) return;
      VivahaAuth.updateProfile({
        fullName: form.fullName.value.trim(),
        phone: form.phone.value.trim(),
        partnerName: form.partnerName.value.trim(),
        weddingCity: form.weddingCity.value.trim(),
        weddingDate: form.weddingDate.value,
        guestCount: form.guestCount.value
      });
      Vivaha.toast(I18N.t("toast.profileSaved"), "success");
      const freshUser = VivahaAuth.currentUser();
      document.getElementById("dashUserName").textContent = freshUser.fullName || freshUser.email;
      document.getElementById("dashSidebarName").textContent = freshUser.fullName || freshUser.email;
      const initial = (freshUser.fullName || freshUser.email).slice(0, 1).toUpperCase();
      document.getElementById("dashUserInitials").textContent = initial;
      document.getElementById("dashSidebarInitials").textContent = initial;
      renderOverview();
    });
    VivahaForms.wireLiveValidation(form);
  }
  function fillProfile(form) {
    const u = VivahaAuth.currentUser();
    form.fullName.value = u.fullName || "";
    form.email.value = u.email || "";
    form.phone.value = u.phone || "";
    form.partnerName.value = u.partnerName || "";
    form.weddingCity.value = u.weddingCity || "";
    form.weddingDate.value = u.weddingDate || "";
    form.guestCount.value = u.guestCount || "";
  }

  /* ---------------- Saved Plans ---------------- */
  function renderPlans(lang) {
    const wrap = document.getElementById("plansWrap");
    const plans = getUserPlans();
    if (plans.length === 0) {
      wrap.innerHTML = emptyState("fa-clipboard-list", "dashboard.plans.empty", "dashboard.plans.emptyCta", "planner.html");
      I18N.applyToDom(wrap);
      return;
    }
    wrap.innerHTML = plans.map(p => `
      <div class="card" style="margin-bottom:var(--sp-4);">
        <div class="card-body flex-between flex-wrap gap-4">
          <div>
            <h4 style="margin-bottom:4px;" data-i18n="planner.type.${p.selections.type || ''}"></h4>
            <p class="card-meta mb-0"><span data-i18n="dashboard.plans.createdOn"></span>: ${fmtDate(p.createdAt, lang)} · ${p.guests} <span data-i18n="common.guests"></span></p>
          </div>
          <div class="text-right">
            <div class="price-tag">${fmtINR(p.total)}</div>
            <button class="btn btn-ghost btn-sm delete-plan" data-id="${p.id}"><i class="fa-solid fa-trash"></i> <span data-i18n="dashboard.plans.deletePlan"></span></button>
          </div>
        </div>
      </div>`).join("");
    I18N.applyToDom(wrap);
    wrap.querySelectorAll(".delete-plan").forEach(btn => btn.addEventListener("click", () => {
      const all = JSON.parse(localStorage.getItem("vivaha_plans") || "[]").filter(p => p.id !== btn.dataset.id);
      localStorage.setItem("vivaha_plans", JSON.stringify(all));
      renderPlans(lang);
      renderOverview();
    }));
  }

  /* ---------------- Bookings ---------------- */
  function renderBookings(lang) {
    const wrap = document.getElementById("bookingsWrap");
    const bookings = getUserBookings();
    if (bookings.length === 0) {
      wrap.innerHTML = emptyState("fa-calendar-xmark", "dashboard.bookings.empty", null, null);
      I18N.applyToDom(wrap);
      return;
    }
    const statusClass = { confirmed: "chip-emerald", pending: "chip", cancelled: "chip-rose" };
    wrap.innerHTML = `
      <div class="table-row table-head">
        <span data-i18n="dashboard.bookings.colVendor"></span><span data-i18n="dashboard.bookings.colDate"></span>
        <span data-i18n="dashboard.bookings.colAmount"></span><span data-i18n="dashboard.bookings.colStatus"></span>
        <span data-i18n="dashboard.bookings.colAction"></span>
      </div>
      ${bookings.map(b => `
        <div class="table-row">
          <span data-label="Vendor">${b.name}</span>
          <span data-label="Date">${fmtDate(b.date, lang)}</span>
          <span data-label="Amount">${fmtINR(b.amount)}</span>
          <span data-label="Status"><span class="chip ${statusClass[b.status]}" data-i18n="dashboard.bookings.status${cap(b.status)}"></span></span>
          <span data-label="Action">${b.status !== "cancelled" ? `<button class="btn btn-ghost btn-sm cancel-booking" data-id="${b.id}" data-i18n="dashboard.bookings.cancelBtn"></button>` : "—"}</span>
        </div>`).join("")}`;
    I18N.applyToDom(wrap);
    wrap.querySelectorAll(".cancel-booking").forEach(btn => btn.addEventListener("click", () => {
      const all = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]").map(b => b.id === btn.dataset.id ? { ...b, status: "cancelled" } : b);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
      Vivaha.toast(I18N.t("toast.bookingCancelled"), "info");
      renderBookings(lang);
    }));
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------------- Wishlist ---------------- */
  function renderWishlist(lang) {
    const wrap = document.getElementById("wishlistWrap");
    const ids = Vivaha.getWishlist();
    const items = [...VivahaData.venues, ...VivahaData.vendors].filter(x => ids.includes(x.id));
    if (items.length === 0) {
      wrap.innerHTML = emptyState("fa-heart-crack", "dashboard.wishlist.empty", null, null);
      I18N.applyToDom(wrap);
      return;
    }
    wrap.innerHTML = `<div class="grid grid-3">${items.map(it => `
      <div class="card media-card">
        <div class="ph ph-16-9 ${it.ph}">${Illustrations.get(it.type ? it.type : VENDOR_ILLUSTRATION[it.category])}<button class="wish-btn is-active" data-id="${it.id}"><i class="fa-solid fa-heart"></i></button></div>
        <div class="card-body">
          <h4 class="card-title">${it.name[lang]}</h4>
          <p class="card-meta mb-0"><i class="fa-solid fa-location-dot"></i> ${it.city}</p>
        </div>
      </div>`).join("")}</div>`;
    Vivaha.wireWishlistButtons(wrap);
    wrap.querySelectorAll(".wish-btn").forEach(btn => btn.addEventListener("click", () => setTimeout(() => renderWishlist(lang), 50)));
  }

  /* ---------------- Budget ---------------- */
  function renderBudget(lang) {
    const wrap = document.getElementById("budgetWrap");
    const plans = getUserPlans();
    const bookings = getUserBookings();
    const total = plans.length ? plans[0].total : (bookings.reduce((s, b) => s + b.amount, 0) || 1000000);
    const allocated = bookings.filter(b => b.status !== "cancelled").reduce((s, b) => s + b.amount, 0);
    const remaining = Math.max(0, total - allocated);
    const pct = Math.min(100, Math.round((allocated / total) * 100));

    let breakdownHTML = `<p class="form-hint" data-i18n="dashboard.plans.empty"></p>`;
    if (plans.length) {
      const grouped = {};
      Object.keys(VivahaData.plannerCosts).forEach((cat) => {
        const sel = plans[0].selections[cat];
        if (!sel) return;
        const cost = VivahaData.plannerCosts[cat];
        if (Array.isArray(sel)) {
          sel.forEach(s => { if (cost[s]) grouped[cat] = (grouped[cat] || 0) + cost[s]; });
        } else if (cost[sel] !== undefined) {
          grouped[cat] = (grouped[cat] || 0) + (cat === "food" ? cost[sel] * plans[0].guests : cost[sel]);
        }
      });
      breakdownHTML = Object.entries(grouped).map(([key, amt]) => `
        <div class="budget-line"><span data-i18n="planner.steps.${key}"></span><span>${fmtINR(amt)}</span></div>`).join("");
    }

    wrap.innerHTML = `
      <div class="grid grid-3 stat-grid" style="margin-bottom:var(--sp-6);">
        <div class="stat-card"><div class="card-meta" data-i18n="dashboard.budget.totalEstimated"></div><div class="num">${fmtINR(total)}</div></div>
        <div class="stat-card"><div class="card-meta" data-i18n="dashboard.budget.allocated"></div><div class="num">${fmtINR(allocated)}</div></div>
        <div class="stat-card"><div class="card-meta" data-i18n="dashboard.budget.remaining"></div><div class="num">${fmtINR(remaining)}</div></div>
      </div>
      <div class="progress-bar" style="margin-bottom:var(--sp-6);"><span style="width:${pct}%"></span></div>
      <div class="card"><div class="card-body">
        <h4 data-i18n="dashboard.budget.categoryBreakdown"></h4>
        ${breakdownHTML}
      </div></div>`;
    I18N.applyToDom(wrap);
  }

  /* ---------------- Notifications ---------------- */
  function renderNotifications(lang) {
    const wrap = document.getElementById("notifWrap");
    const readIds = JSON.parse(localStorage.getItem(NOTIF_READ_KEY) || "[]");
    wrap.innerHTML = VivahaData.notifications.map(n => `
      <div class="notif-item">
        <div class="dot-icon"><i class="fa-solid ${n.icon}"></i></div>
        <div style="flex:1;">
          <div class="flex-between"><strong>${n.title[lang]}</strong>${!readIds.includes(n.id) ? '<span class="badge-dot"></span>' : ""}</div>
          <p class="mb-0" style="font-size:var(--fs-sm);">${n.desc[lang]}</p>
          <span class="form-hint">${n.time}</span>
        </div>
      </div>`).join("");
    localStorage.setItem(NOTIF_READ_KEY, JSON.stringify(VivahaData.notifications.map(n => n.id)));
  }

  /* ---------------- Settings ---------------- */
  function renderSettings() {
    const wrap = document.getElementById("panel-settings");
    if (wrap.dataset.wired) return;
    wrap.dataset.wired = "true";
    document.getElementById("settingsLangEn").addEventListener("click", () => I18N.setLang("en"));
    document.getElementById("settingsLangHi").addEventListener("click", () => I18N.setLang("hi"));
    document.getElementById("settingsThemeLight").addEventListener("click", () => Vivaha.applyTheme("light"));
    document.getElementById("settingsThemeDark").addEventListener("click", () => Vivaha.applyTheme("dark"));
    document.getElementById("deleteAccountBtn").addEventListener("click", () => {
      if (confirm(I18N.t("dashboard.settings.deleteWarning"))) {
        VivahaAuth.logout();
        location.href = "index.html";
      }
    });
  }

  function emptyState(icon, msgKey, ctaKey, ctaHref) {
    return `<div class="empty-state">
      <i class="fa-solid ${icon}"></i>
      <p data-i18n="${msgKey}"></p>
      ${ctaKey ? `<a href="${ctaHref}" class="btn btn-gold" data-i18n="${ctaKey}"></a>` : ""}
    </div>`;
  }

  function wireSidebar() {
    document.querySelectorAll(".dash-nav button").forEach(btn => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });
  }

  function init() {
    seedBookingsIfEmpty();
    wireSidebar();
    document.getElementById("dashUserName").textContent = user.fullName || user.email;
    document.getElementById("dashUserInitials").textContent = (user.fullName || user.email).slice(0, 1).toUpperCase();
    document.getElementById("dashSidebarName").textContent = user.fullName || user.email;
    document.getElementById("dashSidebarEmail").textContent = user.email || "";
    document.getElementById("dashSidebarInitials").textContent = (user.fullName || user.email).slice(0, 1).toUpperCase();
    const requestedTab = new URLSearchParams(location.search).get("tab") || "overview";
    switchTab(document.querySelector(`.dash-nav button[data-tab="${requestedTab}"]`) ? requestedTab : "overview");
  }

  document.addEventListener("vivaha:ready", init);
  document.addEventListener("vivaha:rerender", () => {
    const active = document.querySelector(".dash-nav button.active");
    if (active) renderPanel(active.dataset.tab);
  });
})();
