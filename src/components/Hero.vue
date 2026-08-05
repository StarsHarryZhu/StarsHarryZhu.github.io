<template>
  <section class="panel panel--hero hero reveal" :ref="reveal.observe" aria-label="Introduction">
    <div class="hero-inner">
      <div class="avatar-ring" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            :srcset="`${avatar} 1x, ${avatar2x} 2x`"
          />
          <img
            class="avatar"
            :src="avatarFallback"
            :alt="altText"
            width="132"
            height="132"
            loading="eager"
          />
        </picture>
      </div>
      <div class="hero-copy">
        <h1 class="hero-title">{{ title }}</h1>
        <p class="hero-subtitle">{{ subtitle }}</p>
      </div>
    </div>
    <span class="hero-scroll-cue" aria-hidden="true"></span>
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
})

const reveal = useScrollReveal({ threshold: 0.05 })
</script>

<style scoped>
.hero {
  --panel-blur: 20px;
  --panel-halo: var(--halo-cyan);
  padding: clamp(3rem, 10vh, 6rem);
}

.hero-inner {
  display: flex;
  align-items: center;
  gap: clamp(1.4rem, 4vw, 2.6rem);
}

/* ===== Avatar: circular, aurora gradient ring + breathing halo ===== */

.avatar-ring {
  flex-shrink: 0;
  width: clamp(96px, 14vw, 132px);
  height: clamp(96px, 14vw, 132px);
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(
    135deg,
    var(--star-cyan) 0%,
    var(--star-blue) 45%,
    var(--star-violet) 80%,
    var(--star-cyan) 100%
  );
  background-size: 180% 180%;
  animation: ring-breathe 4.5s var(--ease-aurora) infinite alternate;
}

@keyframes ring-breathe {
  from {
    box-shadow:
      0 0 18px rgba(125, 244, 232, 0.16),
      0 0 44px rgba(108, 168, 247, 0.14);
  }
  to {
    box-shadow:
      0 0 30px rgba(125, 244, 232, 0.28),
      0 0 64px rgba(155, 139, 255, 0.2);
  }
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
  object-fit: cover;
  object-position: center;
  transition: transform var(--transition-base);
}

@media (hover: hover) and (pointer: fine) {
  .avatar-ring:hover .avatar {
    transform: scale(1.04);
  }
}

/* ===== Title: aurora shimmer + white core glint ===== */

.hero-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.03;
  background: linear-gradient(
    90deg,
    var(--star-cyan) 0%,
    var(--star-blue) 30%,
    var(--star-violet) 60%,
    var(--star-cyan) 100%
  );
  background-size: 220% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 2px rgba(234, 242, 255, 0.35));
  animation: title-aurora 9s var(--ease-aurora) infinite alternate;
}

@keyframes title-aurora {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}

.hero-subtitle {
  margin: 0.6rem 0 0;
  color: var(--text-secondary);
  font-size: clamp(1.05rem, 2.4vw, 1.4rem);
  font-weight: 500;
  letter-spacing: 0.01em;
}

/* ===== Scroll cue: faint chevron, fades in a loop ===== */

.hero-scroll-cue {
  position: absolute;
  left: 50%;
  bottom: clamp(1.2rem, 3vh, 2rem);
  width: 18px;
  height: 10px;
  transform: translateX(-50%);
  opacity: 0;
  animation: cue-fade 1.6s var(--ease-aurora) 0.6s infinite alternate;
}

.hero-scroll-cue::before {
  content: '';
  position: absolute;
  inset: 0;
  border-left: 1.5px solid var(--star-cyan);
  border-bottom: 1.5px solid var(--star-cyan);
  border-radius: 2px;
  transform: rotate(-45deg);
  opacity: 0.7;
}

@keyframes cue-fade {
  from { opacity: 0; }
  to { opacity: 0.85; }
}

@media (prefers-reduced-motion: reduce) {
  .avatar-ring,
  .hero-title {
    animation: none;
  }
  .avatar-ring {
    box-shadow: none;
  }
  .hero-scroll-cue {
    animation: none;
    opacity: 0.6;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: clamp(1.6rem, 6vw, 2.4rem);
  }
  .hero-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
