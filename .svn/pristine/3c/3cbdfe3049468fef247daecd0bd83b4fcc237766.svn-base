<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>全员薪资信息</title>
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
	<font size="5" style="font-weight: bold">${salaryMonth}员工薪资</font><br /> <br /> <br />

	<c:forEach var="element" items="${practiMonthSalary}" varStatus="status">
		<table class="tabp" width="960" border="0" align="center" cellpadding="2" cellspacing="0">
			<tr>
				<th class="tdp" width="9%">员工姓名</th>
				<th class="tdp" width="7%">基本工资</th>
				<th class="tdp" width="7%">岗位补贴</th>
				<th class="tdp" width="7%">加班工资</th>
				<th class="tdp" width="6%">餐费等补贴</th>
				<th class="tdp" width="6%">养老保险</th>
				<th class="tdp" width="6%">社会保险</th>
				<th class="tdp" width="6%">住房公积金</th>
				<th class="tdp" width="6%">个税</th>
				<th class="tdp" width="6%">其他应扣</th>
				<th class="tdp" width="6%">其他项目</th>
				<th class="tdp" width="7%">奖金</th>
				<th class="tdp" width="7%">应发工资</th>
				<th class="tdp" width="7%">应扣金额</th>
				<th class="tdp" width="7%">实发工资</th>
			</tr>
			<tr>
				<td class="tdc">&nbsp;${element.PRACTI_NAME}</td>
				<td class="tdc">&nbsp;${element.BASE_SALARY}</td>
				<td class="tdc">&nbsp;${element.STATION}</td>
				<td class="tdc">&nbsp;${element.OVERTIME_WORK}</td>
				<td class="tdc">&nbsp;${element.MEAL_FEE}</td>
				<td class="tdc">&nbsp;${element.ENDOWMENT}</td>
				<td class="tdc">&nbsp;${element.SOCIAL_INSURANCE}</td>
				<td class="tdp">&nbsp;${element.HOUSING_FUND}</td>
				<td class="tdc">&nbsp;${element.TAX}</td>
				<td class="tdc">&nbsp;${element.OTHER_DEDUCT}</td>
				<td class="tdc">&nbsp;${element.OTHER_ITEMS}</td>
				<td class="tdc">&nbsp;${element.REWARD}</td>
				<td class="tdc">&nbsp;${element.TOTAL_AMOUNT}</td>
				<td class="tdc">&nbsp;${element.DEDUCT_AMOUNT}</td>
				<td class="tdc">&nbsp;${element.FINAL_AMOUNT}</td>
			</tr>
			<tr>
				<td class="tdc" colspan="12">&nbsp;总计</td>
				<td class="tdc">&nbsp;${element.TOTAL_AMOUNT}</td>
				<td class="tdc">&nbsp;${element.DEDUCT_AMOUNT}</td>
				<td class="tdc">&nbsp;${element.FINAL_AMOUNT}</td>
			</tr>
		</table>
	</c:forEach>
</center>
</body>
</html>