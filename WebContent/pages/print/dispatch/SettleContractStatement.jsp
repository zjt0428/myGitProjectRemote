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
<%
	String basePath=request.getContextPath();
%>
<script type="text/javascript" src="<%=basePath%>/js/print/LodopFuncs.js"></script>
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
<center class="Noprint" id="notPrint" >
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" id="btnPrint" style="font-size: 12px" value="直接打印" onclick="printRecord(),window.print()" />
		<input type="button"  style="font-size: 12px" value="打印预览" onclick="printReview()" />
		<!-- <input type="button" style="font-size:12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size:12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)"> -->
	</p>
</center>
<center	id="center_print">
<c:forEach var="map" items="${printList}" varStatus="varSta">
<div class="hzbmain_detail">
	<p style="text-align:center; "><span class="wrod_title">机  械  设  备  月  租  金  结  算  单</span></p>
	<p style="text-align:center; padding-bottom:10px;"><span><b>（${map['titleDate']}）</b></span></p>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="26" width="90px" style=" text-align:right;">承租单位：</td>
			<td height="26" >${map['settleContract'].paEntName}</td>
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
			<td rowspan="2" width="4%">楼号</td>
			<td rowspan="2" width="5%">设备名称及型号</td>
			<td rowspan="2" width="5%">合同编号</td>
			<td rowspan="2" width="5%">起租日期</td>
			<td rowspan="2" width="8%">结算区间</td>
			<td rowspan="2" width="8%">本期使用天数</td>
			<td colspan="2" width="8%">月租金</td>
			<td colspan="1" width="8%">进退场费用</td>
			<td colspan="1" width="8%">操作人员工资</td>
			<td colspan="1" width="8%">安全监控系统</td>
			<c:if test="${map['totalSummaryCompon']!='0'}">
				<td colspan="1" width="8%">加节费用</td>
			</c:if>
			<c:if test="${map['totalSummaryOther']!='0'}">
				<td colspan="1" width="8%">其他费用</td>
			</c:if>
			<td rowspan="2" width="5%">结算金额小计</td>
		</tr>
		<tr style="background-color:#E0E0E0; font-size: 10px;" >
			<td >单价</td>
			<td >金额</td>
			<td >金额</td>
			<td >金额</td>
			<td >金额</td>
			<c:if test="${map['totalSummaryCompon']!='0'}">
				<td >金额</td>
			</c:if>
			<c:if test="${map['totalSummaryOther']!='0'}">
				<td >金额</td>
			</c:if>
		</tr>
		<c:forEach var="element" items="${map['settleEquipBrief']}" varStatus="status">
		<tr style="font-size: 10px;">
			<td >${status.count}</td>
			<td >${element["buildingNum"]}</td>
			<td >${element["equipCategoryName"]}<br>${element["equipSpecificName"]}</td>
			<td >${map['contractNo']}</td>
			<td >${element["activateDate"]}</td>
			<td >${element["interval"]}</td>
			<td >${element["settleDays"]}</td>
			<td >${element["rentStandard"]}</td>
			<td >${element["summaryEquip"]}</td>
			<td >${element["summaryItem"]}</td>
			<td >${element["costTotal"]}</td>
			<td >${element["summarySafety"]}</td>
			<c:if test="${map['totalSummaryCompon']!='0'}">
				<td >${element["summaryCompon"]}</td>
			</c:if>
			<c:if test="${map['totalSummaryOther']!='0'}">
				<td >${element["summaryOther"]}</td>
			</c:if>
			<td >${element["summaryEquip"]+element["summaryItem"]+element["costTotal"]+element["summaryCompon"]+element["summarySafety"]+element["summaryOther"]}</td>
		</tr>
		</c:forEach>
		<tr style="font-size: 10px;">
			<td colspan="2">合计</td>
			<td colspan="5"></td>
			<td ></td>
			<td >${map['totalSummaryEquip']}</td>
			<td >${map['totalSummaryItem']}</td>
			<td >${map['totalCostTotal']}</td>
			<td >${map['totalSummarySafety']}</td>
			<c:if test="${map['totalSummaryCompon']!='0'}">
				<td >${map['totalSummaryCompon']}</td>
			</c:if>
			<c:if test="${map['totalSummaryOther']!='0'}">
				<td >${map['totalSummaryOther']}</td>
			</c:if>
			<td >${map['totalAmount']}</td>
		</tr>
		<tr style="font-size: 10px;">
			<td width="8%" colspan="2">备注</td>
			<c:choose>
				<c:when test="${map['totalSummaryCompon']!='0' && map['totalSummaryOther']!='0'}"><td width="8%" colspan="13">${map['settleContract'].remark}</td></c:when>
				<c:when test="${map['totalSummaryCompon']!='0' && map['totalSummaryOther']=='0'}"><td width="8%" colspan="12">${map['settleContract'].remark}</td></c:when>
				<c:when test="${map['totalSummaryCompon']=='0' && map['totalSummaryOther']!='0'}"><td width="8%" colspan="12">${map['settleContract'].remark}</td></c:when>
				<c:when test="${map['totalSummaryCompon']=='0' && map['totalSummaryOther']=='0'}"><td width="8%" colspan="11">${map['settleContract'].remark}</td></c:when>
			</c:choose>
		</tr>
	</table>

	<table style="width: 100%" class="hzb_table">   
		<tr style="background-color:#E0E0E0; font-size: 10px;">
			<td width="8%" colspan="2">累计结算金额（元）</td>
			<td width="8%" colspan="2">${map['settleContract'].summaryReceivable}</td>
			<td width="8%" colspan="2">累计付款金额（元）</td>
			<td width="8%" colspan="2">${map['settleContract'].receivedAmount}</td>
			<td width="8%" colspan="2">累计欠款金额（元）</td>
			<td width="8%" colspan="2">${map['settleContract'].arrears}</td>
			<td width="8%" colspan="4">&nbsp;</td>
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
			<td align="left" width="100px">日 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  月  &nbsp;&nbsp;&nbsp;&nbsp;  日</td>
			<td width="50px" >日 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  月  &nbsp;&nbsp;&nbsp;&nbsp;  日</td>
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
<div style="page-break-after: always;"></div>
</c:forEach>
</center>
</body>
<script>
	/*var beforePrint = function() {
	    console.log('Functionality to run before printing.');
	};
	
	var afterPrint = function() {
	    console.log('Functionality to run after printing');
	};
	
	if (window.matchMedia) {
	    var mediaQueryList = window.matchMedia('print');
	    mediaQueryList.addListener(function(mql) {
	        if (mql.matches) {
	            beforePrint();
	        } else {
	            afterPrint();
	        }
	    });
	}
	window.onbeforeprint = beforePrint;
	window.onafterprint = afterPrint; */
	
</script>
<script type="text/javascript">

	function printReview() {
		var LODOP=getLodop();
		LODOP.PRINT_INIT("机械设备月租金结算单");               //首先一个初始化语句 
		LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");					//横向打印，A4纸张
		//LODOP.ADD_PRINT_TEXT(0,0,100,20,"文本内容一");//然后多个ADD语句及SET语句
		//var printHtml = document.getElementsByTagName("html")[0].outerHTML;
		//var printHtml0 = document.getElementsByTagName("html")[0].innerHTML;
		var printHtml = document.documentElement.innerHTML;
		var hiddenHtml = document.getElementById("notPrint").innerHTML;
		printHtml = printHtml.replace(hiddenHtml,"");
		LODOP.ADD_PRINT_HTM(0, 0, "100%","100%", printHtml);
		LODOP.PREVIEW();                               //最后一个打印(或预览、维护、设计)语句
		//LODOP.PRINT();
		var pid = "";
		LODOP.On_Return=function(TaskID,Value){
			pid=Value;
			 alert("TaskID"+TaskID,"Value"+Value);
		};
		var strResult=LODOP.GET_VALUE("PRINT_STATUS_OK",pid);
		if (!LODOP.CVERSION) return strResult; else return "";	
	}
</script>
</html>