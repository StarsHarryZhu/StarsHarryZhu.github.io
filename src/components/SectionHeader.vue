<template>
  <div class="section-header" :style="{ '--accent': accentColor }">
    <span v-if="overline" class="section-overline">{{ overline }}</span>
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <div class="section-line-wrap" aria-hidden="true">
      <div :ref="reveal.observe" class="section-line">
        <span class="glint section-glint section-glint--a"></span>
        <span class="glint section-glint section-glint--b"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = defineProps({
  overline: { type: String, default: '' },
  title: { type: String, default: '' },
  accent: { type: String, default: 'cyan' },
})

const ACCENTS = {
  cyan: 'var(--star-cyan)',
  blue: 'var(--star-blue)',
  violet: 'var(--star-violet)',
}

const accentColor = computed(() => ACCENTS[props.accent] || ACCENTS.cyan)

const reveal = useScrollReveal({ rootMargin: '0px 0px -10% 0px', threshold: 0.2 })
</script>

<style scoped>
.section-header {
  display: grid;
  gap: 0.32rem;
}

.section-overline {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--accent);
}

.section-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3.2vw, 2.1rem);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: 1.15;
  color: var(--text-primary);
}

/* ===== Constellation line: draws left→right with a leading star dot ===== */

.section-line-wrap {
  position: relative;
  margin-top: 0.5rem;
  height: 1px;
  overflow: visible;
}

.section-line {
  position: relative;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    var(--accent) 0%,
    var(--star-blue) 40%,
    transparent 100%
  );
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.85s var(--ease-flow);
  will-change: transform;
}

.section-line.is-visible {
  transform: scaleX(1);
  will-change: auto;
}

/* Leading star dot — glows once the line has drawn */
.section-line::after {
  content: '';
  position: absolute;
  right: -1px;
  top: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--star-white);
  box-shadow: 0 0 10px var(--accent);
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.4s var(--ease-flow) 0.7s;
}

.section-line.is-visible::after {
  opacity: 1;
}

/* Faint glints adrift near the line */
.section-glint--a {
  left: 22%;
  top: -10px;
  animation-delay: -0.8s;
  animation-duration: 4.6s;
}

.section-glint--b {
  right: 18%;
  top: 8px;
  animation-delay: -2.4s;
  animation-duration: 3.2s;
}

/* Reduced motion: show the line immediately */
@media (prefers-reduced-motion: reduce) {
  .section-line {
    transform: scaleX(1);
    transition: none;
  }
  .section-line::after {
    opacity: 1;
    transition: none;
  }
}
</style>
