/**
 * gas — the public face of the gaseous layer.
 *
 * Components may call `puff`, `stir` and `raise` at any time. The WebGL
 * engine (engine.js) loads lazily after first paint: puffs requested while
 * it loads are replayed once it is ready; when the layer is off (reduced
 * motion, no WebGL2, no half-float targets) every call does nothing.
 *
 * Intensity follows HarmonyOS' tiers, chosen for the device: `balanced` by
 * default, `weak` on touch or narrow screens (no pointer trail), off under
 * prefers-reduced-motion.
 */

const TIERS = {
  balanced: { sim: 128, dye: 512, splats: 8, particles: 420, intensity: 1, stir: true, scale: 1 },
  weak: { sim: 96, dye: 320, splats: 5, particles: 160, intensity: 0.6, stir: false, scale: 0.75 },
}

/** Tokens in styles/tokens.css; the gas reads its colours from the page. */
const PALETTE_TOKENS = ['--nebula-cyan', '--nebula-blue', '--nebula-violet', '--nebula-magenta']

const LOWER_DELAY = 1400

/** 'pending' until mount settles, then 'ready' or 'off'. */
let status = 'pending'
let engine = null
let canvasEl = null
let pending = []
let lowerTimer = 0

/** The intensity tier for this device, or null when the layer stays off. */
export function gasTier() {
  if (typeof window === 'undefined' || !window.matchMedia) return null
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return 'weak'
  return 'balanced'
}

function readPalette() {
  const style = getComputedStyle(document.documentElement)
  return PALETTE_TOKENS.map((name) => {
    const hex = style.getPropertyValue(name).trim().replace('#', '')
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  })
}

export const gas = {
  /** Starts the engine on `canvas`; resolves to false when the layer stays off. */
  async mount(canvas) {
    const tier = gasTier()
    if (tier) {
      try {
        const { createEngine } = await import('./engine.js')
        engine = createEngine(canvas, TIERS[tier], readPalette())
      } catch {
        engine = null
      }
    }
    status = engine ? 'ready' : 'off'
    if (engine) {
      canvasEl = canvas
      for (const [rect, options] of pending) engine.puff(rect, options)
    }
    pending = []
    return Boolean(engine)
  },

  unmount() {
    engine?.dispose()
    engine = null
    canvasEl = null
    status = 'off'
    clearTimeout(lowerTimer)
  },

  /** Vapour around a viewport rectangle: { mode: 'condense' | 'disperse', dir, strength }. */
  puff(rect, options) {
    if (engine) engine.puff(rect, options)
    else if (status === 'pending' && pending.length < 12) pending.push([rect, options])
  },

  /** The pointer trail; `dx`/`dy` are CSS px moved since the last frame. */
  stir(x, y, dx, dy) {
    engine?.stir(x, y, dx, dy)
  },

  /**
   * Lifts the layer above the dialog scrim (true), or lowers it back behind
   * the page once the vapour of a closing dialog has mostly cleared (false).
   */
  raise(on) {
    clearTimeout(lowerTimer)
    if (!canvasEl) return
    if (on) canvasEl.dataset.raised = ''
    else lowerTimer = setTimeout(() => canvasEl?.removeAttribute('data-raised'), LOWER_DELAY)
  },
}
