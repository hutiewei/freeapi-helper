require('dotenv').config();

console.log('Loading environment variables...');
console.log('COOKIE:', process.env.COOKIE);
console.log('APIUSER:', process.env.APIUSER);
console.log('WEIXIN_WEBHOOK:', process.env.WEIXIN_WEBHOOK ? '已设置' : '未设置');

module.exports = {
  COOKIE: process.env.COOKIE,
  APIUSER: process.env.APIUSER,
  WEIXIN_WEBHOOK: process.env.WEIXIN_WEBHOOK
};