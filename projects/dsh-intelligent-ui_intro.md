# dsh-intelligent-ui — DeepSeek Harness 渐进式交互卡片插件

在 DeepSeek Harness（DSH）的对话里显示可交互卡片：模型写一段小的界面程序（DIL），对话把它按固定的 27 组件目录校验后画成原生卡片；读者调节控件时，所有数字都在浏览器里重算，不会再调用模型；按钮会把上面的文字作为读者的下一条消息发出。

模型始终不写 HTML 或 JavaScript —— 程序只由目录内的组件、状态、算式与值组成，随工具结果一起存档，卸载插件后历史会话照常打开、早先的调用退化为普通工具行。

## 技术栈

- DSH standalone bundle 插件：Cordis 薄 node half + web client 双半区，`cordis.patch.yml`（`dsh.bundle.patch` 层）注册插件行；自研打包器 `build.js` 只用 Node 内置模块（运行时依赖为空）
- TypeScript；client 渲染层为 React 18（卡片、图表、函数图像、公式排版），locale 服务中英双语
- 自研 DIL 语言层：词法/语法（`dil.ts`）、编译与目录校验（`compile.ts` / `catalog.ts`）、表达式与微积分引擎（`expr.ts` / `math.ts` / `series.ts` / `limits.ts` / `print.ts`）
- 测试：Vitest 4 + Testing Library（jsdom）
- 对外只注册一个工具 `ui_render` 与一个技能 `dsh-intelligent-ui`（`SKILL.md` + `math.md` + `recipes.md`）

## 主要能力 / 亮点

- **27 个组件的固定目录**：布局（`card` / `col` / `row` / `grid`）、文本（`title` / `text` / `badge` / `callout` / `divider` / `link` / `image`）、数据（`metric` / `progress` / `table` / `keys` / `list` / `steps` / `chart`）、数学（`plot` / `formula`）、控件（`slider` / `numberInput` / `textInput` / `select` / `checkbox`）、动作（`button`）与动画（`player`）。目录外的写法一律拒绝，模型无法把任意标记塞进对话。
- **浏览器内重算、零模型调用**：控件一动，所有引用它的数字在本地重算；卡片随回复流式绘出，回复结束后落在回复下方。
- **微积分引擎**：含 ±∞ 边界的定积分、导数、极限、求和与连乘、区间求根、泰勒多项式；无法可靠求值的量显示「—」，绝不给猜测值。
- **`player` 动画**：0.5×–2× 播放、暂停、单步与拖动一条数值时间线，驱动逐行执行的代码、算法的每一轮或沿曲线移动的点，全程在浏览器内完成、不向模型发送任何内容。
- **技能教模型何时用卡片**：`SKILL.md` 给出判断标准（读者会想调参、对比选项、点击作答或看过程时用卡片，答案只有一个数字或一句话时用散文），`math.md` 与 `recipes.md` 补齐数学与模板；工具描述本身即语言参考。

## 当前状态

- v0.1.2（2026-10-16 打 tag），MIT 许可；仓库首次提交 2026-10-15。npm 上同名包 `dsh-intelligent-ui` 最新为 0.1.0，GitHub 已到 v0.1.2。
- 版本要求：DeepSeek Harness **>= 0.2.1-alpha.1**（低于 0.3.0）的网页版；桌面版（0.2.0-rc.2）低于该版本，不会在其中安装或启用。
- 测试：`tests/` 下 14 个测试文件、288 个用例（catalog / compile / dil / expr / infix / math / limits / isolation / manifest / skill / tool / client / text / agents-md）；`node build.js` 一条命令做类型检查、打包与 bundle 自检。
- 安装：设置 → 插件 → 添加插件 → `https://github.com/StarsHarryZhu/dsh-intelligent-UI`（需要 `PATH` 里有 `git`），随后重启 harness 并刷新页面。
- 源码位置：GitHub `StarsHarryZhu/dsh-intelligent-UI`（`main` 分支，v0.1.2）。
