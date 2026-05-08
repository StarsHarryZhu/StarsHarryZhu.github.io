<template>
  <main class="page-shell">
    <a href="#home-card" class="skip-link">Skip to content</a>

    <article id="home-card" :class="['home-card', { 'is-ready': isReady }]">
      <Hero
        class="block"
        style="--delay: 100ms"
        :avatar="avatarImage"
        :title="profile.title"
        :subtitle="profile.subtitle"
      />

      <Intro class="block intro-block" style="--delay: 170ms" :bios="profile.bios" />

      <Skills class="block" style="--delay: 240ms" :items="skills" />

      <Projects class="block" style="--delay: 310ms" :items="projects" />

      <Contacts class="block" style="--delay: 380ms" :items="contacts" />

      <Footer class="block" style="--delay: 450ms" :items="footerItems" />
    </article>

    <div class="shooting-star" aria-hidden="true"></div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { profile, skills, projects, contacts, footerItems, avatarImage } from '@/data/site-data.js'

import Contacts from '@/components/Contacts.vue'
import Footer from '@/components/Footer.vue'
import Hero from '@/components/Hero.vue'
import Intro from '@/components/Intro.vue'
import Projects from '@/components/Projects.vue'
import Skills from '@/components/Skills.vue'

const isReady = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isReady.value = true
  })
})
</script>

<style scoped>
/* ===== Global Resets ===== */

:global(*) {
  box-sizing: border-box;
}

:global(html),
:global(body),
:global(#app) {
  min-height: 100%;
  background-color: #020618;
}

:global(body) {
  margin: 0;
  overflow-x: hidden;
  overscroll-behavior-y: none;
}

/* ===== CSS Custom Properties ===== */

.page-shell {
  --shell-pad: clamp(0.45rem, 1.4vw, 1.15rem);
  --bg-deep: #020618;
  --bg-ink: #0a1030;
  --card-bg: rgba(8, 14, 32, 0.75);
  --card-border: rgba(100, 160, 220, 0.28);
  --text-main: #e8f0fe;
  --text-muted: #94a9c9;
  --chip-bg: rgba(73, 138, 190, 0.16);
  --chip-border: rgba(126, 194, 246, 0.44);
  --link-bg: rgba(59, 142, 227, 0.2);
  --accent: #6db3f0;
  --font-display: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  --font-body: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  --shadow-card: 0 30px 80px rgba(2, 7, 17, 0.67);

  position: relative;
  min-height: 100dvh;
  padding: var(--shell-pad);
  display: grid;
  place-items: center;
  overflow: hidden;
  color: var(--text-main);
  font-family: var(--font-body);
}

/* ===== Starfield Background ===== */

.page-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    /* nebula glows */
    radial-gradient(ellipse 600px 300px at 20% 60%, rgba(40, 80, 160, 0.10), transparent),
    radial-gradient(ellipse 500px 250px at 80% 30%, rgba(30, 60, 140, 0.08), transparent),
    radial-gradient(ellipse 400px 200px at 50% 80%, rgba(50, 70, 130, 0.06), transparent),
    /* bright stars — 2px */
    radial-gradient(2px 2px at 10% 15%, rgba(255,255,255,0.9), transparent),
    radial-gradient(2px 2px at 25% 8%, rgba(255,255,255,0.7), transparent),
    radial-gradient(2px 2px at 45% 20%, rgba(255,255,255,0.8), transparent),
    radial-gradient(2px 2px at 65% 12%, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 85% 18%, rgba(255,255,255,0.85), transparent),
    radial-gradient(2px 2px at 15% 30%, rgba(255,255,255,0.7), transparent),
    radial-gradient(2px 2px at 55% 35%, rgba(255,255,255,0.9), transparent),
    radial-gradient(2px 2px at 75% 28%, rgba(255,255,255,0.55), transparent),
    radial-gradient(2px 2px at 35% 45%, rgba(255,255,255,0.65), transparent),
    radial-gradient(2px 2px at 92% 40%, rgba(255,255,255,0.75), transparent),
    radial-gradient(2px 2px at 8% 55%, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 40% 62%, rgba(255,255,255,0.8), transparent),
    radial-gradient(2px 2px at 70% 55%, rgba(255,255,255,0.5), transparent),
    radial-gradient(2px 2px at 88% 65%, rgba(255,255,255,0.7), transparent),
    radial-gradient(2px 2px at 30% 75%, rgba(255,255,255,0.65), transparent),
    /* medium stars — 1.5px */
    radial-gradient(1.5px 1.5px at 18% 22%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 32% 5%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1.5px 1.5px at 52% 10%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1.5px 1.5px at 78% 8%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1.5px 1.5px at 95% 12%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 5% 42%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1.5px 1.5px at 22% 38%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1.5px 1.5px at 48% 28%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1.5px 1.5px at 62% 42%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 82% 35%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1.5px 1.5px at 12% 68%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1.5px 1.5px at 58% 48%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1.5px 1.5px at 76% 50%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1.5px 1.5px at 25% 58%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 50% 72%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1.5px 1.5px at 68% 68%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1.5px 1.5px at 85% 78%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 15% 85%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1.5px 1.5px at 42% 82%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1.5px 1.5px at 60% 80%, rgba(255,255,255,0.6), transparent),
    /* dim stars — 1px */
    radial-gradient(1px 1px at 7% 10%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 38% 3%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 60% 6%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 80% 4%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 93% 8%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 12% 25%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 30% 18%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 58% 22%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 72% 16%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 20% 48%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 42% 38%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 68% 32%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 5% 72%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 32% 68%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 55% 60%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 78% 72%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 45% 90%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 70% 85%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 90% 55%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 22% 92%, rgba(255,255,255,0.45), transparent),
    /* base gradient */
    linear-gradient(160deg, #020618 0%, #0a1030 50%, #060d24 100%);
}

/* twinkling stars layer */
.page-shell::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  animation: twinkle 4s ease-in-out infinite alternate;
  background:
    radial-gradient(2px 2px at 10% 15%, rgba(255,255,255,0.9), transparent),
    radial-gradient(2px 2px at 45% 20%, rgba(255,255,255,0.8), transparent),
    radial-gradient(2px 2px at 85% 18%, rgba(255,255,255,0.85), transparent),
    radial-gradient(2px 2px at 55% 35%, rgba(255,255,255,0.9), transparent),
    radial-gradient(2px 2px at 92% 40%, rgba(255,255,255,0.75), transparent),
    radial-gradient(2px 2px at 40% 62%, rgba(255,255,255,0.8), transparent),
    radial-gradient(2px 2px at 88% 65%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1.5px 1.5px at 52% 10%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1.5px 1.5px at 22% 38%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1.5px 1.5px at 58% 48%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1.5px 1.5px at 85% 78%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 60% 80%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 80% 4%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 58% 22%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 68% 32%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 78% 72%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 22% 92%, rgba(255,255,255,0.45), transparent);
}

@keyframes twinkle {
  0% { opacity: 0.4; }
  100% { opacity: 1; }
}

/* shooting star */
.shooting-star {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  top: 15%;
  left: 100%;
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), rgba(255,255,255,0.9), rgba(255,255,255,0.6), transparent);
  border-radius: 1px;
  filter: blur(0.5px);
  animation: shoot 8s ease-in infinite 5s;
}

@keyframes shoot {
  0% {
    transform: translate(0, 0) rotate(-30deg);
    opacity: 0;
  }
  3% { opacity: 0.9; }
  6% {
    opacity: 0;
    transform: translate(-120vw, 60vh) rotate(-30deg);
  }
  100% {
    opacity: 0;
    transform: translate(-120vw, 60vh) rotate(-30deg);
  }
}

/* ===== Skip Link ===== */

.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: #020618;
  color: var(--text-main);
  border: 1px solid var(--card-border);
  border-radius: 0 0 8px 0;
  text-decoration: none;
  font-size: 0.8rem;
}

.skip-link:focus {
  top: 0;
}

/* ===== Home Card ===== */

.home-card {
  position: relative;
  z-index: 2;
  width: min(1100px, 100%);
  min-height: calc(100dvh - (var(--shell-pad) * 2) - 4px);
  padding: clamp(1.2rem, 2.8vw, 2.4rem);
  border-radius: 28px;
  border: 1px solid var(--card-border);
  outline: 1px solid rgba(100, 160, 220, 0.08);
  outline-offset: -6px;
  background: linear-gradient(145deg, rgba(10, 19, 38, 0.88), var(--card-bg));
  backdrop-filter: blur(16px) saturate(1.1);
  box-shadow:
    var(--shadow-card),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: clamp(0.9rem, 2vw, 1.4rem);
  opacity: 0;
  transform: translateY(22px) scale(0.988);
  transition: opacity 0.58s ease, transform 0.58s ease;
}

.intro-block {
  margin-bottom: auto;
}

.home-card.is-ready {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ===== Entrance Animation ===== */

.block {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.48s ease, transform 0.48s ease;
  will-change: transform, opacity;
}

.home-card.is-ready .block {
  opacity: 1;
  transform: translateY(0);
  transition-delay: var(--delay, 0ms);
  will-change: auto;
}

/* ===== Responsive ===== */

@media (max-width: 960px) {
  .home-card {
    min-height: calc(100dvh - (var(--shell-pad) * 2) - 4px);
  }
}

@media (max-width: 700px) {
  .home-card {
    border-radius: 22px;
    padding: clamp(1rem, 4vw, 1.3rem);
    outline-offset: -4px;
  }
}

/* ===== Reduced Motion ===== */

@media (prefers-reduced-motion: reduce) {
  .home-card,
  .block {
    transition: none !important;
    opacity: 1;
    transform: none;
    will-change: auto;
  }
  .page-shell::after {
    animation: none;
  }
  .shooting-star {
    animation: none;
    display: none;
  }
}

/* ===== Print ===== */

@media print {
  :global(body) {
    background: white !important;
    overflow: visible !important;
  }
  .page-shell {
    background: white !important;
    place-items: start;
    padding: 1rem;
  }
  .page-shell::before,
  .page-shell::after {
    display: none !important;
  }
  .home-card {
    box-shadow: none !important;
    outline: none !important;
    border: 1px solid #ccc !important;
    background: white !important;
    backdrop-filter: none !important;
    opacity: 1 !important;
    transform: none !important;
    color: #222 !important;
  }
  .block {
    opacity: 1 !important;
    transform: none !important;
  }
  .copy-modal-layer,
  .shooting-star {
    display: none !important;
  }
  .skill-chip,
  .project-card,
  .contact-btn {
    break-inside: avoid;
  }
  .skip-link {
    display: none;
  }
}
</style>
