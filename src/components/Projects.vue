<template>
  <section ref="root" class="projects" aria-label="Projects">
    <SectionHeader overline="Selected Work" title="Projects" accent="cyan" />

    <div class="projects-grid">
      <component
        :is="item.tag"
        v-for="(item, index) in resolvedItems"
        :key="`project-${index}`"
        :ref="(el) => reveal.observe(el)"
        class="panel project-card reveal"
        :class="`project-card--${ACCENTS[index % ACCENTS.length]}`"
        :style="{ '--reveal-delay': `${index * 90}ms` }"
        v-bind="item.linkProps"
        :aria-label="item.ariaLabel"
      >
        <div class="project-accent" aria-hidden="true"></div>
        <span class="glint project-glint project-glint--a" aria-hidden="true"></span>
        <span class="glint project-glint project-glint--b" aria-hidden="true"></span>
        <div class="project-body">
          <h3 class="project-title">{{ item.name }}</h3>
          <p class="project-intro">{{ item.intro }}</p>
          <div v-if="item.tags && item.tags.length" class="project-tags">
            <span v-for="(tag, ti) in item.tags" :key="`tag-${ti}`" class="tag-pill">{{ tag }}</span>
          </div>
        </div>
      </component>
    </div>
  </section>
</template>

<script setup>
import { computed, useTemplateRef } from 'vue'
import SectionHeader from './SectionHeader.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useRipple } from '@/composables/useRipple'

const props = defineProps({
  items: { type: Array, required: true },
})

const ACCENTS = ['cyan', 'blue', 'violet', 'blue']

const root = useTemplateRef('root')
const reveal = useScrollReveal({ rootMargin: '0px 0px -6% 0px' })
useRipple(() => root.value, { selector: '.project-card' })

const resolvedItems = computed(() =>
  props.items.map((item) => ({
    ...item,
    tag: item.url ? 'a' : 'article',
    linkProps: item.url
      ? {
          href: item.url,
          target: '_blank',
          rel: 'noreferrer noopener',
        }
      : {},
    ariaLabel: item.url ? `View ${item.name}` : undefined,
  })),
)
</script>

<style scoped>
.projects {
  display: grid;
  gap: var(--space-5);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.project-card {
  --lift: -3px;
  --ripple-color: var(--project-accent);
  position: relative;
  display: block;
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  min-height: 160px;
  overflow: hidden;
  padding: clamp(0.9rem, 1.8vw, 1.2rem);
}

/* ===== Per-project accent ===== */

.project-card--cyan {
  --project-accent: var(--star-cyan);
  --panel-halo: var(--halo-cyan);
}

.project-card--blue {
  --project-accent: var(--star-blue);
  --panel-halo: var(--halo-blue);
}

.project-card--violet {
  --project-accent: var(--star-violet);
  --panel-halo: var(--halo-violet);
}

/* ===== Accent: aurora sweep revealed on hover ===== */

.project-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--project-accent),
    color-mix(in srgb, var(--project-accent) 45%, var(--star-blue)),
    transparent
  );
  background-size: 200% auto;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.project-card:hover .project-accent,
.project-card:focus-visible .project-accent {
  opacity: 1;
  animation: accent-sweep 2.4s var(--ease-aurora) infinite;
}

@keyframes accent-sweep {
  from { background-position: 0% 50%; }
  to { background-position: 200% 50%; }
}

.project-card:hover {
  box-shadow:
    var(--glass-highlight),
    var(--glass-shade),
    var(--shadow-lift),
    0 0 30px color-mix(in srgb, var(--project-accent) 22%, transparent);
}

.project-card:focus-visible {
  outline: 2px solid var(--project-accent);
  outline-offset: 2px;
  border-color: var(--glass-border-hover);
}

/* ===== Star-light glints ===== */

.project-glint--a {
  left: 10%;
  top: 24%;
  animation-duration: 4.4s;
}

.project-glint--b {
  right: 14%;
  bottom: 22%;
  animation-delay: -2s;
  animation-duration: 3.2s;
}

/* ===== Body ===== */

.project-body {
  height: 100%;
  display: grid;
  gap: 0.42rem;
  align-content: start;
}

.project-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--text-primary);
}

.project-intro {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--text-sm);
  line-height: 1.55;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.34rem;
  margin-top: 0.2rem;
}

@media (prefers-reduced-motion: reduce) {
  .project-card:hover .project-accent {
    animation: none;
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
