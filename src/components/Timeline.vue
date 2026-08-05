<template>
  <section ref="root" class="timeline" aria-label="Experience">
    <SectionHeader overline="Career" title="Experience" accent="cyan" />

    <div class="timeline-track">
      <div
        v-for="(entry, index) in items"
        :key="`timeline-${index}`"
        class="timeline-entry"
        :class="{ 'timeline-entry--featured': entry.featured }"
      >
        <div class="timeline-marker" aria-hidden="true">
          <div class="timeline-dot"></div>
          <div v-if="index < items.length - 1" class="timeline-line"></div>
        </div>
        <article
          :ref="(el) => reveal.observe(el)"
          class="panel timeline-card reveal"
          :class="{ 'timeline-card--featured': entry.featured }"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
        >
          <span class="timeline-period">{{ entry.period }}</span>
          <h3 class="timeline-title">{{ entry.title }}</h3>
          <div class="timeline-meta">
            <p v-if="entry.subtitle" class="timeline-subtitle">{{ entry.subtitle }}</p>
            <p v-if="entry.location" class="timeline-location">{{ entry.location }}</p>
          </div>
          <ul v-if="entry.highlights && entry.highlights.length" class="timeline-highlights">
            <li v-for="(highlight, hi) in entry.highlights" :key="`highlight-${hi}`">
              {{ highlight }}
            </li>
          </ul>
          <div v-if="entry.tags && entry.tags.length" class="timeline-tags">
            <span v-for="(tag, ti) in entry.tags" :key="`ttag-${ti}`" class="tag-pill">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTemplateRef } from 'vue'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useRipple } from '@/composables/useRipple'

defineProps({
  items: { type: Array, required: true },
})

const root = useTemplateRef('root')
const reveal = useScrollReveal({ rootMargin: '0px 0px -8% 0px' })
useRipple(() => root.value, { selector: '.timeline-card' })
</script>

<style scoped>
.timeline {
  display: grid;
  gap: var(--space-5);
}

.timeline-track {
  display: grid;
  gap: 0;
}

.timeline-entry {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: var(--space-4);
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
}

/* ===== Node dot: glowing star point with pulse ===== */

.timeline-dot {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--star-cyan);
  box-shadow: 0 0 14px rgba(125, 244, 232, 0.6);
  flex-shrink: 0;
  animation: dot-pulse 2.6s var(--ease-aurora) infinite;
}

@keyframes dot-pulse {
  0%, 100% { box-shadow: 0 0 10px rgba(125, 244, 232, 0.45); }
  50% { box-shadow: 0 0 22px rgba(125, 244, 232, 0.85); }
}

/* ===== Star trail: dotted vertical line between entries ===== */

.timeline-line {
  width: 1px;
  flex: 1;
  min-height: 24px;
  margin-top: var(--space-1);
  background-image: repeating-linear-gradient(
    180deg,
    rgba(125, 244, 232, 0.45) 0 2px,
    transparent 2px 7px
  );
}

/* ===== Floating glass card ===== */

.timeline-card {
  --panel-halo: var(--halo-cyan);
  display: grid;
  gap: 0.34rem;
  align-content: start;
  padding: clamp(1rem, 2vw, 1.4rem);
  margin-bottom: var(--space-6);
}

.timeline-period {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--star-cyan);
}

.timeline-title {
  margin: 0.1rem 0 0;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.timeline-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem 0.56rem;
}

.timeline-subtitle {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.timeline-location {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

/* Highlights with star bullets */
.timeline-highlights {
  display: grid;
  gap: 0.34rem;
  margin: 0.4rem 0 0;
  padding: 0;
  list-style: none;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  line-height: var(--leading-base);
}

.timeline-highlights li {
  position: relative;
  padding-left: 1rem;
}

.timeline-highlights li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--star-cyan);
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.34rem;
  margin-top: 0.5rem;
}

/* ===== Featured entry: aurora border glass ===== */

.timeline-entry--featured .timeline-dot {
  width: 12px;
  height: 12px;
  margin-top: -1px;
  box-shadow: 0 0 18px rgba(125, 244, 232, 0.75);
}

.timeline-entry--featured .timeline-dot::after {
  content: '';
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  border: 1px solid rgba(125, 244, 232, 0.5);
}

.timeline-card--featured {
  --panel-blur: 22px;
  --panel-halo: var(--halo-violet);
  border: 1px solid transparent;
  background:
    linear-gradient(155deg, rgba(125, 244, 232, 0.08), transparent 46%),
    linear-gradient(var(--glass-bg), var(--glass-bg)) padding-box,
    linear-gradient(135deg, var(--star-cyan), var(--star-blue), var(--star-violet)) border-box;
  box-shadow:
    var(--glass-highlight),
    var(--glass-shade),
    var(--shadow-lift),
    0 0 30px rgba(125, 244, 232, 0.12);
  padding: clamp(1.2rem, 2.4vw, 1.7rem);
}

@media (prefers-reduced-motion: reduce) {
  .timeline-dot {
    animation: none;
    box-shadow: 0 0 12px rgba(125, 244, 232, 0.5);
  }
}

@media (max-width: 640px) {
  .timeline-entry {
    grid-template-columns: 18px minmax(0, 1fr);
    gap: var(--space-3);
  }
}
</style>
