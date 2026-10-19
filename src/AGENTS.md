# AGENTS.md

## 1. Role

The application source: a Vue 3 single-page app built by Vite. `main.js` loads the
global styles, sets the language, and mounts `App.vue`, which renders
`views/HomeView.vue`. The view assembles the components in `components/`, feeding
them content from `data/` and strings from `i18n/`; `composables/` and `effects/`
supply the motion, light, and vapour; `styles/` holds the shared design system.

## 2. Constraints

**Vue 3 with `<script setup>` and plain JavaScript.** No UI framework, no CSS
preprocessor, no TypeScript, no router (one page). Imports use the `@` alias.

**Content and presentation stay apart.** Components take content as props from
`data/` and strings from `i18n/`.

**Measured performance rules.** These hold for every folder below; each was
measured, and the numbers are in Progress:

- animate only `transform` and `opacity`; never `scale` a large layer, never
  animate a full-screen layer, no `will-change` on a large static layer;
- panels that scroll never use `backdrop-filter`; only the top-bar capsule and the
  open case dialog sample their backdrop;
- no resting `filter: blur`; the hero's one-shot condense is the only blur
  transition outside the dialog's open and close;
- one canvas at most: the event-driven gas layer, which sleeps when idle;
- off-screen sections skip rendering with measured placeholder heights.

**Comments follow the surrounding file.**

## 3. Contents

- `AGENTS.md` — this file: how the source is organised and the measured rules.
- `main.js` — entry: fonts, the four global stylesheets, `initI18n()`, mount.
- `App.vue` — the root component; renders the page view.
- `views/` — the page layout.
- `components/` — layout frame, shared pieces, and the sections.
- `composables/` — condense-on-scroll and pointer light.
- `effects/` — the gas layer and the lens refraction.
- `styles/` — tokens, base, liquid glass, condense motion.
- `data/` — all content, bilingual.
- `i18n/` — the locale, interface strings, and lookups.
- `assets/` — fonts and images.

## 4. Progress

**Done.**

- v5 (2026-10-19): liquid glass and gaseous motion after HarmonyOS "immersive
  light"; router removed; components regrouped; styles split.
- v5 measured on Apple M5 with ANGLE Metal, programmatic scroll for 2.5 s, three
  runs each: 1440x1000 at 1x and 2560x1440 at 2x both hold 60 fps steady, with and
  without a moving pointer (p95 frame 16.8 ms, no frame over 25 ms after the first
  cold run); a dialog open and close holds 60 fps; the gas layer makes zero rAF
  calls once idle.
- Measured costs behind the rules (v4): `scale` on a large gradient layer cost
  40 to 57 fps; animating full-screen aurora layers cost 17 to 47 fps; `will-change`
  on a large static layer cost 17 to 34 fps; a sheen sweep cost about 5 fps;
  `backdrop-filter` on scrolling panels over an animated background re-sampled
  every frame and multiplied on Retina.
- Build: CSS about 35 KB, page JS about 58 KB, Vue about 71 KB, and the lazy gas
  engine about 14 KB (raw, before gzip).

**Not done.**

- No light theme.

**Known defects.**

- None known.
