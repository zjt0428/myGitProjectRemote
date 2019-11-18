<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>建筑起重机械安装（拆卸）告知表</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<style media="print">
.Noprint {
	display: none;
}
</style>
<style>
.tdh {
	line-height: 28px;
	text-align: left;
	font-size: 14px;
	padding: 0px 0px 0px 0px;
}

.tabp {
	margin-top: 5px;
	border-color: #000000 #000000 #000000 #000000;
	border-style: solid;
	border-top-width: 1px;
	border-right-width: 2px;
	border-bottom-width: 2px;
	border-left-width: 1px;
}

.tdp {
	height: 36px;
	font-size: 14px;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
}
</style>
</head>

<body>
<center class="Noprint">
	<p align="right" class="mar_15">
		<object id="WebBrowser" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size:12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size:12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
	</p>
</center>

<center> 
<div class="main_detail">
  <div class="wrod_title">建筑起重机械安装告知表</div>
 <table border="0" width="630">
		<tbody><tr>
			<td class="tdh">__________________建设局：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>${equipInstall.equipFlow.contractLease.pbEntName}</u>
				单位（&nbsp;安装资质证书号：<u>B3174035040301</u>，资质等级：<u>三级</u>&nbsp;&nbsp;），拟定于 <u>&nbsp;<fmt:formatDate value="${equipInstall.startinDate}" type="date"/>&nbsp;</u>至
				<u>&nbsp;<fmt:formatDate value="${equipInstall.endinDate}" type="date"/>&nbsp;</u>，在本市（县）&nbsp;<u>${equipInstall.equipFlow.equipDiary.countyName} </u>&nbsp;区（乡、镇）&nbsp;<u>${equipInstall.equipFlow.equipDiary.projectName}</u>&nbsp;工程（工地），<input type="checkbox" checked="checked" disabled="disabled"/>
				安装 / <input type="checkbox" disabled="disabled"/>拆卸下列建筑起重设备（表一），现告知贵局，请予以监督，并提供经施工总承包单位、监理单位审核合格的以下资料（表二）：
			</td>
		</tr>
	</tbody></table>
	<font style="font-weight: bold; font-size: 14px">表一：拟安装（拆卸）建筑起重机清单</font><br>
	<table class="listtable" width="640" border="0" align="center" cellpadding="0" cellspacing="0">
		<tbody><tr>
			<th class="tdp">设备名称</th>
			<th class="tdp">规格型号</th>
			<th class="tdp">备案证号</th>
			<th class="tdp">本次安装高度(m)</th>
			<th class="tdp">安装现场负责人</th>
			<th class="tdp">联系电话</th>
		</tr>
		<tr height="25px">
			<td class="tdp" align="center">${equipInstall.equipFlow.equipDiary.equipGenericName}</td>
			<td class="tdp" align="center">${equipInstall.equipFlow.equipDiary.equipSpecificName}</td>
			<td class="tdp" align="center">${equipInstall.equipFlow.equipDiary.recordId}</td>
			<td class="tdp" align="center">${equipInstall.installHeight}</td>
			<td class="tdp" align="center">${equipInstall.principal}</td>
			<td class="tdp" align="center">${equipInstall.principalTel}</td>
		</tr>
	</tbody></table><br>
	<font style="font-weight: bold; font-size: 14px">表二：总承包单位、监理单位审核资料及审核意见</font><br>
	<table class="listtable" width="630" border="0" align="center" cellpadding="0" cellspacing="0">
		<tbody><tr>
			<th class="tdp" width="70%">审核资料</th>
			<th class="tdp">审核意见</th>
		</tr>
		<tr>
			<td class="tdp" rowspan="2" align="left" valign="top">
				<div style="margin-left: 10px; margin-right: 10px; line-height: 28px">
				    <input type="checkbox" name="checkbox" value="checkbox" /> 建筑起重机械备案证<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位资质证书、安装生产许可证副本<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位特种作业人员证书<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 经安拆单位技术负责人审核签字的建筑起重机械安装（拆卸）工程专项施工方案<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位与使用单位签订的安装（拆卸）合同及安全协议书<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位负责建筑起重机械安装（拆卸）工程的专职安全生产管理人员专业技术人员名单<br> 
					<input type="checkbox" name="checkbox" value="checkbox" />建筑起重机械安装（拆卸）工程生产安全事故应急救援方案<br> 
					<input type="checkbox" name="checkbox" value="checkbox" />辅助建筑起重机械资料及特种作业人员证书<br>
			  </div>
			</td>
			<td class="tdp" align="left">&nbsp;施工总承包单位审核意见：
				<div style="margin-top: 140px;" valign="bottom" align="right">
					<p style="margin-right: 50px">(盖章)</p>
					<p>年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;</p>
				</div>
			</td>
		</tr>
		<tr>
			<td class="tdp" align="left">&nbsp;监理单位审核意见：
				<div style="margin-top: 140px;" valign="bottom" align="right">
					<p style="margin-right: 50px">(盖章)</p>
					<p>年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;</p>
				</div>
			</td>
		</tr>
	</tbody></table>
	<table border="0" width="630">
		<tbody><tr>
			<td class="tdh" colspan="3">说明:本表由告知单位填写,一式二份（告知单位、登记机构各一份）</td>
		</tr>
		<tr>
			<td class="tdh" width="40%" height="30">告知单位（盖章）:</td>
			<td class="tdh" width="40%">登记机构接收人:</td>
			<td class="tdh" align="right">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;</td>
		</tr>
	</tbody></table>
	
	</div>
</center>
</body>
</html>
