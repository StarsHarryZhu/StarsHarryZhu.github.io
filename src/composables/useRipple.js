import { onMounted, onBeforeUnmount } from 'vue'

/**
 * useRipple — HarmonyOS 水波涟漪 + 按压点光源 pointer feedback.
 *
 * One delegated `pointerdown` listener on the container. On press it appends a
 * `.ripple-el` span at the press point (expanding ring + soft light bloom,
 * defined in global.css) to the closest matching target, and removes it when
 * the animation ends. Using a real child element (not a pseudo-element) keeps
 * it compatible with `.panel::after` 材质流光 and any other pseudo usage.
 *
 * Usage (works for v-for cards):
 *   const root = useTemplateRef('root')
 *   useRipple(() => root.value, { selector: '.project-card' })
 *
 * @param {() => HTMLElement | null} getContainer  mounted container accessor
 * @param {Object} [opts]
 * @param {string} [opts.selector='.ripple-target']  CSS selector for rippled elements
 */
export function useRipple(getContainer, { selector = '.ripple-target' } = {}) {
  let container = null
  let reduced = false

  if (typeof window !== 'undefined' && window.matchMedia) {
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function applyRipple(node, e) {
    if (!node) return
    const rect = node.getBoundingClientRect()
    const el = document.createElement('span')
    el.className = 'ripple-el'
    el.style.left = `${e.clientX - rect.left}px`
    el.style.top = `${e.clientY - rect.top}px`
    node.classList.add('ripple-host')
    node.appendChild(el)
    const done = () => {
      el.remove()
      el.removeEventListener('animationend', done)
    }
    el.addEventListener('animationend', done)
  }

  function onPointerDown(e) {
    if (reduced) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const node = e.target?.closest?.(selector)
    if (!node || !container?.contains(node)) return
    applyRipple(node, e)
  }

  onMounted(() => {
    container = typeof getContainer === 'function' ? getContainer() : getContainer?.value
    container?.addEventListener('pointerdown', onPointerDown)
  })

  onBeforeUnmount(() => {
    container?.removeEventListener('pointerdown', onPointerDown)
  })
}
