<template>
  <section id="projects" class="projects-section" aria-label="Projects">
    <SectionHeader index="03" title="Projects" />

    <div class="projects-grid">
      <ProjectCard
        v-for="(project, pi) in items"
        :key="`project-${pi}`"
        :item="project"
        :index="String(pi + 1).padStart(2, '0')"
        :accent-index="pi"
        :style="{ '--reveal-delay': `${120 + pi * 110}ms` }"
      />
    </div>
  </section>
</template>

<script setup>
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeader from '@/components/SectionHeader.vue'

defineProps({
  items: { type: Array, required: true },
})
</script>

<style scoped>
.projects-section {
  scroll-margin-top: calc(var(--nav-height) + 1rem);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 1.1rem;
}

@media (max-width: 760px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
