<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>借用单</title>
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
	<font size="5" style="font-weight: bold">${borrow.outrelateName}</font><br />
	<font size="5" style="font-weight: bold">设备及物品借用单</font><br /> <br />
	<table class="table-base" border="0" width="630">
		<tr>
			<td style="line-height: 28px;text-align:left;"><p style="text-indent: 2em">编号：${borrow.borrowSerial}</p></td>
		</tr>
	</table>
	<table class="tabp" width="630" border="0" align="center" cellpadding="2" cellspacing="0">
		<tr>
			<th class="tdp" width="15%">借用单位</th>
			<td class="tdc" colspan="2">&nbsp;${borrow.inrelateName}</td>
			<th class="tdp" width="15%">借用经办人</th>
			<td class="tdc" width="20%">&nbsp;${borrow.inHandler}</td>
		</tr>
		<tr>
			<th class="tdp">办公电话</th>
			<td class="tdc" width="35%">&nbsp;${borrow.inOfficeTel}</td>
			<th class="tdp" width="15%">手机号码</th>
			<td class="tdc" colspan="2">&nbsp;${borrow.inPhone}</td>
		</tr>
		<tr>
			<th class="tdp">借出单位</th>
			<td class="tdc" colspan="2">&nbsp;${borrow.outrelateName}</td>
			<th class="tdp">借出经办人</th>
			<td class="tdc">&nbsp;${borrow.outHandler}</td>
		</tr>
		<tr>
			<th class="tdp">办公电话</th>
			<td class="tdc">&nbsp;${borrow.outOfficeTel}</td>
			<th class="tdp">手机号码</th>
			<td class="tdc" colspan="2">&nbsp;${borrow.outPhone}</td>
		</tr>
		<tr>
			<th class="tdp">借用说明</th>
			<td class="tdc" colspan="4">&nbsp;${borrow.instruction}</td>
		</tr>
		<tr>
			<th class="tdp">借用时间</th>
			<td class="tdc">&nbsp;${borrow.borrowDate}</td>
			<th class="tdp">归还时间</th>
			<td class="tdc" colspan="2">&nbsp;${borrow.returnDate}</td>
		</tr>
	</table>
	<table class="tabp" width="630" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="7">借用清单</th>
		</tr>
		<tr>
			<th class="tdp" width="25%">设备名称/备案编号</th>
			<th class="tdp" width="20%">单位</th>
			<th class="tdp" width="15%">规格/型号</th>
			<th class="tdp" width="20%">生产厂商</th>
			<th class="tdp" width="10%">现值单价（元）</th>
			<th class="tdp" width="10%">备注</th>
		</tr>
		<c:forEach var="element" items="${equipmentList}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.equipGenericName}/${element.recordSerial}</td>
			<td class="tdc">&nbsp;${element.propertyName}</td>
			<td class="tdc">&nbsp;${element.equipSpecificName}</td>
			<td class="tdc">&nbsp;${element.equipVender}</td>
			<td class="tdc">&nbsp;${element.presentValue}</td>
			<td class="tdc">&nbsp;</td>
		</tr>
		</c:forEach>
		<c:forEach var="element" items="${componentList}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.componGenericName}/${element.componSerial}</td>
			<td class="tdc">-</td>
			<td class="tdc">&nbsp;${element.componSpecificName}</td>
			<td class="tdc">&nbsp;${element.supplierName}</td>
			<td class="tdc">&nbsp;${element.presentValue}</td>
			<td class="tdc">&nbsp;</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="630" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" width="15%" height="36">借用单位签章</th>
			<td class="tdc" width="85%">&nbsp;</td>
		</tr>
		<tr>
			<th class="tdp" height="36">借出单位签章</th>
			<td class="tdc" >&nbsp;</td>
		</tr>
		<tr>
			<th class="tdp">备注</th>
			<td class="tdc"><p align="left">${borrow.remark}</p></td>
		</tr>
	</table>
</center>
</body>
</html>