const axios = require('axios');
const BASE_URL = 'https://freeapi.dgbmc.top';

// 获取用户信息（用于演示登录有效性）
async function userInfo(cookie) {
  return axios.get(`${BASE_URL}/api/user/self`, {
    headers: {
      'cookie': cookie,
      'referer': 'https://freeapi.dgbmc.top/console',
      'new-api-user': user
    }
  });
}

// 签到接口
async function signIn(cookie) {
  // 实际接口根据抓包可能需要调整URL和请求方式
  return axios.post(`${BASE_URL}/console/api/user/checkin`, null, {
    headers: {
      'cookie': cookie,
      'referer': 'https://freeapi.dgbmc.top/console',
      'content-type': 'application/json',
      'new-api-user': user
    }
  });
}

module.exports = { userInfo, signIn };