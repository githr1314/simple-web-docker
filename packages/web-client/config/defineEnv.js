const argv = require('yargs-parser')(process.argv.slice(4));
const APP_ENV = argv.env || 'dev';
const env = require('../config/env.json');
const oriEnv = env[APP_ENV];
Object.assign(oriEnv, {
    APP_ENV: APP_ENV
});
const defineEnv = {};
for (const key in oriEnv) {
    if (oriEnv.hasOwnProperty(key)) {
        // 注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。
        // 通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production')
        defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key]);
    }
}

module.exports = { defineEnv, APP_ENV };