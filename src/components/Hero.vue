<template>
  <section id="top" class="hero" aria-label="Introduction">
    <div class="hero-inner">
      <!-- Left: copy -->
      <div class="hero-copy">
        <span class="hero-kicker reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '40ms' }">
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="hero-star" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#6EA8FE" />
                <stop offset="0.6" stop-color="#8FB8FF" />
                <stop offset="1" stop-color="#A9B8E8" />
              </linearGradient>
            </defs>
            <path
              d="M5 0L6.12 3.37L9.76 3.63L6.87 5.97L7.76 9.56L5 7.68L2.24 9.56L3.13 5.97L0.24 3.63L3.88 3.37L5 0Z"
              fill="url(#hero-star)"
            />
          </svg>
          <span>Portfolio · 2026</span>
        </span>

        <h1 class="hero-title reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '150ms' }">
          {{ title }}
        </h1>

        <p class="hero-subtitle reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '290ms' }">
          {{ subtitle }}
        </p>

        <p class="hero-bio reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '420ms' }">
          {{ bio }}
        </p>

        <div class="hero-actions reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '540ms' }">
          <a href="#projects" class="btn btn-primary" @click.prevent="scrollTo('#projects')">
            View projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"></path>
            </svg>
          </a>
          <a href="#contact" class="btn btn-secondary" @click.prevent="scrollTo('#contact')">
            Get in touch
          </a>
        </div>

        <div class="hero-meta reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '660ms' }">
          <picture class="avatar-ring">
            <source type="image/webp" :srcset="`${avatar} 1x, ${avatar2x} 2x`" />
            <img
              class="avatar-img"
              :src="avatarFallback"
              :alt="altText"
              width="36"
              height="36"
              loading="eager"
            />
          </picture>
          <span class="hero-meta-name">{{ name }}</span>
          <span class="hero-meta-sep" aria-hidden="true">·</span>
          <span class="hero-meta-note">{{ meta }}</span>
        </div>
      </div>

      <!-- Right: static showcase card (纯装饰，无动画) -->
      <div class="hero-visual reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '300ms' }" aria-hidden="true">
        <div class="hv-card">
          <div class="hv-glow"></div>
          <div class="hv-orbit"></div>
          <div class="hv-core">
            <picture>
              <source type="image/webp" :srcset="`${avatar} 1x, ${avatar2x} 2x`" />
              <img :src="avatarFallback" alt="" width="128" height="128" />
            </picture>
          </div>
          <div class="hv-cap">@starsharryzhu</div>
        </div>
      </div>
    </div>

    <!-- Scroll cue -->
    <a href="#about" class="hero-scroll-cue" @click.prevent="scrollTo('#about')" aria-label="Scroll to About">
      <span class="cue-line"></span>
    </a>
  </section>
</template>

<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'

defineProps({
  avatar: { type: String, required: true },
  avatar2x: { type: String, required: true },
  avatarFallback: { type: String, required: true },
  altText: { type: String, default: 'Portrait of Harry Zhu' },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  bio: { type: String, default: '' },
  name: { type: String, default: '' },
  meta: { type: String, default: '' },
})

const reveal = useScrollReveal({ threshold: 0.05 })

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.hero {
  position: relative;
  display: grid;
  place-items: center;
  min-height: calc(100svh - var(--nav-height));
  padding: calc(var(--nav-height) + 2rem) var(--shell-pad) 4rem;
  scroll-margin-top: var(--nav-height);
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  align-items: center;
  gap: clamp(2.5rem, 6vw, 5rem);
  width: 100%;
  max-width: var(--content-width);
}

/* ===== Copy column ===== */

.hero-copy {
  display: grid;
  gap: 1rem;
  justify-items: start;
  min-width: 0;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.32rem 0.8rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-l2);
  background: rgba(255, 255, 255, 0.04);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.hero-title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.7rem, 6.5vw, 4.4rem);
  line-height: 1.06;
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
  max-width: 14ch;
}

.hero-subtitle {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: var(--accent-sky);
}

.hero-bio {
  margin: 0;
  max-width: 46ch;
  color: var(--text-secondary);
  font-size: clamp(0.94rem, 1.6vw, 1rem);
  line-height: 1.72;
  text-wrap: pretty;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 0.5rem;
}

/* ===== Meta row ===== */

.hero-meta {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 0.6rem;
  padding: 0.35rem 0.7rem 0.35rem 0.4rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-l1);
  background: rgba(255, 255, 255, 0.03);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.avatar-ring {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(135deg, var(--accent-blue-soft), var(--accent-violet));
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.hero-meta-name {
  font-weight: 600;
  color: var(--text-primary);
}

.hero-meta-sep {
  color: var(--text-tertiary);
}

.hero-meta-note {
  color: var(--text-tertiary);
  white-space: nowrap;
}

/* ===== Visual column: static card, zero animation ===== */

.hero-visual {
  min-width: 0;
}

.hv-card {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  max-width: 380px;
  margin-inline: auto;
  border-radius: var(--radius-panel);
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  box-shadow: var(--shadow-float);
  overflow: hidden;
}

/* Static gradient glow (no animation) */
.hv-glow {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(52% 46% at 30% 26%, rgba(77, 124, 254, 0.25) 0%, transparent 70%),
    radial-gradient(40% 36% at 74% 66%, rgba(110, 168, 254, 0.14) 0%, transparent 70%);
}

/* Static concentric orbit rings */
.hv-orbit {
  position: absolute;
  inset: 14%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hv-orbit::before {
  content: '';
  position: absolute;
  inset: -16%;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.06);
}

.hv-core {
  position: relative;
  width: 46%;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 5px;
  background: linear-gradient(135deg, var(--accent-blue-soft), var(--accent-violet));
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.6);
}

.hv-core img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.hv-cap {
  position: absolute;
  bottom: 1.1rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  color: var(--text-tertiary);
  white-space: nowrap;
}

/* ===== Scroll cue ===== */

.hero-scroll-cue {
  position: absolute;
  bottom: 1.4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border-radius: var(--radius-full);
  opacity: 0.6;
  transition: opacity var(--transition-base);
}

.hero-scroll-cue:hover {
  opacity: 1;
}

.cue-line {
  width: 2px;
  height: 32px;
  border-radius: var(--radius-full);
  background: linear-gradient(180deg, var(--accent-blue-soft), transparent);
  animation: cue-drip 2.2s var(--ease-aero) infinite;
  transform-origin: top center;
}

@keyframes cue-drip {
  0% { transform: scaleY(0.3); opacity: 0.2; }
  40% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(0.3) translateY(6px); opacity: 0.2; }
}

/* ===== Responsive ===== */

@media (max-width: 860px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
    gap: 2.2rem;
  }

  .hero-copy {
    justify-items: center;
  }

  .hero-bio {
    max-width: 54ch;
  }

  .hero-title {
    max-width: none;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-visual {
    order: -1;
    width: min(300px, 78vw);
  }

  .hero-meta {
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cue-line {
    animation: none;
  }
}
</style>
