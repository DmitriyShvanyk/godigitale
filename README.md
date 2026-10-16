# Godigitale — Marketing Landing Page

> Digital marketing agency landing page for startups & products. Static, single-page marketing site presenting services (paid traffic, growth marketing, marketing automation, product analytics), case studies, process, and a lead-capture form.

**Live site:** _add production URL_
**Type:** Static HTML/CSS/JS — no build step, no bundler, no jQuery. Bootstrap 5.3.8 (both CSS and JS bundle) is loaded via CDN for grid/utilities and the native Tab component.

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

This repository contains a single-page marketing site for **Godigitale**, a digital marketing agency. The page is static HTML; layout mechanics (grid, flex, spacing, visibility, position) are increasingly expressed as **Bootstrap 5.3.8 utility classes directly in the markup**, while `css/style.css` holds bespoke visual values (brand colors, fonts, exact offsets, transitions, keyframes). Bootstrap's JS bundle is now loaded too, powering the Traffic/Chat-bot/Funnels tab switcher as a native Bootstrap Tab component rather than a bespoke one. There is no jQuery, no bundler, and no build pipeline.

Core goals of the page:
- Communicate the agency's service offering (paid traffic, chatbots, funnels, marketing automation, growth/product analytics).
- Show a 9-step project timeline to set client expectations on delivery process and deadlines.
- Showcase six case studies (Metarun, Coinchange, Encore, Plaskee, The Hub App, and an anonymized self-storage case).
- Convert visitors via a Typeform-embedded contact form and direct Facebook/LinkedIn/email links.

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| CSS/JS framework | [Bootstrap 5.3.8](https://getbootstrap.com/) — both `bootstrap.min.css` and `bootstrap.bundle.min.js` loaded from jsDelivr, each pinned to the exact version with an SRI `integrity` hash. The CSS half provides the grid (`row`/`col-*`), flex and display utilities (`d-flex`, `d-none`, `position-*`), spacing (`mt-*`, `mb-*`, `p-0`), and text helpers (`text-white`, `text-nowrap`). The JS bundle powers exactly one native component: the Traffic/Chat-bot/Funnels tab switcher (`#myTabTraffic` / `#myTabTrafficContent`, `data-bs-toggle="tab"`) — nothing else on the page uses Bootstrap JS |
| Styling | Custom CSS (`css/style.css`), BEM-style class naming (`block__element--modifier`), layered on top of Bootstrap and loaded after it so it can override Bootstrap defaults (e.g. a custom `.container` max-width) |
| Icons | Font Awesome v5.8.1 (`fas`, `far` icon classes), loaded at runtime from `use.fontawesome.com` by `js/scripts.js` — see [Custom Scripts](#custom-scripts) |
| Fonts | All three families — `'Space Mono'` (headings/titles, `#myTabTrafficContent`, `.wedo__subtitle`), `'Roboto'` (body copy), and an apparently-unused `'Roboto Mono'` — are fetched from Google Fonts at runtime by `js/scripts.js`'s `loadFonts()` helper, not via a static `<link>` in `<head>`. No font is self-hosted anymore — see [Custom Scripts](#custom-scripts) and [Known Issues](#known-issues) |
| Animation | [Rellax.js](https://github.com/dixonandmoe/rellax) (parallax, via CDN), custom `js/marquee.js` (infinite scroll ticker), custom `js/design-scroll.js` (scroll-linked horizontal banner strip) |
| Typing effect | [Typed.js](https://github.com/mattboldt/typed.js) (`js/typed.js` library), lazily instantiated by `js/scripts.js` only for `.new-products__typed-js`, via `IntersectionObserver`; cursor blink keyframe lives in `style.css` |
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
├── js/
│   ├── marquee.js               # window.Marquee — infinite ticker (header keywords)
│   ├── design-scroll.js         # window.HorizontalScrollPin — pinned horizontal banner scroll
│   ├── typed.js                 # Typed.js library / init
│   └── scripts.js               # Global site init: loadFonts(...), Rellax, Marquee.init(...), new HorizontalScrollPin(...), lazy Typed.js — cache-busted via ?v=
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
| Google Fonts | The `preconnect` hints to `fonts.googleapis.com` / `fonts.gstatic.com` are a deliberate pairing with `js/scripts.js`, which injects the actual Google Fonts `<link>` at runtime rather than in static `<head>` markup — see [Custom Scripts](#custom-scripts). This still has a FOUC/CLS cost; see [Known Issues](#known-issues) |

## CSS Architecture

`style.css` loads after `bootstrap.min.css`, so the two are intentionally layered rather than independent:

- **Mechanics in the markup, design in the stylesheet.** Layout-affecting properties (`display`, `position`, `flex-*`, margins/padding, text color/weight helpers) are increasingly expressed as Bootstrap utility classes directly on elements (`d-flex`, `position-absolute`, `text-white`, `mt-4`, `overflow-x-hidden`, …). `style.css` is reserved for values Bootstrap can't express: brand colors, exact pixel offsets (e.g. `.timeline__num-line-i{ top: -150px; left: -7px; }`), custom fonts, transitions and `@keyframes`. `overflow-x-hidden` in particular has been trimmed from sections that don't actually overflow (`.partner`, `.consulting`, `.cases`, `.wedo`, `.new-products`, `.founders`, and now `.footer` too) and kept only where something genuinely can (`.header`'s marquee, `.design`'s banner strip, `.timeline`'s horizontal scroller, and the shared `.traffic`/`.process` wrapper) — see [Known Issues](#known-issues) for why `.footer` losing it is worth a second look.
- **Deliberate overrides of Bootstrap defaults.** `.container{ padding: 115px 12px; max-width: 1080px; }` intentionally overrides Bootstrap's own responsive `.container` widths/padding, since `style.css` loads later and matches Bootstrap's specificity. This is expected, not a bug — but it means `.container` behaves nothing like stock Bootstrap, which can surprise a contributor used to the framework's defaults.
- **No custom grid system remains.** `style.css` defines no `.row` / `.col-*` rules of its own — every grid, including `.traffic`, now relies on Bootstrap's real grid classes.
- **One component styled by ID, not BEM class.** The tab switcher's styling lives under `#myTabTraffic` / `#myTabTrafficContent` in `style.css`, because the markup itself is now Bootstrap's native Tab component (`.nav-link`, `.tab-pane`, …) rather than a custom `.tabs__*` BEM component. This is the one place in the stylesheet that departs from the project's class-based naming convention — worth knowing before copying the pattern elsewhere.
- **No self-hosted fonts anymore.** `style.css` has no `@font-face` rules at all. `'Space Mono'` (headings/titles, `#myTabTrafficContent`, `.wedo__subtitle`), `'Roboto'` (body copy), and `'Roboto Mono'` are all fetched from Google Fonts at runtime by `js/scripts.js`'s `loadFonts()` helper. The `<head>`'s `preconnect` hints exist specifically to warm up that runtime fetch — see [Custom Scripts](#custom-scripts) and [Known Issues](#known-issues).

## Page Sections

| Section (class) | Purpose |
|---|---|
| `.header` | `.navbar` (logo only) + `.header__content` hero headline + `.marquee` infinite ticker of service keywords. Carries Bootstrap's `overflow-x-hidden`, which the ticker depends on — see [Custom Scripts](#custom-scripts) |
| `.partner` | "Just Relax with Music" — live embedded Spotify playlist link |
| `.traffic` | Intro copy + a native Bootstrap Tab component (`#myTabTraffic` nav + `#myTabTrafficContent` panes) switching between three panels. Shares a plain, class-only `<div class="bg-white overflow-x-hidden">` wrapper with `.process` (no semantic role itself — just a shared background/overflow container for the two sibling sections) |
| `.process` | Marketing automation blurb + Rellax parallax illustration. Its own `<section>`, sibling to `.traffic` inside the shared wrapper above |
| `.design` | `.design__banners` — pinned, scroll-driven horizontal banner strip (see [Custom Scripts](#custom-scripts)) + growth marketing/analytics copy. The section itself carries Bootstrap's `overflow-hidden`, which clips the strip at rest without interfering with the sticky pin |
| `.timeline` | 9-step numbered `.timeline__box` process + nested `.deadlines` commitment block (now a real Bootstrap grid row: `col-12 col-md-7` / `col-12 col-sm-4 offset-md-1`), in the same `<section>` |
| `.reports` | Reporting transparency callout |
| `.consulting` | Consulting / first-launch strategy blurb |
| `.cases` | Six `.cases__item` case studies, alternating `bg-light`/plain backgrounds: **Metarun**, **Coinchange**, **Encore**, **Plaskee**, **The Hub App**, **Selfstorage\*** (anonymized), each with a services list |
| `.wedo` | "What else we do" — two `.wedo__item` figures (`.wedo__picture` image + `.wedo__subtitle` caption), stacked via `d-flex flex-column` |
| `.new-products` | Typed.js animated headline, target `.new-products__typed-js`, triggered on scroll — see [Custom Scripts](#custom-scripts) |
| `.founders` | Two `.founders__item` columns in a real Bootstrap grid row (`col-lg-6 col-12`, stacked below `lg`): photo, name, position, Facebook/LinkedIn links |
| `.footer` | CTA, contact links (Facebook, LinkedIn, email), embedded Typeform form |

## Custom Scripts

### `js/scripts.js` — site-wide init

Everything on the page that isn't handled by Bootstrap's own JS or by one of the other standalone scripts is wired up in a single IIFE in `js/scripts.js`, in this order:

```js
(function () {
  "use strict";

  // load fonts
  function loadFonts(linkHref) {
    const head = document.querySelector("head");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = linkHref;
    head.appendChild(link);
  }
  loadFonts("https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap");
  loadFonts("https://use.fontawesome.com/releases/v5.8.1/css/all.css");

  // rellax
  new Rellax(".rellax");

  // banners
  new HorizontalScrollPin(document.querySelector(".design"), {
    strip: ".design__banners",
    ratio: 3,
    smooth: 0.1,
  });

  // typed text — lazy-initialized once its trigger scrolls into view
  const typingTasks = [{
    trigger: ".new-products",
    target: ".new-products__typed-js",
    options: { strings: ["Digital marketing for startups & products"], typeSpeed: 20, startDelay: 200, backSpeed: 80, backDelay: 500 },
  }];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const task = typingTasks.find((t) => entry.target.matches(t.trigger));
      if (!task) return;
      const targetEl = document.querySelector(task.target);
      if (targetEl) { new Typed(targetEl, task.options); observer.unobserve(entry.target); }
    });
  }, { root: null, threshold: 0.2 });
  typingTasks.forEach((task) => {
    const el = document.querySelector(task.trigger);
    if (el) observer.observe(el);
  });

  // marquee
  Marquee.init(".marquee", { duration: 10000, startVisible: true, duplicated: true });
})();
```

Note what's *not* here: there is no tab-switching logic, because the Traffic/Chat-bot/Funnels tabs are now Bootstrap's own native Tab component (`data-bs-toggle="tab"`), wired up automatically by `bootstrap.bundle.min.js` with no custom JS needed.

**Font/icon loading.** `loadFonts()` injects the Google Fonts and Font Awesome stylesheets at runtime instead of listing them as static `<link>` tags in `<head>` — which is why the `<head>`'s Google Fonts `preconnect` hints exist with no matching static `<link rel="stylesheet">`; the pairing is intentional, the stylesheet request just happens from JS instead. Practical consequences:
- **FOUC / layout shift risk.** The `<link>` is appended after the script runs, not during initial HTML parsing, so headings, body text, and icons all first paint in their fallback fonts and reflow once the request resolves. The only mitigation in place is the `&display=swap` query param on the Google Fonts request itself, which controls FOIT/FOUT but not the delay before the request even starts.
- **Depends on JS executing.** If `js/scripts.js` fails to load or run (ad blocker, script error, JS disabled), neither Roboto nor Font Awesome ever loads — there's no `<noscript>` fallback `<link>`.
- **`'Roboto Mono'` is fetched but not referenced.** The Google Fonts request pulls both `Roboto` and `Roboto+Mono`, but no selector in `style.css` sets `font-family: 'Roboto Mono'` — likely a harmless bit of over-fetching, or a font used somewhere not shown here.
- **Font Awesome is pinned to an old major version (v5.8.1).** Works, but is several majors behind current Font Awesome releases — worth a deliberate upgrade decision rather than an oversight.

**`.new-products` typing effect.** Rather than running on page load, `Typed()` is only constructed once `.new-products` crosses 20% visibility in the viewport (`IntersectionObserver`, `threshold: 0.2`), and the observer unobserves itself afterwards — the effect runs once, lazily, instead of firing (and animating, invisibly) before the visitor ever scrolls there. The `typingTasks` array is written to support more than one lazy-typed target, but only `.new-products` currently uses it.

### `js/marquee.js` — `window.Marquee`

Dependency-free rewrite of the jQuery marquee plugin pattern. Exposes `Marquee.init(selector, options)`.

```js
// the exact call made in js/scripts.js
Marquee.init('.marquee', {
  duration: 10000,
  startVisible: true,
  duplicated: true
});
```

Supports the same option set as typical jQuery marquee plugins (`duration`, `direction`, `duplicated`, `gap`, `pauseOnHover`, `startVisible`, `allowCss3Support`, …), uses CSS animations where supported, and falls back to a `requestAnimationFrame` tween otherwise. Commands: `Marquee.init(selector, 'pause' | 'resume' | 'toggle' | 'destroy')`, or `Marquee.get(el)` for the instance. Requires a browser with private class fields support (Chrome 74+, Safari 14.1+, Firefox 90+).

The ticker's inner wrapper is intentionally wider than the viewport, so it relies on `.header`'s Bootstrap `overflow-x-hidden` class to avoid a page-wide horizontal scrollbar. If that utility class is ever removed from `.header`, the ticker will overflow visibly.

### `js/design-scroll.js` — `window.HorizontalScrollPin`

Pins `.design` in place while the page scrolls and converts that vertical scroll into a horizontal `translateX` of `.design__banners`, releasing the section once the last banner reaches the edge.

```js
// the exact call made in js/scripts.js
new HorizontalScrollPin(document.querySelector('.design'), {
  strip: '.design__banners',
  ratio: 3,    // page-scroll px spent per 1px of horizontal movement — higher = slower
  smooth: 0.1  // inertia, 0–1; 1 disables smoothing
});
```

Uses `position: sticky` by default and automatically switches to a JS-driven `position: fixed` fallback if an **ancestor** clips overflow (`overflow: hidden/auto/scroll`), which would otherwise silently break `sticky`. A console warning is emitted when the fallback engages, naming the offending ancestor. Note that `.design` itself already carries Bootstrap's `overflow-hidden` class — that's fine and intentional (it clips the oversized strip at rest); the check only ever looks at ancestors of the pinned element, never at the element's own overflow. Respects `prefers-reduced-motion`.

> Neither script is invoked automatically — both are instantiated from `js/scripts.js`, which is not included in this document.

## Third-Party Integrations

- **Bootstrap** — `bootstrap@5.3.8` CSS and JS bundle, both loaded from jsDelivr with a pinned version and SRI `integrity` attribute. The JS bundle is used for exactly one thing: the native Tab component behind the Traffic/Chat-bot/Funnels switcher.
- **Typeform** — lead capture form embedded via `data-tf-widget="fvTlqEpq"` and `//embed.typeform.com/next/embed.js`. Update the widget ID to point at your own Typeform.
- **Rellax.js** — loaded from jsDelivr, unpinned (`dixonandmoe/rellax@master`), initialized once in `js/scripts.js` via `new Rellax(".rellax")`. Lock to a specific tag/commit before shipping to production.
- **Facebook / LinkedIn / email** — all three footer contact links and both founders' social links currently point to `href="#"` placeholders, including the email entry, which previously linked to `mailto:a@godigitale.com` — see [Known Issues](#known-issues). Update with real destination URLs before launch.
- **Spotify** — a real, working playlist embed link in `.partner` (not a placeholder).
- **Google Fonts** — `Space Mono` (headings/titles), `Roboto` (body), and `Roboto Mono` (apparently unused) all fetched from `fonts.googleapis.com` at runtime by `js/scripts.js`'s `loadFonts()` helper, not via a static `<head>` `<link>` — see [Custom Scripts](#custom-scripts).
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
| Tabs content (Traffic / Chat-bot / Funnels) | The `#myTabTraffic` nav + `#myTabTrafficContent` panes inside `.traffic`; it's Bootstrap's native Tab markup, so adding/renaming a tab means keeping the button's `id`, its `data-bs-target`, the matching `tab-pane`'s `id`, and `aria-controls`/`aria-labelledby` all in sync |
| Marketing automation blurb / illustration | The `.process` section (sibling of `.traffic`, sharing its `bg-white overflow-x-hidden` wrapper `<div>`) |
| Timeline steps | `.timeline__item` blocks inside `.timeline__box` |
| Case studies | Duplicate a `.cases__item` block and update copy/services list |
| "New products" headline strip | `.new-products__typed-js` target + the matching `typingTasks` entry in `js/scripts.js` (strings, typing speed, scroll-trigger threshold) |
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

- **Every custom font and Font Awesome load late, with no `<noscript>` fallback.** `style.css` has no `@font-face` left at all — `'Space Mono'` (used for every heading/title, not just body copy), `'Roboto'`, and Font Awesome are all fetched by `js/scripts.js`'s `loadFonts()` helper at runtime rather than via static `<link>` tags in `<head>`. This means the whole page, headings included, first paints in fallback fonts and reflows once the request resolves — a FOUC/CLS cost that wouldn't exist with a static `<link>` or a self-hosted `@font-face`, and a dependency on JS actually executing. See [Custom Scripts](#custom-scripts) for detail; consider moving these to static `<link>` tags, or self-hosting `'Space Mono'` again, if the layout shift is visible in practice.
- **`'Roboto Mono'` is fetched but never referenced** by any selector in `style.css` — minor over-fetching, or used somewhere not shown here.
- **Font Awesome is pinned to v5.8.1**, several majors behind current releases — fine functionally, but worth a deliberate upgrade decision.
- **Possible orphaned local font files.** If `fonts/SpaceMono-*.woff2` are still in the repository, nothing references them anymore now that `'Space Mono'` loads from Google Fonts instead — safe to delete unless self-hosting is restored.
- **Design banners may be stretched.** `.design__banner > img` is fixed to `min-height`/`max-height: 299px` in `style.css`, while the markup now adds Bootstrap's `w-100` to the same `<img>`. The previous revision paired the fixed height with `width: auto` specifically to preserve each banner's aspect ratio; with `w-100` forcing `width: 100%` as well, most banners will be distorted unless every source image already matches the exact rendered aspect ratio. Verify visually and consider `object-fit: cover` instead of fighting both dimensions.
- **Footer email link no longer works.** It used to be `href="mailto:a@godigitale.com"`; it's now `href="#"` like the Facebook/LinkedIn placeholders next to it, which means the one contact method that was previously real and functional has regressed into a dead link. Restore the `mailto:` link.
- **Identical captions on both `.wedo__item` samples** — both figures read "Design of landing pages and additional materials" despite showing different images (`lp-1` vs `lp-2`). Looks like a copy-paste leftover; give each its own caption.
- **Mobile footer links now visibly double their border.** On narrow screens `.footer__links .link` gets a full `border: 2px solid rgba(255,255,255,.2)` on all sides, and `.footer__links .links__item+.link__item .link { border-top: none; }` is meant to strip it between stacked items — but the class is misspelled (`.link__item` instead of `.links__item`), so that selector never matches anything. This used to be mostly harmless, because the stacked `<li>`s had `mt-2` spacing between them, so each bordered chip stood apart with no shared edge. That spacing (`mt-2 mt-lg-0`) was since removed from the second and third footer link items, so the chips now sit flush against each other — which means the never-firing `border-top: none` rule now produces a real, visible doubled border line between adjacent items. Fix the selector to `.links__item+.links__item .link` (or restore the `mt-2` spacing if touching chips weren't the intent).
- **`.footer__jdun`'s mobile flip/rotate never applies.** The mobile media query sets `.footer__ img { transform: scale(-1, 1) rotate(-15deg); }`, but `.footer__` isn't a real class on anything — it's a truncated selector, almost certainly meant to be `.footer__jdun img`. The image renders at full size, unflipped and unrotated, on mobile. Combined with `.footer` recently losing its `overflow-x-hidden`, worth checking whether the absolutely-positioned `.footer__jdun` illustration (`left: 0; bottom: -40px` on mobile) now overflows the viewport horizontally without the intended smaller, rotated version of itself.
- **Footer and founder Facebook/LinkedIn links are `href="#"` placeholders** — replace with real URLs before launch.
- **Rellax.js pinned to `@master`** — unpinned CDN dependency, unlike the now-pinned Bootstrap CSS; a future upstream change could silently alter parallax behavior in production.
- **`design-scroll.js` fixed-mode fallback depends on ancestor overflow** — if any ancestor of `.design` has `overflow: hidden/auto/scroll`, `position: sticky` is silently ignored by the browser; the script detects this and falls back automatically, but confirm no new wrapping element was introduced around `.design` without re-checking this (the section's own `overflow-hidden` is not the issue — only ancestors are).

## Deployment

Being fully static, this project deploys to any static host:
- Netlify / Vercel (drag-and-drop or connect the repo, no build command needed)
- GitHub Pages
- S3 + CloudFront / any CDN

Everything that needs attention before launch is tracked in [Known Issues](#known-issues).

## Contributing

1. Fork / branch from `main`.
2. Prefer Bootstrap utility classes for layout mechanics (spacing, flex, position, visibility) and reserve `css/style.css` for bespoke visual values — mixing the two approaches in the same property is how a past `.traffic` grid regression happened (now fixed).
3. Keep to the existing BEM-ish naming convention for component classes — avoid introducing inline `style=""` attributes.
4. Avoid introducing a build step, a JS framework beyond what Bootstrap's bundle already provides, or a jQuery dependency unless the team agrees to it — the project is intentionally build-free.
5. When duplicating Bootstrap's Tab markup (adding another tab), keep the button `id`, its `data-bs-target`, the matching `tab-pane`'s `id`, and `aria-controls`/`aria-labelledby` all in sync — a partially-renamed copy once left a tab labeled "Profile" showing chatbot content, since fixed.
6. Test on mobile viewport widths before opening a PR (site relies on Bootstrap's `d-none`/`d-*-block` classes for responsive swaps).
7. Run an HTML validator before merging — duplicate IDs are easy to reintroduce silently.

## License

_Specify a license (e.g., MIT, proprietary/all-rights-reserved) — none is declared in the source provided._

## Contact

- Email: [a@godigitale.com](mailto:a@godigitale.com)