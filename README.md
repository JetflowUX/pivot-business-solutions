# Pivot Business Solutions LLC — website

A seven-page static site for a counseling + consulting practice.
**Slogan:** *Find your pivot.*

- **Concept:** a *pivot* — one foot planted, the other changing direction. Life counseling for athletes and young people; management consulting for athletes and businesses.
- **Design world:** an **azulejo station hall**. Cobalt oxide on milk-white tin glaze, mustard only inside border frames, grout seams running straight through every panel, photograph and figure. Inscriptional roman caps (**Cinzel**) over old-style text (**EB Garamond**). Light glaze by default, dark "reverse-fired" glaze on toggle.
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
that is not a confirmed fact renders as an **unpainted tile**: a dashed frame, a
mustard `UNPAINTED` tag, and outlined rather than solid figures. That state is
part of the design system, not a bug — it is how this hall shows a panel that has
not been painted yet.

### Blocking — do not publish without these

| # | What | Where |
|---|---|---|
| 1 | **Email address** `hello@pivotbusinesssolutions.com` (not a live address) | footer of all 7 pages · `contact.html` · `CONSULT_ADDRESS` in `script.js` |
| 2 | **Phone** `(555) 012-3456` / `tel:+15550123456` | footer of all 7 pages · `contact.html` |
| 3 | **Practitioner bio** — name, photo, qualifications, licensure | `about.html` → the unpainted panel under "The practitioner" |
| 4 | **Stats** `12+` years, `300+` clients | `index.html` → `.figures`, the two `.unfired` tiles |
| 5 | **Testimonials** — three written samples, no real client said them | `index.html` → `.voices`, all three `.unfired` tiles. Replace with real, permissioned quotes **or delete the section** |

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
- The previous Fraunces + Archivo webfonts were removed with the old design.

## Structure

```
index.html  who-i-help.html  counseling.html  consulting.html
approach.html  about.html  contact.html
styles.css · script.js
fonts/      Cinzel + EB Garamond (woff2, self-hosted, SIL OFL)
images/     hero · consult · youth  +  orn-*.svg (authored ornament)
favicon.svg · vercel.json · package.json
PRODUCT.md · DESIGN.md
```

The `orn-*.svg` files are authored azulejo ornament (running-scroll frieze,
cartouche corner volute, divider fleuron, padrão pattern field, pivot device).
They are worn as **CSS masks**, so their ink color comes from a token and one
file serves both the light and dark glaze.

## Notes

- **Accessibility:** respects `prefers-reduced-motion`, fully keyboard operable, visible focus rings, skip link, `aria-current` on the active route, tabular figures, lazy-loaded images below the fold.
- **Motion** is one idea: glaze flooding line work in the kiln. Panels wash in from the top edge; nothing slides or bounces. With JS disabled, everything is visible at full opacity.
- Fonts: Cinzel & EB Garamond under the SIL Open Font License. Photos: Unsplash.
