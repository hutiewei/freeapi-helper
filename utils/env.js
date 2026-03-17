require('dotenv').config();

console.log('Loading environment variables...');
console.log('COOKIE:', process.env.COOKIE);
console.log('APIUSER:', process.env.APIUSER);

module.exports = {
  COOKIE: process.env.COOKIE,
  APIUSER: process.env.APIUSER
};