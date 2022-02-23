const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: 'root1314520',
    database: 'test',
    multipleStatements: true
});

// 返回一个对象数组的结果
const row = (sql, ...params) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
        if(err) {
            reject(err);
            return
        }
        connection.query(sql, params, (error, res) => {
            connection.release();
            if(error) {
                reject(error);
                return
            }
            resolve(res);
        });
    });
});

// 返回其中一个结果
const first = (sql, ...params) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
        if(err) {
            reject(err);
            return;
        }
        connection.query(sql, params, (error, res) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(res[0] || null);
        });
    })
});

// 执行sql命令
const execute = (sql, ...params) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
        if(err) {
            reject(err);
            return;
        }
        console.log(sql);
        connection.query(sql, params, (error, res) => {
            connection.release();
            if(error) {
                reject(error);
                return;
            }
            resolve(res);
        });
    });
});

module.exports = {
    ROW : row,
    ONE : first,
    EXECUTE : execute
}