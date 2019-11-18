<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>租金结算清单</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<style media=print>
.Noprint {
	display: none;
}
</style>
</head>
<body>
<center class="Noprint">
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size:12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size:12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size:12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
<div class="hzbmain_detail">
<p style="text-align:center; padding-bottom:10px;"><span class="wrod_title">${settleContract.pbEntName } 租金结算清单</span></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td height="26" width="50%" style="padding-left:5px; text-align:left;">结算单号：${settleContract.settleSerial}</td>
		<td align="right" style="padding-right:5px;border-left-style:none;">承租单位：${settleContract.paEntName}</td>
	</tr>
	<tr>
		<td height="26" style="padding-left:5px; text-align:left;">项目名称：${settleContract.projectName}</td>
		<td align="right" style="padding-right:5px;border-left-style:none;">项目所属地：${settleContract.address}</td>
	</tr>
	<tr>
		<td height="26" colspan="2" style="padding-left:5px;text-align:left;">本次结算周期：自&nbsp;${settleContract.startSettleDate}&nbsp;至&nbsp;${settleContract.endSettleDate}&nbsp;止</td>
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
		<td rowspan="2" >备注</td>
	</tr>
	<tr style="background-color:#E0E0E0;" >
		<td width="7%">开始日</td>
		<td width="7%">截止日</td>
	</tr>
</table>
<c:forEach var="element" items="${settleSpecificItems}" varStatus="status">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table" style="border-top-style:none;">
	<c:forEach var="item" items="${element.settleRentItems}" begin="0" end="0">
	<tr>
		<td rowspan="${fn:length(element.settleRentItems)}" width="3%" >&nbsp;${element.buildingNum}</td>
		<td rowspan="${fn:length(element.settleRentItems)}" width="10%">&nbsp;${element.categoryName}</td>
		<td rowspan="${fn:length(element.settleRentItems)}" width="10%">&nbsp;${element.recordId}</td>
		<td rowspan="${fn:length(element.settleRentItems)}" width="8%">&nbsp;${element.specificName}</td>
		<td rowspan="${fn:length(element.settleRentItems)}" width="4%">&nbsp;${element.unit}</td>
		<td width="7%">&nbsp;${item.startSettleDate}</td>
		<td width="7%">&nbsp;${item.endSettleDate}</td>
		<td width="6%">&nbsp;${item.settleDays}</td>
		<td width="6%">&nbsp;${item.rentStandard}</td>
		<td width="6%">&nbsp;${item.measurement}</td>
		<td width="6%">&nbsp;${item.quantity}</td>
		<td width="6%">&nbsp;${item.daysRent}</td>
		<td rowspan="${fn:length(element.settleRentItems)}" width="6%">&nbsp;${element.deductRent}</td>
		<td width="8%">&nbsp;${item.summary}</td>
		<td>&nbsp;${item.remark}</td>
	</tr>
	</c:forEach>
	<c:forEach var="item" items="${element.settleRentItems}" begin="1">
	<tr>
		<td>&nbsp;${item.startSettleDate}</td>
		<td>&nbsp;${item.endSettleDate}</td>
		<td>&nbsp;${item.settleDays}</td>
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
	<c:forEach var="elemnet" items="${settleContract.settleItemBriefSet}">
	<tr>
		<td style="border-top-style:none;" width="13%" height="42">&nbsp;${elemnet.settleItemName}</td>
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
		<td height="24" colspan="12" align="right"><strong>本次应收总计<span style="border-bottom-style:none;border-left-style:none;">：${bigTotalAmount }</span></strong></td>
		<td colspan="2"><strong>&nbsp;${totalAmount}</strong></td>
	</tr>
	<tr>
		<td colspan="14">&nbsp;</td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-right:#000000 1PX solid;border-left:#000000 1PX solid;">
	<tr>
		<td width="50%" style="border-right:#000000 1PX solid; text-align:left; padding-left:5PX;" height="24">承租单位确认：以上信息确认无误。</td>
		<td style="text-align:left; padding-left:5px;">出租单位确认：以上信息确认无误。</td>
	</tr>
	<tr>
		<td style="border-right:#000000 1PX solid; text-align:left; padding-left:5PX;" height="24">签    章</td>
		<td style="text-align:left; padding-left:5px;">签    章</td>
	</tr>
	<tr>
		<td style="border-right:#000000 1PX solid; text-align:left; padding-left:5PX;" height="24">经办人：</td>
		<td style="text-align:left; padding-left:5px;">经办人：</td>
	</tr>
	<tr>
		<td style="border-right:#000000 1PX solid; text-align:right; padding-left:5PX; padding-right:6px;" height="24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</td>
		<td style="text-right:right; padding-right:6px;" align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table">
	<tr>
		<td rowspan="3" width="10%"><strong>备注</strong></td>
		<td height="24"><div align="left">1、本结算单是出租与承租方费用结算的主要凭证，经承租和出租单位双方确认签章后具有法律效应。</div></td>
	</tr>
	<tr>
		<td height="24"><div align="left">2、日租金是按月租金标准除以当月天数。不足一个月的，按实际租用天数乘以日租金。</div></td>
	</tr>
	<tr>
		<td height="24"><div align="left">3、应扣租金是指设备因故障或因其它各种原因停用期间，应按照租赁合同约定扣减的租赁费用。</div></td>
	</tr>
</table>
</div>
</center>
</body>
</html>