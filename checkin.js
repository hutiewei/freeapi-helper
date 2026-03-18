const { accounts } = require('./utils/env');
const { WEIXIN_WEBHOOK } = require('./utils/env');
const { userInfo, signIn, sendWechatMessage } = require('./api');

async function main() {
  if (accounts.length === 0) {
    console.error('请设置至少一个 COOKIE 和 APIUSER 环境变量（Actions Secrets 或 .env 文件）');
    console.error('支持格式：COOKIE_1, APIUSER_1; COOKIE_2, APIUSER_2; ... 最多5个');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < accounts.length; i++) {
    const { cookie, apiuser } = accounts[i];
    console.log(`\n=== 处理账户 ${i + 1} ===`);

    try {
      // 用户信息检查
      const userRes = await userInfo(cookie, apiuser);
      const user = userRes.data;
      if (user.success !== true) {
        console.error('登录失败：', user.msg || userRes.data);
        failCount++;
        continue;
      }
      console.log(`登录成功，欢迎：${user.data?.username || user.data?.email || "未知用户"}`);

      // 执行签到
      const res = await signIn(cookie, apiuser);
      if (res.data.success === "success" || res.data.success === true) {
        const successMsg = `账户 ${i + 1} 签到成功：${res.data.msg || JSON.stringify(res.data)}`;
        console.log(successMsg);
        successCount++;
      } else {
        const failMsg = `账户 ${i + 1} 签到失败：${res.data.msg || JSON.stringify(res.data)}`;
        console.log(failMsg);
        failCount++;
      }
    } catch (err) {
      let errorMsg = `账户 ${i + 1} 脚本异常`;
      if (err.response) {
        errorMsg += `: ${err.response.status} - ${JSON.stringify(err.response.data)}`;
        console.error('接口请求错误', err.response.status, err.response.data);
      } else {
        errorMsg += `: ${err.message}`;
        console.error('脚本异常', err.message);
      }
      failCount++;
    }
  }

  // 发送汇总通知
  const summaryMsg = `签到完成：成功 ${successCount} 个，失败 ${failCount} 个`;
  console.log(`\n${summaryMsg}`);
  await sendWechatMessage(WEIXIN_WEBHOOK, summaryMsg);
}

main();