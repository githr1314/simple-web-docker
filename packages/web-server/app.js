const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const config = require("./config/index");                   // 环境配置
const controller = require("./controllers");                // 路由
const middleware = require('./middlewares');                // 引入中间件
const cors = require('koa2-cors');                          // 允许跨域

const app = new Koa();
if(process.env.NODE_ENV === "development") {
  app.use(cors())
}
app.use(bodyParser());
// 初始化中间件
middleware(app);
// 创建请求处理路由
controller(app);
// 启动node服务
app.listen(config.prot, () => {
  console.log(`server is running at http://localhost:${config.prot}`);
});
