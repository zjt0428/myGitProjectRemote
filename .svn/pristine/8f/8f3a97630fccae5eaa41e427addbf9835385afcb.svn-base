<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<title>租金结算清单</title>
<style media=print>
.Noprint {
	display: none;
}
</style>
</head>
<body>
<center class="Noprint">
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size:12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size:12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size:12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
<div class="main_detail">
<p style='text-align:center'><span class="wrod_title">经营性租赁业务申请表</span></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td width="80" height="36" align="right"><p>申请日期：${contractArrange.providedDate}</p></td>
		<td align="left">&nbsp;</td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table">
	<tr>
		<td width="80" height="28">业务申请编号</td>
		<td width="220">&nbsp;${contractArrange.arrangeSerial}</td>
		<td width="80">所属省市 </td>
		<td>&nbsp;${contractArrange.provinceName}</td>
	</tr>
	<tr>
		<td height="28">承租单位</td>
		<td>&nbsp;${contractArrange.customerName}</td>
		<td>客户地址 </td>
		<td>&nbsp;${contractArrange.customerAddress}</td>
	</tr>
	<tr>
		<td height="28">客户联系人</td>
		<td>&nbsp;${contractArrange.linker}</td>
		<td>联系电话 </td>
		<td>&nbsp;${contractArrange.linkerTel}</td>
	</tr>
	<tr>
		<td height="28">所属公司</td>
		<td>&nbsp;${contractArrange.corpName}</td>
		<td>公司负责人</td>
		<td>&nbsp;${contractArrange.dutyman}</td>
	</tr>
	<tr>
		<td height="28">联系方式</td>
		<td>&nbsp;--</td>
		<td>&nbsp;</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td height="28">项目名称</td>
		<td colspan="3">&nbsp;${contractArrange.projectName}</td>
		</tr>
	<tr>
		<td height="28">项目地址</td>
		<td colspan="3">&nbsp;${contractArrange.projectAddress}</td>
		</tr>
	<tr>
		<td height="28">项目工期</td>
		<td>&nbsp;${contractArrange.projectTimeLimit}</td>
		<td>建筑物<br />高度（米）</td>
		<td>&nbsp;${contractArrange.overallHeight}</td>
	</tr>
	<tr>
		<td height="28">工程现状</td>
		<td>&nbsp;${contractArrange.projectStatus}</td>
		<td>预计进场时间</td>
		<td>&nbsp;${contractArrange.startDate}</td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table" style="border-top-style:none;">
	<tr>
		<td	height="28">设备名称</td>
		<td>生产厂家</td>
		<td>设备型号</td>
		<td>数量<br />（台）</td>
		<td>满足高<br />度（米）</td>
		<td>月租费<br />（元/台）</td>
		<td>进退场费<br />（元/台）</td>
		<td>基础预埋<br />件（元/套）</td>
		<td>结算<br />方式</td>
	</tr>
	<c:forEach var="element" items="${contractArrange.contractArrangeEquipmentSet}" varStatus="status">
	<tr>
		<td height="28">&nbsp;${element.equipGenericName}</td>
		<td>&nbsp;${element.equipVender}</td>
		<td>&nbsp;${element.equipSpecificName}</td>
		<%--<td>&nbsp;${element.quantity}</td>--%>
		<td>&nbsp;--</td>
		<td>&nbsp;${element.overallHeight}</td>
		<td>&nbsp;--</td>
		<%--<td>&nbsp;${element.appearanceCost}</td>--%>
		<%--<td>&nbsp;${element.embeddedCost}</td>--%>
		<%--<td>&nbsp;${element.settleMethod}</td>--%>
	</tr>
	</c:forEach>
	<tr>
		<td colspan="9"	height="36" align="left"><strong>郑重承诺：本人对以上所填内容的真实性负责，否则，承担由此给公司造成的一切损失。</strong></td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
	<tr>
		<td align="center">项目经理签字：  <br />
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
		<td align="center">  营销公司领导签字：<br />
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
	</tr>
</table>
</div>
</center>
</body>
</html>