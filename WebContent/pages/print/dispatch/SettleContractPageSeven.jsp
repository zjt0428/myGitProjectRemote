<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>机械设备月租金结算单</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<style media=print>
.Noprint {
	display: none;
}
</style>
</head>
<body>
<script type="text/javascript">
	function printRecord() {
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	var __ctxPath = "<%=request.getContextPath()%>";
	var url =window.location.protocol+'//'+window.location.host+__ctxPath+ "/dispatch/printRecordSettleContract.do";
		$.ajax({
			type:'get',
			url:url,
			dataType:'json',
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			crossDomain:true,
			xhrFields:{
			    withCredentials:true
			},
			data : {
				"settleIds" : theRequest.settleIds
			},
			async:true,
			success:function(res){
			}
		})
	}
</script>
<center class="Noprint">
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" id="btnPrint" style="font-size: 12px" value="直接打印" onclick="printRecord(),window.print()" />
		<!-- <input type="button" style="font-size:12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size:12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)"> -->
	</p>
</center>
<center>
<c:forEach var="map" items="${printList}" >
<div class="hzbmain_detail">
<p style="text-align:center; "><span class="wrod_title">广 西 建 工 大 都 租 赁 有 限 公 司</span></p>
<p style="text-align:center; "><span class="wrod_title">机  械  设  备  月  租  金  结  算  单</span></p>
<p style="text-align:center; padding-bottom:10px;"><span><b>（${map['titleDate']}）</b></span></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td height="26" width="90px" style="text-align:right;border-left-style:none;">承租单位：</td>
		<td colspan="3" height="26" >${map['settleContract'].paEntName}</td>
		<td height="26" style="padding-left:5px; text-align:right;">编号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
	</tr>
	<tr>
		<td width="90px" style="text-align:right;border-left-style:none;">项目名称：</td>
		<td colspan="3" height="26" >${map['settleContract'].projectName}</td>
		<td height="26" style="padding-left:5px; text-align:right;">结算日期：${map['settleDate']}</td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table">
	<tr style="background-color:#E0E0E0; font-size: 10px;">
		<td rowspan="2" width="3%">序号</td>
		<!-- <td rowspan="2" width="4%">楼号</td> -->
		<td rowspan="2" width="5%">设备名称<br>及型号</td>
		<!-- <td rowspan="2" width="5%">规格型号</td> -->
		<td rowspan="2" width="5%">合同编号</td>
		<td rowspan="2" width="5%">起租日期</td>
		<td rowspan="2" width="8%">结算区间</td>
		<td rowspan="2" width="5%">本期使用天数</td>
		<td colspan="2" width="8%">月租金(元)</td>
		<td rowspan="2" width="5%">进退场费<br>(元)</td>
		<td rowspan="2" width="5%">操作人员工资<br>(元)</td>
		<td rowspan="2" width="5%">安全监控系统<br>(元)</td>
		<c:if test="${map['totalAfterTaxCompon']!='0'}">
		<td colspan="1" width="5%">加节费用</td>
		</c:if>
		<c:if test="${map['totalAfterTaxOther']!='0'}">
		<td colspan="1" width="5%">其他费用</td>
		</c:if>
		<td rowspan="2" width="3%">税率</td>
		<td rowspan="2" width="5%">税金<br>(元)</td>
		<!-- <td width="5%">伙食补贴</td> -->
		<td rowspan="2" width="5%">含税租赁费小计<br>(元)</td>
	</tr>
	<tr style="background-color:#E0E0E0; font-size: 10px;" >
		<!-- <td >台数</td> -->
		<td >不含税单价</td>
		<td >本期不含税金额</td>
		<!-- <td >台数</td>
		<td >单价</td> -->
		<!-- <td >金额</td> -->
		<!-- <td >台数</td>
		<td >单价</td> -->
		<!-- <td >金额</td> -->
		<!-- <td >台数</td>
		<td >单价</td> -->
		<!-- <td >金额</td> -->
		<!-- <td >台数</td>
		<td >单价</td> -->
		<c:if test="${map['totalAfterTaxCompon']!='0'}">
		<td >金额</td>
		</c:if>
		<!-- <td >台数</td>
		<td >单价</td> -->
		<c:if test="${map['totalAfterTaxOther']!='0'}">
		<td >金额</td>
		</c:if>
		<!-- <td >金额</td> -->
	</tr>
	<c:forEach var="element" items="${map['settleEquipBrief']}" varStatus="status">
	<tr style="font-size: 10px;">
		<td >${status.count}<br>${element["buildingNum"]}</td>
		<%-- <td >${element["buildingNum"]}</td> --%>
		<td >${element["equipCategoryName"]}<br>${element["equipSpecificName"]}</td>
		<%-- <td >${element["equipSpecificName"]}</td> --%>
		<%-- <c:if test="${status.count==1}"> --%>
		<td >${map['contractNo']}</td>
		<td >${element["activateDate"]}</td>
		<td >${element["interval"]}</td>
		<%-- </c:if> --%>
		<td >${element["settleDays"]}</td>
		<%-- <td >${element["quantityEquip"]}</td> --%>
		<td >${element["noTax"]}</td>
		<td >${element["afterTaxAmountEquip"]}</td>
		<%-- <td >${element["quantityItem"]}</td>
		<td >${element["unitpriceItem"]}</td> --%>
		<td >${element["afterTaxAmountItem"]}</td>
		<%-- <td >${element["quantityOperator"]}</td>
		<td >${element["unitpriceOperator"]}</td> --%>
		<td >${element["afterTaxAmountOperator"]}</td>
		<%-- <td >${element["quantitySafety"]}</td>
		<td >${element["unitpriceSafety"]}</td> --%>
		<td >${element["afterTaxAmountSafety"]}</td>
		<%-- <td >${element["quantityCompon"]}</td>
		<td >${element["unitpriceCompon"]}</td> --%>
		<c:if test="${map['totalAfterTaxCompon']!='0'}">
			<td >${element["afterTaxAmountCompon"]}</td>
		</c:if>
		<%-- <td >${element["quantityOther"]}</td>
		<td >${element["unitpriceOther"]}</td> --%>
		<c:if test="${map['totalAfterTaxOther']!='0'}">
			<td >${element["afterTaxAmountOther"]}</td>
		</c:if>
		<td >${element["taxRate"]}</td>
		<td >${element["taxes"]}</td>
		<%-- <td >${element["foodAllowance"]}</td> --%>
		<td >${element["afterTaxAmountEquip"]+element["afterTaxAmountItem"]+element["afterTaxAmountOperator"]+element["afterTaxAmountSafety"]+element["afterTaxAmountCompon"]+element["afterTaxAmountOther"]+element["taxes"]}</td>
	</tr>
	</c:forEach>
	<tr style="font-size: 10px;">
		<td colspan="2">合计</td>
		<td colspan="4"></td>
		<td ></td>
		<td >${map['totalAfterTaxEquip']}</td>
		<td >${map['totalAfterTaxItem']}</td>
		<td >${map['totalAfterTaxOperator']}</td>
		<td >${map['totalAfterTaxSafety']}</td>
		<c:if test="${map['totalAfterTaxCompon']!='0'}">
			<td >${map['totalAfterTaxCompon']}</td>
		</c:if>
		<c:if test="${map['totalAfterTaxOther']!='0'}">
			<td >${map['totalAfterTaxOther']}</td>
		</c:if>
		<td >0</td>
		<td >${totalTaxes}</td>
		<%-- <td >${totalFoodAllowance}</td> --%>
		<td >${map['totalAmount']}</td>
	</tr>
	<tr style="font-size: 10px;">
		<td width="8%" colspan="2">备注</td>
		<c:choose>
			<c:when test="${map['totalAfterTaxCompon']!='0' && map['totalAfterTaxOther']!='0'}"><td width="8%" colspan="14">${map['settleContract'].remark}</td></c:when>
			<c:when test="${map['totalAfterTaxCompon']!='0' && map['totalAfterTaxOther']=='0'}"><td width="8%" colspan="13">${map['settleContract'].remark}</td></c:when>
			<c:when test="${map['totalAfterTaxCompon']=='0' && map['totalAfterTaxOther']!='0'}"><td width="8%" colspan="13">${map['settleContract'].remark}</td></c:when>
			<c:when test="${map['totalAfterTaxCompon']=='0' && map['totalAfterTaxOther']=='0'}"><td width="8%" colspan="12">${map['settleContract'].remark}</td></c:when>
		</c:choose>
	</tr>
</table>

<table style="width: 100%; font-size: 10px;" class="hzb_table">   
	<tr style="background-color:#E0E0E0;">
		<td width="8%" colspan="2">累计结算金额（元）</td>
		<td width="8%" colspan="2">${map['settleContract'].summaryReceivable}</td>
		<td width="8%" colspan="2">累计付款金额（元）</td>
		<td width="8%" colspan="2">${map['settleContract'].receivedAmount}</td>
		<td width="8%" colspan="2">累计欠款金额（元）</td>
		<td width="8%" colspan="2">${map['settleContract'].arrears}</td>
	</tr>
</table>

<table style="width: 100%">
	<tr>
		<td align="left" width="150px">出 租 方(章)：${map['settleContract'].pbEntName}</td>
		<td width="150px" >承 租 方(章)：${map['settleContract'].paEntName}</td>
	</tr>
	<tr height="40">
		<td align="left" width="150px">经 办 人(签)：</td>
		<td width="90px">经 办 人(签)：</td>
	</tr>
	<tr>
		<td align="left" width="100px">日 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</td>
		<td width="50px" >日 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</td>
	</tr>
	<tr>
		<td align="left" width="150px" >单位名称：广西建工大都租赁有限公司</td>
	</tr>
	<tr>
		<td align="left" width="150px" >银行帐号：4500 1604 7520 5050 1031</td>
	</tr>
	<tr>
		<td align="left" width="150px" >开户银行：建行南宁市苏卢支行</td>
	</tr>
	<tr>
		<td align="left" width="60px" ></td>
		<td align="right">制表人： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
	</tr>
</table>
</div>
</c:forEach>
</center>
</body>
</html>