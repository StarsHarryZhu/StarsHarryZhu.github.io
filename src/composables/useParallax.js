import { shallowRef, onMounted, onBeforeUnmount } from 'vue'

export function useParallax() {
  const mouseX = shallowRef(0)
  const mouseY = shallowRef(0)
  let rafId = null
  let targetX = 0
  let targetY = 0

  function onMouseMove(e) {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2
    targetY = (e.clientY / window.innerHeight - 0.5) * 2
  }

  function tick() {
    mouseX.value += (targetX - mouseX.value) * 0.05
    mouseY.value += (targetY - mouseY.value) * 0.05
    rafId = requestAnimationFrame(tick)
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(tick)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMouseMove)
    if (rafId) cancelAnimationFrame(rafId)
  })

  return { mouseX, mouseY }
}
