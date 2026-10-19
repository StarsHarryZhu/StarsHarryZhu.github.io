import { onMounted, onBeforeUnmount } from 'vue'
import { gas } from '@/effects/gas/index.js'

/** How close (CSS px) the pointer must come before a panel's edge turns toward it. */
const HALO_REACH = 160

/**
 * usePointerLight — the page answers the pointer with light and vapour.
 *
 *   · light follows the pointer: inside a `.glass` panel a soft light sits
 *     under the pointer;
 *   · halo pull: within HALO_REACH outside a panel, the same light — clipped
 *     by the panel — gathers on the edge nearest the pointer;
 *   · trail: pointer movement stirs a faint glowing wake into the gas layer;
 *   · press: pressing a link or button releases a small puff at that point.
 *
 * One rAF-batched listener for the whole page: rects are read for visible
 * panels only, then `--lx` / `--ly` / `--lit` are written to the panels in
 * reach (styles/glass.css turns them into transform and opacity).
 * Mount once, from the page view. Fine pointers only; off under reduced motion.
 */
export function usePointerLight() {
  const visible = new Set()
  const lit = new Set()
  let io = null
  let raf = 0
  let x = -1e4
  let y = -1e4
  let prevX = null
  let prevY = null
  let tracking = false

  function douse(el) {
    el.style.setProperty('--lit', '0')
    el.removeAttribute('data-lit')
    lit.delete(el)
  }

  function frame() {
    raf = 0
    const reads = []
    for (const el of visible) {
      const r = el.getBoundingClientRect()
      const dx = Math.max(r.left - x, 0, x - r.right)
      const dy = Math.max(r.top - y, 0, y - r.bottom)
      reads.push([el, r, Math.hypot(dx, dy)])
    }
    for (const [el, r, distance] of reads) {
      if (distance > HALO_REACH) {
        if (lit.has(el)) douse(el)
        continue
      }
      const strength = distance === 0 ? 1 : 0.85 * (1 - distance / HALO_REACH)
      el.style.setProperty('--lx', `${(x - r.left).toFixed(1)}px`)
      el.style.setProperty('--ly', `${(y - r.top).toFixed(1)}px`)
      el.style.setProperty('--lit', strength.toFixed(3))
      if (!lit.has(el)) {
        el.setAttribute('data-lit', '')
        lit.add(el)
      }
    }
    if (prevX !== null) gas.stir(x, y, x - prevX, y - prevY)
    prevX = x
    prevY = y
  }

  function schedule() {
    if (!raf) raf = requestAnimationFrame(frame)
  }

  function onMove(event) {
    if (event.pointerType === 'touch') return
    x = event.clientX
    y = event.clientY
    schedule()
  }

  function onLeave() {
    x = y = -1e4
    prevX = prevY = null
    schedule()
  }

  // panels move under a resting pointer while the page scrolls
  function onScroll() {
    if (lit.size || x > -1e4) schedule()
  }

  function onPress(event) {
    if (!event.target.closest?.('a, button')) return
    gas.puff({ x: event.clientX, y: event.clientY, width: 0, height: 0 }, { mode: 'disperse', strength: 0.45 })
  }

  onMounted(() => {
    window.addEventListener('pointerdown', onPress, { passive: true })

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || still) return

    tracking = true
    io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target)
        else {
          visible.delete(entry.target)
          if (lit.has(entry.target)) douse(entry.target)
        }
      }
    })
    for (const el of document.querySelectorAll('.glass')) io.observe(el)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('pointerdown', onPress)
    if (!tracking) return
    io.disconnect()
    cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('scroll', onScroll)
    document.documentElement.removeEventListener('pointerleave', onLeave)
  })
}
