# AGENTS.md

## 1. Role

Reusable component logic that is not itself a component. Today that is one piece:
the scroll spy that tells the sidebar nav which section the reader is in.

## 2. Constraints

**One concern per file**, named `useX.js`, exporting one function.

**Clean up.** Listeners are added on mount and removed before unmount, and a
pending animation frame is cancelled.

**Read once per frame.** Scroll and resize schedule at most one measurement per
animation frame; a measurement only reads layout and sets a ref.

## 3. Contents

- `AGENTS.md` — this file: what belongs among the composables.
- `useScrollSpy.js` — the current section from a reading line 35% down the
  viewport, the last section at the page end, and a hold after a nav click that
  the reader's next scroll input releases.

## 4. Progress

**Done.**

- v6 scroll spy; the condense observer and the pointer light were removed with
  the v5 design.

**Not done.**

- Nothing pending.

**Known defects.**

- None known.
