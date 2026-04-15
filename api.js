const axios = require('axios');

// 通过用户名和密码获取 cookie
async function login(username, password, baseUrl) {
  try {
    const response = await axios.post(`${baseUrl}/api/user/login`, {
      username: username,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Origin': baseUrl,
        'Referer': `${baseUrl}/console`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
      },
      maxRedirects: 0,
      validateStatus: status => status >= 200 && status < 400
    });

    // 从响应头获取 cookie
    if (response.headers && response.headers['set-cookie']) {
      return response.headers['set-cookie'].join('; ');
    }

    // 从响应体中获取 cookie
    if (response.data) {
      if (typeof response.data.cookie === 'string') {
        return response.data.cookie;
      }
      if (response.data.data && typeof response.data.data.cookie === 'string') {
        return response.data.data.cookie;
      }
    }

    throw new Error(`未能从登录接口获取 cookie，status=${response.status}, body=${JSON.stringify(response.data)}`);
  } catch (error) {
    if (error.response) {
      console.error('登录失败:', error.response.status, error.response.data || error.message);
      throw new Error(`登录失败: ${error.response.status} ${JSON.stringify(error.response.data)}`);
    }
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
      'new-api-user': user,
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
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
      'new-api-user': user,
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
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