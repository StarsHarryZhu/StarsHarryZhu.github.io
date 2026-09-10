<template>
  <div class="case-body" :class="{ 'is-open': open }">
    <!-- `inert` when closed: belt-and-braces with visibility:hidden so the
         collapsed links can never be focused or read by assistive tech. -->
    <div class="case-inner" :inert="open ? null : true">
      <div class="case-row">
        <span class="case-label">{{ t('projects.stack') }}</span>
        <ul class="case-stack">
          <li v-for="tech in project.stack" :key="tech" class="tag-pill">{{ tech }}</li>
        </ul>
      </div>

      <div class="case-row">
        <span class="case-label">{{ t('projects.highlights') }}</span>
        <ul class="case-list">
          <li v-for="(item, i) in project.highlights" :key="`h-${i}`">
            {{ pick(item) }}
          </li>
        </ul>
      </div>

      <div v-if="project.note" class="case-row">
        <span class="case-label">{{ t('projects.note') }}</span>
        <p class="case-note">{{ pick(project.note) }}</p>
      </div>

      <div v-if="project.install" class="case-row">
        <span class="case-label">{{ t('projects.install') }}</span>
        <code class="case-code">{{ project.install }}</code>
      </div>

      <div v-if="project.links.length" class="case-row">
        <span class="case-label">{{ t('projects.links') }}</span>
        <div class="case-links">
          <a
            v-for="link in project.links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noreferrer noopener"
            class="case-link"
          >
            {{ link.label }}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '@/i18n/index.js'

defineProps({
  project: { type: Object, required: true },
  open: { type: Boolean, default: false },
})

const { t, pick } = useI18n()
</script>

<style scoped>
.case-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 240ms var(--ease-aero);
}

.case-body.is-open {
  grid-template-rows: 1fr;
}

.case-inner {
  overflow: hidden;
  /* Closed state: keep it out of the tab order and out of the a11y tree */
  visibility: hidden;
  transition: visibility 0s linear 240ms;
}

.case-body.is-open .case-inner {
  visibility: visible;
  transition-delay: 0s;
}

.case-row {
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  gap: 0.9rem;
  padding: 0.85rem 0;
  border-top: 1px solid var(--border-l1);
}

.case-row:first-child {
  margin-top: 0.35rem;
}

.case-label {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-tertiary);
  padding-top: 0.15rem;
}

.case-stack {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.case-list {
  display: grid;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.66;
}

.case-list li {
  position: relative;
  padding-left: 0.95rem;
}

.case-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent-blue-soft);
}

.case-note {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  line-height: 1.66;
}

.case-code {
  display: inline-block;
  padding: 0.32rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-l2);
  background: rgba(255, 255, 255, 0.04);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--accent-sky);
  overflow-x: auto;
  max-width: 100%;
}

.case-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.case-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-l2);
  font-size: var(--text-sm);
  color: var(--accent-sky);
  transition:
    border-color var(--transition-base),
    background var(--transition-base);
}

.case-link:hover {
  border-color: var(--card-border-hover);
  background: rgba(255, 255, 255, 0.05);
}

@media (max-width: 600px) {
  .case-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-body,
  .case-inner {
    transition: none;
  }
}

/* Printing should show the full case study */
@media print {
  .case-body {
    grid-template-rows: 1fr !important;
  }
  .case-inner {
    visibility: visible !important;
  }
}
</style>
