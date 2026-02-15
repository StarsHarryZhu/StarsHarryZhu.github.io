<template>
  <section class="contacts">
    <a
      v-for="(item, index) in items"
      :key="`contact-${index}`"
      class="contact-btn"
      :href="item.url"
      target="_blank"
      rel="noreferrer noopener"
      :aria-label="altText"
    >
      <img :src="item.icon" :alt="altText" class="contact-icon" width="96" height="96" />
      <span>{{ item.name }}</span>
    </a>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.contacts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 0.7rem;
}

.contact-btn {
  min-height: 3.1rem;
  border-radius: 14px;
  border: 1px solid rgba(140, 199, 248, 0.32);
  background: rgba(14, 25, 40, 0.78);
  color: #e3efff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.68rem;
  padding: 0.5rem 0.72rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(176, 224, 255, 0.62);
}

.contact-icon {
  width: 2rem;
  height: 2rem;
  display: block;
  border-radius: 9px;
  flex-shrink: 0;
  object-fit: cover;
  object-position: center;
}

.contact-btn span {
  font-size: 0.9rem;
}
</style>
