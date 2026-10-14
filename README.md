# Godigitale — Marketing Landing Page

> Digital marketing agency landing page for startups & products. Static, single-page marketing site presenting services (paid traffic, growth marketing, marketing automation, product analytics), case studies, process, and a lead-capture form.

**Live site:** _add production URL_
**Type:** Static HTML/CSS/JS (no build step, no framework, no runtime dependency manager)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Head / Meta Configuration](#head--meta-configuration)
- [Page Sections](#page-sections)
- [Custom Scripts](#custom-scripts)
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

This repository contains a single-page marketing site for **Godigitale**, a digital marketing agency. The page is static HTML with hand-rolled CSS and a small set of framework-free JS modules — there is no jQuery, no bundler, and no package manager dependency at runtime. It's designed to be dropped onto any static host as-is.

Core goals of the page:
- Communicate the agency's service offering (paid traffic, chatbots, funnels, marketing automation, growth/product analytics).
- Show a 9-step project timeline to set client expectations on delivery process and deadlines.
- Showcase six case studies (Metarun, Coinchange, Encore, Plaskee, The Hub App, and an anonymized self-storage case).
- Convert visitors via a Typeform-embedded contact form and direct Facebook/LinkedIn/email links.

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Custom CSS (`css/style.css`), BEM-style class naming (`block__element--modifier`) |
| Icons | Font Awesome (`fas`, `far` icon classes) |
| Fonts | Google Fonts — `preconnect` hints only in current `<head>`, no stylesheet `<link>` (see [Known Issues](#known-issues)) |
| Animation | [Rellax.js](https://github.com/dixonandmoe/rellax) (parallax, via CDN), custom `js/marquee.js` (infinite scroll ticker), custom `js/design-scroll.js` (scroll-linked horizontal banner strip) |
| Typing effect | [Typed.js](https://github.com/mattboldt/typed.js) (`js/typed.js` + `.new-products__typed-js` / `.tabs__typed-*` targets) |
| Lead capture | [Typeform](https://www.typeform.com/) embed widget |
| PWA-lite metadata | `site.webmanifest` reference, `theme-color`, `apple-touch-icon` |

No jQuery is loaded anywhere in `index.html`. `marquee.js` and `design-scroll.js` are dependency-free ES scripts exposing `window.Marquee` and `window.HorizontalScrollPin` respectively — see [Custom Scripts](#custom-scripts). No CSS preprocessor pipeline is referenced in the markup; `style.css` is served pre-compiled with a cache-busting query string (`?v=1.0.0`).

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
│   ├── marquee.js               # window.Marquee — infinite ticker (header keywords)
│   ├── design-scroll.js         # window.HorizontalScrollPin — pinned horizontal banner scroll
│   ├── typed.js                 # Typed.js library / init
│   └── scripts.js               # Global site init: tabs, Marquee.init(...), new HorizontalScrollPin(...), cache-busted via ?v=
└── img/
    ├── logo-godigitale.svg
    ├── og-cover.jpg              # referenced by og:image / twitter:image — verify it exists
    ├── i-fare.png / i-fare@2x.png
    ├── spotify-podcast-badge-blk-grn-330x80.svg
    ├── process/                  # Marketing automation illustration assets: norris, i1, i2, i-mank, i-marketo
    ├── banners/                  # Design showcase banners (banner-1..10, some reused across the 13 slots)
    ├── timeline/                 # Timeline step icons: i-start, i-space-invaders, i-settings, i-rocket, i-warning, i-finish
    ├── men-ok.png / men-ok@2x.png
    ├── jdun.png / jdun@2x.png
    ├── wedo/                     # "What else we do" landing samples: lp-1, lp-2, + -mobile variants, + @2x
    └── co-founders/
        ├── arefyeu.png
        └── antsipovich.png
```

> Exact asset paths above are inferred from `index.html` references — verify against the actual repo before relying on this tree.

## Head / Meta Configuration

| Element | Status |
|---|---|
| `charset` / `viewport` | Correctly ordered first for fast parsing |
| `title` / `meta[description]` | Present; no `meta[keywords]` (deprecated, correctly absent) |
| `canonical` | ✅ `https://godigitale.com/` |
| Open Graph (`og:type`, `og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`) | ✅ Full set present |
| Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) | ✅ Present (`summary_large_image`) |
| `theme-color`, `mobile-web-app-capable`, `format-detection` | ✅ Present |
| Favicons | ✅ Full modern set: PNG 96×96, SVG, ICO fallback, Apple touch icon 180×180, `site.webmanifest` |
| `facebook-domain-verification` | ❌ **Not present.** Add it if Facebook Business Manager domain verification is required for this domain, or confirm verification is handled via a DNS TXT record instead |
| Google Fonts | ⚠️ Only `preconnect` hints to `fonts.googleapis.com` / `fonts.gstatic.com`. There is no `<link rel="stylesheet">` for an actual font family and no visible `@font-face` reference in the markup — confirm `style.css` self-hosts the fonts, otherwise typography silently falls back to system fonts while two unused preconnects linger in the head |

## Page Sections

| Section (class) | Purpose |
|---|---|
| `.header` | `.navbar` (logo only) + `.header__content` hero headline + `.marquee` infinite ticker of service keywords |
| `.partner` | "Just Relax with Music" — live embedded Spotify playlist link |
| `.traffic` | Intro copy + `.tabs` component: Traffic / Chat-bot / Funnels, each with a static `.tabs__strings-*` paragraph and an empty `.tabs__typed-*` target for a typing effect |
| `.process` | Marketing automation blurb (Marketo/HubSpot/API/Zapier) with Rellax parallax illustration (`img/process/`) |
| `.design` | `.design__banners` — pinned, scroll-driven horizontal banner strip (see [Custom Scripts](#custom-scripts)) + growth marketing/analytics copy |
| `.timeline` | 9-step numbered `.timeline__box` process + nested `.deadlines` commitment block, in the same `<section>` |
| `.reports` | Reporting transparency callout |
| `.consulting` | Consulting / first-launch strategy blurb |
| `.cases` | Six `.cases__item` case studies: **Metarun**, **Coinchange**, **Encore**, **Plaskee**, **The Hub App**, **Selfstorage\*** (anonymized), each with a services list |
| `.wedo` | "What else we do" — two `.wedo__item` landing-page design samples; heading carries `id="scrollToWhatElseWeDo"` (duplicate ID, see [Known Issues](#known-issues)) |
| `.new-products` | Typed.js animated headline, target `.new-products__typed-js` |
| `.founders` | Founder bios: Aliaksandr Arefyeu & Aliaksandr Antsipovich, each with photo, name, position, Facebook/LinkedIn links; heading also carries `id="scrollToWhatElseWeDo"` (duplicate ID, see [Known Issues](#known-issues)) |
| `.footer` | CTA, contact links (Facebook, LinkedIn, email), embedded Typeform form |

## Custom Scripts

### `js/marquee.js` — `window.Marquee`

Dependency-free rewrite of the jQuery marquee plugin pattern. Exposes `Marquee.init(selector, options)`.

```js
Marquee.init('.marquee', {
  duration: 10000,
  direction: 'left'
});
```

Supports the same option set as typical jQuery marquee plugins (`duration`, `direction`, `duplicated`, `gap`, `pauseOnHover`, `startVisible`, `allowCss3Support`, …), uses CSS animations where supported, and falls back to a `requestAnimationFrame` tween otherwise. Commands: `Marquee.init(selector, 'pause' | 'resume' | 'toggle' | 'destroy')`, or `Marquee.get(el)` for the instance. Requires a browser with private class fields support (Chrome 74+, Safari 14.1+, Firefox 90+).

### `js/design-scroll.js` — `window.HorizontalScrollPin`

Pins `.design` in place while the page scrolls and converts that vertical scroll into a horizontal `translateX` of `.design__banners`, releasing the section once the last banner reaches the edge.

```js
new HorizontalScrollPin(document.querySelector('.design'), {
  strip: '.design__banners',
  ratio: 2,     // page-scroll px spent per 1px of horizontal movement — higher = slower
  smooth: 0.12  // inertia, 0–1; 1 disables smoothing
});
```

Uses `position: sticky` by default and automatically switches to a JS-driven `position: fixed` fallback if an ancestor clips overflow (`overflow: hidden/auto/scroll`), which would otherwise silently break `sticky`. A console warning is emitted when the fallback engages, naming the offending ancestor — resolve it by setting `overflow: clip` on that element where possible, for the smoothest result. Respects `prefers-reduced-motion`.

> Neither script is invoked automatically — both are instantiated from `js/scripts.js`, which is not included in this document.

## Third-Party Integrations

- **Typeform** — lead capture form embedded via `data-tf-widget="fvTlqEpq"` and `//embed.typeform.com/next/embed.js`. Update the widget ID to point at your own Typeform.
- **Rellax.js** — loaded from jsDelivr, unpinned (`dixonandmoe/rellax@master`). Lock to a specific tag/commit before shipping to production.
- **Facebook / LinkedIn** — footer links (`#writeOnFacebookBottom`, `#writeOnLinkedInBottom`) currently point to `href="#"` placeholders; update with real destination URLs before launch.
- **Spotify** — a real, working playlist embed link in `.partner` (not a placeholder).
- **Font Awesome** — `fas`/`far` icon classes are used throughout (tabs, timeline); no Font Awesome `<link>` or kit `<script>` is visible in `<head>` or before `</body>` — confirm it's loaded via `style.css` or elsewhere, or the icons will not render.

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
- Any modern static file server (or open `index.html` directly, though some browsers restrict local `file://` fetches for embedded widgets/scripts).
- Internet connection for CDN-hosted assets (Rellax.js, Typeform embed, Font Awesome if CDN-loaded).

## Customization Guide

| To change... | Edit... |
|---|---|
| Copy / headlines | Directly in `index.html` (no templating layer) |
| Colors, spacing, typography | `css/style.css` |
| Marquee keywords | `.marquee__list` items in `index.html`; init options in `js/scripts.js` via `Marquee.init('.marquee', {...})` |
| Banner strip behavior | `ratio` / `smooth` / `top` options passed to `new HorizontalScrollPin(...)` in `js/scripts.js` |
| Tabs content (Traffic / Chat-bot / Funnels) | `.tabs__box-*` blocks + corresponding `.tabs__typed-*` init in `js/typed.js` / `js/scripts.js` |
| Timeline steps | `.timeline__item` blocks inside `.timeline__box` |
| Case studies | Duplicate a `.cases__item` block and update copy/services list |
| "New products" headline strip | `.new-products__typed-js` target + its Typed.js init |
| Founder bios | `.founders__item` blocks |
| Contact form | Replace the `data-tf-widget` ID with your own Typeform form ID |
| Social/contact links | `.links` lists in footer and founder bios |
| Meta/SEO/social tags | `<head>` — `title`, `meta[name=description]`, canonical, Open Graph, Twitter Card |

## Browser Support

Targets evergreen modern browsers (Chrome, Firefox, Safari, Edge). `js/marquee.js` and `js/design-scroll.js` use private class fields (`#field`), `ResizeObserver` and `IntersectionObserver` — minimum Chrome 74+, Safari 14.1+, Firefox 90+; no polyfills are referenced. Mobile responsiveness is handled via `visible-xs` / `hidden-*` utility classes.

## SEO / Meta

- `<title>`: `Godigitale | Digital Marketing Agency for Startups & Products`
- `meta[description]` populated; `meta[keywords]` correctly absent.
- `canonical` link present.
- Full Open Graph set, including `og:url` (previously a known gap).
- Full Twitter Card set (`summary_large_image`).
- Favicon/manifest set is complete for modern multi-platform support — **confirm all referenced files (`favicon-96x96.png`, `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest`) actually exist at the site root before deploy**, otherwise expect 404 noise in the console/Lighthouse report.
- `og:image` / `twitter:image` point to `img/og-cover.jpg` — confirm the asset exists and is a proper social-preview size (min. 1200×630).

## Known Issues

- **Duplicate `id="scrollToWhatElseWeDo"`** — both the `.wedo__title` heading and the `.founders` heading use this same ID. Invalid HTML; breaks any in-page anchor link or `getElementById` call targeting either section, since only the first match is ever reachable. Rename one (e.g. `id="whatElseWeDo"` vs `id="whoWeAre"`).
- **Identical captions on both `.wedo__item` samples** — both figures read "Design of landing pages and additional materials" despite showing different images (`lp-1` vs `lp-2`). Looks like a copy-paste leftover; give each its own caption.
- **`facebook-domain-verification` meta absent** — confirm with whoever owns Facebook Business Manager for this domain whether verification is required and, if so, add the tag or confirm it's handled via DNS.
- **Google Fonts stylesheet not loaded** — only `preconnect` hints remain in `<head>`; no `<link rel="stylesheet">` or visible `@font-face`. Confirm this is an intentional move to self-hosted fonts, otherwise custom typography silently falls back to system fonts.
- **Font Awesome source not visible in `<head>`** — `fas`/`far` icon classes are used but no CDN `<link>`/kit `<script>` is present; verify it's bundled into `style.css` or loaded elsewhere.
- **Footer Facebook/LinkedIn links are `href="#"` placeholders** — replace with real URLs before launch.
- **Rellax.js pinned to `@master`** — unpinned CDN dependency; a future upstream change could silently alter parallax behavior in production.
- **`design-scroll.js` fixed-mode fallback depends on ancestor overflow** — if any ancestor of `.design` has `overflow: hidden/auto/scroll`, `position: sticky` is silently ignored by the browser; the script detects this and falls back automatically, but confirm no layout ancestor was added later without re-checking this.

## Deployment

Being fully static, this project deploys to any static host:
- Netlify / Vercel (drag-and-drop or connect the repo, no build command needed)
- GitHub Pages
- S3 + CloudFront / any CDN

**Pre-deploy checklist:**
- [ ] Confirm `og:image` / `twitter:image` asset (`img/og-cover.jpg`) exists and is a proper social-preview size (min. 1200×630)
- [ ] Confirm all favicon/manifest files exist at the referenced paths (`/favicon-96x96.png`, `/favicon.svg`, `/favicon.ico`, `/apple-touch-icon.png`, `/site.webmanifest`)
- [ ] Resolve duplicate `id="scrollToWhatElseWeDo"`
- [ ] Fix duplicate caption on the two `.wedo__item` samples
- [ ] Add `facebook-domain-verification` meta tag if still required, or confirm alternate verification
- [ ] Confirm Google Fonts are actually loading (self-hosted, `@font-face`, or restore the stylesheet `<link>`)
- [ ] Confirm Font Awesome is actually loaded (icons will be invisible otherwise)
- [ ] Pin the Rellax.js CDN reference to a version tag instead of `@master`
- [ ] Replace placeholder Facebook/LinkedIn footer hrefs with production values
- [ ] Verify Typeform widget ID belongs to the correct form
- [ ] Confirm no ancestor of `.design` introduces `overflow: hidden/auto/scroll` (check the console for a `[HorizontalScrollPin]` fallback warning)
- [ ] Run Lighthouse for performance/accessibility/SEO pass (marquee/parallax/pinned-scroll animations can impact CLS/perf scores)

## Contributing

1. Fork / branch from `main`.
2. Keep to the existing BEM-ish naming convention in new CSS/HTML — avoid introducing inline `style=""` attributes.
3. Avoid introducing a build step or a jQuery dependency unless the team agrees to it — the project is intentionally build-free and framework-free.
4. Test on mobile viewport widths before opening a PR (site relies on `hidden-xs`/`visible-xs` classes for responsive swaps).
5. Run an HTML validator before merging — duplicate IDs are easy to reintroduce silently.

## License

_Specify a license (e.g., MIT, proprietary/all-rights-reserved) — none is declared in the source provided._

## Contact

- Email: [a@godigitale.com](mailto:a@godigitale.com)