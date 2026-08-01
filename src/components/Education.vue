<template>
  <section class="education" aria-label="Education">
    <SectionHeader overline="FOUNDATION" title="Education" />

    <div class="education-grid">
      <article v-for="(item, index) in items" :key="`education-${index}`" class="education-card">
        <div class="education-signal" aria-hidden="true"></div>
        <div class="education-copy">
          <span class="education-period">{{ item.period }}</span>
          <h3 class="education-institution">{{ item.institution }}</h3>
          <p class="education-degree">{{ item.degree }}</p>
        </div>
        <p v-if="item.location" class="education-location">{{ item.location }}</p>
      </article>
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
.education {
  display: grid;
  gap: var(--space-5);
}

.education-grid {
  display: grid;
  gap: 0.9rem;
}

.education-card {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: var(--space-4);
  align-items: center;
  min-height: 112px;
  padding: clamp(0.9rem, 2vw, 1.2rem);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(112deg, rgba(240, 184, 72, 0.09), transparent 36%),
    var(--glass-bg);
}

.education-signal {
  width: 10px;
  height: 42px;
  border-radius: var(--radius-full);
  background: linear-gradient(180deg, var(--color-accent-amber), rgba(240, 184, 72, 0.18));
  box-shadow: var(--shadow-glow-amber);
}

.education-copy {
  min-width: 0;
}

.education-period {
  display: block;
  margin-bottom: 0.22rem;
  color: var(--color-accent-amber);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
}

.education-institution {
  margin: 0;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
}

.education-degree,
.education-location {
  margin: 0.22rem 0 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: var(--leading-base);
}

.education-location {
  margin: 0;
  color: var(--color-text-tertiary);
  text-align: right;
}

@media (max-width: 640px) {
  .education-card {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .education-location {
    grid-column: 2;
    text-align: left;
  }
}
</style>
