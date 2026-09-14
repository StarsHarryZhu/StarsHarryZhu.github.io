<template>
  <article
    class="glass project-card reveal"
    :class="{ 'project-card--featured': featured }"
    :ref="reveal.observe"
  >
    <header class="project-head">
      <span class="card-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"></path>
        </svg>
      </span>

      <div class="project-head-meta">
        <StatusBadge :status="item.status" />
        <span v-if="item.period" class="project-period">{{ pick(item.period) }}</span>
        <span class="project-index">{{ index }}</span>
      </div>
    </header>

    <h3 class="project-title">{{ item.name }}</h3>
    <p class="project-tagline">{{ pick(item.tagline) }}</p>

    <ul class="project-stack">
      <li v-for="tech in item.stack" :key="tech" class="tag-pill">{{ tech }}</li>
    </ul>

    <button
      type="button"
      class="case-open"
      aria-haspopup="dialog"
      @click="emit('open', { project: item, trigger: $event.currentTarget })"
    >
      <span>{{ t('projects.caseStudy') }}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M7 17 17 7M9 7h8v8"></path>
      </svg>
    </button>
  </article>
</template>

<script setup>
import { useTemplateRef } from 'vue'
import StatusBadge from '@/components/StatusBadge.vue'
import { useI18n } from '@/i18n/index.js'
import { useScrollReveal } from '@/composables/useScrollReveal'

defineProps({
  item: { type: Object, required: true },
  index: { type: String, default: '' },
  featured: { type: Boolean, default: false },
})

const emit = defineEmits(['open'])

const { t, pick } = useI18n()

const root = useTemplateRef('root')
const reveal = useScrollReveal({ rootMargin: '0px 0px -6% 0px' })
</script>

<style scoped>
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.6rem;
}

.project-card--featured {
  padding: clamp(1.6rem, 3vw, 2.2rem);
}

/* ===== Head ===== */

.project-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.8rem;
}

.project-head-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem;
}

.project-index {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-wider);
  color: var(--text-tertiary);
  user-select: none;
}

.project-period {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-wide);
  color: var(--text-tertiary);
  white-space: nowrap;
}

.project-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
}

.project-card--featured .project-title {
  font-size: clamp(1.35rem, 2.6vw, 1.6rem);
}

.project-tagline {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--text-sm);
  line-height: 1.66;
  text-wrap: pretty;
  max-width: 74ch;
}

.project-card--featured .project-tagline {
  font-size: var(--text-base);
}

.project-stack {
  list-style: none;
  margin: 0.15rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.38rem;
}

/* ===== 打开案例窗口的按钮 ===== */

.case-open {
  appearance: none;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.7rem;
  padding: 0.42rem 0.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-l2);
  background: rgba(255, 255, 255, 0.04);
  color: var(--accent-cyan);
  font: inherit;
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color var(--transition-base),
    background var(--transition-base);
}

.case-open:hover {
  border-color: rgba(255, 255, 255, 0.32);
  background: rgba(255, 255, 255, 0.07);
}

.case-open:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 2px;
}
</style>
