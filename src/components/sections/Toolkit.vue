<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useI18n } from '@/i18n/index.js'

defineProps({
  groups: { type: Array, required: true },
})

const { t, pick } = useI18n()
</script>

<template>
  <section id="toolkit" class="section" aria-labelledby="toolkit-title">
    <SectionHeader id="toolkit-title" :title="t('section.toolkit')" />

    <dl class="groups">
      <div v-for="group in groups" :key="group.id" class="group">
        <dt class="mono">{{ pick(group.name) }}</dt>
        <dd>
          <ul class="dot-list">
            <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
          </ul>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.groups {
  display: grid;
  gap: 16px;
  margin: 0;
}

/* group name on the left, skills on the right; stacked when narrow */
.group {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 4px 24px;
}

.group dt {
  padding-top: 3px;
}

.group dd {
  margin: 0;
  color: var(--text);
}

@media (max-width: 560px) {
  .group {
    grid-template-columns: 1fr;
  }
}
</style>
