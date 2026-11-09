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

**About is one line.** The profile `bios` hold the single sentence Harry chose
for himself; it never lists what he has done, since results and dates belong in
`experience.js` and `projects.js`. Change it only when Harry asks.

**Projects stay in sync** with their intro notes: status, period, links, and
highlights agree in both places.

## 3. Contents

- `AGENTS.md` — this file: where content lives and the rules it follows.
- `site-data.js` — the profile (title, subtitle, bios, focus, meta), the
  contacts with their visible handles, education, and the avatar image set.
- `projects.js` — the ten project case studies; `featured: true` puts a project in
  the Selected group.
- `experience.js` — the three timeline entries of the Experience section.
- `skills.js` — the four skill groups of the Toolkit section.

## 4. Progress

**Done.**

- All prose is bilingual; projects are split into two groups (dsh-assistant,
  dsh-intelligent-ui and ANY Selected; seven more, simple-dock marked deprecated).
- 2026-11-09: the Personal Website entry describes the v6 design; contacts carry a
  `handle` instead of an icon import.
- 2026-11-08 refresh from the GitHub repositories: dsh-assistant (with its
  complete-subagent and im-robot sub-plugins) and dsh-btw added; dsh-intelligent-ui
  brought to v0.1.7; Digit OCR and the Personal Website card rewritten from their
  sources. Test counts are what each suite reports at its tag.
- 2026-11-09: at Harry's request About is one line ("An interesting person" and
  its Chinese counterpart); the note under the focus areas is gone.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
