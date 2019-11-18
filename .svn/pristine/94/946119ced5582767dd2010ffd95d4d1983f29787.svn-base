<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>隐患整改及复查结果登记表</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<style media="print">
.Noprint {
	display: none;
	
}
.PageNext {
	page-break-after: always;
}
</style>
</head>

<body>
<center class="Noprint">
	<p align="right" class="mar_15">
		<object id="WebBrowser" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
	</p>
</center>

<center>
<div class="main_detail">
 <div class="wrod_title">隐患整改及复查结果登记表</div>
 
 <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
<td width="340" height="36" align="left">施工企业：<strong>${project.unCustomName}</strong></td>
    <td width="300" align="left">工程名称：<strong>&nbsp;${project.projectName}</strong></td>
  </tr>
</table>

<p align="left">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="zgtable">
  <tr>
    <td width="15%" height="32" align="center">下达通知日期</td>
    <td align="center" width="12%">通知编号</td>
    <td align="center" width="20%">主要内容</td>
    <td align="center" width="15%">被通知单位</td>
    <td align="center" width="24%">复查时间及结果</td>
    <td align="center">整改负责人</td>
  </tr>
  <c:forEach var="element" items="${risks}" varStatus="status" >
  <tr>
    <td height="32" align="center">${element.checkDate}</td>
    <td align="center">${element.riskSerial}</td>
    <td align="center">${element.riskTheme}</td>
    <td align="center">${element.checkDepartment}</td>
    <td align="center">${element.reviewDate}</td>
    <td align="center">${element.improvePerson}</td>
  </tr>
  </c:forEach>
  <tr>
    <td height="32">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
  <tr>
    <td width="180">填表人（签字）：</td>
	<td width="460">&nbsp;</td>
    <td width="100">日期：</td>
    <td align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</td>
  </tr>
</table>
</p>
</div>
</center>
</body>
</html>
