<template>
  <footer class="footer" role="contentinfo">
    <p class="footer-side footer-left">{{ items[0] || '' }}</p>
    <p class="footer-dot" aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M5 0L6.12 3.37L9.76 3.63L6.87 5.97L7.76 9.56L5 7.68L2.24 9.56L3.13 5.97L0.24 3.63L3.88 3.37L5 0Z"
          fill="currentColor"
        />
      </svg>
    </p>
    <p class="footer-side footer-right">{{ items[1] || '' }}</p>
  </footer>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<style scoped>
.footer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  column-gap: 0.6rem;
  padding-top: clamp(0.4rem, 1vw, 0.6rem);
  border-top: 1px solid transparent;
  border-image: linear-gradient(
    90deg,
    transparent 0%,
    var(--glass-border) 50%,
    transparent 100%
  ) 1;
}

.footer-side {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: var(--text-sm);
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer-left { text-align: right; }
.footer-right { text-align: left; }

.footer-dot {
  margin: 0;
  display: flex;
  align-items: center;
  color: var(--color-accent-amber);
  opacity: 0.7;
  line-height: 1;
}
</style>
