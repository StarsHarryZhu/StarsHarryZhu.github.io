<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useI18n } from '@/i18n/index.js'

defineProps({
  items: { type: Array, required: true },
})

const { t, pick } = useI18n()
</script>

<template>
  <section id="education" class="section" aria-labelledby="education-title">
    <SectionHeader id="education-title" :title="t('section.education')" />

    <ol class="entries">
      <li v-for="item in items" :key="item.institution" class="entry">
        <p class="entry-when mono">{{ pick(item.period) }}</p>
        <div>
          <h3 class="entry-title">{{ item.institution }}</h3>
          <p class="entry-where">
            {{ pick(item.degree) }}<template v-if="item.location"> · {{ pick(item.location) }}</template>
          </p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.entries {
  display: grid;
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* the same two columns as Experience */
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

@media (max-width: 560px) {
  .entry {
    grid-template-columns: 1fr;
  }
}
</style>
