const { ROW } = require('../mysql/db');
class UserModel {
    async login(username, password) {
        const sql = `select * from user where username = "${username}" and password = "${password}"`;
        const res = await ROW(sql);
        if(res.length > 0) {
            return true;
        }else {
            return false;
        }
    }
}

module.exports = UserModel;