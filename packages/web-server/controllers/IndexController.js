const Project = require('../models/ProjectModel');
const User = require('../models/UserModel');
class IndexController {

  	async actionIndex(ctx, next) {
    	ctx.body = "首页";
  	}

  	async actionLogin(ctx, next) {
		const { UserName, PassWord } = ctx.request.body;
		const user = new User();
		const hasUser = await user.login(UserName, PassWord);
		const result = {
			code: '',
			message: '请求成功',
			data: {}
		}
		if(hasUser) {
			result.code = '000000'
			result.data = {
				login: 'success',
			}
		}else {
			result.message = '登陆失败';
		}
		ctx.send(result);
	}

	async actionGetProjectList(ctx, next) {
		const project = new Project();
		const list = await project.getProjectList();
		ctx.send({projectList: list});
	}

	async actionAddProject(ctx, next) {
		const project = new Project();
		// get req param
		const res = await project.addProject();
		ctx.send({addResult: res});
	}
	
}

module.exports = IndexController;
