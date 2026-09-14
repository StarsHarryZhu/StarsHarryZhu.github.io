<template>
  <Backdrop />
  <TopBar />

  <main class="page-shell">
    <Hero
      :avatar="avatarImageSet.webp"
      :avatar2x="avatarImageSet.webp2x"
      :avatarFallback="avatarImageSet.fallback"
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

<script setup>
import { profile, contacts, education, avatarImageSet } from '@/data/site-data.js'
import { projects } from '@/data/projects.js'
import { timeline } from '@/data/experience.js'
import { skillGroups } from '@/data/skills.js'

import About from '@/components/About.vue'
import Backdrop from '@/components/Backdrop.vue'
import Contact from '@/components/Contact.vue'
import Education from '@/components/Education.vue'
import Experience from '@/components/Experience.vue'
import Footer from '@/components/Footer.vue'
import Hero from '@/components/Hero.vue'
import Projects from '@/components/Projects.vue'
import Toolkit from '@/components/Toolkit.vue'
import TopBar from '@/components/TopBar.vue'
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

/* 分区之间留出呼吸感 */
.sections {
  display: grid;
  gap: var(--section-gap);
  width: 100%;
  padding-top: clamp(1rem, 4vh, 2.5rem);
}

/* 视口外分区跳过渲染（已无 backdrop-filter，可安全启用）。
   占位高度按各分区实测值分档 —— 单一常量会让总高度先涨后缩、滚动条跳动；
   分档后首次进入即接近真实高度（`auto` 关键字会记住真实值）。 */
.sections > * {
  content-visibility: auto;
}

.sections > *:nth-child(1) { contain-intrinsic-block-size: auto 430px; }
.sections > *:nth-child(2) { contain-intrinsic-block-size: auto 780px; }
.sections > *:nth-child(3) { contain-intrinsic-block-size: auto 1400px; }
.sections > *:nth-child(4) { contain-intrinsic-block-size: auto 450px; }
.sections > *:nth-child(5) { contain-intrinsic-block-size: auto 290px; }
.sections > *:nth-child(6) { contain-intrinsic-block-size: auto 120px; }

/* 技能 + 教育：宽屏并排，窄屏堆叠 */
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
