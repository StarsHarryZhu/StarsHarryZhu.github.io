<template>
  <section class="skills">
    <span v-for="(skill, index) in items" :key="`skill-${index}`" class="skill-chip">
      {{ skill.name }}
    </span>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.skills {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 0.56rem;
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 2rem;
  padding: 0.4rem 0.72rem;
  border-radius: 999px;
  border: 1px solid var(--chip-border);
  background: var(--chip-bg);
  color: #d7e7ff;
  font-size: 0.86rem;
  line-height: 1;
  cursor: default;
  transition: transform 0.2s ease, filter 0.2s ease, border-color 0.2s ease;
}

.skill-chip:hover {
  transform: translateY(-2px);
  filter: brightness(1.12);
  border-color: rgba(178, 222, 255, 0.6);
}

@media (max-width: 960px) {
  .skills {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .skills {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
