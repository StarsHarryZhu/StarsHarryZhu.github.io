import { shallowRef, onBeforeUnmount } from 'vue'

/**
 * useSpring — Spring physics engine (damped harmonic oscillator).
 *
 * Inspired by HarmonyOS `springMotion(response, dampingFraction)`:
 *   a = -(k·x + c·v) / m
 *   k = (2π / response)² · mass
 *   c = 4π · dampingFraction · mass / response
 *
 * Parameters
 *   response (s)         — natural vibration period. Smaller = stiffer/faster.
 *                         0.55 (default) gentle; 0.15 snappy; 3.0 breathing.
 *   dampingFraction      — 0 undamped · <1 underdamped (overshoots) · 1 critical · >1 overdamped.
 *                         0.825 (default) is HarmonyOS's default; 0.86 for gestures.
 *
 * Motion is driven by requestAnimationFrame and writes to a reactive `current`
 * ref, so consumers can watch it and apply to transform/opacity/custom props.
 *
 * Usage:
 *   const glow = useSpring(0, { response: 3, dampingFraction: 0.9 })
 *   glow.to(1)                                    // animate toward 1
 *   watch(glow.current, v => el.style.opacity = v)
 *
 * Respects `prefers-reduced-motion`: with it on, `.to()` jumps instantly.
 */
export function useSpring(targetValue = 0, config = {}) {
  const {
    response = 0.55,
    dampingFraction = 0.825,
    mass = 1,
  } = config

  const safeMass = mass > 0 ? mass : 1
  const stiffness = Math.pow((2 * Math.PI) / response, 2) * safeMass
  const damping = (4 * Math.PI * dampingFraction * safeMass) / response

  const current = shallowRef(targetValue)
  let target = targetValue
  let velocity = 0
  let rafId = null
  let lastTime = null
  let disposed = false
  let reduced = false

  if (typeof window !== 'undefined' && window.matchMedia) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced = mq.matches
    mq.addEventListener?.('change', (e) => {
      reduced = e.matches
      if (reduced) set(target)
    })
  }

  function step(time) {
    if (disposed) return
    if (lastTime === null) lastTime = time
    const dt = Math.min((time - lastTime) / 1000, 1 / 20)
    lastTime = time

    const x = current.value - target
    const a = -stiffness * x - damping * velocity
    velocity += a * dt
    current.value += velocity * dt

    if (Math.abs(x) < 0.0005 && Math.abs(velocity) < 0.0005) {
      current.value = target
      velocity = 0
      rafId = null
      return
    }
    rafId = requestAnimationFrame(step)
  }

  function start() {
    if (rafId !== null || disposed) return
    lastTime = null
    rafId = requestAnimationFrame(step)
  }

  /** Animate toward `value`. Jumps instantly under reduced-motion. */
  function to(value) {
    target = value
    if (reduced) {
      current.value = value
      velocity = 0
      return
    }
    start()
  }

  /** Jump instantly — no animation. */
  function set(value) {
    target = value
    current.value = value
    velocity = 0
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  function getTarget() {
    return target
  }

  onBeforeUnmount(() => {
    disposed = true
    if (rafId !== null) cancelAnimationFrame(rafId)
  })

  return { current, to, set, target: getTarget }
}
