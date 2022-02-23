const { ROW, EXECUTE } = require('../mysql/db');

class ProjectModel {
  	async getProjectList() {
		const sql = "select * from project"
		const res = await ROW(sql);
    	return res;
	}
	 
	async addProject(params) {
		const sql = `insert into project (projectId, projectName, projectDes, interfaceNum) values (${params[0]}, '${params[1]}', '${params[2]}', ${params[3]});`;
		const res = await EXECUTE(sql);
		return res;
	}
}

module.exports = ProjectModel;