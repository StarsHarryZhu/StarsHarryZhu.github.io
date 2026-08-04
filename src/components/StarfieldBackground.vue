<template>
  <div class="starfield" aria-hidden="true">
    <!-- Nebula glows with drift -->
    <div
      class="starfield-nebula"
      :style="{ '--drift-x': nebulaX + 'px', '--drift-y': nebulaY + 'px' }"
    >
      <div class="starfield-nebula-inner"></div>
    </div>

    <!-- Deep/Mid star field via CSS gradients -->
    <div class="starfield-deep"></div>
    <div class="starfield-twinkle"></div>

    <!-- Near field: JS-generated twinkling stars -->
    <div ref="nearFieldRef" class="starfield-near"></div>

    <!-- Shooting stars -->
    <div class="shooting-star shooting-star--a"></div>
    <div class="shooting-star shooting-star--b"></div>
  </div>
</template>

<script setup>
import { computed, useTemplateRef, onMounted } from 'vue'
import { useParallax } from '@/composables/useParallax'

const { mouseX, mouseY } = useParallax()
const nearFieldRef = useTemplateRef('nearFieldRef')

const nebulaX = computed(() => (mouseX.value * 8).toFixed(1))
const nebulaY = computed(() => (mouseY.value * 6).toFixed(1))

const NEAR_STAR_COUNT = 22

onMounted(() => {
  const container = nearFieldRef.value
  if (!container) return

  const frag = document.createDocumentFragment()
  for (let i = 0; i < NEAR_STAR_COUNT; i++) {
    const star = document.createElement('div')
    const left = Math.random() * 100
    const top = Math.random() * 100
    const size = 1.5 + Math.random() * 2
    const delay = Math.random() * 4

    star.className = 'near-star'
    star.style.cssText = `
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: ${size}px;
      animation-delay: ${delay}s;
      animation-duration: ${2.5 + Math.random() * 3.5}s;
    `
    frag.appendChild(star)
  }
  container.appendChild(frag)
})
</script>

<style scoped>
.starfield {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

/* ===== Nebula: drift animation + parallax outer ===== */
.starfield-nebula {
  position: absolute;
  inset: 0;
  transform: translate(var(--drift-x), var(--drift-y));
  will-change: transform;
}

.starfield-nebula-inner {
  position: absolute;
  inset: -10%;
  background:
    radial-gradient(ellipse 600px 320px at 22% 58%, rgba(40, 85, 170, 0.11), transparent 70%),
    radial-gradient(ellipse 520px 280px at 78% 32%, rgba(30, 65, 150, 0.09), transparent 70%),
    radial-gradient(ellipse 440px 220px at 52% 78%, rgba(55, 75, 140, 0.07), transparent 70%);
  animation: nebula-drift 30s ease-in-out infinite alternate;
}

@keyframes nebula-drift {
  0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
  33% { transform: translate(22px, -12px) scale(1.05); opacity: 1; }
  66% { transform: translate(-14px, 16px) scale(0.96); opacity: 0.75; }
  100% { transform: translate(10px, -8px) scale(1.03); opacity: 0.9; }
}

/* ===== Deep Field: CSS radial-gradient stars ===== */
.starfield-deep {
  position: absolute;
  inset: -10%;
  background:
    /* bright stars — 2px */
    radial-gradient(2px 2px at 10% 15%, rgba(255,255,255,0.88), transparent),
    radial-gradient(2px 2px at 26% 7%, rgba(255,255,255,0.72), transparent),
    radial-gradient(2px 2px at 44% 21%, rgba(255,255,255,0.82), transparent),
    radial-gradient(2px 2px at 67% 13%, rgba(255,255,255,0.64), transparent),
    radial-gradient(2px 2px at 84% 19%, rgba(255,255,255,0.86), transparent),
    radial-gradient(2px 2px at 14% 32%, rgba(255,255,255,0.74), transparent),
    radial-gradient(2px 2px at 56% 36%, rgba(255,255,255,0.9), transparent),
    radial-gradient(2px 2px at 77% 27%, rgba(255,255,255,0.56), transparent),
    radial-gradient(2px 2px at 37% 47%, rgba(255,255,255,0.68), transparent),
    radial-gradient(2px 2px at 91% 42%, rgba(255,255,255,0.78), transparent),
    radial-gradient(2px 2px at 6% 56%, rgba(255,255,255,0.62), transparent),
    radial-gradient(2px 2px at 42% 64%, rgba(255,255,255,0.84), transparent),
    radial-gradient(2px 2px at 72% 53%, rgba(255,255,255,0.52), transparent),
    radial-gradient(2px 2px at 89% 67%, rgba(255,255,255,0.74), transparent),
    radial-gradient(2px 2px at 28% 77%, rgba(255,255,255,0.66), transparent),
    radial-gradient(2px 2px at 63% 82%, rgba(255,255,255,0.58), transparent),
    /* medium stars — 1.5px */
    radial-gradient(1.5px 1.5px at 19% 24%, rgba(255,255,255,0.58), transparent),
    radial-gradient(1.5px 1.5px at 33% 4%, rgba(255,255,255,0.48), transparent),
    radial-gradient(1.5px 1.5px at 51% 12%, rgba(255,255,255,0.64), transparent),
    radial-gradient(1.5px 1.5px at 79% 6%, rgba(255,255,255,0.52), transparent),
    radial-gradient(1.5px 1.5px at 94% 14%, rgba(255,255,255,0.58), transparent),
    radial-gradient(1.5px 1.5px at 8% 44%, rgba(255,255,255,0.48), transparent),
    radial-gradient(1.5px 1.5px at 23% 40%, rgba(255,255,255,0.62), transparent),
    radial-gradient(1.5px 1.5px at 47% 26%, rgba(255,255,255,0.54), transparent),
    radial-gradient(1.5px 1.5px at 64% 44%, rgba(255,255,255,0.58), transparent),
    radial-gradient(1.5px 1.5px at 83% 37%, rgba(255,255,255,0.44), transparent),
    radial-gradient(1.5px 1.5px at 13% 70%, rgba(255,255,255,0.54), transparent),
    radial-gradient(1.5px 1.5px at 59% 49%, rgba(255,255,255,0.62), transparent),
    radial-gradient(1.5px 1.5px at 75% 52%, rgba(255,255,255,0.48), transparent),
    radial-gradient(1.5px 1.5px at 27% 60%, rgba(255,255,255,0.58), transparent),
    radial-gradient(1.5px 1.5px at 48% 74%, rgba(255,255,255,0.54), transparent),
    radial-gradient(1.5px 1.5px at 69% 66%, rgba(255,255,255,0.44), transparent),
    radial-gradient(1.5px 1.5px at 87% 76%, rgba(255,255,255,0.58), transparent),
    radial-gradient(1.5px 1.5px at 16% 87%, rgba(255,255,255,0.48), transparent),
    radial-gradient(1.5px 1.5px at 44% 84%, rgba(255,255,255,0.54), transparent),
    radial-gradient(1.5px 1.5px at 62% 78%, rgba(255,255,255,0.62), transparent),
    /* dim stars — 1px */
    radial-gradient(1px 1px at 5% 12%, rgba(255,255,255,0.38), transparent),
    radial-gradient(1px 1px at 39% 2%, rgba(255,255,255,0.42), transparent),
    radial-gradient(1px 1px at 62% 8%, rgba(255,255,255,0.34), transparent),
    radial-gradient(1px 1px at 82% 3%, rgba(255,255,255,0.46), transparent),
    radial-gradient(1px 1px at 96% 7%, rgba(255,255,255,0.38), transparent),
    radial-gradient(1px 1px at 11% 27%, rgba(255,255,255,0.42), transparent),
    radial-gradient(1px 1px at 31% 16%, rgba(255,255,255,0.34), transparent),
    radial-gradient(1px 1px at 57% 24%, rgba(255,255,255,0.46), transparent),
    radial-gradient(1px 1px at 74% 14%, rgba(255,255,255,0.38), transparent),
    radial-gradient(1px 1px at 21% 51%, rgba(255,255,255,0.42), transparent),
    radial-gradient(1px 1px at 44% 36%, rgba(255,255,255,0.34), transparent),
    radial-gradient(1px 1px at 66% 34%, rgba(255,255,255,0.46), transparent),
    radial-gradient(1px 1px at 3% 74%, rgba(255,255,255,0.38), transparent),
    radial-gradient(1px 1px at 34% 66%, rgba(255,255,255,0.42), transparent),
    radial-gradient(1px 1px at 54% 62%, rgba(255,255,255,0.34), transparent),
    radial-gradient(1px 1px at 76% 74%, rgba(255,255,255,0.46), transparent),
    radial-gradient(1px 1px at 46% 92%, rgba(255,255,255,0.38), transparent),
    radial-gradient(1px 1px at 68% 88%, rgba(255,255,255,0.42), transparent),
    radial-gradient(1px 1px at 92% 53%, rgba(255,255,255,0.34), transparent),
    radial-gradient(1px 1px at 24% 94%, rgba(255,255,255,0.46), transparent),
    /* base gradient */
    linear-gradient(160deg, var(--color-void-950) 0%, #060e24 50%, #030c1a 100%);
}

/* ===== Twinkling overlay ===== */
.starfield-twinkle {
  position: absolute;
  inset: -10%;
  animation: twinkle 4s ease-in-out infinite alternate;
  background:
    radial-gradient(2px 2px at 10% 15%, rgba(255,255,255,0.88), transparent),
    radial-gradient(2px 2px at 44% 21%, rgba(255,255,255,0.82), transparent),
    radial-gradient(2px 2px at 84% 19%, rgba(255,255,255,0.86), transparent),
    radial-gradient(2px 2px at 56% 36%, rgba(255,255,255,0.9), transparent),
    radial-gradient(2px 2px at 91% 42%, rgba(255,255,255,0.78), transparent),
    radial-gradient(2px 2px at 42% 64%, rgba(255,255,255,0.84), transparent),
    radial-gradient(2px 2px at 89% 67%, rgba(255,255,255,0.74), transparent),
    radial-gradient(1.5px 1.5px at 51% 12%, rgba(255,255,255,0.64), transparent),
    radial-gradient(1.5px 1.5px at 23% 40%, rgba(255,255,255,0.62), transparent),
    radial-gradient(1.5px 1.5px at 59% 49%, rgba(255,255,255,0.62), transparent),
    radial-gradient(1.5px 1.5px at 87% 76%, rgba(255,255,255,0.58), transparent),
    radial-gradient(1.5px 1.5px at 62% 78%, rgba(255,255,255,0.62), transparent);
}

@keyframes twinkle {
  0% { opacity: 0.35; }
  100% { opacity: 1; }
}

/* ===== Near Field: JS-generated twinkling stars ===== */
.starfield-near {
  position: absolute;
  inset: -10%;
}

:deep(.near-star) {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 6px rgba(178, 210, 255, 0.5);
  animation: near-twinkle 3s ease-in-out infinite alternate;
}

@keyframes near-twinkle {
  0% { opacity: 0.2; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}

/* ===== Shooting Stars ===== */

.shooting-star {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  height: 2px;
  border-radius: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5) 20%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0.5) 80%,
    transparent
  );
  box-shadow: 0 0 6px rgba(180, 210, 255, 0.4);
  opacity: 0;
}

.shooting-star--a {
  width: 180px;
  top: 12%;
  left: 100%;
  animation: shoot-a 8s ease-in infinite 4s;
}

.shooting-star--b {
  width: 140px;
  top: 20%;
  left: 100%;
  animation: shoot-b 11s ease-in infinite 2s;
}

@keyframes shoot-a {
  0% {
    transform: translate(0, 0) rotate(-32deg);
    opacity: 0;
  }
  2% { opacity: 1; }
  5% {
    opacity: 0;
    transform: translate(-130vw, 70vh) rotate(-32deg);
  }
  100% {
    opacity: 0;
    transform: translate(-130vw, 70vh) rotate(-32deg);
  }
}

@keyframes shoot-b {
  0% {
    transform: translate(0, 0) rotate(-42deg);
    opacity: 0;
  }
  2% { opacity: 0.8; }
  4.5% {
    opacity: 0;
    transform: translate(-110vw, 55vh) rotate(-42deg);
  }
  100% {
    opacity: 0;
    transform: translate(-110vw, 55vh) rotate(-42deg);
  }
}

/* ===== Reduced Motion ===== */

@media (prefers-reduced-motion: reduce) {
  .starfield-twinkle,
  .starfield-nebula {
    animation: none;
  }
  .shooting-star {
    display: none;
  }
  :deep(.near-star) {
    animation: none;
    opacity: 0.6;
  }
}
</style>
