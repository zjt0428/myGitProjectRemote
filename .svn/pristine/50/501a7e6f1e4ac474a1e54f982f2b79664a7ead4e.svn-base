<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>塔吊（自检表）</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_word.css" />
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<style media="print">
.Noprint {
	display: none;
}
.PageNext {
	page-break-after: always;
}
</style>
<style type="text/css">
<!--
.tdp {	height: 36px;
	font-size: 14px;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
}
-->
</style>
</head>
<body>
<center class="Noprint">
	<p align="right" class="mar_15">
		<object id="WebBrowser" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
<div class="main_detail">
<p style='text-align:center'><span class="wrod_title">${verifySelf.equipFlow.equipDiary.equipGenericName}安装质量自检合格验收表</span></p>
<br />
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="80" height="36">工程名称</td>
    <td width="235" align="left">&nbsp;${verifySelf.equipFlow.equipDiary.projectName}</td>
    <td width="80" >工程地址</td>
    <td align="left">&nbsp;${verifySelf.equipFlow.equipDiary.address}</td>
  </tr>
  <tr>
    <td height="36">设备型号</td>
    <td align="left">&nbsp;${verifySelf.equipFlow.equipDiary.equipSpecificName}</td>
    <td>IC卡编号</td>
    <td align="left">&nbsp;${verifySelf.equipFlow.equipDiary.recordId}</td>
  </tr>
  <tr>
    <td height="36">安装单位</td>
    <td align="left">&nbsp;${verifySelf.inEntName}</td>
    <td>使用单位</td>
    <td align="left">&nbsp;${verifySelf.equipFlow.contractLease.paEntName}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top-style:none;" class="jljc_table">
  <tr>
    <td width="20%" height="28" ><strong>名称</strong></td>
    <td width="5%"><strong>序</strong></td>
    <td width="60%"><strong>验 收 要 求</strong></td>
    <td width="15%"><strong>验收结果</strong></td>
  </tr>
  <c:set var="numk" value="0"></c:set>
  <c:forEach var="element" items="${verifyStandards}" varStatus="status" >
  <c:forEach var="standard" items="${element.value }" varStatus="standardstatus">
  <c:set var="numk" value="${numk+1}"></c:set>
  <tr>
    <c:if test="${standardstatus.count == 1 }">
	<td rowspan="${fn:length(element.value)}" align="center">&nbsp;${element.key}</td>
    </c:if>
    <td height="26"  align="center">${numk}</td>
    <td align="left">${standard.demandDes}</td>
    <td>&nbsp;${standard.standardResult}</td>
  </tr>
  </c:forEach>
  </c:forEach>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="40" align="left"><p>&nbsp;安装单位验收结论： </p></td>
  </tr>
   <tr>
    <td height="40" align="left"></td>
  </tr>
  <tr>
    <td height="30" align="left" >&nbsp;验收人员：</td>
  </tr>
  <tr>
    <td height="30" align="left">&nbsp;验收日期：</td>
  </tr>
</table>
</p>
</div>
</center>
</body>
</html>

