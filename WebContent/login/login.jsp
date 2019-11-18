<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.knight.system.application.ApplicationContainer"%>
<%@ page import="org.apache.commons.lang.StringUtils"%>
<%@ page import="java.util.*"%>
<%@ page session="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="msthemecompatible" content="no" />
    <title>系统登录</title>
    <link type="text/css" rel="stylesheet" href="../css/public.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3.4/resources/css/ext-all.css" />
	<%
	response.addHeader("__timeout", "true");
	String randomData = "";
	char upper = 'z', lower = 'a';
	Random random = new Random();
	for (int i = 0; i < 20; i++) {
		int tempval = (int) ((int) lower + (random.nextFloat() * ((int) (upper - lower))));
		randomData += new Character((char) tempval).toString();
	}
	session.setAttribute("randomData", randomData);
	%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/ext3.4/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=request	.getContextPath()%>/ext3.4/ext-all.gzjs"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/ext3.4/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/ext3.4/ext-basex.gzjs"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/core/md5.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/core/base64.js"></script>
	<script type="text/javascript">
		if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment) {
			Range.prototype.createContextualFragment = function(html) {
				var frag = document.createDocumentFragment(), div = document.createElement("div");
				frag.appendChild(div);
				div.outerHTML = html;
				return frag;
			};
		}
		Ext.onReady(function() {
			Ext.QuickTips.init();
		});
	</script>
	<script type="text/javascript">
		var __ctxPath = "<%=request.getContextPath()%>";
		var loadMarsk = null;
		function keypress(e) {
			if (!window.event) {
				e = e.which;
			} else {
				e = window.event.keyCode;
			}
			if (e == 13 || e == 42) {
				doLogin();
			}
		}
		function handleLoginResult(a, loadMarsk) {
			if (a.success) {
				var b = new Ext.ProgressBar({
					text : "正在登录..."
				});
				b.show();
				window.location.href = __ctxPath + "/indexsrc.jsp";
			} else {
				loadMarsk.hide();
				document.getElementById("errorMessage").innerHTML = "错误:" + a.msg;
				var j_username = document.forms[0].j_username;
				var j_password = document.forms[0].j_password;
				j_password.value = "";
				j_username.focus();
			}
		}
		function longin() {
			var j_username = document.forms[0].j_username;
			var j_password = document.forms[0].j_password;
			var j_randomDigest = document.forms[0].j_randomDigest;
			loadMarsk = new Ext.LoadMask(document.body, {  
				msg : "正在登录，请稍候......",
				disabled : false
			});
			loadMarsk.show();
			Ext.Ajax.request({
				url : __ctxPath + "/login.do",
				params : {
					username : j_username.value,
					password : hex2b64(hex_md5(j_password.value)),
					randomDigest : j_randomDigest.value
				},
				method : "POST",
				url : __ctxPath + "/login.do",
				success : function(g, h) {
					var d = Ext.util.JSON.decode(g.responseText);
					handleLoginResult(d, loadMarsk);
				},
				failure : function(g, h) {
					var d = Ext.util.JSON.decode(g.responseText);
					handleLoginResult(d, loadMarsk);
					j_password.value = "";
					j_username.focus();
				}
			});
		}
		function doLogin() {
			if(!check()) {
				return;
			}
			document.forms[0].j_randomDigest.value = "<%=randomData%>";
			try {
				ePass.OpenDevice(1, "");
				var keySeral = ePass.GetStrProperty(7, 0, 0);
				document.forms[0].j_keySeral.value = keySeral;
				ePass.CloseDevice();
			} catch (e) {
			}
			longin();
		}
		function check() {
			var j_username = document.forms[0].j_username;
			if (j_username.value == "") {
				document.getElementById("errorMessage").innerHTML = "错误:用户名不允许为空!";
				j_username.focus();
				return false;
			}
			j_username.value = j_username.value;
			var j_password = document.forms[0].j_password;
			if (j_password.value == "") {
				document.getElementById("errorMessage").innerHTML = "错误:密码不允许为空!";
				j_password.focus();
				return false;
			}
			return true;
		}
	</script>
	<style>
		body {
			height: auto;
			width: 100%;
			background: url('../images/beijing.png') no-repeat center center fixed;
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
			background-size: cover;
			background-origin: content-box;
		}
		.all {
		}
		.landingBox {
			width: 470px;
			position: absolute;
			left: 56%;
			top: 50%;
			margin-top: -260px;
			height: 520px;
			background: url("../images/dneglukuangbeijing.png") no-repeat;
		}
		h2 {
			font-size: 34px;
			margin: 0;
		}
		.landingTitle {
			padding: 45px 0 20px 0;
		}
		.landingTitle>h2 {
			font-size: 32px !important;
			font-weight: 600 !important;
			text-align: center;
			color: #3fa0e6;
		}
		.landingInputGrounp {
			width: 72%;
			margin: 0 auto;
		}
		.landingInput {
			display: flex;
			border-bottom: 1px solid #aaacb2;
			padding-bottom: 10px;
			margin-top: 40px;
		}
		.landingInputIcon {
			margin-left: 10px;
			width: 24px;
			height: 24px;
			background: url("../images/yonghu.png") no-repeat;
		}
		.landingInputIcon1 {
			margin-left: 10px;
			width: 24px;
			height: 24px;
			background: url("../images/password.png") no-repeat;
		}
		.landingLeft {
			color: #999;
			font-size: 16px;
			display: flex;
			align-items: center;
		}
		.landingLeft>input {
			background: none !important;
		}
		.landingRight {
			color: #999;
			font-size: 16px;
		}
		.changeTrue {
			width: 16px;
			height: 16px;
			border: 2px solid #3fa0e6;
			margin-right: 6px;
		}
		.landingMiddle {
			width: 72%;
			margin: 0 auto;
			margin-top: 30px;
			display: flex;
			justify-content: space-between;
		}
		.langBoxButton {
			width: 72%;
			margin: 0 auto;
			background: #ffc52b;
			border-radius: 45px;
			height: 45px;
			color: white;
			margin-top: 40px;
			font-weight: 600;
			text-align: center;
			line-height: 45px;
			font-size: 16px;
		}
		.landingText>input {
			border: none !important;
			background: none !important;
			margin-left: 10px;
		}
		.landingText>input:focus {
			background: none !important;
			outline: 0 !important;
		}
		.AllTitle {
			display: flex;
			position: absolute;
			width: 100%;
			left: 8%;
			margin-top: 4%;
			z-index: 99999;
			height: 66px;
			align-items: center;
		}
		.AllTitleChild {
			background: url("../images/dadulogo.png") no-repeat center center;
			margin-right: 20px;
			width: 340px;
			height: 52px;
		}
		.BottomTitle {
			background-size: cover;
			position: absolute;
			margin-right: 20px;
			width: 400px;
			height: 43px;
			left: 50%;
			margin-left: -200px;
			bottom: 6%;
		}
		
		.AllTitle>h2 {
			font-size: 32px !important;
			font-weight: bold;
			letter-spacing: 6px;
			color: white !important;
		}
		.BottomTitle>a {
			text-align: center;
			font-size: 18px;
			letter-spacing: 2px;
			font-weight: 500;
			text-decoration: none;
			color: #e2f0fb;
		}
		a:hover {
			color: #043288
		}
</style>
</head>
<body onkeydown="keypress(event);">
	<div class="all">
		<div class="AllTitle">
			<div class="AllTitleChild"></div>
			<h2 >租赁管理服务平台</h2>
		</div>
		<div class="landingBox">
			<div class="landingTitle">
				<h2>用户登陆</h2>
			</div>
			<form method="post" action="">
				<div class="landingInputGrounp">
					<div class="landingInput">
						<input type="hidden" name="j_randomDigest" value="" />
						<div class="landingInputIcon"></div>
						<div class="landingText">
							<input type="text" name="j_username" id="phone" placeholder="请输入账号">
						</div>
					</div>
					<div class="landingInput">
						<div class="landingInputIcon1"></div>
						<div class="landingText">
							<input type="password" name="j_password" id="password" placeholder="请输入密码">
						</div>
					</div>
					<div style="margin:25px 0px 0px 5px; font-size:12px; color:red"><font id="errorMessage"/></div>
				</div>
				<div class="langBoxButton" onclick="doLogin();">登录</div>
			</form>
		</div>
      <div class="BottomTitle">
          <a href="http://www.risit.com.cn/">技术支持:    厦门中塔日升信息科技有限公司</a>
      </div>
	</div>
</body>
</html>