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
USERNAME=your_username
PASSWORD=your_password
APIUSER=your_apiuser
BASE_URL=https://freeapi.dgbmc.top  # 可选，默认原网站
WEIXIN_WEBHOOK=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=your_key
```

### 多账户配置（最多5个，支持不同网站）
```
# 第一个账户（默认网站）
USERNAME=your_username_1
PASSWORD=your_password_1
APIUSER=your_apiuser_1
# BASE_URL=https://freeapi.dgbmc.top  # 可选

# 第二个账户（默认网站）
USERNAME_2=your_username_2
PASSWORD_2=your_password_2
APIUSER_2=your_apiuser_2
# BASE_URL_2=https://freeapi.dgbmc.top  # 可选

# 第三个账户（新网站）
USERNAME_3=your_username_3
PASSWORD_3=your_password_3
APIUSER_3=your_apiuser_3
BASE_URL_3=https://api.gemai.cc/

# 第四个账户（新网站）
USERNAME_4=your_username_4
PASSWORD_4=your_password_4
APIUSER_4=your_apiuser_4
BASE_URL_4=https://api.gemai.cc/

# 第五个账户
USERNAME_5=your_username_5
PASSWORD_5=your_password_5
APIUSER_5=your_apiuser_5
BASE_URL_5=https://another.api.site/

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
          # 第一个账户（默认网站）
          USERNAME: ${{ secrets.USERNAME }}
          PASSWORD: ${{ secrets.PASSWORD }}
          APIUSER: ${{ secrets.APIUSER }}
          # BASE_URL: ${{ secrets.BASE_URL }}  # 可选
          
          # 第二个账户（默认网站）
          USERNAME_2: ${{ secrets.USERNAME_2 }}
          PASSWORD_2: ${{ secrets.PASSWORD_2 }}
          APIUSER_2: ${{ secrets.APIUSER_2 }}
          # BASE_URL_2: ${{ secrets.BASE_URL_2 }}  # 可选
          
          # 第三个账户（新网站）
          USERNAME_3: ${{ secrets.USERNAME_3 }}
          PASSWORD_3: ${{ secrets.PASSWORD_3 }}
          APIUSER_3: ${{ secrets.APIUSER_3 }}
          BASE_URL_3: ${{ secrets.BASE_URL_3 }}
          
          # 第四个账户（新网站）
          USERNAME_4: ${{ secrets.USERNAME_4 }}
          PASSWORD_4: ${{ secrets.PASSWORD_4 }}
          APIUSER_4: ${{ secrets.APIUSER_4 }}
          BASE_URL_4: ${{ secrets.BASE_URL_4 }}
          
          # 第五个账户
          USERNAME_5: ${{ secrets.USERNAME_5 }}
          PASSWORD_5: ${{ secrets.PASSWORD_5 }}
          APIUSER_5: ${{ secrets.APIUSER_5 }}
          BASE_URL_5: ${{ secrets.BASE_URL_5 }}
          
          # 企业微信推送
          WEIXIN_WEBHOOK: ${{ secrets.WEIXIN_WEBHOOK }}
```