# dsh-assistant — DeepSeek Harness 桌面版的母 agent + worker 助理

一个用于聊天的通用 agent，基于 DeepSeek Harness（DSH）桌面版，采用**母 agent + worker 子 agent** 架构：母 agent 就是对话本身，负责规划、派活和审批；worker 在后台干活，各自只能改自己的子工作区。它尝试一种更自主的 agent 范式：由母 agent 管理 worker 的上下文、模型与推理强度、工作区和权限确认，而不是让用户逐个操作工具。

它带两个子插件，都是独立的公开仓库和 npm 包：`complete-subagent`（委派与子工作区限制）和 `im-robot`（微信桥）。

## 技术栈

- DSH 插件（Cordis），TypeScript；设置页和侧栏入口为 React
- 两个隐藏的 agent preset：母 agent（router）和 worker
- 子插件以精确版本写在 `dependencies` 里，只挂载在这两个 preset 内
- 测试：Vitest + Testing Library（jsdom）
- 发布：推送版本 tag 后由 GitHub Actions 发布到 npm（trusted publishing，带 provenance）

## 主要能力 / 亮点

- **母 agent 从不因干活而卡住**：它没有通用的写文件、shell、联网和官方 subagent 工具，只用一组窄工具往固定文件里记录简单信息，其余全部用 `delegate` 交给后台 worker；从用户勾选的模型里替 worker 选模型和推理强度，不轮询进度，只汇报结果、需要用户做的决定或失败。
- **worker 受内核级限制**（complete-subagent）：插件包装宿主的 `sandboxPolicy.resolve`，把子代理的可写范围收窄成「子工作区 + 授权」，bash 也绕不过去；要改别处须调用 `request_write_access`，由母 agent 用 `answer_write_request` 允许（可收窄路径）或拒绝，超时按拒绝处理。被限制的子代理再用官方工具派出的下一级继承限制。不改 DSH、preset 和官方子代理工具。
- **微信接入**（im-robot）：扫码绑定后，文字、语音（附转写）、图片、文件、视频都能发进同一段对话；回复去掉 Markdown、按长度切成短消息发回微信；回复先落盘再发，断线自动重连，重启或重连后补发。
- **日程与作息**：日程与提醒、`/ddl` 周视图、每天早上的简报、看门狗；用每小时一次的心跳代替自动化任务，到期的事按分钟准时叫醒；免打扰时段内的提醒顺延。
- **记录是普通文件**：日程（`ddl.md`）、清单、备忘、流水、画像、人设、项目都放在工作区里；不记录密码、银行卡号和证件号。
- **双向隔离**：母 agent 的记录工具只存在于两个隐藏 preset 里，其他插件的全局工具进不来；这个包的工具也不会出现在普通会话。

## 当前状态

- v0.2.2（2026-11-07 打 tag），MIT 许可；仓库首次提交 2026-11-03。`@starsharryzhu/dsh-assistant`、`@starsharryzhu/complete-subagent`（0.1.0）和 `@starsharryzhu/im-robot`（0.2.2）都已发布在 npm。
- 测试（各仓库 `vitest run` 的结果）：dsh-assistant 21 个文件 / 294 个用例；complete-subagent 13 个文件 / 148 个用例；im-robot 13 个文件 / 194 个用例。
- 版本要求：DeepSeek Harness 桌面版 `>=0.2.1-rc.5 <0.3.0`，不支持网页版；已在 macOS 上用桌面版 0.2.1-rc.5 和 0.2.2-rc.1 验证。
- 已知限制：还不能往微信发图片和文件；微信只允许助理在用户最后一条微信消息后约一天内主动发消息；在 0.2.1-rc.5 上，批准的路径只对 write / edit 工具生效，bash 写不了。
- 下一步：母 agent 在同一个对话里自管理（自己的上下文、模型选择和长任务）。
- 安装：`dsh plugin --profile desktop add @starsharryzhu/dsh-assistant`，两个子插件随之安装。
- 源码位置：GitHub `StarsHarryZhu/dsh-assistant`、`StarsHarryZhu/complete-subagent`、`StarsHarryZhu/im-robot`（均为 `main` 分支）。
