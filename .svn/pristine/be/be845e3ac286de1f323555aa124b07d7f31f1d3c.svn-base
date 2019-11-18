<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>采购单</title>
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
</style>
</head>
<body>
<center class="Noprint">
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
	<font size="5" style="font-weight: bold">&nbsp;${purchase.purCorpName}</font><br />
	<font size="5" style="font-weight: bold">设备及物品采购单</font><br /> <br />
	<table class="table-base" border="0" width="630">
		<tr>
			<td style="line-height: 28px;text-align:left;"><p style="text-indent: 2em">编号：&nbsp;${purchase.purchaseSerial}</p></td>
		</tr>
	</table>
	<table class="tabp" width="630" border="0" align="center" cellpadding="2" cellspacing="0">
		<tr>
			<th class="tdp" width="15%">供应商</th>
			<td class="tdc" colspan="2">&nbsp;${purchase.supplierName}</td>
			<th class="tdp" width="15%">联系人</th>
			<td class="tdc" width="20%">&nbsp;${purchase.linker}</td>
		</tr>
		<tr>
			<th class="tdp">办公电话</th>
			<td class="tdc" width="35%">&nbsp;${purchase.supplierTel}</td>
			<th class="tdp" width="15%">手机号码</th>
			<td class="tdc" colspan="2">&nbsp;${purchase.linkerTel}</td>
		</tr>
		<tr>
			<th class="tdp">采购单位</th>
			<td class="tdc" colspan="2">&nbsp;${purchase.purCorpName}</td>
			<th class="tdp">采购人</th>
			<td class="tdc">&nbsp;${purchase.purchaserName}</td>
		</tr>
		<tr>
			<th class="tdp">申请时间</th>
			<td class="tdc">&nbsp;${purchase.purchaseDate}</td>
			<th class="tdp">预计到货时间</th>
			<td class="tdc" colspan="2">&nbsp;${purchase.arrivalDate}</td>
		</tr>
		<tr>
			<th class="tdp">采购说明</th>
			<td class="tdc" colspan="4">&nbsp;${purchase.instruction}</td>
		</tr>
	</table>
	<table class="tabp" width="630" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="7">采购清单</th>
		</tr>
		<tr>
			<th class="tdp" width="25%">设备/零部件名称</th>
			<th class="tdp" width="7%">数量</th>
			<th class="tdp" width="8%">单位</th>
			<th class="tdp" width="20%">规格/型号</th>
			<th class="tdp" width="15%">单价（元）</th>
			<th class="tdp" width="15%">小计（元）</th>
			<th class="tdp" width="10%">备注</th>
		</tr>
		<c:forEach var="element" items="${purchase.purchaseBriefSet}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.briefName}</td>
			<td class="tdc">&nbsp;${element.quantity}</td>
			<td class="tdc">&nbsp;${element.unit}</td>
			<td class="tdc">&nbsp;${element.specific}</td>
			<td class="tdc">&nbsp;${element.unitPrice}</td>
			<td class="tdc">&nbsp;${element.summary}</td>
			<td class="tdc">&nbsp;</td>
		</tr>
		</c:forEach>
		<tr>
			<th class="tdp" width="25%">合计总额（元）</th>
			<td class="tdc" colspan="6">&nbsp;${purchase.purchaseAmount}</td>
		</tr>
	</table>
	<table class="tabp" width="630" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" width="20%" rowspan="${fn:length(purchase.instalmentSet)}">付款计划</th>
			<c:forEach var="element" items="${purchase.instalmentSet}" varStatus="status" begin="0" end="0">
				<td class="tdc" width="20%" >${element.payDate}</td>
				<th class="tdp" width="20%" >总额百分比</th>
				<td class="tdc" width="10%" >${element.payment/purchase.purchaseAmount} %</td>
				<th class="tdp" width="20%" >本次支付金额</th>
				<td class="tdc" width="10%" >${element.payment}</td>
			</c:forEach>
		</tr>
		<c:forEach var="element" items="${purchase.instalmentSet}" varStatus="status" begin="1">
		<tr>
			<td class="tdc" width="20%" >${element.payDate}</td>
			<th class="tdp" width="20%" >总额百分比</th>
			<td class="tdc" width="10%" >${element.payment/purchase.purchaseAmount} %</td>
			<th class="tdp" width="20%" >本次支付金额</th>
			<td class="tdc" width="10%" >${element.payment}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="630" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" width="15%">采购单位签章</th>
			<td class="tdc" width="35%">
				<div style="margin: 55px 5px 5px 55px" align="left">代表签字</div>
                <div style="margin: 25px 5px 5px 5px;" valign="bottom" align="right">
                    年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日
                </div>
			</td>
			<th class="tdp" width="15%">供应商签章</th>
			<td class="tdc" width="35%">
				<div style="margin: 55px 5px 5px 55px" align="left">代表签字</div>
                <div style="margin: 25px 5px 5px 5px;" valign="bottom" align="right">
                    年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日
                </div>
			</td>
		</tr>
		<tr>
			<th class="tdp">备注</th>
			<td class="tdc" colspan="3"><p style="margin: 5px 5px 5px 5px" align="left">1.本设备及物品采购单经双方签字或盖章后生效，传真或复印件具有同等法律效应。</br>2.因本借用产生的纠纷，任一方可向本单位工商注册地所属人民法院起诉。</p></td>
		</tr>
	</table>
</center>
</body>
</html>