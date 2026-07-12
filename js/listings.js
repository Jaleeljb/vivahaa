/* ==========================================================================
   VIVAHA — LISTINGS (Venues & Vendors)
   Shared search/filter/render logic. Detects which grid is present on the
   page and drives that one; both pages also share the details modal markup.
   ========================================================================== */

(function () {
  const venuesGrid = document.getElementById("venuesGrid");
  const vendorsGrid = document.getElementById("vendorsGrid");
  if (!venuesGrid && !vendorsGrid) return;

  function fmtINR(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }
  function stars(rating) {
    return `<i class="fa-solid fa-star"></i> ${rating.toFixed(1)}`;
  }

  // Vendor categories mostly match illustration keys 1:1; "decorators" is the exception.
  const VENDOR_ILLUSTRATION = { caterers: "catering", decorators: "floral", photographers: "photography", music: "music", makeup: "makeup", invitations: "invitations" };

  function openModal(item, kind, lang) {
    const modal = document.getElementById("detailModal");
    const isVenue = kind === "venue";
    const illustrationKey = isVenue ? item.type : VENDOR_ILLUSTRATION[item.category];
    modal.querySelector(".modal-body").innerHTML = `
      <div class="ph ph-16-9 ${item.ph}" style="border-radius: var(--radius-md); margin-bottom: var(--sp-5);">${Illustrations.get(illustrationKey)}</div>
      <div class="eyebrow">${item.city}${isVenue ? " · " + I18N.t("venues.types." + item.type) : " · " + I18N.t("vendors.categories." + item.category)}</div>
      <h3>${item.name[lang]}</h3>
      <p>${item.tagline[lang]}</p>
      <div class="flex gap-4 flex-wrap" style="margin: var(--sp-4) 0;">
        <span class="rating">${stars(item.rating)} <span class="form-hint">(${item.reviews} ${I18N.t("common.reviews")})</span></span>
        ${isVenue ? `<span class="chip"><i class="fa-solid fa-users"></i>&nbsp;${item.capacity} ${I18N.t("common.guests")}</span>` : ""}
      </div>
      <div class="price-tag" style="margin-bottom: var(--sp-5);">
        ${isVenue ? fmtINR(item.priceMin) + " – " + fmtINR(item.priceMax) : item.priceRange}
        <small>${isVenue ? I18N.t("common.onwards") : ""}</small>
      </div>
      <div class="flex gap-3 flex-wrap">
        <button class="btn btn-maroon btn-lg book-now-btn" data-id="${item.id}" data-name="${item.name[lang]}" data-kind="${kind}" data-amount="${isVenue ? item.priceMin : 150000}">
          <i class="fa-solid fa-calendar-check"></i> <span data-i18n="common.bookNow"></span>
        </button>
        <button class="wish-btn" data-id="${item.id}" style="position:static;"><i class="fa-solid fa-heart"></i></button>
      </div>`;
    I18N.applyToDom(modal);
    Vivaha.wireWishlistButtons(modal);
    modal.querySelector(".book-now-btn").addEventListener("click", handleBookNow);
    modal.classList.add("is-open");
  }

  function handleBookNow(e) {
    const btn = e.currentTarget;
    if (!VivahaAuth.isLoggedIn()) { Vivaha.toast(I18N.t("toast.loginRequired"), "info"); location.href = "login.html"; return; }
    const user = VivahaAuth.currentUser();
    const bookings = JSON.parse(localStorage.getItem("vivaha_bookings") || "[]");
    bookings.push({ id: "bk_" + Date.now(), userId: user.id, name: btn.dataset.name, type: btn.dataset.kind, date: "", amount: parseInt(btn.dataset.amount, 10), status: "pending" });
    localStorage.setItem("vivaha_bookings", JSON.stringify(bookings));
    Vivaha.toast(I18N.t("toast.bookingRequested"), "success");
    document.getElementById("detailModal").classList.remove("is-open");
  }

  function wireModalClose() {
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("is-open"); });
      overlay.querySelector(".modal-close")?.addEventListener("click", () => overlay.classList.remove("is-open"));
    });
  }

  /* ---------------- Venues ---------------- */
  function renderVenues() {
    const lang = I18N.lang();
    const city = document.getElementById("filterCity")?.value || "";
    const type = document.getElementById("filterType")?.value || "";
    const capacity = document.getElementById("filterCapacity")?.value || "";
    const search = (document.getElementById("filterSearch")?.value || "").toLowerCase();

    let list = VivahaData.venues.filter(v => {
      if (city && v.city !== city) return false;
      if (type && v.type !== type) return false;
      if (capacity && v.capacity < parseInt(capacity, 10)) return false;
      if (search && !(v.name[lang].toLowerCase().includes(search) || v.city.toLowerCase().includes(search))) return false;
      return true;
    });

    venuesGrid.innerHTML = list.length ? list.map(v => venueCardHTML(v, lang)).join("") :
      `<div class="empty-state" style="grid-column:1/-1;"><i class="fa-solid fa-magnifying-glass"></i><p data-i18n="common.noResults"></p></div>`;
    I18N.applyToDom(venuesGrid);
    Vivaha.wireWishlistButtons(venuesGrid);
    venuesGrid.querySelectorAll(".view-details").forEach(btn => btn.addEventListener("click", () => {
      openModal(VivahaData.venues.find(v => v.id === btn.dataset.id), "venue", lang);
    }));
    Vivaha.initReveal();
  }

  function venueCardHTML(v, lang) {
    return `
    <div class="card media-card reveal">
      <div class="ph ph-4-3 ${v.ph}">
        ${Illustrations.get(v.type)}
        <button class="wish-btn" data-id="${v.id}"><i class="fa-solid fa-heart"></i></button>
        <span class="ph-label">${I18N.t("venues.types." + v.type)}</span>
      </div>
      <div class="card-body">
        <div class="card-meta"><i class="fa-solid fa-location-dot"></i> ${v.city} &nbsp;·&nbsp; <span class="rating">${stars(v.rating)}</span></div>
        <h4 class="card-title">${v.name[lang]}</h4>
        <p style="font-size:var(--fs-sm);">${v.tagline[lang]}</p>
        <div class="flex-between" style="margin-top:var(--sp-4);">
          <div class="price-tag">${fmtINR(v.priceMin)}<small> ${I18N.t("common.onwards")}</small></div>
          <button class="btn btn-outline btn-sm view-details" data-id="${v.id}" data-i18n="common.viewDetails"></button>
        </div>
      </div>
    </div>`;
  }

  /* ---------------- Vendors ---------------- */
  let activeCategory = "all";
  function renderVendors() {
    const lang = I18N.lang();
    const city = document.getElementById("filterVendorCity")?.value || "";
    const search = (document.getElementById("filterVendorSearch")?.value || "").toLowerCase();

    let list = VivahaData.vendors.filter(v => {
      if (activeCategory !== "all" && v.category !== activeCategory) return false;
      if (city && v.city !== city) return false;
      if (search && !(v.name[lang].toLowerCase().includes(search) || v.city.toLowerCase().includes(search))) return false;
      return true;
    });

    vendorsGrid.innerHTML = list.length ? list.map(v => vendorCardHTML(v, lang)).join("") :
      `<div class="empty-state" style="grid-column:1/-1;"><i class="fa-solid fa-magnifying-glass"></i><p data-i18n="common.noResults"></p></div>`;
    I18N.applyToDom(vendorsGrid);
    Vivaha.wireWishlistButtons(vendorsGrid);
    vendorsGrid.querySelectorAll(".view-details").forEach(btn => btn.addEventListener("click", () => {
      openModal(VivahaData.vendors.find(v => v.id === btn.dataset.id), "vendor", lang);
    }));
    Vivaha.initReveal();
  }

  function vendorCardHTML(v, lang) {
    return `
    <div class="card media-card reveal">
      <div class="ph ph-4-3 ${v.ph}">
        ${Illustrations.get(VENDOR_ILLUSTRATION[v.category])}
        <button class="wish-btn" data-id="${v.id}"><i class="fa-solid fa-heart"></i></button>
        <span class="ph-label">${I18N.t("vendors.categories." + v.category)}</span>
      </div>
      <div class="card-body">
        <div class="card-meta"><i class="fa-solid fa-location-dot"></i> ${v.city} &nbsp;·&nbsp; <span class="rating">${stars(v.rating)}</span></div>
        <h4 class="card-title">${v.name[lang]}</h4>
        <p style="font-size:var(--fs-sm);">${v.tagline[lang]}</p>
        <div class="flex-between" style="margin-top:var(--sp-4);">
          <div class="price-tag" style="font-size:var(--fs-base);">${v.priceRange}</div>
          <button class="btn btn-outline btn-sm view-details" data-id="${v.id}" data-i18n="common.viewDetails"></button>
        </div>
      </div>
    </div>`;
  }

  function populateCitySelect(selectEl, dataset) {
    if (!selectEl) return;
    const cities = [...new Set(dataset.map(x => x.city))].sort();
    selectEl.innerHTML = `<option value="" data-i18n="common.allCategories"></option>` + cities.map(c => `<option value="${c}">${c}</option>`).join("");
    I18N.applyToDom(selectEl); // this select is built after the page's initial i18n sweep, so translate it now
  }

  function applyUrlParams() {
    const params = new URLSearchParams(location.search);
    const cityEl = document.getElementById("filterCity");
    const typeEl = document.getElementById("filterType");
    const capEl = document.getElementById("filterCapacity");
    if (params.get("city") && cityEl) cityEl.value = params.get("city");
    if (params.get("type") && typeEl) typeEl.value = params.get("type");
    if (params.get("guests") && capEl) {
      const guests = parseInt(params.get("guests"), 10);
      const options = [...capEl.options].map(o => o.value).filter(Boolean).map(Number).sort((a, b) => b - a);
      const bestFit = options.find(v => v <= guests);
      if (bestFit) capEl.value = String(bestFit);
    }
  }

  function init() {
    wireModalClose();
    if (venuesGrid) {
      populateCitySelect(document.getElementById("filterCity"), VivahaData.venues);
      applyUrlParams();
      ["filterCity", "filterType", "filterCapacity"].forEach(id => document.getElementById(id)?.addEventListener("change", renderVenues));
      document.getElementById("filterSearch")?.addEventListener("input", renderVenues);
      document.getElementById("clearFilters")?.addEventListener("click", () => {
        ["filterCity", "filterType", "filterCapacity"].forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });
        document.getElementById("filterSearch").value = "";
        renderVenues();
      });
      renderVenues();
    }
    if (vendorsGrid) {
      populateCitySelect(document.getElementById("filterVendorCity"), VivahaData.vendors);
      document.getElementById("filterVendorCity")?.addEventListener("change", renderVendors);
      document.getElementById("filterVendorSearch")?.addEventListener("input", renderVendors);
      document.querySelectorAll(".vendor-tab").forEach(tab => {
        tab.addEventListener("click", () => {
          activeCategory = tab.dataset.cat;
          document.querySelectorAll(".vendor-tab").forEach(t => t.classList.toggle("active", t === tab));
          renderVendors();
        });
      });
      renderVendors();
    }
  }

  document.addEventListener("vivaha:ready", init);
  document.addEventListener("vivaha:rerender", () => { if (venuesGrid) renderVenues(); if (vendorsGrid) renderVendors(); });
})();
