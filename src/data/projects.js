/**
 * Project case studies.
 *
 * Bilingual shape: prose fields are `{ en, zh }` objects; project names,
 * stack entries and links stay language-neutral.
 *
 * Content rules:
 * - Every claim comes from `projects/*.md` (DSH plugins), `doc/main.tex`
 *   (resume) or the repository itself. No invented dates or metrics.
 * - `period` is only set where the resume records one.
 * - `links` only lists URLs that actually exist (browser-use has no public
 *   repository yet, so it carries no link).
 * - `featured` marks the two DeepSeek Harness plugins, rendered as the
 *   wide tier of the Projects section.
 * - Prose is kept tight: it ships in two languages.
 */

export const projects = [
  {
    id: 'simple-dock',
    name: 'simple-dock',
    featured: true,
    status: 'published',
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
      en: 'v1.0.0 — build and smoke tests green, verified end-to-end in a real browser.',
      zh: 'v1.0.0 —— 构建与 smoke 测试全绿，真实浏览器端到端验收通过。',
    },
    links: [{ label: 'GitHub', url: 'https://github.com/StarsHarryZhu/simple-dock' }],
    install: 'dsh plugin --profile web add simple-dock',
  },

  {
    id: 'browser-use',
    name: 'browser-use',
    featured: true,
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
    id: 'echoes',
    name: 'Echoes',
    featured: false,
    status: 'in-progress',
    period: { en: 'Oct 2024 — Present', zh: '2024.10 — 至今' },
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
      en: 'This portfolio: a single-page Vue 3 + Vite site with hand-written design tokens and a bilingual data layer.',
      zh: '本站作品集：Vue 3 + Vite 单页站点，手写设计 token 与双语数据层。',
    },
    stack: ['Vue 3', 'Vite', 'CSS', 'GitHub Actions'],
    highlights: [
      {
        en: 'Hand-written CSS design tokens — no UI framework and no preprocessor.',
        zh: '手写 CSS 设计 token —— 无 UI 框架、无预处理器。',
      },
      {
        en: 'Bilingual content on a lightweight in-house i18n layer.',
        zh: '双语内容基于轻量自研 i18n 层。',
      },
      {
        en: 'GitHub Actions builds and deploys to GitHub Pages on every push to main.',
        zh: '每次 push 到 main 由 GitHub Actions 自动构建部署到 GitHub Pages。',
      },
    ],
    note: null,
    links: [{ label: 'GitHub', url: 'https://github.com/StarsHarryZhu/StarsHarryZhu.github.io' }],
    install: null,
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

  {
    id: 'digit-ocr',
    name: 'Digit OCR',
    featured: false,
    status: null,
    period: null,
    tagline: {
      en: 'Handwritten digit recognition with MLP and CNN models, built in C++ with CMake.',
      zh: '用 MLP 与 CNN 做手写数字识别，C++ 与 CMake 实现。',
    },
    stack: ['C++', 'CMake', 'CNN', 'MLP'],
    highlights: [
      {
        en: 'Implemented both a multi-layer perceptron and a convolutional network for digit classification.',
        zh: '同时实现多层感知机与卷积网络两种数字分类模型。',
      },
      {
        en: 'CMake project layout with C++ training and inference code.',
        zh: 'CMake 工程结构，C++ 训练与推理代码。',
      },
    ],
    note: null,
    links: [{ label: 'GitHub', url: 'https://github.com/StarsHarryZhu/Digit_OCR' }],
    install: null,
  },
]
