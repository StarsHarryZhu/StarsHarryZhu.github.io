# AGENTS.md

## 1. Role

The rendering effects that plain CSS cannot do, written as framework-free modules
that components call: the gas layer (vapour and light particles) and the lens
(edge refraction for real glass). Together with `src/styles/glass.css` they make up
the page's visual language, taken from the "immersive light" design of HarmonyOS:
translucent material, light that follows the pointer, a halo that leans toward it,
and gaseous motion with light particles when something enters or leaves.

## 2. Constraints

**Answer actions; rest when idle.** Effects start in response to the reader (a
panel scrolling in, the dialog opening or closing, a press, a language switch,
pointer movement) and stop when their result has faded. Nothing here may run a
permanent animation loop.

**Progressive.** Each effect checks its own support and turns itself off cleanly:
no WebGL2 or no half-float targets means no gas; a browser other than Chromium
means no refraction. The page must look complete and work fully without either.

**No dependencies.** Plain JavaScript and browser APIs only.

**Vue stays outside.** Modules here export plain functions and objects; the
components and composables decide when to call them.

## 3. Contents

- `AGENTS.md` — this file: what the effects are for and the rules they share.
- `gas/` — the gaseous layer: a WebGL2 fluid and particle engine behind one small
  API (`puff`, `stir`, `raise`). See `gas/AGENTS.md`.
- `lens/` — SVG displacement maps that bend the backdrop at the edge of
  `.lens-glass` in Chromium. See `lens/AGENTS.md`.

## 4. Progress

**Done.**

- Gas layer and lens shipped with v5, measured at 60 fps (see `src/AGENTS.md`).

**Not done.**

- No user-facing intensity switch; the tier is chosen from the device.

**Known defects.**

- None known.
