# Packages

此目录用于存放共享的库和工具包。

## 示例包结构

```
packages/
  ui/         # 共享 UI 组件库
  config/     # 共享配置（tsconfig、eslint 等）
  utils/      # 共享工具函数
```

## 创建新包

```bash
mkdir packages/<package-name>
cd packages/<package-name>
# 创建 package.json，name 格式: @growth-points/<package-name>
pnpm install
```