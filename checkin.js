// 输出当前工作目录
console.log('Checkin script started in:', process.cwd());

const { accounts, WEIXIN_WEBHOOK } = require('./utils/env');
const { login, userInfo, signIn, sendWechatMessage } = require('./api');

async function main() {
  console.log('Checking accounts:', accounts);
  
  if (accounts.length === 0) {
    console.error('请设置至少一个 USERNAME、PASSWORD 和 APIUSER 环境变量（Actions Secrets 或 .env 文件）');
    console.error('配置格式：USERNAME_1, PASSWORD_1, APIUSER_1; USERNAME_2, PASSWORD_2, APIUSER_2; ... 最多5个');
    console.error('当前环境变量检查：');
    console.error('USERNAME:', process.env.USERNAME);
    console.error('PASSWORD:', process.env.PASSWORD ? '***' : undefined);
    console.error('APIUSER:', process.env.APIUSER);
    console.error('USERNAME_2:', process.env.USERNAME_2);
    console.error('PASSWORD_2:', process.env.PASSWORD_2 ? '***' : undefined);
    console.error('APIUSER_2:', process.env.APIUSER_2);
    
    // 发送错误通知
    const errorMsg = '签到失败：未设置环境变量，请检查 GitHub Secrets 或 .env 文件配置';
    await sendWechatMessage(WEIXIN_WEBHOOK, errorMsg);
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;
  const failureReasons = []; // 收集失败原因

  for (let i = 0; i < accounts.length; i++) {
    let { username, password, apiuser } = accounts[i];
    console.log(`\n=== 处理账户 ${i + 1} ===`);

    try {
      // 通过用户名密码登录获取 cookie
      console.log(`登录中 (${username})...`);
      let cookie = await login(username, password);
      console.log('登录成功，Cookie 已获取');

      // 用户信息检查
      const userRes = await userInfo(cookie, apiuser);
      const user = userRes.data;
      if (user.success !== true) {
        const errorMsg = `账户 ${i + 1} (${username}) 登录失败：${user.msg || JSON.stringify(userRes.data)}`;
        console.error(errorMsg);
        failureReasons.push(errorMsg);
        failCount++;
        continue;
      }
      console.log(`登录成功，欢迎：${user.data?.username || user.data?.email || "未知用户"}`);

      // 执行签到
      const res = await signIn(cookie, apiuser);
      if (res.data.success === "success" || res.data.success === true) {
        const successMsg = `账户 ${i + 1} (${username}) 签到成功：${res.data.msg || JSON.stringify(res.data)}`;
        console.log(successMsg);
        successCount++;
      } else {
        const errorMsg = `账户 ${i + 1} (${username}) 签到失败：${res.data.msg || JSON.stringify(res.data)}`;
        console.log(errorMsg);
        failureReasons.push(errorMsg);
        failCount++;
      }
    } catch (err) {
      let errorMsg = `账户 ${i + 1} (${username}) 脚本异常`;
      if (err.response) {
        errorMsg += `: ${err.response.status} - ${JSON.stringify(err.response.data)}`;
        console.error('接口请求错误', err.response.status, err.response.data);
      } else {
        errorMsg += `: ${err.message}`;
        console.error('脚本异常', err.message);
      }
      failureReasons.push(errorMsg);
      failCount++;
    }
  }

  // 构建汇总通知消息
  let summaryMsg = `签到完成：成功 ${successCount} 个，失败 ${failCount} 个`;
  
  // 如果有失败，添加失败原因
  if (failureReasons.length > 0) {
    summaryMsg += '\n\n失败原因：';
    failureReasons.forEach(reason => {
      summaryMsg += '\n- ' + reason;
    });
  }
  
  console.log(`\n${summaryMsg}`);
  await sendWechatMessage(WEIXIN_WEBHOOK, summaryMsg);
}

main();
