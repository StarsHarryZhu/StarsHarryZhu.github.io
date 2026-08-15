<template>
  <section id="top" class="hero" aria-label="Introduction">
    <div class="hero-inner">
      <!-- Copy column -->
      <div class="hero-copy">
        <span class="hero-status reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '60ms' }">
          <i aria-hidden="true"></i>
          Portfolio · 2026
        </span>

        <h1 class="hero-title reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '180ms' }">
          {{ title }}
        </h1>

        <p class="hero-subtitle reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '320ms' }">
          {{ subtitle }}
        </p>

        <p class="hero-bio reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '440ms' }">
          {{ bio }}
        </p>

        <div class="hero-actions reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '580ms' }">
          <a href="#projects" class="btn btn-primary" @click.prevent="scrollTo('#projects')">
            View projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 5v14M19 12l-7 7-7-7"></path>
            </svg>
          </a>
          <a href="#contact" class="btn btn-secondary" @click.prevent="scrollTo('#contact')">
            Get in touch
          </a>
        </div>
      </div>

      <!-- Avatar orb: a lens of liquid glass with floating chips -->
      <div class="hero-stage reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '260ms' }">
        <div
          class="avatar-orb"
          :style="{ transform: `translate(${orbX}px, ${orbY}px)` }"
        >
          <div class="orb-halo" aria-hidden="true"></div>
          <div class="orb-ring" aria-hidden="true"></div>
          <picture class="orb-glass">
            <source
              type="image/webp"
              :srcset="`${avatar} 1x, ${avatar2x} 2x`"
            />
            <img
              class="orb-img"
              :src="avatarFallback"
              :alt="altText"
              width="160"
              height="160"
              loading="eager"
            />
          </picture>
          <span class="orb-shine" aria-hidden="true"></span>
        </div>

        <!-- Floating skill chips drifting around the orb -->
        <span
          v-for="chip in chips"
          :key="chip.label"
          class="float-chip"
          :class="chip.className"
          :style="chip.style"
          aria-hidden="true"
        >
          {{ chip.label }}
        </span>
      </div>
    </div>

    <!-- Scroll cue -->
    <a
      href="#about"
      class="hero-scroll-cue"
      @click.prevent="scrollTo('#about')"
      aria-label="Scroll to About"
    >
      <span class="cue-line"></span>
    </a>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useParallax } from '@/composables/useParallax'
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = defineProps({
  avatar: { type: String, required: true },
  avatar2x: { type: String, required: true },
  avatarFallback: { type: String, required: true },
  altText: { type: String, default: 'Portrait of Harry Zhu' },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  bio: { type: String, default: '' },
})

// Shared normalized pointer in [-1, 1] — orb and chips drift slightly
// toward the cursor (liquid response).
const { mouseX, mouseY } = useParallax()

const reveal = useScrollReveal({ threshold: 0.05 })

const orbX = computed(() => mouseX.value * -10)
const orbY = computed(() => mouseY.value * -10)

// Floating chips around the orb — plain style objects computed from the
// shared pointer so the template binds values, not refs.
const CHIP_DEFS = [
  { label: 'C++', depth: 10, style: { '--chip-x': '104%', '--chip-y': '-6%', '--chip-dur': '6.4s', '--chip-delay': '-1.2s' } },
  { label: 'Python', depth: 16, style: { '--chip-x': '-26%', '--chip-y': '4%', '--chip-dur': '7.1s', '--chip-delay': '-3.4s' } },
  { label: 'YOLO', depth: 8, style: { '--chip-x': '112%', '--chip-y': '44%', '--chip-dur': '5.8s', '--chip-delay': '-2.1s' } },
  { label: 'TensorRT', depth: 14, style: { '--chip-x': '-18%', '--chip-y': '58%', '--chip-dur': '6.9s', '--chip-delay': '-0.6s' } },
  { label: 'SwiftUI', depth: 12, style: { '--chip-x': '42%', '--chip-y': '-24%', '--chip-dur': '7.6s', '--chip-delay': '-4.2s' } },
  { label: 'Vue 3', depth: 18, style: { '--chip-x': '-40%', '--chip-y': '86%', '--chip-dur': '6.1s', '--chip-delay': '-2.8s' } },
]

const chips = computed(() =>
  CHIP_DEFS.map((def, i) => ({
    label: def.label,
    className: `float-chip--${i % 3}`,
    style: {
      ...def.style,
      transform: `translate(${mouseX.value * -def.depth}px, ${mouseY.value * -def.depth}px)`,
    },
  })),
)

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
  min-height: 100svh;
  padding: calc(var(--nav-height) + 1.5rem) var(--shell-pad) 4rem;
  scroll-margin-top: var(--nav-height);
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  align-items: center;
  gap: clamp(2rem, 6vw, 5rem);
  width: 100%;
  max-width: var(--content-width);
}

/* ===== Copy ===== */

.hero-copy {
  display: grid;
  gap: 1.1rem;
  justify-items: start;
}

.hero-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.36rem 0.95rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04) 60%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-secondary);
}

.hero-status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 30%, #fff, var(--accent-cyan));
  box-shadow: 0 0 9px rgba(125, 244, 232, 0.75);
  animation: status-breathe 2.6s var(--ease-breathe) infinite;
}

@keyframes status-breathe {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}

.hero-title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(3.2rem, 9vw, 6rem);
  line-height: 1.02;
  letter-spacing: var(--tracking-tight);
  background: linear-gradient(
    100deg,
    #FFFFFF 0%,
    var(--accent-sky) 38%,
    var(--accent-cyan) 62%,
    var(--accent-violet) 85%,
    #FFFFFF 100%
  );
  background-size: 220% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 30px rgba(74, 138, 196, 0.28));
  animation: title-flow 12s var(--ease-breathe) infinite alternate;
}

@keyframes title-flow {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}

.hero-subtitle {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.05rem, 2.4vw, 1.35rem);
  letter-spacing: var(--tracking-wide);
  color: var(--accent-cyan);
  text-shadow: 0 0 24px rgba(125, 244, 232, 0.3);
}

.hero-bio {
  margin: 0;
  max-width: 46ch;
  color: var(--text-secondary);
  font-size: clamp(0.95rem, 1.8vw, 1.05rem);
  line-height: 1.75;
  text-wrap: pretty;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.4rem;
}

/* ===== Avatar orb: a lens of liquid glass ===== */

.hero-stage {
  position: relative;
  justify-self: center;
  width: clamp(260px, 30vw, 360px);
  aspect-ratio: 1;
  will-change: transform;
}

.avatar-orb {
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  will-change: transform;
  transition: transform 0.15s linear;
}

.orb-halo {
  position: absolute;
  inset: -22%;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(var(--halo-cyan), var(--halo-sky) 42%, transparent 70%);
  filter: blur(28px);
  opacity: 0.5;
  animation: halo-breathe 8s var(--ease-breathe) infinite alternate;
}

.orb-ring {
  position: absolute;
  inset: -5%;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--accent-cyan) 0deg,
    var(--accent-sky) 90deg,
    var(--accent-violet) 180deg,
    var(--accent-blue-soft) 270deg,
    var(--accent-cyan) 360deg
  );
  filter: blur(6px);
  opacity: 0.5;
  animation: ring-spin 16s linear infinite;
  mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px));
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px));
}

@keyframes ring-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orb-glass {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  padding: 7px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0.28) 100%);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.25),
    0 22px 60px -16px rgba(2, 6, 26, 0.9),
    0 0 44px -8px rgba(125, 244, 232, 0.35);
}

.orb-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  transition: transform var(--transition-base);
}

.orb-shine {
  position: absolute;
  top: 6%;
  left: 10%;
  width: 38%;
  height: 24%;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.75), transparent 70%);
  filter: blur(2px);
  pointer-events: none;
}

@media (hover: hover) and (pointer: fine) {
  .avatar-orb:hover .orb-img {
    transform: scale(1.04);
  }
}

/* ===== Floating skill chips (HarmonyOS 气态 floating × 毛玻璃) ===== */

.float-chip {
  position: absolute;
  left: var(--chip-x);
  top: var(--chip-y);
  padding: 0.46rem 0.98rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.26);
  background:
    linear-gradient(
      160deg,
      rgba(255, 255, 255, 0.14) 0%,
      rgba(255, 255, 255, 0.05) 42%,
      rgba(255, 255, 255, 0.02) 100%
    ),
    rgba(35, 35, 36, 0.22);
  backdrop-filter:
    blur(18px)
    saturate(1.7)
    brightness(1.08);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(255, 255, 255, 0.06),
    0 12px 32px -10px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.03em;
  color: var(--text-primary);
  white-space: nowrap;
  animation: chip-float var(--chip-dur, 6.5s) var(--ease-breathe) var(--chip-delay, 0s) infinite alternate;
  will-change: transform;
  pointer-events: none;
}

/* Frosted-glass top light: a bright catch-light falling from the top edge */
.float-chip::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.22) 0%,
      rgba(255, 255, 255, 0.05) 45%,
      transparent 75%
    ),
    radial-gradient(
      90% 80% at 22% -18%,
      rgba(255, 255, 255, 0.24),
      transparent 62%
    );
}

/* Frosted-glass refraction tint — colored light pooling at the bottom edge */
.float-chip::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(
    85% 60% at 50% 122%,
    rgba(74, 138, 196, 0.3),
    transparent 68%
  );
}

@keyframes chip-float {
  from { translate: 0 -9px; }
  to { translate: 0 9px; }
}

/* ===== Scroll cue ===== */

.hero-scroll-cue {
  position: absolute;
  bottom: 1.6rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border-radius: var(--radius-full);
  opacity: 0.7;
  transition: opacity var(--transition-base);
}

.hero-scroll-cue:hover {
  opacity: 1;
}

.cue-line {
  width: 2px;
  height: 34px;
  border-radius: var(--radius-full);
  background: linear-gradient(180deg, var(--accent-cyan), transparent);
  box-shadow: 0 0 10px rgba(125, 244, 232, 0.5);
  animation: cue-drip 2.2s var(--ease-aero) infinite;
  transform-origin: top center;
}

@keyframes cue-drip {
  0% { transform: scaleY(0.3); opacity: 0.2; }
  40% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(0.3) translateY(8px); opacity: 0.2; }
}

/* ===== Responsive ===== */

@media (max-width: 860px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
    gap: 2.5rem;
  }

  .hero-copy {
    justify-items: center;
  }

  .hero-bio {
    max-width: 56ch;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stage {
    order: -1;
    width: clamp(220px, 52vw, 300px);
  }

  .float-chip {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-title,
  .hero-status i,
  .orb-ring,
  .orb-halo,
  .float-chip,
  .cue-line {
    animation: none;
  }
  .avatar-orb,
  .float-chip {
    transition: none;
  }
}
</style>
