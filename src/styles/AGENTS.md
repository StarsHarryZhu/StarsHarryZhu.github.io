# AGENTS.md

## 1. Role

The global stylesheets of the page, imported in order by `main.js`: the design
tokens, the document base, the two liquid-glass materials, and the condense motion.
Everything a component styles for itself stays in its own scoped `<style>`; this
folder holds only what several components share.

## 2. Constraints

**Import order is fixed**: `tokens.css`, `base.css`, `glass.css`, `motion.css`.
Later files rely on earlier ones.

**Tokens first.** Colours, type, spacing, radii, motion curves, and z-layers are
custom properties in `tokens.css`. No token survives once nothing reads it.

**The nebula palette is hex only.** `--nebula-cyan`, `--nebula-blue`,
`--nebula-violet`, and `--nebula-magenta` are read at runtime by the gas layer,
which parses `#RRGGBB`; keep that format.

**Two glass materials, no third.** `.glass` is for surfaces that scroll with the
page and never uses `backdrop-filter`. `.lens-glass` samples the backdrop and is
reserved for small fixed surfaces: the top-bar capsule and the case dialog.

**Per-frame changes are transform and opacity only.** The pointer light moves the
`::after` light with `transform` and fades it with `opacity`; nothing repaints a
gradient per frame.

**Only the hero blurs.** `.condense--vapor` is the one blur transition and is
one-shot; panels condense with opacity and transform only.

**Every rule degrades.** Touch, coarse pointers, and reduced motion drop the hover
lift and the pointer light; reduced motion ends every transition at once.

## 3. Contents

- `AGENTS.md` — this file: what is global and why.
- `tokens.css` — fonts (`@font-face`), the nebula palette, text and line colours,
  the liquid-glass layers, type, spacing, radii, motion, and z-layers.
- `base.css` — box sizing, document defaults, focus ring, selection, scrollbar,
  the stable scrollbar gutter, and the global reduced-motion rule.
- `glass.css` — `.glass` (rim, lens band, dispersion, pointer light, halo pull),
  `.lens-glass` (real backdrop blur, Chromium refraction through `html.lg-refract`),
  and the shared `.tag-pill` and `.card-icon`.
- `motion.css` — `.condense`, `.condense--vapor`, and `.is-condensed`.

## 4. Progress

**Done.**

- v5 tokens and materials: deeper nebula palette, refractive rims with chromatic
  edges, pointer light and halo pull on the optical glass, lens glass on two
  surfaces.

**Not done.**

- No light theme; the page is dark only.

**Known defects.**

- None known.
