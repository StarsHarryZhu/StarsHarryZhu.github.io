<template>
  <footer class="footer" role="contentinfo">
    <p class="footer-brand">starfield</p>
  </footer>
</template>

<script setup>
// 纯静态页脚：只留品牌字样（语言切换在顶栏）
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: clamp(2rem, 6vh, 3.5rem) 0 clamp(1.5rem, 4vh, 2.5rem);
  margin-top: clamp(2rem, 6vh, 4rem);
  border-top: 1px solid var(--border-l1);
}

.footer-brand {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  color: var(--text-tertiary);
}
</style>
