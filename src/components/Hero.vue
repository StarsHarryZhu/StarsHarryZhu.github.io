<template>
  <header class="hero">
    <img class="avatar" :src="avatar" :alt="altText" width="124" height="124" />
    <div class="hero-copy">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
  </header>
</template>

<script setup>
defineProps({
  avatar: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2.6vw, 1.6rem);
}

.avatar {
  width: clamp(84px, 14vw, 124px);
  height: clamp(84px, 14vw, 124px);
  border-radius: 24px;
  display: block;
  flex-shrink: 0;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  border: 1px solid rgba(164, 202, 235, 0.55);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.42);
}

.hero-copy h1 {
  margin: 0;
  font-family: var(--font-display);
  letter-spacing: 0.03em;
  font-size: clamp(1.42rem, 3vw, 2.1rem);
}

.hero-copy p {
  margin: 0.34rem 0 0;
  color: var(--text-muted);
  font-size: clamp(0.94rem, 2vw, 1.06rem);
}

@media (max-width: 700px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
