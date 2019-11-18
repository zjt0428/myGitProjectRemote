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
<title>建机租赁运营管理平台</title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/ext3.4/resources/css/ext-all.css" />
<link href="css/a8_login.css" rel="stylesheet" type="text/css" />
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
<script type="text/javascript"
	src="<%=request.getContextPath()%>/ext3.4/adapter/ext/ext-base.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/ext3.4/ext-all.gzjs"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/ext3.4/ext-lang-zh_CN.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/ext3.4/ext-basex.gzjs"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/core/md5.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/core/base64.js"></script>
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
</head>
<body onkeydown="keypress(event);">
	<div class="top_box">
		<div class="login_main">
			<div class="top_title">
				<img src="images/zt_title.gif" />
			</div>
			<div class="top_title_right">
				<img src="images/zt_title_right.gif" />
			</div>
		</div>
	</div>

	<div class="login_bg">
		<div class="login_main">
			<div class="login_maintu">&nbsp;</div>
			<div class="login_main_right">
				<div class="login_table_box">
				<form method="post" action="">
						<input type="hidden" name="j_randomDigest" value=""/>
					<table width="100%" border="0" cellspacing="0" cellpadding="0"
						style="line-height: 45px;">
						<tr>
							<td width="42">&nbsp;</td>
							<td><input type="text" name="j_username" /></td>
						</tr>
						<tr>
							<td style="line-height: 56px;">&nbsp;</td>
							<td><input type="password" name="j_password" /></td>
						</tr>
						<tr>
							<td colspan="2" style="padding-left: 4px; padding-top: 5px;">
							<img style="cursor:pointer;" src="images/zt_but.gif" width="267" height="39" onclick="doLogin();"/></td>
						</tr>
						<tr>
							<td colspan="2" style="line-height: 24px;">
								<div class="code_box">
									<span><img src="images/android.gif" /></span><br /> <span
										class="code_word">移动端(安卓版)</span>
								</div>

								<div class="code_box" style="padding-left: 0px;">
									<span><img src="images/ios.gif" /></span><br /> <span
										class="code_word">移动端(IOS版)</span>
								</div>
							</td>
						</tr>
					</table>
					</form>
				</div>
				<div style="margin:25px 0px 0px 5px; font-size:12px; color:red"><font id="errorMessage"/></div>
			</div>
		</div>
	</div>

	<div class="bottom_box">
		<div class="login_main">
			<div class="bottom_word">

				<span>版权所有及技术支持：</span> <span><img src="images/zt_login.gif" /></span>
				<span>| 全国咨询服务热线：400 9988 621 | <a
					href="http://www.risit.com.cn/" target="_blank">
						http://www.risit.com.cn/ </a>
				</span>
			</div>
		</div>
	</div>


</body>
</html>
