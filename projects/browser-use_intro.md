# browser-use — DeepSeek Harness 浏览器自动化插件

在 DeepSeek Harness（DSH）里做 Codex 风格的「共享浏览器」：agent 通过 12 个 `browser_*` 模型工具驱动一个**独立配置文件的真实 Chrome**，人与 agent 在 dsh-web 右侧栏 Browser 页签共享实时画面；**目标网页看不到任何被 agent 持有的痕迹**。

## 技术栈

- DeepSeek Harness standalone bundle 插件（Cordis host + web client 双半区，纯 ESM / 零依赖打包）
- Chrome DevTools Protocol（CDP over WebSocket）：`Page` / `Accessibility` / `Input` / `DOM` 域
- dsh-web Client：React + slots（右侧栏页签扩展点 `sidebarRightTabs`）+ `--dsw-*` 主题 token
- ws 帧流（binary JPEG）+ 同源 HTTP 审批端点 + schemastery 设置命名空间

## 主要能力 / 亮点

- **反检测设计**：真实 Chrome、有头、专用稳定 profile；启动参数不带 `--enable-automation/--headless` 等自动化标志；默认零页面脚本（观察用 a11y 树、交互用 CDP 可信输入、截图用 Page 域）；所有面板 chrome/横幅都在 dsh-web 层，页面零注入。
- **模型工具集**：`browser_status/open/observe/click/type/keypress/scroll/back/forward/reload/wait/stop`，注册于 host global 层；`browser_observe` 返回 a11y 文本 + 截图（vision 路由降级纯文本）。
- **共享与并发**：agent 与人工共用一条 FIFO 操作队列；agent 忙碌时人工输入排队不丢；帧泵按需启停、带背压。
- **权限模型（Codex 同款三段式）**：新 host 先问「本次允许 / 总是允许 / 拒绝」，allow/blocklist 持久化；对话内审批卡 + 面板横幅同一状态源；localhost 自动放行。
- **安全默认**：密码框键入默认拒绝、下载默认拦截、受限 URL（`chrome://`、`javascript:` 等）一律拒绝；设置项全部可调（`dsh-browser` 命名空间）。

## 当前状态

- v1 已完成：构建绿、30 项单测全绿、真实 Chrome 端到端自检（启动/导航/观察/点击/键入/权限门/反检测断言）全绿；安装脚本幂等可回滚。
- 已安装进本机 DSH web profile（`install.sh`，patch 行 + store 链接），等待宿主重启加载后按 `tests/e2e/VERIFY.md` 验收。
- 源码位置：`my_plugins/browser-use/`（workspace：`/Users/starfield/Documents/deepseek-harness/my_plugins/browser-use`）。
