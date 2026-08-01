<template>
  <section class="intro" aria-label="About">
    <h2 v-if="title" class="intro-title">{{ title }}</h2>
    <p v-for="(bio, index) in bios" :key="`bio-${index}`">{{ bio }}</p>
  </section>
</template>

<script setup>
defineProps({
  bios: { type: Array, required: true },
  title: { type: String, default: '' },
})
</script>

<style scoped>
.intro {
  display: grid;
  gap: 0.56rem;
  padding-bottom: var(--space-3);
  padding-left: clamp(0.6rem, 1.6vw, 1rem);
  border-left: 2px solid transparent;
  border-image: linear-gradient(
    180deg,
    var(--color-accent-cyan) 0%,
    var(--color-nebula-400) 50%,
    transparent 100%
  ) 1;
}

.intro-title {
  margin: 0;
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-accent-cyan);
}

.intro p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  font-size: clamp(0.88rem, 1.4vw, 0.96rem);
}

</style>
