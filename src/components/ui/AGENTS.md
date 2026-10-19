# AGENTS.md

## 1. Role

Small presentational pieces that several sections share. They take a value and draw
it; they hold no state and call no effect.

## 2. Constraints

**Stateless.** Props in, markup out; no events, no effects, no data imports.

**Shared look only.** A piece belongs here when at least two sections use it;
otherwise it stays in its section.

## 3. Contents

- `AGENTS.md` — this file: what a shared piece is.
- `SectionHeader.vue` — the numbered section title with its hairline; condenses once.
- `StatusBadge.vue` — a project's status pill: published, in progress, paused, or
  deprecated.

## 4. Progress

**Done.**

- Both pieces restyled for v5.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
