<template>
  <section id="top" class="hero" aria-label="Introduction">
    <div class="hero-inner">
      <!-- 徽章 -->
      <span class="hero-kicker reveal reveal--vapor" :ref="reveal.observe" :style="{ '--reveal-delay': '60ms' }">
        <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="hero-star" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#7DF4E8" />
              <stop offset="0.55" stop-color="#8AB4FF" />
              <stop offset="1" stop-color="#A79BFF" />
            </linearGradient>
          </defs>
          <path
            d="M5 0L6.12 3.37L9.76 3.63L6.87 5.97L7.76 9.56L5 7.68L2.24 9.56L3.13 5.97L0.24 3.63L3.88 3.37L5 0Z"
            fill="url(#hero-star)"
          />
        </svg>
        <span>{{ t('hero.kicker') }}</span>
      </span>

      <!-- 头像：液态玻璃圆环 -->
      <div class="hero-avatar reveal reveal--vapor" :ref="reveal.observe" :style="{ '--reveal-delay': '180ms' }">
        <span class="avatar-ring">
          <picture>
            <source type="image/webp" :srcset="`${avatar} 1x, ${avatar2x} 2x`" />
            <img
              class="avatar-img"
              :src="avatarFallback"
              :alt="altText"
              width="120"
              height="120"
              loading="eager"
            />
          </picture>
        </span>
      </div>

      <!-- 主标题 -->
      <h1 class="hero-title reveal reveal--vapor" :ref="reveal.observe" :style="{ '--reveal-delay': '300ms' }">
        {{ title }}
      </h1>

      <!-- 定位 -->
      <p class="hero-role reveal reveal--vapor" :ref="reveal.observe" :style="{ '--reveal-delay': '420ms' }">
        {{ pick(subtitle) }}
      </p>

      <!-- 简介 -->
      <p class="hero-bio reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '540ms' }">
        {{ pick(bio) }}
      </p>

      <!-- 关注方向 -->
      <ul class="hero-focus reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '620ms' }">
        <li v-for="(item, i) in focus" :key="`focus-${i}`" class="focus-pill">
          {{ pick(item) }}
        </li>
      </ul>

      <p class="hero-meta reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '700ms' }">
        <span class="hero-name">{{ name }}</span>
        <span class="hero-sep" aria-hidden="true">·</span>
        <span class="hero-note">{{ pick(meta) }}</span>
      </p>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '@/i18n/index.js'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t, pick } = useI18n()

defineProps({
  avatar: { type: String, required: true },
  avatar2x: { type: String, required: true },
  avatarFallback: { type: String, required: true },
  altText: { type: String, default: 'Portrait of Harry Zhu' },
  title: { type: String, required: true },
  /** 双语散文：`{ en, zh }` */
  subtitle: { type: [String, Object], required: true },
  bio: { type: [String, Object], default: '' },
  name: { type: String, default: '' },
  meta: { type: [String, Object], default: '' },
  focus: { type: Array, default: () => [] },
})

const reveal = useScrollReveal({ threshold: 0.05 })
</script>

<style scoped>
.hero {
  display: grid;
  place-items: center;
  min-height: 100svh;
  padding: clamp(4rem, 12vh, 8rem) var(--shell-pad) clamp(4rem, 10vh, 7rem);
}

.hero-inner {
  display: grid;
  justify-items: center;
  gap: 1.05rem;
  width: 100%;
  max-width: 720px;
  min-width: 0;
  text-align: center;
}

.hero-inner > * {
  min-width: 0;
  max-width: 100%;
}

/* ===== 徽章 ===== */

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.34rem 0.9rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.05);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 8px 26px -14px rgba(2, 6, 26, 0.9);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-secondary);
}

/* ===== 头像圆环 ===== */

.hero-avatar {
  margin-top: 0.5rem;
}

.avatar-ring {
  display: block;
  width: clamp(92px, 13vw, 118px);
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 4px;
  background: conic-gradient(
    from 0deg,
    var(--accent-cyan) 0deg,
    var(--accent-blue) 120deg,
    var(--accent-violet) 240deg,
    var(--accent-cyan) 360deg
  );
  box-shadow:
    0 0 34px -8px rgba(125, 244, 232, 0.45),
    0 18px 44px -18px rgba(2, 6, 26, 0.95);
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

/* ===== 标题与定位 ===== */

.hero-title {
  margin: 0.35rem 0 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.9rem, 8vw, 4.9rem);
  line-height: 1.04;
  letter-spacing: var(--tracking-tight);
  background: linear-gradient(
    100deg,
    #FFFFFF 0%,
    var(--accent-blue) 40%,
    var(--accent-cyan) 62%,
    var(--accent-violet) 84%,
    #FFFFFF 100%
  );
  background-size: 220% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: title-flow 14s var(--ease-breathe) infinite alternate;
}

@keyframes title-flow {
  from { background-position: 0% 50%; }
  to   { background-position: 100% 50%; }
}

.hero-role {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  letter-spacing: var(--tracking-wide);
  color: var(--accent-cyan);
  text-shadow: 0 0 26px rgba(125, 244, 232, 0.28);
}

.hero-bio {
  margin: 0.2rem 0 0;
  max-width: 52ch;
  color: var(--text-secondary);
  font-size: clamp(0.94rem, 1.7vw, 1.02rem);
  line-height: 1.74;
  text-wrap: pretty;
}

/* ===== 关注方向 ===== */

.hero-focus {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.55rem 0 0;
  padding: 0;
  list-style: none;
}

.focus-pill {
  padding: 0.32rem 0.85rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02) 60%),
    rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
  font-size: var(--text-sm);
  color: var(--text-primary);
  white-space: nowrap;
}

/* ===== 署名 ===== */

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.35rem 0.5rem;
  margin: 0.75rem 0 0;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.hero-name {
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
}

.hero-note {
  text-wrap: balance;
}

.hero-sep {
  opacity: 0.6;
}

/* 窄屏署名会换行，分隔点会悬在行尾 —— 此时隐藏 */
@media (max-width: 600px) {
  .hero-sep {
    display: none;
  }
}

/* ===== Reduced motion：标题渐变停止（其余由全局规则处理） ===== */

@media (prefers-reduced-motion: reduce) {
  .hero-title {
    animation: none;
  }
}
</style>
