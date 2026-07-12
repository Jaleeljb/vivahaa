/* ==========================================================================
   VIVAHA — HOMEPAGE
   Renders the data-driven sections of index.html. Static marketing copy
   lives directly in the HTML via data-i18n attributes.
   ========================================================================== */

(function () {
  const root = document.getElementById("featuredVenues");
  if (!root) return;

  function fmtINR(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }

  function renderFeaturedVenues(lang) {
    root.innerHTML = VivahaData.venues.filter(v => v.featured).slice(0, 6).map(v => `
      <div class="card media-card reveal">
        <div class="ph ph-4-3 ${v.ph}">
          ${Illustrations.get(v.type)}
          <button class="wish-btn" data-id="${v.id}"><i class="fa-solid fa-heart"></i></button>
          <span class="ph-label" data-i18n="venues.types.${v.type}"></span>
        </div>
        <div class="card-body">
          <div class="card-meta"><i class="fa-solid fa-location-dot"></i> ${v.city} &nbsp;·&nbsp; <i class="fa-solid fa-star" style="color:var(--color-gold-dark)"></i> ${v.rating}</div>
          <h4 class="card-title">${v.name[lang]}</h4>
          <div class="flex-between" style="margin-top:var(--sp-3);">
            <div class="price-tag">${fmtINR(v.priceMin)}<small> ${I18N.t("common.onwards")}</small></div>
            <a href="venues.html" class="btn btn-outline btn-sm" data-i18n="common.viewDetails"></a>
          </div>
        </div>
      </div>`).join("");
    I18N.applyToDom(root);
    Vivaha.wireWishlistButtons(root);
  }

  function renderCaterers(lang) {
    const el = document.getElementById("popularCaterers");
    el.innerHTML = VivahaData.vendors.filter(v => v.category === "caterers").map(v => `
      <div class="card media-card reveal">
        <div class="ph ph-4-3 ${v.ph}">${Illustrations.get("catering")}<span class="ph-label">${v.city}</span></div>
        <div class="card-body">
          <h4 class="card-title">${v.name[lang]}</h4>
          <p style="font-size:var(--fs-sm);">${v.tagline[lang]}</p>
          <div class="flex-between">
            <span class="rating"><i class="fa-solid fa-star"></i> ${v.rating}</span>
            <a href="vendors.html" class="btn btn-ghost btn-sm" data-i18n="common.viewDetails"></a>
          </div>
        </div>
      </div>`).join("");
    I18N.applyToDom(el);
  }

  function renderDecoration(lang) {
    const el = document.getElementById("decorationStyles");
    el.innerHTML = VivahaData.decorationStyles.map(d => `
      <div class="card media-card reveal">
        <div class="ph ph-1-1 ${d.ph}">${Illustrations.get(d.illustration)}<span class="ph-label">${d.name[lang]}</span></div>
        <div class="card-body">
          <h4 class="card-title">${d.name[lang]}</h4>
          <p style="font-size:var(--fs-sm);" class="mb-0">${d.desc[lang]}</p>
        </div>
      </div>`).join("");
  }

  function renderMusic(lang) {
    const el = document.getElementById("musicServices");
    el.innerHTML = VivahaData.musicServices.map(m => `
      <div class="cat-card card reveal">
        <div class="cat-icon"><i class="fa-solid ${m.icon}"></i></div>
        <h4>${m.name[lang]}</h4>
        <p>${m.desc[lang]}</p>
      </div>`).join("");
  }

  function renderTestimonials(lang) {
    const el = document.getElementById("testimonialsWrap");
    el.innerHTML = VivahaData.testimonials.map(t => `
      <div class="testimonial-card reveal">
        <span class="quote-mark">"</span>
        <p style="color:inherit;opacity:0.9;">${t.quote[lang]}</p>
        <div class="testi-person">
          <div class="avatar-badge">${t.initials}</div>
          <div>
            <strong style="display:block;">${t.name}</strong>
            <span class="rating">${"★".repeat(Math.round(t.rating))} <span style="opacity:0.6;">· ${t.city}</span></span>
          </div>
        </div>
      </div>`).join("");
  }

  // Gallery categories mostly match illustration keys 1:1; "decoration" is the one exception.
  const GALLERY_ILLUSTRATION = { decoration: "floral", mehendi: "mehendi", sangeet: "sangeet", ceremony: "ceremony", reception: "reception", bridal: "bridal" };

  function renderGalleryPreview(lang) {
    const el = document.getElementById("galleryPreview");
    el.innerHTML = VivahaData.gallery.slice(0, 8).map(g => `
      <div class="ph ph-1-1 ${g.ph} reveal">${Illustrations.get(GALLERY_ILLUSTRATION[g.category])}</div>`).join("");
  }

  function renderAll() {
    const lang = I18N.lang();
    renderFeaturedVenues(lang);
    renderCaterers(lang);
    renderDecoration(lang);
    renderMusic(lang);
    renderTestimonials(lang);
    renderGalleryPreview(lang);
    Vivaha.initReveal();
  }

  document.addEventListener("vivaha:ready", renderAll);
  document.addEventListener("vivaha:rerender", renderAll);
})();
