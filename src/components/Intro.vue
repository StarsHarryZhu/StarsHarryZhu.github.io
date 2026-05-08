<template>
  <section class="intro">
    <p v-for="(bio, index) in bios" :key="`bio-${index}`">{{ bio }}</p>
    <div class="intro-spacer" aria-hidden="true"></div>
  </section>
</template>

<script setup>
defineProps({
  bios: { type: Array, required: true },
})
</script>

<style scoped>
.intro {
  display: grid;
  gap: 0.56rem;
  padding-left: clamp(0.6rem, 1.6vw, 1rem);
  border-left: 2px solid rgba(100, 160, 220, 0.25);
}

.intro p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.72;
  font-size: clamp(0.88rem, 1.4vw, 0.96rem);
}

.intro-spacer {
  height: clamp(2rem, 7vw, 4rem);
}
</style>
