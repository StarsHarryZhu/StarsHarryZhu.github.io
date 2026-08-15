<template>
  <div class="aero-sky" aria-hidden="true">
    <!-- Base: deep-sea navy gradient + vignette + film grain -->
    <div class="as-base"></div>
    <div class="as-grain"></div>

    <!-- Faint engineering grid (90px, like deepseek.com/harness) -->
    <div class="as-grid"></div>

    <!-- Aurora blobs: huge blurred veils drifting behind the glass -->
    <div class="as-blob as-blob--deep"></div>
    <div class="as-blob as-blob--sky"></div>
    <div class="as-blob as-blob--navy"></div>
    <div class="as-blob as-blob--cyan"></div>
    <div class="as-blob as-blob--violet"></div>

    <!-- Screen-blended glow orb behind the hero (harness signature) -->
    <div class="as-orb"></div>

    <!-- Gas-mote particle field (Canvas) -->
    <canvas ref="canvasRef" class="as-particles"></canvas>
  </div>
</template>

<script setup>
import { useTemplateRef } from 'vue'
import { useParallax } from '@/composables/useParallax'
import { useParticleField } from '@/composables/useParticleField'

const canvasRef = useTemplateRef('canvasRef')

// Normalized pointer in [-1, 1] from the shared parallax composable.
const { mouseX, mouseY } = useParallax()

function getPointer() {
  if (!canvasRef.value) return null
  return { x: mouseX.value, y: mouseY.value }
}

// Mounts the singleton field; other components reach it via useParticleField().
useParticleField(() => canvasRef.value, {
  count: 60,
  connectDistance: 0,
  pointerStrength: 0.1,
  getPointer,
})
</script>

<style scoped>
.aero-sky {
  position: fixed;
  inset: 0;
  z-index: var(--z-bg);
  pointer-events: none;
  overflow: hidden;
}

/* ===== Base: deep-sea navy gradient + vignette ===== */

.as-base {
  position: absolute;
  inset: 0;
  background:
    var(--page-vignette),
    var(--page-bg);
}

/* ===== Film grain: kills gradient banding, adds "light in air" ===== */

.as-grain {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}

/* ===== Grid: faint 90px blueprint lines, faded toward the horizon ===== */

.as-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px);
  background-size: 90px 90px;
  mask-image: radial-gradient(120% 85% at 50% 0%, #000 0%, rgba(0, 0, 0, 0.35) 55%, transparent 88%);
  -webkit-mask-image: radial-gradient(120% 85% at 50% 0%, #000 0%, rgba(0, 0, 0, 0.35) 55%, transparent 88%);
}

/* ===== Aurora blobs: slow organic drift (气态 drift) =====
   Painted as soft multi-stop radial gradients — NO filter:blur. A full-
   screen 58px blur × 5 animated layers forces constant GPU repaints;
   radial falloff already looks blurred and paints once per frame of
   the (transform-only) drift animation. */

.as-blob {
  position: absolute;
  inset: -18%;
  opacity: 0.8;
  will-change: transform;
}

.as-blob--deep {
  background:
    radial-gradient(42% 36% at 22% 58%, rgba(65, 118, 230, 0.16) 0%, rgba(65, 118, 230, 0.06) 42%, transparent 72%),
    radial-gradient(30% 26% at 64% 80%, rgba(65, 118, 230, 0.1) 0%, transparent 70%);
  animation: blob-drift-a 46s var(--ease-breathe) infinite alternate;
}

.as-blob--sky {
  background:
    radial-gradient(46% 38% at 78% 26%, rgba(103, 158, 254, 0.17) 0%, rgba(103, 158, 254, 0.06) 44%, transparent 74%),
    radial-gradient(30% 24% at 42% 10%, rgba(103, 158, 254, 0.1) 0%, transparent 70%);
  animation: blob-drift-b 58s var(--ease-breathe) infinite alternate;
  animation-delay: -16s;
}

.as-blob--navy {
  background:
    radial-gradient(40% 32% at 60% 68%, rgba(86, 134, 254, 0.14) 0%, rgba(86, 134, 254, 0.05) 44%, transparent 74%),
    radial-gradient(28% 22% at 88% 46%, rgba(86, 134, 254, 0.08) 0%, transparent 70%);
  animation: blob-drift-c 66s var(--ease-breathe) infinite alternate;
  animation-delay: -30s;
}

.as-blob--cyan {
  background:
    radial-gradient(32% 26% at 16% 22%, rgba(125, 244, 232, 0.09) 0%, rgba(125, 244, 232, 0.03) 46%, transparent 74%),
    radial-gradient(24% 20% at 34% 88%, rgba(125, 244, 232, 0.05) 0%, transparent 70%);
  animation: blob-drift-a 52s var(--ease-breathe) infinite alternate;
  animation-delay: -38s;
}

.as-blob--violet {
  background:
    radial-gradient(30% 24% at 50% 40%, rgba(167, 155, 255, 0.08) 0%, rgba(167, 155, 255, 0.03) 48%, transparent 74%);
  animation: blob-drift-b 70s var(--ease-breathe) infinite alternate;
  animation-delay: -22s;
}

@keyframes blob-drift-a {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(3%, -2.4%) scale(1.08); }
  66%  { transform: translate(-2.6%, 2%) scale(0.95); }
  100% { transform: translate(1.6%, -1.2%) scale(1.04); }
}

@keyframes blob-drift-b {
  0%   { transform: translate(0, 0) scale(1.02); }
  50%  { transform: translate(-3.4%, 2.2%) scale(1.1); }
  100% { transform: translate(2.2%, -2.8%) scale(0.94); }
}

@keyframes blob-drift-c {
  0%   { transform: translate(0, 0) scale(1.05); }
  100% { transform: translate(2.8%, 1.6%) scale(0.95); }
}

/* ===== Glow orb: screen-blended DeepSeek-blue core behind the hero =====
   Soft radial falloff instead of filter:blur — same glow, zero blur cost. */

.as-orb {
  position: absolute;
  top: -14%;
  right: -8%;
  width: min(820px, 90vw);
  height: min(820px, 90vw);
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(86, 134, 254, 0.28) 0%, rgba(65, 118, 230, 0.14) 34%, transparent 72%),
    radial-gradient(circle, rgba(103, 158, 254, 0.2) 0%, rgba(86, 134, 254, 0.1) 30%, transparent 70%);
  mix-blend-mode: screen;
  opacity: 0.8;
  animation: orb-breathe 12s var(--ease-breathe) infinite alternate;
  will-change: transform, opacity;
}

@keyframes orb-breathe {
  from {
    transform: translate(0, 0) scale(1);
    opacity: 0.75;
  }
  to {
    transform: translate(-3%, 2%) scale(1.06);
    opacity: 0.95;
  }
}

/* ===== Particle canvas ===== */

.as-particles {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* ===== Reduced Motion ===== */

@media (prefers-reduced-motion: reduce) {
  .as-blob,
  .as-orb {
    animation: none;
    opacity: 0.75;
  }
  .as-grid {
    display: none;
  }
}

/* ===== Perf tier: static blobs (blur kept — rasterized once, free) ===== */

@media (max-width: 767px), (hover: none) and (pointer: coarse) {
  .as-blob,
  .as-orb {
    animation: none;
  }
  .as-grid {
    background-size: 110px 110px;
  }
}
</style>
