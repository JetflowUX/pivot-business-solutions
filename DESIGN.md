# Design

<!-- impeccable:design-schema 1 -->

Recorded from the built world, not from intention. Seed key `08b7696e`.
The binding contract is the HTML comment at the top of `<body>` in `index.html`.

## The world

**Concourse departure board.** A rail station split-flap board at rush hour:
matte flap faces in fixed character cells, white paint capitals, brushed steel
surrounds bolted at the corners, and one amber lamp marking the row that
matters. The site is the board.

It replaced an azulejo tile hall, which the user rejected as reading floral and
ceremonial rather than athletic. That hall, and the warm-ivory serif-and-gold
wellness page before it, are both anti-reference. The direction was the user's
pick from the catalog challengers, over the roll's own assigned grounded
direction (a training-room return-to-play protocol sheet).

Three rules govern everything:

1. **The row never leaves the board; only its destination changes.** That is
   the pivot, and it is why this world was chosen. Rows are the page structure
   everywhere — modules divided by hairlines, never a grid of cards.
2. **One signal.** Amber is the only accent on the board. Red is defined and
   reserved for a cancelled state the product does not currently have.
3. **Columns never move.** Every table, module and row list is tabular and
   left-aligned, with the status always last.

## Platform

Static HTML/CSS/JS. No build step, no framework, no external requests.
Seven routes, one shared `styles.css` and `script.js`.

## One glaze

There is no light theme and no theme toggle. A departure board is black; the
visitor is often on a phone, late, after a hard day. The user had also asked
for the light theme to be removed before this redesign, and that decision
carries forward. `color-scheme: dark` is declared so native controls follow.

## Tokens

All in `:root` in `styles.css`.

### Palette

| Token | Value | Role |
|---|---|---|
| `--flap` | `#0D0D0F` | concourse dark, the page ground |
| `--flap-top` / `--flap-bot` | `#1B1B1E` / `#0A0A0C` | the two halves of a flap, split by the hinge |
| `--paint` | `#F2F2F2` | the letter itself |
| `--paint-2` | `#9AA0A8` | secondary reading, 6.2:1 on flap |
| `--paint-3` | `#7D838C` | labels and captions, 5.1:1 on flap |
| `--amber` | `#FFB400` | the row lamp — actions, live rows, active nav. 10.8:1 |
| `--red` / `--red-txt` | `#D32F2F` / `#FF6F63` | cancelled: fills vs text (text lifted to 7.1:1) |
| `--green` | `#5BD07A` | the running lamp on the reply-time line |
| `--steel-2/3/4` | `#7D838C` / `#2A2C31` / `#3C3F45` | frame edge, board hairline, control edge |

`--board` is the flap face itself: a three-stop gradient with the hinge line
dead across the middle. `--brushed` is the steel: a five-stop gradient.

### Measure

| Token | Value | Notes |
|---|---|---|
| `--hall` | `min(100% - 1.6rem, 1320px)`, gutter widens at 760 | container |
| `--rail` | `3px` | the steel rail that closes a band |
| `--frame` | `6px` → `11px` at 760 | the steel surround, and the gap between panels inside it |
| `--r` | `3px` | the board is a rectangle, so is everything on it |

The 3px radius is a deliberate world override of the craft floor's 12–16px
card radii. There are no cards here, and a flap has square corners.

## Type

One family, two widths, both self-hosted woff2 (SIL OFL), preloaded.

| Role | Face | Setting |
|---|---|---|
| Board voice | **Archivo Narrow** 400–700 | uppercase, tracked `.06–.24em`. Headings, nav, labels, statuses, table data, buttons |
| Notice voice | **Archivo** 400–700 | sentence case, 1.62 line-height. Paragraphs and form fields |

The board voice is the site's chrome; the notice voice is what a station
actually pins up beside the board, and it exists because tracked capitals are
unreadable at paragraph length for a visitor under stress.

**Display measures are set in `em` of the heading's own size, never in `ch`.**
A `ch` resolves against the body face; applied to a cell-split board heading it
breaks the line mid-word. `.masthead h1` is `27em`, `.band blockquote` is
`15em`. This trap was hit and fixed during the build.

## The flap cell

The signature material. `script.js` splits any `[data-flap]` element into one
`<span class="cell">` per character, each `.68em × 1.2em`, separated by 2px
seams, with hinge pins drawn at the left and right edges.

The element itself carries a **field of empty flaps** as a background whose
pitch is the cell plus its seam, so painted cells land exactly on the field's
grid and the unused flaps to the right of a short line stay visible. That field
is what makes the headline read as a board rather than as tracked type.

Cells are `<span>`, not `<i>`: an `<i>` made every glyph inherit italic and the
browser synthesised an oblique across the entire headline.

Without JS the same text renders as tracked capitals and reads perfectly; all
cell styling is scoped to `html.js`.

## Components

- **`.frame`** — the steel surround. Elevation is declared **once**, as the
  frame; no shadow is ever stacked under it. Four screws are drawn as corner
  radial-gradients at ≥760px. Panels inside carry their own flap ground so the
  steel keeps showing through every gap.
- **`.board`** — a real `<table>`. Service (with a sub-line naming who it is
  for) and Status. `tr.next` is the lit row: amber text, amber left lamp, and a
  warmer flap gradient. It is always the free first conversation.
- **`.status`** — rectangular chip. `live` amber, `open` steel, `tba` dashed
  amber, `off` red.
- **`.board-legend`** — teaches the two states the visitor has to trust: what
  is lit, what is not announced.
- **`.module` + `.rows`** — the board's answer to a row of cards: one framed
  module divided by hairlines into keyed rows. Same-size icon-heading-text
  cards appear nowhere on this site.
- **`.calls`** — the calling-point route. Stacked with a rail down the margin
  on narrow frames; at ≥920px it turns and runs left to right as a carriage
  diagram. Numbered because the sequence carries information.
- **`.plate`** — a photograph is not pasted onto the board, it is seen through
  concourse glass: `grayscale(.34) contrast(1.1) brightness(.82)` under a
  left-right vignette, rail-capped.
- **`.note`** — a printed notice with a station label, bordered. It carries no
  coloured side stripe; the floor refuses that and the board has no such device.

## Motion

**One authored moment: the board setting itself.** Character cells flip down
from the hinge (`rotateX(-92deg) → 0`, origin top), left to right at 16ms per
cell capped at 760ms, then the table rows land behind them. Nothing else on the
site moves. `--ease` is `cubic-bezier(.16, 1, .3, 1)`.

Under `prefers-reduced-motion: reduce` both are forced visible with no
transition. With JS disabled nothing is hidden.

## The honesty system

The board's own missing-content state carries the user's constraint that
invented content stay visible but unmistakably marked: **a departure with
nothing confirmed reads TBA.**

- `.status-tba` — dashed amber chip, used on the home board for fees.
- `.tba` / `.tba-tag` — dashed panel plus an amber TBA tag, on placeholder
  figures, testimonials, and the entire About bio panel.
- `.figure.tba b` — the numeral renders as an **outline** (`-webkit-text-stroke`),
  so a hollow figure is legible as "not confirmed" at a glance.
- `.ph` / `.ph-note` — placeholder contact details carry a dashed amber
  underline and a visible note, on **every** route.
- Every unannounced region is followed by a plain-language `.note` naming
  exactly what is illustrative and what must replace it.

Do not quietly confirm these rows without real content.

## Browser surfaces

Themed from the palette: `::selection`, `caret-color`, `accent-color`,
scrollbar track and thumb, focus ring (2.5px amber), placeholder colour, and
`tabular-nums` on board figures.

## Responsive

Breakpoints: 520 / 560 / 600 / 680 / 760 / 800 / 860 / 880 / 900 / 920 / 980 /
1000. The hero assembly splits at 980, the calling points turn horizontal at
920, the route list collapses to a burger below 1000. Verified with no
horizontal overflow at a true 375px viewport on all seven routes.

## Verified

- Bundled design detector: zero findings across all 7 routes, `styles.css`
  and `script.js`.
- No horizontal overflow at 375px on any route (measured, not eyeballed).
- All 213 internal link and asset targets resolve.
- Every route returns 200 on a server with no URL rewriting.
- No-JS content visible; reduced-motion honoured; Escape closes the route list;
  form validation focuses the offending field.

## Known gaps

- **The row-flip is not built.** A split-flap board's most characteristic
  device is a row clacking over to a new destination. The flip is built on the
  headline cells only; table rows land with a fade. This is the largest unused
  native device.
- **Steel and flap faces are CSS gradients**, not a produced brushed-metal
  texture. At the 3–11px scale the steel is used this reads adequately, but a
  real material asset would close the distance to the world's quality bar.
- **No comp round was run.** Image generation was available but billable to the
  user's connected account and not authorised, so the direction went from card
  straight to build without rendered compositional options.
- Three stock photographs are reused across seven routes.
- See `README.md` for the full replacement checklist.
