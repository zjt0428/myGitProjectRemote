<%@ page import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>


<%
	request.setCharacterEncoding("utf-8");
	String basePath = request.getContextPath();
	Map map = new HashMap();
	map = (Map) request.getAttribute("STANDARDMAP");
	Map map1 = new HashMap();
	map1 = (Map) request.getAttribute("STANDARDMAP1");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>起重机械租赁使用报停通知单</title>
<script src="http://localhost:18000/CLodopfuncs.js?priority=0"></script>
<script src="http://localhost:8000/CLodopfuncs.js?priority=1"></script>
<script type="text/javascript" src="<%=basePath%>/ext3.4/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3.4/ext-all.gzjs"></script>
<script type="text/javascript" src="<%=basePath%>/ext3.4/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3.4/ext-basex.gzjs"></script>
<script type="text/javascript" src="<%=basePath%>/pages/verify/js/autoStyle.js"></script>
<link href="<%=basePath%>/pages/verify/css/style_jn_table.css" rel="stylesheet" type="text/css" />

<style media="print">
.Noprint {
	display: none;
}
.PageNext {
	page-break-after: always;
}
</style>

<style type="text/css">
body, td, th {
	color: #000000;
	font-family: "宋体";
}

.wrod_title {
	font-size: 22px;
}

.botton_line {
	border-bottom: #000000 1px solid;
	padding-left: 5px;
	font-size: 18px;
	font-weight: normal;
	line-height: 20px;
}

.word_bottom {
	vertical-align: text-bottom;
	height: 22px;
}

.mar_15 {
	margin-top: 15px;
	margin-right: 20px;
	width: 660px;
	text-align: right;
}

.bgbh_word {
	font-size: 16px;
	width: 650px
}
</style>
<script language="javascript" src="<%=basePath%>/js/print/jquery.min.js"></script>
<script language="javascript" src="<%=basePath%>/js/print/qrcode.min.js"></script>
<script>
	function pagesetup_null() {
		var hkey_root, hkey_path, hkey_key;
		hkey_root = "HKEY_CURRENT_USER";
		hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
		try {
			var RegWsh = new ActiveXObject("WScript.Shell");
			hkey_key = "header";
			RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
			hkey_key = "footer";
			RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
		} catch (e) {
		}
	}

	function printf() {
		var explorer = window.navigator.userAgent;
		/* if (explorer.indexOf("MSIE") >= 0) {
		    pagesetup_null();
		} */
		window.print();
	}

	function closeWin() {
		window.open("", "_self").close();
	}

	Ext.onReady(function() {
		var wtEntName = document.getElementById("v_t_wtEntName");
		if (wtEntName.innerHTML.length > 19) {
			changFirstPageStyle(wtEntName);
		}
		var inEntName = document.getElementById("v_t_inEntName");
		if (inEntName.innerHTML.length > 19) {
			changFirstPageStyle(inEntName);
		}
	});
</script>
</head>

<body>
	<center class="Noprint">
		<p align="right">
			<input type="button" id="btnPrint" style="font-size: 12px" value="直接打印" onclick="printf()" /> <input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)" />
		</p>
	</center>
	<center>
	<div class="main_detail">
			<div style="width: 400px; padding-bottom:40px;">
				<div style="width:100%;">
					<p style="margin:80px 0 30px 0;letter-spacing:1px;font-size:28px;"><b>起重机械租赁使用报停通知单</b></p>
					<table width="100%" border="1" cellspacing="0" cellpadding="0"   style="font-weight: normal;font-size:17px;">
						<tr>
							<td width="100px;" align="left" colspan="4" height="40px;"><b>报停单号:</b></td>
						</tr>
						<tr>
							<td align="center" width="100px" height="40px;"><b>设备名称</b></td>
							<td align="left" width="220px;"></td>
							<td align="center" width="100px"><b>备案编号</b></td>
							<td align="left"></td>
						</tr>
						<tr>
							<td align="center" width="100px" height="40px;"><b>出厂编号</b></td>
							<td align="left"></td>
							<td align="center" width="100px"><b>项目名称</b></td>
							<td align="left"></td>
						</tr>
						<tr>
							<td align="center" width="100px" height="60px;"><b>项目地点</b></td>
							<td align="left"></td>
							<td align="center" width="100px"><b>使用单位</b></td>
							<td align="left"></td>
						</tr>
						<tr>
							<td align="center" width="100px" height="40px;"><b>启用日期</b></td>
							<td align="left"></td>
							<td align="center" width="100px"><b>报停日期</b></td>
							<td align="left"></td>
						</tr>
						<tr>
							<td align="center" width="100px" height="40px;"><b>备注</b></td>
							<td align="center" colspan="3"></td>
						</tr>
						<tr>
							<td colspan="2">
									<div style="margin:15px;">
										<div>出租单位</div>
										<div style="margin-top:10px;">（盖章）</div>
										<div style="margin-top:85px;">经办人</div>
										<div style="margin-top:10px;margin-left:200px;"> 年<span style="margin-left:20px;">月</span><span style="margin-left:20px;">日</span> </div>
									</div>
							</td>
							<td colspan="2">
									<div style="margin:15px;">
										<div>承租单位</div>
										<div style="margin-top:10px;">（盖章）</div>
										<div style="margin-top:85px;">经办人</div>
										<div style="margin-top:10px;margin-left:200px;"> 年<span style="margin-left:20px;">月</span><span style="margin-left:20px;">日</span>
										</div>
									</div>
							</td>
						</tr>
						<tr>
							<td colspan="4" height="60px;"> 说明:该设备于<span style="color:red;">2019年01月16日08时</span>（报停日期）使用报停。本通知单经出租单位、承租单位签章后生效，具有法律效应。 </td>
						</tr>
					</table>
					<div style="margin-top: 130px;"></div>
				</div>
			</div>
		</div>
	</center>
</body>
</html>
