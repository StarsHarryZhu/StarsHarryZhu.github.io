<script setup>
// Deterministic star parameters (no randomness, so nothing jumps between mounts)
const stars = Array.from({ length: 6 }, (_, i) => ({
  id: `star-${i}`,
  style: {
    '--s-left': `${(i * 16.3 + 5) % 94}%`,
    '--s-top': `${(i * 15.7 + 8) % 88}%`,
    '--s-size': `${1.5 + ((i * 7) % 3) * 0.5}px`,
    '--s-duration': `${20 + ((i * 5) % 14)}s`,
    '--s-delay': `${-((i * 3.1) % 18)}s`,
  },
}))
</script>

<template>
  <div class="sky" aria-hidden="true">
    <!-- deep-space ground + the static nebula, merged into one layer -->
    <div class="sky-nebula"></div>

    <!-- stars: tiny points that only change opacity -->
    <span v-for="star in stars" :key="star.id" class="star" :style="star.style"></span>

    <!-- grain: breaks up gradient banding -->
    <div class="sky-grain"></div>
  </div>
</template>

<style scoped>
/* The sky is still. Motion on this page answers the reader (effects/gas);
   a fixed full-screen layer that animated on its own would cost frames on
   every scroll and break the quiet of an idle page. */

.sky {
  position: fixed;
  inset: 0;
  z-index: var(--z-sky);
  pointer-events: none;
  overflow: hidden;
}

/* ===== Nebula: soft-edged radial gradients, no filter blur ===== */

.sky-nebula {
  position: absolute;
  inset: 0;
  background:
    /* light cores */
    radial-gradient(46% 40% at 18% 4%, rgba(79, 235, 221, 0.16) 0%, rgba(91, 124, 255, 0.08) 38%, transparent 70%),
    radial-gradient(40% 36% at 94% 90%, rgba(207, 107, 255, 0.15) 0%, rgba(148, 104, 255, 0.07) 40%, transparent 72%),
    /* nebula clouds */
    radial-gradient(44% 38% at 20% 62%, rgba(79, 235, 221, 0.42) 0%, rgba(79, 235, 221, 0.12) 42%, transparent 72%),
    radial-gradient(28% 24% at 62% 86%, rgba(79, 235, 221, 0.16) 0%, transparent 70%),
    radial-gradient(48% 40% at 78% 22%, rgba(91, 124, 255, 0.5) 0%, rgba(91, 124, 255, 0.15) 44%, transparent 74%),
    radial-gradient(30% 26% at 34% 10%, rgba(91, 124, 255, 0.18) 0%, transparent 70%),
    radial-gradient(42% 34% at 54% 46%, rgba(148, 104, 255, 0.46) 0%, rgba(148, 104, 255, 0.12) 46%, transparent 74%),
    radial-gradient(26% 22% at 88% 66%, rgba(207, 107, 255, 0.2) 0%, transparent 70%),
    radial-gradient(22% 20% at 8% 92%, rgba(148, 104, 255, 0.18) 0%, transparent 70%),
    var(--page-bg);
}

/* ===== Stars: opacity only (tiny area, nearly free) ===== */

.star {
  position: absolute;
  left: var(--s-left);
  top: var(--s-top);
  width: var(--s-size);
  height: var(--s-size);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(180, 230, 255, 0.35) 45%, transparent 100%);
  animation: twinkle var(--s-duration) ease-in-out var(--s-delay) infinite alternate;
}

@keyframes twinkle {
  from { opacity: 0.2; }
  to   { opacity: 0.9; }
}

/* ===== Grain ===== */

.sky-grain {
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}

@media (prefers-reduced-motion: reduce), (max-width: 767px), (hover: none) and (pointer: coarse) {
  .star {
    animation: none;
  }
}
</style>
