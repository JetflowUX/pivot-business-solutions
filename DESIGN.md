# Design

<!-- impeccable:design-schema 1 -->

Recorded from the built world, not from intention. Seed key `e9ffcc1f`.
The binding contract is the HTML comment at the top of `<body>` in `index.html`.

## The world

**Azulejo station hall.** A Portuguese tin-glazed tile hall, of the kind that
lines a nineteenth-century railway station: framed narrative panels walked in
order, cobalt oxide painted on milk-white glaze, ornamental friezes marking
where one panel ends and the next begins, and grout seams running dead straight
through every scene, including through faces.

It was chosen by the user over the roll's own assigned direction. The world it
replaced — warm ivory ground, high-contrast serif, gold accent, soft cards — is
the category default for a counseling practice and is treated here as
anti-reference. The ground is held **deliberately cool** for that reason; a warm
ivory would put the site back where it started.

Three rules govern everything:

1. **Cobalt on milk white only.** Mustard appears solely inside border frames,
   ornament, and one accent word. There is no third hue.
2. **The seam is never hidden.** The tile grid crosses panels, photographs and
   figures without exception. It is the surface admitting how it was made.
3. **Layout snaps to a whole tile.** `--tile` is the unit; every padding,
   measure and container width is a multiple of it.

## Platform

Static HTML/CSS/JS. No build step, no framework, no external requests.
Seven routes, one shared `styles.css` and `script.js`.

## Tokens

All in `:root` in `styles.css`, re-declared for the dark glaze under both
`[data-theme=dark]` and `@media (prefers-color-scheme: dark)`.

### Measure

| Token | Light | Notes |
|---|---|---|
| `--tile` | `34px` → `40px` @700 → `44px` @1100 | the unit everything snaps to |
| `--hall-w` | `min(100vw - tile, tile*27)` | container width |
| `--gutter` | `(100vw - hall-w)/2` | resolved once so panels can bleed to the wall edge without guessing their grid cell |
| `--vol` | `34px` → `44px` | cartouche corner volute |

### Glaze

| Token | Light | Dark | Role |
|---|---|---|---|
| `--ground` | `#EFF0EC` | `#061C46` | the tiled wall |
| `--panel` | `#FAFAF7` | `#0A2758` | a glazed tile face |
| `--panel-2` | `#F4F5F1` | `#0C2E66` | station, masthead, frieze band, footer |
| `--ink` | `#0D3B8E` | `#EDF2FB` | cobalt line work |
| `--ink-2` | `#2E5CA8` | `#C3D6F1` | body secondary |
| `--ink-3` | `#3F66A4` | `#93B2DF` | small labels and captions |
| `--line` | `#A8C3E6` | `#2E5CA8` | grout edge, frames, dividers |
| `--line-2` | `#DCE5F3` | `#17417F` | internal hairlines |
| `--seam-c` / `--seam-panel` | `#DEE0D9` / `#E4E7DF` | translucent | grout on the wall / on a tile |
| `--gold` | `#B9820C` | `#EFC456` | accent text, underlines |
| `--gold-orn` | `#E4B22A` | `#E9BE45` | ornament mustard |
| `--band-bg/-ink/-accent` | cobalt / white / mustard | same | the quote band holds cobalt in **both** glazes so its mustard never lands on a light ground |

`--ink-3` is pinned to ≥4.5:1 against both `--panel` and the slightly darker
`--ground`. In a one-colour medium, hierarchy comes from size, weight and
tracking — never from fading text toward the ground.

### Dark is not a filter

The dark glaze is the **reverse firing**: white line work on deep cobalt, the
way a reverse-painted tile is made. Photographs keep their cobalt duotone and
dim slightly (`--pic-bright: .86`); the seam overlay switches from `multiply`
to `screen`.

## Type

| Role | Face | Setting |
|---|---|---|
| Display | **Cinzel** 400/600/700 | inscriptional roman capitals, the lettering brushed into a cartouche. Always uppercase, tracked `.02–.2em` |
| Text | **EB Garamond** 400/500/600 + italic | old-style, `onum` figures on, 1.68 line-height |

Both self-hosted woff2 (SIL OFL), preloaded, `font-display: swap`.

**Display measures are set in `em` of the heading's own size**, never in `ch`.
A `ch` resolves against the body face; used on a Cinzel display heading it
produces a two-words-per-line ribbon. `.sec-head h2` is `15em`,
`.band blockquote` is `14em`, `.masthead-in` is sized in tiles.

## Ornament

Five authored SVGs in `images/`, each worn as a **CSS mask** so its ink is a
token and one file serves both glazes.

| File | Use |
|---|---|
| `orn-frieze.svg` | 60×44 running scroll: two ink weights, filled acanthus, large volutes, hairline rules top and bottom |
| `orn-frieze-accent.svg` | the mustard pass of the same unit, registered to it |
| `orn-corner.svg` | 64×64 cartouche corner volute, rotated 90/180/270 for the other corners |
| `orn-fleuron.svg` | divider fleuron |
| `orn-padrao.svg` | seamlessly tiling pattern field |
| `orn-pivot.svg` | the brand device: one foot planted (quatrefoil), the other turning (quarter arc) |

The frieze is laid up in **two passes** — a cobalt mask layer and a mustard mask
layer stacked as `::before` / `::after` — because the tile itself is painted in
two inks. It renders at `--tile * 1.45` (~64px).

## Components

- **`.panel`** — the glazed tile. Elevation is declared **once**, as the fired
  surface: a grout border plus an inset glaze highlight and shade plus a radial
  glaze pool. No drop shadow under a hairline border; that combination is the
  ghost card.
- **`.cartouche`** — the frame device: double rule plus four corner volutes in
  mustard. Used for the hero plate and the mural badge, not as a card.
- **`.registers`** — the hall's answer to a row of cards: **one** panel divided
  by grout into registers of unequal column width (`1.22fr 1fr 1fr`). Same-size
  icon+heading+text cards are not the page structure anywhere on this site.
- **`.scene`** — a painted photograph butted against a text panel, the strongest
  region in the build.
- **`.tilepic`** — a photograph is not pasted onto the hall, it is fired into
  it: `grayscale` + `contrast`, `mix-blend-mode: screen` over cobalt for a true
  duotone, then the same grout seams overlaid straight through it.
- **`.btn`** — a plaque: solid cobalt with an inner keyline. `.btn-ghost` is the
  outlined variant.
- **`.step-n`** — numbered plate. Used **only** where the sequence carries
  information (the four-step walk, the engagement stages). Parallel offerings
  are not numbered.

## The honesty system

The user's constraint was that invented content stay visible but be
unmistakably marked. The world's own missing-content state carries it:
**a panel that has not been painted yet.**

- `.unfired` — dashed cobalt frame, mustard `UNPAINTED` tag.
- Display figures render as **outline** (`-webkit-text-stroke`): at 50px a
  hollow numeral is the clearest possible "not fired yet". Body copy does not
  survive that treatment, so an unpainted quote keeps solid ink and is marked
  by its frame, tag and note instead.
- `.ph` / `.ph-note` — placeholder contact details carry a dashed underline and
  a visible note on **every** route, not an HTML comment the visitor never sees.
- Every unpainted region is followed by a plain-language note naming exactly
  what is illustrative and what must replace it.

This is the one device that turns a constraint into design. Do not dilute it,
and do not quietly fire those tiles without real content.

## Motion

**One authored moment, not an entrance on every section.** Motion is a single
idea: glaze flooding line work in the kiln. A mask gradient sweeps down the
element while its opacity comes up — no transforms, no slide, no bounce.

It is spent on the hero plate and the quote band only (`data-a`, one or two per
page). Everything else is visible on arrival. `--ease` is
`cubic-bezier(.16, 1, .3, 1)`, an exponential ease-out.

Under `prefers-reduced-motion: reduce` the mask is removed entirely. With JS
disabled nothing is hidden — the wash styles are scoped to `.js`.

## Browser surfaces

Themed from the palette, not left to the browser: `::selection`, `caret-color`,
`accent-color`, scrollbar track and thumb, focus ring (3px `--ink`, ≥10:1),
underline offset, and `tabular-nums` on figures.

## Responsive

Breakpoints follow the tile: 560 / 620 / 640 / 700 / 760 / 820 / 860 / 900 /
960 / 1000 / 1100. Registers stack to rows below 820. `.scene` stacks below 860.
On narrow frames the hero mural **leads** (`order: -1`, 29vh) so the mural and
the frieze both land in the first viewport, as the direction contract promises.
The primary action is verified above the fold at 1440×900, 1280×800 and 390×844.

## Verified

- Bundled design detector: zero findings across all 7 routes + `styles.css`.
- WCAG AA on rendered text: 7 routes × 2 glazes × 2 widths, zero failures.
- All internal link targets resolve.
- No-JS content visible; reduced-motion honoured; theme persists across routes;
  skip link is the first tab stop; Escape closes the route list; form
  validation focuses the offending field.

## Known gaps

- **No painted mural asset.** The hero wants a real blue-underglaze tile mural.
  No image generation was available in this environment, so it is a cobalt
  duotone of a photograph under seams. This is the largest remaining distance
  between the build and the world.
- Three stock photographs are reused across routes; one (`youth.jpg`) is a
  weak semantic fit for the counseling panels.
- See `README.md` for the full replacement checklist.
