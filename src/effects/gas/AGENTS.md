# AGENTS.md

## 1. Role

The gaseous layer. One transparent full-viewport canvas between the sky and the
page shows vapour and light particles that answer the reader: vapour gathers
around a panel as it scrolls in, a closing dialog evaporates along the gesture that
closed it with a burst of light motes, a press releases a small puff, and the
pointer leaves a faint glowing trail. Under the glass the vapour shows through the
translucent panels; while the dialog is open the layer rises above the scrim.

## 2. Constraints

**Sleep when idle.** Every splat extends a deadline by the time its dye needs to
fade below one 8-bit step; when the deadline has passed and no particle is left,
the loop stops and every target is cleared. An idle page makes no
`requestAnimationFrame` calls. Never add a loop that runs without input.

**Lazy and isolated.** `engine.js` and `shaders.js` load as their own chunk after
first paint. Components import only `index.js`, which queues puffs while the engine
loads and ignores calls when the layer is off.

**Tiers, chosen for the device.** `balanced` by default; `weak` on coarse pointers
or viewports narrower than 768 px (smaller grids, fewer particles, no pointer
trail); off under `prefers-reduced-motion`. Intensity never scales up past
`balanced`.

**Coordinates are viewport CSS pixels** (the space of `getBoundingClientRect` and
`clientX`/`clientY`); velocities are CSS pixels per second. Scrolling shifts the
field so vapour stays with the panel that made it.

**Colours come from the page.** The palette is read from the `--nebula-*` tokens;
do not hard-code colours here.

**Fail closed.** No WebGL2, an incomplete half-float framebuffer, a shader error, or
a lost context turns the layer off; it never throws into the page.

**Budget.** Velocity grid about 128 cells high, dye about 512, 16 pressure
iterations, at most 420 particles. Re-measure frame rate after raising any of them.

## 3. Contents

- `AGENTS.md` — this file: what the gas layer does and the rules that keep it cheap.
- `index.js` — the public API (`gas.mount`, `unmount`, `puff`, `stir`, `raise`),
  tier selection, palette reading, and the queue used while the engine loads.
- `engine.js` — the WebGL2 stable-fluids solver, the particle pool, the sleeping
  loop, scroll coupling, and the condense / disperse choreography.
- `shaders.js` — the GLSL ES 3.00 sources for every pass and for the particles.

## 4. Progress

**Done.**

- Condense and disperse puffs, pointer trail, press puffs, particle bursts, scroll
  coupling, raise and lower around the dialog, sleep when idle, and clean fallback.
- Measured on Apple M5 (ANGLE Metal): 60 fps steady while scrolling with a moving
  pointer at 1440x1000 at 1x and 2560x1440 at 2x, and through a dialog open and
  close; zero rAF calls once idle.

**Not done.**

- No context-restore handling: after a lost WebGL context the layer stays off until
  the page reloads.

**Known defects.**

- None known.
