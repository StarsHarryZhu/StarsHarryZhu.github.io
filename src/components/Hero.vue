<template>
  <header class="hero">
    <div class="avatar-ring">
      <picture>
        <source
          type="image/webp"
          :srcset="`${avatar} 1x, ${avatar2x} 2x`"
        />
        <img
          class="avatar"
          :src="avatarFallback"
          :alt="altText"
          width="124"
          height="124"
          loading="eager"
        />
      </picture>
    </div>
    <div class="hero-copy">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
  </header>
</template>

<script setup>
defineProps({
  avatar: { type: String, required: true },
  avatar2x: { type: String, required: true },
  avatarFallback: { type: String, required: true },
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

.avatar-ring {
  flex-shrink: 0;
  border-radius: var(--radius-lg);
  padding: 2px;
  background: linear-gradient(
    135deg,
    var(--color-accent-cyan) 0%,
    var(--color-nebula-400) 50%,
    transparent 100%
  );
  box-shadow:
    0 0 20px rgba(78, 240, 208, 0.15),
    0 0 40px rgba(52, 101, 182, 0.1);
}

.avatar {
  width: clamp(64px, 9.5vw, 88px);
  height: clamp(64px, 9.5vw, 88px);
  border-radius: calc(var(--radius-lg) - 2px);
  display: block;
  object-fit: cover;
  object-position: center;
}

.hero-copy h1 {
  margin: 0;
  font-family: var(--font-display);
  letter-spacing: var(--tracking-wide);
  font-size: clamp(1.24rem, 2.4vw, 1.72rem);
  background: linear-gradient(
    180deg,
    var(--color-text-primary) 0%,
    var(--color-nebula-300) 50%,
    var(--color-nebula-400) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-copy p {
  margin: 0.2rem 0 0;
  color: var(--color-text-secondary);
  font-size: clamp(0.86rem, 1.55vw, 0.94rem);
  letter-spacing: var(--tracking-tight);
}

@media (hover: hover) and (pointer: fine) {
  .avatar-ring:hover {
    box-shadow:
      0 0 28px rgba(78, 240, 208, 0.25),
      0 0 56px rgba(52, 101, 182, 0.15);
  }
  .avatar-ring:hover .avatar {
    transform: scale(1.03);
  }
  .avatar {
    transition: transform var(--transition-base);
  }
}

@media (max-width: 700px) {
  .hero { flex-direction: column; align-items: flex-start; }
}
</style>
