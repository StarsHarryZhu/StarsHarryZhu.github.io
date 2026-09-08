# simple-dock — DeepSeek Harness 底栏统计坞插件

在 DeepSeek Harness（DSH）的对话输入框底栏注入一个交互式统计坞，替换官方 stats 行：**性能 / 简报 / Token 明细 / 预估成本** 四个可展开面板，磨砂玻璃风格跟随系统深浅色；关闭开关即还原 DSH 官方底栏。全程本地计算、**不拉取任何外部价格表**。

## 技术栈

- DeepSeek Harness standalone bundle 插件（Cordis 薄 node half + web client 双半区，零依赖自研打包器 `build.js` → `lib/client.js`）
- dsh-web Client：React + slots（`conversation.composer.dock` 优先级遮蔽官方 stats 行、`settings.plugin.item` 插件卡片、`settings.general.item` 四个设置行）+ locale 服务（中英双语跟随 DSH 系统语言，无独立切换按钮）
- 内置价格引擎：按每次推理请求的**完成时刻**（毫秒级）与该步所用模型逐条取价累加，成本估算带版本号缓存、价格表升级自动失效重算

## 主要能力 / 亮点

- **峰谷计价**：内置 v4-pro / v4-flash 官方价目（UTC 峰时段 01:00–04:00 与 06:00–10:00，谷 = 峰一半）；2026-08-23 起北京时间周六/周日全天谷价；2026-09-10 12:00 起 flash 系列启用新价目（峰 = 谷 × 2），历史会话按各自时刻取价不回溯。
- **模型定向**：`deepseek-chat` / `deepseek-reasoner` 自动按 v4-flash 旧统一价计费；`deepseek-v4-flash-vision-exp`（Vision at Flash Price）与 v4-flash 完全同价含峰谷；表外模型明确显示「不在内置价格表」而非瞎估。
- **面板细节**：Token 明细含缓存命中/未命中、首 token 时间与生成速度；简报含会话标题/状态/轮步；成本支持 USD/CNY 双币与手动重算；「面板玻璃」模糊度/磨砂度滑杆拖动实时生效。
- **开关即恢复官方**：设置 → 插件卡片开关关闭时注销 dock 注册，DSH 官方 stats 行原样恢复；重新开启再接管，浏览器实测往返正常。

## 当前状态

- v1.0.0 完成：构建 + smoke（价格边界/中英字典键一致/按步成本管线）全绿；真实浏览器端到端验收通过（中文文案、开关往返、设置行）。
- 已发布到 GitHub：`StarsHarryZhu/simple-dock`（bundle 化后支持 `dsh plugin --profile web add` 一行安装；npm 发布待 2FA 验证器就绪）。
- 已安装运行于本机 DSH web profile；源码位置：`my_plugins/simple-dock/`（workspace：`/Users/starfield/Documents/deepseek-harness/my_plugins/simple-dock`）。
