var mysql = require('mysql')

//创建 mysql 的链接池
var pool = mysql.createPool({
	host: 'localhost', //mysql 的 ip 地址，由于是本地的我使用的 localhost
	port: 3306, //数据库的端口号，可不填默认是 3306
	user: 'root', //数据库的用户名
	password: 'admin', //数据库的密码
	database: 'myMySQL' //要访问的数据库名称
});

//配置操作数据库的主要方法
exports.query = function() {
	var args = arguments;
	var sqlStr = args[0];
	var params = [];
	var callback = null;
	//参数个数的判断
	if(args.length === 2 && typeof args[1] === 'function') {
		callback = args[1];
	} else if(args.length === 3 && Array.isArray(args[1]) && typeof args[2] ==='function') {
		params = args[1];
		callback = args[2];
	} else {
		throw new Error('参数个数不匹配');
	}
	//获取与数据库的连接
	pool.getConnection(function(err, connection) {
		if(err) {
			callback(err);
		}
		//执行 sql 语句
		connection.query(sqlStr, params, function(err, rows) {
			if(err) {
				callback(err);
			}
			//释放连接
			connection.release();
			callback.apply(null, arguments);
		});
	});
};

//在上面的代码中我们通用 exports 向外暴露 query，在 query 中我们不设置形参，通过
//判断 argument 的长度来判断传入了几个参数。如果用户传递了两个参数，那么第一个参
//数就是 SQL 操作字符串， 第二个参数就是回调函数； 如果传递了三个参数，那么第一个
//就是 SQL 操作字符串，第二个参数就是数据的数组，第三个参数是回调函数；否则就是生
//成错误“参数个数不匹配”。
//通过 pool.getConnection 方法获取与数据库的链接，这个链接上有一个 query 方法，
//这是就我们操作数据库的方法。在这个 query 中传入我们的 SQL 操作字符串、数据的数组
//和一个匿名函数。在这个匿名函数中执行我们的回调。