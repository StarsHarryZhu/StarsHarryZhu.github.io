# AGENTS.md

## 1. Role

The page layout. `HomeView.vue` places the sidebar beside the content column,
passes each section its slice of `src/data`, owns the list of section ids and the
scroll spy that drives the nav, and fades new text in after a language switch.

## 2. Constraints

**Section order is fixed** and written once, in `SECTIONS`: About, Experience,
Projects, Toolkit, Education, Contact; the footer closes the column.

**A thin composition surface.** Layout and wiring only; section markup and logic
live in the components.

**Two columns from 1024 px**, a 320 px sidebar and a content column of at most
640 px; one column below, capped at the content width. A skip link reaches the
content first by keyboard.

## 3. Contents

- `AGENTS.md` — this file: what the layout guarantees.
- `HomeView.vue` — the whole page: columns, section order and spacing, the scroll
  spy, and the language fade.

## 4. Progress

**Done.**

- v6 two-column layout; the `content-visibility` placeholders were dropped, so no
  section heights need re-measuring.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
