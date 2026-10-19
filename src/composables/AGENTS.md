# AGENTS.md

## 1. Role

Reusable component logic that is not itself a component: how elements condense
into place when they first scroll in, and how the page answers the pointer with
light and vapour.

## 2. Constraints

**One concern per file**, named `useX.js`, exporting one function.

**Clean up.** Observers and listeners are created on mount and removed before
unmount.

**Batch the pointer.** Pointer work runs at most once per animation frame: read
every rect first, then write custom properties; never read layout after writing.

**Respect the device.** Under `prefers-reduced-motion` elements appear at once and
the pointer light is off; on touch only presses answer.

## 3. Contents

- `AGENTS.md` — this file: what belongs among the composables.
- `useCondense.js` — IntersectionObserver that adds `.is-condensed` once per element
  and, with `vapor: true`, asks the gas layer to gather around it.
- `usePointerLight.js` — mounted once by the page: pointer light inside glass
  panels, halo pull within 160 px, the gas trail, and press puffs.

## 4. Progress

**Done.**

- Condense with vapour; pointer light, halo pull, trail, and press feedback.

**Not done.**

- Panels mounted after the page (none today) are not picked up by the pointer light.

**Known defects.**

- None known.
