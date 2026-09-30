# 📋 Surplus Market — QA & Audit Report (Categorized & Ordered)

**Target URL:** [https://surplus-react-7i2p.vercel.app](https://surplus-react-7i2p.vercel.app)  
**Stack:** React (SPA), Vite, Tailwind CSS, Radix UI Dialogs  
**Hosting:** Vercel  
**Date:** August 2026  

---

## 📑 Overview Breakdown

```
├── 1. 🐛 BUGS & DEFECTS (Fix Immediately)
│    ├── 1.1 Broken Internal Links (HTTP 404)
│    ├── 1.2 Missing Direct URL Aliases
│    ├── 1.3 Spelling Typo in Navigation & Slug
│    └── 1.4 Duplicate <h1> Heading Hierarchy (SEO Bug)
│
├── 2. 🌐 NETWORK & LATENCY ISSUES
│    ├── 2.1 Slow Initial HTML TTFB (1.1+ Seconds)
│    ├── 2.2 Critical Font Request Waterfall (1,170 ms Latency)
│    ├── 2.3 TCP Connection Drops (ECONNRESET on Rapid Requests)
│    └── 2.4 Uncompressed & Heavy Media Transfers (2.4 MB on First Load)
│
├── 3. ⚡ GOOGLE PAGESPEED & PERFORMANCE INSIGHTS (LCP / FCP)
│    ├── 3.1 Unoptimized Oversized Images (2.35 MB Potential Savings)
│    ├── 3.2 Table of Offending Image Assets & Waste Breakdown
│    └── 3.3 Image Optimization Fix (Step-by-Step)
│
├── 4. 💡 IMPROVEMENTS & UX ENHANCEMENTS
│    ├── 4.1 Inventory Aging Calculator Usability
│    ├── 4.2 Contact Form Phone Number Input & Validation
│    ├── 4.3 Hero Metric Grid Layout & Text Wrapping
│    ├── 4.4 Tablet Quick-Access Badges (Horizontal Scroll)
│    ├── 4.5 Sticky Subheader Scroll Jitter
│    ├── 4.6 Missing Product Image Broken-Fallback Handler
│    ├── 4.7 Region & Currency LocalStorage Persistence
│    └── 4.8 Mobile Tap Targets (< 44px)
│
├── 5. ♿ ACCESSIBILITY & CONTRAST (a11y)
│    ├── 5.1 Low-Contrast Text on Hero Dashboard (Fails WCAG AA)
│    ├── 5.2 Missing Alt Text on Category Thumbnails
│    └── 5.3 Missing Explicit Form Labels on Newsletter Input
│
├── 6. ⚙️ MISSING CONFIGURATIONS & INFRASTRUCTURE
│    ├── 6.1 Missing SEO Files (robots.txt, sitemap.xml, canonical)
│    ├── 6.2 Missing Schema.org / JSON-LD Structured Data
│    ├── 6.3 Missing Web App Manifest & Mobile Theme Color
│    ├── 6.4 Missing Analytics & Tagging (GA4 / GTM)
│    └── 6.5 Missing Security Headers (CSP, X-Frame-Options, etc.)
│
└── 7. 🛠️ DROP-IN FIXES & CONFIGURATION (vercel.json, robots.txt, manifest.json)
```

---

# 1. 🐛 BUGS & DEFECTS

### 1.1 Broken Internal Links (HTTP 404)
**Severity:** 🔴 Critical / High  
**Description:** Clicking these internal navigation, resource, and comparison links returns a `404 Not Found` error.
- **Footer & Navigation Links:**
  - ❌ `/new-arrivals` (HTTP 404)
  - ❌ `/recommended` (HTTP 404)
  - ❌ `/webinars` (HTTP 404)
  - ❌ `/surplus-registration` (HTTP 404)
- **Sustainability & Comparison Deep Links:**
  - ❌ `/sustainability-data/surplus-inventory-vs-landfill-global-data` (HTTP 404)
  - ❌ `/sustainability-data/strait-of-hormuz-disruption-excess-inventory-gcc` (HTTP 404)
  - ❌ `/sustainability-data/selling-surplus-smartphones-prevents-ewaste` (HTTP 404)
  - ❌ `/comparison/branded-vs-non-branded-surplus-which-offers-better-value` (HTTP 404)
- **Fix:** Build the missing destination pages or configure 301 redirects to existing parent views (`/browse`, `/resources`, `/sustainability`, `/sell`).

---

### 1.2 Missing Direct URL Aliases
**Severity:** 🟡 High  
**Description:** Standard short URLs return 404 when typed directly into the address bar or shared externally, because server rewrites are missing.
- Direct entry of `/contact`, `/terms`, `/privacy`, `/login`, `/register`, or `/cart` returns 404 on Vercel.
- **Fix:** Add URL rewrites/redirects in `vercel.json` pointing `/contact` → `/contact-us`, `/terms` → `/terms-and-conditions`, and `/privacy` → `/privacy-policy`.

---

### 1.3 Spelling Typo in Navigation & Slug
**Severity:** 🟡 Medium  
**Description:** Category slug and navigation label contain a spelling error.
- **Current URL & Label:** `/buy/abbrasives` / **"Abbrasives"** (double 'b')
- **Correct Spelling:** `/buy/abrasives` / **"Abrasives"**
- **Impact:** Weakens SEO search ranking and enterprise brand credibility.

---

### 1.4 Duplicate `<h1>` Heading Hierarchy (SEO Bug)
**Severity:** 🟡 Medium  
**Description:** HTML pages must have only one `<h1>` for proper SEO indexing and screen-reader accessibility.
- The following pages render **two `<h1>` tags** in the DOM:
  - `/privacy-policy`
  - `/terms-and-conditions`
  - `/return-policy`
  - `/service-and-warranty`
  - `/uae`, `/qatar`, `/saudi-arabia`
- **Fix:** Retain one `<h1>` (Page Title) and change breadcrumb / sub-headings to `<h2>` or `<span>`.

---

# 2. 🌐 NETWORK & LATENCY ISSUES

### 2.1 Slow Initial HTML TTFB (1.1+ Seconds)
**Severity:** 🔴 High  
**Observed Metric:** `TTFB: 1,108 ms` on initial HTML document request (`/`).  
**Cause:** The root document header sends `Cache-Control: public, max-age=0, must-revalidate`. Every new visitor request forces a cold revalidation on the serverless backend or edge function before any HTML byte reaches the browser.  
**Fix:** Enable Stale-While-Revalidate (SWR) or serve the static `index.html` from Vercel's edge cache:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "s-maxage=3600, stale-while-revalidate=86400" }
      ]
    }
  ]
}
```

---

### 2.2 Critical Font Request Waterfall (1,170 ms Latency)
**Severity:** 🔴 High (Directly delays First Contentful Paint & Text Paint)  
**Observed Critical Path:**
```
1. Initial HTML: https://surplus-react-7i2p.vercel.app/ (453 ms, 16.5 KiB)
   └── 2. Stylesheet: /assets/styles-tRVU4Nu7.css (914 ms, 21.5 KiB)
        └── 3. Web Font: /assets/inter-latin-wght-normal-Dx4kXJAl.woff2 (1,170 ms, 47.6 KiB)
```
**Cause:** The browser cannot discover the `@font-face` WOFF2 file until the CSS file is downloaded and parsed.  
**Fix:** Preload the font in `index.html` `<head>`:
```html
<link rel="preload" href="/assets/inter-latin-wght-normal-Dx4kXJAl.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
```

---

### 2.3 TCP Connection Drops (`ECONNRESET` on Rapid Concurrent Requests)
**Severity:** 🟡 High  
**Observed Issue:** Sending concurrent requests across routes (`/browse`, `/terms`, `/register`, `/contact`) triggered `read ECONNRESET` network dropouts.  
**Cause:** Serverless origin cold starts / burst concurrency limits dropping open keep-alive TCP sockets.  
**Fix:** Ensure static routes are served directly from Edge CDN rather than hitting serverless execution routes, and enable HTTP/2 persistent connection pooling.

---

### 2.4 Uncompressed & Heavy Media Transfers (2.4 MB on First Load)
**Severity:** 🟡 Medium (Wasted Bandwidth)  
**Observed Issue:** 2,436 KiB of images are downloaded during initial load. 425 KiB JPEG tour banner and 1.39 MB Staples image load across mobile 4G connections without responsive dimensions.  
**Fix:** Convert to compressed WebP/AVIF and implement responsive `srcset` (saves **2.35 MB**).

---

# 3. ⚡ GOOGLE PAGESPEED & PERFORMANCE INSIGHTS (LCP / FCP)

### 3.1 Unoptimized Oversized Images
**Total Image Waste:** **2,353.9 KiB (96.5% reduction possible)** out of 2,436.8 KiB total image payload.  

### 3.2 Table of Offending Image Assets & Waste Breakdown

| Image / Item | Current Format & Dimensions | Displayed Size | Current Weight | Est. Savings | Primary Issue |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Staples Steel** (`.../1767159..._0.webp`) | WebP (3072 × 2308) | 284 × 379 | **1,395.0 KiB** | **1,377.5 KiB** | Massive resolution mismatch; low compression factor |
| **Hero Warehouse Tour** (`/assets/hero-warehouse-CBu5RugG.jpg`) | JPEG (1600 × 892) | 456 × 342 | **425.9 KiB** | **400.5 KiB** | Legacy JPEG format; needs WebP/AVIF conversion & resize |
| **Tissue Box (Rectangle)** (`.../tissue_box_L1_0.webp`) | WebP (1600 × 1200) | 284 × 284 | **142.5 KiB** | **136.5 KiB** | 5.6× oversized dimensions for display container |
| **Oral B Toothbrush Head** (`.../recycled-..._0.webp`) | WebP (1824 × 1368) | 284 × 284 | **110.4 KiB** | **106.8 KiB** | 6.4× oversized dimensions for display container |
| **Business Laptops** (`/assets/cat-it-DrBoI07w.jpg`) | JPEG (516 × 600) | 248 × 186 | **98.6 KiB** | **91.1 KiB** | Uncompressed JPEG; needs modern WebP/AVIF format |
| **Office Clearance** (`/assets/cat-furniture-B51k20IA.jpg`) | JPEG (516 × 600) | 248 × 186 | **93.3 KiB** | **85.8 KiB** | Uncompressed JPEG; needs modern WebP/AVIF format |
| **Branded Apparel** (`/assets/cat-retail-C2e_bS1p.jpg`) | JPEG (516 × 600) | 248 × 186 | **77.5 KiB** | **69.9 KiB** | Uncompressed JPEG; needs modern WebP/AVIF format |
| **Trash Bin / Dustbin** (`.../7_0_ew0SOzV.webp`) | WebP (1306 × 979) | 284 × 267 | **67.3 KiB** | **63.3 KiB** | 4.6× oversized dimensions for display container |
| **Mixed Electronics Pallet** (`/assets/cat-electrical-D-oVGMwR.jpg`) | JPEG (516 × 600) | 248 × 186 | **26.3 KiB** | **22.3 KiB** | Legacy JPEG format; needs WebP conversion |

---

### 3.3 Image Optimization Fix (Step-by-Step)

#### Step A: Auto Compress with Vite Plugin
```bash
npm install -D vite-plugin-image-optimizer sharp
```
In `vite.config.ts`:
```typescript
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      jpg: { quality: 75 },
      webp: { quality: 75 },
      avif: { quality: 70 },
    }),
  ],
});
```

#### Step B: Responsive `srcset` on Dynamic Product Cards
```tsx
<img
  src="/media/email_enq_images/staples_320.webp"
  srcSet="
    /media/email_enq_images/staples_320.webp 320w,
    /media/email_enq_images/staples_640.webp 640w
  "
  sizes="(max-width: 640px) 284px, 320px"
  alt="Staples steel"
  width="284"
  height="379"
  loading="lazy"
  decoding="async"
  className="h-full w-full object-cover"
/>
```

---

# 4. 💡 IMPROVEMENTS & UX ENHANCEMENTS

### 4.1 Inventory Aging Calculator Usability (`/inventory-calculator`)
- **Current State:** Plain numeric inputs with generic `0.00` placeholders.
- **Recommended Improvements:**
  - Add dynamic currency prefix symbols (`$`, `AED`, `SAR`) synced to the selected country switcher.
  - Automatically format numbers with thousand commas (e.g., `100,000` instead of `100000`).
  - Add step buttons (`+` / `-`) for storage duration days.

---

### 4.2 Contact Form Phone Number Input (`/contact-us`, `/assistance`)
- **Current State:** Input is coded as `<input id="number" name="number" />` without type specification or input masking.
- **Recommended Improvements:**
  - Change to `type="tel"`.
  - Add an international country flag & dialing code dropdown (e.g., `+971`, `+966`, `+1`, `+44`).
  - Add phone formatting mask and regex validation.

---

### 4.3 Hero Metric Grid Layout & Text Wrapping
- **Current State:** In the 5-column metric dashboard inside the hero, the label **"Value recovered"** wraps into two lines on screen widths between **1024px and 1180px**.
- **Recommended Improvement:** Add `whitespace-nowrap` or adjust grid column minimum widths (`minmax(0, 1fr)`) to maintain single-line typography.

---

### 4.4 Tablet Quick-Access Badges (Horizontal Scroll)
- **Current State:** On screen widths between **640px and 1024px** (iPads / tablets), the 6 quick-access buttons wrap across 3–4 irregular lines, pushing the search bar too far below the fold.
- **Recommended Improvement:** Wrap pills in a single-row container with `overflow-x-auto scrollbar-none` so users can swipe horizontally on touch devices.

---

### 4.5 Sticky Subheader Scroll Jitter
- **Current State:** The secondary floating category subheader (`-translate-y-full`) animates into view on scroll. Rapid scrolling up and down can cause a slight visual stutter.
- **Recommended Improvement:** Add `will-change: transform` and smooth CSS transitions.

---

### 4.6 Missing Product Image Broken-Fallback Handler
- **Current State:** If an inventory image fails to load or 404s, the browser shows a broken image icon.
- **Recommended Improvement:** Add an `onError` fallback handler to swap in a clean brand placeholder:
  ```tsx
  <img
    src={imgSrc}
    alt={title}
    onError={(e) => {
      e.currentTarget.src = '/static/images/placeholder-lot.svg';
    }}
  />
  ```

---

### 4.7 Region & Currency LocalStorage Persistence
- **Current State:** The region switcher (UAE · USD) is stored in component state and may reset back to default UAE on hard page reload.
- **Recommended Improvement:** Persist region selection in `localStorage` and read it during initial hydration.

---

### 4.8 Mobile Tap Target Sizing (< 44px)
- **Current State:** Some secondary buttons (e.g., "Read more" toggle on wholesale lot cards, pagination controls) have tap heights under 32px.
- **Recommended Improvement:** Ensure a minimum touch hit-box of **44×44px** per WCAG 2.1 guidelines.

---

# 5. ♿ ACCESSIBILITY & CONTRAST (a11y)

### 5.1 Low-Contrast Text on Hero Dashboard (Fails WCAG AA)
- **Current State:** Small labels in the hero dashboard card (e.g. `text-white/50`, `text-white/55`, `text-[8.5px]` labels like "Transactions", "CO₂e avoided") fall below the **4.5:1** contrast ratio threshold against the dark background.
- **Fix:** Increase color opacity to `text-white/75` or `text-white/80` for labels below 12px.

---

### 5.2 Missing Alt Text on Category Thumbnails
- **Current State:** 8 category icon images inside the category navigation bar have empty `alt=""` attributes:
  - `BUILDING_MATERIALS_ZsemikJ.webp`
  - `ELECTRICALS.webp`
  - `Hand_Tools.webp`
  - `Chisels.webp`
  - `PPE.webp`
  - `Power_Tools_sP2BnRF.webp`
  - `Decor_FXKeP3E.webp`
  - `Abrasive.webp`
- **Fix:** Provide descriptive `alt="Building Materials"`, `alt="Electricals"`, etc.

---

### 5.3 Missing Explicit Form Labels on Newsletter Input
- **Current State:** The footer email subscription input uses only `placeholder` and `aria-label`.
- **Fix:** Add `<label for="newsletter-email" class="sr-only">Email address</label>` for full screen-reader compliance.

---

# 6. ⚙️ MISSING CONFIGURATIONS & INFRASTRUCTURE

### 6.1 Missing SEO Files (robots.txt, sitemap.xml, Canonical)
- ❌ **`robots.txt`**: Returns HTTP 404 (Crawlers cannot read indexing instructions).
- ❌ **`sitemap.xml`**: Returns HTTP 404 (Search engines cannot crawl dynamic routes).
- ❌ **Canonical Tags**: Missing `<link rel="canonical" href="..." />` in `<head>`, risking duplicate content penalties.

---

### 6.2 Missing Schema.org Structured Data
- ❌ **JSON-LD Tags:** 0 structured data tags detected.
- **Recommendation:** Add Schema.org JSON-LD snippets for:
  - `Organization` (Logo, Name, Social Links)
  - `WebSite` (with Sitelinks SearchBox)
  - `Product` / `Offer` (for wholesale lot listings)
  - `BreadcrumbList` (for category navigation)

---

### 6.3 Missing Web App Manifest & Mobile Theme Color
- ❌ Missing `site.webmanifest` / `manifest.json` file.
- ❌ Missing `<meta name="theme-color" content="#0F6E56">` in `<head>` for mobile address bar color matching.

---

### 6.4 Missing Analytics & Event Tracking (GA4 / GTM)
- ❌ Google Tag Manager (`GTM-XXXX`) and Google Analytics 4 (`G-XXXX`) are not yet integrated into the production build.
- **Recommended Key Events to Track:**
  - `browse_inventory_click`
  - `sell_inventory_click`
  - `request_quote_submit`
  - `contact_form_submit`
  - `calculator_used`
  - `newsletter_subscribed`

---

### 6.5 Missing Security Headers
- ❌ The following recommended HTTP security headers are missing from server responses:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN` (prevents clickjacking)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Content-Security-Policy` (CSP)

---

# 7. 🛠️ DROP-IN FIXES & CONFIGURATION

### `vercel.json` Configuration
Add this to your project root to immediately fix **404 redirects**, **URL aliases**, **font preloading**, and **security headers**:

```json
{
  "redirects": [
    { "source": "/buy/abbrasives", "destination": "/buy/abrasives", "permanent": true },
    { "source": "/contact", "destination": "/contact-us", "permanent": true },
    { "source": "/terms", "destination": "/terms-and-conditions", "permanent": true },
    { "source": "/privacy", "destination": "/privacy-policy", "permanent": true },
    { "source": "/new-arrivals", "destination": "/browse?filter=new", "permanent": false },
    { "source": "/recommended", "destination": "/browse?filter=featured", "permanent": false },
    { "source": "/webinars", "destination": "/resources", "permanent": false },
    { "source": "/surplus-registration", "destination": "/sell", "permanent": false }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Link", "value": "</assets/inter-latin-wght-normal-Dx4kXJAl.woff2>; rel=preload; as=font; type=font/woff2; crossorigin=anonymous" }
      ]
    }
  ]
}
```

### Robots.txt File (`public/robots.txt`)
```txt
User-agent: *
Allow: /

Sitemap: https://surplus-react-7i2p.vercel.app/sitemap.xml
```

### Web App Manifest (`public/site.webmanifest`)
```json
{
  "name": "Surplus Market",
  "short_name": "SurplusMarket",
  "icons": [
    {
      "src": "/static/final_assets/media/favi_log.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "theme_color": "#0F6E56",
  "background_color": "#ffffff",
  "display": "standalone"
}
```
