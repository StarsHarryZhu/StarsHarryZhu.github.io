<template>
  <section class="intro">
    <p v-for="(bio, index) in bios" :key="`bio-${index}`">{{ bio }}</p>
    <div class="intro-spacer" aria-hidden="true"></div>
  </section>
</template>

<script setup>
defineProps({
  bios: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.intro {
  display: grid;
  gap: 0.56rem;
}

.intro p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.72;
}

.intro-spacer {
  height: clamp(2rem, 7vw, 4rem);
}
</style>
