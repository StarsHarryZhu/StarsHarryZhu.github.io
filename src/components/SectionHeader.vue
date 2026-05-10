<template>
  <div class="section-header">
    <span v-if="overline" class="section-overline">{{ overline }}</span>
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <div class="section-line" aria-hidden="true"></div>
  </div>
</template>

<script setup>
defineProps({
  overline: { type: String, default: '' },
  title: { type: String, default: '' },
})
</script>

<style scoped>
.section-header {
  display: grid;
  gap: 0.28rem;
}

.section-overline {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-accent-cyan);
}

.section-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
}

.section-line {
  margin-top: 0.4rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    var(--color-accent-cyan) 0%,
    var(--glass-border) 40%,
    transparent 100%
  );
}
</style>
