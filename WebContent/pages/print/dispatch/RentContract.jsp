<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>转租结算表</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<style media=print>
.Noprint {
	display: none;
}
</style>
</head>
<body>
<div class="Noprint" style="text-algin:center">
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size:12px" value="直接打印" onclick="document.all.WebBrowser.ExecWB(6,6)" />
		<input type="button" style="font-size:12px" value="打印预览" onclick="document.all.WebBrowser.ExecWB(7,1)" />
		<input type="button" style="font-size:12px" value="页面设置" onclick="document.all.WebBrowser.ExecWB(8,1)" />
	</p>
</div>
<center>
<div class="hzbmain_detail">
<p style='text-align:center'><span class="wrod_title">${rentContract.pbEntName} 转租结算清单</span></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td height="26" colspan="2" width="50%" style="padding-left:5px; text-align:left;">结算单号：${rentContract.rentSerial}</td>
		<td align="right" style="padding-right:5px;border-left-style:none;">承包人： ${rentContract.contractor}</td>
	</tr>
	<tr>
		<td height="26" colspan="2" style="padding-left:5px; text-align:left;">项目名称：${rentContract.projectName}</td>
		<td align="right" style="padding-right:5px;border-left-style:none;">项目所属地： ${rentContract.address}</td>
	</tr>
	<tr>
		<td height="26" colspan="2" style="padding-left:5px;text-align:left;">本次结算周期：自&nbsp;${rentContract.startRentDate}&nbsp;至&nbsp;${rentContract.endRentDate}&nbsp;止</td>
		<td align="right" style="padding-right:5px;border-left-style:none;">代租单位： ${rentContract.pbEntName}</td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table">
	<tr style="background-color:#E0E0E0;">
		<td rowspan="2" width="3%">楼号</td>
		<td rowspan="2" width="10%">品名</td>
		<td rowspan="2" width="10%">备案编号</td>
		<td rowspan="2" width="8%">规格</td>
		<td rowspan="2" width="4%">单位</td>
		<td colspan="2" width="14%">本次计费时间</td>
		<td rowspan="2" width="6%">计费天数</td>
		<td rowspan="2" width="6%">租金标准</td>
		<td rowspan="2" width="6%">租金单位</td>
		<td rowspan="2" width="6%">租用数量</td>
		<td rowspan="2" width="6%">日租金<br />（元）</td>
		<td rowspan="2" width="6%">应扣租金</td>
		<td rowspan="2" width="8%">租金累<br />计（元）</td>
		<td rowspan="2">备注</td>
	</tr>
	<tr style="background-color:#E0E0E0;" >
		<td width="7%">开始日</td>
		<td width="7%">截止日</td>
	</tr>
</table>
<c:forEach var="element" items="${rentSpecificItems}" varStatus="status">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table" style="border-top-style:none;">	
	<c:forEach var="item" items="${element.rentRentItems}" begin="0" end="0">
	<tr>
		<td rowspan="${fn:length(element.rentRentItems)}" width="3%" >&nbsp;${element.buildingNum}</td>
		<td rowspan="${fn:length(element.rentRentItems)}" width="10%">&nbsp;${element.categoryName}</td>
		<td rowspan="${fn:length(element.rentRentItems)}" width="10%">&nbsp;${element.recordId}</td>
		<td rowspan="${fn:length(element.rentRentItems)}" width="8%">&nbsp;${element.specificName}</td>
		<td rowspan="${fn:length(element.rentRentItems)}" width="4%">&nbsp;${element.unit}</td>
		<td width="7%">&nbsp;${item.startRentDate}</td>
		<td width="7%">&nbsp;${item.endRentDate}</td>
		<td width="6%">&nbsp;${item.rentDays}</td>
		<td width="6%">&nbsp;${item.rentStandard}</td>
		<td width="6%">&nbsp;${item.measurement}</td>
		<td width="6%">&nbsp;${item.quantity}</td>
		<td width="6%">&nbsp;${item.daysRent}</td>
		<td rowspan="${fn:length(element.rentRentItems)}" width="6%">&nbsp;${element.deductRent}</td>
		<td width="8%">&nbsp;${item.summary}</td>
		<td>&nbsp;${item.remark}</td>
	</tr>
	</c:forEach>
	<c:forEach var="item" items="${element.rentRentItems}" begin="1">
	<tr>
		<td>&nbsp;${item.startRentDate}</td>
		<td>&nbsp;${item.endRentDate}</td>
		<td>&nbsp;${item.rentDays}</td>
		<td>&nbsp;${item.rentStandard}</td>
		<td>&nbsp;${item.measurement}</td>
		<td>&nbsp;${item.quantity}</td>
		<td>&nbsp;${item.daysRent}</td>
		<td>&nbsp;${item.summary}</td>
		<td>&nbsp;${item.remark}</td>
	</tr>
	</c:forEach>
	<tr>
		<td height="24" colspan="11" align="right"><span style="border-bottom-style:none;border-left-style:none;">小计：</span></td>
		<td colspan="2" style="border-bottom-style:none; text-align:left">&nbsp;${element.deductRent}</td>
		<td style="border-bottom-style:none;">&nbsp;${element.summary}</td>
		<td style="border-bottom-style:none;">&nbsp;</td>
	</tr>
</table>
</c:forEach>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table" style="border-top-style:none;">
	<c:forEach var="elemnet" items="${rentContract.rentItemBriefSet}">
	<tr>
		<td style="border-top-style:none;" width="13%" height="42">&nbsp;${elemnet.rentItemName}</td>
		<td width="10%">&nbsp;${elemnet.recordId}</td>
		<td width="8%">/</td>
		<td width="4%">/</td>
		<td width="7%">/</td>
		<td width="7%">/</td>
		<td width="6%">/</td>
		<td width="6%">&nbsp;${elemnet.unitprice}</td>
		<td width="6%">&nbsp;${elemnet.measurement}</td>
		<td width="6%">&nbsp;${elemnet.quantity}</td>
		<td width="6%">&nbsp;</td>
		<td width="6%">&nbsp;${elemnet.deductRent}</td>
		<td width="8%">${elemnet.summary}</td>
		<td>&nbsp;</td>
	</tr>
	</c:forEach>
	<tr>
		<td height="24" colspan="10" align="right"><span style="border-bottom-style:none;border-left-style:none;">小计：</span></td>
		<td colspan="2" align="left">&nbsp;${itemDeductAmount}</td>
		<td>&nbsp;${itemAmount}</td>
		<td>&nbsp;</td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table" style="border-top-style:none;">	 
	<tr>
		<td height="24" colspan="12" align="right" ><strong>本次应收总计：</strong></td>
		<td colspan="2"><strong>${paymentAmount}</strong></td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table" style="border-top-style:none;">
	<tr>
		<td colspan="9" style="background-color:#E0E0E0; font-weight:bold; padding-left:5px;" height="24" align="left">费用明细</td>
	</tr>
	<tr>
		<td height="24">品名</td>
		<td>备案编号</td>
		<td>规格型号</td>
		<td>费用说明</td>
		<td>单位</td>
		<td>数量</td>
		<td>单价</td>
		<td>合计</td>
		<td>备注</td>
	</tr>
	<c:forEach var="elemnet" items="${rentContract.rentDeductBriefSet}">
	<tr>
		<td height="24">&nbsp;${elemnet.equipCategoryName}</td>
		<td>&nbsp;${elemnet.recordId}</td>
		<td>&nbsp;${elemnet.equipSpecificName}</td>
		<td>&nbsp;${elemnet.remark}</td>
		<td>&nbsp;${elemnet.measurement}</td>
		<td>&nbsp;${elemnet.quantity}</td>
		<td>&nbsp;${elemnet.unitprice}</td>
		<td>&nbsp;${elemnet.summary}</td>
		<td>&nbsp;</td>
	</tr>
	</c:forEach>
	<tr>
		<td height="24" colspan="7" align="right"><strong>本次应收总计：</strong></td>
		<td colspan="2">&nbsp;${totalAmount}</td>
		</tr>
	<tr>
		<td height="24" colspan="7" align="right"><strong>应付合计（大写）：</strong></td>
		<td colspan="2">&nbsp;${totalAmountIdeograph}</td>
	</tr>
</table>

<br />
<table  width="100%" border="1" cellspacing="0" cellspacing="0" class="hzb_table" >
	<tr style="background-color:#E0E0E0;">
		<td>&nbsp;月份</td>
		<td>&nbsp;累计支付</td>
		<td>&nbsp;本月支付</td>
		<td>&nbsp;结算人</td>
		<td>&nbsp;项目负责人</td>
		<td>&nbsp;部门负责人</td>
		<td>&nbsp;分管领导</td>
		<td>&nbsp;总经理审批</td>	
	</tr>
	<tr >
		<td style="border-bottom-style:none;">&nbsp;</td>
		<td rowspan="2">${rentContract.finishedAmount}</td>
		<td style="border-bottom-style:none;">&nbsp;</td>
		<td style="border-bottom-style:none;">&nbsp;</td>
		<td style="border-bottom-style:none;">&nbsp;</td>
		<td style="border-bottom-style:none;">&nbsp;</td>
		<td style="border-bottom-style:none;">&nbsp;</td>
		<td style="border-bottom-style:none;">&nbsp;</td>
	</tr>
	<tr>
		<td style="border-top-style:none;">&nbsp;</td>
		<td style="border-top-style:none;">&nbsp;</td>
		<td style="border-top-style:none;">&nbsp;</td>
		<td style="border-top-style:none;">&nbsp;</td>	
		<td style="border-top-style:none;">&nbsp;</td>
		<td style="border-top-style:none;">&nbsp;</td>
		<td style="border-top-style:none;">&nbsp;</td>			
	</tr>
</table>


</div>
</center>
</body>
</html>