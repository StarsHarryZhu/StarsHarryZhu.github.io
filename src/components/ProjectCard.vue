<template>
  <component
    :is="item.url ? 'a' : 'article'"
    :href="item.url || undefined"
    :target="item.url ? '_blank' : undefined"
    :rel="item.url ? 'noreferrer noopener' : undefined"
    :aria-label="item.url ? `View ${item.name}` : undefined"
    class="panel project-card reveal"
    :class="`project-card--${ACCENTS[accentIndex % ACCENTS.length]}`"
    :ref="reveal.observe"
  >
    <span class="panel-halo" aria-hidden="true"></span>
    <span class="card-index">{{ index }}</span>

    <header class="project-head">
      <span class="card-icon" style="--tile-accent: var(--project-accent)" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"></path>
        </svg>
      </span>
      <span v-if="item.url" class="project-arrow" aria-hidden="true">↗</span>
    </header>

    <h3 class="project-title">{{ item.name }}</h3>
    <p class="project-intro">{{ item.intro }}</p>

    <div v-if="item.tags && item.tags.length" class="project-tags">
      <span v-for="(tag, ti) in item.tags" :key="`tag-${ti}`" class="tag-pill">{{ tag }}</span>
    </div>
  </component>
</template>

<script setup>
import { useTemplateRef } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useRipple } from '@/composables/useRipple'

const props = defineProps({
  item: { type: Object, required: true },
  index: { type: String, default: '' },
  accentIndex: { type: Number, default: 0 },
})

const ACCENTS = ['cyan', 'sky', 'violet']

const root = useTemplateRef('root')
const reveal = useScrollReveal({ rootMargin: '0px 0px -6% 0px' })
useRipple(() => root.value, { selector: '.project-card' })
</script>

<style scoped>
.project-card {
  --lift: -3px;
  --ripple-color: var(--project-accent);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-radius: var(--radius-panel);
  text-decoration: none;
  color: inherit;
  min-height: 240px;
  padding: 1.7rem;
}

.project-card--cyan {
  --project-accent: var(--accent-cyan);
  --pill-accent: var(--accent-cyan);
  --panel-halo: var(--halo-cyan);
  --panel-iris: rgba(125, 244, 232, 0.16);
}

.project-card--sky {
  --project-accent: var(--accent-sky);
  --pill-accent: var(--accent-sky);
  --panel-halo: var(--halo-sky);
  --panel-iris: rgba(74, 138, 196, 0.24);
}

.project-card--violet {
  --project-accent: var(--accent-violet);
  --pill-accent: var(--accent-violet);
  --panel-halo: var(--halo-violet);
  --panel-iris: rgba(150, 130, 255, 0.18);
}

.project-card:hover {
  box-shadow:
    var(--glass-specular),
    0 0 0 1px rgba(255, 255, 255, 0.12),
    var(--glass-iris),
    var(--shadow-lift),
    0 0 30px color-mix(in srgb, var(--project-accent) 22%, transparent);
}

.project-card:focus-visible {
  outline: 2px solid var(--project-accent);
  outline-offset: 2px;
  border-color: var(--glass-border-hover);
}

.project-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.6rem;
}

.project-arrow {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--project-accent);
  opacity: 0;
  transform: translate(-4px, 4px);
  transition:
    opacity var(--transition-base),
    transform 0.4s var(--ease-spring);
}

.project-card:hover .project-arrow,
.project-card:focus-visible .project-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

.project-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.project-intro {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--text-sm);
  line-height: 1.64;
  text-wrap: pretty;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.38rem;
  margin-top: auto;
  padding-top: 0.4rem;
}
</style>
