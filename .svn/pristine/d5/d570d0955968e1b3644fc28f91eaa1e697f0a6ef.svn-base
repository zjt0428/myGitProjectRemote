<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>现场装车清单</title>
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
 .main_detail_0523{width:756.8px; margin:0 auto; height:260px; font-size:16px;position:relative;top:0px} 
</style>
</head>
<body>
<c:set var="countNumber" value="${fn:length(logisticsTransport.logisticsTrandetailSet)}" scope="application"></c:set>
<c:set var="count" value="${((fn:length(logisticsTransport.logisticsTrandetailSet))-(fn:length(logisticsTransport.logisticsTrandetailSet)%5))/5}" scope="application"></c:set>
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
	<c:if test="${(fn:length(logisticsTransport.logisticsTrandetailSet)!=0)&&(fn:length(logisticsTransport.logisticsTrandetailSet)%5==0)}">
		<c:set var="countNumber" value="${fn:length(logisticsTransport.logisticsTrandetailSet)-1}" scope="application"></c:set>
	</c:if>
	<c:forEach var="v" begin="0" end="${count}">	
	<font size=4px style="font-weight:bold;">广西建工大都租赁有限公司</font><br/>
	<font size=4px style="font-weight:bold">设备配件发货清单</font><br/>
	<table  width="100%" border="0" align="center" cellpadding="2" cellspacing="0"  >
		<tr >
			<td style="line-height: 28px;text-align:right;"><p style="text-indent: 2em">发货单号：${logisticsTransport.transportSerial}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第${v+1}页</p></td>
		</tr>
	</table>
	<table class="tabp" width="100%" border="0" align="center" cellpadding="1" cellspacing="0" >
		<c:if test="${v==0 }">
		<tr>
			<th class="tdp" width="10%">出库仓库:</th>
			<td class="tdc" width="10%">${logisticsTransport.deliveryEntName}</td>
			<th class="tdp" width="10%">发货时间:</th>
			<td class="tdc" width="15%">${logisticsTransport.deliveryDate}</td>
			<th class="tdp" width="10%">合同编号:</th>
			<td class="tdc" width="15%">${logisticsTransport.relateSerial}</td>
			<th class="tdp" width="10%">项目名称:</th>
			<td class="tdc" width="20%">${logisticsTransport.projectName}</td>
		</tr>
		<tr>
			<th class="tdp" width="10%">发货类型:</th>
			<td class="tdc" width="10%"></td>
			<th class="tdp" width="10%">调度单号:</th>
			<td class="tdc" width="15%"></td>
			<th class="tdp" width="10%">附属单号:</th>
			<td class="tdc" width="15%"></td>
			<th class="tdp" width="10%">项目地址:</th>
			<td class="tdc" width="20%">${logisticsTransport.address}</td>
		</tr>
		</c:if>
	</table>
	<table class="tabp" width="100%" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px" >
		<tr style="page-break-after:always">
			<td class="tdp">序号</td>
			<th class="tdp">配件类别</th>
			<th class="tdp">设备型号</th>
			<th class="tdp">生产厂家</th>
			<th class="tdp">配件名称</th>
			<th class="tdp">计量单位</th>
			<th class="tdp">实发数量</th>
			<th class="tdp" width="10%">备注</th>
		</tr>

<c:forEach var="element" items="${logisticsTransport.logisticsTrandetailSet}" varStatus="status" begin="${5*v}" end="${5*v+4 }">
			<tr>
				<td class="tdc" >${status.count}</td>
				<td class="tdc" >${element.dispatchCompon.component.componCategoryName}</td>
				<td class="tdc" >${element.dispatchCompon.component.componSpecificName}</td>
				<td class="tdc" >${element.dispatchCompon.component.equipVenderName}</td>
				<td class="tdc" >${element.dispatchCompon.component.componGenericName}</td>
				<td class="tdc" >${element.dispatchCompon.component.calculate}</td>
				<td class="tdc" >${element.counts}</td>
				<td class="tdc" border="1" >${element.remark}</td>
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
				<td class="tdc" >&nbsp;&nbsp;</td>
			</tr>
		</c:forEach>
		</c:if>
	</table>
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px" >
		<c:if test="${v==0 }">
		<tr>
			<td class="tda" >一联存根（白色黑字）&nbsp;二联核算留存（粉色）&nbsp;三联收发留存（黄色）&nbsp;四联承租单位（粉蓝）五联承运单位（粉绿）六联出门证（白色蓝字）</td>
		</tr>
		</c:if>
	</table>
	<table width="100%" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px" >
		<c:if test="${v==0 }">
		<tr>
			<td class="tda" style="border-top: 0 solid #000000;">&nbsp;承运单位：&nbsp;&nbsp;</td>
			<td class="tda" style="border-top: 0 solid #000000;">车辆牌号：&nbsp;</td>
			<td class="tda" style="border-top: 0 solid #000000;">承租单位：&nbsp;&nbsp;</td>
			<td class="tda" style="border-top: 0 solid #000000;">出库审批：&nbsp;</td>
			<td class="tda" style="border-top: 0 solid #000000;">收发审核：&nbsp;</td>
			<td class="tda" style="border-top: 0 solid #000000;">制单人</td>
			<td class="tda" style="border-top: 0 solid #000000;">${logisticsTransport.originator}</td>
		</tr>
		</c:if>
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