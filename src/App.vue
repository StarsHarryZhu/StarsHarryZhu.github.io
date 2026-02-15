<template>
  <main class="page-shell">
    <Bg :assets="backgroundAssets" :alt-text="bgAltText" />

    <article :class="['home-card', { 'is-ready': isReady }]">
      <Hero
        class="block"
        style="--delay: 100ms"
        :avatar="avatarImage"
        :alt-text="imageAltText"
        :title="profile.title"
        :subtitle="profile.subtitle"
      />

      <Intro class="block" style="--delay: 170ms" :bios="profile.bios" />

      <Skills class="block" style="--delay: 240ms" :items="skills" />

      <Projects
        class="block"
        style="--delay: 310ms"
        :items="projects"
        :alt-text="imageAltText"
      />

      <Contacts
        class="block"
        style="--delay: 380ms"
        :items="contacts"
        :alt-text="imageAltText"
      />

      <Footer class="block" style="--delay: 450ms" :items="footerItems" />
    </article>
  </main>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

import avatarImage from '@/assets/pig.jpg'
import bgImage from '@/assets/placeholders/bg.jpg'
import githubIconWhite from '@/assets/GitHub_Invertocat_White.svg'
import project1Image from '@/assets/placeholders/project1.jpg'
import project2Image from '@/assets/placeholders/project2.jpg'
import project3Image from '@/assets/placeholders/project3.jpg'

import Bg from '@/components/Bg.vue'
import Contacts from '@/components/Contacts.vue'
import Footer from '@/components/Footer.vue'
import Hero from '@/components/Hero.vue'
import Intro from '@/components/Intro.vue'
import Projects from '@/components/Projects.vue'
import Skills from '@/components/Skills.vue'

const bgAltText = '#texttexttext#'
const imageAltText = '#texttexttext#'

const profile = reactive({
  title: 'starfield',
  subtitle: 'Harry Zhu',
  bios: ['Im currently a CSE student of Stony Brook University. I have learned multiple progamming languages including c++， python, swift and java, and Im sure to learn other languages if it is required.'],
})

const skills = ref([
  { name: 'C/C++' },
  { name: 'Python' },
  { name: 'Java' },
  { name: 'Swift/SwiftUI' },
  { name: 'HTML/CSS/JS' },
  { name: 'Vue3' },
  { name: 'STM HAL lib' },
  { name: '#texttexttext#' },
])

const projects = ref([
  {
    name: '#texttexttext#',
    picture: project1Image,
    intro: '#texttexttext#',
    url: 'https://github.com/StarsHarryZhu',
  },
  {
    name: '#texttexttext#',
    picture: project2Image,
    intro: '#texttexttext#',
    url: 'https://github.com/StarsHarryZhu',
  },
  {
    name: '#texttexttext#',
    picture: project3Image,
    intro: '#texttexttext#',
    url: 'https://github.com/StarsHarryZhu',
  },
])

const contacts = ref([
  {
    name: 'Linkedin',
    icon: 'https://static.licdn.com/aero-v1/sc/h/akt4ae504epesldzj74dzred8',
    url: 'https://www.linkedin.com/in/huanyi-zhu-518703385/',
  },
  {
    name: 'Github',
    icon: githubIconWhite,
    url: 'https://github.com/StarsHarryZhu',
  },
])

const footerItems = [
  'starfield',
  '共和国最锋利的剑',
]

const backgroundAssets = ref([
  {
    name: 'bg',
    src: bgImage,
    className: 'bg-asset bg-asset-main',
    width: 3840,
    height: 2160,
  },
])

const isReady = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isReady.value = true
  })
})
</script>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(html),
:global(body),
:global(#app) {
  min-height: 100%;
  background-color: #040812;
}

:global(body) {
  margin: 0;
  overflow: hidden;
  overscroll-behavior-y: none;
}

.page-shell {
  --shell-pad: clamp(0.45rem, 1.4vw, 1.15rem);
  --bg-deep: #040812;
  --bg-ink: #0d1728;
  --card-bg: rgba(8, 15, 28, 0.8);
  --card-border: rgba(113, 169, 213, 0.35);
  --text-main: #ecf3ff;
  --text-muted: #adbbd3;
  --chip-bg: rgba(73, 138, 190, 0.16);
  --chip-border: rgba(126, 194, 246, 0.44);
  --link-bg: rgba(59, 142, 227, 0.2);
  --font-display: "Consolas", monospace;
  --font-body: "Consolas", monospace;
  --shadow-main: 0 30px 80px rgba(2, 7, 17, 0.67);
  position: relative;
  height: 100dvh;
  min-height: 100dvh;
  padding: var(--shell-pad);
  display: grid;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(140deg, var(--bg-deep), var(--bg-ink));
  color: var(--text-main);
  font-family: var(--font-body);
}

.home-card {
  position: relative;
  z-index: 2;
  width: min(1100px, 100%);
  height: min(920px, calc(100dvh - (var(--shell-pad) * 2) - 4px));
  max-height: calc(100dvh - (var(--shell-pad) * 2) - 4px);
  padding: clamp(1.2rem, 2.8vw, 2.4rem);
  border-radius: 28px;
  border: 1px solid var(--card-border);
  background: linear-gradient(145deg, rgba(10, 19, 33, 0.92), var(--card-bg));
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-main);
  display: grid;
  gap: clamp(0.9rem, 2vw, 1.4rem);
  overflow-y: auto;
  opacity: 0;
  transform: translateY(22px) scale(0.988);
  transition: opacity 0.58s ease, transform 0.58s ease;
}

.home-card.is-ready {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.block {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.48s ease, transform 0.48s ease;
}

.home-card.is-ready .block {
  opacity: 1;
  transform: translateY(0);
  transition-delay: var(--delay, 0ms);
}

@media (max-width: 960px) {
  .home-card {
    height: calc(100dvh - (var(--shell-pad) * 2) - 4px);
    max-height: calc(100dvh - (var(--shell-pad) * 2) - 4px);
  }
}

@media (max-width: 700px) {
  .home-card {
    border-radius: 22px;
    padding: clamp(1rem, 4vw, 1.3rem);
  }
}
</style>
