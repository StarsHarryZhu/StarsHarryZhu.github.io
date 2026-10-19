# AGENTS.md

## 1. Role

The content of the page, in reading order: the hero, then 01 About, 02 Experience,
03 Projects, 04 Toolkit, 05 Education, and 06 Contact. Projects owns its cards and
the case-study dialog that a card opens.

## 2. Constraints

**Layout and content are fixed.** The order, the two project tiers (featured wide
cards, then a two-column grid), and the fields shown come from `src/data`; a visual
change must not move or drop content.

**Panels are `.glass` and condense with vapour** (`useCondense({ vapor: true })`).
Hero elements condense with `.condense--vapor`, and only the title calls the gas.

**The case dialog** keeps `role="dialog"` and `aria-modal`, is titled with the
project name, takes focus on its container (the focus ring appears only when Tab
reaches the close button), returns focus to the button that opened it, locks page
scrolling while open, and closes with its button, Escape, or a click outside. It
has no hover effect. It is built from two fixed siblings, a scrim and a layer, so
the gas can rise between them; it condenses out of vapour on open and evaporates
along the closing gesture.

**Opening a case never changes the card's height.**

## 3. Contents

- `AGENTS.md` — this file: what the sections are and what they must keep.
- `Hero.vue` — introduction: kicker, avatar ring, title, role, bio, focus, byline.
- `About.vue` — 01: bios, social links, focus areas, note.
- `Experience.vue` — 02: the timeline.
- `Projects.vue` — 03: featured and other projects, and the dialog state.
- `ProjectCard.vue` — one project card with its case-study button.
- `ProjectCaseModal.vue` — the case-study dialog: lens glass, focus, scroll lock, vapour.
- `ProjectDetails.vue` — the dialog body: stack, highlights, note, install, links.
- `Toolkit.vue` — 04: skill groups; chips rise in once the panel condenses.
- `Education.vue` — 05: education entries.
- `Contact.vue` — 06: contact links.

## 4. Progress

**Done.**

- Eight projects (two featured), three experience entries, twenty skills.
- Dialog checks pass: height, roles, title, focus in and out, scroll lock, all three
  ways to close, and gas raised and lowered.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
