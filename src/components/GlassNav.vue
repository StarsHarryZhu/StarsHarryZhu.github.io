<template>
  <nav class="topnav" aria-label="Primary">
    <div class="tn-inner">
      <a href="#top" class="tn-brand" @click="scrollTo('#top')">
        <svg width="16" height="16" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="tn-star" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#6EA8FE" />
              <stop offset="0.6" stop-color="#8FB8FF" />
              <stop offset="1" stop-color="#A9B8E8" />
            </linearGradient>
          </defs>
          <path
            d="M5 0L6.12 3.37L9.76 3.63L6.87 5.97L7.76 9.56L5 7.68L2.24 9.56L3.13 5.97L0.24 3.63L3.88 3.37L5 0Z"
            fill="url(#tn-star)"
          />
        </svg>
        <span>starfield</span>
      </a>

      <div class="tn-links">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="tn-link"
          :class="{ 'is-active': active === link.id }"
          @click="scrollTo(`#${link.id}`)"
        >
          {{ link.label }}
        </a>
      </div>

      <a href="#contact" class="btn btn-primary tn-cta" @click="scrollTo('#contact')">
        Contact
      </a>
    </div>
  </nav>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'toolkit', label: 'Toolkit' },
]

const active = ref('')

let scrollTicking = false

function onScroll() {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(() => {
    updateActive()
    scrollTicking = false
  })
}

function updateActive() {
  const probe = 120
  let current = ''
  for (const link of links) {
    const el = document.getElementById(link.id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= probe) current = link.id
  }
  active.value = current
}

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.topnav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-nav);
  display: flex;
  justify-content: center;
  padding: 0 var(--shell-pad);
  background: rgba(10, 12, 16, 0.72);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-l1);
}

/* Single nav element keeps blur cheap; everything under it is opaque
   cards so scrolling is smooth. */

.tn-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: var(--content-width);
  height: var(--nav-height);
}

/* ===== Brand ===== */

.tn-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
  transition: color var(--transition-base);
}

.tn-brand:hover {
  color: var(--accent-sky);
}

/* ===== Links (centered) ===== */

.tn-links {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-inline: auto;
}

.tn-link {
  padding: 0.42rem 0.8rem;
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  transition:
    color var(--transition-base),
    background var(--transition-base);
}

.tn-link:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.06);
}

.tn-link.is-active {
  color: var(--accent-cyan);
}

/* ===== CTA ===== */

.tn-cta {
  padding: 8px 16px;
  font-size: 13.5px;
}

/* ===== Responsive ===== */

@media (max-width: 720px) {
  .tn-links {
    display: none;
  }
  .tn-inner {
    gap: 1rem;
  }
}
</style>
