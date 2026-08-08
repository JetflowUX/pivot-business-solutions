# Pivot Business Solutions LLC — website

A one-page site for a counseling + consulting practice.
**Slogan (coined for the brand):** *Find your pivot.*

- **Concept:** a *pivot* — one foot planted, the other changing direction. Life counseling for athletes and young people; management consulting for athletes and businesses.
- **Look:** warm ivory + deep **pine green** + **achievement gold**, theme-aware (light default, dark toggle). **Fraunces** (warm serif, the human/advisory voice) over **Archivo** (athletic grotesque). Signature rotating "pivot" motif.
- 100% static, self-contained (self-hosted fonts + images, no external CDNs). No build step.

## Run locally
```bash
npx serve .        # or: python3 -m http.server 8000
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Vercel → **Add New → Project** → import the repo.
3. Framework preset: **Other** (static). No build command; output = repo root.
4. Deploy. `vercel.json` sets clean URLs + long-cache headers for `/fonts` and `/images`.

CLI: `npm i -g vercel && vercel` then `vercel --prod`.

## ✏️ Replace these before going live

The copy is grounded in the real service description; the items below are **placeholders** — swap in the practice's true details:

| Where | Placeholder | File |
|---|---|---|
| Email | `hello@pivotbusinesssolutions.com` | `index.html` (contact + footer) |
| Phone | `(555) 012-3456` / `+15550123456` | `index.html` (contact + footer) |
| Stats | `12+` years · `300+` clients | `index.html` → `.stats` |
| Testimonials | sample quotes (Marcus T., Denise R., Andre & Co.) | `index.html` → `.voices` — replace with **real, permissioned** testimonials |
| Photos | stock imagery in `/images` | replace with the practice's own where possible |
| Founder photo/bio | none included by design | add your headshot + personal bio to the **About** section |

The consult form opens the visitor's email app (a pre-filled `mailto:`) — no server needed. To capture submissions instead, wire it to a form service or serverless endpoint.

## Structure
```
index.html · styles.css · script.js
fonts/     Fraunces + Archivo (woff2, self-hosted, SIL OFL)
images/    hero · counsel · consult · youth
favicon.svg · vercel.json · package.json
```

## Notes
- **Accessibility/perf:** respects `prefers-reduced-motion`, theme-aware light/dark with a persisted toggle, keyboard-focusable, tabular stat figures, lazy-loaded images.
- Testimonials and stats are illustrative until replaced — don't publish invented numbers or quotes as real.
- Fonts: Fraunces & Archivo under the SIL Open Font License. Photos: Unsplash.
