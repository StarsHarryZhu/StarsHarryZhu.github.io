import { onMounted, onBeforeUnmount } from 'vue'

/**
 * useParticleField — Canvas 2D luminous "gas mote" particle field.
 *
 * HarmonyOS 气态动效 reinterpreted: soft, airy motes of light that drift like
 * gas through the liquid sky, respond gently to the pointer, and burst outward
 * from interaction points before dissipating. Colored to match the Liquid Sky
 * palette (teal / blue / violet / coral cores on frosted white).
 *
 * Module singleton (mirrors useParallax):
 *   - LiquidSky mounts the field with `useParticleField(getCanvas, opts)`.
 *   - Any component can call `useParticleField()` (no args) to obtain the same
 *     field's `{ burst, setHoverTargets }` controller and trigger reactions.
 *
 * Performance
 *   - Three pre-rendered radial-gradient sprites drawn via drawImage — no
 *     per-particle shadowBlur.
 *   - Connecting lines (off by default) use a uniform spatial hash, batched
 *     into a few alpha buckets.
 *   - Frame-skipped to ~30fps (perf tier ~20fps).
 *   - RAF pauses on `visibilitychange`; freezes to a static frame under
 *     `prefers-reduced-motion` (bursts become no-ops).
 *
 * @param {() => HTMLCanvasElement | null} [getCanvas]  ref accessor. Omitted →
 *        controller mode returning the active field's API (no-op if unmounted).
 * @param {Object} [opts]
 * @param {number} [opts.count=64]             particle count (desktop)
 * @param {number} [opts.connectDistance=0]    px; 0 disables connecting lines
 * @param {number} [opts.pointerStrength=0.1]  pointer attraction factor
 * @param {() => {x:number,y:number} | null} [opts.getPointer]
 *        normalized pointer in [-1, 1]; null disables attraction
 * @returns {{ burst: (x:number,y:number,n?:number)=>void,
 *              setHoverTargets: (t:Array<{x:number,y:number,r:number}>)=>void }}
 */

const MAX_PARTICLES = 90
const BURST_PER_TRIGGER = 9

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
    count = 64,
    connectDistance = 0,
    pointerStrength = 0.1,
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
  let perfTier = false
  let frameInterval = 2
  let frameCount = 0
  let resizeTimer = null
  let onResize = null

  const reduceCount = Math.min(count, 34)

  // AeroGlass palette: bright cores that read as light on the dark theme.
  const SPRITE_COLORS = [
    { core: '125, 244, 232', mid: '125, 244, 232' },   // cyan   #7DF4E8
    { core: '138, 180, 255', mid: '138, 180, 255' },   // sky    #8AB4FF
    { core: '167, 155, 255', mid: '167, 155, 255' },   // violet #A79BFF
    { core: '103, 158, 254', mid: '86, 134, 254' },    // brand  #679EFE→#5686FE
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
      grad.addColorStop(0.3, `rgba(255, 255, 255, 0.5)`)
      grad.addColorStop(0.55, `rgba(${mid}, 0.3)`)
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
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      r: 1.1 + Math.random() * 2.6,
      alpha: 0.28 + Math.random() * 0.45,
      drift: Math.random() * Math.PI * 2,
      hue: (Math.random() * SPRITE_COLORS.length) | 0,
    }
  }

  function frame(time) {
    if (disposed) return
    // Frame-skip: render ~30fps (perf tier ~20fps) instead of full rAF.
    if (frameCount++ % frameInterval !== 0) {
      rafId = requestAnimationFrame(frame)
      return
    }
    ctx.clearRect(0, 0, width, height)

    // Normalized [-1, 1] pointer → canvas pixel coordinates.
    const pointer = getPointer()
    const pointerX = pointer ? (pointer.x * 0.5 + 0.5) * width : null
    const pointerY = pointer ? (pointer.y * 0.5 + 0.5) * height : null

    const targets = hoverTargets

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      // Organic micro-drift (gas-like).
      p.drift += 0.002
      p.vx += Math.sin(p.drift) * 0.0004
      p.vy += Math.cos(p.drift * 1.31) * 0.0004

      // Gentle pointer attraction.
      if (pointerX !== null) {
        const dx = pointerX - p.x
        const dy = pointerY - p.y
        const d2 = dx * dx + dy * dy
        const rad = 160
        if (d2 < rad * rad && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const f = (1 - d / rad) * pointerStrength
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
      }

      // Convergence toward hovered cards (converge-then-dissipate).
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
            const f = (1 - d / target.r) * 0.05
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

      // Burst particles fade fast and expire (dissipate like gas).
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
          ? 0.65 + 0.35 * Math.sin(time * 0.002 + p.drift)
          : p.life
      const s = p.r * 7
      ctx.globalAlpha = Math.max(0, p.alpha * twinkle)
      ctx.drawImage(sprites[p.hue], p.x - s / 2, p.y - s / 2, s, s)
    }
    ctx.globalAlpha = 1

    // Connect near particles with faint constellation lines (opt-in).
    if (connectDistance > 0) {
      const cd = perfTier ? connectDistance * 0.75 : connectDistance
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

      // Batch segments by alpha bucket.
      ctx.lineWidth = 1
      const LINE_ALPHAS = [0.05, 0.035, 0.022, 0.012]
      const segs = [[], [], [], []]
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
                const f = 1 - d / cd
                const bi = Math.min(3, (f * 4) | 0)
                segs[bi].push(a.x, a.y, b.x, b.y)
              }
            }
          }
        }
      }
      for (let b = 0; b < segs.length; b++) {
        const s = segs[b]
        if (!s.length) continue
        ctx.strokeStyle = `hsla(228, 80%, 55%, ${LINE_ALPHAS[b]})`
        ctx.beginPath()
        for (let i = 0; i < s.length; i += 4) {
          ctx.moveTo(s[i], s[i + 1])
          ctx.lineTo(s[i + 2], s[i + 3])
        }
        ctx.stroke()
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
      const speed = 0.5 + Math.random() * 0.7
      particles.push({
        x,
        y,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        r: 1 + Math.random() * 1.8,
        alpha: 0.4 + Math.random() * 0.4,
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
    onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 200) // mobile URL-bar collapse fires resize storms
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    if (typeof window !== 'undefined' && window.matchMedia) {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      // Mirrors the perf-tier media query in global.css / LiquidSky.
      perfTier =
        window.matchMedia('(max-width: 767px)').matches ||
        (window.matchMedia('(hover: none)').matches &&
          window.matchMedia('(pointer: coarse)').matches)
    }
    frameInterval = perfTier ? 3 : 2

    const n = window.innerWidth < 700 ? (perfTier ? 22 : reduceCount) : (perfTier ? 42 : count)
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
    if (onResize) window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibility)
    if (rafId) cancelAnimationFrame(rafId)
  })

  return { burst, setHoverTargets }
}
