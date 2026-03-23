# DWTCode

基于 [OpenCode](https://github.com/anomalyco/opencode) 二次开发的 AI 编程助手，支持 TUI（终端界面）、Web 界面和桌面应用。

支持多种大模型提供商（Claude、OpenAI、Google、本地模型等），采用客户端/服务器架构，服务端在本地运行，客户端（TUI、Web、桌面）连接使用。

## 项目结构

Bun monorepo，使用 Turborepo 管理。主要包：

| 包 | 说明 |
|---|------|
| `packages/opencode` | 核心业务逻辑、CLI、API 服务器、TUI |
| `packages/app` | Web UI 组件（SolidJS + Vite + TailwindCSS） |
| `packages/desktop` | 桌面应用（Tauri） |
| `packages/desktop-electron` | 桌面应用（Electron） |
| `sdks/vscode` | VSCode 插件 |

## 环境要求

- [Bun](https://bun.sh) >= 1.3.10
- Git
- Node.js >= 22（部分工具链依赖）

## 从源码构建

### 1. 安装依赖

```bash
bun install
```

### 2. 构建单平台可执行文件

构建当前平台的独立二进制文件：

```bash
cd packages/opencode
bun run build --single
```

构建完成后，二进制文件位于 `packages/opencode/dist/dwtcode-<平台>-<架构>/bin/dwtcode`。

### 3. 构建指定平台

```bash
# 构建 Linux x64
cd packages/opencode
bun run build --target=linux-x64

# 构建 Linux arm64
bun run build --target=linux-arm64

# 构建 macOS arm64 (Apple Silicon)
bun run build --target=darwin-arm64

# 构建 Windows x64
bun run build --target=win32-x64
```

### 4. 构建 baseline 版本（无 AVX2 指令集要求）

适用于不支持 AVX2 的旧 CPU：

```bash
cd packages/opencode
bun run build --single --baseline
```

### 5. 构建全平台

```bash
cd packages/opencode
bun run build
```

## 开发模式

```bash
# 启动 TUI 开发模式
bun dev

# 对指定目录启动
bun dev /your/project/path

# 启动无头 API 服务器（端口 4096）
bun dev serve

# 启动 API 服务器 + Web 界面
bun dev web

# 启动 Web 应用开发服务器（需先启动 API 服务器）
bun run --cwd packages/app dev
```

## 测试

测试**不能**从仓库根目录运行，需要进入对应包目录：

```bash
cd packages/opencode && bun test
cd packages/app && bun test
```

## 类型检查

```bash
cd packages/opencode && bun typecheck
cd packages/app && bun typecheck
```

## 部署到内网环境

构建完成后，可使用 `packages/opencode/dwtcode-deploy-baseline/` 中的部署包进行内网部署。详细步骤请参考 [部署指南](packages/opencode/dwtcode-deploy-baseline/README.md)。

## 配置

DWTCode 支持多级配置，优先级从低到高：

1. 全局配置 `~/.config/dwtcode/dwtcode.jsonc`
2. 项目配置 `opencode.jsonc`（项目根目录）
3. `.opencode` 目录（agents、commands、plugins）
4. 环境变量

### 配置文件示例

```jsonc
{
  "provider": {
    "intranet-llm": {
      "name": "内网大模型",
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "http://your-llm-server:port/v1"
      },
      "models": {
        "your-model": {
          "name": "Your Model Name",
          "tool_call": true,
          "limit": {
            "context": 131072,
            "output": 16384
          }
        }
      }
    }
  },
  "model": "intranet-llm/your-model"
}
```

## 许可证

MIT
