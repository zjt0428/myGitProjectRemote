<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.lang.Math" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>丢失赔偿单</title>

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
.sp{
	font-size:13px;
	text-align : center;

}
.main_detail_0523{width:755px; margin:0px 0px 0px -60px; height:370px; font-size:16px;}
</style>

</head>
<body>

<c:set var="countNumber" value="${fn:length(lostCompensation.lostCompensationDetailSet)}" scope="application"></c:set>
<c:set var="count" value="${((fn:length(lostCompensation.lostCompensationDetailSet))-(fn:length(lostCompensation.lostCompensationDetailSet)%9))/9}" scope="application"></c:set>
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

<div class="main_detail_0523">
	<c:if test="${countNumber%9==0&&countNumber!=0}">
		<c:set var="count" value="${count-1}" scope="application"></c:set>
	</c:if>
	<c:if test="${(fn:length(lostCompensation.lostCompensationDetailSet)!=0)&&(fn:length(lostCompensation.lostCompensationDetailSet)%9==0)}">
		<c:set var="countNumber" value="${fn:length(lostCompensation.lostCompensationDetailSet)-1}" scope="application"></c:set>
	</c:if>
	<c:forEach var="v" begin="0" end="${count}"  varStatus="loop">
		<table  width="100%" height="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px;overflow: hidden;" >
			<tr valign="bottom">
				<td height="120px">
					<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
						<tr>
							<td  width="30%"  rowspan="2" >
								<table width="100%" height="100%">
									<tr></tr>
									<tr>
										<td width="38%"></td>
										<td width="24%" align="center" style="border: solid 1.5px;font-size: 18px;">丢失</td>
										<td width="38%"></td>
									</tr>
									<tr></tr>
								</table>
							</td>
							<td  width="30%" align="center"  rowspan="2"><font size=3px style="font-weight:bold;">广西建工大都租赁有限公司<br>周转材料丢失赔偿单</font></td>
							<td rowspan="2">
								<div>
									<img src='<%=request.getContextPath() %>/image-widget?method=qrcode&contents={relateId:${lostCompensation.lostId};relateModule : LOST_COMPENSATION}' height=80 width=89/>
								</div>
							</td>
							<td width="27%" valign="middle" align="right" >
								<font size=1px>
									<%= (new java.util.Date()).toLocaleString()%>  <script type="text/javascript">document.write('第1次打印');</script>
								</font>
							</td>
						</tr>
						<tr>
							<td width="27%" valign="bottom" align="right" >
								<font size=1px>第${v+1}页,共<fmt:formatNumber value="${count+1}" pattern="#"/>页</font>
							</td>
						</tr>
					</table>
					<table width="100%" class="tabp" border="0" align="center" cellpadding="0" cellspacing="0"  >
<%-- 						<tr style="border-bottom: 1px">
							<th class="tdp">合同编号:</th>
							<td class="tdp">&nbsp;${lostCompensation.contractMaterials.contractSerial}</td>
							<th class="tdp">丢失赔偿时间:</th>
							<td class="tdp">&nbsp;${lostCompensation.compensationDate}</td>
							<th class="tdp">丢失单号:</th>
							<td class="tdp">&nbsp;${lostCompensation.lostSerial}</td>
						</tr>
						<tr style="border-bottom: 1px">	
							<th class="tdp">项目名称:</th>
							<td class="tdp" colspan="2">&nbsp;${lostCompensation.projectName}</td>
							<th class="tdp">项目地址:</th>
							<td class="tdp" colspan="2">&nbsp;${address}</td>
						</tr> --%>
						<tr style="border-bottom: 1px">
							<th width="10%" class="tdp">合同编号:</th>
							<td width="25%" class="tdp">&nbsp;${lostCompensation.contractMaterials.contractSerial}</td>
							<th width="13%" class="tdp">丢失赔偿时间:</th>
							<td width="20%" class="tdp">&nbsp;${lostCompensation.compensationDate}</td>
							<th width="10%" class="tdp">丢失单号:</th>
							<td width="22%" class="tdp">&nbsp;${lostCompensation.lostSerial}</td>
						</tr>
						<tr style="border-bottom: 1px">	
							<th width="10%" class="tdp">项目名称:</th>
							<td width="15%" class="tdp" colspan="2">&nbsp;${lostCompensation.projectName}</td>
							<th width="10%" class="tdp">项目地址:</th>
							<td width="65%" class="tdp" colspan="2">&nbsp;${address}</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr valign="top">
				<td height="216px">
					<table width="100%" class="tabp"  border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px">
						<tr style="border-bottom: 1px">
							<th class="tdp" width="5%">序号</th>
							<th class="tdp" width="16%">周材品名</th>
							<th class="tdp" width="23%">规格型号</th>
							<th class="tdp" width="7%">单位</th>
							<th class="tdp" width="8%">数量</th>
							<th class="tdp" width="10%">辅助单位</th>
							<th class="tdp" width="10%">辅助数量</th>
							<th class="tdp" width="9%">丢失单价</th>
							<th class="tdp" width="12%">丢赔金额</th>
						</tr>
						<c:forEach var="element" items="${lostCompensation.lostCompensationDetailSet}" varStatus="status" begin="${9*v}" end="${9*v+8 }">
							<tr>
								<td class="tdc" width="5%">${status.count+9*v}</td>
								<td class="tdc" width="16%">${element.commodity}</td>
								<td class="tdc" width="23%">${element.specifications}</td>
								<td class="tdc" width="7%">${element.unit}</td>
								<td class="tdc" width="8%">${element.lostQuantity}</td>
								<td class="tdc" width="10%">${element.supplementUnit}</td>
								<td class="tdc" width="10%">${element.supplementQuantity}</td>
								<td class="tdc" width="9%">${element.compensationCosts}</td>
								<td class="tdc" width="12%">${element.totalCosts}</td>
							</tr>
						</c:forEach>
					</table>
					<c:if test="${v==count}">
						<table  width="100%" border="1" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
							<tr>
								<td width="50%" style="font-size:13px;text-align:center">合计</td>
								<td width="50%"  style="font-size:13px;text-align:center">${allCost }</td>
							</tr>
						</table>
					</c:if>
				</td>
			</tr>
			<tr valign="bottom">
				<td height="34px">
					<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
						<tr>
							<td class="tda">一联存根(白色黑字)</td>
							<td class="tda">二联材料设备部(粉)</td>
							<td class="tda" >三联承租单位(黄)</td>
							<td class="tda" >四联服务大厅(粉蓝)</td>
							<td class="tda" >五联财务科(粉绿)</td>
							<td class="tda">六联工地(白蓝)</td>
						</tr>
					</table>
					<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
						<tr>
							<td class="tda" width="25%"><font style="font-weight:bold;">承租单位：</font></td>
							<td class="tda" width="25%"><font style="font-weight:bold;">服务大厅：</font></td>
							<td class="tda" width="25%"><font style="font-weight:bold;">审计复核：</font></td>
							<td class="tda" width="25%"><font style="font-weight:bold;">制单人：</font>${lostCompensation.userName}</td>
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