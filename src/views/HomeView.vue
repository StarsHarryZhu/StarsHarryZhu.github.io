<template>
  <StarfieldBackground />

  <!-- Pointer light wash: a faint aurora glow that follows the cursor -->
  <div
    class="cursor-glow"
    aria-hidden="true"
    :style="{ '--glow-x': glowX, '--glow-y': glowY }"
  ></div>

  <main id="content" class="page-shell" tabindex="-1">
    <a href="#content" class="skip-link" @click.prevent="skipToContent">Skip to content</a>

    <!-- Floating constellation panels: each section drifts at its own depth -->
    <div class="pane pane--hero" :style="heroStyle">
      <Hero
        :avatar="avatarImageSet.webp"
        :avatar2x="avatarImageSet.webp2x"
        :avatarFallback="avatarImageSet.fallback"
        :title="profile.title"
        :subtitle="profile.subtitle"
      />
    </div>

    <div class="pane pane--intro" :style="introStyle">
      <Intro title="Profile" :bios="profile.bios" />
    </div>

    <div class="pane pane--timeline" :style="timelineStyle">
      <Timeline :items="timeline" />
    </div>

    <div class="pane pane--education" :style="educationStyle">
      <Education :items="education" />
    </div>

    <div class="pane pane--skills" :style="skillsStyle">
      <Skills :categories="skillCategories" />
    </div>

    <div class="pane pane--projects" :style="projectsStyle">
      <Projects :items="projects" />
    </div>

    <div class="pane pane--contacts" :style="contactsStyle">
      <Contacts :items="contacts" />
    </div>

    <Footer :items="footerItems" />
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

import Contacts from '@/components/Contacts.vue'
import Education from '@/components/Education.vue'
import Footer from '@/components/Footer.vue'
import Hero from '@/components/Hero.vue'
import Intro from '@/components/Intro.vue'
import Projects from '@/components/Projects.vue'
import Skills from '@/components/Skills.vue'
import StarfieldBackground from '@/components/StarfieldBackground.vue'
import Timeline from '@/components/Timeline.vue'
import { useParallax } from '@/composables/useParallax'

// Shared normalized pointer in [-1, 1]. refs stay 0 on touch / reduced-motion.
const { mouseX, mouseY } = useParallax()

const glowX = computed(() => `${(mouseX.value * 0.5 + 0.5) * 100}%`)
const glowY = computed(() => `${(mouseY.value * 0.5 + 0.5) * 100}%`)

// Per-panel parallax depth (px): nearer content drifts more with the pointer.
function paneStyle(depth) {
  return computed(() => ({
    transform: `translate3d(${(mouseX.value * depth).toFixed(2)}px, ${(mouseY.value * depth).toFixed(2)}px, 0)`,
  }))
}

const heroStyle = paneStyle(6)
const introStyle = paneStyle(10)
const timelineStyle = paneStyle(4)
const educationStyle = paneStyle(12)
const skillsStyle = paneStyle(8)
const projectsStyle = paneStyle(5)
const contactsStyle = paneStyle(14)

function skipToContent() {
  document.getElementById('content')?.focus()
}
</script>

<style scoped>
.page-shell {
  position: relative;
  z-index: var(--z-panel);
  display: grid;
  justify-items: center;
  width: 100%;
  max-width: var(--content-width);
  margin-inline: auto;
  padding: var(--shell-pad);
  gap: var(--section-gap);
}

/* ===== Constellation panes ===== */

.pane {
  width: 100%;
}

/* Parallax layers only on precise pointers (touch has no hover parallax). */
@media (hover: hover) and (pointer: fine) {
  .pane {
    will-change: transform;
  }
}

@media (min-width: 960px) {
  .pane--intro,
  .pane--contacts {
    width: 62%;
    margin-inline-start: 6%;
  }
  .pane--contacts {
    width: 60%;
  }
  .pane--education {
    width: 72%;
  }
}

/* ===== Pointer light wash (fine pointers only — touch has no cursor) ===== */

@media (hover: hover) and (pointer: fine) {
  .cursor-glow {
    position: fixed;
    inset: 0;
    z-index: var(--z-wash);
    pointer-events: none;
    background:
      radial-gradient(
        480px circle at var(--glow-x, 50%) var(--glow-y, 50%),
        rgba(110, 170, 255, 0.06) 0%,
        rgba(155, 139, 255, 0.035) 40%,
        transparent 72%
      );
    opacity: 0.5;
  }
}

/* ===== Skip link ===== */

.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: var(--z-skip);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-base-1);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
  border-radius: 0 0 var(--radius-md) 0;
  text-decoration: none;
  font-size: var(--text-xs);
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
    justify-items: start;
    padding: 1rem;
    gap: 1.2rem;
  }
  .pane {
    transform: none !important;
  }
  .skip-link,
  .cursor-glow {
    display: none;
  }
}
</style>
