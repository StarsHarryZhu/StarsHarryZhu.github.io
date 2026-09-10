<template>
  <div class="lang-toggle" role="group" :aria-label="t('lang.label')">
    <button
      v-for="opt in OPTIONS"
      :key="opt.id"
      type="button"
      class="lt-btn"
      :class="{ 'is-active': locale === opt.id }"
      :aria-pressed="locale === opt.id"
      @click="setLocale(opt.id)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from '@/i18n/index.js'

const { locale, t, setLocale } = useI18n()

const OPTIONS = [
  { id: 'en', label: 'EN' },
  { id: 'zh', label: '中文' },
]
</script>

<style scoped>
.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-l2);
  background: rgba(255, 255, 255, 0.04);
}

.lt-btn {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0.3rem 0.62rem;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.02em;
  color: var(--text-tertiary);
  cursor: pointer;
  /* Fixed width so switching languages never shifts the nav layout */
  min-width: 46px;
  transition:
    color var(--transition-base),
    background var(--transition-base);
}

.lt-btn:hover {
  color: var(--text-primary);
}

.lt-btn.is-active {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.lt-btn:focus-visible {
  outline: 2px solid var(--accent-blue-soft);
  outline-offset: 1px;
}
</style>
