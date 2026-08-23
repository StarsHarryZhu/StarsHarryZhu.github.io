<template>
  <div class="aero-sky" aria-hidden="true">
    <!-- 静态近黑渐变 + 一缕顶部冷光 —— 零动画、零 canvas、零模糊 -->
    <div class="as-base"></div>
    <!-- 少量静态微光点（一次绘制） -->
    <div class="as-stars"></div>
  </div>
</template>

<script setup>
// 纯静态背景：不再挂载粒子 canvas（流畅优先）
</script>

<style scoped>
.aero-sky {
  position: fixed;
  inset: 0;
  z-index: var(--z-bg);
  pointer-events: none;
  overflow: hidden;
}

.as-base {
  position: absolute;
  inset: 0;
  background: var(--page-bg);
}

/* Static micro-stars: painted once, never animated */
.as-stars {
  position: absolute;
  inset: 0;
  opacity: 0.5;
  background-image:
    radial-gradient(1px 1px at 12% 30%, rgba(255, 255, 255, 0.22) 0%, transparent 100%),
    radial-gradient(1.2px 1.2px at 32% 72%, rgba(255, 255, 255, 0.16) 0%, transparent 100%),
    radial-gradient(1px 1px at 52% 18%, rgba(255, 255, 255, 0.14) 0%, transparent 100%),
    radial-gradient(1.1px 1.1px at 68% 58%, rgba(255, 255, 255, 0.18) 0%, transparent 100%),
    radial-gradient(1px 1px at 82% 34%, rgba(255, 255, 255, 0.12) 0%, transparent 100%),
    radial-gradient(1.2px 1.2px at 90% 76%, rgba(255, 255, 255, 0.16) 0%, transparent 100%),
    radial-gradient(1px 1px at 22% 90%, rgba(255, 255, 255, 0.12) 0%, transparent 100%),
    radial-gradient(1px 1px at 44% 48%, rgba(255, 255, 255, 0.1) 0%, transparent 100%),
    radial-gradient(1.1px 1.1px at 76% 88%, rgba(255, 255, 255, 0.14) 0%, transparent 100%),
    radial-gradient(1px 1px at 6% 62%, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
}
</style>
