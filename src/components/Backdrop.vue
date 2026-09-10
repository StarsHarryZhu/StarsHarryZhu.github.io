<template>
  <div class="backdrop" aria-hidden="true">
    <!-- Static near-black gradient with a single cool wash at the top.
         No animation, no canvas, no blur — painted once. -->
    <div class="bd-base"></div>
    <div class="bd-stars"></div>
  </div>
</template>

<script setup>
// Purely decorative static backdrop.
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-bg);
  pointer-events: none;
  overflow: hidden;
}

.bd-base {
  position: absolute;
  inset: 0;
  background: var(--page-bg);
}

/* Static micro-stars: painted once, never animated */
.bd-stars {
  position: absolute;
  inset: 0;
  opacity: 0.5;
  background-image:
    radial-gradient(1px 1px at 12% 30%, rgba(255, 255, 255, 0.22) 0%, transparent 100%),
    radial-gradient(1.2px 1.2px at 32% 72%, rgba(255, 255, 255, 0.16) 0%, transparent 100%),
    radial-gradient(1px 1px at 52% 18%, rgba(255, 255, 255, 0.14) 0%, transparent 100%),
    radial-gradient(1.1px 1.1px at 68% 58%, rgba(255, 255, 255, 0.18) 0%, transparent 100%),
    radial-gradient(1px 1px at 82% 34%, rgba(255, 255, 255, 0.12) 0%, transparent 100%),
    radial-gradient(1.2px 1.2px at 90% 76%, rgba(255, 255, 255, 0.16) 0%, transparent 100%),
    radial-gradient(1px 1px at 22% 90%, rgba(255, 255, 255, 0.12) 0%, transparent 100%),
    radial-gradient(1px 1px at 44% 48%, rgba(255, 255, 255, 0.1) 0%, transparent 100%),
    radial-gradient(1.1px 1.1px at 76% 88%, rgba(255, 255, 255, 0.14) 0%, transparent 100%),
    radial-gradient(1px 1px at 6% 62%, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
}
</style>
