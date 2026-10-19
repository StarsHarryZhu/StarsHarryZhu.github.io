<script setup>
import { useCondense } from '@/composables/useCondense.js'
import { useI18n } from '@/i18n/index.js'

const { t, pick } = useI18n()

defineProps({
  avatar: { type: String, required: true },
  avatar2x: { type: String, required: true },
  avatarFallback: { type: String, required: true },
  altText: { type: String, default: 'Portrait of Harry Zhu' },
  title: { type: String, required: true },
  /** bilingual prose: `{ en, zh }` */
  subtitle: { type: [String, Object], required: true },
  bio: { type: [String, Object], default: '' },
  name: { type: String, default: '' },
  meta: { type: [String, Object], default: '' },
  focus: { type: Array, default: () => [] },
})

const condense = useCondense({ threshold: 0.05 })
// the title gathers out of a cloud of vapour on first load
const gather = useCondense({ threshold: 0.05, vapor: true })
</script>

<template>
  <section id="top" class="hero" aria-label="Introduction">
    <div class="hero-inner">
      <span :ref="condense.observe" class="hero-kicker condense condense--vapor" :style="{ '--condense-delay': '60ms' }">
        <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="hero-star" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#7DF4E8" />
              <stop offset="0.55" stop-color="#8AB4FF" />
              <stop offset="1" stop-color="#B4A5FF" />
            </linearGradient>
          </defs>
          <path
            d="M5 0L6.12 3.37L9.76 3.63L6.87 5.97L7.76 9.56L5 7.68L2.24 9.56L3.13 5.97L0.24 3.63L3.88 3.37L5 0Z"
            fill="url(#hero-star)"
          />
        </svg>
        <span>{{ t('hero.kicker') }}</span>
      </span>

      <!-- avatar in a liquid-glass ring -->
      <div :ref="condense.observe" class="hero-avatar condense condense--vapor" :style="{ '--condense-delay': '180ms' }">
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

      <h1 :ref="gather.observe" class="hero-title condense condense--vapor" :style="{ '--condense-delay': '300ms' }">
        {{ title }}
      </h1>

      <p :ref="condense.observe" class="hero-role condense condense--vapor" :style="{ '--condense-delay': '420ms' }">
        {{ pick(subtitle) }}
      </p>

      <p :ref="condense.observe" class="hero-bio condense" :style="{ '--condense-delay': '540ms' }">
        {{ pick(bio) }}
      </p>

      <ul :ref="condense.observe" class="hero-focus condense" :style="{ '--condense-delay': '620ms' }">
        <li v-for="(item, i) in focus" :key="`focus-${i}`" class="focus-pill">
          {{ pick(item) }}
        </li>
      </ul>

      <p :ref="condense.observe" class="hero-meta condense" :style="{ '--condense-delay': '700ms' }">
        <span class="hero-name">{{ name }}</span>
        <span class="hero-sep" aria-hidden="true">·</span>
        <span class="hero-note">{{ pick(meta) }}</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  place-items: center;
  min-height: 100svh;
  padding: clamp(5rem, 13vh, 8.5rem) var(--shell-pad) clamp(4rem, 10vh, 7rem);
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

/* ===== Kicker: a small glass pill ===== */

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.34rem 0.9rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.16);
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.1), transparent 70%),
    rgba(255, 255, 255, 0.03);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 0 -6px 12px -10px rgba(148, 104, 255, 0.8),
    0 8px 26px -14px rgba(2, 4, 18, 0.9);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-secondary);
}

/* ===== Avatar ring: a refracting glass torus ===== */

.hero-avatar {
  margin-top: 0.5rem;
}

.avatar-ring {
  position: relative;
  display: block;
  width: clamp(92px, 13vw, 118px);
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 5px;
  background:
    radial-gradient(80% 60% at 30% 10%, rgba(255, 255, 255, 0.55), transparent 55%),
    conic-gradient(
      from 210deg,
      var(--nebula-cyan),
      var(--nebula-blue),
      var(--nebula-violet),
      var(--nebula-magenta),
      var(--nebula-cyan)
    );
  box-shadow:
    inset 0 2px 3px rgba(255, 255, 255, 0.5),
    inset 0 -3px 6px rgba(20, 8, 60, 0.6),
    0 0 36px -8px rgba(79, 235, 221, 0.5),
    0 18px 44px -18px rgba(2, 4, 18, 0.95);
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
}

/* ===== Title and role ===== */

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
    var(--accent-blue) 38%,
    var(--accent-cyan) 60%,
    var(--accent-violet) 82%,
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
  text-shadow: 0 0 26px rgba(79, 235, 221, 0.32);
}

.hero-bio {
  margin: 0.2rem 0 0;
  max-width: 52ch;
  color: var(--text-secondary);
  font-size: clamp(0.94rem, 1.7vw, 1.02rem);
  line-height: 1.74;
  text-wrap: pretty;
}

/* ===== Focus pills ===== */

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
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 -5px 10px -8px rgba(79, 235, 221, 0.6);
  font-size: var(--text-sm);
  color: var(--text-primary);
  white-space: nowrap;
}

/* ===== Byline ===== */

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

/* the byline wraps on narrow screens and the dot would hang at a line end */
@media (max-width: 600px) {
  .hero-sep {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-title {
    animation: none;
  }
}
</style>
