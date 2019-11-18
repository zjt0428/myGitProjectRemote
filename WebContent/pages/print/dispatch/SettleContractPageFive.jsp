<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<%
	String basePath=request.getContextPath();
%>
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
	</p>
</center>
<center>
<c:forEach var="map" items="${printList}" varStatus="varSta">
<div class="hzbmain_detail">
<p style="text-align:center; "><span class="wrod_title">机  械  设  备  月  租  金  结  算  单</span></p>
<p style="text-align:center; padding-bottom:10px;"><span><b>（${map['titleDate']}）</b></span></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td height="26" width="50%" style="padding-left:5px; text-align:left;">承租方：${map['settleContract'].paEntName}</td>
		<td height="26" style="padding-left:5px; text-align:left;">出租方：${map['settleContract'].pbEntName}</td>
	</tr>
	<tr>
		<td style="padding-right:5px;border-left-style:none;">工地名称：${map['settleContract'].projectName}</td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table">
	<tr style="background-color:#E0E0E0; font-size: 10px;">
		<td rowspan="2" width="3%">序号</td>
		<td rowspan="2" width="5%">设备名称</td>
		<td rowspan="2" width="5%">规格型号</td>
		<td rowspan="2" width="5%">合同编号</td>
		<td rowspan="2" width="5%">起租日期</td>
		<td rowspan="2" width="8%">结算区间</td>
		<td colspan="3" width="8%">月租金</td>
		<td colspan="3" width="8%">进退场费用</td>
		<td colspan="3" width="8%">操作人员工资</td>
		<td rowspan="1" width="5%">伙食补贴</td>
		<td rowspan="2" width="5%">结算金额小计(元)</td>
	</tr>
	<tr style="background-color:#E0E0E0; font-size: 10px;" >
		<td >台数<br>(台)</td>
		<td >单价<br>(元/台)</td>
		<td >金额(元)</td>
		<td >台数(台)</td>
		<td >单价<br>(元/台)</td>
		<td >金额(元)</td>
		<td >人数<br>(包月/台)</td>
		<td >单价<br>(元/月)</td>
		<td >金额(元)</td>
		<td >金额(元)</td>
	</tr>
	<c:forEach var="element" items="${map['settleEquipBrief']}" varStatus="status">
	<tr style="font-size: 10px;">
		<td >${status.count}</td>
		<td >${element["equipCategoryName"]}</td>
		<td >${element["equipSpecificName"]}</td>
		<td >${map['contractNo']}</td>
		<td >${element["activateDate"]}</td>
		<td >${element["interval"]}</td>
		<td >${element["quantityEquip"]}</td>
		<td >${element["rentStandard"]}</td>
		<td >${element["summaryEquip"]}</td>
		<td >${element["quantityItem"]}</td>
		<td >${element["unitpriceItem"]}</td>
		<td >${element["summaryItem"]}</td>
		<td >${element["quantityOperator"]}</td>
		<td >${element["unitpriceOperator"]}</td>
		<td >${element["summaryOperator"]}</td>
		<td >${element["foodAllowance"]}</td>
		<td >${element["summaryEquip"]+element["summaryItem"]+element["summaryOperator"]+element["foodAllowance"]}</td>
	</tr>
	</c:forEach>
	<tr style="font-size: 10px;">
		<c:if test="${map['totalSummaryOther']!='0'}">
			<td width="3%" colspan="1"><c:out value="${fn:length(map['settleEquipBrief'])+1}"></c:out></td>
			<td width="8%" colspan="15">其他费用</td>
			<td width="8%" colspan="1">${map['totalSummaryOther']}</td>
		</c:if>
	</tr>
	<tr style="font-size: 10px;">
		<c:if test="${map['totalSummarySafety']!='0'}">
			<c:choose>
				<c:when test="${map['totalSummaryOther']!='0'}"><td width="3%" colspan="1"><c:out value="${fn:length(map['settleEquipBrief'])+2}"></c:out></td></c:when>
				<c:when test="${map['totalSummaryOther']=='0'}"><td width="3%" colspan="1"><c:out value="${fn:length(map['settleEquipBrief'])+1}"></c:out></td></c:when>
			</c:choose>
			<!-- <td width="3%" colspan="1"></td> -->
			<td width="8%" colspan="15">安全监控系统</td>
			<td width="8%" colspan="1">${map['totalSummarySafety']}</td>
		</c:if>
	</tr>
	<tr style="font-size: 10px;">
		<c:if test="${map['totalSummaryCompon']!='0'}">
			<c:choose>
				<c:when test="${map['totalSummaryOther']!='0' && map['totalSummarySafety']!='0'}"><td width="3%" colspan="1"><c:out value="${fn:length(map['settleEquipBrief'])+3}"></c:out></td></c:when>
				<c:when test="${map['totalSummaryOther']!='0' && map['totalSummarySafety']=='0'}"><td width="3%" colspan="1"><c:out value="${fn:length(map['settleEquipBrief'])+2}"></c:out></td></c:when>
				<c:when test="${map['totalSummaryOther']=='0' && map['totalSummarySafety']=='0'}"><td width="3%" colspan="1"><c:out value="${fn:length(map['settleEquipBrief'])+1}"></c:out></td></c:when>
			</c:choose>
			<!-- <td width="3%" colspan="1"></td> -->
			<td width="8%" colspan="15">加节费用</td>
			<td width="8%" colspan="1">${totalSummaryCompon}</td>
		</c:if>
	</tr>
	<tr style="font-size: 10px;">
		<td width="3%" colspan="1">备注</td>
		<td width="8%" colspan="16">${map['settleContract'].remark}</td>
	</tr>
	<tr style="font-size: 10px;">
		<td colspan="2">合计(元)</td>
		<td colspan="4"></td>
		<td ></td>
		<td >0</td>
		<td >${map['totalSummaryEquip']}</td>
		<td >0</td>
		<td >0</td>
		<td >${map['totalSummaryItem']}</td>
		<td >0</td>
		<td >0</td>
		<td >${totalSalary}</td>
		<td >${map['totalFoodAllowance']}</td>
		<td >${map['totalAmount']}</td>
	</tr>
	<tr style="background-color:#E0E0E0; font-size: 10px;">
		<td width="8%" colspan="3">累计结算金额:<br>（元）</td>
		<td width="8%" colspan="3">${map['settleContract'].summaryReceivable}</td>
		<td width="8%" colspan="2">累计支付金额:<br>（元）</td>
		<td width="8%" colspan="3">${map['settleContract'].receivedAmount}</td>
		<td width="8%" colspan="2">累计欠付金额:<br>（元）</td>
		<td width="8%" colspan="4">${map['settleContract'].arrears}</td>
	</tr>
</table>

<table style="width: 100%">
	<tr>
		<td align="left" width="150px" colspan="3">承租方：${map['settleContract'].paEntName}</td>
		<td width="90px" >出租方：${map['settleContract'].pbEntName}</td>
	</tr>
	<tr height="30">
		<td align="left" width="30px">项目经理：</td>
		<td width="30px" >制表人：</td>
		<td width="30px" >商务负责人：</td>
		<td width="90px" >经办人：</td>
	</tr>
	<tr>
		<td align="left" width="100px" colspan="3">日期：</td>
		<td width="50px" >日期：</td>
	</tr>
		<tr>
		<td align="left" width="60px" >主管领导：</td>
		<td width="30px" colspan="2">材料设备科：</td>
		<td  width="50px" >商务科：</td>
	</tr>
</table>
</div>
</c:forEach>
</center>
</body>
</html>