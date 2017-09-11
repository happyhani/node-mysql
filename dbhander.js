//具体的增删改查的操作:


//引入 db.js 中的操作 MySQL 数据库的主模块
var connection = require('./db.js');
//引入 node-uuid 用来生成唯一标识符
var uuid = require('node-uuid');
//实体类
function Users(users) {
	this.id = users.id;
	this.userName = users.userName;
	this.passWord = users.passWord
}
//查询数据的方法
Users.getUserByid = function(id, callback) {
		var selectSql = 'SELECT * FROM users WHERE id =?';
		//query 执行 sql 语句的方法，第一参数字符串型的 sql 语句,变量
		connection.query(selectSql, [id], function(err, res) {
			if(err) {
				console.log(' getUserByid err:' + err);
				return;
			}
			console.log('Get user success' + res);
			console.dir(res);
			callback(err, res);
		});
	}
	//删除数据的方法
Users.deletUserByid = function(id, callback) {
		var delSql = 'DELETE FROM users WHERE id=?';
		connection.query(delSql, [id], function(err, res) {
			if(err) {
				console.log('getUserByid err:' + err);
				return;
			}
			callback(err, res);
		});
	}
	//更新数据的方法
Users.updateUserByid = function(user, callback) {
		var delSql = 'UPDATE users SET userName =? WHERE id=?';
		connection.query(delSql, [user.userName, user.id], function(err, res) {
			if(err) {
				console.log('getUserByid err:' + err);
				return;
			}
			callback(err, res);
		});
	}
	//插入数据的方法
Users.saveUser = function(user, callback) {
	//准备 id
	var id = uuid.v1();
	var saveSql = 'INSERT INTO users (id,userName,passWord) VALUES (?,?,?)';
	connection.query(saveSql, [id, user.userName, user.passWord],
		function(err, res) {
			if(err) {
				console.log(err);
				return;
			}
			callback(err, res);
		});
}
module.exports = Users;

//具体的增删改查的方法如上所示，最后在用 module.exports 向外暴露出来。
//然后在路由中引入 dbheadle 模块，在对应接口里应用上述方法即可实现对 myMySQL 数据
//库中 users 表的增删改查操作。