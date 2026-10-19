# AGENTS.md

## 1. Role

The page layout. `HomeView.vue` places the sky, the gas canvas, the top-bar
capsule, the hero, and the sections in order, passes each its slice of `src/data`,
mounts the pointer light once for the whole page, and lets new text condense in
after a language switch.

## 2. Constraints

**Section order is fixed**: hero, 01 About, 02 Experience, 03 Projects, 04 Toolkit
beside 05 Education, 06 Contact, footer.

**A thin composition surface.** Layout and wiring only; section markup and logic
live in the components.

**Off-screen sections skip rendering** with `content-visibility: auto`, and each
gets a measured placeholder height so the scrollbar does not jump. Re-measure when
a section's content changes size; the height difference across a full scroll must
stay under 150 px.

## 3. Contents

- `AGENTS.md` — this file: what the layout guarantees.
- `HomeView.vue` — the whole page, section spacing, and placeholder heights.

## 4. Progress

**Done.**

- Placeholder heights re-measured at 1440 px for eight projects (422, 774, 1776,
  448, 282, 117); a full scroll changes the page height by about 100 px.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
