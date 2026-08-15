<template>
  <section id="experience" class="experience-section" aria-label="Experience">
    <SectionHeader index="02" title="Experience" />

    <div class="panel experience-panel reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '100ms' }">
      <span class="panel-halo" aria-hidden="true"></span>

      <div class="timeline-track">
        <div
          v-for="(entry, index) in items"
          :key="`timeline-${index}`"
          class="timeline-entry"
        >
          <div class="timeline-marker" aria-hidden="true">
            <div class="timeline-dot"></div>
            <div v-if="index < items.length - 1" class="timeline-line"></div>
          </div>

          <article class="timeline-item">
            <div class="timeline-head">
              <span class="timeline-period">{{ entry.period }}</span>
              <span v-if="entry.location" class="timeline-location">{{ entry.location }}</span>
            </div>
            <h3 class="timeline-title">{{ entry.title }}</h3>
            <p v-if="entry.subtitle" class="timeline-subtitle">{{ entry.subtitle }}</p>
            <ul v-if="entry.highlights && entry.highlights.length" class="timeline-highlights">
              <li v-for="(highlight, hi) in entry.highlights" :key="`highlight-${hi}`">
                {{ highlight }}
              </li>
            </ul>
            <div v-if="entry.tags && entry.tags.length" class="timeline-tags">
              <span v-for="(tag, ti) in entry.tags" :key="`ttag-${ti}`" class="tag-pill">{{ tag }}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from '@/components/SectionHeader.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

defineProps({
  items: { type: Array, required: true },
})

const reveal = useScrollReveal({ rootMargin: '0px 0px -8% 0px' })
</script>

<style scoped>
.experience-section {
  scroll-margin-top: calc(var(--nav-height) + 1rem);
}

.experience-panel {
  padding: clamp(1.3rem, 3vw, 2rem);
  margin-top: 1.1rem;
}

/* ===== Compact timeline ===== */

.timeline-track {
  display: grid;
  gap: 0;
}

.timeline-entry {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 0.9rem;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
}

.timeline-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, #ffffff, var(--accent-cyan) 60%);
  box-shadow:
    inset -1px -2px 3px rgba(0, 0, 0, 0.35),
    0 0 14px rgba(125, 244, 232, 0.6);
  flex-shrink: 0;
  animation: dot-breathe 3s var(--ease-breathe) infinite;
}

@keyframes dot-breathe {
  0%, 100% {
    box-shadow:
      inset -1px -2px 3px rgba(0, 0, 0, 0.35),
      0 0 8px rgba(125, 244, 232, 0.35);
  }
  50% {
    box-shadow:
      inset -1px -2px 3px rgba(0, 0, 0, 0.35),
      0 0 20px rgba(125, 244, 232, 0.85);
  }
}

.timeline-line {
  width: 2px;
  flex: 1;
  min-height: 20px;
  margin-top: var(--space-1);
  border-radius: var(--radius-full);
  background: linear-gradient(
    180deg,
    var(--accent-cyan) 0%,
    rgba(74, 138, 196, 0.5) 45%,
    rgba(150, 130, 255, 0.45) 100%
  );
  opacity: 0.45;
}

.timeline-item {
  position: relative;
  display: grid;
  gap: 0.3rem;
  align-content: start;
  padding: 0.55rem 0 1.25rem;
}

.timeline-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.3rem 0.8rem;
}

.timeline-period {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--accent-cyan);
}

.timeline-location {
  margin: 0;
  font-size: var(--text-2xs);
  color: var(--text-tertiary);
}

.timeline-title {
  margin: 0.05rem 0 0;
  font-family: var(--font-display);
  font-size: 1.08rem;
  font-weight: 600;
  color: var(--text-primary);
}

.timeline-subtitle {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.timeline-highlights {
  display: grid;
  gap: 0.3rem;
  margin: 0.25rem 0 0;
  padding: 0;
  list-style: none;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  line-height: 1.62;
}

.timeline-highlights li {
  position: relative;
  padding-left: 0.95rem;
}

.timeline-highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, #fff, var(--accent-cyan));
  box-shadow: 0 0 6px rgba(125, 244, 232, 0.6);
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.36rem;
  margin-top: 0.4rem;
}

@media (prefers-reduced-motion: reduce) {
  .timeline-dot {
    animation: none;
  }
}
</style>
