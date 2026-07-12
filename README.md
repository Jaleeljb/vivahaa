# Vivaha — Premium Wedding Planner (India) 🪔

A modern, luxury-themed, fully responsive wedding-planning web app for Indian
weddings — built in plain **HTML5, CSS3 and ES6+ JavaScript** with no
framework, no build step, and no backend required to try it out.

Bilingual by design: every label, button, form and message switches between
**English** and **Hindi** instantly, no page reload.

---

## ✨ Features

- **12 pages**: Home, About, Services, Packages, Venues, Vendors, Gallery,
  Contact, Login, Register, Dashboard, and a 10‑step **Plan My Wedding**
  wizard.
- **Bilingual UI** (English / Hindi) via `locales/en.json` & `locales/hi.json`,
  swapped live with a `data-i18n` attribute system — no reload, no framework.
- **Live budget calculator** — the planner wizard totals your estimated
  wedding cost in real time as you pick venue, food, decor, music,
  photography, bridal services, invitations and guest count.
- **Customer dashboard** — Overview, Profile, Saved Plans, Bookings,
  Wishlist, Budget Summary, Notifications, Settings.
- **Search & filter** on Venues (city / type / capacity / keyword) and
  Vendors (category tabs / city / keyword).
- **Wishlist** (heart icon) that works across venues, vendors and the
  dashboard, persisted in `localStorage`.
- **Light / dark mode**, persisted and respecting the OS preference on first
  visit.
- **Glassmorphism** search card & testimonials, soft shadows, rounded
  corners, scroll-reveal animations, a signature "toran" (marigold-garland)
  divider motif between sections.
- **Form validation** (contact, login, register, planner) with inline error
  messages, and **toast notifications** for every action.
- **Demo authentication** — register/login backed by `localStorage` so the
  whole flow works with zero backend. See [Demo login](#demo-login) below.

## 🧱 Tech stack

Plain HTML5 / CSS3 (Flexbox + Grid) / modern JavaScript (ES6+). No React, no
build tooling, no bundler. Icons via Font Awesome (CDN), fonts via Google
Fonts (CDN) — both loaded at runtime by the browser, not part of the
repository.

## 📁 Project structure

```
vivaha/
├── index.html            Home
├── about.html
├── services.html
├── packages.html
├── venues.html
├── vendors.html
├── gallery.html
├── contact.html
├── login.html
├── register.html
├── dashboard.html
├── planner.html           "Plan My Wedding" wizard
├── css/
│   ├── variables.css       Design tokens (colours, type scale, spacing, shadows)
│   ├── main.css            Components & layout
│   └── responsive.css      Breakpoints
├── js/
│   ├── i18n.js              Translation engine (fetches /locales/*.json)
│   ├── main.js               App shell: header/footer, theme, toasts, wishlist
│   ├── data.js                Sample venues/vendors/testimonials/gallery/costs
│   ├── auth.js                 Demo register/login/session (localStorage)
│   ├── forms.js                 Shared client-side validation
│   ├── planner.js                Wizard steps + live budget engine
│   ├── dashboard.js                Dashboard tabs & rendering
│   ├── listings.js                 Venues & Vendors search/filter/modal
│   ├── gallery.js                   Gallery filter + lightbox
│   └── home.js                      Homepage dynamic sections
├── locales/
│   ├── en.json             English strings
│   └── hi.json             Hindi strings (same key structure as en.json)
├── assets/
│   └── favicon.svg
├── vercel.json
├── package.json
└── README.md
```

Icons use the Font Awesome CDN rather than a local icon set, and the brand
mark is an inline SVG in `js/main.js` — so there's no separate `/icons`
folder to maintain.

## 🖼️ About the imagery

Every "photo" slot in this build (hero banners, venue/vendor cards, gallery,
decoration styles) is a **hand-built inline SVG illustration** — a mandap
arch, a palace silhouette, a camera and film reel, a henna-patterned hand,
and so on — rather than a hot-linked stock photo. That was a deliberate
choice, not a placeholder-in-progress:

- **It's guaranteed to render.** There's no external image host to go
  down, get rate-limited, or 404.
- **It's fast.** Each illustration is a few hundred bytes of inline SVG —
  no image requests at all.
- **It's on-brand.** Every scene uses the same ivory/gold ink so it reads
  consistently across all four card-background gradients.

All 19 scenes live in `js/illustrations.js` (`Illustrations.get(key)`),
layered on top of the `.ph` gradient backgrounds defined in `css/main.css`.
Venue types, vendor categories, decoration styles and gallery categories
each map to one of the 19 keys (see the small mapping objects at the top of
`js/home.js`, `js/listings.js`, `js/gallery.js` and `js/dashboard.js`).

**To swap in real photography instead:** replace the `<div class="ph ...">`
markup with an `<img>` (or a `background-image`) wherever `Illustrations.get(...)`
is called, or point `.ph-illustration` at your own photo CDN. Search
`Illustrations.get(` across the `js/` folder to find every call site.

## 🚀 Running locally

Translations are normally loaded with `fetch()` from `locales/en.json` /
`locales/hi.json`. **The full text of both files is also embedded directly
in `js/i18n.js`** as a fallback, so the site renders correctly even if that
fetch can't complete — including when the page is opened directly via
`file://` instead of through a server (a browser blocks `fetch()` on
`file://` pages, which otherwise would leave every piece of text showing
its raw translation key, like `home.hero.title`, instead of real content).

That said, serving it over HTTP is still the better way to preview it, since
it's how the site will actually run once deployed, and any future edits to
`locales/*.json` will only show up live if it's served over HTTP too
(the embedded fallback is a snapshot — see "Customising" below). Any static
server works:

```bash
# Option A — no install
npx serve -l 5000 .

# Option B — Python (already on most machines)
python3 -m http.server 5000

# Option C — via the included npm script
npm run dev
```

Then open `http://localhost:5000`.

## 🔑 Demo login

A demo account is auto-seeded on first load so you can try the dashboard
immediately:

```
Email:    demo@vivaha.in
Password: demo1234
```

Registering a new account works too — everything is stored in your browser's
`localStorage`. This is **a demo auth layer only** (see
[Going to production](#going-to-production)).

## ☁️ Deploying to Vercel

1. Push this folder to a GitHub/GitLab/Bitbucket repo (or use the Vercel CLI
   directly).
2. In Vercel: **Add New → Project → Import** your repo.
3. Framework preset: **Other** (it's a static site — no build command, no
   output directory override needed).
4. Deploy. That's it — `vercel.json` only adds long-lived cache headers for
   `/css`, `/js`, `/assets` and a shorter one for `/locales`.

Or from the CLI, inside this folder:

```bash
npx vercel --prod
```

## 🎨 Customising

- **Colours, type scale, spacing, shadows** — all in `css/variables.css` as
  CSS custom properties. Change `--color-maroon` / `--color-gold` /
  `--color-emerald` to re-theme the whole site.
- **Copy & translations** — edit `locales/en.json` and `locales/hi.json`.
  Keep the two files' key structure identical (there's a small Node/Python
  snippet in the project history you can reuse to diff the keys if you add
  more). `js/i18n.js` also embeds a full copy of both files as a fallback
  (see "Running locally" above) — after a significant content edit,
  regenerate that embedded copy so it doesn't drift from the JSON files;
  the project history has the exact script used to generate it the first time.
- **Sample data** — venues, vendors, packages pricing, testimonials and
  gallery items all live in `js/data.js`.
- **Budget model** — `VivahaData.plannerCosts` in `js/data.js` drives the
  live budget calculator on the planner page.
- **Adding a third language** — duplicate `locales/en.json` to e.g.
  `locales/mr.json`, translate the values, add a button to the `.lang-switch`
  markup in `js/main.js`, and add `"mr"` to `SUPPORTED` in `js/i18n.js`.

## 🔒 Going to production

This is a front-end demo with no server. Before shipping it for real
customers, you'll want to:

- Replace `js/auth.js` with real authentication (an API, Auth0, Firebase
  Auth, etc.) — the current version stores accounts in `localStorage` and is
  **not secure**.
- Replace `js/data.js` with calls to a real API/database for venues, vendors,
  bookings and plans.
- Add a real payments integration for the booking flow.
- Swap the placeholder image tiles for real photography (see above).

## ♿ Accessibility notes

Skip-to-content link, visible focus states, `aria-label`s on icon-only
buttons, form labels associated via `for`/`id`, and a
`prefers-reduced-motion` override that disables animation for people who ask
the OS for it.

## 🌐 Browser support

Built on evergreen web standards (CSS Grid/Flexbox, `fetch`, ES6 classes/
arrow functions, `IntersectionObserver`). Tested against current Chrome,
Edge, Firefox and Safari. No IE11 support.
