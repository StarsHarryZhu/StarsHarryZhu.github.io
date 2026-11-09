/**
 * Project case studies.
 *
 * Bilingual shape: prose fields are `{ en, zh }` objects; project names,
 * stack entries and links stay language-neutral.
 *
 * Content rules:
 * - Every claim comes from `projects/*.md`, `doc/main.tex` (resume), the
 *   repository itself, or the user directly. No invented dates or metrics;
 *   test counts are what the suite reports at the tagged version.
 * - `period` is set only where a source records one (resume, git history
 *   or user).
 * - `links` only lists URLs that actually exist (browser-use has no public
 *   repository yet, so it carries no link).
 * - `featured` marks the wide-tier cards at the top of the Projects section
 *   (currently dsh-assistant, dsh-intelligent-ui and ANY); array order is
 *   display order within each tier.
 * - Prose is kept tight: it ships in two languages.
 */

export const projects = [
  {
    id: 'dsh-assistant',
    name: 'dsh-assistant',
    featured: true,
    status: 'published',
    period: { en: 'Nov 2026 — Present', zh: '2026.11 — 至今' },
    tagline: {
      en: 'A chat agent for DeepSeek Harness Desktop built as a parent and its workers: the conversation plans, delegates and approves, while worker sub-agents do the work in the background, each confined to its own folder.',
      zh: 'DeepSeek Harness 桌面版的聊天 agent，采用母 agent + worker 架构：对话负责规划、派活与审批，worker 子 agent 在后台干活，各自只能改自己的子工作区。',
    },
    stack: ['DeepSeek Harness', 'Cordis', 'TypeScript', 'React', 'Vitest', 'npm'],
    highlights: [
      {
        en: 'The parent never blocks on work: it has no file writes, shell or web of its own, records simple facts with narrow tools over fixed files, and hands everything else to a background worker whose model and reasoning effort it chooses.',
        zh: '母 agent 从不因干活而卡住：它没有写文件、shell 与联网工具，只用一组窄工具往固定文件里记录简单信息，其余全部交给后台 worker，并替 worker 选模型和推理强度。',
      },
      {
        en: 'complete-subagent, its delegation sub-plugin, confines each worker by wrapping the host’s sandbox policy, so even bash cannot write outside the sub-workspace; anything else goes through request_write_access, which the parent grants, narrows or refuses.',
        zh: '委派子插件 complete-subagent 通过包装宿主的沙箱策略限制每个 worker，连 bash 也写不出子工作区；要改别处须调用 request_write_access，由母 agent 允许、收窄或拒绝。',
      },
      {
        en: 'im-robot, its WeChat sub-plugin, carries the same conversation to WeChat: scan to bind, then text, voice, images and files flow in, and replies go out as short plain-text messages through an outbox that resends after a restart.',
        zh: '微信子插件 im-robot 把同一段对话接到微信：扫码绑定后，文字、语音、图片和文件都能发进来；回复去掉 Markdown、切成短消息，经发件箱发出，重启后补发。',
      },
      {
        en: 'A schedule with reminders, a daily brief, hourly heartbeats and quiet hours; records stay as plain files in the workspace, and passwords, card numbers and ID numbers are never recorded.',
        zh: '日程与提醒、每日简报、每小时心跳与免打扰时段；记录都是工作区里的普通文件，从不记录密码、银行卡号和证件号。',
      },
    ],
    note: {
      en: 'v0.2.2 (tagged 2026-11-07), MIT licensed, published to npm together with its two sub-plugins. Tests: 294 cases for the assistant, 148 for complete-subagent and 194 for im-robot. Desktop app only (DeepSeek Harness >= 0.2.1-rc.5, below 0.3.0), verified on macOS.',
      zh: 'v0.2.2（2026-11-07 打 tag），MIT 许可，与两个子插件一起发布在 npm。测试：助理 294 个用例、complete-subagent 148 个、im-robot 194 个。只支持桌面版（DeepSeek Harness >= 0.2.1-rc.5，低于 0.3.0），已在 macOS 上验证。',
    },
    links: [
      { label: 'GitHub', url: 'https://github.com/StarsHarryZhu/dsh-assistant' },
      { label: 'npm', url: 'https://www.npmjs.com/package/@starsharryzhu/dsh-assistant' },
      { label: 'complete-subagent', url: 'https://github.com/StarsHarryZhu/complete-subagent' },
      { label: 'im-robot', url: 'https://github.com/StarsHarryZhu/im-robot' },
    ],
    install: 'dsh plugin --profile desktop add @starsharryzhu/dsh-assistant',
  },

  {
    id: 'dsh-intelligent-ui',
    name: 'dsh-intelligent-ui',
    featured: true,
    status: 'published',
    period: { en: 'Oct 2026 — Present', zh: '2026.10 — 至今' },
    tagline: {
      en: 'A DeepSeek Harness plugin that turns replies into interactive cards: the model writes a small interface program, the chat draws it natively, every control recomputes in the browser without another model call, and a button sends its text as your next message.',
      zh: 'DeepSeek Harness 插件：把回复变成可交互卡片 —— 模型写一段小的界面程序，对话画成原生卡片；调节控件时所有数字在浏览器内重算、不再调用模型，按钮把上面的文字作为你的下一条消息发出。',
    },
    stack: ['DeepSeek Harness', 'Cordis', 'TypeScript', 'React', 'Vitest'],
    highlights: [
      {
        en: 'The model never writes HTML or JavaScript: its program is checked against a fixed 35-component catalog — layout, text, data, math and controls, plus a button and a player — and SVG it writes is read into a checked tree with no scripts, styles, links or images.',
        zh: '模型不写任何 HTML 或 JavaScript：程序按固定的 35 组件目录校验（布局、文本、数据、数学、控件，外加 button 与 player）；它写的 SVG 会被解析成校验过的树，不含脚本、样式、链接或图片。',
      },
      {
        en: 'Registers exactly one tool, ui_render, and one skill that teaches the model when a card beats prose; uninstalling it leaves every earlier session opening as before.',
        zh: '只注册一个工具 ui_render 与一个技能，教模型判断何时该用卡片；卸载后历史会话照常打开。',
      },
      {
        en: 'A browser-side calculus engine covers integrals with infinite bounds, derivatives, limits, sums and products, roots and Taylor polynomials; a value that cannot be computed reliably shows “—”, never a guess.',
        zh: '浏览器内的微积分引擎支持含 ±∞ 边界的定积分、导数、极限、求和与连乘、区间求根与泰勒多项式；无法可靠求值的量显示「—」，绝不给猜测值。',
      },
      {
        en: 'A player animates a card at 0.5×–2×, or loops it like a GIF while it is on screen, and a canvas lets the reader drag points and click parts; all of it recomputes in the browser and sends nothing to the model.',
        zh: 'player 以 0.5×–2× 播放卡片动画，也能在卡片可见时像动图一样循环；canvas 让读者拖动图上的点、点击部件。这些都在浏览器内重算，不向模型发送任何内容。',
      },
    ],
    note: {
      en: 'v0.1.7 (tagged 2026-11-05), MIT licensed, 16 test files with 451 cases. One bundle for the web UI and the macOS and Windows desktop apps; needs DeepSeek Harness >= 0.2.1-rc.1 (below 0.3.0).',
      zh: 'v0.1.7（2026-11-05 打 tag），MIT 许可，16 个测试文件 / 451 个用例。同一份构建支持网页版与 macOS、Windows 桌面版；需要 DeepSeek Harness >= 0.2.1-rc.1（低于 0.3.0）。',
    },
    links: [{ label: 'GitHub', url: 'https://github.com/StarsHarryZhu/dsh-intelligent-UI' }],
    install: 'Settings → Plugins → Add plugin → https://github.com/StarsHarryZhu/dsh-intelligent-UI',
  },

  {
    id: 'any',
    name: 'ANY',
    featured: true,
    status: 'in-progress',
    period: { en: 'Sep 2026 — Present', zh: '2026.09 — 至今' },
    tagline: {
      en: 'A terminal multi-turn LLM chat REPL that converges the Anthropic Messages and OpenAI Responses APIs behind one protocol seam — written almost entirely by an LLM in conversation.',
      zh: '终端里的多轮 LLM 对话 REPL：把 Anthropic Messages 与 OpenAI Responses 两套 API 收敛到同一个协议接缝之后 —— 几乎全部由 LLM 在对话中写成。',
    },
    stack: ['Python 3.14', 'Anthropic Messages API', 'OpenAI Responses API', 'rich', 'questionary'],
    highlights: [
      {
        en: 'The control loop imports no SDK and contains no provider branch: envelope differences (Anthropic wraps assistant/user messages and echoes thinking blocks back; OpenAI uses bare items) are absorbed inside the two wrappers.',
        zh: '控制循环不 import 任何 SDK、也没有 provider 分支：信封差异（Anthropic 包 assistant/user 消息并回带 thinking 块，OpenAI 用裸 item）全部由两个 wrapper 吸收。',
      },
      {
        en: 'Streaming multi-turn chat in the terminal: the reply renders as it arrives, then is swapped for the finished Markdown — tool turns included.',
        zh: '终端流式多轮对话：回答边生成边渲染，结束后换成完整 Markdown，工具回合也走同一条循环。',
      },
      {
        en: 'Named sessions with atomic writes, saved every turn; resuming replays the history to the terminal through the wrapper, never by the loop.',
        zh: '具名会话原子写入、每轮自动保存；续档时经 wrapper 把历史重放到终端，循环层不读任何厂商块。',
      },
      {
        en: 'Config over code: the three pluggable slots, the tool table and the startup tool presets are all JSON — a missing or broken file falls back per slot and never takes startup down.',
        zh: '配置优先：三个可插拔槽位、工具表与启动工具预置都是 JSON —— 文件缺失或损坏按槽位各自兜底，不会拖垮启动。',
      },
    ],
    note: {
      en: 'v0.1.0 (tagged 2026-10-11). The messages path is verified end-to-end against a third-party Anthropic-compatible endpoint, tool turn included; the responses path is written but has never run against a live endpoint. No tests, no LICENSE — the interface can change at any time.',
      zh: 'v0.1.0（2026-10-11 打 tag）。messages 路径已对一个第三方 Anthropic 兼容端点端到端实测（含工具回合）；responses 路径写完但从未跑过真实端点。没有测试、没有 LICENSE —— 接口随时会变。',
    },
    links: [{ label: 'GitHub', url: 'https://github.com/StarsHarryZhu/ANY' }],
    install: null,
  },

  {
    id: 'digit-ocr',
    name: 'Digit OCR',
    featured: false,
    status: null,
    period: { en: 'Nov 2025 — Dec 2025', zh: '2025.11 — 2025.12' },
    tagline: {
      en: 'Handwritten digit recognition in C++17: an MLP and a CNN written from scratch on the standard library and trained on MNIST.',
      zh: '用 C++17 从零手写 MLP 与 CNN 的手写数字识别：只依赖标准库，在 MNIST 上训练。',
    },
    stack: ['C++17', 'CMake', 'OpenCV', 'MNIST'],
    highlights: [
      {
        en: 'Both networks are hand-written on the STL: forward passes, ReLU, softmax and backpropagation, plus convolution, max-pooling and flatten layers for the CNN.',
        zh: '两种网络都只用 STL 手写：前向传播、ReLU、softmax 与反向传播，CNN 另有卷积、最大池化与展平层。',
      },
      {
        en: 'Its own decoder reads the raw MNIST IDX files; OpenCV only prepares an input image — Otsu threshold, crop to the digit, resize.',
        zh: '自写解码器读取原始 MNIST IDX 文件；OpenCV 只负责预处理输入图片：Otsu 二值化、裁到数字区域、缩放。',
      },
      {
        en: 'Trained weights are saved to and loaded from binary files, so prediction runs without retraining.',
        zh: '训练好的权重存成二进制文件并可重新载入，预测无需重新训练。',
      },
    ],
    note: null,
    links: [{ label: 'GitHub', url: 'https://github.com/StarsHarryZhu/Digit_OCR' }],
    install: null,
  },

  {
    id: 'dsh-btw',
    name: 'dsh-btw',
    featured: false,
    status: 'in-progress',
    period: { en: 'Oct 2026 — Present', zh: '2026.10 — 至今' },
    tagline: {
      en: 'A side question in a DeepSeek Harness chat without interrupting the main task: type /btw or select text and press Ask, and the answer lands in a card in the conversation.',
      zh: '在 DeepSeek Harness 对话里顺手问一句、不打断主任务：输入 /btw 或划词后点「旁问」，回答显示在对话流里的卡片上。',
    },
    stack: ['DeepSeek Harness', 'Cordis', 'TypeScript', 'React', 'Vitest'],
    highlights: [
      {
        en: 'Answers with the session’s own model by default; web search is its only tool, for at most four rounds unless changed in settings.',
        zh: '默认用与当前会话相同的模型回答；联网搜索是唯一的工具，默认最多搜索 4 轮，可在设置里改。',
      },
      {
        en: 'The main history is flattened into plain text before it reaches the model, so the request carries no native tool structure — the forked history of the plugin it replaces kept the model calling tools it did not have.',
        zh: '主会话历史先展平成纯文本再交给模型，请求里没有任何原生工具结构 —— 它取代的旧插件整段 fork 历史，导致模型不停尝试调用并不存在的工具。',
      },
      {
        en: 'Cards copy, collapse and delete, and a deletion survives a reload; a right-sidebar page lists every side question in the session with a one-click jump.',
        zh: '卡片可复制、折叠、删除，删除在刷新后依然有效；右侧边栏页列出本会话全部旁问，可一键定位。',
      },
    ],
    note: {
      en: 'v0.1.1 (tagged 2026-11-08), MIT licensed, 8 test files with 79 cases. Web UI on DeepSeek Harness v0.2.1-rc.1 or later; installed by local link for now, in place of @michengai/dsh-btw (both register /btw).',
      zh: 'v0.1.1（2026-11-08 打 tag），MIT 许可，8 个测试文件 / 79 个用例。网页版，需要 DeepSeek Harness v0.2.1-rc.1 或更高；目前通过本地链接安装，替换 @michengai/dsh-btw（两者都注册 /btw）。',
    },
    links: [{ label: 'GitHub', url: 'https://github.com/StarsHarryZhu/dsh-btw' }],
    install: null,
  },

  {
    id: 'echoes',
    name: 'Echoes',
    featured: false,
    status: 'paused',
    period: { en: 'Oct 2024 — May 2026', zh: '2024.10 — 2026.05' },
    tagline: {
      en: 'An iOS emotion-journaling app: front-camera photos feed a fine-tuned MobileNetV2 model that infers and records emotions.',
      zh: 'iOS 情绪日记应用：前置摄像头照片经微调 MobileNetV2 推断并记录情绪。',
    },
    stack: ['Swift', 'SwiftUI', 'MobileNetV2'],
    highlights: [
      {
        en: 'Fine-tuned MobileNetV2 for on-device facial-expression inference.',
        zh: '微调 MobileNetV2 做端侧表情推断。',
      },
      {
        en: 'Capture flow feeding a journal of inferred emotions over time.',
        zh: '拍照流程按时间累积推断出的情绪记录。',
      },
    ],
    note: null,
    links: [],
    install: null,
  },

  {
    id: 'personal-website',
    name: 'Personal Website',
    featured: false,
    status: 'published',
    period: { en: 'Nov 2025 — Present', zh: '2025.11 — 至今' },
    tagline: {
      en: 'This portfolio: a single-page Vue 3 + Vite site in liquid glass, with an event-driven WebGL2 vapour layer and a bilingual data layer.',
      zh: '本站作品集：Vue 3 + Vite 单页站点，液态玻璃质感，配事件驱动的 WebGL2 气体层与双语数据层。',
    },
    stack: ['Vue 3', 'Vite', 'WebGL2', 'CSS', 'GitHub Actions'],
    highlights: [
      {
        en: 'A hand-written stable-fluids solver and light-particle pool in WebGL2: vapour answers clicks, the pointer and the case-study dialog, and the loop stops when idle, leaving zero GPU work.',
        zh: 'WebGL2 手写 stable-fluids 流体求解器与光粒子池：气体只回应点击、光标和案例窗口，空闲时循环停止，GPU 零开销。',
      },
      {
        en: 'Liquid-glass panels with refractive rims, chromatic edges and pointer light, with no backdrop-filter on anything that scrolls; measured at 60 fps while scrolling at 2560 px 2x.',
        zh: '液态玻璃面板带折射边、色散边与跟随光标的高光，随页面滚动的元素一律不用 backdrop-filter；在 2560 px 2x 下滚动实测 60 fps。',
      },
      {
        en: 'Hand-written CSS design tokens and a lightweight in-house i18n layer — no UI framework, no preprocessor.',
        zh: '手写 CSS 设计 token 与轻量自研 i18n 层 —— 无 UI 框架、无预处理器。',
      },
      {
        en: 'Every folder documents itself in an AGENTS.md that a script checks; GitHub Actions deploys to GitHub Pages on every push to main.',
        zh: '每个文件夹都有一份由脚本检查的 AGENTS.md；每次 push 到 main 由 GitHub Actions 自动部署到 GitHub Pages。',
      },
    ],
    note: null,
    links: [{ label: 'GitHub', url: 'https://github.com/StarsHarryZhu/StarsHarryZhu.github.io' }],
    install: null,
  },

  {
    id: 'browser-use',
    name: 'browser-use',
    featured: false,
    status: 'paused',
    period: null,
    tagline: {
      en: 'A Codex-style shared browser for DeepSeek Harness: 12 browser_* model tools drive a real Chrome while you and the agent share the live view, with no trace left in the page.',
      zh: '为 DeepSeek Harness 做 Codex 风格共享浏览器：12 个 browser_* 工具驱动真实 Chrome，人与 agent 共享实时画面，目标网页无被持有痕迹。',
    },
    stack: ['DeepSeek Harness', 'Cordis', 'Chrome DevTools Protocol', 'WebSocket', 'Accessibility Tree'],
    highlights: [
      {
        en: 'Anti-detection: a real headed Chrome on a dedicated profile, no automation flags and no page scripts — observation via the accessibility tree, input via trusted CDP events.',
        zh: '反检测：真实有头 Chrome + 专用 profile，无自动化标志、页面零脚本 —— 观察用无障碍树，输入用 CDP 可信事件。',
      },
      {
        en: '12 model tools on the host global layer — status, open, observe, click, type, keypress, scroll, back, forward, reload, wait, stop; observe returns accessibility text plus a screenshot.',
        zh: '12 个模型工具注册于 host global 层 —— status / open / observe / click / type / keypress / scroll / back / forward / reload / wait / stop；observe 返回无障碍文本 + 截图。',
      },
      {
        en: 'One FIFO queue shared by human and agent: manual input queues instead of dropping while the agent works, and the frame pump idles with backpressure.',
        zh: '人与 agent 共用一条 FIFO 队列：agent 忙碌时人工输入排队而不丢失；帧泵按需启停并带背压。',
      },
      {
        en: 'Codex-style permission gate per host (allow once / always / deny) with persisted lists, plus secure defaults: password typing and downloads denied, restricted URLs refused.',
        zh: 'Codex 同款三段式权限门（本次 / 总是 / 拒绝）与持久化名单；安全默认：密码框键入与下载默认拒绝，受限 URL 一律拒绝。',
      },
    ],
    note: {
      en: 'Host side works — 30 unit tests and the real-Chrome end-to-end check are green. Paused on one blocker: as a standalone profile plugin it cannot reach the sidebarRight controller (that lives in the web-app Cordis context), so the shared view cannot open automatically.',
      zh: 'host 侧可用 —— 30 项单测与真实 Chrome 端到端自检全绿。因一个卡点暂停：独立 profile 插件拿不到 sidebarRight 控制器（在 web-app 的 Cordis 上下文里），共享画面无法自动打开。',
    },
    links: [],
    install: null,
  },

  {
    id: 'simple-dock',
    name: 'simple-dock',
    featured: false,
    status: 'deprecated',
    period: null,
    tagline: {
      en: 'An interactive stats dock for the DeepSeek Harness composer: performance, briefing, token details and cost estimation, all computed locally.',
      zh: '为 DeepSeek Harness 输入框注入可交互统计坞：性能、简报、Token 明细与成本估算，全部本地计算。',
    },
    stack: ['DeepSeek Harness', 'Cordis', 'React', 'WebSocket', 'Node.js ESM'],
    highlights: [
      {
        en: 'Peak/off-peak pricing keyed to each request’s completion time, with all-day weekend off-peak; past sessions keep the price of their own time.',
        zh: '按每次请求完成时刻取价的峰谷计价，周末全天谷价；历史会话按当时价目计算、不回溯。',
      },
      {
        en: 'Built-in price table for the v4-pro and flash families including aliases; models outside it are labelled unpriced instead of guessed.',
        zh: '内置 v4-pro 与 flash 系列价目（含别称）；表外模型标记为「不在价格表」而非估算。',
      },
      {
        en: 'Token panel covers cache hits and misses, time to first token and generation speed; the cost panel supports USD/CNY with manual recompute.',
        zh: 'Token 面板含缓存命中/未命中、首 token 时间与生成速度；成本面板支持 USD/CNY 与手动重算。',
      },
      {
        en: 'Frosted-glass dock follows the system theme with live blur and frost sliders; toggling it off restores the official DSH stats row.',
        zh: '磨砂玻璃底栏跟随系统主题，模糊度与磨砂度滑杆实时生效；关闭开关即恢复 DSH 官方 stats 行。',
      },
      {
        en: 'Bilingual UI follows the DSH system language.',
        zh: '界面中英双语跟随 DSH 系统语言。',
      },
    ],
    note: {
      en: 'Deprecated (2026-09-21) — no longer maintained and unmounted from the DSH profile; v1.0.0 was the last verified build.',
      zh: '已弃用（2026-09-21）—— 停止维护，并已从 DSH profile 取消挂载；v1.0.0 为最后一个验收通过的版本。',
    },
    links: [{ label: 'GitHub', url: 'https://github.com/StarsHarryZhu/simple-dock' }],
    install: 'dsh plugin --profile web add simple-dock',
  },

  {
    id: 'vex-control-libs',
    name: 'VEX Control Libs',
    featured: false,
    status: null,
    period: { en: 'May 2022 — May 2023', zh: '2022.05 — 2023.05' },
    tagline: {
      en: 'Reusable C++11 control libraries for VEX robots — chassis and motor-control utilities shared across robot configurations.',
      zh: '面向 VEX 机器人的可复用 C++11 控制库 —— 跨机器人配置共用的底盘与电机控制工具。',
    },
    stack: ['C++11', 'STL', 'PID Control'],
    highlights: [
      {
        en: 'Rebuilt the club robot-control library around reusable chassis and motor-control utilities.',
        zh: '以可复用底盘与电机控制工具重写社团机器人控制库。',
      },
      {
        en: 'PID control, button debouncing and distance calculations with C++11 and the STL.',
        zh: '用 C++11 与 STL 实现 PID 控制、按键去抖与距离计算。',
      },
    ],
    note: null,
    links: [],
    install: null,
  },
]
