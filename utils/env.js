require('dotenv').config();

console.log('Loading environment variables...');
console.log('COOKIE:', process.env.COOKIE);
console.log('USER:', process.env.USER);

module.exports = {
  COOKIE: process.env.COOKIE,
  user: process.env.USER
};