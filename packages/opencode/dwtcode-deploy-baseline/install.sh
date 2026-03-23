#!/bin/bash
set -e

# 获取脚本所在目录（这样无论从哪里执行都能找到配置文件）
SOURCE_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ">>> 安装 DWTCode 二进制..."
mkdir -p ~/.local/bin
cp "$SOURCE_DIR/dwtcode" ~/.local/bin/dwtcode
chmod +x ~/.local/bin/dwtcode

echo ">>> 写入配置..."
mkdir -p ~/.config/dwtcode
cp "$SOURCE_DIR/dwtcode.json" ~/.config/dwtcode/dwtcode.json

echo ">>> 安装全局 Skills..."
if [ -d "$SOURCE_DIR/skills" ]; then
  mkdir -p ~/.config/dwtcode/skills
  cp -r "$SOURCE_DIR/skills/"* ~/.config/dwtcode/skills/
fi

echo ">>> 写入环境变量..."
# 逐个检查并追加，避免重复，也确保新增的变量能补全
ENV_VARS=(
  "DWTCODE_DISABLE_AUTOUPDATE=1"
  "DWTCODE_DISABLE_MODELS_FETCH=1"
  "DWTCODE_DISABLE_DEFAULT_PLUGINS=1"
  "DWTCODE_DISABLE_CONFIG_DEPS=1"
)
# 如果还没有 DWTCode 环境变量块的注释头，先加上
if ! grep -q "# DWTCode" ~/.bashrc; then
  echo "" >> ~/.bashrc
  echo "# DWTCode 内网环境变量" >> ~/.bashrc
fi
for var in "${ENV_VARS[@]}"; do
  key="${var%%=*}"
  if ! grep -q "export $key=" ~/.bashrc; then
    echo "export $var" >> ~/.bashrc
  fi
done
# 确保 PATH 包含 ~/.local/bin
if ! grep -q 'HOME/.local/bin' ~/.bashrc; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
fi

echo ">>> 安装完成！"
echo ">>> 请执行以下命令激活环境，或者打开一个新终端："
echo ""
echo "    source ~/.bashrc"
echo ""
echo ">>> 之后运行 'dwtcode' 即可启动。"
