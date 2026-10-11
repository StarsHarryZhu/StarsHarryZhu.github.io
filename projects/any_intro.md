# ANY — 终端多轮 LLM 对话 REPL（vibe coding 实验）

ANY 是一个跑在终端里的多轮 LLM 对话 REPL：把 Anthropic Messages API 与 OpenAI Responses API 收敛到同一个协议接缝之后 —— 控制循环只认识协议，从不知道自己面对的是哪个厂商。整个项目几乎全部由 LLM 在对话中写成，仓库存在的意义就是看看这样能走多远。它不是产品：未上 PyPI、没有 LICENSE、没有测试，接口随时会变。

## 技术栈

- Python 3.14；六个固定版本依赖（anthropic 1.5.0 / openai 3.13.0 / questionary 2.1.1 / requests 2.34.2 / rich 15.0.0 / tzlocal 5.4.4）
- 协议层 `src/llm/protocol.py`（三个 Protocol 类）+ 两个厂商 wrapper（`messages_llm` / `responses_llm`）；`src/` 全部是 PEP 420 命名空间包，无 `__init__.py`
- 终端 UI：rich（流式 Live 渲染）+ questionary（启动选择）
- 配置全为 CWD 相对的 JSON：`configs/links.json`（三个槽位）、`configs/tools.json`（工具表）、`configs/presets/`（工具预置）

## 主要能力 / 亮点

- **一个协议接缝**：循环层不 import 任何 SDK、不做 provider 分支（唯一例外是 `main.py` 按 `API` 字段分发的三支，且刻意保留 `else` 把写错的配置变成可读报错）。
- **流式多轮对话 + 工具回合**：信封差异（Anthropic 包 `assistant`/`user` 消息并回带 thinking 块，OpenAI 用裸 item）全部由 wrapper 吸收；工具续写的上下文只能来自 `tool_continuation()`。
- **具名会话**：一会话一 JSON，原子写入（`.tmp` + `os.replace`），每轮保存；启动时可续档或新建，恢复时经 wrapper 把历史重放到终端，循环层不读厂商块。
- **配置即扩展点**：三个可插拔槽位（模型/推理档选择器、会话存储、系统提示词文件）与工具表/预置都是配置文件，缺失或损坏只按槽位各自兜底并打一行暗色提示，永不拖垮启动；工具失败方向永远是「更少」而不是「更多」。
- **工具层**：`current_time` 与 `current_location` 两个工具，由启动时的预置决定本次可用集合。

## 当前状态

- v0.1.0（2026-10-11 打 tag），进行中；作者定位为 vibe coding 实验，不是产品。
- 已实测：messages 路径端到端（含工具回合，对第三方 Anthropic 兼容端点）、槽位解析与三处兜底、会话保存/恢复往返、工具层两个工具与预置矩阵（手工过了一遍）。
- 未实测：responses 路径（OpenAI）只做过静态与构造检查；续档「以工具回合结尾」的存档；`get_response` 在配置的输出上限下不可用。
- 已知限制：工具执行前无权限确认；`current_location` 每次调用把出口 IP 发给第三方定位服务（不缓存，最坏约 24 秒）；没有测试框架；会话明文且无上限。
- 源码位置：GitHub `StarsHarryZhu/ANY`（`main` 分支，v0.1.0）。
