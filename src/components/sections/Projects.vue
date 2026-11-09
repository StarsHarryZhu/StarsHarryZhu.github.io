<script setup>
import { computed } from 'vue'
import ProjectRow from '@/components/sections/ProjectRow.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useI18n } from '@/i18n/index.js'

const props = defineProps({
  items: { type: Array, required: true },
})

const { t } = useI18n()

// `featured` sorts a project into the first group; array order is kept
const groups = computed(() => [
  { id: 'featured', label: t('projects.featured'), items: props.items.filter((p) => p.featured) },
  { id: 'more', label: t('projects.more'), items: props.items.filter((p) => !p.featured) },
])
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <SectionHeader id="projects-title" :title="t('section.projects')" />

    <div v-for="group in groups" :key="group.id" class="group">
      <h3 :id="`projects-${group.id}`" class="group-label mono">{{ group.label }}</h3>
      <ul class="rows" :aria-labelledby="`projects-${group.id}`">
        <ProjectRow v-for="project in group.items" :key="project.id" :project="project" />
      </ul>
    </div>
  </section>
</template>

<style scoped>
.group + .group {
  margin-top: 48px;
}

.group-label {
  margin-bottom: 8px;
  font-weight: 400;
}

/* rows sit flush with the text column; their hover surface bleeds out */
.rows {
  display: grid;
  gap: 4px;
  margin-inline: -16px;
}
</style>
