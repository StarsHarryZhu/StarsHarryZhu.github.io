<template>
  <StarfieldBackground />

  <main class="page-shell">
    <a href="#home-card" class="skip-link">Skip to content</a>

    <article id="home-card" :class="['home-card', { 'is-ready': isReady }]" style="scroll-margin-top: var(--shell-pad);">
      <Hero
        class="block"
        style="--delay: 100ms"
        :avatar="avatarImage"
        :title="profile.title"
        :subtitle="profile.subtitle"
      />

      <Intro class="block" style="--delay: 150ms" :bios="profile.bios" />

      <Timeline class="block" style="--delay: 200ms" :items="timeline" />

      <Skills class="block" style="--delay: 250ms" :categories="skillCategories" />

      <Projects class="block" style="--delay: 300ms" :items="projects" />

      <BlogPreview class="block" style="--delay: 350ms" :items="blogPosts" />

      <Contacts class="block" style="--delay: 400ms" :items="contacts" />

      <Footer class="block" style="--delay: 450ms" :items="footerItems" />
    </article>
  </main>
</template>

<script setup>
import { onMounted, shallowRef } from 'vue'

import {
  profile,
  skillCategories,
  projects,
  timeline,
  blogPosts,
  contacts,
  footerItems,
  avatarImage,
} from '@/data/site-data.js'

import BlogPreview from '@/components/BlogPreview.vue'
import Contacts from '@/components/Contacts.vue'
import Footer from '@/components/Footer.vue'
import Hero from '@/components/Hero.vue'
import Intro from '@/components/Intro.vue'
import Projects from '@/components/Projects.vue'
import Skills from '@/components/Skills.vue'
import StarfieldBackground from '@/components/StarfieldBackground.vue'
import Timeline from '@/components/Timeline.vue'

const isReady = shallowRef(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isReady.value = true
  })
})
</script>

<style scoped>
.page-shell {
  position: relative;
  z-index: 1;
  min-height: 100dvh;
  padding: var(--shell-pad);
  display: grid;
  place-items: center;
  color: var(--color-text-primary);
  font-family: var(--font-body);
}

/* ===== Skip Link ===== */

.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 100;
  padding: var(--space-2) var(--space-4);
  background: var(--color-void-950);
  color: var(--color-text-primary);
  border: 1px solid var(--glass-border);
  border-radius: 0 0 var(--radius-md) 0;
  text-decoration: none;
  font-size: var(--text-xs);
}

.skip-link:focus {
  top: 0;
}

/* ===== Home Card ===== */

.home-card {
  position: relative;
  z-index: 2;
  width: var(--content-width);
  min-height: calc(100dvh - (var(--shell-pad) * 2) - 4px);
  padding: clamp(1.2rem, 2.8vw, 2.4rem);
  border-radius: var(--radius-xl);
  border: 1px solid var(--glass-border);
  outline: 1px solid rgba(100, 160, 220, 0.08);
  outline-offset: -6px;
  background: linear-gradient(145deg, rgba(10, 24, 40, 0.86), var(--glass-bg));
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  box-shadow:
    var(--shadow-card),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: clamp(0.9rem, 2vw, 1.4rem);
  opacity: 0;
  transform: translateY(22px) scale(0.988);
  transition: opacity 0.58s ease, transform 0.58s ease;
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
    border-radius: var(--radius-lg);
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
}

/* ===== Print ===== */

@media print {
  .page-shell {
    background: white !important;
    place-items: start;
    padding: 1rem;
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
  .skip-link {
    display: none;
  }
}
</style>
