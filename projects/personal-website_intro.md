# Personal Website — 本站作品集

Harry Zhu 的个人作品集：Vue 3 + Vite 单页站点，中英双语，视觉语言是深空星云里的液态玻璃与气态动效（参照鸿蒙「沉浸光感」：光和气回应操作，没人操作时界面安静）。

## 技术栈

- Vue 3（`<script setup>`，纯 JS）+ Vite 7，无 router、无 UI 框架、无 CSS 预处理器
- 手写 CSS 设计 token；自研轻量 i18n 层
- WebGL2：手写 stable-fluids 流体求解器与 CPU 粒子池（气体层）
- GitHub Actions 构建并发布到 GitHub Pages

## 主要能力 / 亮点

- **事件驱动的气体层**：面板入场时从雾里凝聚，案例窗口关闭时化烟并迸出光粒子，点按时冒一小团烟，光标拖出淡淡的发光轨迹；空闲时循环停止，GPU 零开销。首屏后懒加载；reduced-motion 或无 WebGL2 时不挂载。
- **液态玻璃**：随页面滚动的面板不采样背景，靠折射边、透镜带、色散边和跟随光标的高光做出玻璃感；只有顶栏胶囊和案例窗口用真 `backdrop-filter`，Chromium 上再叠 SVG 边缘折射。
- **性能实测**：1440 px 1x 与 2560 px 2x 下，纯滚动和滚动加光标移动的稳态都是 60 fps。
- **工作区格式**：每个文件夹都有一份 4 节英文 `AGENTS.md`，`npm run check:agents` 检查。

## 当前状态

- 已上线：https://starsharryzhu.github.io/ ；每次 push 到 `main` 自动部署。
- 时间：2025.11 起（简历记录）；v5 视觉系统完成于 2026-10-19。
- 源码位置：GitHub `StarsHarryZhu/StarsHarryZhu.github.io`（`main` 分支）。
