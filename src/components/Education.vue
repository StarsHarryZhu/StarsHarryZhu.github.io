<template>
  <section ref="root" class="education" aria-label="Education">
    <SectionHeader overline="Academic" title="Education" accent="violet" />

    <div class="education-grid">
      <article
        v-for="(item, index) in items"
        :key="`education-${index}`"
        :ref="(el) => reveal.observe(el)"
        class="panel education-card reveal"
        :style="{
          '--reveal-delay': `${index * 120}ms`,
          '--panel-halo': 'var(--halo-violet)',
        }"
      >
        <div class="education-signal" aria-hidden="true"></div>
        <div class="education-copy">
          <span class="education-period">{{ item.period }}</span>
          <h3 class="education-institution">{{ item.institution }}</h3>
          <p class="education-degree">{{ item.degree }}</p>
        </div>
        <p v-if="item.location" class="education-location">{{ item.location }}</p>
      </article>
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
useRipple(() => root.value, { selector: '.education-card' })
</script>

<style scoped>
.education {
  display: grid;
  gap: var(--space-5);
}

.education-grid {
  display: grid;
  gap: 0.9rem;
}

.education-card {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: var(--space-4);
  align-items: center;
  min-height: 112px;
  padding: clamp(0.9rem, 2vw, 1.2rem);
}

/* ===== Violet signal bar: breathing ===== */

.education-signal {
  width: 6px;
  height: 46px;
  border-radius: var(--radius-full);
  background: linear-gradient(
    180deg,
    var(--star-violet),
    rgba(155, 139, 255, 0.18)
  );
  box-shadow: 0 0 18px rgba(155, 139, 255, 0.3);
  animation: signal-breathe 3.2s var(--ease-aurora) infinite;
}

@keyframes signal-breathe {
  0%, 100% {
    box-shadow: 0 0 14px rgba(155, 139, 255, 0.2);
    opacity: 0.78;
  }
  50% {
    box-shadow: 0 0 28px rgba(155, 139, 255, 0.42);
    opacity: 1;
  }
}

.education-copy {
  min-width: 0;
}

.education-period {
  display: block;
  margin-bottom: 0.22rem;
  color: var(--star-violet);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.education-institution {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
}

.education-degree,
.education-location {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  line-height: var(--leading-base);
}

.education-degree {
  margin: 0.24rem 0 0;
}

.education-location {
  margin: 0;
  color: var(--text-tertiary);
  text-align: right;
}

@media (prefers-reduced-motion: reduce) {
  .education-signal {
    animation: none;
    opacity: 0.85;
  }
}

@media (max-width: 640px) {
  .education-card {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .education-location {
    grid-column: 2;
    text-align: left;
  }
}
</style>
