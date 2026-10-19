<script setup>
import { useTemplateRef, watch } from 'vue'
import { profile, contacts, education, avatarImageSet } from '@/data/site-data.js'
import { projects } from '@/data/projects.js'
import { timeline } from '@/data/experience.js'
import { skillGroups } from '@/data/skills.js'
import { useI18n } from '@/i18n/index.js'
import { usePointerLight } from '@/composables/usePointerLight.js'

import Footer from '@/components/layout/Footer.vue'
import GasLayer from '@/components/layout/GasLayer.vue'
import Sky from '@/components/layout/Sky.vue'
import TopBar from '@/components/layout/TopBar.vue'
import About from '@/components/sections/About.vue'
import Contact from '@/components/sections/Contact.vue'
import Education from '@/components/sections/Education.vue'
import Experience from '@/components/sections/Experience.vue'
import Hero from '@/components/sections/Hero.vue'
import Projects from '@/components/sections/Projects.vue'
import Toolkit from '@/components/sections/Toolkit.vue'

const { locale } = useI18n()
const shell = useTemplateRef('shell')

usePointerLight()

// A language switch is an action: the new text condenses in (opacity only).
watch(locale, () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  shell.value?.animate([{ opacity: 0.25 }, { opacity: 1 }], {
    duration: 460,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  })
})
</script>

<template>
  <Sky />
  <GasLayer />
  <TopBar />

  <main ref="shell" class="page-shell">
    <Hero
      :avatar="avatarImageSet.webp"
      :avatar2x="avatarImageSet.webp2x"
      :avatar-fallback="avatarImageSet.fallback"
      :title="profile.title"
      :subtitle="profile.subtitle"
      :bio="profile.bios[0]"
      :name="profile.name"
      :meta="profile.meta"
      :focus="profile.focus"
    />

    <div class="sections">
      <About
        :bios="profile.bios"
        :contacts="contacts"
        :focus-areas="profile.focus"
        :note="profile.note"
      />

      <Experience :items="timeline" />

      <Projects :items="projects" />

      <div class="split">
        <Toolkit :groups="skillGroups" />
        <Education :items="education" />
      </div>

      <Contact :items="contacts" />

      <Footer />
    </div>
  </main>
</template>

<style scoped>
.page-shell {
  position: relative;
  z-index: var(--z-page);
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

/* breathing room between sections */
.sections {
  display: grid;
  gap: var(--section-gap);
  width: 100%;
  padding-top: clamp(1rem, 4vh, 2.5rem);
}

/* Off-screen sections skip rendering (the scrolling panels use no
   backdrop-filter, so this is safe). Placeholder heights are measured per
   section: one constant makes the total height grow then shrink and the
   scrollbar jump; `auto` remembers the real size once rendered. */
.sections > * {
  content-visibility: auto;
}

.sections > *:nth-child(1) { contain-intrinsic-block-size: auto 422px; }
.sections > *:nth-child(2) { contain-intrinsic-block-size: auto 774px; }
.sections > *:nth-child(3) { contain-intrinsic-block-size: auto 1776px; }
.sections > *:nth-child(4) { contain-intrinsic-block-size: auto 448px; }
.sections > *:nth-child(5) { contain-intrinsic-block-size: auto 282px; }
.sections > *:nth-child(6) { contain-intrinsic-block-size: auto 117px; }

/* Toolkit + Education: side by side when wide, stacked when narrow */
.split {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
  gap: 16px;
  align-items: start;
}

@media (max-width: 860px) {
  .split {
    grid-template-columns: 1fr;
  }
}

/* ===== Print ===== */

@media print {
  .page-shell {
    background: white !important;
    padding: 1rem;
  }
  .sections {
    gap: 1rem;
  }
  .split {
    grid-template-columns: 1fr;
  }
}
</style>
