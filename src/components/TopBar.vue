<template>
  <header class="topbar">
    <div class="tb-inner">
      <a href="#top" class="tb-brand" @click.prevent="toTop">
        <svg width="15" height="15" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="tb-star" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#7DF4E8" />
              <stop offset="0.55" stop-color="#8AB4FF" />
              <stop offset="1" stop-color="#A79BFF" />
            </linearGradient>
          </defs>
          <path
            d="M5 0L6.12 3.37L9.76 3.63L6.87 5.97L7.76 9.56L5 7.68L2.24 9.56L3.13 5.97L0.24 3.63L3.88 3.37L5 0Z"
            fill="url(#tb-star)"
          />
        </svg>
        <span>starfield</span>
      </a>

      <p class="tb-status">
        <i class="tb-dot" aria-hidden="true"></i>
        <span>{{ t('topbar.status') }}</span>
      </p>

      <LanguageToggle />
    </div>
  </header>
</template>

<script setup>
import LanguageToggle from '@/components/LanguageToggle.vue'
import { useI18n } from '@/i18n/index.js'

const { t } = useI18n()

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* 信息顶栏（非导航）：品牌 · 状态 · 语言切换
   不使用 backdrop-filter（滚动零成本）；底色完全不透明，
   彻底避免下方内容透出造成文字叠字。 */

.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-nav);
  background: #070A14;
  border-bottom: 1px solid var(--border-l1);
}

.tb-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: var(--content-width);
  height: 54px;
  margin-inline: auto;
  padding-inline: var(--shell-pad);
}

/* ===== 品牌 ===== */

.tb-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
  transition: color var(--transition-base);
}

.tb-brand:hover {
  color: var(--accent-cyan);
}

/* ===== 状态 ===== */

.tb-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0 auto;
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-tertiary);
  white-space: nowrap;
}

.tb-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 30%, #ffffff, var(--accent-cyan));
  flex-shrink: 0;
}

@media (max-width: 700px) {
  .tb-status {
    display: none;
  }

  .tb-inner {
    justify-content: space-between;
  }
}
</style>
