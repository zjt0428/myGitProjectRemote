<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.lang.Math" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>退货回收单</title>

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
.sp {
	font-size: 14px;
	text-align: left;
	border-top: 0px solid #000000;
	border-bottom: 2px solid #000000;
	border-left: 1px solid #000000;
	border-right: 2px solid #000000;
}
.sp2 {
	font-size: 14px;
	text-align: center;
	border-bottom: 2px solid #000000;
	border-left: 2px solid #000000;
}
.main_detail_0523{width:755px; margin:0px 0px 0px -60px; height:370px;font-size:16px;}
</style>

</head>
<body>

<c:set var="countNumber" value="${fn:length(recycleManage.recycleManageDetailSet)}" scope="application"></c:set>
<c:set var="feeLength" value="${fn:length(recycleManage.recycleManageFeeSet)}" scope="application"></c:set>
<c:set var="damageLength" value="${fn:length(recycleManage.compensationDamageSet)}" scope="application"></c:set>
<c:set var="storageLength" value="${fn:length(recycleManage.temporaryStorageSet)}" scope="application"></c:set>
<c:set var="count" value="${((fn:length(recycleManage.recycleManageDetailSet))-(fn:length(recycleManage.recycleManageDetailSet)%9))/9}" scope="application"></c:set>
<center class="Noprint">
	<p align="right">
	<!-- 	<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)"> -->
		<input id="btnPrint" value="直接打印" type="button" onclick="window.print()"/>  
	</p>
	
</center>
<center>

<div class="main_detail_0523">
	<c:if test="${countNumber%9==0&&countNumber!=0&&feeLength==0&&damageLength==0&&storageLength==0}">
		<c:set var="count" value="${count-1}" scope="application"></c:set>
	</c:if>
	<!-- 判断是否增加页数 -->
	<c:if test="${countNumber%9==7&&(
		(feeLength>0&&damageLength==0&&storageLength==0)
		||(feeLength==0&&damageLength>0&&storageLength==0)
		||(feeLength==0&&damageLength==0&&storageLength>0))}">
		<c:set var="count" value="${count+1}" scope="application"></c:set>
	</c:if>
	<c:if test="${countNumber%9>=6&&(
			(feeLength>0&&damageLength>0) || (damageLength>0&&storageLength>0) || (feeLength>0&&storageLength>0)) }">
			<c:set var="count" value="${count+1}" scope="application"></c:set>
	</c:if>
	<c:if test="${feeLength>9&&(damageLength>0||storageLength>0)}">
		<c:set var="count" value="${count+1}" scope="application"></c:set>
	</c:if>
	
	<c:if test="${(fn:length(recycleManage.recycleManageDetailSet)!=0)&&(fn:length(recycleManage.recycleManageDetailSet)%9==0)}">
		<c:set var="countNumber" value="${fn:length(recycleManage.recycleManageDetailSet)-1}" scope="application"></c:set>
	</c:if>
	
	<c:forEach var="v" begin="0" end="${count}"  varStatus="loop">
		<table  width="100%" height="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px;overflow: hidden;" >
			<tr valign="bottom">
				<td height="120px">
					<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
						<tr>
							<!-- <td width="33%" valign="bottom" align="left" height="28"></td> -->
							<td  width="30%" rowspan="2">
								<table width="100%" height="100%">
									<tr></tr>
									<tr>
										<td width="38%"></td>
										<td width="24%" align="center" style="border: solid 1.5px;font-size: 18px;">回收</td>
										<td width="38%"></td>
									</tr>
									<tr></tr>
								</table>
							</td>
							<td  width="30%" align="center" rowspan="2"><font size=3px style="font-weight:bold;">天元建设集团有限公司<br>周转材料退货回收单</font></td>
							<td rowspan="2">
								<div align="right">
									<img src='<%=request.getContextPath() %>/image-widget?method=qrcode&contents={relateId:${recycleManage.recycleId};relateModule : RECYCLE_MANAGE}' height=80 width=89/>
								</div>
							</td>
							<td width="27%" valign="middle" align="right" >
								<font size=1px>
									<%= (new java.util.Date()).toLocaleString()%>  <script type="text/javascript">document.write('第1次打印');</script>
								</font><br><br>
								<font size=1px>编号：${unAccessGather}</font>
							</td>
						</tr>
						<tr>
							<td width="23%" valign="bottom" align="right" >
								<font size=1px>第${v+1}页,共<fmt:formatNumber value="${count+1}" pattern="#"/>页</font>
							</td>
						</tr>
					</table>
					<table width="100%" class="tabp" border="0" align="center" cellpadding="0" cellspacing="0"  >
						<tr style="border-bottom: 1px">
							<th width="10%" class="tdp">回收仓库:</th>
							<td width="15%" class="tdp">&nbsp;${recycleManage.baseDepot.depotName}</td>
							<th width="10%" class="tdp">回收类型:</th>
							<td width="10%" class="tdp">&nbsp;${recycleManage.recycleTypeName}</td>
							<th width="10%" class="tdp">回收时间:</th>
							<td width="16%" class="tdp">&nbsp;${recycleDate}</td>
							<th width="10%" class="tdp">回收单号:</th>
							<td width="19%" class="tdp">&nbsp;${recycleManage.recycleSerial}</td>
						</tr>
						<tr style="border-bottom: 1px">	
							<th width="10%" class="tdp">合同编号:</th>
							<td width="15%" class="tdp" colspan="2">&nbsp;${recycleManage.contractMaterials.contractSerial}</td>
							<th width="10%" class="tdp">项目名称:</th>
							<td width="65%" class="tdp" colspan="4">&nbsp;${recycleManage.contractMaterials.projectName}</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr valign="top">
				<td  height="206px">
					<table width="100%" class="tabp"  border="0" align="center" cellpadding="1" cellspacing="0" style="margin-top: -2px">
						<tr style="border-bottom: 1px">
							<th class="tdp" width="4.5%">序号</th>
							<th class="tdp" width="14%">周材品名</th>
							<th class="tdp" width="21%">规格型号</th>
							<th class="tdp" width="4.5%">单位</th>
							<th class="tdp" width="7%">数量</th>
							<th class="tdp" width="8%">辅助单位</th>
							<th class="tdp" width="10%">辅助数量</th>
							<th class="tdp">备注</th>
						</tr>
						<c:forEach var="element" items="${recycleManage.recycleManageDetailSet}" varStatus="status" begin="${9*v}" end="${9*v+8 }">
							<tr>
								<td class="tdc" width="4.5%">${status.count+9*v}</td>
								<td class="tdc" width="14%">${element.commodity}</td>
								<td class="tdc" width="21%">${element.specifications}</td>
								<td class="tdc" width="4.5%">${element.unit}</td>
								<td class="tdc" width="7%">${element.inputCount}</td>
								<td class="tdc" width="8%">${element.supplementUnit}</td>
								<td class="tdc" width="10%">${element.supplementQuantity}</td>
								<td class="tdc" style="text-align:left"><c:if test="${status.first}">${recycleManage.remark}</c:if></td>
							</tr>
						</c:forEach>
					</table>
					<c:if test="${feeLength>0 && v==(feeLength>9||(damageLength>0||storageLength>0) ? count : (count-1<0 ? 0 : count-1) )}">
						<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
							<tr>
								<td class="sp2" width="8%">费用清单</td>
								<td class="sp">
									<c:forEach var="element" items="${recycleManage.recycleManageFeeSet}"  varStatus="status" begin="0" end="${feeLength}">
										${status.count}. ${element.chargeType}—${element.feeCategory} ${element.chargePrice}*${element.chargeQuantity}=${element.chargeAmount}(${element.chargeWayName})；
									</c:forEach>
									现金合计：${cashCost}元；转账合计：${transferCost}元<c:if test="${checkCost!=0.0}">支票合计：${checkCost}</c:if>
								</td>
							</tr>
						</table>
					</c:if>
					<c:if test="${damageLength>0 && v==count}">
						<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
							<tr>
								<td class="sp2" width="8%" >损坏赔偿</td>
								<td class="sp">
									<c:forEach var="element" items="${recycleManage.compensationDamageSet}"  varStatus="status" begin="0" end="${damageLength}">
										<c:if test="${element.quantity!='0'}">
											${status.count}. ${element.commodity}${element.damageType}${element.quantity}${element.measurementUnit}(${element.damageUnitPrice})${element.damageAmount}元；
										</c:if>
									</c:forEach>
									费用合计：${damageCost}元
								</td>
							</tr>
						</table>
					</c:if>
					<c:if test="${storageLength>0 && v==count}">
						<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
							<tr>
								<td class="sp2" width="8%">暂存清单</td>
								<td class="sp">
									<c:forEach var="element" items="${recycleManage.temporaryStorageSet}"  varStatus="status" begin="0" end="${storageLength}">
										${status.count}. ${element.commodity}-${element.specifications}-${element.unit}-${element.temporaryQuantity}；
									</c:forEach>
								</td>
							</tr>
						</table>
					</c:if>
				</td>
			</tr>
			<tr valign="bottom">
				<td height="34px">
					<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px">
						<tr>
							<td class="tda">一联存根(白色黑字)</td>
							<td class="tda" >二联财务科(粉)</td>
							<td class="tda">三联专职材料员(黄)</td>
							<td class="tda">四联承租单位(粉蓝)</td>
							<td class="tda">五联承运人(粉绿)</td>
							<td class="tda">六联项目存(白蓝)</td>
						</tr>
					</table>
					<table  width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top: -2px;border-spacing: 0px" >
						<tr>
							<td class="tda" width="15%"><font style="font-weight:bold;">运输人：</font>${recycleManage.transportMan}</td>
							<td class="tda" width="21%"><font style="font-weight:bold;">车牌号：</font>${recycleManage.transportNumber}</td>
							<td class="tda" ><font style="font-weight:bold;">承租单位：</font></td>
							<td class="tda" width="19%"><font style="font-weight:bold;">审核确认：</font></td>
							<td class="tda" width="17%"><font style="font-weight:bold;">制单人：</font>${recycleManage.userName}</td>
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