<template>
  <section class="projects">
    <a
      v-for="(item, index) in items"
      :key="`project-${index}`"
      class="project-card"
      :href="item.url"
      :aria-label="item.linkText || `View ${item.name}`"
    >
      <div class="project-body">
        <h2>{{ item.name }}</h2>
        <p>{{ item.intro }}</p>
      </div>
    </a>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.project-card {
  display: block;
  border-radius: 16px;
  border: 1px solid rgba(129, 179, 219, 0.3);
  background: rgba(10, 18, 30, 0.7);
  text-decoration: none;
  color: inherit;
  transition: transform 0.22s ease, border-color 0.22s ease;
  min-height: 160px;
}

.project-body {
  height: 100%;
  padding: 0.62rem;
  display: grid;
  gap: 0.42rem;
  align-content: start;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: rgba(178, 222, 255, 0.6);
}

.project-card:focus-visible {
  outline: 2px solid rgba(181, 223, 255, 0.85);
  outline-offset: 2px;
  border-color: rgba(198, 233, 255, 0.8);
}

.project-body h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.9rem;
}

.project-body p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.8rem;
  line-height: 1.34;
}

@media (max-width: 960px) {
  .projects {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .projects {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
