const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('Loading environment variables...');

// 支持最多5个账户
const accounts = [];
for (let i = 1; i <= 5; i++) {
  let username, password, apiuser;
  if (i === 1) {
    username = process.env.USERNAME;
    password = process.env.PASSWORD;
    apiuser = process.env.APIUSER;
  } else {
    username = process.env[`USERNAME_${i}`];
    password = process.env[`PASSWORD_${i}`];
    apiuser = process.env[`APIUSER_${i}`];
  }
  
  // 支持用户名密码方式
  if (username && password && apiuser) {
    accounts.push({ username, password, apiuser });
    console.log(`Account ${i} - USERNAME${i === 1 ? '' : '_' + i}:`, username ? '已设置' : '未设置');
    console.log(`Account ${i} - PASSWORD${i === 1 ? '' : '_' + i}:`, password ? '已设置' : '未设置');
    console.log(`Account ${i} - APIUSER${i === 1 ? '' : '_' + i}:`, apiuser ? '已设置' : '未设置');
  }
}

console.log('WEIXIN_WEBHOOK:', process.env.WEIXIN_WEBHOOK ? '已设置' : '未设置');

module.exports = {
  accounts,
  WEIXIN_WEBHOOK: process.env.WEIXIN_WEBHOOK
};