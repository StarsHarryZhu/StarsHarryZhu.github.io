<template>
  <section id="education" class="education-section" aria-label="Education">
    <SectionHeader index="05" title="Education" />

    <div class="panel education-panel reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '120ms' }">
      <span class="panel-halo" style="--panel-halo: var(--halo-violet)" aria-hidden="true"></span>

      <div
        v-for="(item, index) in items"
        :key="`education-${index}`"
        class="edu-item"
      >
        <div class="edu-signal" aria-hidden="true"></div>
        <div class="edu-copy">
          <span class="edu-period">{{ item.period }}</span>
          <h3 class="edu-institution">{{ item.institution }}</h3>
          <p class="edu-degree">{{ item.degree }}</p>
        </div>
        <p v-if="item.location" class="edu-location">{{ item.location }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from '@/components/SectionHeader.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

defineProps({
  items: { type: Array, required: true },
})

const reveal = useScrollReveal({ rootMargin: '0px 0px -8% 0px' })
</script>

<style scoped>
.education-section {
  scroll-margin-top: calc(var(--nav-height) + 1rem);
}

.education-panel {
  display: grid;
  gap: 0.9rem;
  padding: clamp(1.3rem, 3vw, 2rem);
  margin-top: 1.1rem;
}

.edu-item {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
  padding: 1.1rem 0.2rem;
  border-top: 1px solid var(--border-l1);
}

.edu-signal {
  width: 4px;
  height: 46px;
  border-radius: var(--radius-full);
  background: linear-gradient(
    180deg,
    var(--accent-violet) 0%,
    rgba(150, 130, 255, 0.2) 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 0 14px rgba(167, 155, 255, 0.32);
  animation: signal-breathe 3.4s var(--ease-breathe) infinite;
}

@keyframes signal-breathe {
  0%, 100% {
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      0 0 9px rgba(167, 155, 255, 0.18);
    opacity: 0.84;
  }
  50% {
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      0 0 24px rgba(167, 155, 255, 0.48);
    opacity: 1;
  }
}

.edu-copy {
  min-width: 0;
}

.edu-period {
  display: block;
  margin-bottom: 0.22rem;
  color: var(--accent-violet);
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.edu-institution {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1.08rem;
  font-weight: 600;
}

.edu-degree {
  margin: 0.2rem 0 0;
  color: var(--text-secondary);
  font-size: var(--text-sm);
  line-height: 1.6;
}

.edu-location {
  margin: 0;
  grid-column: 2;
  color: var(--text-tertiary);
  font-size: var(--text-xs);
}

@media (prefers-reduced-motion: reduce) {
  .edu-signal {
    animation: none;
    opacity: 0.9;
  }
}
</style>
