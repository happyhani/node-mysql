var  jsonstr = '{"name":"哈尼","age":18,"sex":"女神"}'
var strjson = JSON.parse(jsonstr)



var obj = {name:"哈尼",age:18,sex:"女神"}

var str = JSON.stringify(obj);

console.log(strjson); //{name:'哈尼',age:18,sex:'女神'}

console.log(str); //{"name":"哈尼","age":18,"sex":"女神"}

//console.log(str instanceof Object)
//console.log(json instanceof Object) //true
