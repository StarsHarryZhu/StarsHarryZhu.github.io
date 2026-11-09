# AGENTS.md

## 1. Role

The content column of the page, in reading order: About, Experience, Projects,
Toolkit, Education, and Contact. Projects owns its rows and the details each row
opens in place.

## 2. Constraints

**Each section is a `<section>`** whose `id` matches its nav entry and whose
`aria-labelledby` points at its `SectionHeader`. The ids are listed once, in
`HomeView.vue`.

**Dates sit in a left column** of the same width in Experience, Toolkit, and
Education, and stack above the text below 560 px.

**A project row is a disclosure.** The whole summary (name, period, tagline,
status, stack) is one button with `aria-expanded` and `aria-controls`; the details
are a `region` labelled by that button and `inert` while closed. Rows open
independently. Opening grows the row through `grid-template-rows` from `0fr` to
`1fr`; the plus turns into a cross with one rotation. `featured` sorts a project
into Selected, otherwise More, keeping array order.

## 3. Contents

- `AGENTS.md` — this file: what the sections are and what they must keep.
- `About.vue` — the one-line bio and the focus areas.
- `Experience.vue` — the roles: period, title, organisation, points, tags.
- `Projects.vue` — the Selected and More groups of project rows.
- `ProjectRow.vue` — one project: the summary button and its in-place details.
- `ProjectDetails.vue` — highlights, note, install command, and links.
- `Toolkit.vue` — skill groups, one line each.
- `Education.vue` — education entries.
- `Contact.vue` — the closing invitation and one line per contact channel.

## 4. Progress

**Done.**

- v6: ten projects (three Selected), three experience entries, twenty skills;
  rows open with mouse, Enter, and Space, and closed details take no focus.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
