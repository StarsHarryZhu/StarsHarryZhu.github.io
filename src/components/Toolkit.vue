<template>
  <section id="toolkit" class="toolkit-section" aria-label="Skills">
    <SectionHeader index="04" title="Toolkit" />

    <div class="panel toolkit-panel reveal" :ref="reveal.observe" :style="{ '--reveal-delay': '100ms' }">

      <div
        v-for="(category, ci) in categories"
        :key="`cat-${ci}`"
        class="skill-group"
        :class="`skill-group--${ACCENTS[ci % ACCENTS.length]}`"
      >
        <h3 class="skill-label">{{ category.name }}</h3>
        <ul class="skills-list">
          <li
            v-for="(skill, si) in category.skills"
            :key="`skill-${ci}-${si}`"
            class="skill-chip"
            :style="{ transitionDelay: `${si * 35}ms` }"
          >
            {{ skill.name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from '@/components/SectionHeader.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

defineProps({
  categories: { type: Array, required: true },
})

const ACCENTS = ['cyan', 'sky', 'violet']

const reveal = useScrollReveal({ rootMargin: '0px 0px -6% 0px' })
</script>

<style scoped>
.toolkit-section {
  scroll-margin-top: calc(var(--nav-height) + 1rem);
}

.toolkit-panel {
  display: grid;
  gap: 1.3rem;
  padding: clamp(1.3rem, 3vw, 2rem);
  margin-top: 1.1rem;
}

.skill-group {
  display: grid;
  gap: 0.55rem;
  padding-top: 0.15rem;
}

.skill-group--cyan { --group-accent: var(--accent-cyan); }
.skill-group--sky { --group-accent: var(--accent-sky); }
.skill-group--violet { --group-accent: var(--accent-violet); }

.skill-label {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--group-accent);
}

.skills-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.34rem 0.78rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.24);
  background:
    radial-gradient(110% 130% at 20% -30%, rgba(255, 255, 255, 0.16), transparent 52%),
    linear-gradient(140deg, rgba(255, 255, 255, 0.07), transparent 60%),
    rgba(35, 35, 36, 0.2);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1;
  cursor: default;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    0 4px 14px -8px rgba(2, 6, 26, 0.7);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.45s var(--ease-aero),
    transform 0.55s var(--ease-spring),
    color var(--transition-base),
    border-color var(--transition-base);
}

.toolkit-panel.is-visible .skill-chip {
  opacity: 1;
  transform: translateY(0);
}

.toolkit-panel .skill-chip:hover {
  transform: translateY(-2px) scale(1.05);
  color: var(--group-accent);
  border-color: var(--group-accent);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    0 4px 18px -4px color-mix(in srgb, var(--group-accent) 40%, transparent);
}
</style>
