<template>
  <footer class="footer" role="contentinfo">
    <p class="footer-side footer-left">{{ items[0] || '' }}</p>
    <p class="footer-dot" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
        <defs>
          <linearGradient id="footer-star-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#8FB8FF" />
            <stop offset="0.55" stop-color="#8AB4FF" />
            <stop offset="1" stop-color="#A79BFF" />
          </linearGradient>
        </defs>
        <path
          d="M5 0L6.12 3.37L9.76 3.63L6.87 5.97L7.76 9.56L5 7.68L2.24 9.56L3.13 5.97L0.24 3.63L3.88 3.37L5 0Z"
          fill="url(#footer-star-grad)"
        />
      </svg>
    </p>
    <p v-if="items[1]" class="footer-side footer-right">{{ items[1] }}</p>
    <p v-else class="footer-side footer-right">HarmonyOS Aero · Liquid Glass</p>
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
  width: 100%;
  padding-top: clamp(1rem, 2.4vw, 1.4rem);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.18) 50%,
    transparent 100%
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: top;
}

.footer-side {
  margin: 0;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer-left { text-align: right; }
.footer-right { text-align: left; }

/* ===== Star: slow celestial rotation + breathing glow ===== */

.footer-dot {
  margin: 0;
  display: flex;
  align-items: center;
  opacity: 0.8;
  line-height: 1;
  filter: drop-shadow(0 0 5px rgba(110, 168, 254, 0.4));
}
</style>
