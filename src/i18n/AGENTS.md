# AGENTS.md

## 1. Role

The language layer of the page, written in-house with no dependency. It holds the
current locale, the dictionary of interface strings, and the two lookups every
component uses: `t(key)` for interface strings and `pick(node)` for the `{ en, zh }`
prose objects of `src/data`. It also keeps `<html lang>` and the document title in
step with the locale.

## 2. Constraints

**One locale for the whole page.** `locale` is a module-level `ref` shared by every
component; nothing keeps a copy.

**Initial language.** A saved choice in `localStorage` (`site-lang`) wins; otherwise
a browser language starting with `zh` selects Chinese; otherwise English.
`initI18n()` runs in `main.js` before the first render.

**Storage may fail.** Every `localStorage` access is wrapped in `try`/`catch`; the
page works in memory when storage is blocked.

**Complete dictionaries.** Every key exists in both `en` and `zh`. A missing key
falls back to English and warns in development only. No key stays in
`messages.js` once nothing reads it.

**Interface strings only.** `messages.js` holds labels, buttons, and status words.
Prose belongs in `src/data`.

## 3. Contents

- `AGENTS.md` — this file: how languages are chosen, stored, and looked up.
- `index.js` — the locale singleton, `t`, `pick`, `setLocale`, `initI18n`, and the
  `useI18n()` accessor.
- `messages.js` — the English and Chinese interface dictionaries.

## 4. Progress

**Done.**

- English and Chinese, persisted, with `<html lang>` and title kept in sync.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
