<template>
  <img
    v-for="asset in assets"
    :key="asset.name"
    :src="asset.src"
    :alt="altText"
    :width="asset.width || 3840"
    :height="asset.height || 2160"
    :class="asset.className || 'bg-asset bg-asset-main'"
  />
</template>

<script setup>
defineProps({
  assets: {
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
.bg-asset {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
  object-fit: cover;
  object-position: center;
}

.bg-asset-main {
  opacity: 0.95;
  filter: saturate(1.08) contrast(1.06) brightness(0.78);
}
</style>
