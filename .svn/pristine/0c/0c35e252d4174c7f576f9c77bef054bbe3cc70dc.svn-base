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
<title>塔式起重机安装检验报告</title>
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
</head>
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
<body>
	<center class="Noprint">
		<p align="right">
			<input type="button" id="btnPrint" style="font-size: 12px" value="直接打印" onclick="printf()" />
			 <input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)" />
		</p>
	</center>
	<center>
	<div class="main_detail">
			<div style="width:700px;padding-bottom:20px;border:1px solid #000;line-height:35px;">
				<div style="width:80%;">
					<p style="margin:50px 0 10px 0;letter-spacing:12px;font-size:40px;"><b>起租通知</b></p>
					<p style="font-size:20px;margin-top:5px;" align="left">${equipActivate.equipFlow.contractLease.paEntName}:</p>
						<p align="left" style="font-size:17px;">&nbsp;&nbsp;贵公司在
							<span style="text-decoration: underline; margin: 0px 0px 0px 0px">
								${equipActivate.equipFlow.contractLease.projectName}
							</span>
							工程项目租用我公司1台${equipActivate.equipFlow.equipDiary.equipGenericName}。
						</p>
					<p align="left" style="font-size:20px;">信息如下:</p>
					<table width="80%" border="1" cellspacing="0" cellpadding="0"   style="font-weight: normal;font-size:17px;">
						<tr>
							<td width="100px;" align="center">设备进场序号:</td>
							<td width="100px;" align="center">${equipActivate.equipFlow.equipInstall.approachNumber}</td>
						</tr>
						<tr>
							<td align="center">项目楼号:</td>
							<td align="center">${equipActivate.equipFlow.equipDiary.buildingNum}</td>
						</tr>
						<tr>
							<td align="center">设备型号:</td>
							<td align="center">${equipActivate.equipFlow.equipDiary.equipSpecificName}</td>
						</tr>
						<tr>
							<td align="center">设备进场日期:</td>
							<td align="center">${startinDate}</td>
						</tr>
						<tr>
							<td align="center">设备安装完成日期:</td>
							<td align="center">${endinDate}</td>
						</tr>
					</table>
					<p align="left" style="margin-top:30px;font-size:20px;">&nbsp;&nbsp;这台${equipActivate.equipFlow.equipDiary.equipGenericName}现经自检合格后正式交付使用，
					我公司从<b> ${activateDate}</b>起计算贵公司承租的这台${equipActivate.equipFlow.equipDiary.equipGenericName}租金。</p>
					<p align="left" style="font-size:20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;特此通知。</p>
					
					<p style="margin-top:30px;font-size:20px;" align="right">
						${equipActivate.equipFlow.equipDiary.propertyName}<br/>
						${providedDate}
					</p>
					
					<table border="1" cellspacing="0" cellpadding="0" style="width:100%;margin-top:15px;font-size:20px;" >
						<tr>
							<td width="50px;" align="center">反<br/>馈<br/>意<br/>见</td>
							<td>
								<div style="margin-top:60px;">
									&nbsp;签收人：（签章）<br/>
									&nbsp;签收日期：&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日
								</div>
							</td>
						</tr>
					</table>
				</div>
			<div style="margin-top:50px;">
			</div>
			</div>
		</div>
	</center>
</body>
</html>
