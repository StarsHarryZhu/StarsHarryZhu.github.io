<template>
  <header class="hero">
    <img
      class="avatar"
      :src="avatar"
      :alt="altText"
      width="124"
      height="124"
      loading="eager"
    />
    <div class="hero-copy">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
  </header>
</template>

<script setup>
defineProps({
  avatar: { type: String, required: true },
  altText: { type: String, default: 'Portrait of Harry Zhu' },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
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
  border: 1px solid rgba(140, 190, 230, 0.5);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.4), 0 0 30px rgba(100, 160, 230, 0.12);
}

.hero-copy h1 {
  margin: 0;
  font-family: var(--font-display);
  letter-spacing: 0.03em;
  font-size: clamp(1.24rem, 2.4vw, 1.72rem);
  background: linear-gradient(180deg, #e8f0fe 0%, #b8cde8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-copy p {
  margin: 0.2rem 0 0;
  color: var(--text-muted);
  font-size: clamp(0.86rem, 1.55vw, 0.94rem);
}

@media (max-width: 700px) {
  .hero { flex-direction: column; align-items: flex-start; }
}
</style>
