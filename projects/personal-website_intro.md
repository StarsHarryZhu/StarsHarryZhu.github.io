# Personal Website — 本站作品集

Harry Zhu 的个人作品集：Vue 3 + Vite 单页站点，中英双语，极简深色。宽屏左侧固定栏放名字、简介、分区导航和联系方式，右侧内容滚动；手机上叠成单列。

## 技术栈

- Vue 3（`<script setup>`，纯 JS）+ Vite 7，无 router、无 UI 框架、无 CSS 预处理器
- 手写 CSS 设计 token；自研轻量 i18n 层
- GitHub Actions 构建并发布到 GitHub Pages

## 主要能力 / 亮点

- **分区导航随阅读位置高亮**：侧栏导航是锚点链接，当前分区按滚动位置算出；点导航时立刻高亮目标分区，到读者下一次自己滚动为止。
- **项目原地展开**：每个项目是一行，点一下在原地展开亮点、说明、安装和链接；收起后里面的内容不能获得焦点，键盘可完整操作。
- **极简视觉**：近黑底、三级灰阶文字、一种冷蓝强调色（只给链接和当前导航项）；不用 canvas、模糊、阴影和渐变，动效只有加载时的短淡入、悬停变色和展开收起。
- **工作区格式**：每个文件夹都有一份 4 节英文 `AGENTS.md`，`npm run check:agents` 检查。

## 当前状态

- 已上线：https://starsharryzhu.github.io/ ；每次 push 到 `main` 自动部署。
- 时间：2025.11 起（简历记录）。v5（2026-10-19）用液态玻璃和手写 WebGL2 stable-fluids 流体层；v6（2026-11）换成现在的极简深色设计。
- 源码位置：GitHub `StarsHarryZhu/StarsHarryZhu.github.io`（`main` 分支）。
