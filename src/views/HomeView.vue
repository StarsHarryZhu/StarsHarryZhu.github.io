<script setup>
import { useTemplateRef, watch } from 'vue'
import { profile, contacts, education, avatarImageSet } from '@/data/site-data.js'
import { projects } from '@/data/projects.js'
import { timeline } from '@/data/experience.js'
import { skillGroups } from '@/data/skills.js'
import { useI18n } from '@/i18n/index.js'
import { useScrollSpy } from '@/composables/useScrollSpy.js'

import Footer from '@/components/layout/Footer.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import About from '@/components/sections/About.vue'
import Contact from '@/components/sections/Contact.vue'
import Education from '@/components/sections/Education.vue'
import Experience from '@/components/sections/Experience.vue'
import Projects from '@/components/sections/Projects.vue'
import Toolkit from '@/components/sections/Toolkit.vue'

// page order; each id is a section's element id and its `section.<id>` title
const SECTIONS = ['about', 'experience', 'projects', 'toolkit', 'education', 'contact']

const { locale, t } = useI18n()
const { active, hold } = useScrollSpy(SECTIONS)
const content = useTemplateRef('content')

// a language switch fades the new text in (opacity only)
watch(locale, () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  content.value?.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 160, easing: 'ease-out' })
})
</script>

<template>
  <a class="skip mono" href="#content">{{ t('nav.skip') }}</a>

  <div class="page">
    <Sidebar
      :profile="profile"
      :contacts="contacts"
      :avatar="avatarImageSet"
      :sections="SECTIONS"
      :active="active"
      @navigate="hold"
    />

    <main id="content" ref="content" class="content" tabindex="-1">
      <About
        class="rise"
        style="--i: 1"
        :bios="profile.bios"
        :focus-areas="profile.focus"
      />
      <Experience class="rise" style="--i: 2" :items="timeline" />
      <Projects class="rise" style="--i: 3" :items="projects" />
      <Toolkit class="rise" style="--i: 4" :groups="skillGroups" />
      <Education class="rise" style="--i: 5" :items="education" />
      <Contact class="rise" style="--i: 6" :items="contacts" />
      <Footer />
    </main>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, var(--content-width));
  justify-content: space-between;
  gap: 64px;
  max-width: var(--page-width);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.content {
  min-width: 0;
  padding-top: 96px;
  outline: none;
}

/* sections land just below the top edge when reached from the nav */
.section {
  scroll-margin-top: 64px;
}

.section + .section {
  margin-top: var(--space-section);
}

.content > :last-child {
  margin-top: var(--space-section);
}

/* hidden until focused by keyboard */
.skip {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  padding: 8px 12px;
  border-radius: var(--radius);
  background: var(--bg-raised);
  color: var(--text);
  transform: translateY(-200%);
}

.skip:focus-visible {
  transform: none;
}

/* ===== One column below 1024 px ===== */

@media (max-width: 1023px) {
  .page {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    max-width: calc(var(--content-width) + var(--gutter) * 2);
  }

  .content {
    padding-top: 24px;
  }

  .section {
    scroll-margin-top: 0;
  }

  .section + .section {
    margin-top: 72px;
  }
}

@media print {
  .page {
    display: block;
  }

  .content {
    padding-top: 0;
  }

  .section + .section {
    margin-top: 32px;
  }
}
</style>
