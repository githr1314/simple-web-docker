const fs = require('fs');
const path = require('path');

class ErrorCollectController {

  	async actionSendErrorLog(ctx, next) {
		// const errorData = ctx.request.body;
		const errorData = {
			errorMessage: errorMessage || null,
			scriptURI: scriptURI || null,
			lineNo: lineNo || null,
			columnNo: columnNo || null,
			stack: error && error.stack ? error.stack : null
		};
		const url = errorData.scriptURI; // 压缩文件路径
		if (url) {
			let fileUrl = url.slice(url.indexOf('webapp/')) + '.map'; // map文件路径
			// 解析sourceMap
			const smc = new sourceMap.SourceMapConsumer(fs.readFileSync(resolve('../' + fileUrl), 'utf8'));
			smc.then(result => {
				const ret = result.originalPositionFor({
					line: errorData.lineNo,
					column: errorData.columnNo
				})
			});
		}
		const result = {
			code: '',
			message: '请求成功',
			data: {}
		}
		ctx.send(result);
	}
}

module.exports = IndexController;
