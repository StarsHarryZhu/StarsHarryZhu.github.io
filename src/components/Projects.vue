<template>
  <section class="projects">
    <article v-for="(item, index) in items" :key="`project-${index}`" class="project-card">
      <img :src="item.picture" :alt="altText" class="project-cover" width="960" height="540" />
      <div class="project-body">
        <h2>{{ item.name }}</h2>
        <p>{{ item.intro }}</p>
        <a
          class="project-link"
          :href="item.url"
          target="_blank"
          rel="noreferrer noopener"
          :aria-label="item.linkText || `View ${item.name}`"
        >
          {{ item.linkText || 'View Project' }}
        </a>
      </div>
    </article>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 0.9rem;
}

.project-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(129, 179, 219, 0.3);
  background: rgba(10, 18, 30, 0.7);
  transition: transform 0.22s ease, border-color 0.22s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(178, 222, 255, 0.6);
}

.project-cover {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 120px;
  max-height: 240px;
  object-fit: cover;
  object-position: center;
}

.project-body {
  padding: 0.75rem;
  display: grid;
  gap: 0.5rem;
}

.project-body h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1rem;
}

.project-body p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.88rem;
  line-height: 1.5;
}

.project-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
  border-radius: 10px;
  border: 1px solid rgba(137, 190, 243, 0.42);
  background: var(--link-bg);
  color: #d8ecff;
  text-decoration: none;
  font-size: 0.86rem;
  transition: transform 0.2s ease, filter 0.2s ease;
}

.project-link:hover {
  transform: translateY(-2px);
  filter: brightness(1.12);
}
</style>
