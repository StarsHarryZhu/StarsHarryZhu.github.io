# AGENTS.md

## 1. Role

The application source: a Vue 3 single-page app built by Vite. `main.js` loads the
fonts and the two global stylesheets, sets the language, and mounts `App.vue`,
which renders `views/HomeView.vue`. The view lays out the sidebar and the sections
from `components/`, feeding them content from `data/` and strings from `i18n/`;
`composables/` tracks the section in view; `styles/` holds the shared design system.

## 2. Constraints

**Vue 3 with `<script setup>` and plain JavaScript.** No UI framework, no CSS
preprocessor, no TypeScript, no router (one page). Imports use the `@` alias.

**Content and presentation stay apart.** Components take content as props from
`data/` and strings from `i18n/`.

**Light by design.** No canvas, WebGL, `backdrop-filter`, `filter`, shadows, or
gradients anywhere below. Per-frame work is limited to reading section positions
while the page scrolls (one batch per animation frame) and compositor-only
transitions.

**Comments follow the surrounding file.**

## 3. Contents

- `AGENTS.md` — this file: how the source is organised and its rules.
- `main.js` — entry: fonts, the two global stylesheets, `initI18n()`, mount.
- `App.vue` — the root component; renders the page view.
- `views/` — the page layout.
- `components/` — the sidebar, the sections, and the shared pieces.
- `composables/` — the scroll spy for the sidebar nav.
- `styles/` — tokens and base styles.
- `data/` — all content, bilingual.
- `i18n/` — the locale, interface strings, and lookups.
- `assets/` — fonts and the avatar.

## 4. Progress

**Done.**

- v6 (2026-11-09): minimal dark rewrite. `effects/` (gas layer, lens refraction),
  the pointer light, the condense motion, the glass and motion stylesheets, and the
  per-section `content-visibility` placeholders were removed.
- Build after v6: CSS about 13 KB, page JS about 45 KB, Vue about 60 KB (raw,
  before gzip); no lazy chunks.
- History (v4 and v5 measurements, kept because they explain the motion rules):
  `scale` on a large gradient layer cost 40 to 57 fps; full-screen animated layers
  cost 17 to 47 fps; `backdrop-filter` on scrolling panels multiplied on Retina.

**Not done.**

- Dark only; no light theme.

**Known defects.**

- None known.
