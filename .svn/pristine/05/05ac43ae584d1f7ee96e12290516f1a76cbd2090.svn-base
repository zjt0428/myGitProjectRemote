<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>租金结算清单</title>
<style media=print>
.Noprint {
	display: none;
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
	<font size="5" style="font-weight: bold">${settleContract.pbEntName } 租金结算清单</font><br /> <br /> <br />
	<table border="0" width="978">
		<tr>
			<td class="tdh" width="45%"><font style="font-weight: bold;">结算单号：</font>&nbsp;${settleContract.settleSerial}</td>
			<td class="tdh" width="45%"><font style="font-weight: bold;">承租单位：</font>&nbsp;${settleContract.paEntName}</td>
			<td class="tdh" width="10%">&nbsp;</td>
		</tr>
		<tr>
			<td class="tdh"><font style="font-weight: bold;">项目名称：</font>&nbsp;${settleContract.projectName}</td>
			<td class="tdh"><font style="font-weight: bold;">项目所属地：</font>&nbsp;${settleContract.address}</td>
			<td class="tdh">&nbsp;</td>
		</tr>
		<tr>
			<td class="tdh" colspan="2"><font style="font-weight: bold;">本次结算周期：</font>自&nbsp;${settleContract.startSettleDate}&nbsp;至&nbsp;${settleContract.endSettleDate}&nbsp;止</td>
			<td class="tdh">&nbsp;</td>
		</tr>
	</table>
	<table class="tabp" width="978" border="0" align="center" cellpadding="2" cellspacing="0">
		<tr>
			<th class="tdp" width="10%" rowspan="2">品名</th>
			<th class="tdp" width="10%" rowspan="2">规格</th>
			<th class="tdp" width="6%" rowspan="2">单位</th>
			<th class="tdp" width="20%" colspan="2">本次计费时间</th>
			<th class="tdp" width="5%" rowspan="2">计费天数</th>
			<th class="tdp" width="7%" rowspan="2">租金标准</th>
			<th class="tdp" width="5%" rowspan="2">租金单位</th>
			<th class="tdp" width="5%" rowspan="2">租用数量</th>
			<th class="tdp" width="7%" rowspan="2">日租金（元）</th>
			<th class="tdp" width="7%" rowspan="2">应扣租金（元）</th>
			<th class="tdp" width="8%" rowspan="2">租金累计（元）</th>
			<th class="tdp" width="10%" rowspan="2">备注</th>
		</tr>
		<tr>
			<th class="tdp" width="9%">开始日</th>
			<th class="tdp" width="9%">截止日</th>
		</tr>
		<c:forEach var="content" items="${settleEquipBrief}">
			<c:forEach var="elemnet" items="${content.value}">
			<tr>
				<c:if test="${elemnet.categoryRowspan gt 0}">
				<td class="tdp" align="center" valign="middle" rowspan="${elemnet.categoryRowspan}">&nbsp;${elemnet.equipCategoryName}</td>
				</c:if>
				<td class="tdp" align="center">&nbsp;${elemnet.equipSpecificName}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.unit}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.startSettleDate}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.endSettleDate}</td>
				<c:choose>
				<c:when test="${elemnet.settleDays gt 0}">
				<td class="tdp" align="center">&nbsp;${elemnet.settleDays}</td>
				<td class="tdp" align="center">&nbsp;/</td>
				</c:when>
				<c:otherwise>
				<td class="tdp" align="center">&nbsp;/</td>
				<td class="tdp" align="center">&nbsp;${elemnet.rentStandard}</td>
				</c:otherwise>
				</c:choose>
				<td class="tdp" align="center">&nbsp;${elemnet.measurement}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.quantity}</td>
				<c:choose>
				<c:when test="${elemnet.settleDays gt 0}">
				<td class="tdp" align="center">&nbsp;${elemnet.daysRent}</td>
				</c:when>
				<c:otherwise>
				<td class="tdp" align="center">&nbsp;/</td>
				</c:otherwise>
				</c:choose>
				<c:if test="${elemnet.deductRentRowspan gt 0}">
				<td class="tdp" align="center" valign="middle" rowspan="${elemnet.deductRentRowspan}">&nbsp;${elemnet.deductRent}</td>
				</c:if>
				<td class="tdp" align="center">&nbsp;${elemnet.summary}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.remark}</td>
			</tr>
			</c:forEach>
			<tr>
				<th class="tdp" colspan="9">小计</th>
				<td class="tdp" align="center" colspan="2" >&nbsp;${kfn:listsum(content.value, "deductRent")}</td>
				<td class="tdp" align="center" colspan="2" >&nbsp;${kfn:listsum(content.value, "summary") - kfn:listsum(content.value, "deductRent")}</td>
			</tr>
		</c:forEach>
		<c:forEach var="content" items="${settleComponBrief}">
			<c:forEach var="elemnet" items="${content.value}">
			<tr>
				<c:if test="${elemnet.categoryRowspan gt 0}">
				<td class="tdp" align="center" valign="middle" rowspan="${elemnet.categoryRowspan}">&nbsp;${elemnet.componCategoryName}</td>
				</c:if>
				<td class="tdp" align="center">&nbsp;${elemnet.componSpecificName}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.unit}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.startSettleDate}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.endSettleDate}</td>
				<c:choose>
				<c:when test="${elemnet.settleDays gt 0}">
				<td class="tdp" align="center">&nbsp;${elemnet.settleDays}</td>
				<td class="tdp" align="center">&nbsp;/</td>
				</c:when>
				<c:otherwise>
				<td class="tdp" align="center">&nbsp;/</td>
				<td class="tdp" align="center">&nbsp;${elemnet.rentStandard}</td>
				</c:otherwise>
				</c:choose>
				<td class="tdp" align="center">&nbsp;${elemnet.measurement}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.quantity}</td>
				<c:choose>
				<c:when test="${elemnet.settleDays gt 0}">
				<td class="tdp" align="center">&nbsp;${elemnet.daysRent}</td>
				</c:when>
				<c:otherwise>
				<td class="tdp" align="center">&nbsp;/</td>
				</c:otherwise>
				</c:choose>
				<c:if test="${elemnet.deductRentRowspan gt 0}">
				<td class="tdp" align="center" valign="middle" rowspan="${elemnet.deductRentRowspan}">&nbsp;${elemnet.deductRent}</td>
				</c:if>
				<td class="tdp" align="center">&nbsp;${elemnet.summary}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.remark}</td>
			</tr>
			</c:forEach>
			<tr>
				<th class="tdp" colspan="9">小计</th>
				<td class="tdp" align="center" colspan="2" >&nbsp;${kfn:listsum(content.value, "deductRent")}</td>
				<td class="tdp" align="center" colspan="2" >&nbsp;${kfn:listsum(content.value, "summary") - kfn:listsum(content.value, "deductRent")}</td>
			</tr>
		</c:forEach>
		<c:forEach var="elemnet" items="${settleItemBrief}">
			<tr>
				<td class="tdp" align="center">&nbsp;${elemnet.settleItemName}</td>
				<td class="tdp" align="center">&nbsp;/</td>
				<td class="tdp" align="center">&nbsp;/</td>
				<td class="tdp" align="center">&nbsp;/</td>
				<td class="tdp" align="center">&nbsp;/</td>
				<td class="tdp" align="center">&nbsp;/</td>
				<td class="tdp" align="center">&nbsp;${elemnet.unitprice}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.measurement}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.quantity}</td>
				<td class="tdp" align="center">&nbsp;/</td>
				<td class="tdp" align="center">&nbsp;${elemnet.deductRent}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.summary + elemnet.deductRent}</td>
				<td class="tdp" align="center">&nbsp;${elemnet.remark}</td>
			</tr>
			<tr>
				<th class="tdp" colspan="9">小计</th>
				<td class="tdp" align="center" colspan="2" >&nbsp;${elemnet.deductRent}</td>
				<td class="tdp" align="center" colspan="2" >&nbsp;${elemnet.summary}</td>
			</tr>
		</c:forEach>
		<tr>
			<th class="tdp" colspan="11">本次应收总计</th>
			<td class="tdp" align="center" colspan="2" >&nbsp;${settleContract.settleAmount}</td>
		</tr>
	</table>
	<table class="tabp" width="978" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<td class="tdp" colspan="5">
				<div style="margin: 10px 0px 0px 15px">承租单位确认：以上信息确认无误。</div>
				<div style="margin: 10px 0px 0px 15px">签&nbsp;&nbsp;&nbsp;&nbsp;章</div>
				<div style="margin: 10px 0px 0px 15px">经办人：</div>
				<div style="margin: 45px 25px 5px 5px;" valign="bottom" align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</div>
			</td>
			<td class="tdp" colspan="5">
				<div style="margin: 10px 0px 0px 15px">出租单位确认：以上信息确认无误。：</div>
				<div style="margin: 10px 0px 0px 15px">签&nbsp;&nbsp;&nbsp;&nbsp;章</div>
				<div style="margin: 10px 0px 0px 15px">经办人：</div>
				<div style="margin: 45px 25px 5px 5px;" valign="bottom" align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</div>
			</td>
		</tr>
		<tr>
			<th class="tdp" colspan="2">备 注</th>
			<td class="tdp" colspan="8">
			1、本结算单是出租与承租方费用结算的主要凭证，经承租和出租单位双方确认签章后具有法律效应。</br>
            2、日租金是按月租金标准除以当月天数。不足一个月的，按实际租用天数乘以日租金。</br>
            3、应扣租金是指设备因故障或因其它各种原因停用期间，应按照租赁合同约定扣减的租赁费用。</br>
			</td>
		</tr>
	</table>
</center>
</body>
</html>