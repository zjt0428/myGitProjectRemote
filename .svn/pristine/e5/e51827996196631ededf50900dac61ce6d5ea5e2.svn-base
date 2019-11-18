<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>物资采购申请表</title>
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
	<font size="5" style="font-weight: bold">设备及物品采购单</font><br /> <br />
	<table class="tabp" width="630" border="1" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th>申请部门</td>
			<td>${purchasePlan.applicantDept}</td>
			<th>申请人</td>
			<td>${purchasePlan.applicantName}</td>
			<th>日期</td>
			<td>${purchasePlan.fillDate}</td>
		</tr>
	</table>
	<table class="tabp" width="630" border="1" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" width="9%">编号</th>
			<th class="tdp" width="13%">材料名称</th>
			<th class="tdp" width="13%">规格型号</th>
			<th class="tdp" width="13%">单位</th>
			<th class="tdp" width="13%">数量</th>
			<th class="tdp" width="13%">审批数量</th>
			<th class="tdp" width="13%">限购日期</th>
			<th class="tdp" width="13%">询价价格</th>
		</tr>
		<c:forEach var="element" items="${purchasePlan.purchasePlanInquirySet}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${status.index+1}</td>
			<td class="tdc">&nbsp;${element.materialName}</td>
			<td class="tdc">&nbsp;${element.specific}</td>
			<td class="tdc">&nbsp;${element.unit}</td>
			<td class="tdc">&nbsp;${element.quantity}</td>
			<td class="tdc">&nbsp;${element.approvalQuantity}</td>
			<td class="tdc">&nbsp;${element.purchaseDate}</td>
			<td class="tdc">&nbsp;${element.inquiryPrice}</td>
		</tr>
		</c:forEach>
		<tr>
			<th class="tdp">备注</th>
			<td class="tdc"></td>
			<td class="tdc"></td>
			<td class="tdc"></td>
			<td class="tdc"></td>
			<td class="tdc"></td>
			<td class="tdc"></td>
			<td class="tdc"></td>
		</tr>
		<tr><th class="tdp" colspan="8" style="text-align: left;"><p>物资部门意见：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;负责人签字：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></th>
		</tr>
		<tr><th class="tdp" colspan="8" style="text-align: left;"><p>生产副经理意见：</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签字：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></th>
		</tr>
		<tr><th class="tdp" colspan="8" style="text-align: left;"><p>公司总经理审批：</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签字：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></th>
		</tr>
	</table>
	</center>
</body>
</html>