import { onMounted, onBeforeUnmount } from 'vue'

/**
 * useScrollReveal — IntersectionObserver-driven entrance reveal.
 *
 * Adds `.is-visible` to observed elements when they enter the viewport,
 * triggering the spring-like `.reveal` transition defined in global.css.
 * Elements are unobserved after their first reveal (play once).
 *
 * Usage:
 *   const reveal = useScrollReveal()
 *   <div :ref="reveal.observe" class="reveal">…</div>
 *
 * Under `prefers-reduced-motion` elements are revealed instantly.
 *
 * @param {Object} [opts]
 * @param {string} [opts.rootMargin]  pulls the trigger zone off-screen bottom
 * @param {number} [opts.threshold]   intersection ratio required to trigger
 */
export function useScrollReveal(opts = {}) {
  const { rootMargin = '0px 0px -12% 0px', threshold = 0.1 } = opts
  let observer = null

  function callback(entries) {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  }

  onMounted(() => {
    observer = new IntersectionObserver(callback, { rootMargin, threshold })
  })

  onBeforeUnmount(() => observer?.disconnect())

  function observe(el) {
    if (!el) return
    // Reduced motion (or element already reveals instantly): show now.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }
    if (observer) observer.observe(el)
    else requestAnimationFrame(() => observer?.observe(el))
  }

  return { observe }
}
