<template>
  <section aria-label="Skills">
    <template v-if="categories">
      <div v-for="(category, ci) in categories" :key="`cat-${ci}`" class="skill-group">
        <h3 v-if="category.name" class="skill-group-label">{{ category.name }}</h3>
        <ul class="skills-list">
          <li
            v-for="(skill, si) in category.skills"
            :key="`skill-${ci}-${si}`"
            class="skill-chip"
          >
            <span v-if="skill.icon" class="skill-icon" aria-hidden="true">{{ skill.icon }}</span>
            {{ skill.name }}
          </li>
        </ul>
      </div>
    </template>
    <ul v-else class="skills-list">
      <li v-for="(skill, index) in items" :key="`skill-${index}`" class="skill-chip">
        {{ skill.name }}
      </li>
    </ul>
  </section>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  categories: { type: Array, default: null },
})
</script>

<style scoped>
.skill-group {
  margin-bottom: var(--space-4);
}

.skill-group:last-child {
  margin-bottom: 0;
}

.skill-group-label {
  margin: 0 0 var(--space-2);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.skills-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-auto-rows: 45px;
  gap: 0.56rem;
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.32rem;
  width: 100%;
  height: 100%;
  padding: 0.4rem 0.72rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--glass-border);
  background: var(--color-accent-cyan-dim);
  color: var(--color-nebula-200);
  font-size: var(--text-sm);
  line-height: 1;
  cursor: default;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    background-color var(--transition-base);
}

.skill-icon {
  font-size: 1em;
  line-height: 1;
}

.skill-chip:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent-cyan);
  background: rgba(78, 240, 208, 0.12);
  box-shadow: var(--shadow-glow-cyan);
}

.skill-chip:focus-visible {
  outline: 2px solid var(--color-accent-cyan);
  outline-offset: 2px;
}

@media (max-width: 960px) {
  .skills-list { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .skills-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
