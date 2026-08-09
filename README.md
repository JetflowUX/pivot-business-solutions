# Pivot Business Solutions LLC — website

A seven-page static site for a counseling + consulting practice.
**Slogan:** *Find your pivot.*

- **Concept:** a *pivot* — one foot planted, the other changing direction. Life counseling for athletes and young people; management consulting for athletes and businesses.
- **Design world:** a **concourse departure board**. Matte flap black, white paint capitals in fixed character cells, brushed steel surrounds bolted at the corners, and one amber lamp on the row that matters — the free first conversation. **Archivo Narrow** on every flap, **Archivo** for the printed notices. One state: a departure board is black, so there is no light theme and no toggle.
- 100% static, self-contained (self-hosted fonts, no external CDNs, no tracking). No build step.

See `PRODUCT.md` for product truth and `DESIGN.md` for the visual system.

## Routes

| Route | File |
|---|---|
| `/` | `index.html` |
| `/who-i-help` | `who-i-help.html` |
| `/counseling` | `counseling.html` |
| `/consulting` | `consulting.html` |
| `/approach` | `approach.html` |
| `/about` | `about.html` |
| `/contact` | `contact.html` |

`vercel.json` sets `cleanUrls`, so links are written without `.html`.

## Run locally

Clean URLs need a server that resolves extensionless paths:

```bash
npx serve .          # resolves /contact -> contact.html
```

`python3 -m http.server` will serve the files but **not** the clean URLs, so inner
routes 404 under it.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Vercel → **Add New → Project** → import the repo.
3. Framework preset: **Other** (static). No build command; output = repo root.
4. Deploy.

CLI: `npm i -g vercel && vercel` then `vercel --prod`.

---

## ✏️ Replace before going live

The design deliberately marks unverified content instead of hiding it. Anything
that is not a confirmed fact renders as **TBA**: a dashed amber chip or tag, and
outlined rather than solid figures. That state is part of the design system, not
a bug — it is how a departure board shows a service with nothing confirmed yet.

### Blocking — do not publish without these

| # | What | Where |
|---|---|---|
| 1 | **Email address** `hello@pivotbusinesssolutions.com` (not a live address) | footer of all 7 pages · `contact.html` · `CONSULT_ADDRESS` in `script.js` |
| 2 | **Phone** `(555) 012-3456` / `tel:+15550123456` | footer of all 7 pages · `contact.html` |
| 3 | **Practitioner bio** — name, photo, qualifications, licensure | `about.html` → the TBA panel under "This row is not announced yet" |
| 4 | **Stats** `12+` years, `300+` clients | `index.html` → `.figures`, the two `.tba` tiles |
| 5 | **Testimonials** — three written samples, no real client said them | `index.html` → `.voices`, all three `.tba` tiles. Replace with real, permissioned quotes **or delete the section** |

A sixth row, **fees & engagement length**, sits on the home board as a `TBA` row
because no pricing was supplied. Confirm or remove it once scope and cost exist.

Search the repo for `PLACEHOLDER` to find every one of these in code.

### Recommended

| What | Why |
|---|---|
| **Own photography** | `images/hero.jpg`, `youth.jpg`, `consult.jpg` are Unsplash stock. Each is reused across 2–3 pages, which is visible if you read the site end to end. |
| **A counseling-specific photo** | `youth.jpg` (people with laptops in a café) currently illustrates the counseling panels. It reads as co-working, not counseling. This is the weakest semantic fit on the site. |
| **Legal / professional disclosures** | A counseling practice may be required to publish licensure, jurisdiction, or complaints information. Nothing has been added, because nothing was supplied. |
| **Real form handling** | The consult form opens the visitor's own email client via `mailto:`. To capture submissions instead, wire it to a form service or serverless endpoint. |

### Removed deliberately

- `images/counsel.jpg` was **deleted**: it contained a visible Nike wordmark and swoosh, which should not ship on a commercial site.
- The azulejo ornament (`images/orn-*.svg`) and the Cinzel + EB Garamond webfonts were removed with that design.
- There is no theme toggle. The board is black by design, not by default.

## Structure

```
index.html  who-i-help.html  counseling.html  consulting.html
approach.html  about.html  contact.html
styles.css · script.js
fonts/      Archivo Narrow + Archivo (woff2, self-hosted, SIL OFL)
images/     hero · consult · youth
favicon.svg · vercel.json · package.json
PRODUCT.md · DESIGN.md
```

## Notes

- **Accessibility:** respects `prefers-reduced-motion`, fully keyboard operable, visible focus rings, skip link, `aria-current` on the active route, tabular figures, lazy-loaded images below the fold.
- **Motion** is one idea: the board setting itself. Character cells flip down from the hinge, left to right, then the table rows land behind them. That happens once, on the first screen, and nothing else on the site moves. With JS disabled the same words render as tracked capitals at full opacity.
- Fonts: Archivo Narrow & Archivo under the SIL Open Font License. Photos: Unsplash.
