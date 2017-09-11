
//网站做了一些ip的屏蔽,或者对客户端请求的拦截,账号可能被封掉
//get方法:大多数情况下只是发送一个请求,只是查询并没有数据提交

//请求头信息
//Accept:application/json, text/javascript, */*; q=0.01
//Accept-Encoding:gzip, deflate
//Accept-Language:zh-CN,zh;q=0.8
//Connection:keep-alive
//Content-Length:88
//Content-Type:application/x-www-form-urlencoded; charset=UTF-8
//Cookie:imooc_uuid=7d4a316e-a2ae-48d7-8ced-5e32144fcb7a; imooc_isnew_ct=1494333236; PHPSESSID=ugm6m0brotle2cedhgcbutjkd6; loginstate=1; apsid=IxMzA3OGJmN2RmZDAyNTZjNzY4ZWJmMTYxNjY1MDMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDA1NDQ4NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtMTgzMzIzNjAyMDlAMTYzLmNvbQAAAAAAAAAAAAAAADljNTgyY2VlNTMyNGNkOWZmYzhmMDI3NjM1NGU4YjgzlxguWZcYLlk%3DMW; last_login_username=m18332360209%40163.com; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1495673779,1495761133,1495846523,1496192413; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1496222949; IMCDNS=0; imooc_isnew=2; cvde=592e1599a5c36-68
//Host:www.imooc.com
//Origin:http://www.imooc.com
//Referer:http://www.imooc.com/course/comment/id/348?page=4
//User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36
//X-Requested-With:XMLHttpRequest

var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify({
	"content":"一起期待下一期的课程",
	"cid": 348
})

var options = {
	hostname:'www.imooc.com',
	port:80,
	path:'course/docomment',
	method:'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,//提交的长度，服务器端会对这个长度做校验，看提交的长度和实际数据的长度是否一致。如果不一致，这个请求可能会被拒绝
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=7d4a316e-a2ae-48d7-8ced-5e32144fcb7a; imooc_isnew_ct=1494333236; PHPSESSID=ugm6m0brotle2cedhgcbutjkd6; loginstate=1; apsid=IxMzA3OGJmN2RmZDAyNTZjNzY4ZWJmMTYxNjY1MDMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDA1NDQ4NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtMTgzMzIzNjAyMDlAMTYzLmNvbQAAAAAAAAAAAAAAADljNTgyY2VlNTMyNGNkOWZmYzhmMDI3NjM1NGU4YjgzlxguWZcYLlk%3DMW; last_login_username=m18332360209%40163.com; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1495673779,1495761133,1495846523,1496192413; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1496222949; IMCDNS=0; imooc_isnew=2; cvde=592e1599a5c36-68',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/course/comment/id/348?page=4',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}


var req = http.request(options, function (res) {
	console.log('Status:'+res.statusCode)//查看状态码
	console.log('headers:'+JSON.stringify(res.headers))
	
	//接收数据的时候，node是以流的形式来发送，所以会触发on data事件
	//为resdata事件注册回调函数，来接收数据
	res.on('data',function (chunk) {
		console.log(Buffer.isBuffer(chunk))//检测chunk是否是buffer
		console.log(typeof chunk)
	})
	//数据接收完毕，网络连接关闭的时候触发
	res.on('end', function () {
		console.log('评论完毕！')
	})
	res.on('error',function (e) {
		console.log('Error:' + e.message)
	})
	
})

//把要提交的数据写入请求体
req.write(postData)

req.end()








