<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>采购申请表</title>
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
		<table class="tabp" width="100%" border="0" align="center" cellpadding="2" cellspacing="0" >
		<tr><h3 colspan="8">物资采购申请计划表</h3></tr>
		<tr style="border-bottom: 1px">
			<th class="tdp" colspan="2">申请部门</th>
			<td class="tdp" >${purchase.department.depName}</td>
			<th class="tdp">申请人</td>
			<td class="tdp" >${purchase.applicant}</td>
			<th class="tdp">日期</td>
			<td class="tdp" colspan="2">${purchase.providedDate}</td>
		</tr>
		<tr style="border-bottom: 1px">
			<th class="tdp" wigth="50px">编号</th>
			<th class="tdp">材料名称</th>
			<th class="tdp">规格型号</th>
			<th class="tdp">单位</th>
			<th class="tdp">数量</th>
			<th class="tdp">审批数量</th>
			<th class="tdp">限购日期</th>
			<th class="tdp">询价价格</th>
		</tr>
		<c:forEach var="element" items="${purchase.purchaseBriefSet}" varStatus="status" begin="${5*v}" end="${5*v+4 }">
			<tr>
				<td class="tdc" >${status.getIndex()+1}</td>
				<td class="tdc" >${element.briefName}</td>
				<td class="tdc" >${element.specific}</td>
				<td class="tdc" >${element.unit}</td>
				<td class="tdc" >${element.quantity}</td>
				<td class="tdc" ></td>
				<td class="tdc" ></td>
				<td class="tdc" >${element.unitPrice}</td>
			</tr>
		</c:forEach>
		<tr>
			<td class="tdc">备注</td>
			<td class="tdc"></td>
			<td class="tdc"></td>
			<td class="tdc"></td>
			<td class="tdc"></td>
			<td class="tdc"></td>
			<td class="tdc"></td>
			<td class="tdc"></td>
		</tr>
		<tr align="left">
			<th class="tdp" colspan="8">物资部门意见：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;负责人签字：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：</th>
		</tr>
		<tr align="left">
			<th class="tdp" colspan="8">生产副经理意见：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签字：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：</th>
		</tr>
		<tr align="left">
			<th class="tdp" colspan="8">公司总经理审批：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签字：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：</th>
		</tr>

	</table>
	</c:forEach>
</div>
</center>
</body>
</html>