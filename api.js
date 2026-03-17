const axios = require('axios');
const BASE_URL = 'https://freeapi.dgbmc.top';

// 获取用户信息（用于演示登录有效性）
async function userInfo(cookie) {
  return axios.get(`${BASE_URL}/console/api/user/info`, {
    headers: {
      'cookie': cookie,
      'referer': 'https://freeapi.dgbmc.top/console'
    }
  });
}

// 签到接口
async function signIn(cookie) {
  // 实际接口根据抓包可能需要调整URL和请求方式
  return axios.post(`${BASE_URL}/console/api/user/signin`, null, {
    headers: {
      'cookie': cookie,
      'referer': 'https://freeapi.dgbmc.top/console',
      'content-type': 'application/json'
    }
  });
}

module.exports = { userInfo, signIn };