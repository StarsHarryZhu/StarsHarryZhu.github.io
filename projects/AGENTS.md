# AGENTS.md

## 1. Role

The source notes behind the Projects section. Each file is a short Chinese
introduction to one project Harry has built: what it is in one line, its stack,
what it can do, and where it stands. `src/data/projects.js` turns these notes into
the bilingual case studies the page shows, so this folder is where a project's
facts are checked before they reach the site.

The folder is not bundled or deployed; it exists for the people and agents who edit
the site.

## 2. Constraints

**One project, one file**, named `<name>_intro.md` in lower-case kebab case.

**Fixed outline.** A title line with the project name and a one-line positioning,
then the stack, the main capabilities or highlights, and the current state with the
source location.

**Written in Chinese.** These notes are the one place in the repository written in
Chinese prose; this `AGENTS.md` stays English.

**In sync with the site.** Adding or changing a file here goes with the matching
entry in `src/data/projects.js` in the same change: status, period, links, and
highlights must agree. A project marked deprecated or paused here is marked the
same way there.

**Only sourced facts.** Every statement comes from the project's own repository,
its documentation, or Harry. No guessed dates or numbers.

## 3. Contents

- `AGENTS.md` — this file: what an intro note is and how it stays in sync.
- `any_intro.md` — ANY, a terminal multi-turn LLM REPL behind one protocol seam.
- `browser-use_intro.md` — browser-use, a DeepSeek Harness browser-automation plugin (paused).
- `digit-ocr_intro.md` — Digit OCR, an MLP and a CNN written from scratch in C++17.
- `dsh-assistant_intro.md` — dsh-assistant, a parent-and-worker agent with two sub-plugins.
- `dsh-btw_intro.md` — dsh-btw, side questions in a DeepSeek Harness chat.
- `dsh-intelligent-ui_intro.md` — dsh-intelligent-ui, interactive answer cards for DeepSeek Harness.
- `personal-website_intro.md` — this portfolio site.
- `simple-dock_intro.md` — simple-dock, a DeepSeek Harness composer stats dock (deprecated).

## 4. Progress

**Done.**

- Notes for eight of the ten projects, each matched by an entry in
  `src/data/projects.js`. Test counts in the notes are what each suite reports at
  its tagged version.

**Not done.**

- Echoes and VEX Control Libs predate the convention and have no note here; their
  case studies rest on the resume. Add a note when one of them next changes.

**Known defects.**

- Digit OCR's period on the site (Nov–Dec 2025) disagrees with its git history
  (commits from 2026-04-30 to 2026-05-05); waiting for Harry to confirm the source.
