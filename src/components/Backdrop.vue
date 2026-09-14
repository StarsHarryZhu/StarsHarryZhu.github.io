<template>
  <div class="sky" aria-hidden="true">
    <!-- 深空底色 + 合并的静态光雾（极光 3 层 + 光核 2 个合成单层，减少全屏合成） -->
    <div class="sky-base"></div>
    <div class="sky-haze"></div>

    <!-- 气态光斑 ×2：唯一参与动画的大面积元素（中等尺寸，缓慢漂移） -->
    <div class="blob blob--a"></div>
    <div class="blob blob--b"></div>

    <!-- 星点 ×6：细小光点缓慢明灭 -->
    <span
      v-for="dot in dots"
      :key="dot.id"
      class="dot"
      :style="dot.style"
    ></span>

    <!-- 颗粒：消除渐变色带 -->
    <div class="sky-grain"></div>
  </div>
</template>

<script setup>
// 确定性星点参数（无随机，避免每次挂载跳动）
const dots = Array.from({ length: 6 }, (_, i) => {
  const size = 1.5 + ((i * 7) % 3) * 0.5
  return {
    id: `dot-${i}`,
    style: {
      '--d-left': `${(i * 16.3 + 5) % 94}%`,
      '--d-top': `${(i * 15.7 + 8) % 88}%`,
      '--d-size': `${size}px`,
      '--d-duration': `${20 + ((i * 5) % 14)}s`,
      '--d-delay': `${-((i * 3.1) % 18)}s`,
    },
  }
})
</script>

<style scoped>
.sky {
  position: fixed;
  inset: 0;
  z-index: var(--z-bg);
  pointer-events: none;
  overflow: hidden;
}

/* ===== 深空底色 ===== */

.sky-base {
  position: absolute;
  inset: 0;
  background: var(--page-bg);
}

/* ===== 静态光雾 =====
   3 层极光 + 2 个光核合并为「一个」元素：
   全屏合成从 5 层降到 1 层，视觉结果一致（全部静止，
   径向渐变的柔边本身就是模糊的，无需 filter: blur）。 */

.sky-haze {
  position: absolute;
  inset: 0;
  background:
    /* 光核（原 mix-blend-mode: screen 的柔和光，改为叠加高光渐变） */
    radial-gradient(48% 42% at 20% 4%, rgba(125, 244, 232, 0.13) 0%, rgba(90, 150, 255, 0.07) 38%, transparent 70%),
    radial-gradient(40% 36% at 94% 88%, rgba(167, 155, 255, 0.12) 0%, rgba(150, 130, 255, 0.06) 40%, transparent 72%),
    /* 极光层 ×3 */
    radial-gradient(44% 38% at 22% 62%, var(--aurora-cyan) 0%, rgba(80, 226, 214, 0.12) 42%, transparent 72%),
    radial-gradient(28% 24% at 60% 84%, rgba(80, 226, 214, 0.14) 0%, transparent 70%),
    radial-gradient(48% 40% at 76% 24%, var(--aurora-blue) 0%, rgba(90, 150, 255, 0.14) 44%, transparent 74%),
    radial-gradient(30% 26% at 34% 10%, rgba(90, 150, 255, 0.15) 0%, transparent 70%),
    radial-gradient(42% 34% at 54% 46%, var(--aurora-violet) 0%, rgba(150, 130, 255, 0.1) 46%, transparent 74%),
    radial-gradient(26% 22% at 88% 70%, rgba(150, 130, 255, 0.12) 0%, transparent 70%);
}

/* ===== 气态光斑（唯一参与动画的大面积元素） ===== */

.blob {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
}

.blob--a {
  top: 10%;
  left: -6%;
  width: 34vmin;
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(125, 244, 232, 0.14) 0%, rgba(90, 150, 255, 0.07) 45%, transparent 72%);
  animation: blob-drift-a 52s ease-in-out infinite alternate;
}

.blob--b {
  right: -8%;
  bottom: 6%;
  width: 26vmin;
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(167, 155, 255, 0.13) 0%, rgba(150, 130, 255, 0.06) 45%, transparent 74%);
  animation: blob-drift-b 66s ease-in-out infinite alternate;
  animation-delay: -14s;
}

/* 注意：只做位移，不做 scale —— 缩放会让浏览器每帧重新光栅化渐变
   （实测 40fps → 57fps）。加上 will-change 提升为独立合成层。 */

@keyframes blob-drift-a {
  0%   { transform: translate3d(-3vmin, 0, 0); }
  50%  { transform: translate3d(3vmin, 5vmin, 0); }
  100% { transform: translate3d(7vmin, 9vmin, 0); }
}

@keyframes blob-drift-b {
  0%   { transform: translate3d(4vmin, -2vmin, 0); }
  50%  { transform: translate3d(-3vmin, 3vmin, 0); }
  100% { transform: translate3d(-8vmin, 6vmin, 0); }
}

/* ===== 星点：只做透明度明灭（面积极小，几乎免费） ===== */

.dot {
  position: absolute;
  left: var(--d-left);
  top: var(--d-top);
  width: var(--d-size);
  height: var(--d-size);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(180, 230, 255, 0.35) 45%, transparent 100%);
  animation: mote var(--d-duration) ease-in-out var(--d-delay) infinite alternate;
}

@keyframes mote {
  from { opacity: 0.2; }
  to   { opacity: 0.9; }
}

/* ===== 颗粒 ===== */

.sky-grain {
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}

/* ===== Reduced motion：全部静止 ===== */

@media (prefers-reduced-motion: reduce) {
  .blob,
  .dot {
    animation: none;
  }
}

/* ===== Low-power tier：减少光斑与星点 ===== */

@media (max-width: 767px), (hover: none) and (pointer: coarse) {
  .blob--b,
  .dot:nth-child(n + 4) {
    display: none;
  }

  .blob,
  .dot {
    animation: none;
  }
}
</style>
