<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	System.out.println(request.getParameter("fileId"));
	String url =request.getContextPath()+"/file-upload?method=download&fileId=" + request.getParameter("fileId");
	System.out.println(request.getContextPath());
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>图片预览</title>
<script src="<%=request.getContextPath()%>/pages/document/js/CJL.0.1.min.js"></script>
<script src="<%=request.getContextPath()%>/pages/document/js/ImageTrans.js"></script>
<style type="text/css">
<!--
body {
	font-size:12px;
	font-family:宋体,serif,Tahoma, Helvetica, sans-serif;
	color:#333333;
	background-color:#C7D5E5;
	margin:0 auto;
}
div,table,select,input,textarea,form,p,h1,h2,h3,h4,h5,fieldset,p{padding:0; margin:0;}
ul,li,dl,dt,dd{padding:0; margin:0; list-style:none;}
img{ border:0; padding:0; margin:0}

.title_box{ float:left;height:30px; line-height:30px; width:97%;}
.title_wrod{float:left; width:70%; font-size:12px; line-height:30px;  font-weight: bold; color:#14428B; padding-left:25px;}
.title_zoom{ float:right; width:20px; padding-top:10px; }
.details_box{ float:left; margin-left:10px; padding:10px; margin-right:10px; border:1px solid #330066; width:96%; height:aoto;background-color:#DFE9F7;}

.button_box{ float:left; width:50%; padding-top:12px; height:36px; position: relative; left:36%;}
.button_box li{ float:left; width:75px; margin-right:15px;}

-->
</style>
</head>
<body>
<style>
#idContainer{border:1px solid #000;width:100%; height:600px;OVERFLOW-y:scroll; background:#FFF center no-repeat;}
</style>
<div class="title_box">
  <div class="title_wrod">图片预览</div>
  <div class="title_zoom"><img src="<%=request.getContextPath()%>/pages/document/images/close_image.gif" /></div>
</div>

<div class="details_box"> 
		<div id="idContainer" ></div>
</div>
<div class="button_box">
   <ul>
		<li><input id="idLeft" type="button" value="向左旋转" /></li>
		<li><input id="idRight" type="button" value="向右旋转" /></li>
		<li><input id="idVertical" type="button" value="垂直翻转" /></li>
		<li><input id="idHorizontal" type="button" value="水平翻转" /></li>
		<li><input id="idReset" type="button" value="重置" /></li>
		<li><input type="button" value="关闭"  onclick="window.close();"/></li>
   </ul>
</div>

<script>
(function(){

var container = $$("idContainer"), src = "<%=url%>",
	options = {
		onPreLoad: function(){ container.style.backgroundImage = ""; },
		onLoad: function(){ container.style.backgroundImage = ""; },
		onError: function(err){ container.style.backgroundImage = ""; alert(err); }
	},
	it = new ImageTrans( container, options );
it.load(src);
//垂直翻转
$$("idVertical").onclick = function(){ it.vertical(); }
//水平翻转
$$("idHorizontal").onclick = function(){ it.horizontal(); }
//左旋转
$$("idLeft").onclick = function(){ it.left(); }
//右旋转
$$("idRight").onclick = function(){ it.right(); }
//重置
$$("idReset").onclick = function(){ it.reset(); }
//换图
$$("idLoad").onclick = function(){ it.load( $$("idSrc").value ); }

//关闭
//$$("idClose").onclick = function(){ window.close(); }
//Canvas


})()
</script>
</body>
</html>
