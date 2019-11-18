<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>安装前检查表</title>
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
  <div class="wrod_title">${indisPrecheck.equipment.equipGenericName}拆卸前检查表</div>
  <p>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="75" height="32" align="center">产权单位</td>
    <td width="140">${indisPrecheck.equipment.propertyName}</td>
    <td align="center" width="90">备案登记号</td>
    <td colspan="2" width="150">${indisPrecheck.equipment.recordId}</td>
    <td width="50"><p align="center">工程<br />项目</td>
    <td width="120">${indisPrecheck.project.projectName}</td>
  </tr>
  <tr>
    <td height="32" align="center">生产厂家</td>
    <td>${indisPrecheck.equipment.equipVender}</td>
    <td align="center">规格型号</td>
    <td width="100">${indisPrecheck.equipment.equipSpecificName}</td>
    <td  align="center" width="50">安装<br />单位</td>
    <td colspan="2">${indisPrecheck.inEntName}</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td width="10%" align="center" height="32">序号</td>
    <td width="20%" align="center">项 目</td>
    <td align="center">检 查 要 求</td>
    <td width="20%" align="center">检查记录</td>
  </tr>
  <c:forEach var="element" items="${indisPrecheck.verifyStandardSet}" varStatus="status" >
  <tr>
    <td align="center" height="32">${status.count}</td>
    <td align="center">${element.itemName}</td>
    <td>${element.demandDes}</td>
    <td>${element.standardResult}</td>
  </tr>
  </c:forEach>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td width="150" rowspan="2" align="center">安装单位人员</td>
    <td style="padding:20px 10px;">现场安装负责人（签字）：</td>
    <td width="240" style="border-left-style:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
  <tr>
    <td style="padding:20px 10px;">检查人员（签字）：</td>
    <td style="border-left-style:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td style="padding:20pt 0;"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td colspan="4">检查结论:</td>
        </tr>
      <tr>
        <td width="300">安装单位技术负责人（签字）：</td>
        <td>&nbsp;</td>
        <td width="100">（盖章）</td>
        <td width="240">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
      </tr>
    </table></td>
  </tr>
</table>
</p>
</div>
</center>
</body>
</html>
