<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.lang.Math" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>发货调度单</title>

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
	font-size: 12px;
	padding: 0px 0px 0px 0px;
}

.tabp {
	margin-top: 0px;
	border-color: #000000 #000000 #000000 #000000;
	border-style: solid;
	border-top-width: 1px;
	border-right-width: 2px;
	border-bottom-width: 2px;
	border-left-width: 1px;
}

.tdp {
	height : 18px;
	font-size: 13px;
	border-bottom: 0 solid #000000;
	border-left: 1px solid #000000;
	border-right: 0 solid #000000;
	border-top: 1px solid #000000;
}

.tda {

	font-size: 13px;
	border-bottom: 0 solid #000000;
	border-left: 0 solid #000000;
	border-right: 0 solid #000000;
	border-top: 0 solid #000000;
}

.tdc {

	font-size: 14px;
	text-align: center;
	border-bottom: 0 solid #000000;
	border-left: 1px solid #000000;
	border-right: 0 solid #000000;
	border-top: 1px solid #000000;
}

.ftdp {
	height: 60px;
	font-weight: bold;
	font-size: 30px;
}

.main_detail_0523{width:755px; margin:0px 0px 0px -60px; height:370px;font-size:16px;}
</style>

</head>
<body>

<c:set var="countNumber" value="${fn:length(dispatchComponentSet)}" scope="application"></c:set>
<c:set var="count" value="${((fn:length(dispatchComponentSet))-(fn:length(dispatchComponentSet)%9))/9}" scope="application"></c:set>
<center class="Noprint">
	<p align="right">
		<!-- <object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)"> -->
		<input id="btnPrint" value="直接打印" type="button" onclick="window.print()"/>  
	</p>
</center>
<center>
<!-- <br/> -->

<div class="main_detail_0523">
	<c:if test="${countNumber%9==0&&countNumber!=0}">
		<c:set var="count" value="${count-1}" scope="application"></c:set>
	</c:if>
	<c:if test="${(fn:length(dispatchComponentSet)!=0)&&(fn:length(dispatchComponentSet)%9==0)}">
		<c:set var="countNumber" value="${fn:length(dispatchComponentSet)-1}" scope="application"></c:set>
	</c:if>
	<c:forEach var="v" begin="0" end="${count}" varStatus="loop" >
	<table  width="100%" height="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px;overflow: hidden;" >
		<tr valign="bottom">
			<td height="120px">
			<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
				<tr>
					<td width="33%" valign="bottom" align="left" height="28"></td>
					<td  width="34%" align="center" rowspan="2"><font size=3px style="font-weight:bold;">广西建工大都租赁有限公司<br>机械发货调度单</font></td>
					<td  width="33%" rowspan="2"></td>
				</tr>
				<tr>
					<td width="33%" valign="bottom" align="left" >
						<font size=1px>
							<%= (new java.util.Date()).toLocaleString()%>  <script type="text/javascript">document.write('第1次打印');</script>
						</font>
					</td>
				</tr>
			</table>
			<table width="100%" class="tabp" border="0" align="center" cellpadding="0" cellspacing="0"  >
				<tr style="border-bottom: 1px">
					<th width="10%" class="tdp">出库仓库:</th>
					<td width="25%" class="tdp">&nbsp;${dispatch.deliveryEntName}</td>
					<th width="10%" class="tdp">调度时间:</th>
					<td width="22%" class="tdp">&nbsp;${dispatch.providedDate}</td>
					<th width="10%" class="tdp">调度单号:</th>
					<td width="28%" class="tdp">&nbsp;${dispatch.dispatchSerial}</td>
				</tr>
				<tr style="border-bottom: 1px">	
					<th width="10%" class="tdp">合同编号:</th>
					<td width="25%" class="tdp">&nbsp;${dispatch.relateSerial}</td>
					<th width="10%" class="tdp">项目名称:</th>
					<td width="55%" class="tdp" colspan="3">&nbsp;${dispatch.projectName}</td>
				</tr>
			</table>
			</td>
		</tr>
		<tr valign="top">
			<td  height="206px">
			<table width="100%" class="tabp"  border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px">
				<tr style="border-bottom: 1px">
					<th class="tdp">序号</th>
					<th class="tdp">生产厂家</th>
					<th class="tdp">设备型号</th>
					<th class="tdp">设备编号</th>
					<th class="tdp">配件名称</th>
					<th class="tdp">单位</th>
					<th class="tdp">数量</th>
					<th class="tdp">备注</th>
				</tr>
				<c:forEach var="element" items="${dispatchComponentSet}" varStatus="status" begin="${9*v}" end="${9*v+8 }">
					<tr>
						<td class="tdc">${status.count+9*v}</td>
						<td class="tdc">${element.equipVenderName}</td>
						<td class="tdc">${element.componSpecificName}</td>
						<td class="tdc">${element.componSerial}</td>
						<td class="tdc">${element.componGenericName}</td>
						<td class="tdc">${element.calculate}</td>
						<td class="tdc">${element.inuseCounts}</td>
						<td class="tdc">${element.storeName}</td>
					</tr>
				</c:forEach>
			</table>
			</td>
		</tr>
		<tr valign="bottom">
			<td height="34px">
			<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
				<tr>
					<td class="tda" width="33%" >一联存根（白色黑字）</td>
					<td class="tda" width="33%" >二联（粉色）</td>
					<td class="tda" width="34%" >三联收发留存（黄色）</td>
				</tr>
				<tr>
					<td class="tda" width="33%" >四联现场装车（粉蓝）</td>
					<td class="tda" width="33%" >五联现场装车（粉绿）</td>
					<td class="tda" width="34%" >六联现场装车（白色蓝字）</td>
				</tr>
			</table>
			<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
				<tr>
					<td class="tda" width="30%"><font style="font-weight:bold;">签名：</font>&nbsp;&nbsp;</td>
					<td class="tda" width="20%"><font style="font-weight:bold;">制单人：</font>&nbsp;&nbsp;${dispatch.userName}</td>
				</tr>
			</table>
			</td>
		</tr>
	</table>
		<c:if test="${!loop.last}">
			<div style="height : 25px"></div>
		</c:if>
	</c:forEach>

</div>
</center>

</body>
</html>