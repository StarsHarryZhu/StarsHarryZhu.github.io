import { onMounted, onBeforeUnmount } from 'vue'
import { gas } from '@/effects/gas/index.js'

/**
 * useCondense — elements condense into place the first time they scroll in.
 *
 * Adds `.is-condensed` once per element (the `.condense` transition in
 * styles/motion.css moves it). With `vapor: true` the gas layer also draws
 * vapour drifting in from the element's edges, so a glass panel looks as if
 * it gathers out of the mist.
 *
 * Usage:
 *   const condense = useCondense({ vapor: true })
 *   <div :ref="condense.observe" class="glass condense">…</div>
 *
 * Under `prefers-reduced-motion` elements are shown at once, without vapour.
 *
 * @param {Object} [opts]
 * @param {string} [opts.rootMargin]  pulls the trigger zone off-screen bottom
 * @param {number} [opts.threshold]   intersection ratio required to trigger
 * @param {boolean} [opts.vapor]      also puff vapour around the element
 */
export function useCondense(opts = {}) {
  const { rootMargin = '0px 0px -12% 0px', threshold = 0.1, vapor = false } = opts
  let observer = null

  function callback(entries) {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-condensed')
      if (vapor) gas.puff(entry.boundingClientRect, { mode: 'condense' })
      observer.unobserve(entry.target)
    }
  }

  onMounted(() => {
    observer = new IntersectionObserver(callback, { rootMargin, threshold })
  })

  onBeforeUnmount(() => observer?.disconnect())

  function observe(el) {
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-condensed')
      return
    }
    if (observer) observer.observe(el)
    else requestAnimationFrame(() => observer?.observe(el))
  }

  return { observe }
}
