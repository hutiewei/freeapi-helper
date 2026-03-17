const axios = require('axios');
const BASE_URL = 'https://freeapi.dgbmc.top';

// 获取用户信息（用于演示登录有效性）
async function userInfo(cookie,user) {
  return axios.get(`${BASE_URL}/api/user/self`, {
    headers: {
      'cookie': cookie,
      'referer': 'https://freeapi.dgbmc.top/console',
      'new-api-user': user
    }
  });
}

// 签到接口
async function signIn(cookie,user) {
  // 实际接口根据抓包可能需要调整URL和请求方式
  return axios.post(`${BASE_URL}/api/user/checkin`, null, {
    headers: {
      'cookie': cookie,
      'referer': 'https://freeapi.dgbmc.top/console',
      'content-type': 'application/json',
      'new-api-user': user
    }
  });
}

// 企业微信推送
async function sendWechatMessage(webhookUrl, message) {
  if (!webhookUrl) {
    console.log('未设置 WEIXIN_WEBHOOK，跳过推送');
    return;
  }
  try {
    const payload = {
      msgtype: 'text',
      text: {
        content: message
      }
    };
    await axios.post(webhookUrl, payload);
    console.log('企业微信推送成功');
  } catch (error) {
    console.error('企业微信推送失败:', error.message);
  }
}

module.exports = { userInfo, signIn, sendWechatMessage };