<template>
  <footer class="footer">
    <p class="footer-side footer-left">{{ items[0] || '' }}</p>
    <p class="footer-dot">·</p>
    <p class="footer-side footer-right">{{ items[1] || '' }}</p>
  </footer>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.footer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  column-gap: 0.6rem;
}

.footer-side {
  margin: 0;
  color: rgba(187, 205, 227, 0.85);
  font-size: 0.82rem;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer-left {
  text-align: right;
}

.footer-right {
  text-align: left;
}

.footer-dot {
  margin: 0;
  color: rgba(201, 219, 242, 0.95);
  font-size: 0.92rem;
  line-height: 1;
  text-align: center;
}
</style>
