/* ==========================================================================
   VIVAHA — APP SHELL
   Injects the header & footer (as JS templates, so every page stays in sync
   without needing a build step or server-side includes), wires up the
   mobile drawer, theme toggle, scroll effects, and toast notifications.
   ========================================================================== */

const Vivaha = (() => {

  const BRAND_SVG = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 3C16 3 10 9 10 16c0 4 3 7 6 7s6-3 6-7C22 9 16 3 16 3Z" fill="currentColor" opacity="0.9"/>
      <path d="M6 24c2.5-3 6-4 10-4s7.5 1 10 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="16" cy="27.5" r="1.4" fill="currentColor"/>
    </svg>`;

  function headerTemplate(active) {
    const nav = [
      ["index.html", "home"], ["about.html", "about"], ["services.html", "services"],
      ["packages.html", "packages"], ["venues.html", "venues"], ["vendors.html", "vendors"],
      ["gallery.html", "gallery"], ["contact.html", "contact"]
    ];
    const links = nav.map(([href, key]) =>
      `<a href="${href}" data-i18n="nav.${key}" class="${active === key ? "active" : ""}"></a>`
    ).join("");

    return `
    <div class="container nav-wrap">
      <a href="index.html" class="brand">${BRAND_SVG}<span data-i18n="meta.siteName"></span></a>
      <nav class="nav-links" aria-label="Primary">${links}</nav>
      <div class="nav-actions">
        <div class="lang-switch" role="group" aria-label="Language">
          <button data-lang="en">EN</button><button data-lang="hi">हि</button>
        </div>
        <button class="icon-btn theme-toggle" aria-label="Toggle dark mode" data-i18n-aria="dashboard.settings.theme">
          <i class="fa-solid fa-sun theme-icon-light"></i><i class="fa-solid fa-moon theme-icon-dark"></i>
        </button>
        <a href="dashboard.html?tab=wishlist" class="icon-btn wishlist-link" aria-label="Wishlist"><i class="fa-solid fa-heart"></i></a>
        <a href="dashboard.html" class="icon-btn auth-only" style="display:none" aria-label="Dashboard"><i class="fa-solid fa-gauge"></i></a>
        <a href="login.html" class="btn btn-outline btn-sm guest-only" data-i18n="nav.login"></a>
        <a href="planner.html" class="btn btn-gold btn-sm" data-i18n="nav.planMyWedding"></a>
        <button class="nav-toggle" aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>
      </div>
    </div>
    <div class="mobile-drawer" id="mobileDrawer">
      <button class="drawer-close" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>
      <nav aria-label="Mobile">${links}
        <a href="dashboard.html" class="auth-only" style="display:none" data-i18n="nav.dashboard"></a>
        <a href="login.html" class="guest-only" data-i18n="nav.login"></a>
        <a href="register.html" class="guest-only" data-i18n="nav.register"></a>
      </nav>
      <div class="drawer-foot">
        <div class="lang-switch" role="group" aria-label="Language">
          <button data-lang="en">EN</button><button data-lang="hi">हि</button>
        </div>
        <a href="planner.html" class="btn btn-gold btn-sm" data-i18n="nav.planMyWedding"></a>
      </div>
    </div>`;
  }

  function footerTemplate() {
    return `
    <div class="container">
      <div class="divider-toran on-dark" aria-hidden="true" style="margin-bottom: var(--sp-7);"></div>
      <div class="footer-grid">
        <div>
          <a href="index.html" class="brand">${BRAND_SVG}<span data-i18n="meta.siteName"></span></a>
          <p class="footer-desc" data-i18n="footer.about"></p>
          <div class="social-icons">
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
            <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
        <div>
          <h4 data-i18n="footer.quickLinks"></h4>
          <a href="about.html" data-i18n="nav.about"></a>
          <a href="venues.html" data-i18n="nav.venues"></a>
          <a href="vendors.html" data-i18n="nav.vendors"></a>
          <a href="gallery.html" data-i18n="nav.gallery"></a>
          <a href="contact.html" data-i18n="nav.contact"></a>
        </div>
        <div>
          <h4 data-i18n="footer.ourServices"></h4>
          <a href="services.html#catering" data-i18n="home.categories.catering"></a>
          <a href="services.html#decoration" data-i18n="home.categories.decoration"></a>
          <a href="services.html#photography" data-i18n="home.categories.photography"></a>
          <a href="services.html#music" data-i18n="home.categories.music"></a>
          <a href="packages.html" data-i18n="nav.packages"></a>
        </div>
        <div class="footer-col-newsletter">
          <h4 data-i18n="footer.getInTouch"></h4>
          <ul class="footer-contact">
            <li><i class="fa-solid fa-location-dot"></i><span data-i18n="footer.address"></span></li>
            <li><i class="fa-solid fa-phone"></i><span data-i18n="footer.phone"></span></li>
            <li><i class="fa-solid fa-envelope"></i><span data-i18n="footer.email"></span></li>
          </ul>
          <p class="form-hint" data-i18n="footer.newsletterTitle" style="color:rgba(249,241,226,0.6); margin-top: var(--sp-4);"></p>
          <form class="newsletter-row" id="newsletterForm">
            <input type="email" required data-i18n-placeholder="footer.newsletterPlaceholder" aria-label="Email">
            <button type="submit" data-i18n="common.subscribe"></button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="footerYear"></span> <span data-i18n="meta.siteName"></span>. <span data-i18n="footer.rights"></span></span>
        <div class="flex gap-4">
          <a href="#" data-i18n="footer.privacy"></a>
          <a href="#" data-i18n="footer.terms"></a>
        </div>
      </div>
    </div>`;
  }

  function injectShell(active) {
    const headerEl = document.getElementById("app-header");
    const footerEl = document.getElementById("app-footer");
    if (headerEl) {
      headerEl.className = "site-header " + (headerEl.dataset.transparent === "true" ? "header--transparent" : "");
      headerEl.innerHTML = headerTemplate(active);
    }
    if (footerEl) {
      footerEl.className = "site-footer";
      footerEl.innerHTML = footerTemplate();
      const yearEl = document.getElementById("footerYear");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
  }

  function wireHeaderBehavior() {
    const header = document.getElementById("app-header");
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const toggle = document.querySelector(".nav-toggle");
    const drawer = document.getElementById("mobileDrawer");
    const closeBtn = document.querySelector(".drawer-close");
    if (toggle && drawer) {
      toggle.addEventListener("click", () => drawer.classList.add("is-open"));
      closeBtn?.addEventListener("click", () => drawer.classList.remove("is-open"));
      drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => drawer.classList.remove("is-open")));
    }

    document.querySelectorAll(".theme-toggle").forEach(btn => {
      btn.addEventListener("click", toggleTheme);
    });

    const newsletterForm = document.getElementById("newsletterForm");
    newsletterForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      toast(I18N.t("toast.subscribed"), "success");
      newsletterForm.reset();
    });

    refreshAuthUI();
  }

  /* ---- Theme (light/dark) ---- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("vivaha_theme", theme);
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }
  function initTheme() {
    const saved = localStorage.getItem("vivaha_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
  }

  /* ---- Toast notifications ---- */
  function ensureToastStack() {
    let stack = document.querySelector(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      stack.setAttribute("aria-live", "polite");
      document.body.appendChild(stack);
    }
    return stack;
  }
  function toast(message, type = "success", duration = 4200) {
    const stack = ensureToastStack();
    const icon = type === "error" ? "fa-circle-exclamation" : type === "info" ? "fa-circle-info" : "fa-circle-check";
    const el = document.createElement("div");
    el.className = `toast toast-${type}`;
    el.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    stack.appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateX(30px)";
      el.style.transition = "all .3s ease";
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  /* ---- Illustrations (static markup slots, e.g. hero banners) ---- */
  function applyIllustrations(root = document) {
    root.querySelectorAll("[data-illustration]").forEach(el => {
      if (el.dataset.illustrationApplied) return;
      el.insertAdjacentHTML("afterbegin", Illustrations.get(el.dataset.illustration));
      el.dataset.illustrationApplied = "true";
    });
  }

  /* ---- Scroll reveal ---- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (typeof window.IntersectionObserver !== "function" || items.length === 0) {
      items.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(el => obs.observe(el));
  }

  /* ---- Wishlist (shared across venues / vendors / gallery pages) ---- */
  const WISHLIST_KEY = "vivaha_wishlist";
  function getWishlist() { return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]"); }
  function isWishlisted(id) { return getWishlist().includes(id); }
  function toggleWishlist(id) {
    let list = getWishlist();
    const active = list.includes(id);
    list = active ? list.filter(x => x !== id) : [...list, id];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    toast(I18N.t(active ? "toast.removedWishlist" : "toast.addedWishlist"), active ? "info" : "success");
    return !active;
  }
  function wireWishlistButtons(root = document) {
    root.querySelectorAll(".wish-btn").forEach(btn => {
      const id = btn.dataset.id;
      btn.classList.toggle("is-active", isWishlisted(id));
      btn.addEventListener("click", (e) => {
        e.preventDefault(); e.stopPropagation();
        const nowActive = toggleWishlist(id);
        btn.classList.toggle("is-active", nowActive);
      });
    });
  }

  /* ---- Auth UI toggling (guest-only / auth-only elements) ---- */
  function refreshAuthUI() {
    const loggedIn = !!localStorage.getItem("vivaha_current_user");
    document.querySelectorAll(".auth-only").forEach(el => el.style.display = loggedIn ? "" : "none");
    document.querySelectorAll(".guest-only").forEach(el => el.style.display = loggedIn ? "none" : "");
  }

  /* ---- Page loader ---- */
  function hidePageLoader() {
    const loader = document.querySelector(".page-loader");
    if (loader) setTimeout(() => loader.classList.add("is-hidden"), 200);
  }

  /* ---- FAQ accordion (generic) ---- */
  function initFaqAccordions() {
    document.querySelectorAll(".faq-item").forEach(item => {
      const q = item.querySelector(".faq-q");
      const a = item.querySelector(".faq-a");
      q?.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        item.parentElement.querySelectorAll(".faq-item").forEach(other => {
          other.classList.remove("is-open");
          other.querySelector(".faq-a").style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("is-open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  }

  /* ---- Init ---- */
  function init(activePage) {
    initTheme();
    injectShell(activePage);
    wireHeaderBehavior();
    I18N.init().then(() => {
      I18N.onChange(() => {
        document.dispatchEvent(new Event("vivaha:rerender"));
      });
      document.dispatchEvent(new Event("vivaha:ready"));
      initReveal();
      initFaqAccordions();
      applyIllustrations();
      hidePageLoader();
    });
  }

  return {
    init, toast, applyTheme, getWishlist, isWishlisted, toggleWishlist, wireWishlistButtons,
    refreshAuthUI, initReveal, initFaqAccordions, hidePageLoader, applyIllustrations, BRAND_SVG
  };
})();
