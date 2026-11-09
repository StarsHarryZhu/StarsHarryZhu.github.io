<script setup>
defineProps({
  /** id of the heading element, referenced by the section's aria-labelledby */
  id: { type: String, required: true },
  title: { type: String, required: true },
})
</script>

<template>
  <h2 :id="id" class="section-header">{{ title }}</h2>
</template>

<style scoped>
/* A small caption above each section; on one column it sticks under the
   viewport top so the reader always knows where they are. */
.section-header {
  margin-bottom: 24px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--text-3);
}

@media (max-width: 1023px) {
  .section-header {
    position: sticky;
    top: 0;
    z-index: 1;
    margin-inline: calc(var(--gutter) * -1);
    padding: 16px var(--gutter);
    background: var(--bg);
  }
}
</style>
