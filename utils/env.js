require('dotenv').config();

console.log('Loading environment variables...');

// 支持最多5个账户
const accounts = [];
for (let i = 1; i <= 5; i++) {
  let cookie, apiuser;
  if (i === 1) {
    cookie = process.env.COOKIE;
    apiuser = process.env.APIUSER;
  } else {
    cookie = process.env[`COOKIE_${i}`];
    apiuser = process.env[`APIUSER_${i}`];
  }
  if (cookie && apiuser) {
    accounts.push({ cookie, apiuser });
    console.log(`Account ${i} - COOKIE${i === 1 ? '' : '_' + i}:`, cookie ? '已设置' : '未设置');
    console.log(`Account ${i} - APIUSER${i === 1 ? '' : '_' + i}:`, apiuser ? '已设置' : '未设置');
  }
}

console.log('WEIXIN_WEBHOOK:', process.env.WEIXIN_WEBHOOK ? '已设置' : '未设置');

module.exports = {
  accounts,
  WEIXIN_WEBHOOK: process.env.WEIXIN_WEBHOOK
};