# AGENTS.md

## 1. Role

The frame of the page: the sidebar that introduces Harry and carries the section
nav, the language switch inside it, and the footer that closes the content column.

## 2. Constraints

**The sidebar is sticky only on wide screens** (1024 px and up), where it fills
the viewport height: identity at the top, contacts and language at the bottom.
Below that it is the static head of the single column and the nav is hidden.

**The nav is anchors plus a scroll spy.** Links are plain `#id` anchors; the
current section comes from `useScrollSpy` in `HomeView.vue` and is marked with
`aria-current` and the accent. A click emits `navigate` so the view can hold the
target as current while the smooth scroll runs. The line and label move with
`transform` only.

**The language switch is two text buttons** with `aria-pressed`; it calls
`setLocale` and does nothing else.

## 3. Contents

- `AGENTS.md` — this file: the frame of the page and its rules.
- `Sidebar.vue` — avatar, name, role, status, section nav, contact icons, language.
- `LanguageToggle.vue` — English and Chinese as two text buttons.
- `Footer.vue` — the closing line: year, name, and how the site is built.

## 4. Progress

**Done.**

- v6 sidebar and footer; the top bar, the sky, and the gas canvas were removed.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
