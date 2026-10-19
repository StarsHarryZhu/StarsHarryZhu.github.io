<script setup>
import { useCondense } from '@/composables/useCondense.js'

defineProps({
  index: { type: String, required: true },
  title: { type: String, required: true },
})

const condense = useCondense({ threshold: 0.1 })
</script>

<template>
  <div :ref="condense.observe" class="section-header condense">
    <div class="sh-row">
      <span class="sh-index">{{ index }}</span>
      <h2 class="sh-title">{{ title }}</h2>
    </div>
    <div class="sh-line" aria-hidden="true"></div>
  </div>
</template>

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
  text-shadow: 0 0 18px rgba(79, 235, 221, 0.5);
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

/* a hairline of light, like the rim of a glass edge */
.sh-line {
  height: 1px;
  border-radius: var(--radius-full);
  background: linear-gradient(
    90deg,
    rgba(79, 235, 221, 0.55) 0%,
    rgba(148, 104, 255, 0.4) 34%,
    rgba(255, 255, 255, 0.06) 68%,
    transparent 100%
  );
}
</style>
