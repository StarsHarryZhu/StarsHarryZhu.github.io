# dsh-intelligent-ui — DeepSeek Harness 渐进式交互卡片插件

在 DeepSeek Harness（DSH）的对话里显示可交互卡片：模型写一段小的界面程序（DIL），对话把它按固定的 35 组件目录校验后画成原生卡片；读者调节控件时，所有数字都在浏览器里重算，不会再调用模型；按钮会把上面的文字作为读者的下一条消息发出。

模型始终不写 HTML 或 JavaScript —— 程序只由目录内的组件、状态、算式与值组成，随工具结果一起存档；它为一张图写的 SVG 会被解析成校验过的树，里面没有脚本、样式、链接或图片。卸载插件后历史会话照常打开，早先的调用显示为普通工具行。

## 技术栈

- DSH standalone bundle 插件：Cordis 薄 node half + web client 双半区，`cordis.patch.yml`（`dsh.bundle.patch` 层）注册插件行；自研打包器 `build.js` 只用 Node 内置模块（运行时依赖为空）
- TypeScript；client 渲染层为 React 18（卡片、图表、函数图像、公式排版、画布），locale 服务中英双语
- 自研 DIL 语言层：词法/语法、编译与目录校验、表达式与微积分引擎
- 测试：Vitest 4 + Testing Library（jsdom）
- 对外只注册一个工具 `ui_render` 与一个技能 `dsh-intelligent-ui`；技能在插件管理页单独列出、有自己的开关

## 主要能力 / 亮点

- **35 个组件的固定目录**：布局（`card` / `col` / `row` / `grid` / `tabs` / `tab`）、文本（`title` / `text` / `badge` / `callout` / `divider` / `link` / `image` / `code`）、数据（`metric` / `progress` / `table` / `keys` / `list` / `steps` / `chart` / `series` / `diagram` / `canvas` / `shape`）、数学（`plot` / `formula`）、控件（`slider` / `numberInput` / `textInput` / `select` / `checkbox` / `checklist`）、动作（`button`）与动画（`player`）。目录外的写法一律拒绝。
- **浏览器内重算、零模型调用**：控件一动，所有引用它的数字在本地重算；调过的设置保存在本浏览器里，刷新后卡片保持原样。卡片随回复流式绘出，回复结束后落在回复下方。
- **改卡片从读者的设置开始**：让模型修改一张卡片时，新版本从读者调好的设置出发，旧卡注明后面有新版本。
- **微积分引擎**：含 ±∞ 边界的定积分、导数、极限、求和与连乘、区间求根、泰勒多项式；无法可靠求值的量显示「—」，绝不给猜测值。
- **`player` 动画与 `canvas` 画布**：`player` 以 0.5×–2× 播放、暂停、单步与拖动一条数值时间线；`loop=true autoplay=true` 时卡片在屏幕上像动图一样循环，系统要求减少动态效果时不自动播放。`canvas` 画出模型用形状行或 SVG 勾勒的图，读者可以拖动点、点击部件，一切在本地重算。

## 当前状态

- v0.1.7（2026-11-05 打 tag），MIT 许可；仓库首次提交 2026-10-15。npm 上同名包 `dsh-intelligent-ui` 不是本仓库发布的，安装以 GitHub 为准。
- 版本要求：DeepSeek Harness **>= 0.2.1-rc.1**（低于 0.3.0）。网页版、macOS 桌面版、Windows 桌面版用同一份构建；已验证网页版 0.2.1-alpha.4，macOS 和 Windows 桌面版 0.2.1-rc.2。
- 测试：v0.1.7 下 16 个测试文件、451 个用例（`vitest run` 的结果）；`node build.js` 一条命令做类型检查、打包与 bundle 自检。
- 安装：设置 → 插件 → 添加插件 → `https://github.com/StarsHarryZhu/dsh-intelligent-UI`（需要 `PATH` 里有 `git`），随后重启 harness 并刷新页面。
- 源码位置：GitHub `StarsHarryZhu/dsh-intelligent-UI`（`main` 分支，v0.1.7）。
