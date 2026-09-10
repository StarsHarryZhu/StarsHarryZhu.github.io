<template>
  <section id="projects" class="projects-section" aria-label="Projects">
    <SectionHeader index="03" :title="t('section.projects')" />

    <div class="projects-tier">
      <h3 class="tier-label">{{ t('projects.featured') }}</h3>
      <div class="projects-featured">
        <ProjectCard
          v-for="(project, pi) in featuredProjects"
          :key="project.id"
          :item="project"
          :index="String(pi + 1).padStart(2, '0')"
          featured
          :style="{ '--reveal-delay': `${120 + pi * 110}ms` }"
        />
      </div>
    </div>

    <div class="projects-tier">
      <h3 class="tier-label">{{ t('projects.more') }}</h3>
      <div class="projects-grid">
        <ProjectCard
          v-for="(project, pi) in otherProjects"
          :key="project.id"
          :item="project"
          :index="String(featuredProjects.length + pi + 1).padStart(2, '0')"
          :style="{ '--reveal-delay': `${120 + pi * 90}ms` }"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { useI18n } from '@/i18n/index.js'

const props = defineProps({
  items: { type: Array, required: true },
})

const { t } = useI18n()

const featuredProjects = computed(() => props.items.filter((p) => p.featured))
const otherProjects = computed(() => props.items.filter((p) => !p.featured))
</script>

<style scoped>
.projects-section {
  scroll-margin-top: calc(var(--nav-height) + 1rem);
}

.projects-tier + .projects-tier {
  margin-top: 1.8rem;
}

.tier-label {
  margin: 0 0 0.7rem;
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.projects-featured {
  display: grid;
  gap: 16px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 760px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
