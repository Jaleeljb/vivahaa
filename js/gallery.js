/* ==========================================================================
   VIVAHA — GALLERY PAGE
   Category filter tabs + a simple lightbox for the masonry grid.
   ========================================================================== */

(function () {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  let activeCat = "all";

  // Gallery categories mostly match illustration keys 1:1; "decoration" is the one exception.
  const GALLERY_ILLUSTRATION = { decoration: "floral", mehendi: "mehendi", sangeet: "sangeet", ceremony: "ceremony", reception: "reception", bridal: "bridal" };

  function render() {
    const list = activeCat === "all" ? VivahaData.gallery : VivahaData.gallery.filter(g => g.category === activeCat);
    grid.innerHTML = list.map(g => `
      <button class="gallery-item ph ${g.ph} ph-1-1 reveal" data-cat="${g.category}" aria-label="${g.category}">
        ${Illustrations.get(GALLERY_ILLUSTRATION[g.category])}
        <span class="ph-label" data-i18n="gallery.filters.${g.category}"></span>
      </button>`).join("");
    I18N.applyToDom(grid);
    Vivaha.initReveal();
    grid.querySelectorAll(".gallery-item").forEach(btn => btn.addEventListener("click", () => openLightbox(btn)));
  }

  function openLightbox(btn) {
    const modal = document.getElementById("lightboxModal");
    const phClasses = [...btn.classList].filter(c => c.startsWith("ph-") && c !== "ph-1-1").join(" ");
    const category = btn.dataset.cat;
    modal.querySelector(".modal-body").innerHTML = `<div class="ph ph-16-9 ${phClasses}">${Illustrations.get(GALLERY_ILLUSTRATION[category])}</div>`;
    modal.classList.add("is-open");
  }

  function wireTabs() {
    document.querySelectorAll(".gallery-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        activeCat = tab.dataset.cat;
        document.querySelectorAll(".gallery-tab").forEach(t => t.classList.toggle("active", t === tab));
        render();
      });
    });
    const overlay = document.getElementById("lightboxModal");
    overlay?.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("is-open"); });
    overlay?.querySelector(".modal-close")?.addEventListener("click", () => overlay.classList.remove("is-open"));
  }

  document.addEventListener("vivaha:ready", () => { wireTabs(); render(); });
  document.addEventListener("vivaha:rerender", render);
})();
