<template>
  <section class="blog-preview" aria-label="Latest posts">
    <SectionHeader overline="WRITING" title="Latest Posts" />

    <div class="blog-grid">
      <a
        v-for="(post, index) in items"
        :key="`post-${index}`"
        class="blog-card"
        :href="post.url"
        :class="{ 'blog-card--disabled': !post.url || post.url === '#' }"
        :aria-label="`Read ${post.title}`"
      >
        <span class="blog-date">{{ post.date }}</span>
        <h3 class="blog-title">{{ post.title }}</h3>
        <p class="blog-excerpt">{{ post.excerpt }}</p>
        <div v-if="post.tags && post.tags.length" class="blog-tags">
          <span v-for="(tag, ti) in post.tags" :key="`btag-${ti}`" class="blog-tag">{{ tag }}</span>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from './SectionHeader.vue'

defineProps({
  items: { type: Array, required: true },
})
</script>

<style scoped>
.blog-preview {
  display: grid;
  gap: var(--space-5);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.blog-card {
  display: block;
  padding: clamp(0.7rem, 1.4vw, 0.9rem);
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  text-decoration: none;
  color: inherit;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    background-color var(--transition-base);
}

.blog-card:hover {
  transform: translateY(-2px);
  border-color: var(--glass-border-hover);
  background: var(--glass-bg-hover);
  box-shadow:
    var(--shadow-glow-amber),
    0 4px 16px rgba(1, 7, 17, 0.3);
}

.blog-card:focus-visible {
  outline: 2px solid var(--color-accent-amber);
  outline-offset: 2px;
}

.blog-card--disabled {
  cursor: default;
  opacity: 0.6;
}

.blog-card--disabled:hover {
  transform: none;
  border-color: var(--glass-border);
  background: var(--glass-bg);
  box-shadow: none;
}

.blog-date {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  color: var(--color-accent-amber);
  text-transform: uppercase;
}

.blog-title {
  margin: 0.24rem 0 0;
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.blog-excerpt {
  margin: 0.32rem 0 0;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-base);
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.32rem;
  margin-top: 0.6rem;
}

.blog-tag {
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--glass-border);
  background: rgba(240, 184, 72, 0.08);
  color: var(--color-accent-amber);
  font-size: 0.68rem;
  line-height: 1.5;
}

@media (max-width: 640px) {
  .blog-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); }
}
</style>
