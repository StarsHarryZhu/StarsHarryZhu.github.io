<template>
  <nav class="glass-nav" aria-label="Primary">
    <div class="gn-inner" :class="{ 'gn-scrolled': scrolled }">
      <a href="#top" class="gn-brand" @click="scrollTo('#top')">
        <svg class="gn-star" width="15" height="15" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="gn-star-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#7DF4E8" />
              <stop offset="0.55" stop-color="#8AB4FF" />
              <stop offset="1" stop-color="#A79BFF" />
            </linearGradient>
          </defs>
          <path
            d="M5 0L6.12 3.37L9.76 3.63L6.87 5.97L7.76 9.56L5 7.68L2.24 9.56L3.13 5.97L0.24 3.63L3.88 3.37L5 0Z"
            fill="url(#gn-star-grad)"
          />
        </svg>
        <span class="gn-brand-text">starfield</span>
      </a>

      <div class="gn-links">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="gn-link"
          :class="{ 'is-active': active === link.id }"
          @click="scrollTo(`#${link.id}`)"
        >
          {{ link.label }}
        </a>
      </div>

      <a href="#contact" class="gn-cta" @click="scrollTo('#contact')">
        Get in touch
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
  { id: 'contact', label: 'Contact' },
]

const scrolled = ref(false)
const active = ref('')

let scrollTicking = false

function onScroll() {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 24
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
.glass-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-nav);
  display: flex;
  justify-content: center;
  padding: clamp(0.7rem, 2vw, 1rem) var(--shell-pad) 0;
  pointer-events: none;
}

.gn-inner {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 1.1rem;
  width: 100%;
  max-width: var(--content-width);
  padding: 0.55rem 0.9rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04) 55%),
    rgba(35, 35, 36, 0.34);
  backdrop-filter: blur(20px) saturate(1.6) brightness(1.08);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.24),
    var(--glass-rim),
    0 14px 40px -14px rgba(0, 0, 0, 0.7);
  transition:
    background var(--transition-base),
    box-shadow var(--transition-base);
}

.gn-scrolled {
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.03) 55%),
    rgba(44, 44, 46, 0.5);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    var(--glass-rim),
    0 18px 44px -14px rgba(0, 0, 0, 0.8);
}

/* ===== Brand ===== */

.gn-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: auto;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.98rem;
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
  border-radius: var(--radius-full);
  padding: 0.28rem 0.5rem;
  margin-left: -0.5rem;
  transition: color var(--transition-base);
}

.gn-brand:hover {
  color: var(--accent-cyan);
}

.gn-star {
  filter: drop-shadow(0 0 6px rgba(125, 244, 232, 0.45));
  animation: star-twinkle 4s var(--ease-breathe) infinite alternate;
}

@keyframes star-twinkle {
  from { filter: drop-shadow(0 0 4px rgba(125, 244, 232, 0.3)); }
  to { filter: drop-shadow(0 0 9px rgba(167, 155, 255, 0.55)); }
}

/* ===== Links ===== */

.gn-links {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.gn-link {
  position: relative;
  padding: 0.42rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  transition:
    color var(--transition-base),
    background var(--transition-base);
}

.gn-link:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.07);
}

.gn-link.is-active {
  color: var(--accent-cyan);
  background: rgba(125, 244, 232, 0.09);
}

.gn-link.is-active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 3px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 8px rgba(125, 244, 232, 0.8);
  transform: translateX(-50%);
}

/* ===== CTA ===== */

.gn-cta {
  padding: 0.48rem 1.05rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.24);
  background:
    radial-gradient(120% 140% at 20% -30%, rgba(255, 255, 255, 0.18), transparent 55%),
    linear-gradient(150deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.03) 60%),
    rgba(35, 35, 36, 0.22);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.24);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.gn-cta:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    0 8px 22px -8px rgba(103, 153, 254, 0.4);
}

/* ===== Responsive ===== */

@media (max-width: 720px) {
  .gn-links {
    display: none;
  }
}
</style>
