<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>物资验收单</title>
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
	border-left: 1px solid #000000;
	border-right: 0 solid #000000;
	border-top: 1px solid #000000;
}
/* .main_detail_0523 tr {
	height: 28px;
	font-size: 14px;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
} */


.tda {
	height: 28px;
	font-size: 14px;
	border-bottom: 0 solid #000000;
	border-left: 0 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1px solid #000000;
}

.tdc {
	height: 28px;
	font-size: 14px;
	text-align: center;
	border-bottom: 0 solid #000000;
	border-left: 1px solid #000000;
	border-right: 0 solid #000000;
	border-top: 1px solid #000000;
}
/* .main_detail_0523 td {
	height: 28px;
	font-size: 14px;
	text-align: center;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
} */


.ftdp {
	height: 60px;
	font-weight: bold;
	font-size: 30px;
}

/*  .main_detail_0523{width:900px; margin:0 auto; height:2286px; font-size:16px;}  */
 .main_detail_0523{width:674.8px; margin:0 auto; height:260px; font-size:16px;position:relative;top:0px} 
</style>
</head>
<body>
<c:set var="countNumber" value="${fn:length(purchase.purchaseBriefSet)}" scope="application"></c:set>
<c:set var="count" value="${((fn:length(purchase.purchaseBriefSet))-(fn:length(purchase.purchaseBriefSet)%5))/5}" scope="application"></c:set>
<center class="Noprint">
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
<div class="main_detail_0523">
	<c:if test="${countNumber%5==0&&countNumber!=0}">
		<c:set var="count" value="${count-1}" scope="application"></c:set>
		</c:if>
	<c:if test="${(fn:length(purchase.purchaseBriefSet)!=0)&&(fn:length(purchase.purchaseBriefSet)%5==0)}">
		<c:set var="countNumber" value="${fn:length(purchase.purchaseBriefSet)-1}" scope="application"></c:set>
		</c:if>
		<c:forEach var="v" begin="0" end="${count}">
	<font size=4px style="font-weight:bold;">物资验收单</font>
	<table  width="100%" border="0" align="center" cellpadding="2" cellspacing="0"  >
		<tr >
			<td width="15%">验收部门 :</th>
			<td width="55%">&nbsp;${CorpName}</td>
			<td width="15%">验收时间 ：</th>
			<td width="15%">&nbsp;${purchase.accDate}</td>
		</tr>
	</table>
	<table class="tabp" width="100%" border="0" align="center" cellpadding="2" cellspacing="0" >
		<tr>
			<th class="tdp">验收单号</th>
			<td class="tdc" colspan="3">&nbsp;${purchase.purchaseSerial}</td>
		</tr>
		<tr>
			<th class="tdp" width="15%">供货商</th>
			<td class="tdc" width="35%">&nbsp;${purchase.supplierName}</td>
			<th class="tdp" width="15%">采购单位</th>
			<td class="tdc" width="35%">&nbsp;${purchase.purCorpName}</td>
		</tr>
		<tr>
			<th class="tdp" width="15%">交验说明</th>
			<td class="tdc" colspan="3">&nbsp;${purchase.instruction}</td>
		</tr>
	</table>
	<table class="tabp" width="100%" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px" >
		<tr style="border-bottom: 1px">
			<th class="tdp">物资名称</th>
			<th class="tdp">零配件类别</th>
			<th class="tdp">配件型号</th>
			<th class="tdp">计量单位</th>
			<th class="tdp">采购数量</th>
			<th class="tdp">采购单价</th>
			<th class="tdp">采购金额</th>
		</tr>

<%-- 		<c:forEach var="element" items="${purchase.purchaseBriefSet}" varStatus="status"> --%>
<c:forEach var="element" items="${purchase.purchaseBriefSet}" varStatus="status" begin="${5*v}" end="${5*v+4 }">
			<tr>
				<td class="tdc" >&nbsp;&nbsp;${element.briefName}</td>
				<td class="tdc" >&nbsp;&nbsp;${element.partsCategory}</td>
				<td class="tdc" >&nbsp;&nbsp;${element.dimensions}</td>
				<td class="tdc" >&nbsp;&nbsp;${element.unit}</td>
				<td class="tdc" >&nbsp;&nbsp;${element.quantity}</td>
				<td class="tdc" >&nbsp;&nbsp;${element.unitPrice}</td>
				<td class="tdc" >&nbsp;&nbsp;${element.summary}</td>
			</tr>
		</c:forEach>
	<%-- 	<c:if test="${fn:length(purchase.purchaseBriefSet)<5}">
		<c:forEach var="v" begin="${fn:length(purchase.purchaseBriefSet)+1}" end="5"> --%>
					<c:if test="${(countNumber-5*v)<4}">
		<c:forEach var="vi" begin="${countNumber+2}" end="${5*v+4}">
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
			<th class="tdp" >合计</th>
			<td class="tdc" colspan="3">&nbsp;${SUMMARY }</td>
			<td class="tdc" colspan="7">&nbsp;${summary }</td>
		</tr>
		</c:if>
	</table>
	<table width="100%" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px" >
		<tr>
			<td class="tda" >&nbsp;物资负责人：&nbsp;&nbsp;</td>
			<td class="tda">验收人：&nbsp;&nbsp;</td>
			<td class="tda">保管人：&nbsp;&nbsp;</td>
			<td class="tda">经办人：&nbsp;&nbsp;</td>
		</tr>
		<tr><td>&nbsp;&nbsp;</td></tr>
	</table>
	<c:if test="${(countNumber-5*v)>4 }">
<!-- <div class="PageNext"></div> --><br/><br/>
</c:if>
	<br/>
	</c:forEach>

</div>
</center>
</body>
</html>