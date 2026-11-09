# AGENTS.md

## 1. Role

Small presentational pieces that take a value and draw it: the section caption, a
project's status, and the contact icons. They hold no state.

## 2. Constraints

**Stateless.** Props in, markup out; no events, no data imports.

**Inside the palette.** Status uses the accent for live work and grey for stopped
work, a ring instead of a dot for unfinished states. Icons are single-colour SVG
drawn in `currentColor`; copy icon paths from a known source, never retype them.

## 3. Contents

- `AGENTS.md` — this file: what a shared piece is.
- `SectionHeader.vue` — the small monospace section caption; sticky on one column.
- `StatusBadge.vue` — a project's status: published, in progress, paused, or deprecated.
- `ContactIcon.vue` — the GitHub, LinkedIn, and mail icons, chosen by contact key.

## 4. Progress

**Done.**

- v6 pieces; contact icons are inline SVG instead of image files.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
