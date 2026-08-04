<template>
  <section class="projects" aria-label="Projects">
    <SectionHeader overline="SELECTED WORK" title="Projects" />

    <div class="projects-grid">
      <component
        :is="item.tag"
        v-for="(item, index) in resolvedItems"
        :key="`project-${index}`"
        class="project-card glass-card"
        v-bind="item.linkProps"
        :aria-label="item.ariaLabel"
      >
        <div class="project-accent"></div>
        <div class="project-body">
          <h3 class="project-title">{{ item.name }}</h3>
          <p class="project-intro">{{ item.intro }}</p>
          <div v-if="item.tags && item.tags.length" class="project-tags">
            <span v-for="(tag, ti) in item.tags" :key="`tag-${ti}`" class="tag-pill tag-pill--cyan">{{ tag }}</span>
          </div>
        </div>
      </component>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from './SectionHeader.vue'

const props = defineProps({
  items: { type: Array, required: true },
})

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
  gap: 0.9rem;
}

.project-card {
  --lift: -3px;
  position: relative;
  display: block;
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  min-height: 160px;
  overflow: hidden;
}

.project-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--color-accent-cyan),
    var(--color-nebula-400),
    transparent
  );
  opacity: 0;
  transition: opacity var(--transition-base);
}

.project-body {
  height: 100%;
  padding: clamp(0.7rem, 1.4vw, 0.9rem);
  display: grid;
  gap: 0.42rem;
  align-content: start;
}

.project-card:hover .project-accent {
  opacity: 1;
}

.project-card:focus-visible {
  outline: 2px solid var(--color-accent-cyan);
  outline-offset: 2px;
  border-color: var(--glass-border-hover);
}

.project-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.9rem;
  color: var(--color-text-primary);
}

.project-intro {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-xs);
  line-height: 1.45;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.32rem;
  margin-top: 0.2rem;
}

@media (max-width: 640px) {
  .projects-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); }
}
</style>
