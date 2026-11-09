# AGENTS.md

## 1. Role

The global stylesheets of the page, imported in order by `main.js`: the design
tokens, then the document base. Everything a component styles for itself stays in
its own scoped `<style>`; this folder holds only what several components share.

## 2. Constraints

**Import order is fixed**: `tokens.css`, then `base.css`.

**Tokens first.** Colours, type, layout sizes, the radius, and the motion curve are
custom properties in `tokens.css`. No token survives once nothing reads it.

**The palette is closed.** One background, a hover tint, a raised fill for code, a
hairline, three text greys, and one accent. Each text colour keeps at least 4.5:1
on `--bg`; the ratios are noted beside the tokens. A new colour needs a reason in
this file.

**Motion is shared here.** `.rise` is the one-time load-in (opacity and a 6 px
lift, staggered by `--i`); the reduced-motion rule ends every transition and
animation at once, and smooth scrolling applies only without that preference.

## 3. Contents

- `AGENTS.md` — this file: what is global and why.
- `tokens.css` — fonts (`@font-face`), colours, type scale, layout sizes, radius,
  and motion.
- `base.css` — resets, document defaults, focus ring, selection, the shared
  `.mono`, `.link`, and `.dot-list`, the `.rise` load-in, reduced motion, and print.

## 4. Progress

**Done.**

- v6 minimal dark tokens; `glass.css` and `motion.css` were removed with the v5
  design.

**Not done.**

- Dark only; no light theme.

**Known defects.**

- None known.
