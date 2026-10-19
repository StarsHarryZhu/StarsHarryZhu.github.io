<script setup>
import { computed, useTemplateRef } from 'vue'
import { gas } from '@/effects/gas/index.js'
import { useI18n } from '@/i18n/index.js'

const { locale, t, setLocale } = useI18n()

const OPTIONS = [
  { id: 'en', label: 'EN' },
  { id: 'zh', label: '中文' },
]

const group = useTemplateRef('group')
const activeIndex = computed(() => OPTIONS.findIndex((opt) => opt.id === locale.value))

function choose(id) {
  if (id === locale.value) return
  setLocale(id)
  // the old language evaporates off the switch
  if (group.value) gas.puff(group.value.getBoundingClientRect(), { mode: 'disperse', dir: [0, 1], strength: 0.5 })
}
</script>

<template>
  <div
    ref="group"
    class="lang-toggle"
    role="group"
    :aria-label="t('lang.label')"
    :style="{ '--active': activeIndex }"
  >
    <span class="lt-drop" aria-hidden="true"></span>
    <button
      v-for="opt in OPTIONS"
      :key="opt.id"
      type="button"
      class="lt-btn"
      :class="{ 'is-active': locale === opt.id }"
      :aria-pressed="locale === opt.id"
      @click="choose(opt.id)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped>
.lang-toggle {
  --lt-width: 48px;
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 3px;
  border-radius: var(--radius-full);
  background: rgba(3, 5, 12, 0.32);
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.35),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08);
}

/* the selected language sits in a sliding glass droplet */
.lt-drop {
  position: absolute;
  top: 3px;
  left: 3px;
  width: var(--lt-width);
  height: calc(100% - 6px);
  border-radius: var(--radius-full);
  background:
    radial-gradient(120% 90% at 30% 0%, rgba(255, 255, 255, 0.34), transparent 60%),
    linear-gradient(160deg, rgba(79, 235, 221, 0.22), rgba(148, 104, 255, 0.2));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.45),
    inset 0 -6px 10px -6px rgba(148, 104, 255, 0.7),
    0 4px 12px -4px rgba(2, 4, 18, 0.8);
  transform: translateX(calc(var(--active) * var(--lt-width)));
  transition: transform 420ms cubic-bezier(0.34, 1.4, 0.5, 1);
}

.lt-btn {
  position: relative;
  appearance: none;
  border: 0;
  background: transparent;
  width: var(--lt-width);
  padding: 0.32rem 0;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.02em;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: color var(--transition-base);
}

.lt-btn:hover,
.lt-btn.is-active {
  color: var(--text-primary);
}

.lt-btn:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 1px;
}
</style>
