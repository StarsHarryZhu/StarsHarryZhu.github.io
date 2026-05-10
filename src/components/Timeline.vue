<template>
  <section class="timeline" aria-label="Experience">
    <SectionHeader overline="JOURNEY" title="Timeline" />

    <div class="timeline-track">
      <div
        v-for="(entry, index) in items"
        :key="`timeline-${index}`"
        ref="entryRefs"
        class="timeline-entry"
      >
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          <div v-if="index < items.length - 1" class="timeline-line"></div>
        </div>
        <div class="timeline-card">
          <span class="timeline-year">{{ entry.year }}</span>
          <h3 class="timeline-title">{{ entry.title }}</h3>
          <p v-if="entry.subtitle" class="timeline-subtitle">{{ entry.subtitle }}</p>
          <p v-if="entry.description" class="timeline-desc">{{ entry.description }}</p>
          <div v-if="entry.tags && entry.tags.length" class="timeline-tags">
            <span v-for="(tag, ti) in entry.tags" :key="`ttag-${ti}`" class="timeline-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
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
.timeline {
  display: grid;
  gap: var(--space-5);
}

.timeline-track {
  display: grid;
  gap: 0;
}

.timeline-entry {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: var(--space-4);
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-accent-cyan);
  box-shadow: 0 0 10px rgba(78, 240, 208, 0.4);
  flex-shrink: 0;
}

.timeline-line {
  width: 1px;
  flex: 1;
  min-height: 24px;
  margin-top: var(--space-1);
  background: linear-gradient(
    180deg,
    var(--glass-border) 0%,
    transparent 100%
  );
}

.timeline-card {
  padding-bottom: var(--space-6);
}

.timeline-year {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  color: var(--color-accent-cyan);
  text-transform: uppercase;
}

.timeline-title {
  margin: 0.16rem 0 0;
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.timeline-subtitle {
  margin: 0.12rem 0 0;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.timeline-desc {
  margin: 0.36rem 0 0;
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  line-height: var(--leading-base);
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.32rem;
  margin-top: 0.48rem;
}

.timeline-tag {
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--glass-border);
  background: var(--color-accent-cyan-dim);
  color: var(--color-accent-cyan);
  font-size: 0.68rem;
  line-height: 1.5;
}
</style>
