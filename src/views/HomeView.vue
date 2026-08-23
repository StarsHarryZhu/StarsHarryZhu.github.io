<template>
  <AeroSky />

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
      :name="profile.name"
      :meta="profile.meta"
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

/* ===== Skip link ===== */

.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: var(--z-skip);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-1);
  color: var(--text-primary);
  border: 1px solid var(--border-l2);
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
  .skip-link {
    display: none;
  }
}
</style>
