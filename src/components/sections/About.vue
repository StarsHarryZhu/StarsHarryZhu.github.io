<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useI18n } from '@/i18n/index.js'

defineProps({
  bios: { type: Array, required: true },
  focusAreas: { type: Array, default: () => [] },
})

const { t, pick } = useI18n()
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <SectionHeader id="about-title" :title="t('section.about')" />

    <div class="about-bios">
      <p v-for="(bio, index) in bios" :key="`bio-${index}`" :class="{ lead: index === 0 }">
        {{ pick(bio) }}
      </p>
    </div>

    <dl class="about-focus">
      <dt class="mono">{{ t('about.focus') }}</dt>
      <dd>
        <ul class="dot-list">
          <li v-for="(focus, fi) in focusAreas" :key="`focus-${fi}`">{{ pick(focus) }}</li>
        </ul>
      </dd>
    </dl>
  </section>
</template>

<style scoped>
.about-bios {
  display: grid;
  gap: 16px;
}

.lead {
  font-size: var(--text-lg);
  color: var(--text);
}

.about-focus {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 16px;
  margin: 32px 0 0;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.about-focus dd {
  margin: 0;
  color: var(--text);
}
</style>
