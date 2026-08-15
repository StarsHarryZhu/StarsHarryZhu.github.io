<template>
  <AeroSky />

  <!-- Pointer light wash: composited glow tile that follows the cursor.
       The gradient is static (460px radius at 50% 50%); only transform
       changes per move — no full-screen background repaint. -->
  <div
    class="cursor-glow"
    aria-hidden="true"
    :style="{
      transform: `translate3d(calc(${glowX}vw - 460px), calc(${glowY}vh - 460px), 0)`,
    }"
  ></div>

  <GlassNav />

  <main id="content" class="page-shell" tabindex="-1">
    <a href="#content" class="skip-link" @click.prevent="skipToContent">Skip to content</a>

    <Hero
      :avatar="avatarImageSet.webp"
      :avatar2x="avatarImageSet.webp2x"
      :avatarFallback="avatarImageSet.fallback"
      :title="profile.title"
      :subtitle="profile.subtitle"
      :bio="profile.bios[0]"
    />

    <div class="sections">
      <About
        :bios="profile.bios"
        :contacts="contacts"
        :focus-areas="focusAreas"
        :note="aboutNote"
      />

      <Experience :items="timeline" />

      <Projects :items="projects" />

      <div class="split">
        <Toolkit :categories="skillCategories" />
        <Education :items="education" />
      </div>

      <Contact :items="contacts" />

      <Footer :items="footerItems" />
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import {
  profile,
  skillCategories,
  projects,
  timeline,
  education,
  contacts,
  footerItems,
  avatarImageSet,
} from '@/data/site-data.js'

import About from '@/components/About.vue'
import AeroSky from '@/components/AeroSky.vue'
import Contact from '@/components/Contact.vue'
import Education from '@/components/Education.vue'
import Experience from '@/components/Experience.vue'
import Footer from '@/components/Footer.vue'
import GlassNav from '@/components/GlassNav.vue'
import Hero from '@/components/Hero.vue'
import Projects from '@/components/Projects.vue'
import Toolkit from '@/components/Toolkit.vue'
import { useParallax } from '@/composables/useParallax'

// Shared normalized pointer in [-1, 1]. refs stay 0 on touch / reduced-motion.
const { mouseX, mouseY } = useParallax()

const glowX = computed(() => `${(mouseX.value * 0.5 + 0.5) * 100}`)
const glowY = computed(() => `${(mouseY.value * 0.5 + 0.5) * 100}`)

const focusAreas = [
  'Computer Vision',
  'Robotics & Control',
  'Systems Programming',
]

const aboutNote = 'Currently building vision-guided robotic systems — from YOLO detection to TensorRT-accelerated real-time control loops.'

function skipToContent() {
  document.getElementById('content')?.focus()
}
</script>

<style scoped>
.page-shell {
  position: relative;
  z-index: var(--z-panel);
  display: grid;
  justify-items: stretch;
  width: 100%;
  max-width: var(--content-width);
  margin-inline: auto;
  padding: var(--shell-pad);
}

.page-shell > * {
  min-width: 0;
  width: 100%;
}

/* Sections stack with generous air between them */
.sections {
  display: grid;
  gap: var(--section-gap);
  width: 100%;
  padding-top: 2rem;
}

/* Skip rendering off-screen sections (content-visibility) — biggest
   single win for scroll perf on long pages. contain-intrinsic-BLOCK-
   size reserves only height (a width fallback would overflow mobile). */
.sections > * {
  content-visibility: auto;
  contain-intrinsic-block-size: auto 720px;
}

/* Toolkit + Education side-by-side on wide screens */
.split {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
  gap: 16px;
  align-items: start;
}

@media (max-width: 860px) {
  .split {
    grid-template-columns: 1fr;
  }
}

/* ===== Pointer light wash (fine pointers only — touch has no cursor) ===== */

@media (hover: hover) and (pointer: fine) {
  .cursor-glow {
    position: fixed;
    top: 0;
    left: 0;
    width: 920px;
    height: 920px;
    z-index: var(--z-wash);
    pointer-events: none;
    background:
      radial-gradient(
        460px circle at 50% 50%,
        rgba(125, 244, 232, 0.04) 0%,
        rgba(103, 158, 254, 0.05) 38%,
        transparent 72%
      );
    opacity: 0.6;
    will-change: transform;
    transition: opacity 0.4s var(--ease-breathe);
  }
}

/* ===== Skip link ===== */

.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: var(--z-skip);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-1);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
  border-radius: 0 0 var(--radius-md) 0;
  text-decoration: none;
  font-size: var(--text-xs);
  font-weight: 600;
}

.skip-link:focus {
  top: 0;
}

/* ===== Reduced Motion ===== */

@media (prefers-reduced-motion: reduce) {
  .cursor-glow {
    display: none;
  }
}

/* ===== Print ===== */

@media print {
  .page-shell {
    background: white !important;
    padding: 1rem;
  }
  .sections {
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }
  .split {
    grid-template-columns: 1fr;
  }
  .skip-link,
  .cursor-glow {
    display: none;
  }
}
</style>
