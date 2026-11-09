<script setup>
import { useI18n } from '@/i18n/index.js'

const { locale, t, setLocale } = useI18n()

const OPTIONS = [
  { id: 'en', label: 'EN' },
  { id: 'zh', label: '中文' },
]
</script>

<template>
  <div class="lang-toggle mono" role="group" :aria-label="t('lang.label')">
    <template v-for="(opt, i) in OPTIONS" :key="opt.id">
      <span v-if="i" class="lang-sep" aria-hidden="true">/</span>
      <button
        type="button"
        class="lang-btn"
        :class="{ 'is-active': locale === opt.id }"
        :aria-pressed="locale === opt.id"
        @click="setLocale(opt.id)"
      >
        {{ opt.label }}
      </button>
    </template>
  </div>
</template>

<style scoped>
.lang-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-btn {
  padding: 4px 2px;
  transition: color var(--dur) var(--ease);
}

.lang-btn:hover,
.lang-btn.is-active {
  color: var(--text);
}
</style>
