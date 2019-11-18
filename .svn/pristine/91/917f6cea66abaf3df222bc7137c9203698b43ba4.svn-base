<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.lang.Math" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>物资领用出库单</title>
<style media=print>
.Noprint {
	display: none;
}

.PageNext {
	page-break-after: always;
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
	height: 28px;
	font-size: 14px;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
}

.tda {
	height: 28px;
	font-size: 14px;
	border-bottom: 0 solid #000000;
	border-left: 0 solid #000000;
	border-right: 0 solid #000000;
	border-top: 0 solid #000000;
}

.tdc {
	height: 28px;
	font-size: 14px;
	text-align: center;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
}

.ftdp {
	height: 60px;
	font-weight: bold;
	font-size: 30px;
}

.main_detail_0523{width:720px; margin:0px 1px; height:260px; font-size:16px;}
</style>

</head>
<body>

<c:set var="countNumber" value="${fn:length(pickup.pickupComponentSet)}" scope="application"></c:set>
<c:set var="count" value="${((fn:length(pickup.pickupComponentSet))-(fn:length(pickup.pickupComponentSet)%5))/5}" scope="application"></c:set>
<center class="Noprint">
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
<!-- <br/> -->

<div class="main_detail_0523">
	<c:if test="${countNumber%5==0&&countNumber!=0}">
		<c:set var="count" value="${count-1}" scope="application"></c:set>
		</c:if>
	<c:if test="${(fn:length(pickup.pickupComponentSet)!=0)&&(fn:length(pickup.pickupComponentSet)%5==0)}">
		<c:set var="countNumber" value="${fn:length(pickup.pickupComponentSet)-1}" scope="application"></c:set>
		</c:if>
		<c:forEach var="v" begin="0" end="${count}">
	<font size=6px style="font-weight:bold;">物资领用出库单</font>
		<%-- <c:if test="${fn:length(pickup.pickupComponentSet)>5}"> --%>
	
		
		
		

	<table width="100%" border="0" align="center" cellpadding="2" cellspacing="0"  >
		<tr >
			<td width="15%">单位名称 :</th>
			<td width="30%">&nbsp;${CorpName}</td>
			<td width="15%">领用日期 :</th>
			<td width="40%">&nbsp;${pickup.pickupDate}</td>
		</tr>
	</table>
	<table width="100%" class="tabp"  border="0" align="center" cellpadding="2" cellspacing="0">
		<tr>
			<th class="tdp" >领用单位</th>
			<td class="tdc">&nbsp;${pickup.recipientsDepName}</td>
			<th class="tdp" >领用单号</th>
			<td class="tdc" colspan="3">&nbsp;${pickup.pickupSerial}</td>
		</tr>
		<tr>
			<th class="tdp" width="15%">项目名称</th>
			<td class="tdc" width="25%">&nbsp;${pickup.projectName}</td>
			<th class="tdp" width="15%">塔机型号</th>
			<td class="tdc" width="15%">&nbsp;${pickup.equipment.equipSpecificName }</td>
			<th class="tdp" width="15%">出厂编号</th>
			<td class="tdc" width="15%">&nbsp;${pickup.equipment.exwSerial }</td>
		</tr>
	</table>
	<table width="100%" class="tabp"  border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr style="border-bottom: 1px">
			<th class="tdp">名称</th>
			<th class="tdp">规格型号</th>
			<th class="tdp">单位</th>
			<th class="tdp">领用数量</th>
			<th class="tdp">单价</th>
			<th class="tdp">金额</th>
			<th class="tdp">备注&nbsp;&nbsp;&nbsp;</th>
		</tr>
		<!--原来程序  -->
	<%-- 	<c:forEach var="element" items="${pickup.pickupComponentSet}" varStatus="status">
			<tr>
				<td class="tdc">&nbsp;${element.componGenericName}</td>
				<td class="tdc">&nbsp;&nbsp;&nbsp;&nbsp;${element.dimensions}</td>
				<td class="tdc">&nbsp;${element.unit}</td>
				<td class="tdc">&nbsp;&nbsp;${element.quantity}</td>
				<td class="tdc">&nbsp;&nbsp;${element.unitPrice}</td>
				<td class="tdc">&nbsp;&nbsp;${element.summary}</td>
				<td class="tdc">&nbsp;&nbsp;${element.remark}</td>
			</tr>
		</c:forEach> --%>
			<c:forEach var="element" items="${pickup.pickupComponentSet}" varStatus="status" begin="${5*v}" end="${5*v+4 }">
			<tr>
				<td class="tdc">&nbsp;${element.componGenericName}</td>
				<td class="tdc">&nbsp;&nbsp;&nbsp;&nbsp;${element.dimensions}</td>
				<td class="tdc">&nbsp;${element.unit}</td>
				<td class="tdc">&nbsp;&nbsp;${element.quantity}</td>
				<td class="tdc">&nbsp;&nbsp;${element.unitPrice}</td>
				<td class="tdc">&nbsp;&nbsp;${element.summary}</td>
				<td class="tdc">&nbsp;&nbsp;${element.remark}</td>
			</tr>
		</c:forEach>
			<c:if test="${(countNumber-5*v)<4}">
		<c:forEach var="vi" begin="${countNumber+1}" end="${5*v+5}">
			<tr>
				<td class="tdc" >&nbsp;&nbsp;</td>
				<td class="tdc" >&nbsp;&nbsp;</td>
				<td class="tdc" >&nbsp;&nbsp;</td>
				<td class="tdc" >&nbsp;&nbsp;</td>
				<td class="tdc" >&nbsp;&nbsp;</td>
				<td class="tdc" >&nbsp;&nbsp;</td>
				<td class="tdc" >&nbsp;&nbsp;</td>
			</tr>
		</c:forEach>
		</c:if>
		<c:if test="${(countNumber-5*v)<5 }">
		<tr>
			<th class="tdp">合计</th>
			<td class="tdc" colspan="3">&nbsp;${SUMMARY }</td>
			<td class="tdc" colspan="3">&nbsp;${summary }</td>
		</tr>
		</c:if>
	</table>
	<table  width="100%" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px" >
		<tr>
			<td class="tda">&nbsp;负责人：&nbsp;&nbsp;</td>
			<td class="tda">开票人：&nbsp;${pickup.userName}</td>
			<td class="tda">发料人：&nbsp;&nbsp;</td>
			<td class="tda">领用人：&nbsp;&nbsp;</td>
		</tr>
		<tr><td>&nbsp;&nbsp;</td></tr>
		<tr><td>&nbsp;&nbsp;</td></tr>
	
<br/>
	</table>
<!-- 	<hr align="center" width="90%" size="1" noshade class="NOPRINT"> -->
<c:if test="${(countNumber-5*v)>4 }">
<!-- <div class="PageNext"></div> --><br/><br/><br/><br/>
</c:if>
			</c:forEach>
	<%-- 	</c:if> --%>
</div>
</center>
</body>
</html>