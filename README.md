# Godigitale — Marketing Landing Page

> Digital marketing agency landing page for startups & products. Static, single-page marketing site presenting services (paid traffic, growth marketing, marketing automation, product analytics), case studies, process, and a lead-capture form.

**Live site:** _add production URL_
**Type:** Static HTML/CSS/JS (no build step, no framework)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Head / Meta Configuration](#head--meta-configuration)
- [Page Sections](#page-sections)
- [Third-Party Integrations](#third-party-integrations)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Browser Support](#browser-support)
- [SEO / Meta](#seo--meta)
- [Known Issues](#known-issues)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

This repository contains a single-page marketing site for **Godigitale**, a digital marketing agency. The page is built as static HTML with hand-rolled CSS and a handful of small vanilla JS modules (no bundler, no framework, no package manager dependency at runtime). It's designed to be dropped onto any static host as-is.

Core goals of the page:
- Communicate the agency's service offering (paid traffic, chatbots, funnels, marketing automation, growth/product analytics).
- Show a project timeline / working process to set client expectations.
- Showcase case studies (Metarun, Coinchange, Encore, Plaskee, The Hub App, and an anonymized self-storage case).
- Convert visitors via a Typeform-embedded contact form and direct Facebook/LinkedIn/email links.

## Tech Stack

| Layer            | Technology                                            |
|-------------------|--------------------------------------------------------|
| Markup            | Semantic HTML5                                        |
| Styling           | Custom CSS (`css/style.css`), BEM-style class naming (`block__element--modifier`) |
| Icons             | Font Awesome (`fas`, `far`, `fab` icon classes)        |
| Fonts             | Google Fonts (`preconnect` only in current `<head>` — see [Known Issues](#known-issues)) |
| Animation         | [Rellax.js](https://github.com/dixonandmoe/rellax) (parallax), custom `marquee.js` (scrolling ticker), `design-scroll.js` |
| Typing effect     | [Typed.js](https://github.com/mattboldt/typed.js) (`typed.js` + custom `*__typed-*` / `*-typed-js` targets) |
| Lead capture      | [Typeform](https://www.typeform.com/) embed widget |
| PWA-lite metadata | `manifest.json` reference, `theme-color`, `apple-touch-icon` |

No build tooling (Webpack/Vite/etc.), no CSS preprocessor pipeline is referenced directly in the markup — `style.css` is served pre-compiled with a cache-busting query string (`?v=1.0.0`).

## Project Structure

```
.
├── index.html                  # Single-page site (this document)
├── favicon.ico
├── favicon.svg
├── favicon-96x96.png
├── apple-touch-icon.png        # 180x180
├── site.webmanifest            # referenced in <head>, must exist at deploy root
├── css/
│   └── style.css               # Primary stylesheet (cache-busted via ?v=)
├── js/
│   ├── marquee.js              # Powers the scrolling keyword ticker in the header
│   ├── design-scroll.js        # Scroll-linked behavior for the "design" banner section
│   ├── typed.js                # Typed.js library / init
│   └── scripts.js              # Global site scripts (nav, tabs, misc), cache-busted via ?v=
└── img/
    ├── logo-godigitale.svg
    ├── og-cover.jpg             # referenced by og:image / twitter:image — verify it exists
    ├── i-fare.png / i-fare@2x.png
    ├── spotify-podcast-badge-blk-grn-330x80.svg
    ├── process/                 # Marketing automation illustration assets (renamed from "auto/": norris, i1, i2, i-mank, i-marketo)
    ├── banners/                 # Rotating design showcase banners (banner-1..10)
    ├── timeline/                 # Timeline step icons (i-start, i-space-invaders, i-settings, i-rocket, i-warning, i-finish)
    ├── men-ok.png / men-ok@2x.png
    ├── jdun.png / jdun@2x.png
    ├── wecan/                    # "What else we do" landing samples (lp-1, lp-2, + -mobile variants)
    └── co-founders/
        ├── arefyeu.png
        └── antsipovich.png
```

> Note: exact asset paths above are inferred from `index.html` references — verify against the actual repo before relying on this tree. The `img/auto/` folder from the previous revision was renamed to `img/process/`; update any external references/CDN caches accordingly.

## Head / Meta Configuration

The `<head>` was reworked from a minimal set to a production-oriented one:

| Element | Status |
|---|---|
| `charset` / `viewport` | Correctly ordered first for fast parsing |
| `title` / `meta[description]` | Present, no longer includes `meta[keywords]` (deprecated, correctly dropped) |
| `canonical` | ✅ Added — `https://godigitale.com/` |
| Open Graph (`og:type`, `og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`) | ✅ Full set added |
| Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) | ✅ Added |
| `theme-color`, `mobile-web-app-capable`, `format-detection` | ✅ Present |
| Favicons | ✅ Full modern set: PNG 96×96, SVG, ICO fallback, Apple touch icon 180×180, `site.webmanifest` |
| `facebook-domain-verification` | ⚠️ **Removed in this revision** — re-add if Facebook Business Manager domain verification is still required, or confirm verification was migrated to DNS TXT record |
| Google Fonts | ⚠️ Only `preconnect` hints remain; the actual `<link rel="stylesheet">` font request was removed — confirm this is intentional (e.g., font now self-hosted or loaded via `style.css` `@font-face`), otherwise custom fonts will silently fall back to system fonts |

## Page Sections

| Section (class)              | Purpose |
|-------------------------------|---------|
| `.header`                    | Nav + hero headline + infinite marquee (`.marquee` / `.marquee__list` / `.marquee__item`) of service keywords |
| `.partner`                   | "Just Relax with Music" — embedded Spotify playlist link (brand/culture touch) |
| `.traffic`                   | Tabbed panel: Traffic / Chat-bot / Funnels services, with Typed.js copy |
| `.process`                   | Marketing automation blurb (Marketo/HubSpot/API/Zapier) with parallax illustration, assets now under `img/process/` |
| `.design`                    | Auto-scrolling banner strip + growth marketing/analytics copy |
| `.section-timeline`          | 9-step numbered process timeline + "deadlines" commitment block |
| `.section-reports`           | Reporting transparency callout |
| `.section-wework`            | Consulting / first-launch strategy blurb |
| `.section-speak-support` (×6) | Case studies: **Metarun**, **Coinchange**, **Encore**, **Plaskee**, **The Hub App**, **Selfstorage\*** (anonymized), each with a services list |
| `.section-wecan`             | "What else we do" — landing page design samples (has `id="scrollToWhatElseWeDo"` — see [Known Issues](#known-issues)) |
| `.new-products`              | Typed.js animated headline strip (renamed from `.section-launch-new-products`; target is now `.new-products__typed-js`) |
| `.founders`                  | **Now a standalone top-level section** (previously nested inside `.section-wecan`). Founder bios: Aliaksandr Arefyeu & Aliaksandr Antsipovich, with social links. Also has `id="scrollToWhatElseWeDo"` — duplicate ID, see [Known Issues](#known-issues) |
| `.footer`                     | CTA, contact links (Facebook Messenger, LinkedIn, email), embedded Typeform form |

## Third-Party Integrations

- **Typeform** — lead capture form embedded via `data-tf-widget="fvTlqEpq"` and `embed.js`. Update the widget ID to point at your own Typeform.
- **Rellax.js** — loaded from jsDelivr CDN (`dixonandmoe/rellax@master`). Still unpinned — consider locking to a specific tag/commit for production stability.
- **Facebook** — Messenger deep link (`m.me/<page-id>`) in the footer; update the page ID before going live. Domain verification meta tag is currently **absent** (see Known Issues).
- **Spotify** — public playlist embed link (marketing/culture element, not functional to conversion).
- **Font Awesome** — icon classes are used (`fas fa-rocket`, `far fa-comment-alt`, `fab fa-facebook-square`, etc.); the CSS/kit `<link>`/`<script>` still isn't visible in the provided `<head>` — confirm it's loaded somewhere (e.g., inside `style.css` via `@import`, or a kit script before `</body>`), or icons won't render.

## Getting Started

This is a static site — no dependency installation or build step is required.

```bash
# Clone
git clone <repo-url>
cd godigitale

# Serve locally (any static server works)
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:<port>` in your browser.

### Requirements
- Any modern static file server (or just open `index.html` directly, though some browsers restrict local `file://` fetches for embedded widgets/scripts).
- Internet connection for CDN-hosted assets (Rellax.js, Typeform embed, Font Awesome if CDN-loaded).

## Customization Guide

| To change...                  | Edit... |
|-------------------------------|---------|
| Copy / headlines               | Directly in `index.html` (no templating layer) |
| Colors, spacing, typography    | `css/style.css` |
| Marquee keywords                | `.marquee__list` items in `index.html` |
| Tabs content (Traffic/Chat-bot/Funnels) | `.tabs__box-*` blocks + `js/marquee.js`/`js/typed.js` init |
| Timeline steps                 | `.g-timeline-item` blocks |
| Case studies                   | Duplicate a `.section-speak-support` block and update copy/services list |
| "New products" headline strip  | `.new-products__typed-js` target + its Typed.js init in `js/typed.js` or `js/scripts.js` |
| Founder bios                   | `.founders__item` blocks — note the two empty `.founders__item` placeholders currently sit unused above the actual bio markup (dead markup, see Known Issues) |
| Contact form                   | Replace the `data-tf-widget` ID with your own Typeform form ID |
| Social/contact links            | `.g-contacts` lists in footer/founder bios |
| Meta/SEO/social tags             | `<head>` — `title`, `meta[name=description]`, canonical, Open Graph, Twitter Card |

## Browser Support

Targets evergreen modern browsers (Chrome, Firefox, Safari, Edge). No polyfills are referenced. Mobile responsiveness is handled via the `visible-xs` / `hidden-*` utility classes.

## SEO / Meta

Currently set (updated from the previous revision):
- `<title>`: `Godigitale | Digital Marketing Agency for Startups & Products`
- `meta[description]` populated; `meta[keywords]` correctly removed (long deprecated, no ranking value).
- `canonical` link present.
- Full Open Graph set (`og:type`, `og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`) — previously only `og:title` was set with an empty `og:url`.
- Full Twitter Card set (`summary_large_image`).
- Favicon/manifest set is complete for modern multi-platform support — **confirm all referenced files (`favicon-96x96.png`, `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest`) actually exist at the site root before deploy**, otherwise you'll get 404 noise in the console/Lighthouse report.
- `og:image` / `twitter:image` point to `img/og-cover.jpg` — asset must be created/added; not present in the previous asset inventory.

## Known Issues

- **Duplicate `id="scrollToWhatElseWeDo"`** — both `.section-wecan` and `.founders` now use this same ID. Invalid HTML; breaks any in-page anchor link or `getElementById` call targeting either section, since only the first match will ever be reachable. Rename one (e.g. `id="whatElseWeDo"` vs `id="whoWeAre"`).
- **Dead/empty `.founders__items` markup** — two empty `.founders__item` `<div>`s render before the actual founder bio blocks (which still use the old ad-hoc `.text` + inline `style=""` layout). Looks like an in-progress refactor toward a `.founders__item` component that was never finished — either complete the refactor (move bios into `.founders__item`) or remove the empty divs.
- **Inline styles on founder bios** (`style="margin: 0px 100px 50px 0px; float: left;"`, `style="max-width: 200px; ..."`) — float-based layout, no clearfix visible; should be migrated to `.founders__item` classes in `style.css` for consistency with the rest of the codebase's BEM approach and to avoid layout breakage on narrow viewports.
- **`facebook-domain-verification` meta removed** — flag with whoever owns Facebook Business Manager for this domain; if verification is still required, either restore the tag or confirm it was replaced with a DNS-based verification method.
- **Google Fonts stylesheet link removed, only `preconnect` remains** — if this wasn't an intentional move to self-hosted fonts, custom typography will silently fail and fall back to system fonts.
- **Font Awesome source still not visible in `<head>`** — carried over from the previous revision, still unresolved.

## Deployment

Being fully static, this project deploys to any static host:
- Netlify / Vercel (drag-and-drop or connect the repo, no build command needed)
- GitHub Pages
- S3 + CloudFront / any CDN

**Pre-deploy checklist:**
- [ ] Confirm `og:image` / `twitter:image` asset (`img/og-cover.jpg`) exists and is a proper social-preview size (min. 1200×630)
- [ ] Confirm all favicon/manifest files exist at the referenced paths (`/favicon-96x96.png`, `/favicon.svg`, `/favicon.ico`, `/apple-touch-icon.png`, `/site.webmanifest`)
- [ ] Resolve duplicate `id="scrollToWhatElseWeDo"`
- [ ] Decide on and clean up the `.founders__items` empty-div / inline-style situation
- [ ] Re-add `facebook-domain-verification` meta tag if still required, or confirm alternate verification
- [ ] Confirm Google Fonts are actually loading (self-hosted, `@font-face`, or restore the stylesheet `<link>`)
- [ ] Confirm Font Awesome is actually loaded (icons will be invisible otherwise)
- [ ] Pin the Rellax.js CDN reference to a version tag instead of `@master`
- [ ] Replace placeholder Facebook Messenger page ID with production value
- [ ] Verify Typeform widget ID belongs to the correct form
- [ ] Run Lighthouse for performance/accessibility/SEO pass (marquee/parallax animations can impact CLS/perf scores)

## Contributing

1. Fork / branch from `main`.
2. Keep to the existing BEM-ish naming convention in new CSS/HTML — avoid reintroducing inline `style=""` attributes (see Known Issues).
3. Avoid introducing a build step unless the team agrees to it — the project is intentionally build-free.
4. Test on mobile viewport widths before opening a PR (site relies on `hidden-xs`/`visible-xs` classes for responsive swaps).
5. Run an HTML validator before merging — this revision introduced a duplicate-ID regression that a validator would have caught.

## License

_Specify a license (e.g., MIT, proprietary/all-rights-reserved) — none is declared in the source provided._

## Contact

- Email: [a@godigitale.com](mailto:a@godigitale.com)