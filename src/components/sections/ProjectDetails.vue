<script setup>
import { useI18n } from '@/i18n/index.js'

defineProps({
  project: { type: Object, required: true },
})

const { t, pick } = useI18n()
</script>

<template>
  <dl class="details">
    <div class="detail">
      <dt class="mono">{{ t('projects.highlights') }}</dt>
      <dd>
        <ul class="points">
          <li v-for="(item, i) in project.highlights" :key="`h-${i}`">{{ pick(item) }}</li>
        </ul>
      </dd>
    </div>

    <div v-if="project.note" class="detail">
      <dt class="mono">{{ t('projects.note') }}</dt>
      <dd class="note">{{ pick(project.note) }}</dd>
    </div>

    <div v-if="project.install" class="detail">
      <dt class="mono">{{ t('projects.install') }}</dt>
      <dd><code class="install">{{ project.install }}</code></dd>
    </div>

    <div v-if="project.links.length" class="detail">
      <dt class="mono">{{ t('projects.links') }}</dt>
      <dd>
        <ul class="links">
          <li v-for="link in project.links" :key="link.url">
            <a class="link" :href="link.url" target="_blank" rel="noreferrer noopener">{{ link.label }} ↗</a>
          </li>
        </ul>
      </dd>
    </div>
  </dl>
</template>

<style scoped>
/* minmax(0, 1fr): the unbreakable install line scrolls inside its box
   instead of widening the column (the row clips its overflow) */
.details {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
  margin: 0;
  padding: 4px 16px 24px;
  font-size: var(--text-sm);
}

.detail dt {
  margin-bottom: 8px;
}

.detail dd {
  margin: 0;
}

.points {
  display: grid;
  gap: 8px;
}

.points li {
  position: relative;
  padding-left: 16px;
}

.points li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--text-3);
}

.note {
  color: var(--text-3);
}

.install {
  display: block;
  overflow-x: auto;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--bg-raised);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text);
  white-space: pre;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
}
</style>
