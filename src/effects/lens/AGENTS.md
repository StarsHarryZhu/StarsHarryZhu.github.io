# AGENTS.md

## 1. Role

Edge refraction for the two `.lens-glass` surfaces, the top-bar capsule and the
case dialog. A real glass slab bends what lies behind its rim; Chromium can run an
SVG filter inside `backdrop-filter`, so this module builds a displacement map shaped
like the surface's rounded outline and installs it as a filter that the surface's
`backdrop-filter` applies before its blur.

## 2. Constraints

**Chromium only, detected, never assumed.** Refraction is enabled only when
`navigator.userAgentData` lists Chromium, and only then is `html.lg-refract` set.
Safari and Firefox keep plain blur; the CSS falls back cleanly when `--lens` is unset.

**Follow the element's size.** A `ResizeObserver` rebuilds the map when the surface
changes size; the map is drawn at half resolution because it is smooth.

**Sample inward.** Near the rim the backdrop is read from further inside the slab,
never from outside the element, so no transparent edge appears.

**`color-interpolation-filters="sRGB"`** on every filter, or the neutral grey of the
map shifts and the whole surface moves.

**Clean up.** `attachLens` returns a function that disconnects the observer and
removes the filter; callers run it on unmount or when the dialog has closed.

## 3. Contents

- `AGENTS.md` — this file: how the refraction works and when it is on.
- `index.js` — `refractionSupported()` and `attachLens(el, { id, bezel, scale })`,
  plus the displacement-map builder.

## 4. Progress

**Done.**

- Refraction on the top-bar capsule and the case dialog in Chromium; both keep
  60 fps in measurement.

**Not done.**

- Safari has no equivalent; it shows blur only.

**Known defects.**

- None known.
