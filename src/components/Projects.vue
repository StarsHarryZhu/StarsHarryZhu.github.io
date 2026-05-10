<template>
  <section class="projects" aria-label="Projects">
    <a
      v-for="(item, index) in items"
      :key="`project-${index}`"
      class="project-card"
      :href="item.url"
      target="_blank"
      rel="noreferrer noopener"
      :aria-label="`View ${item.name}`"
    >
      <div class="project-accent"></div>
      <div class="project-body">
        <h2>{{ item.name }}</h2>
        <p>{{ item.intro }}</p>
        <div v-if="item.tags && item.tags.length" class="project-tags">
          <span v-for="(tag, ti) in item.tags" :key="`tag-${ti}`" class="project-tag">{{ tag }}</span>
        </div>
      </div>
    </a>
  </section>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.project-card {
  position: relative;
  display: block;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  text-decoration: none;
  color: inherit;
  min-height: 160px;
  overflow: hidden;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
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

.project-card:hover {
  transform: translateY(-3px);
  border-color: var(--glass-border-hover);
  background: var(--glass-bg-hover);
  box-shadow: var(--shadow-glow-blue);
}

.project-card:hover .project-accent {
  opacity: 1;
}

.project-card:focus-visible {
  outline: 2px solid var(--color-accent-cyan);
  outline-offset: 2px;
  border-color: var(--glass-border-hover);
}

.project-body h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.9rem;
  color: var(--color-text-primary);
}

.project-body p {
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

.project-tag {
  padding: 0.12rem 0.44rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--glass-border);
  background: var(--color-accent-cyan-dim);
  color: var(--color-accent-cyan);
  font-size: 0.68rem;
  line-height: 1.5;
}

@media (max-width: 960px) {
  .projects { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .projects { grid-template-columns: repeat(1, minmax(0, 1fr)); }
}
</style>
