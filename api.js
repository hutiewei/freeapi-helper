const axios = require('axios');

// 通过用户名和密码获取 cookie
async function login(username, password, baseUrl) {
  try {
    const response = await axios.post(`${baseUrl}/api/user/login`, {
      username: username,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // 从响应头或响应体中获取 cookie
    if (response.headers['set-cookie']) {
      return response.headers['set-cookie'].join('; ');
    }
    
    // 如果 cookie 在响应体中
    if (response.data.cookie) {
      return response.data.cookie;
    }
    
    throw new Error('未能从登录接口获取 cookie');
  } catch (error) {
    console.error('登录失败:', error.message);
    throw error;
  }
}

// 获取用户信息（用于演示登录有效性）
async function userInfo(cookie, user, baseUrl) {
  return axios.get(`${baseUrl}/api/user/self`, {
    headers: {
      'cookie': cookie,
      'referer': `${baseUrl}/console`,
      'new-api-user': user
    }
  });
}

// 签到接口
async function signIn(cookie, user, baseUrl) {
  return axios.post(`${baseUrl}/api/user/checkin`, null, {
    headers: {
      'cookie': cookie,
      'referer': `${baseUrl}/console`,
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

module.exports = { login, userInfo, signIn, sendWechatMessage };