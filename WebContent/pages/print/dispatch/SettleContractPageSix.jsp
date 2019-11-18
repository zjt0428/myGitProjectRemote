<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>机械设备租赁款确认单</title>
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
<p style="text-align:center; "><span class="wrod_title">机 械 设 备 租 赁 款 确 认 单</span></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td height="26" width="50%" style="text-align:left;">承租单位：${map['settleContract'].paEntName}</td>
	</tr>
	<tr>
		<td style="padding-right:5px;border-left-style:none;">项目名称：${map['settleContract'].projectName}</td>
		<td height="26" style="padding-left:5px; text-align:right;">结算日期：${map['settleDate']}</td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table">
	<tr style="background-color:#E0E0E0; font-size: 10px;">
		<td rowspan="2" width="3%">序号</td>
		<td rowspan="2" width="5%">设备名称及型号</td>
		<td rowspan="2" width="8%">合同编号</td>
		<td rowspan="2" width="5%">起租日期</td>
		<td rowspan="2" width="8%">本期结算期间</td>
		<td rowspan="2" width="5%">本期使用天数</td>
		<td colspan="2" width="8%">月租金(元)</td>
		<td rowspan="2" width="5%">进退场费<br>/安装费(元)</td>
		<td rowspan="2" width="5%">操作人员<br>工资(元)</td>
		<!-- <td colspan="1" width="8%">安全监控系统</td> -->
		<td rowspan="2" width="5%">其他费用<br>(元)</td>
		<!-- <td width="5%">伙食补贴</td> -->
		<c:if test="${map['totalSummaryCompon']!='0'}">
			<td rowspan="2" width="5%">加节费用<br>(元)</td>
		</c:if>
		<td rowspan="2" width="5%">租赁费小<br>计(元)</td>
	</tr>
	<tr style="background-color:#E0E0E0; font-size: 10px;" >
		<td >单价</td>
		<td >本期金额</td>
	</tr>
	<c:forEach var="element" items="${map['settleEquipBrief']}" varStatus="status">
	<tr style="font-size: 10px;">
		<%-- <td >${element.get("buildingNum")}</td> --%>
		<td >${status.count}<br>${element["buildingNum"]}</td>
		<td >${element["equipCategoryName"]}<br>${element["equipSpecificName"]}</td>
		<td >${map["contractNo"]}</td>
		<td >${element["activateDate"]}</td>
		<td >${element["interval"]}</td>
		<td >${element["settleDays"]}</td>
		<td >${element["rentStandard"]}</td>
		<td >${element["summaryEquip"]}</td>
		<td >${element["summaryItem"]}</td>
		<td >${element["costTotal"]}</td>
		<%-- <td >${element["summarySafety"]}</td> --%>
		<td >${element["summaryOther"]}</td>
		<c:if test="${map['totalSummaryCompon']!='0'}">
			<td >${element["summaryCompon"]}</td>
		</c:if>
		<%-- <td >${element["foodAllowance"]}</td> --%>
		<td >${element["summaryEquip"]+element["summaryItem"]+element["costTotal"]+element["summaryOther"]+element["summaryCompon"]}</td>
	</tr>
	</c:forEach>
	<c:forEach var="element" items="${map['safetyMonitorSettle']}" varStatus="status">
	<tr style="font-size: 10px;">
		<td >${status.count}<br>${element["buildingNum"]}</td>
		<td >安全监控系统</td>
		<td >${map["contractNo"]}</td>
		<td >${element["activateDate"]}</td>
		<td >${element["interval"]}</td>
		<td >${element["settleDays"]}</td>
		<td >${element["unitpriceSafety"]}</td>
		<td >${element["costSafety"]}</td>
		<td >${element["installFee"]}</td>
		<td ></td>
		<td ></td>
		<c:if test="${map['totalSummaryCompon']!='0'}">
			<td ></td>
		</c:if>
		<td >${element["summarySafety"]}</td>
	</tr>
	</c:forEach>
	<tr style="font-size: 10px;">
		<td colspan="2">合计</td>
		<td colspan="4"></td>
		<td ></td>
		<td >${map['totalSummaryEquip']+map['totalCostSafety']}</td>
		<td >${map['totalSummaryItem']+map['totalInstallFee']}</td>
		<td >${map['totalCostTotalOperator']}</td>
		<td >${map['totalSummaryOther']}</td>
		<c:if test="${map['totalSummaryCompon']!='0'}">
			<td >${map['totalSummaryCompon']}</td>
		</c:if>
		<td >${map['totalAmount']}</td>
	</tr>
	<tr style="font-size: 10px;">
		<td width="8%" colspan="2">备注</td>
		<td width="8%" colspan="10">${map['settleContract'].remark}</td>
		<c:if test="${map['totalSummaryCompon']!='0'}">
			<td ></td>
		</c:if>
	</tr>
</table>

<table style="width: 100%" class="hzb_table">   
	<tr style="background-color:#E0E0E0; font-size: 10px;">
		<td width="8%" colspan="2">累计应收租赁款（元）</td>
		<td width="8%" colspan="2">${map['settleContract'].summaryReceivable}</td>
		<td width="8%" colspan="2">累计已收租赁款（元）</td>
		<td width="8%" colspan="2">${map['settleContract'].receivedAmount}</td>
		<td width="8%" colspan="2">尚欠款（元）</td>
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
		<td align="left" width="100px">日期:   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月  &nbsp;&nbsp;&nbsp;&nbsp;  日</td>
		<td width="50px" >日期： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  月  &nbsp;&nbsp;&nbsp;&nbsp;  日</td>
	</tr>
	<tr>
		<td align="left" width="150px" >单位名称：广西建工大都租赁有限公司</td>
	</tr>
	<tr>
		<td align="left" width="150px" >银行帐号：4500 1604 7520 5050 1031</td>
	</tr>
	<tr>
		<td align="left" width="150px" >开户银行：中国建设银行股份有限公司南宁苏卢支行</td>
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