# AGENTS.md

## 1. Role

Everything the page says about Harry, kept apart from how it is shown. Components
receive these objects as props and never hold prose of their own, so a change of
wording is a change in this folder alone. The data is split by responsibility: the
profile and contacts, the projects, the experience timeline, and the skills.

## 2. Constraints

**Bilingual prose.** Every sentence a reader sees is a `{ en, zh }` object read
through `pick()` from `src/i18n`. Names of institutions, projects, technologies,
and link labels are plain strings and are not translated.

**True and sourced.** Each claim comes from the project's repository, an intro
note in `projects/` at the repository root, the resume, or Harry. A `period` is set
only when a source records it. `links` hold only URLs that exist; a project without
a public repository has none. Never add a phone number.

**Stable shapes.** Components rely on these fields. A project has `id`, `name`,
`featured`, `status` (`'published' | 'in-progress' | 'paused' | 'deprecated' |
null`), `period`, `tagline`, `stack`, `highlights`, `note`, `links`, and `install`.
Adding a field means updating the components that read it in the same change.

**Projects stay in sync** with their intro notes: status, period, links, and
highlights agree in both places.

## 3. Contents

- `AGENTS.md` — this file: where content lives and the rules it follows.
- `site-data.js` — the profile (title, subtitle, bios, focus, note, meta), the
  contacts with their icons, education, and the avatar image set.
- `projects.js` — the eight project case studies; `featured: true` marks the wide
  cards of the first tier.
- `experience.js` — the three timeline entries of the Experience section.
- `skills.js` — the four skill groups of the Toolkit section.

## 4. Progress

**Done.**

- All prose is bilingual; projects are split into two tiers (Digit OCR and ANY
  featured; six more in the grid, simple-dock marked deprecated).
- dsh-intelligent-ui added with its intro note; TypeScript added to the languages.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
