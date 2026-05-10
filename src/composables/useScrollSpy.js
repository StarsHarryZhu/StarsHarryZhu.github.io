import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrollSpy(sectionIds, options = {}) {
  const { threshold = 0.3, rootMargin = '0px' } = options
  const activeSection = ref('')
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        }
      },
      { threshold, rootMargin }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })

  return { activeSection }
}
