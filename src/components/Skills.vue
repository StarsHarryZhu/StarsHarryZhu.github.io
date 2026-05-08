<template>
  <section class="skills" aria-label="Skills">
    <ul class="skills-list">
      <li v-for="(skill, index) in items" :key="`skill-${index}`" class="skill-chip">
        {{ skill.name }}
      </li>
    </ul>
  </section>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<style scoped>
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
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 0.4rem 0.72rem;
  border-radius: 999px;
  border: 1px solid var(--chip-border);
  background: var(--chip-bg);
  color: #d7e7ff;
  font-size: 0.86rem;
  line-height: 1;
  cursor: default;
  transition: transform 0.2s ease, filter 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.skill-chip:hover {
  transform: translateY(-2px);
  filter: brightness(1.12);
  border-color: rgba(178, 222, 255, 0.6);
  box-shadow: 0 4px 16px rgba(100, 170, 230, 0.18);
}

.skill-chip:focus-visible {
  outline: 2px solid rgba(181, 223, 255, 0.85);
  outline-offset: 2px;
}

@media (max-width: 960px) {
  .skills-list { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .skills-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
