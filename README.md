# Godigitale — Marketing Landing Page

> Digital marketing agency landing page for startups & products. Static, single-page marketing site presenting services (paid traffic, growth marketing, marketing automation, product analytics), case studies, process, and a lead-capture form.

**Live site:** _add production URL_
**Type:** Static HTML/CSS/JS (no build step, no framework)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Page Sections](#page-sections)
- [Third-Party Integrations](#third-party-integrations)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Browser Support](#browser-support)
- [SEO / Meta](#seo--meta)
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
| Icons             | Font Awesome (`fas`, `fab` icon classes)               |
| Fonts             | Google Fonts (preconnected in `<head>`)                |
| Animation         | [Rellax.js](https://github.com/dixonandmoe/rellax) (parallax), custom `marquee.js` (scrolling ticker), `design-scroll.js` |
| Typing effect     | [Typed.js](https://github.com/mattboldt/typed.js) (`typed.js` + custom `tabs__typed-*` targets) |
| Lead capture      | [Typeform](https://www.typeform.com/) embed widget |
| Analytics / Pixel | Facebook Domain Verification meta tag (`facebook-domain-verification`) |

No build tooling (Webpack/Vite/etc.), no CSS preprocessor pipeline is referenced directly in the markup — `style.css` is served pre-compiled with a cache-busting query string (`?v=1.0.0`).

## Project Structure

```
.
├── index.html                  # Single-page site (this document)
├── favicon.png
├── css/
│   └── style.css               # Primary stylesheet (cache-busted via ?v=)
├── js/
│   ├── marquee.js              # Powers the scrolling keyword ticker in the header
│   ├── design-scroll.js        # Scroll-linked behavior for the "design" banner section
│   ├── typed.js                # Typed.js library / init
│   └── scripts.js              # Global site scripts (nav, tabs, misc), cache-busted via ?v=
└── img/
    ├── logo-godigitale.svg
    ├── i-fare.png / i-fare@2x.png
    ├── spotify-podcast-badge-blk-grn-330x80.svg
    ├── auto/                   # Marketing automation illustration assets (norris, i1, i2, i-mank, i-marketo)
    ├── banners/                # Rotating design showcase banners (banner-1..10)
    ├── timeline/                # Timeline step icons (i-start, i-space-invaders, i-settings, i-rocket, i-warning, i-finish)
    ├── men-ok.png / men-ok@2x.png
    └── co-founders/
        ├── arefyeu.png
        └── antsipovich.png
```

> Note: exact asset paths above are inferred from `index.html` references — verify against the actual repo before relying on this tree.

## Page Sections

| Section (class)              | Purpose |
|-------------------------------|---------|
| `.header`                    | Nav + hero headline + infinite marquee of service keywords |
| `.partner`                   | "Just Relax with Music" — embedded Spotify playlist link (brand/culture touch) |
| `.traffic`                   | Tabbed panel: Traffic / Chat-bot / Funnels services, with Typed.js copy |
| `.process`                   | Marketing automation blurb (Marketo/HubSpot/API/Zapier) with parallax illustration |
| `.design`                    | Auto-scrolling banner strip + growth marketing/analytics copy |
| `.section-timeline`          | 9-step numbered process timeline + "deadlines" commitment block |
| `.section-reports`           | Reporting transparency callout |
| `.section-wework`            | Consulting / first-launch strategy blurb |
| `.section-speak-support` (×6) | Case studies: **Metarun**, **Coinchange**, **Encore**, **Plaskee**, **The Hub App**, **Selfstorage\*** (anonymized), each with a services list |
| `.section-wecan`             | "What else we do" — landing page design samples |
| `.section-launch-new-products` | Typed.js animated headline strip |
| `.section-wecan` (co-founders)| Founder bios: Aliaksandr Arefyeu & Aliaksandr Antsipovich, with social links |
| `.footer`                     | CTA, contact links (Facebook Messenger, LinkedIn, email), embedded Typeform form |

## Third-Party Integrations

- **Typeform** — lead capture form embedded via `data-tf-widget="fvTlqEpq"` and `embed.js`. Update the widget ID to point at your own Typeform.
- **Rellax.js** — loaded from jsDelivr CDN (`dixonandmoe/rellax@master`). Consider pinning to a specific tag/commit instead of `@master` for production stability.
- **Facebook** — domain verification meta tag and Messenger deep link (`m.me/<page-id>`); update the page ID before going live.
- **Spotify** — public playlist embed link (marketing/culture element, not functional to conversion).
- **Font Awesome** — icon classes are used (`fas fa-rocket`, `fab fa-facebook-square`, etc.); ensure the Font Awesome CSS/kit is actually included in `<head>` (not shown in the provided markup — verify it's present, or the icons will not render).

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
- Internet connection for CDN-hosted assets (Rellax.js, Font Awesome, Google Fonts, Typeform embed).

## Customization Guide

| To change...                  | Edit... |
|-------------------------------|---------|
| Copy / headlines               | Directly in `index.html` (no templating layer) |
| Colors, spacing, typography    | `css/style.css` |
| Marquee keywords                | `.g-marquee__list` items in `index.html` |
| Tabs content (Traffic/Chat-bot/Funnels) | `.tabs__box-*` blocks + `js/marquee.js`/`js/typed.js` init |
| Timeline steps                 | `.g-timeline-item` blocks |
| Case studies                   | Duplicate a `.section-speak-support` block and update copy/services list |
| Contact form                   | Replace the `data-tf-widget` ID with your own Typeform form ID |
| Social/contact links            | `.g-contacts` lists in header/footer/co-founder bios |
| Meta/SEO tags                   | `<head>` — `title`, `meta[name=description]`, `meta[name=keywords]`, Open Graph tags |

## Browser Support

Targets evergreen modern browsers (Chrome, Firefox, Safari, Edge). No polyfills are referenced. Mobile responsiveness is handled via the `visible-xs` / `hidden-*` utility classes and a `viewport` meta tag with `shrink-to-fit=no`.

## SEO / Meta

Currently set:
- `<title>`: `Godigitale | Digital marketing for startups & products`
- `meta[description]` and `meta[keywords]` are populated.
- Open Graph `og:title` is set; **`og:url` is empty — populate before deploy.**
- No `og:image`, `og:description`, or Twitter Card tags are present — recommended additions for better social sharing previews.
- No `canonical` link tag — recommended for SEO if the site is mirrored or served from multiple domains.

## Deployment

Being fully static, this project deploys to any static host:
- Netlify / Vercel (drag-and-drop or connect the repo, no build command needed)
- GitHub Pages
- S3 + CloudFront / any CDN

**Pre-deploy checklist:**
- [ ] Set `og:url` in `<head>`
- [ ] Confirm Font Awesome is actually loaded (icons will be invisible otherwise)
- [ ] Pin the Rellax.js CDN reference to a version tag instead of `@master`
- [ ] Replace placeholder Facebook page ID / Messenger link with production values
- [ ] Verify Typeform widget ID belongs to the correct form
- [ ] Run Lighthouse for performance/accessibility/SEO pass (marquee/parallax animations can impact CLS/perf scores)

## Contributing

1. Fork / branch from `main`.
2. Keep to the existing BEM-ish naming convention in new CSS/HTML.
3. Avoid introducing a build step unless the team agrees to it — the project is intentionally build-free.
4. Test on mobile viewport widths before opening a PR (site relies on `hidden-xs`/`visible-xs` classes for responsive swaps).

## License

_Specify a license (e.g., MIT, proprietary/all-rights-reserved) — none is declared in the source provided._

## Contact

- Email: [a@godigitale.com](mailto:a@godigitale.com)