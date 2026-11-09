<script setup>
import { useI18n } from '@/i18n/index.js'

defineProps({
  /** 'published' | 'in-progress' | 'paused' | 'deprecated' | null */
  status: { type: String, default: null },
})

const { t } = useI18n()
</script>

<template>
  <span v-if="status" class="status" :class="`status--${status}`">
    <i class="status-dot" aria-hidden="true"></i>
    {{ t(`status.${status}`) }}
  </span>
</template>

<style scoped>
/* Inside the palette: live work is accent, stopped work is grey;
   a ring instead of a dot means not finished (in progress / deprecated). */
.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1.5px solid var(--text-3);
  background: var(--text-3);
}

.status--published .status-dot {
  border-color: var(--accent);
  background: var(--accent);
}

.status--in-progress .status-dot {
  border-color: var(--accent);
  background: transparent;
}

.status--deprecated .status-dot {
  background: transparent;
}
</style>
