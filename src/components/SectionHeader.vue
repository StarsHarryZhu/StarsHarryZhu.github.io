<template>
  <div class="section-header reveal" :ref="reveal.observe">
    <div class="sh-row">
      <span class="sh-index">{{ index }}</span>
      <h2 class="sh-title">{{ title }}</h2>
    </div>
    <div class="sh-line" aria-hidden="true">
      <span class="sh-line-core"></span>
    </div>
  </div>
</template>

<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'

defineProps({
  index: { type: String, required: true },
  title: { type: String, required: true },
})

const reveal = useScrollReveal({ threshold: 0.1 })
</script>

<style scoped>
.section-header {
  display: grid;
  gap: 0.7rem;
}

.sh-row {
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
}

.sh-index {
  font-family: var(--font-mono);
  font-size: clamp(0.85rem, 2vw, 1.05rem);
  letter-spacing: var(--tracking-wider);
  color: var(--accent-cyan);
  text-shadow: 0 0 18px rgba(125, 244, 232, 0.45);
  user-select: none;
}

.sh-title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.6rem, 4vw, 2.3rem);
  letter-spacing: var(--tracking-tight);
  line-height: 1.1;
  color: var(--text-primary);
}

/* Liquid hairline: a bright line of glass that condenses in */
.sh-line {
  position: relative;
  height: 1px;
  border-radius: var(--radius-full);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.16),
    rgba(255, 255, 255, 0.05) 60%,
    transparent 100%
  );
  overflow: hidden;
}

.sh-line-core {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(125, 244, 232, 0.75) 18%,
    rgba(138, 180, 255, 0.75) 45%,
    transparent 75%
  );
  background-size: 220% 100%;
  animation: line-flow 5.5s var(--ease-breathe) infinite;
  opacity: 0.55;
}

@keyframes line-flow {
  from { background-position: 120% 0; }
  to { background-position: -120% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .sh-line-core {
    animation: none;
    background-position: 0 0;
  }
}
</style>
