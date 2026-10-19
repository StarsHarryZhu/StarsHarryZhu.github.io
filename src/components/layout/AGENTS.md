# AGENTS.md

## 1. Role

The frame of the page: everything that stays fixed while the content scrolls. From
back to front: the still deep-space sky, the gas canvas, and the floating top-bar
capsule; the footer closes the content.

## 2. Constraints

**The sky is still.** Only six tiny stars change opacity. No large layer animates
on its own: motion on this page answers the reader through the gas layer.

**Stacking order** comes from the `--z-*` tokens: sky, gas, page, top bar, then the
dialog's scrim, raised gas, and dialog. Do not hard-code z-index values.

**The top bar is information, not navigation**: brand (scrolls to top), status
(hidden below 700 px), language switch. It is a `.lens-glass` capsule with edge
refraction in Chromium.

**The gas canvas** renders only when the layer can run; it mounts the engine after
first paint and removes itself when the engine reports no support.

## 3. Contents

- `AGENTS.md` — this file: what stays on screen and in what order.
- `Sky.vue` — the fixed deep-space ground with the nebula, stars, and grain.
- `GasLayer.vue` — the gas canvas; mounts the engine when idle, raised by the dialog.
- `TopBar.vue` — the floating lens-glass capsule: brand, status, language switch.
- `LanguageToggle.vue` — EN / Chinese with a sliding glass droplet; switching
  releases a puff of vapour.
- `Footer.vue` — the closing brand line.

## 4. Progress

**Done.**

- Capsule top bar with real blur and refraction; still sky; gas canvas behind the
  glass.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
