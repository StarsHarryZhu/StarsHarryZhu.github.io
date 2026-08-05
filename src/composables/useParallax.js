import { shallowRef, onBeforeUnmount } from 'vue'

/**
 * useParallax — normalized cursor position shared app-wide.
 *
 * Module-level singleton: every caller receives the SAME { mouseX, mouseY }
 * refs (each in [-1, 1], damped toward the cursor), backed by a single
 * `mousemove` listener and a single requestAnimationFrame loop. The loop
 * only runs while the cursor is moving (or recently moved) and stops when
 * settled, so a still cursor costs nothing per frame.
 *
 * Respects `prefers-reduced-motion`: with it on, the refs stay at 0 and no
 * listener or rAF loop is ever created.
 */
const mouseX = shallowRef(0)
const mouseY = shallowRef(0)

let targetX = 0
let targetY = 0
let rafId = null
let lastMoveAt = 0
let activeCount = 0

let reduced = false
if (typeof window !== 'undefined' && window.matchMedia) {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function onMouseMove(e) {
  targetX = (e.clientX / window.innerWidth - 0.5) * 2
  targetY = (e.clientY / window.innerHeight - 0.5) * 2
  lastMoveAt = performance.now()
  startLoop()
}

function tick() {
  const dx = targetX - mouseX.value
  const dy = targetY - mouseY.value
  mouseX.value += dx * 0.05
  mouseY.value += dy * 0.05

  if (Math.abs(dx) < 0.0004 && Math.abs(dy) < 0.0004 && performance.now() - lastMoveAt > 300) {
    mouseX.value = targetX
    mouseY.value = targetY
    rafId = null
    return
  }
  rafId = requestAnimationFrame(tick)
}

function startLoop() {
  if (rafId !== null) return
  rafId = requestAnimationFrame(tick)
}

function attach() {
  if (activeCount === 0 && !reduced) {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
  }
  activeCount++
}

function detach() {
  activeCount = Math.max(0, activeCount - 1)
  if (activeCount === 0) {
    window.removeEventListener('mousemove', onMouseMove)
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }
}

export function useParallax() {
  attach()
  if (!reduced) startLoop()
  onBeforeUnmount(detach)
  return { mouseX, mouseY }
}
