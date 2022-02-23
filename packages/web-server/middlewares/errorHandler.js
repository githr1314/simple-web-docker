// 错误处理中间件
// 捕获所有路由的报错，返回友好的提示
const log4j = require('../config/log4j.config');
// 创建日志记录实例
const logger = log4j.getLogger("global");
// 错误处理中间件
const errorHander = () => {
	return async (ctx, next) => {
		try {
			await next();
		} catch (e) {
			logger.error(e);
			// to be added
		}
		switch (ctx.status) {
			case 404:
			ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>`;
			break;
			case 401:
			ctx.body = "友好的401页面";
			break;
		}
	}
};

module.exports = errorHander;
