# AGENTS.md

## 1. Role

The parts the page is built from, grouped by what they are: the frame that stays on
screen (`layout/`), the small pieces shared across sections (`ui/`), and the hero
and the numbered sections with their project cards and case dialog (`sections/`).
`src/views/HomeView.vue` assembles them.

## 2. Constraints

**Props in, events out.** Content arrives as props from `src/data`; strings come
from `src/i18n`. A component emits events rather than reaching into its parent, and
holds no prose of its own.

**SFC order** is `<script setup>`, then `<template>`, then `<style scoped>`. Scoped
styles use class selectors; anything shared belongs in `src/styles`.

**Liquid glass by class.** A panel that scrolls with the page is `.glass`; it gets
the rim, the pointer light, and the halo pull from `src/styles/glass.css`. Only the
top-bar capsule and the case dialog are `.lens-glass`.

**Entrances condense once** through `useCondense`; glass panels pass
`vapor: true` so the gas layer gathers around them.

**Interaction budget.** Scroll-in condensing, the case dialog, the language switch,
and outbound links. Light and vapour that answer the pointer are feedback, not new
functions. The top bar has no navigation; the hero has no buttons.

## 3. Contents

- `AGENTS.md` — this file: how components are grouped and the rules they share.
- `layout/` — the sky, the gas canvas, the top-bar capsule with its language
  switch, and the footer. See `layout/AGENTS.md`.
- `ui/` — the section header and the status badge. See `ui/AGENTS.md`.
- `sections/` — the hero, sections 01 to 06, the project card, the case dialog, and
  its body. See `sections/AGENTS.md`.

## 4. Progress

**Done.**

- v5: components regrouped, restyled in liquid glass, wired to the gas layer.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
