const path = require('path');

// 输出当前工作目录和文件路径
console.log('Current working directory:', process.cwd());
console.log('env.js file path:', __dirname);
console.log('Expected .env path:', path.resolve(__dirname, '../.env'));

// 尝试加载 .env 文件
const dotenvResult = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
console.log('dotenv load result:', dotenvResult.error ? 'Failed: ' + dotenvResult.error.message : 'Success');

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
  
  // 输出环境变量值（隐藏敏感信息）
  console.log(`Account ${i} - USERNAME${i === 1 ? '' : '_' + i}:`, username ? '已设置' : '未设置');
  console.log(`Account ${i} - PASSWORD${i === 1 ? '' : '_' + i}:`, password ? '已设置' : '未设置');
  console.log(`Account ${i} - APIUSER${i === 1 ? '' : '_' + i}:`, apiuser ? '已设置' : '未设置');
  
  // 支持用户名密码方式
  if (username && password && apiuser) {
    accounts.push({ username, password, apiuser });
    console.log(`Account ${i} added to accounts list`);
  }
}

console.log('WEIXIN_WEBHOOK:', process.env.WEIXIN_WEBHOOK ? '已设置' : '未设置');
console.log('Total accounts found:', accounts.length);

// 检查是否有环境变量被设置
const hasEnvVars = process.env.USERNAME || process.env.USERNAME_2 || process.env.USERNAME_3 || process.env.USERNAME_4 || process.env.USERNAME_5;
console.log('Any environment variables set:', hasEnvVars ? 'Yes' : 'No');

// 输出所有相关的环境变量
console.log('All relevant env vars:');
for (let i = 1; i <= 5; i++) {
  const prefix = i === 1 ? '' : '_' + i;
  console.log(`USERNAME${prefix}:`, process.env[`USERNAME${prefix}`]);
  console.log(`PASSWORD${prefix}:`, process.env[`PASSWORD${prefix}`] ? '***' : undefined);
  console.log(`APIUSER${prefix}:`, process.env[`APIUSER${prefix}`]);
}

module.exports = {
  accounts,
  WEIXIN_WEBHOOK: process.env.WEIXIN_WEBHOOK
};
