# DWTCode 部署指南

本目录是 DWTCode 的内网部署包，包含预编译的二进制文件、配置文件和全局 Skills，用于在无外网访问的环境中快速部署。

## 部署包内容

```
dwtcode-deploy-baseline/
├── dwtcode            # 预编译的可执行文件
├── dwtcode.json       # 默认配置文件（内网模型配置）
├── dwtcode-env.sh     # 环境变量参考文件
├── install.sh         # 一键安装脚本
├── skills/            # 全局 Skills
│   ├── coding-standards/     # 代码规范
│   ├── postgres-patterns/    # PostgreSQL 模式
│   ├── frontend-patterns/    # 前端模式
│   ├── backend-patterns/     # 后端模式
│   ├── security-review/      # 安全审查
│   └── tdd-workflow/         # TDD 工作流
└── README.md
```

## 安装步骤

### 方式一：一键安装（推荐）

```bash
cd dwtcode-deploy-baseline
chmod +x install.sh
./install.sh
```

安装脚本会自动完成以下操作：
1. 复制二进制文件到 `~/.local/bin/dwtcode`
2. 复制配置文件到 `~/.config/dwtcode/dwtcode.json`
3. 复制全局 Skills 到 `~/.config/dwtcode/skills/`
4. 写入环境变量到 `~/.bashrc`
5. 确保 `~/.local/bin` 在 PATH 中

### 方式二：手动安装

```bash
# 1. 复制二进制文件
mkdir -p ~/.local/bin
cp dwtcode ~/.local/bin/dwtcode
chmod +x ~/.local/bin/dwtcode

# 2. 复制配置文件
mkdir -p ~/.config/dwtcode
cp dwtcode.json ~/.config/dwtcode/dwtcode.json

# 3. 复制全局 Skills
cp -r skills/* ~/.config/dwtcode/skills/

# 4. 设置环境变量（追加到 ~/.bashrc）
cat >> ~/.bashrc << 'EOF'

# DWTCode 内网环境变量
export DWTCODE_DISABLE_AUTOUPDATE=1
export DWTCODE_DISABLE_MODELS_FETCH=1
export DWTCODE_DISABLE_DEFAULT_PLUGINS=1
export DWTCODE_DISABLE_CONFIG_DEPS=1
export PATH="$HOME/.local/bin:$PATH"
EOF
```

### 激活环境

安装完成后，执行以下命令激活环境（或重新打开终端）：

```bash
source ~/.bashrc
```

## 配置内网模型

安装后需要修改配置文件中的模型地址，编辑 `~/.config/dwtcode/dwtcode.json`：

```jsonc
{
  "provider": {
    "intranet-llm": {
      "name": "内网大模型",
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "http://<你的模型服务地址>:<端口>/v1"  // 修改为实际地址
      },
      "models": {
        "llm_32b": {
          "name": "LLM 32B",
          "tool_call": true,
          "limit": {
            "context": 131072,
            "output": 16384
          }
        }
      }
    }
  },
  "model": "intranet-llm/llm_32b"
}
```

## 使用方法

### 启动 TUI

在任意项目目录下启动，默认工作目录为当前目录：

```bash
dwtcode
```

指定项目目录：

```bash
dwtcode /your/project/path
```

### 启动无头 API 服务器

```bash
dwtcode serve                 # 默认端口 4096
dwtcode serve --port 8080     # 自定义端口
```

### 查看版本

```bash
dwtcode --version
```

## 环境变量说明

| 变量 | 说明 |
|------|------|
| `DWTCODE_DISABLE_AUTOUPDATE=1` | 禁用自动更新（内网无法访问更新服务器） |
| `DWTCODE_DISABLE_MODELS_FETCH=1` | 禁用从 models.dev 拉取模型列表 |
| `DWTCODE_DISABLE_DEFAULT_PLUGINS=1` | 禁用默认插件，避免内网 npm 安装超时 |
| `DWTCODE_DISABLE_CONFIG_DEPS=1` | 禁用配置目录依赖安装，避免 npm registry 超时 |

## 卸载

```bash
rm -f ~/.local/bin/dwtcode
rm -rf ~/.config/dwtcode
# 手动从 ~/.bashrc 删除 "# DWTCode" 开始的环境变量块
```

## 常见问题

### 提示 "command not found"

确保已执行 `source ~/.bashrc` 或重新打开终端。检查 `echo $PATH` 是否包含 `~/.local/bin`。

### 内网模型无法连接

1. 检查 `~/.config/dwtcode/dwtcode.json` 中的 `baseURL` 是否正确
2. 确认模型服务已启动：`curl http://<地址>:<端口>/v1/models`
3. 检查网络连通性：`ping <模型服务地址>`

### 如何更新

获取新版本的部署包后，重新运行安装脚本即可覆盖安装：

```bash
cd dwtcode-deploy-baseline
./install.sh
source ~/.bashrc
```
