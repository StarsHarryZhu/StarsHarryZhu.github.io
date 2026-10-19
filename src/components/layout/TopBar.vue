<script setup>
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import LanguageToggle from '@/components/layout/LanguageToggle.vue'
import { attachLens } from '@/effects/lens/index.js'
import { useI18n } from '@/i18n/index.js'

const { t } = useI18n()

const capsule = useTemplateRef('capsule')
let detachLens = () => {}

onMounted(() => {
  detachLens = attachLens(capsule.value, { id: 'lens-topbar', bezel: 14, scale: 26 })
})

onBeforeUnmount(() => detachLens())

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <header class="topbar">
    <div ref="capsule" class="lens-glass tb-capsule">
      <a href="#top" class="tb-brand" @click.prevent="toTop">
        <svg width="15" height="15" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="tb-star" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#7DF4E8" />
              <stop offset="0.55" stop-color="#8AB4FF" />
              <stop offset="1" stop-color="#B4A5FF" />
            </linearGradient>
          </defs>
          <path
            d="M5 0L6.12 3.37L9.76 3.63L6.87 5.97L7.76 9.56L5 7.68L2.24 9.56L3.13 5.97L0.24 3.63L3.88 3.37L5 0Z"
            fill="url(#tb-star)"
          />
        </svg>
        <span>starfield</span>
      </a>

      <p class="tb-status">
        <i class="tb-dot" aria-hidden="true"></i>
        <span>{{ t('topbar.status') }}</span>
      </p>

      <LanguageToggle />
    </div>
  </header>
</template>

<style scoped>
/* Information capsule (not navigation): brand · status · language switch.
   It floats over the page as real lens glass — the one surface on the
   scrolling page that samples its backdrop. It is small and fixed, so the
   per-frame re-blur stays cheap (see the measurements in src/AGENTS.md). */

.topbar {
  position: fixed;
  top: 12px;
  left: 0;
  right: 0;
  z-index: var(--z-bar);
  display: flex;
  justify-content: center;
  padding-inline: var(--shell-pad);
  pointer-events: none;
}

.tb-capsule {
  --glass-radius: var(--radius-full);
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: calc(var(--content-width) - 2 * var(--shell-pad));
  height: 50px;
  padding: 0 7px 0 18px;
  pointer-events: auto;
}

/* ===== Brand ===== */

.tb-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
  transition: color var(--transition-base);
}

.tb-brand:hover {
  color: var(--accent-cyan);
}

/* ===== Status ===== */

.tb-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0 auto;
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-secondary);
  white-space: nowrap;
}

.tb-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 30%, #ffffff, var(--accent-cyan));
  box-shadow: 0 0 10px rgba(79, 235, 221, 0.7);
  flex-shrink: 0;
}

@media (max-width: 700px) {
  .tb-status {
    display: none;
  }

  .tb-capsule {
    justify-content: space-between;
  }
}
</style>
