<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>施工升降机设备出货清单</title>
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
<p style='text-align:center'><span class="wrod_title">${dispatch.deliveryEntName }</span></p>
<p style='text-align:center'><span class="wrod_title">设备出货清单</span></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-bottom:5px;padding-top:10px;">
  <tr>
    <td width="200" height="30" align="left">施工升降机：${dispatchEquip.equipment.recordId }</td>
	<td width="330" align="left">产权单位：${dispatchEquip.equipment.propertyName }</td>
	<td width="120" align="left">编号：${dispatchEquip.equipment.recordSerial }</td>
</table>
</p>
 
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0"  class="listtable">
  <tr>
    <td width="80" height="30">出货单位</td>
    <td width="248">&nbsp;${dispatch.deliveryEntName }</td>
    <td width="80" align="center">项目名称</td>
    <td>&nbsp;${dispatch.projectName }</td>
  </tr>
  <tr>
    <td height="30">出货地址</td>
    <td>&nbsp;${dispatch.deliveryAddress }</td>
    <td align="center">项目地址</td>
    <td>&nbsp;${dispatch.address }</td>
  </tr>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td align="center">项目负责人</td>
    <td>&nbsp;${dispatch.projectManager }</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="chqdtable" style="border-top-style:none;">
  <tr>
    <td width="30" align="center" bgcolor="#e0e0e0"><strong>序</strong></td>
    <td width="175" align="center" bgcolor="#e0e0e0"><strong>配件名称</strong></td>
    <td width="80" align="center" bgcolor="#e0e0e0"><strong>规格</strong></td>
    <td width="60" align="center" bgcolor="#e0e0e0"><strong>单位</strong></td>
    <td width="60" align="center" bgcolor="#e0e0e0"><strong>数量</strong></td>
    <td width="75" align="center" bgcolor="#e0e0e0"><strong>欠工地</strong></td>
    <td width="75" align="center" bgcolor="#e0e0e0"><strong>配货</strong></td>
    <td width="60" align="center" bgcolor="#e0e0e0"><strong>核对</strong></td>
    <td width="60" align="center" bgcolor="#e0e0e0"><strong>备注</strong></td>
  </tr>
  <c:forEach var="element" items="${dispatch.liftDispatchAllocateSet}" varStatus="status" >
  <tr>
    <td>&nbsp;${status.count}</td>
    <td>&nbsp;${element.componGenericName}</td>
    <td>&nbsp;</td>
    <td>&nbsp;${element.calculate}</td>
    <td>&nbsp;${element.quantity}</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;${element.remark}</td>
  </tr>
  </c:forEach>
  <tr>
    <td height="140" colspan="10">&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="30" align="left" width="33%">配货人：</td>
    <td align="left" width="34%">发货人：  </td>
    <td align="left" width="33%"><p>主管： </p></td>
  </tr>
  <tr>
    <td height="30" align="left">项目负责人：</td>
    <td colspan="2" align="right">  日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
</table>
</p>
</div>
</center>
</body>
</html>