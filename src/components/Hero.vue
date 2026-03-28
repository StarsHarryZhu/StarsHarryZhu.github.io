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
  min-height: clamp(72px, 10vw, 92px);
}

.avatar {
  width: clamp(64px, 9.5vw, 88px);
  height: clamp(64px, 9.5vw, 88px);
  border-radius: 18px;
  display: block;
  flex-shrink: 0;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  border: 1px solid rgba(164, 202, 235, 0.55);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.4);
}

.hero-copy h1 {
  margin: 0;
  font-family: var(--font-display);
  letter-spacing: 0.03em;
  font-size: clamp(1.18rem, 2.2vw, 1.62rem);
}

.hero-copy p {
  margin: 0.2rem 0 0;
  color: var(--text-muted);
  font-size: clamp(0.86rem, 1.55vw, 0.94rem);
}

@media (max-width: 700px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
