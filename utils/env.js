const path = require('path');
const fs = require('fs');

// 输出当前工作目录和文件路径
console.log('Current working directory:', process.cwd());
console.log('env.js file path:', __dirname);
const envPath = path.resolve(__dirname, '../.env');
console.log('Expected .env path:', envPath);

// 手动解析 .env 文件
function loadEnvFile(envPath) {
  if (fs.existsSync(envPath)) {
    console.log('.env file exists, manually parsing...');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key) {
          const value = valueParts.join('=').trim();
          envVars[key] = value;
          // 同时设置到 process.env
          process.env[key] = value;
        }
      }
    });
    
    console.log('Manually parsed variables:');
    Object.keys(envVars).forEach(key => {
      if (key.includes('PASSWORD')) {
        console.log(`${key}: ***`);
      } else {
        console.log(`${key}: ${envVars[key]}`);
      }
    });
    
    return envVars;
  } else {
    console.log('.env file does not exist');
    return {};
  }
}

// 手动加载 .env 文件
const manualEnvVars = loadEnvFile(envPath);

// 尝试使用 dotenv 加载（作为备用）
try {
  const dotenvResult = require('dotenv').config({ path: envPath });
  console.log('dotenv load result:', dotenvResult.error ? 'Failed: ' + dotenvResult.error.message : 'Success');
  
  if (dotenvResult.parsed) {
    console.log('dotenv parsed variables:');
    Object.keys(dotenvResult.parsed).forEach(key => {
      if (key.includes('PASSWORD')) {
        console.log(`${key}: ***`);
      } else {
        console.log(`${key}: ${dotenvResult.parsed[key]}`);
      }
    });
  } else {
    console.log('dotenv parsed no variables');
  }
} catch (err) {
  console.log('Error loading dotenv:', err.message);
}

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
