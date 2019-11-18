<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<title>班组核算</title>
<style media=print>
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
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
	<div class="hzbmain_detail">
		<p style='text-align:center'><span class="wrod_title">${corpInfo.corpName}班组费用汇总表</span></p>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="36" align="right" style="padding-right:20px;"><strong>金额单位：元</strong></td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table">
			<tr>
				<td align="center">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td height="24" colspan="8" align="center" style="background-color:#E0E0E0; font-weight:bold; border-left-style:none;">
								<div style="width:200px; float:left; text-align:left; padding-left:5px;">基本信息</div>
								<div style="width:200px; float:right; text-align:right; padding-right:10px;">汇总日期：${teamsAccount.providedDate}</div>
							</td>
						</tr>
						<tr>
							<td width="10%" height="24" style="border-left-style:none;">结算编号</td>
							<td width="20%" align="left">&nbsp;${teamsAccount.teamsAccountSerial}</td>
							<td width="10%">应扣总额</td>
							<td width="13%">&nbsp;${teamsAccount.deductAmount}</td>
							<td width="11%" align="left">班组负责人</td>
							<td width="10%" align="left">&nbsp;${teamsAccount.practiName}</td>
							<td width="11%" align="left">标准节单价</td>
							<td align="left">&nbsp;${teamsAccount.knotPrice}</td>
						</tr>
						<tr>
							<td height="24" style="border-left-style:none;border-bottom-style:none;">项目名称</td>
							<td align="left" style="border-bottom-style:none;">&nbsp;${teamsAccount.projectName}</td>
							<td style="border-bottom-style:none;">应付总额</td>
							<td style="border-bottom-style:none;">&nbsp;${teamsAccount.paymentAmount}</td>
							<td align="left" style="border-bottom-style:none;">所属班组</td>
							<td align="left" style="border-bottom-style:none;">&nbsp;${teamsAccount.teams}</td>
							<td align="left" style="border-bottom-style:none;">附墙单价</td>
							<td align="left" style="border-bottom-style:none;">&nbsp;${teamsAccount.wallAttachePrice}</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style="background-color:#E0E0E0; font-weight:bold; padding-left:5px;" height="24" align="left">标准节</td>
			</tr>
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td height="24" style="border-left-style:none;">序号</td>
							<td>日期</td>
							<td>类型</td>
							<td>备案编号</td>
							<td>楼号</td>
							<td>配件名称</td>
							<td>规格型号</td>
							<td>数量</td>
							<td>单位</td>
							<td>单价</td>
							<td>应扣数量</td>
							<td>小计</td>
							<td>班组负责人</td>
							<td>项目名称</td>
						</tr>
						<c:forEach var="element" items="${teamsAccount.teamsAccountKnotSet}" varStatus="status">
						<tr>
							<td height="24" style="border-left-style:none;">&nbsp;${status.count}</td>
							<td>&nbsp;${element.accountDate}</td>
							<td>&nbsp;${element.knotTypeName}</td>
							<td>&nbsp;${element.recordId}</td>
							<td>&nbsp;${element.buildingNum}</td>
							<td>&nbsp;${element.componGenericName}</td>
							<td>&nbsp;${element.componSpecificName}</td>
							<td>&nbsp;${element.quantity}</td>
							<td>&nbsp;${element.measurement}</td>
							<td>&nbsp;${element.accountPrice}</td>
							<td>&nbsp;${element.deductQuantity}</td>
							<td>&nbsp;${element.summary}</td>
							<td>&nbsp;${element.practiName}</td>
							<td>&nbsp;${element.projectName}</td>
						</tr>
						</c:forEach>
						<tr>
							<td height="24" colspan="9" align="right" style="border-bottom-style:none;border-left-style:none;">费用小计：</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
							<td style="border-bottom-style:none;">&nbsp;${teamsAccount.knotAmount}</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style="background-color:#E0E0E0; font-weight:bold; padding-left:5px;" height="24" align="left">附墙</td>
			</tr>
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td height="24" style="border-left-style:none;">序号</td>
							<td>日期</td>
							<td>类型</td>
							<td>备案编号</td>
							<td>楼号</td>
							<td>配件名称</td>
							<td>规格型号</td>
							<td>数量</td>
							<td>单位</td>
							<td>单价</td>
							<td>应扣数量</td>
							<td>小计</td>
							<td>班组负责人</td>
							<td>项目名称</td>
						</tr>
						<c:forEach var="element" items="${teamsAccount.teamsAccountWallSet}" varStatus="status">
						<tr>
							<td height="24" style="border-left-style:none;">&nbsp;${status.count}</td>
							<td>&nbsp;${element.accountDate}</td>
							<td>&nbsp;${element.wallTypeName}</td>
							<td>&nbsp;${element.recordId}</td>
							<td>&nbsp;${element.buildingNum}</td>
							<td>&nbsp;${element.componGenericName}</td>
							<td>&nbsp;${element.componSpecificName}</td>
							<td>&nbsp;${element.quantity}</td>
							<td>&nbsp;${element.measurement}</td>
							<td>&nbsp;${element.accountPrice}</td>
							<td>&nbsp;${element.deductQuantity}</td>
							<td>&nbsp;${element.summary}</td>
							<td>&nbsp;${element.practiName}</td>
							<td>&nbsp;${element.projectName}</td>
						</tr>
						</c:forEach>
						<tr>
							<td height="24" colspan="9" align="right" style="border-bottom-style:none;border-left-style:none;">费用小计：</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
							<td style="border-bottom-style:none;">&nbsp;${teamsAccount.wallAmount}</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style="background-color:#E0E0E0; font-weight:bold; padding-left:5px;" height="24" align="left">其它</td>
			</tr>
			<tr>
				<td height="28">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td height="24" style="border-left-style:none;">序号</td>
							<td>日期</td>
							<td>费用类别</td>
							<td>规格型号</td>
							<td>数量</td>
							<td>单位</td>
							<td>单价</td>
							<td>应扣数量</td>
							<td>小计</td>
							<td>班组负责人</td>
							<td>项目名称</td>
						</tr>
						<c:forEach var="element" items="${teamsAccount.teamsAccountOtherSet}" varStatus="status">
						<tr>
							<td height="24" style="border-left-style:none;">&nbsp;${status.count}</td>
							<td>&nbsp;</td>
							<td>&nbsp;${element.otherName}</td>
							<td>&nbsp;${element.specificName}</td>
							<td>&nbsp;${element.quantity}</td>
							<td>&nbsp;${element.measurement}</td>
							<td>&nbsp;${element.accountPrice}</td>
							<td>&nbsp;${element.deductQuantity}</td>
							<td>&nbsp;${element.summary}</td>
							<td>&nbsp;${element.practiName}</td>
							<td>&nbsp;${element.projectName}</td>
						</tr>
						</c:forEach>
						<tr>
							<td colspan="6" align="right" height="24" style="border-bottom-style:none;border-left-style:none;">费用小计：</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
							<td style="border-bottom-style:none;">&nbsp;${teamsAccount.otherAmount}</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
							<td style="border-bottom-style:none;">&nbsp;</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style="background-color:#E0E0E0; font-weight:bold; padding-left:5px;" height="24" align="left">班组成员工资</td>
			</tr>
			<tr>
				<td height="28">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td style="border-left-style:none;">序号</td>
							<td>日期</td>
							<td>姓名</td>
							<td>工作内容</td>
							<td>底薪</td>
							<td>费用分摊</td>
							<td>应扣金额</td>
							<td>合计</td>
							<td>项目名称</td>
						</tr>
						<c:forEach var="element" items="${teamsAccount.teamsAccountPractiSet}" varStatus="status">
						<tr>
							<td height="24" style="border-left-style:none;">&nbsp;${status.count}</td>
							<td>&nbsp;</td>
							<td>&nbsp;${element.practiName}</td>
							<td>&nbsp;${element.remark}</td>
							<td>&nbsp;${element.baseSalary}</td>
							<td>&nbsp;${element.presentAmount}</td>
							<td>&nbsp;${element.deductAmount}</td>
							<td>&nbsp;${element.summary}</td>
							<td>&nbsp;${element.projectName}</td>
						</tr>
						</c:forEach>
					</table>
				</td>
			</tr>
		</table>
	</div>
	</br>
	</br>
	</br>
	</br>
	</br>
</center>
</body>
</html>