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
				window.location.href = __ctxPath + "/login/entry.html";
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
</head>
<body onkeydown="keypress(event);">
    <div class="head">
        <div class="container">
     	   <div class="logo" ><img width="60px" height="40px" src="../images/logo.jpg" /></div>
            <span class="name">广 西 大 都 租 赁 管 理 服 务 平 台</span>
        </div>
    </div>
    <div class="focusMap">
        <div class="container">
            <div class="loginBox">
                <div class="title">用户登录</div>
                <form method="post" action="">
                	<input type="hidden" name="j_randomDigest" value=""/>
                    <div class="line name">
                        <span class="icon-name"></span>
                        <input type="text" name="j_username" placeholder="用户名">
                    </div>
                    <div class="line">
                        <span class="icon-pw"></span>
                        <input type="password" name="j_password" placeholder="密码">
                    </div>
                    <div style="margin:25px 0px 0px 5px; font-size:12px; color:red"><font id="errorMessage"/></div>
                    <button class="line submit" type="button" onclick="doLogin();">登录</button>
                    <!-- <div class="hint">企业用户首次登录：<a class="download" href="javascript:;">驱动下载</a></div> -->
                </form>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="container">技术支持：<a href="http://www.risit.com.cn/" style="color:white">日升建机信息科技有限公司</a>　　全国咨询服务热线：400 630 5658</div>
    </div>
</body>
</html>