<script setup>
import { useI18n } from '@/i18n/index.js'

defineProps({
  /** 'published' | 'in-progress' | 'paused' | 'deprecated' | null */
  status: { type: String, default: null },
})

const { t } = useI18n()
</script>

<template>
  <span v-if="status" class="status-badge" :class="`status-badge--${status}`">
    <i class="sb-dot" aria-hidden="true"></i>
    {{ t(`status.${status}`) }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--line-2);
  background: rgba(255, 255, 255, 0.04);
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  letter-spacing: 0.03em;
  color: var(--text-secondary);
  white-space: nowrap;
}

.sb-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Published — accent blue, glowing dot */
.status-badge--published {
  border-color: rgba(138, 180, 255, 0.4);
  color: var(--accent-blue);
  background: rgba(91, 124, 255, 0.1);
}

.status-badge--published .sb-dot {
  background: var(--accent-blue);
  box-shadow: 0 0 8px rgba(138, 180, 255, 0.8);
}

/* In progress — neutral, filled dot */
.status-badge--in-progress .sb-dot {
  background: var(--text-secondary);
}

/* Paused — dashed border, hollow dot */
.status-badge--paused {
  border-style: dashed;
  color: var(--text-tertiary);
}

.status-badge--paused .sb-dot {
  background: transparent;
  border: 1px solid var(--text-tertiary);
}

/* Deprecated — muted, solid dot (terminal state) */
.status-badge--deprecated {
  color: var(--text-tertiary);
  background: rgba(255, 255, 255, 0.02);
}

.status-badge--deprecated .sb-dot {
  background: var(--text-tertiary);
}
</style>
