const { COOKIE } = require('./utils/env');
const { APIUSER } = require('./utils/env');
const { userInfo, signIn } = require('./api');

async function main() {
  if (!COOKIE) {
    console.error('请设置 COOKIE 环境变量（Actions Secrets 或 .env 文件）');
    process.exit(1);
  }
  if (!APIUSER) {
    console.error('请设置 APIUSER 环境变量（Actions Secrets 或 .env 文件）');
    process.exit(1);
  }

  try {
    // 用户信息检查
    const userRes = await userInfo(COOKIE, APIUSER);
    const user = userRes.data;
    if (user.success !== true) {
      console.error('登录失败：', user.msg || userRes.data);
      process.exit(1);
    }
    console.log(`登录成功，欢迎：${user.data?.username || user.data?.email || "未知用户"}`);

    // 执行签到
    const res = await signIn(COOKIE, APIUSER);
    if (res.data.success === success) {
      console.log(`签到成功：${res.data.msg || JSON.stringify(res.data)}`);
    } else {
      console.log(`签到失败：${res.data.msg || JSON.stringify(res.data)}`);
    }
  } catch (err) {
    if (err.response) {
      console.error('接口请求错误', err.response.status, err.response.data);
    } else {
      console.error('脚本异常', err.message);
    }
    process.exit(1);
  }
}

main();