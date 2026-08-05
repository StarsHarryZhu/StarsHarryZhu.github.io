<template>
  <section class="panel intro reveal" :ref="reveal.observe" aria-label="About">
    <span class="glint intro-glint intro-glint--a" aria-hidden="true"></span>
    <span class="glint intro-glint intro-glint--b" aria-hidden="true"></span>
    <span v-if="title" class="intro-overline">{{ title }}</span>
    <p v-for="(bio, index) in bios" :key="`bio-${index}`" class="intro-bio">{{ bio }}</p>
  </section>
</template>

<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'

defineProps({
  bios: { type: Array, required: true },
  title: { type: String, default: '' },
})

const reveal = useScrollReveal({ rootMargin: '0px 0px -8% 0px' })
</script>

<style scoped>
.intro {
  --panel-halo: var(--halo-violet);
  display: grid;
  gap: 0.7rem;
  padding: var(--panel-pad);
}

.intro-overline {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--star-violet);
}

.intro-bio {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.75;
}

/* Glints pinned near the panel corners */
.intro-glint--a {
  left: 8%;
  top: 14%;
  animation-duration: 4.2s;
}

.intro-glint--b {
  right: 12%;
  bottom: 18%;
  animation-delay: -1.6s;
  animation-duration: 3.4s;
}
</style>
