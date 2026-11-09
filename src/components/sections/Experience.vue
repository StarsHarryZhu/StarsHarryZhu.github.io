<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useI18n } from '@/i18n/index.js'

defineProps({
  items: { type: Array, required: true },
})

const { t, pick } = useI18n()
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <SectionHeader id="experience-title" :title="t('section.experience')" />

    <ol class="entries">
      <li v-for="entry in items" :key="entry.id" class="entry">
        <p class="entry-when mono">{{ pick(entry.period) }}</p>
        <div class="entry-body">
          <h3 class="entry-title">{{ pick(entry.title) }}</h3>
          <p class="entry-where">
            {{ pick(entry.subtitle) }}<template v-if="entry.location"> · {{ pick(entry.location) }}</template>
          </p>
          <ul v-if="entry.highlights?.length" class="entry-points">
            <li v-for="(highlight, hi) in entry.highlights" :key="`h-${hi}`">{{ pick(highlight) }}</li>
          </ul>
          <ul v-if="entry.tags?.length" class="dot-list mono entry-tags">
            <li v-for="tag in entry.tags" :key="tag">{{ tag }}</li>
          </ul>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.entries {
  display: grid;
  gap: 40px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* period on the left, the role on the right; stacked when narrow */
.entry {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 4px 24px;
}

.entry-when {
  padding-top: 3px;
}

.entry-title {
  font-size: var(--text-base);
}

.entry-where {
  font-size: var(--text-sm);
}

.entry-points {
  display: grid;
  gap: 6px;
  margin-top: 12px;
}

.entry-points li {
  position: relative;
  padding-left: 16px;
}

.entry-points li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--text-3);
}

.entry-tags {
  margin-top: 12px;
}

@media (max-width: 560px) {
  .entry {
    grid-template-columns: 1fr;
  }
}
</style>
