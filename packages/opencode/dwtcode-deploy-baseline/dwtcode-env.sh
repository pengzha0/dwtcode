# 禁用自动更新（内网无法访问更新服务器）
export DWTCODE_DISABLE_AUTOUPDATE=1

# 禁用从 models.dev 拉取模型列表（内网无法访问）
export DWTCODE_DISABLE_MODELS_FETCH=1

# 禁用默认插件（opencode-anthropic-auth），避免内网环境下 npm 安装超时
export DWTCODE_DISABLE_DEFAULT_PLUGINS=1

# 禁用配置目录依赖安装（bun install），避免内网环境下 npm registry 超时
export DWTCODE_DISABLE_CONFIG_DEPS=1
