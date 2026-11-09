# AGENTS.md

## 1. Role

The parts the page is built from, grouped by what they are: the frame of the page
(`layout/`), the small pieces shared across sections (`ui/`), and the six sections
with their project rows (`sections/`). `src/views/HomeView.vue` assembles them.

## 2. Constraints

**Props in, events out.** Content arrives as props from `src/data`; strings come
from `src/i18n`. A component emits events rather than reaching into its parent, and
holds no prose of its own.

**SFC order** is `<script setup>`, then `<template>`, then `<style scoped>`. Scoped
styles use class selectors and tokens; anything shared belongs in `src/styles`.

**Minimal surfaces.** No boxes around sections: a section is a caption and its
content. Hairlines (`--line`) and the hover tint (`--bg-hover`) are the only
surfaces; the accent marks links, the current nav item, and live status only.

**Accessible by default.** Each section is labelled by its heading; the project
row is a disclosure button (`aria-expanded`, `aria-controls`) and its closed
details are `inert`; icon-only links carry an `aria-label`.

## 3. Contents

- `AGENTS.md` — this file: how components are grouped and the rules they share.
- `layout/` — the sidebar, the language switch, and the footer. See
  `layout/AGENTS.md`.
- `ui/` — the section header, the status badge, and the contact icons. See
  `ui/AGENTS.md`.
- `sections/` — the six sections, the project row, and its details. See
  `sections/AGENTS.md`.

## 4. Progress

**Done.**

- v6: rewritten for the minimal dark design; the sky, gas canvas, top bar, hero,
  project cards, and case dialog are gone.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
