<template>
  <section ref="root" class="skills" aria-label="Skills">
    <div class="skills-grid">
      <div
        v-for="(category, ci) in categories"
        :key="`cat-${ci}`"
        :ref="(el) => reveal.observe(el)"
        class="panel skill-panel reveal"
        :class="`skill-panel--${ACCENTS[ci % ACCENTS.length]}`"
        :style="{ '--reveal-delay': `${ci * 120}ms` }"
      >
        <div class="skill-accent" aria-hidden="true"></div>
        <h3 v-if="category.name" class="skill-label">{{ category.name }}</h3>
        <ul class="skills-list">
          <li
            v-for="(skill, si) in category.skills"
            :key="`skill-${ci}-${si}`"
            class="skill-chip"
            :style="{ transitionDelay: `${si * 30}ms` }"
          >
            {{ skill.name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTemplateRef } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useRipple } from '@/composables/useRipple'

defineProps({
  categories: { type: Array, required: true },
})

const ACCENTS = ['cyan', 'blue', 'violet']

const root = useTemplateRef('root')
const reveal = useScrollReveal({ rootMargin: '0px 0px -6% 0px' })
useRipple(() => root.value, { selector: '.skill-chip' })
</script>

<style scoped>
.skills {
  display: grid;
  gap: var(--space-5);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

/* ===== Category panels: per-accent top gradient + halo ===== */

.skill-panel {
  position: relative;
  display: grid;
  gap: 0.9rem;
  align-content: start;
  padding: clamp(1rem, 2vw, 1.3rem);
}

.skill-panel--cyan {
  --panel-accent: var(--star-cyan);
  --panel-halo: var(--halo-cyan);
}

.skill-panel--blue {
  --panel-accent: var(--star-blue);
  --panel-halo: var(--halo-blue);
}

.skill-panel--violet {
  --panel-accent: var(--star-violet);
  --panel-halo: var(--halo-violet);
}

.skill-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  background: linear-gradient(
    90deg,
    var(--panel-accent),
    color-mix(in srgb, var(--panel-accent) 35%, transparent)
  );
  opacity: 0.85;
}

.skill-label {
  margin: 0;
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--panel-accent);
}

/* ===== Floating chips: spring hover + staggered settle ===== */

.skills-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-auto-rows: 45px;
  gap: 0.56rem;
}

.skill-chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.32rem;
  width: 100%;
  height: 100%;
  padding: 0.4rem 0.72rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--glass-border);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--panel-accent) 12%, transparent), transparent 60%),
    rgba(125, 244, 232, 0.09);
  color: var(--panel-accent);
  font-size: var(--text-sm);
  font-weight: 500;
  line-height: 1;
  cursor: default;
  box-shadow: var(--glass-highlight);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.4s var(--ease-flow),
    transform 0.5s var(--ease-spring),
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    background-color var(--transition-base);
}

.skill-panel.is-visible .skill-chip {
  opacity: 1;
  transform: translateY(0);
}

/* Equal specificity to the settle rule but later in the file → hover wins. */
.skill-panel .skill-chip:hover {
  transform: translateY(-3px);
  border-color: var(--panel-accent);
  box-shadow:
    var(--glass-highlight),
    0 0 18px color-mix(in srgb, var(--panel-accent) 30%, transparent);
}

@media (max-width: 640px) {
  .skills-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
