# Godigitale — Marketing Landing Page

> Digital marketing agency landing page for startups & products. Static, single-page marketing site presenting services (paid traffic, growth marketing, marketing automation, product analytics), case studies, process, and a lead-capture form.

**Live site:** _add production URL_
**Type:** Static HTML/CSS/JS — no build step, no bundler, no JS framework. Bootstrap 5.3.8 CSS is loaded via CDN for grid/utilities only (no Bootstrap JS bundle, no jQuery).

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Head / Meta Configuration](#head--meta-configuration)
- [CSS Architecture](#css-architecture)
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

This repository contains a single-page marketing site for **Godigitale**, a digital marketing agency. The page is static HTML; layout mechanics (grid, flex, spacing, visibility, position) are increasingly expressed as **Bootstrap 5.3.8 utility classes directly in the markup**, while `css/style.css` holds bespoke visual values (brand colors, fonts, exact offsets, transitions, keyframes). There is no jQuery, no bundler, and no build pipeline.

Core goals of the page:
- Communicate the agency's service offering (paid traffic, chatbots, funnels, marketing automation, growth/product analytics).
- Show a 9-step project timeline to set client expectations on delivery process and deadlines.
- Showcase six case studies (Metarun, Coinchange, Encore, Plaskee, The Hub App, and an anonymized self-storage case).
- Convert visitors via a Typeform-embedded contact form and direct Facebook/LinkedIn/email links.

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| CSS framework | [Bootstrap 5.3.8](https://getbootstrap.com/) — CSS only, loaded from jsDelivr with an SRI `integrity` hash. Used for the grid (`row`/`col-*`), flex and display utilities (`d-flex`, `d-none`, `position-*`), spacing (`mt-*`, `mb-*`, `p-0`), and text helpers (`text-white`, `text-nowrap`). **No `bootstrap.bundle.min.js` is loaded** — no Bootstrap component (tabs, dropdowns, carousel) is used; the on-page `.tabs` widget is bespoke |
| Styling | Custom CSS (`css/style.css`), BEM-style class naming (`block__element--modifier`), layered on top of Bootstrap and loaded after it so it can override Bootstrap defaults (e.g. a custom `.container` max-width) |
| Icons | Font Awesome v5.8.1 (`fas`, `far` icon classes), loaded at runtime from `use.fontawesome.com` by `js/scripts.js` — see [Custom Scripts](#custom-scripts) |
| Fonts | `'Space Mono'` self-hosted via `@font-face` (italic/bold/regular, `../fonts/SpaceMono-*.woff2`) for all headings/titles; body copy (`'Roboto', Arial, ...`) and an apparently-unused `'Roboto Mono'` are fetched from Google Fonts at runtime by `js/scripts.js`, not via a `<link>` in `<head>` — see [Custom Scripts](#custom-scripts) and [Known Issues](#known-issues) |
| Animation | [Rellax.js](https://github.com/dixonandmoe/rellax) (parallax, via CDN), custom `js/marquee.js` (infinite scroll ticker), custom `js/design-scroll.js` (scroll-linked horizontal banner strip) |
| Typing effect | [Typed.js](https://github.com/mattboldt/typed.js) (`js/typed.js` + `.new-products__typed-js` / `.tabs__typed-*` targets); cursor blink keyframe lives in `style.css` |
| Lead capture | [Typeform](https://www.typeform.com/) embed widget |
| PWA-lite metadata | `site.webmanifest` reference, `theme-color`, `apple-touch-icon` |

`marquee.js` and `design-scroll.js` are dependency-free ES scripts exposing `window.Marquee` and `window.HorizontalScrollPin` respectively — see [Custom Scripts](#custom-scripts). No CSS preprocessor pipeline is referenced in the markup; both `bootstrap.min.css` and `style.css` are served as plain, pre-compiled stylesheets, the latter cache-busted via `?v=1.0.0`.

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
│   └── style.css               # Custom stylesheet, loaded after Bootstrap (cache-busted via ?v=)
├── fonts/
│   └── SpaceMono-*.woff2                        # self-hosted font files referenced by @font-face
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

> Exact asset paths above are inferred from `index.html` / `style.css` references — verify against the actual repo before relying on this tree.

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
| Bootstrap CSS | ✅ `bootstrap@5.3.8` pinned by exact version and SRI `integrity` hash — good practice, unlike the unpinned Rellax CDN reference (see [Known Issues](#known-issues)) |
| `facebook-domain-verification` | ❌ **Not present.** Add it if Facebook Business Manager domain verification is required for this domain, or confirm verification is handled via a DNS TXT record instead |
| Google Fonts | The `preconnect` hints to `fonts.googleapis.com` / `fonts.gstatic.com` are a deliberate pairing with `js/scripts.js`, which injects the actual Google Fonts `<link>` at runtime rather than in static `<head>` markup — see [Custom Scripts](#custom-scripts). This still has a FOUC/CLS cost; see [Known Issues](#known-issues) |

## CSS Architecture

`style.css` loads after `bootstrap.min.css`, so the two are intentionally layered rather than independent:

- **Mechanics in the markup, design in the stylesheet.** Layout-affecting properties (`display`, `position`, `flex-*`, margins/padding, text color/weight helpers) are increasingly expressed as Bootstrap utility classes directly on elements (`d-flex`, `position-absolute`, `text-white`, `mt-4`, `overflow-x-hidden`, …). `style.css` is reserved for values Bootstrap can't express: brand colors, exact pixel offsets (e.g. `.timeline__num-line-i{ top: -150px; left: -7px; }`), custom fonts, transitions and `@keyframes`.
- **Deliberate overrides of Bootstrap defaults.** `.container{ padding: 115px 12px; max-width: 1080px; }` intentionally overrides Bootstrap's own responsive `.container` widths/padding, since `style.css` loads later and matches Bootstrap's specificity. This is expected, not a bug — but it means `.container` behaves nothing like stock Bootstrap, which can surprise a contributor used to the framework's defaults.
- **No custom grid system remains.** `style.css` defines no `.row` / `.col-*` rules of its own — every grid, including `.traffic`, now relies on Bootstrap's real grid classes.
- **Two different font-loading strategies, by design.** `'Space Mono'` (all headings/titles, `.tabs__box`, `.wedo__subtitle`) is self-hosted via `@font-face` pointing at `../fonts/`, so it's available immediately, render-blocking-free, as soon as `style.css` parses. `'Roboto'` (body copy) and Font Awesome are instead fetched from Google Fonts / `use.fontawesome.com` at runtime by `js/scripts.js`'s `loadFonts()` helper — see [Custom Scripts](#custom-scripts). The `<head>`'s `preconnect` hints exist specifically to warm up that later runtime fetch.

## Page Sections

| Section (class) | Purpose |
|---|---|
| `.header` | `.navbar` (logo only) + `.header__content` hero headline + `.marquee` infinite ticker of service keywords. Carries Bootstrap's `overflow-x-hidden`, which the ticker depends on — see [Custom Scripts](#custom-scripts) |
| `.partner` | "Just Relax with Music" — live embedded Spotify playlist link |
| `.traffic` | Intro copy + `.tabs` component (Traffic / Chat-bot / Funnels, each with a static `.tabs__strings-*` paragraph and an empty `.tabs__typed-*` typing-effect target) **and** a nested `.process` block (Marketing automation, Rellax parallax illustration). `.process` is a plain `<div>` inside this `<section>`, not its own top-level section — see [Known Issues](#known-issues) |
| `.design` | `.design__banners` — pinned, scroll-driven horizontal banner strip (see [Custom Scripts](#custom-scripts)) + growth marketing/analytics copy. The section itself carries Bootstrap's `overflow-hidden`, which clips the strip at rest without interfering with the sticky pin |
| `.timeline` | 9-step numbered `.timeline__box` process + nested `.deadlines` commitment block (now a real Bootstrap grid row: `col-12 col-md-7` / `col-12 col-sm-4 offset-md-1`), in the same `<section>` |
| `.reports` | Reporting transparency callout |
| `.consulting` | Consulting / first-launch strategy blurb |
| `.cases` | Six `.cases__item` case studies, alternating `bg-light`/plain backgrounds: **Metarun**, **Coinchange**, **Encore**, **Plaskee**, **The Hub App**, **Selfstorage\*** (anonymized), each with a services list |
| `.wedo` | "What else we do" — two `.wedo__item` figures (`.wedo__picture` image + `.wedo__subtitle` caption), stacked via `d-flex flex-column`; heading carries `id="scrollToWhatElseWeDo"` (duplicate ID, see [Known Issues](#known-issues)) |
| `.new-products` | Typed.js animated headline, target `.new-products__typed-js` |
| `.founders` | Two `.founders__item` columns in a real Bootstrap grid row (`col-lg-6 col-12`, stacked below `lg`): photo, name, position, Facebook/LinkedIn links. Heading also carries `id="scrollToWhatElseWeDo"` (duplicate ID, see [Known Issues](#known-issues)) |
| `.footer` | CTA, contact links (Facebook, LinkedIn, email), embedded Typeform form |

## Custom Scripts

### `js/scripts.js` — runtime font/icon loading

Alongside tab logic and the `Marquee.init(...)` / `new HorizontalScrollPin(...)` calls, `js/scripts.js` injects the Google Fonts and Font Awesome stylesheets at runtime instead of listing them as static `<link>` tags in `<head>`:

```js
function loadFonts(linkHref) {
  const head = document.querySelector("head");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = linkHref;
  head.appendChild(link);
}

loadFonts("https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
loadFonts("https://use.fontawesome.com/releases/v5.8.1/css/all.css");
```

This is why the `<head>`'s Google Fonts `preconnect` hints exist with no matching static `<link rel="stylesheet">` — the pairing is intentional, the stylesheet request just happens from JS instead. Practical consequences:
- **FOUC / layout shift risk.** The `<link>` is appended after the script runs, not during initial HTML parsing, so body text (and icons) first paint in their fallback fonts and reflow once the request resolves. `font-display: swap` on the self-hosted `@font-face` rules doesn't help here, since this isn't `@font-face` — it's a plain external stylesheet with no `display=swap`-equivalent control over FOIT/FOUT beyond what Google's `&display=swap` query param already provides for the Google Fonts half.
- **Depends on JS executing.** If `js/scripts.js` fails to load or run (ad blocker, script error, JS disabled), neither Roboto nor Font Awesome ever loads — there's no `<noscript>` fallback `<link>`.
- **`'Roboto Mono'` is fetched but not referenced.** The Google Fonts request pulls both `Roboto` and `Roboto+Mono`, but no selector in `style.css` sets `font-family: 'Roboto Mono'` — likely a harmless bit of over-fetching, or a font used somewhere not shown here.
- **Font Awesome is pinned to an old major version (v5.8.1).** Works, but is several majors behind current Font Awesome releases — worth a deliberate upgrade decision rather than an oversight.

### `js/marquee.js` — `window.Marquee`

Dependency-free rewrite of the jQuery marquee plugin pattern. Exposes `Marquee.init(selector, options)`.

```js
Marquee.init('.marquee', {
  duration: 10000,
  direction: 'left'
});
```

Supports the same option set as typical jQuery marquee plugins (`duration`, `direction`, `duplicated`, `gap`, `pauseOnHover`, `startVisible`, `allowCss3Support`, …), uses CSS animations where supported, and falls back to a `requestAnimationFrame` tween otherwise. Commands: `Marquee.init(selector, 'pause' | 'resume' | 'toggle' | 'destroy')`, or `Marquee.get(el)` for the instance. Requires a browser with private class fields support (Chrome 74+, Safari 14.1+, Firefox 90+).

The ticker's inner wrapper is intentionally wider than the viewport, so it relies on `.header`'s Bootstrap `overflow-x-hidden` class to avoid a page-wide horizontal scrollbar. If that utility class is ever removed from `.header`, the ticker will overflow visibly.

### `js/design-scroll.js` — `window.HorizontalScrollPin`

Pins `.design` in place while the page scrolls and converts that vertical scroll into a horizontal `translateX` of `.design__banners`, releasing the section once the last banner reaches the edge.

```js
new HorizontalScrollPin(document.querySelector('.design'), {
  strip: '.design__banners',
  ratio: 2,     // page-scroll px spent per 1px of horizontal movement — higher = slower
  smooth: 0.12  // inertia, 0–1; 1 disables smoothing
});
```

Uses `position: sticky` by default and automatically switches to a JS-driven `position: fixed` fallback if an **ancestor** clips overflow (`overflow: hidden/auto/scroll`), which would otherwise silently break `sticky`. A console warning is emitted when the fallback engages, naming the offending ancestor. Note that `.design` itself already carries Bootstrap's `overflow-hidden` class — that's fine and intentional (it clips the oversized strip at rest); the check only ever looks at ancestors of the pinned element, never at the element's own overflow. Respects `prefers-reduced-motion`.

> Neither script is invoked automatically — both are instantiated from `js/scripts.js`, which is not included in this document.

## Third-Party Integrations

- **Bootstrap** — `bootstrap@5.3.8` CSS, loaded from jsDelivr with a pinned version and SRI `integrity` attribute. No JS bundle is loaded; nothing on the page currently depends on Bootstrap's JS components.
- **Typeform** — lead capture form embedded via `data-tf-widget="fvTlqEpq"` and `//embed.typeform.com/next/embed.js`. Update the widget ID to point at your own Typeform.
- **Rellax.js** — loaded from jsDelivr, unpinned (`dixonandmoe/rellax@master`). Lock to a specific tag/commit before shipping to production.
- **Facebook / LinkedIn** — footer links (`#writeOnFacebookBottom`, `#writeOnLinkedInBottom`) and both founders' social links currently point to `href="#"` placeholders; update with real destination URLs before launch.
- **Spotify** — a real, working playlist embed link in `.partner` (not a placeholder).
- **Google Fonts** — `Roboto` (body) + `Roboto Mono` (apparently unused) fetched from `fonts.googleapis.com` at runtime by `js/scripts.js`'s `loadFonts()` helper, not via a static `<head>` `<link>` — see [Custom Scripts](#custom-scripts).
- **Font Awesome** — `fas`/`far` icon classes (tabs), loaded at runtime from `use.fontawesome.com/releases/v5.8.1/` by the same `loadFonts()` helper.

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
- Internet connection for CDN-hosted assets (Bootstrap CSS, Rellax.js, Typeform embed, Font Awesome if CDN-loaded).

## Customization Guide

| To change... | Edit... |
|---|---|
| Copy / headlines | Directly in `index.html` (no templating layer) |
| Layout (spacing, flex, visibility, grid) | Bootstrap utility classes on the element itself in `index.html` |
| Colors, fonts, exact offsets, animations | `css/style.css` |
| Marquee keywords | `.marquee__list` items in `index.html`; init options in `js/scripts.js` via `Marquee.init('.marquee', {...})` |
| Banner strip behavior | `ratio` / `smooth` / `top` options passed to `new HorizontalScrollPin(...)` in `js/scripts.js` |
| Tabs content (Traffic / Chat-bot / Funnels) | `.tabs__box-*` blocks + corresponding `.tabs__typed-*` init in `js/typed.js` / `js/scripts.js`; toggling relies on the `.tabs__box.visible` class contract defined in `style.css`, not inline `display` |
| Marketing automation blurb / illustration | The nested `.process` block inside `.traffic` |
| Timeline steps | `.timeline__item` blocks inside `.timeline__box` |
| Case studies | Duplicate a `.cases__item` block and update copy/services list |
| "New products" headline strip | `.new-products__typed-js` target + its Typed.js init |
| Founder bios | `.founders__item` blocks |
| Contact form | Replace the `data-tf-widget` ID with your own Typeform form ID |
| Social/contact links | `.links` lists in footer and founder bios |
| Meta/SEO/social tags | `<head>` — `title`, `meta[name=description]`, canonical, Open Graph, Twitter Card |

## Browser Support

Targets evergreen modern browsers (Chrome, Firefox, Safari, Edge), same baseline as Bootstrap 5. `js/marquee.js` and `js/design-scroll.js` use private class fields (`#field`), `ResizeObserver` and `IntersectionObserver` — minimum Chrome 74+, Safari 14.1+, Firefox 90+; no polyfills are referenced. Responsive behavior is handled via Bootstrap's `d-none`/`d-*-block` display utilities (the legacy Bootstrap 3/4-style `hidden-xs`/`visible-xs` classes seen in earlier revisions have been migrated away now that real Bootstrap is loaded).

## SEO / Meta

- `<title>`: `Godigitale | Digital Marketing Agency for Startups & Products`
- `meta[description]` populated; `meta[keywords]` correctly absent.
- `canonical` link present.
- Full Open Graph set, including `og:url`.
- Full Twitter Card set (`summary_large_image`).
- Favicon/manifest set is complete for modern multi-platform support — **confirm all referenced files (`favicon-96x96.png`, `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest`) actually exist at the site root before deploy**, otherwise expect 404 noise in the console/Lighthouse report.
- `og:image` / `twitter:image` point to `img/og-cover.jpg` — confirm the asset exists and is a proper social-preview size (min. 1200×630).

## Known Issues

- **`.process` is no longer its own `<section>`.** It's now a `<div class="process bg-white">` nested inside `<section class="traffic">`, so "Paid Traffic" and "Marketing automation" — two unrelated topics — now share a single section landmark, and the `.process__title` `<h2>` sits under the Traffic section's own `<h2>`. Worth a second look from an accessibility/document-outline perspective; flatten back into a sibling `<section>` if that matters for this project.
- **Body font and Font Awesome load late, with no `<noscript>` fallback.** Both are fetched by `js/scripts.js`'s `loadFonts()` helper at runtime rather than via static `<link>` tags in `<head>`, so there's an unavoidable window where body text and icons render in fallback styles before reflowing — a FOUC/CLS cost that wouldn't exist with a static `<link>`, and a dependency on JS actually executing. See [Custom Scripts](#custom-scripts) for detail; consider moving these two to static `<link>` tags in `<head>` if the layout shift is visible in practice.
- **`'Roboto Mono'` is fetched but never referenced** by any selector in `style.css` — minor over-fetching, or used somewhere not shown here.
- **Font Awesome is pinned to v5.8.1**, several majors behind current releases — fine functionally, but worth a deliberate upgrade decision.
- **Design banners may be stretched.** `.design__banner > img` is fixed to `min-height`/`max-height: 299px` in `style.css`, while the markup now adds Bootstrap's `w-100` to the same `<img>`. The previous revision paired the fixed height with `width: auto` specifically to preserve each banner's aspect ratio; with `w-100` forcing `width: 100%` as well, most banners will be distorted unless every source image already matches the exact rendered aspect ratio. Verify visually and consider `object-fit: cover` instead of fighting both dimensions.
- **Duplicate `id="scrollToWhatElseWeDo"`** — both the `.wedo__title` heading and the `.founders` heading use this same ID. Invalid HTML; breaks any in-page anchor link or `getElementById` call targeting either section, since only the first match is ever reachable. Rename one (e.g. `id="whatElseWeDo"` vs `id="whoWeAre"`).
- **Identical captions on both `.wedo__item` samples** — both figures read "Design of landing pages and additional materials" despite showing different images (`lp-1` vs `lp-2`). Looks like a copy-paste leftover; give each its own caption.
- **`facebook-domain-verification` meta absent** — confirm with whoever owns Facebook Business Manager for this domain whether verification is required and, if so, add the tag or confirm it's handled via DNS.
- **Footer and founder Facebook/LinkedIn links are `href="#"` placeholders** — replace with real URLs before launch.
- **Rellax.js pinned to `@master`** — unpinned CDN dependency, unlike the now-pinned Bootstrap CSS; a future upstream change could silently alter parallax behavior in production.
- **`design-scroll.js` fixed-mode fallback depends on ancestor overflow** — if any ancestor of `.design` has `overflow: hidden/auto/scroll`, `position: sticky` is silently ignored by the browser; the script detects this and falls back automatically, but confirm no new wrapping element was introduced around `.design` without re-checking this (the section's own `overflow-hidden` is not the issue — only ancestors are).

## Deployment

Being fully static, this project deploys to any static host:
- Netlify / Vercel (drag-and-drop or connect the repo, no build command needed)
- GitHub Pages
- S3 + CloudFront / any CDN

**Pre-deploy checklist:**
- [ ] Decide whether `.process` should be its own top-level `<section>` again, for document-outline/accessibility reasons
- [ ] Decide whether the runtime-injected Google Fonts / Font Awesome `<link>`s (`js/scripts.js`'s `loadFonts()`) cause a visible FOUC/CLS hit, and move them to static `<head>` `<link>` tags if so
- [ ] Confirm `'Roboto Mono'` is actually used somewhere, or stop fetching the unused Google Fonts weight
- [ ] Consider upgrading Font Awesome off the pinned v5.8.1
- [ ] Check `.design__banner` images for stretching caused by combining `w-100` with fixed `min/max-height`
- [ ] Confirm `og:image` / `twitter:image` asset (`img/og-cover.jpg`) exists and is a proper social-preview size (min. 1200×630)
- [ ] Confirm all favicon/manifest files exist at the referenced paths (`/favicon-96x96.png`, `/favicon.svg`, `/favicon.ico`, `/apple-touch-icon.png`, `/site.webmanifest`)
- [ ] Resolve duplicate `id="scrollToWhatElseWeDo"`
- [ ] Fix duplicate caption on the two `.wedo__item` samples
- [ ] Add `facebook-domain-verification` meta tag if still required, or confirm alternate verification
- [ ] Pin the Rellax.js CDN reference to a version tag instead of `@master`
- [ ] Replace placeholder Facebook/LinkedIn hrefs (footer + founders) with production values
- [ ] Verify Typeform widget ID belongs to the correct form
- [ ] Confirm no ancestor of `.design` introduces `overflow: hidden/auto/scroll` (check the console for a `[HorizontalScrollPin]` fallback warning)
- [ ] Run Lighthouse for performance/accessibility/SEO pass (marquee/parallax/pinned-scroll animations can impact CLS/perf scores)

## Contributing

1. Fork / branch from `main`.
2. Prefer Bootstrap utility classes for layout mechanics (spacing, flex, position, visibility) and reserve `css/style.css` for bespoke visual values — mixing the two approaches in the same property is how a past `.traffic` grid regression happened (now fixed).
3. Keep to the existing BEM-ish naming convention for component classes — avoid introducing inline `style=""` attributes.
4. Avoid introducing a build step, a JS framework, or a jQuery dependency unless the team agrees to it — the project is intentionally build-free, and Bootstrap is CSS-only by design.
5. Test on mobile viewport widths before opening a PR (site relies on Bootstrap's `d-none`/`d-*-block` classes for responsive swaps).
6. Run an HTML validator before merging — duplicate IDs are easy to reintroduce silently.

## License

_Specify a license (e.g., MIT, proprietary/all-rights-reserved) — none is declared in the source provided._

## Contact

- Email: [a@godigitale.com](mailto:a@godigitale.com)