import { onMounted, onBeforeUnmount } from 'vue'

/**
 * useParticleField — Canvas 2D luminous "firefly / constellation" particle field.
 *
 * HarmonyOS 灵动粒子 reinterpreted: soft glowing particles that twinkle, drift,
 * respond to the pointer, converge toward hovered cards, and burst outward from
 * interaction points (click / tap) before dissipating like embers.
 *
 * Module singleton (mirrors useParallax):
 *   - StarfieldBackground mounts the field with `useParticleField(getCanvas, opts)`.
 *   - Any component can call `useParticleField()` (no args) to obtain the same
 *     field's `{ burst, setHoverTargets }` controller and trigger reactions.
 *
 * Performance
 *   - Three pre-rendered radial-gradient sprites (cyan/blue/violet) drawn via
 *     drawImage — no per-particle shadowBlur.
 *   - Connecting lines use a uniform spatial hash (O(n) per frame).
 *   - Particle count auto-reduces on narrow viewports; bursts capped.
 *   - RAF pauses on `visibilitychange`; freezes to a static frame under
 *     `prefers-reduced-motion` (bursts become no-ops).
 *
 * @param {() => HTMLCanvasElement | null} [getCanvas]  ref accessor. Omitted →
 *        controller mode returning the active field's API (no-op if unmounted).
 * @param {Object} [opts]
 * @param {number} [opts.count=150]            particle count (desktop)
 * @param {number} [opts.connectDistance=120]  px; 0 disables connecting lines
 * @param {number} [opts.pointerStrength=0.14] pointer attraction factor
 * @param {() => {x:number,y:number} | null} [opts.getPointer]
 *        normalized pointer in [-1, 1]; null disables attraction
 * @returns {{ burst: (x:number,y:number,n?:number)=>void,
 *              setHoverTargets: (t:Array<{x:number,y:number,r:number}>)=>void }}
 */

const MAX_PARTICLES = 180
const BURST_PER_TRIGGER = 10

// Active field API, so controller-mode callers share one field.
let activeField = null

export function useParticleField(getCanvas, opts = {}) {
  // ---- Controller mode: return the mounted field's API (no-op if none). ----
  if (typeof getCanvas !== 'function') {
    return {
      burst: (x, y, n) => activeField?.burst?.(x, y, n),
      setHoverTargets: (targets) => activeField?.setHoverTargets?.(targets),
    }
  }

  const {
    count = 150,
    connectDistance = 120,
    pointerStrength = 0.14,
    getPointer = () => null,
  } = opts

  let canvas = null
  let ctx = null
  let rafId = null
  let disposed = false
  let width = 0
  let height = 0
  let particles = []
  let sprites = []
  let reduced = false
  let hoverTargets = []

  const reduceCount = Math.min(count, 46)

  const SPRITE_COLORS = [
    { core: '125, 244, 232', mid: '125, 244, 232' }, // cyan  #7DF4E8
    { core: '111, 168, 255', mid: '111, 168, 255' }, // blue  #6FA8FF
    { core: '155, 139, 255', mid: '155, 139, 255' }, // violet #9B8BFF
  ]

  function makeSprites() {
    const size = 28
    return SPRITE_COLORS.map(({ core, mid }) => {
      const c = document.createElement('canvas')
      c.width = size
      c.height = size
      const g = c.getContext('2d')
      const grad = g.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2,
      )
      grad.addColorStop(0, `rgba(${core}, 0.95)`)
      grad.addColorStop(0.35, `rgba(${mid}, 0.35)`)
      grad.addColorStop(1, `rgba(${core}, 0)`)
      g.fillStyle = grad
      g.fillRect(0, 0, size, size)
      return c
    })
  }

  function resize() {
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = rect.width
    height = rect.height
    canvas.width = Math.max(1, Math.round(width * dpr))
    canvas.height = Math.max(1, Math.round(height * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function spawn(initial = false) {
    return {
      x: initial ? Math.random() * width : width / 2,
      y: initial ? Math.random() * height : height / 2,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      r: 0.7 + Math.random() * 2.2,
      alpha: 0.3 + Math.random() * 0.55,
      drift: Math.random() * Math.PI * 2,
      hue: (Math.random() * SPRITE_COLORS.length) | 0,
    }
  }

  function frame(time) {
    if (disposed) return
    ctx.clearRect(0, 0, width, height)

    // Normalized [-1, 1] pointer → canvas pixel coordinates.
    const pointer = getPointer()
    const pointerX = pointer ? (pointer.x * 0.5 + 0.5) * width : null
    const pointerY = pointer ? (pointer.y * 0.5 + 0.5) * height : null

    const targets = hoverTargets

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      // Organic micro-drift.
      p.drift += 0.002
      p.vx += Math.sin(p.drift) * 0.0006
      p.vy += Math.cos(p.drift * 1.31) * 0.0006

      // Gentle pointer attraction.
      if (pointerX !== null) {
        const dx = pointerX - p.x
        const dy = pointerY - p.y
        const d2 = dx * dx + dy * dy
        const rad = 170
        if (d2 < rad * rad && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const f = (1 - d / rad) * pointerStrength
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
      }

      // Convergence toward hovered cards (converge-then-dissipate like embers).
      for (let t = 0; t < targets.length; t++) {
        const target = targets[t]
        const dx = target.x - p.x
        const dy = target.y - p.y
        const d2 = dx * dx + dy * dy
        if (d2 < target.r * target.r && d2 > 0.01) {
          const d = Math.sqrt(d2)
          if (d < 26) {
            p.vx += (Math.random() - 0.5) * 0.02
            p.vy += (Math.random() - 0.5) * 0.02
          } else {
            const f = (1 - d / target.r) * 0.06
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
        }
      }

      // Damping lets particles settle back after being pushed.
      p.vx *= 0.97
      p.vy *= 0.97
      p.x += p.vx
      p.y += p.vy

      // Burst particles fade fast and expire (dissipate like smoke).
      if (p.life !== undefined) {
        p.life -= 0.04
        if (p.life <= 0) {
          particles.splice(i, 1)
          i--
          continue
        }
      } else {
        // Base particles wrap around edges.
        if (p.x < -16) p.x = width + 16
        if (p.x > width + 16) p.x = -16
        if (p.y < -16) p.y = height + 16
        if (p.y > height + 16) p.y = -16
      }

      // Twinkle base particles; burst particles fade with life.
      const twinkle =
        p.life === undefined
          ? 0.6 + 0.4 * Math.sin(time * 0.002 + p.drift)
          : p.life
      const s = p.r * 7
      ctx.globalAlpha = Math.max(0, p.alpha * twinkle)
      ctx.drawImage(sprites[p.hue], p.x - s / 2, p.y - s / 2, s, s)
    }
    ctx.globalAlpha = 1

    // Connect near particles with faint constellation lines.
    if (connectDistance > 0) {
      const cd = connectDistance
      const cols = Math.max(1, Math.ceil(width / cd))
      const buckets = new Map()

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const key = Math.floor(p.x / cd) + Math.floor(p.y / cd) * (cols + 2)
        let list = buckets.get(key)
        if (!list) {
          list = []
          buckets.set(key, list)
        }
        list.push(i)
      }

      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        const cx = Math.floor(a.x / cd)
        const cy = Math.floor(a.y / cd)

        for (let gx = -1; gx <= 1; gx++) {
          for (let gy = -1; gy <= 1; gy++) {
            const list = buckets.get(cx + gx + (cy + gy) * (cols + 2))
            if (!list) continue
            for (let k = 0; k < list.length; k++) {
              const j = list[k]
              if (j <= i) continue
              const b = particles[j]
              const dx = a.x - b.x
              const dy = a.y - b.y
              const d2 = dx * dx + dy * dy
              if (d2 < cd * cd) {
                const d = Math.sqrt(d2)
                ctx.strokeStyle = `hsla(210, 85%, 75%, ${(1 - d / cd) * 0.05})`
                ctx.beginPath()
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
                ctx.stroke()
              }
            }
          }
        }
      }
    }

    rafId = requestAnimationFrame(frame)
  }

  function drawStatic() {
    ctx.clearRect(0, 0, width, height)
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      const s = p.r * 7
      ctx.globalAlpha = p.alpha
      ctx.drawImage(sprites[p.hue], p.x - s / 2, p.y - s / 2, s, s)
    }
    ctx.globalAlpha = 1
  }

  function startLoop() {
    if (rafId !== null || reduced || disposed) return
    rafId = requestAnimationFrame(frame)
  }

  function onVisibility() {
    if (document.hidden) {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    } else {
      startLoop()
    }
  }

  /** Burst `n` particles at viewport (canvas CSS) coords, then dissipate. */
  function burst(x, y, n = BURST_PER_TRIGGER) {
    if (reduced || disposed || !ctx) return
    const spawned = Math.min(n, 12)
    for (let i = 0; i < spawned; i++) {
      if (particles.length >= MAX_PARTICLES) break
      const ang = Math.random() * Math.PI * 2
      const speed = 0.6 + Math.random() * 0.8
      particles.push({
        x,
        y,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        r: 0.7 + Math.random() * 1.6,
        alpha: 0.5 + Math.random() * 0.4,
        drift: Math.random() * Math.PI * 2,
        hue: (Math.random() * SPRITE_COLORS.length) | 0,
        life: 1,
      })
    }
    startLoop()
  }

  /** Replace the set of active hover targets (card centers + radius in px). */
  function setHoverTargets(targets) {
    hoverTargets = Array.isArray(targets) ? targets : []
  }

  onMounted(() => {
    canvas = getCanvas()
    if (!canvas) return
    ctx = canvas.getContext('2d')
    if (!ctx) return

    sprites = makeSprites()
    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    if (typeof window !== 'undefined' && window.matchMedia) {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }

    const n = window.innerWidth < 700 ? reduceCount : count
    particles = Array.from({ length: n }, () => spawn(true))

    activeField = { burst, setHoverTargets }

    if (reduced) {
      drawStatic()
      return // freeze on static frame — no RAF loop, bursts are no-ops
    }
    rafId = requestAnimationFrame(frame)
  })

  onBeforeUnmount(() => {
    disposed = true
    // Only this field is ever mounted in the SPA, so clear the singleton.
    activeField = null
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', onVisibility)
    if (rafId) cancelAnimationFrame(rafId)
  })

  return { burst, setHoverTargets }
}
