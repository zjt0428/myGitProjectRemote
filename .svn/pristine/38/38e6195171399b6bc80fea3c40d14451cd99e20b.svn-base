//接口请求地址
//获取到当前项目的名称
var curWwwPath = window.document.location.href;
var pathName =  window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPaht = curWwwPath.substring(0,pos);
var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var urlPath=localhostPaht + projectName;


//匹配url参数 支持中文
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = decodeURIComponent(window.location.search).substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return -1;
}
