import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Which section the reader is in, for the sidebar nav.
 *
 * The current section is the last one whose top has crossed a reading line
 * 35% down the viewport; at the bottom of the page the last section wins,
 * because short closing sections never reach the line.
 *
 * A nav click sets the section at once and holds it while the smooth scroll
 * runs: a short section near the end may never cross the line, and the
 * reader asked for it. The hold ends at the reader's next own scroll input.
 */
export function useScrollSpy(ids) {
  const active = ref(ids[0])
  let held = false
  let frame = 0

  function measure() {
    frame = 0
    if (held) return
    const line = window.innerHeight * 0.35
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
    let current = ids[0]
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= line) current = id
    }
    active.value = atEnd ? ids[ids.length - 1] : current
  }

  function onScroll() {
    if (!frame) frame = requestAnimationFrame(measure)
  }

  function release() {
    held = false
  }

  /** Called by a nav link: show its section as current right away. */
  function hold(id) {
    active.value = id
    held = true
  }

  const INPUT = ['wheel', 'touchstart', 'keydown', 'pointerdown']

  onMounted(() => {
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    for (const type of INPUT) window.addEventListener(type, release, { passive: true, capture: true })
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    for (const type of INPUT) window.removeEventListener(type, release, { capture: true })
  })

  return { active, hold }
}
