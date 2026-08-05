<template>
  <div class="starfield" aria-hidden="true">
    <!-- Base: deep-space gradient + vignette + static star-dust -->
    <div class="sf-base"></div>
    <div class="sf-dust"></div>

    <!-- Aurora veils: large radial washes that drift slowly -->
    <div class="sf-aurora sf-aurora--a"></div>
    <div class="sf-aurora sf-aurora--b"></div>
    <div class="sf-aurora sf-aurora--c"></div>

    <!-- Firefly / constellation particle field (Canvas) -->
    <canvas ref="canvasRef" class="sf-particles"></canvas>
  </div>
</template>

<script setup>
import { useTemplateRef } from 'vue'
import { useParallax } from '@/composables/useParallax'
import { useParticleField } from '@/composables/useParticleField'

const canvasRef = useTemplateRef('canvasRef')

// Normalized pointer in [-1, 1] from the shared parallax composable;
// the particle field converts it to canvas pixel coordinates internally.
const { mouseX, mouseY } = useParallax()

function getPointer() {
  if (!canvasRef.value) return null
  return { x: mouseX.value, y: mouseY.value }
}

// Mounts the singleton field; other components reach it via useParticleField().
useParticleField(() => canvasRef.value, {
  count: 150,
  connectDistance: 120,
  pointerStrength: 0.14,
  getPointer,
})
</script>

<style scoped>
.starfield {
  position: fixed;
  inset: 0;
  z-index: var(--z-bg);
  pointer-events: none;
  overflow: hidden;
}

/* ===== Base: deep-space gradient + vignette ===== */

.sf-base {
  position: absolute;
  inset: 0;
  background:
    var(--page-vignette),
    var(--page-bg);
}

/* ===== Static star-dust: 1px dots on a 240px grid ===== */

.sf-dust {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(234, 242, 255, 0.1) 1px, transparent 1px);
  background-size: 240px 240px;
  opacity: 0.05;
}

/* ===== Aurora veils: slow organic drift (HarmonyOS soft halos) ===== */

.sf-aurora {
  position: absolute;
  inset: -15%;
  filter: blur(70px);
  opacity: 0.26;
  will-change: transform;
}

.sf-aurora--a {
  background:
    radial-gradient(38% 32% at 22% 60%, rgba(125, 244, 232, 0.3), transparent 70%),
    radial-gradient(30% 26% at 72% 30%, rgba(155, 139, 255, 0.26), transparent 70%),
    radial-gradient(28% 24% at 50% 80%, rgba(111, 168, 255, 0.22), transparent 70%);
  animation: aurora-drift-a 40s var(--ease-aurora) infinite alternate;
}

.sf-aurora--b {
  background:
    radial-gradient(34% 28% at 78% 62%, rgba(111, 168, 255, 0.28), transparent 70%),
    radial-gradient(30% 26% at 30% 24%, rgba(125, 244, 232, 0.2), transparent 70%),
    radial-gradient(24% 20% at 62% 88%, rgba(90, 150, 255, 0.26), transparent 70%);
  animation: aurora-drift-b 52s var(--ease-aurora) infinite alternate;
  animation-delay: -18s;
}

.sf-aurora--c {
  background:
    radial-gradient(26% 22% at 16% 28%, rgba(155, 139, 255, 0.3), transparent 70%),
    radial-gradient(30% 26% at 84% 14%, rgba(80, 226, 214, 0.2), transparent 70%);
  animation: aurora-drift-c 60s var(--ease-aurora) infinite alternate;
  animation-delay: -32s;
}

@keyframes aurora-drift-a {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(3%, -2%) scale(1.06); }
  66%  { transform: translate(-2%, 2.5%) scale(0.96); }
  100% { transform: translate(1.5%, -1%) scale(1.03); }
}

@keyframes aurora-drift-b {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-3%, 2%) scale(1.08); }
  100% { transform: translate(2%, -2.5%) scale(0.95); }
}

@keyframes aurora-drift-c {
  0%   { transform: translate(0, 0) scale(1.04); }
  100% { transform: translate(2.5%, 1.5%) scale(0.96); }
}

/* ===== Particle canvas ===== */

.sf-particles {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* ===== Reduced Motion ===== */

@media (prefers-reduced-motion: reduce) {
  .sf-aurora {
    animation: none;
    opacity: 0.35;
  }
}
</style>
