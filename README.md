# freeapi-helper

FreeAPI DGBMC 自动签到小助手

## 功能特性

- 支持多个账户自动签到（最多5个）
- 企业微信推送通知
- 自动检查登录状态

## 环境变量配置

在 `.env` 文件或 GitHub Actions Secrets 中设置以下环境变量：

### 基础配置（单个账户）
```
COOKIE=your_cookie_here
APIUSER=your_apiuser_here
WEIXIN_WEBHOOK=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=your_key
```

### 多账户配置（最多5个）
```
# 第一个账户
COOKIE=your_cookie_1
APIUSER=your_apiuser_1

# 第二个账户
COOKIE_2=your_cookie_2
APIUSER_2=your_apiuser_2

# 第三个账户
COOKIE_3=your_cookie_3
APIUSER_3=your_apiuser_3

# ... 最多支持到 COOKIE_5 和 APIUSER_5
WEIXIN_WEBHOOK=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=your_key
```

## 使用方法

1. 安装依赖：
```bash
npm install
```

2. 设置环境变量（见上文）

3. 运行签到：
```bash
npm run checkin
```

## GitHub Actions 使用

创建 `.github/workflows/checkin.yml`：

```yaml
name: Auto Checkin

on:
  schedule:
    - cron: '0 0 * * *'  # 每天0点运行
  workflow_dispatch:

jobs:
  checkin:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run checkin
        env:
          COOKIE_1: ${{ secrets.COOKIE_1 }}
          APIUSER_1: ${{ secrets.APIUSER_1 }}
          COOKIE_2: ${{ secrets.COOKIE_2 }}
          APIUSER_2: ${{ secrets.APIUSER_2 }}
          # ... 添加更多账户
          WEIXIN_WEBHOOK: ${{ secrets.WEIXIN_WEBHOOK }}
```