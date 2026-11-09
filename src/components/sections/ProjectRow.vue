<script setup>
import { ref } from 'vue'
import ProjectDetails from '@/components/sections/ProjectDetails.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { useI18n } from '@/i18n/index.js'

const props = defineProps({
  project: { type: Object, required: true },
})

const { pick } = useI18n()

// Disclosure: the summary is one button that opens the details in place.
// Closed details are inert, so nothing inside them takes focus.
const open = ref(false)
const buttonId = `project-${props.project.id}`
const panelId = `project-${props.project.id}-details`
</script>

<template>
  <li class="row" :class="{ 'is-open': open }">
    <h4 class="row-head">
      <button
        :id="buttonId"
        type="button"
        class="row-summary"
        :aria-expanded="open"
        :aria-controls="panelId"
        @click="open = !open"
      >
        <span class="row-top">
          <span class="row-name">{{ project.name }}</span>
          <span v-if="project.period" class="mono">{{ pick(project.period) }}</span>
        </span>
        <span class="row-tagline">{{ pick(project.tagline) }}</span>
        <span class="row-meta mono">
          <StatusBadge :status="project.status" />
          <span class="row-stack">{{ project.stack.join(' · ') }}</span>
        </span>
        <span class="row-toggle" aria-hidden="true"></span>
      </button>
    </h4>

    <div
      :id="panelId"
      class="row-panel"
      role="region"
      :aria-labelledby="buttonId"
      :inert="!open || undefined"
    >
      <div class="row-panel-inner">
        <ProjectDetails :project="project" />
      </div>
    </div>
  </li>
</template>

<style scoped>
.row {
  border-radius: var(--radius);
  transition: background-color var(--dur) var(--ease);
}

.row:hover,
.row.is-open {
  background: var(--bg-hover);
}

.row-head {
  font: inherit;
  color: inherit;
}

.row-summary {
  position: relative;
  display: grid;
  gap: 6px;
  width: 100%;
  padding: 16px 48px 16px 16px;
  border-radius: var(--radius);
}

.row-top {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 16px;
}

.row-name {
  font-weight: 500;
  color: var(--text);
  transition: color var(--dur) var(--ease);
}

.row-summary:hover .row-name,
.is-open .row-name {
  color: var(--accent);
}

.row-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 16px;
  margin-top: 4px;
}

/* a plus that turns into a cross: one rotation, nothing else moves */
.row-toggle {
  position: absolute;
  top: 22px;
  right: 18px;
  width: 11px;
  height: 11px;
  color: var(--text-3);
  transition: transform var(--dur) var(--ease), color var(--dur) var(--ease);
}

.row-toggle::before,
.row-toggle::after {
  content: '';
  position: absolute;
  inset: 5px 0 auto;
  height: 1px;
  background: currentColor;
}

.row-toggle::after {
  transform: rotate(90deg);
}

.row-summary:hover .row-toggle {
  color: var(--text);
}

.is-open .row-toggle {
  transform: rotate(45deg);
}

/* ===== Details: the row grows from 0fr to 1fr ===== */

.row-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur) var(--ease);
}

.is-open .row-panel {
  grid-template-rows: 1fr;
}

.row-panel-inner {
  min-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity var(--dur) var(--ease);
}

.is-open .row-panel-inner {
  opacity: 1;
}

@media print {
  .row-panel {
    grid-template-rows: 1fr;
  }

  .row-panel-inner {
    opacity: 1;
  }

  .row-toggle {
    display: none;
  }
}
</style>
