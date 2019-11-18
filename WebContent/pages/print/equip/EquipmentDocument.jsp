<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>建筑起重机械技术管理档案</title>
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
	height: 36px;
	font-size: 14px;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
}

.tdc {
	height: 36px;
	font-size: 14px;
	text-align: center;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
}

.ftdp {
	height: 60px;
	font-weight: bold;
	font-size: 30px;
}
</style>
</head>
<body>
<center class="Noprint">
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
	<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	<font style="font-weight: bold; font-size: 36px">${equipment.propertyName}</font><br /><br /><br />
	<font style="font-weight: bold; font-size: 40px">建筑起重机械技术管理档案</font><br /><br />
	<font style="font-weight: bold; font-size: 40px">【一机一档】</font><br /><br />
	<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	<table border="0" width="660">
		<tr>
			<td width="40%" align="right" class="ftdp">设备名称：</td>
			<td width="60%" align="left" class="ftdp"><font style="font-weight: 100">________________</font>
				<div style="margin: -31px 0px 0px 10px; font-size: 24px; font-weight: 100;" align="left">${equipment.equipGenericName}</div></td>
		</tr>
		<tr>
			<td align="right" class="ftdp">备案编号：</td>
			<td align="left" class="ftdp"><font style="font-weight: 100">________________</font>
				<div style="margin: -31px 0px 0px 10px; font-size: 24px; font-weight: 100;" align="left">${equipment.recordId}</div></td>
		</tr>
		<tr>
			<td align="right" class="ftdp">出厂编号：</td>
			<td align="left" class="ftdp"><font style="font-weight: 100">________________</font>
				<div style="margin: -31px 0px 0px 10px; font-size: 24px; font-weight: 100;" align="left">${equipment.exwSerial}</div></td>
		</tr>
		<tr>
			<td align="right" class="ftdp">规格型号：</td>
			<td align="left" class="ftdp"><font style="font-weight: 100">________________</font>
				<div style="margin: -31px 0px 0px 10px; font-size: 24px; font-weight: 100;" align="left">${equipment.equipSpecificName}</div></td>
		</tr>
		<tr>
			<td align="right" class="ftdp">出厂日期：</td>
			<td align="left" class="ftdp"><font style="font-weight: 100">________________</font>
				<div style="margin: -31px 0px 0px 10px; font-size: 24px; font-weight: 100;" align="left">${equipment.exwDate}</div></td>
		</tr>
		<tr>
			<td align="right" class="ftdp">报废日期：</td>
			<td align="left" class="ftdp"><font style="font-weight: 100">________________</font>
				<div style="margin: -31px 0px 0px 10px; font-size: 24px; font-weight: 100;" align="left">${equipment.scrapDate}</div></td>
		</tr>
		<tr>
			<td align="right" class="ftdp">制造厂家：</td>
			<td align="left" class="ftdp"><font style="font-weight: 100">________________</font>
				<div style="margin: -31px 0px 0px 10px; font-size: 24px; font-weight: 100;" align="left">${equipment.equipVender}</div></td>
		</tr>
		<tr>
			<td align="right" class="ftdp">当前状态：</td>
			<td align="left" class="ftdp"><font style="font-weight: 100">________________</font>
				<div style="margin: -31px 0px 0px 10px; font-size: 24px; font-weight: 100;" align="left">${equipment.statusName}</div></td>
		</tr>
		<tr>
			<td align="center" class="ftdp" colspan="2">&nbsp;</td>
		</tr>
		<tr>
			<td align="center" class="ftdp" colspan="2">${currentDate}</td>
		</tr>
	</table>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
<center>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" >
		<tr>
			<th class="tdp" colspan="6">1、基本信息</th>
		</tr>
		<tr>
			<th class="tdp" width="16%">设备名称</th>
			<td class="tdp" colspan="2">&nbsp;${equipment.equipGenericName}</td>
			<th class="tdp" width="16%">设备制造厂家</th>
			<td class="tdp" colspan="2">&nbsp;${equipment.equipVender}</td>
		</tr>
		<tr>
			<th class="tdp" width="15%">产权单位</th>
			<td class="tdp" colspan="2">&nbsp;${equipment.propertyName}</td>
			<th class="tdp" width="15%">设备来源</th>
			<td class="tdp" colspan="2">&nbsp;${equipment.equipSourceName}</td>
		</tr>
		<tr>
			<th class="tdp" >备案编号</th>
			<td class="tdp" width="17%">&nbsp;${equipment.recordId}</td>
			<th class="tdp" width="17%">出厂编号</th>
			<td class="tdp" >&nbsp;${equipment.exwSerial}</td>
			<th class="tdp" width="17%">规格型号</th>
			<td class="tdp" width="17%">&nbsp;${equipment.equipSpecificName}</td>
		</tr>
		<tr>
			<th class="tdp">出厂日期</th>
			<td class="tdp">&nbsp;${equipment.exwDate}</td>
			<th class="tdp">购买日期</th>
			<td class="tdp">&nbsp;<fmt:formatDate value="${equipment.purchaseDate}" pattern="yyyy-MM-dd" /></td>
			<th class="tdp">报废日期</th>
			<td class="tdp">&nbsp;${equipment.scrapDate}</td>
		</tr>
		<tr>
			<th class="tdp" >备注</th>
			<th class="tdp" colspan="5">&nbsp;${equipment.remark}</th>
		</tr>
	</table>
	<c:choose>
		<c:when test="${fn:length(equipComponDairys) > 0}">
		<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
			<tr>
				<th class="tdp" colspan="8">所属部件信息</th>
			</tr>
			<c:forEach var="compon" items="${equipComponDairys}">
			<tr>
				<th class="tdp" width="12%">当前状态</th>
				<td class="tdp" width="13%">&nbsp;${compon.statusName}</td>
				<th class="tdp" width="12%">部件名称</th>
				<td class="tdp" width="13%">&nbsp;${compon.componGenericName}</td>
				<th class="tdp" width="12%">规格型号</th>
				<td class="tdp" width="13%">&nbsp;${compon.componSpecificName}</td>
				<th class="tdp" width="12%">采购日期</th>
				<td class="tdp" width="13%">&nbsp;${compon.purchaseDate}</td>
			</tr>
			<c:forEach var="dairy" items="${compon.componDiarys}">
			<tr>
				<th class="tdp" width="12%">启用日期</th>
				<td class="tdp" width="12%">&nbsp;${dairy.START_DATE}</td>
				<th class="tdp" width="12%">退场日期</th>
				<td class="tdp" width="12%">&nbsp;${dairy.END_DATE}</td>
				<th class="tdp" width="12%">使用项目</th>
				<td class="tdp" width="12%">&nbsp;${dairy.PROJECT_NAME}</td>
				<th class="tdp" width="12%">所有地</th>
				<td class="tdp" width="12%">&nbsp;${dairy.ADDRESS}</td>
			</tr>
			</c:forEach>
			</c:forEach>
		</table>
		</c:when>
	</c:choose>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">2、运行状态</th>
		</tr>
		<tr>
			<th class="tdp" width="16%">总出租次数</th>
			<td class="tdp" width="17%">&nbsp;${rentout}</td>
			<th class="tdp" width="16%">总收入（元）</th>
			<td class="tdp" width="17%">&nbsp;${receivesum}</td>
			<th class="tdp" width="17%">总支出（元）</th>
			<td class="tdp" width="17%">&nbsp;${paymentsum}</td>
		</tr>
		<tr>
			<th class="tdp">总毛利率</th>
			<td class="tdp">&nbsp;${grossProfitRate}</td>
			<th class="tdp">总出租率</th>
			<td class="tdp" colspan="3">&nbsp;${occupancyrate}</td>
		</tr>
		<tr>
			<th class="tdp">当前所在项目</th>
			<td class="tdp">&nbsp;${currentProjectName}</td>
			<th class="tdp">当前安装工地</th>
			<td class="tdp" colspan="3">&nbsp;${currentProjectAddress}</td>
		</tr>
		<tr>
			<th class="tdp">当前承租单位（使用单位）</th>
			<td class="tdp">&nbsp;${currentUnEntName}</td>
			<th class="tdp">启用时间</th>
			<td class="tdp" colspan="3">&nbsp;${currentActivateDate}</td>
		</tr>
		<tr>
			<th class="tdp">上次所在项目</th>
			<td class="tdp">&nbsp;${lastProjectName}</td>
			<th class="tdp">上次安装工地</th>
			<td class="tdp" colspan="3">&nbsp;${lastProjectAddress}</td>
		</tr>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">3、租赁合同</th>
		</tr>
		<tr>
			<th class="tdp" width="10%">当前状态</th>
			<th class="tdp" width="20%">合同编号</th>
			<th class="tdp" width="15%">承租方</th>
			<th class="tdp" width="15%">项目名称</th>
			<th class="tdp" width="15%">签订时间</th>
			<th class="tdp" width="15%">合同金额</th>
			<th class="tdp" width="10%">销售人员</th>
		</tr>
		<c:forEach var="element" items="${contracts}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.APPLYFOR_STATE}</td>
			<td class="tdc">&nbsp;${element.CONTRACT_SERIAL}</td>
			<td class="tdc">&nbsp;${element.PB_ENT_NAME}</td>
			<td class="tdc">&nbsp;${element.PROJECT_NAME}</td>
			<td class="tdc">&nbsp;${element.SIGNING_TIME}</td>
			<td class="tdp">&nbsp;${element.CONTRACT_AMOUNT}</td>
			<td class="tdc">&nbsp;${element.SALESMAN}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">4、结算信息</th>
		</tr>
		<tr>
			<th class="tdp" width="10%">款项状态</th>
			<th class="tdp" width="15%">结算单号</th>
			<th class="tdp" width="25%">结算起止时间</th>
			<th class="tdp" width="15%">结算金额</th>
			<th class="tdp" width="15%">项目名称</th>
			<th class="tdp" width="20%">承租方</th>
		</tr>
		<c:forEach var="element" items="${settles}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.FUND_STATUS}</td>
			<td class="tdc">&nbsp;${element.SETTLE_SERIAL}</td>
			<td class="tdc">&nbsp;${element.START_SETTLE_DATE}&nbsp;/&nbsp;${element.END_SETTLE_DATE}</td>
			<td class="tdc">&nbsp;${element.SETTLE_AMOUNT}</td>
			<td class="tdc">&nbsp;${element.PROJECT_NAME}</td>
			<td class="tdp">&nbsp;${element.PA_ENT_NAME}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">5、调度信息</th>
		</tr>
		<tr>
			<th class="tdp" width="10%">当前状态</th>
			<th class="tdp" width="15%">项目名称</th>
			<th class="tdp" width="25%">项目所属地</th>
			<th class="tdp" width="20%">计划进场时间</th>
			<th class="tdp" width="30%">承租单位负责人</th>
		</tr>
		<c:forEach var="element" items="${dispatchs}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.APPLYFOR_STATE}</td>
			<td class="tdc">&nbsp;${element.PROJECT_NAME}</td>
			<td class="tdc">&nbsp;${element.ADDRESS}</td>
			<td class="tdc">&nbsp;${element.START_DATE}</td>
			<td class="tdp">&nbsp;${element.PROJECT_MANAGER}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">6、安装启用</th>
		</tr>
		<tr>
			<th class="tdp" width="15%">进场时间</th>
			<th class="tdp" width="15%">退场时间</th>
			<th class="tdp" width="15%">启用时间</th>
			<th class="tdp" width="20%">项目名称</th>
			<th class="tdp" width="15%">安装高度</th>
			<th class="tdp" width="20%">安装负责人</th>
		</tr>
		<c:forEach var="element" items="${installs}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.STARTIN_DATE}</td>
			<td class="tdc">&nbsp;${element.ENDIN_DATE}</td>
			<td class="tdc">&nbsp;${element.ACTIVATE_DATE}</td>
			<td class="tdc">&nbsp;${element.PROJECT_NAME}</td>
			<td class="tdc">&nbsp;${element.INSTALL_HEIGHT}</td>
			<td class="tdp">&nbsp;${element.PRINCIPAL}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">7、顶升加节</th>
		</tr>
		<tr>
			<th class="tdp" width="15%">零部件名称</th>
			<th class="tdp" width="15%">顶升数量</th>
			<th class="tdp" width="15%">项目名称</th>
			<th class="tdp" width="20%">顶升人员</th>
			<th class="tdp" width="15%">顶升日期</th>
		</tr>
		<c:forEach var="element" items="${jjcomponts}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.COMPON_GENERIC}</td>
			<td class="tdc">&nbsp;${element.COUNTS}</td>
			<td class="tdc">&nbsp;${element.PROJECT_NAME}</td>
			<td class="tdc">&nbsp;${element.JJUSERNAME}</td>
			<td class="tdc">&nbsp;${element.START_DATE}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">8、检测信息</th>
		</tr>
		<tr>
			<th class="tdp" width="15%">报告编号</th>
			<th class="tdp" width="15%">检测单位</th>
			<th class="tdp" width="20%">检测日期</th>
			<th class="tdp" width="20%">项目名称</th>
			<th class="tdp" width="30%">检测结果</th>
		</tr>
		<c:forEach var="element" items="${detects}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.DETECT_SERIAL}</td>
			<td class="tdc">&nbsp;${element.DETECT_ENT_NAME}</td>
			<td class="tdc">&nbsp;${element.DETECT_DATE}</td>
			<td class="tdc">&nbsp;${element.PROJECT_NAME}</td>
			<td class="tdp">&nbsp;${element.DETECT_RESULT}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">9、验收信息</th>
		</tr>
		<tr>
			<th class="tdp" width="15%">验收时间</th>
			<th class="tdp" width="15%">使用单位</th>
			<th class="tdp" width="20%">验收结果</th>
			<th class="tdp" width="20%">项目名称</th>
			<th class="tdp" width="30%">项目所属地</th>
		</tr>
		<c:forEach var="element" items="${verifys}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.VERIFY_SERIAL}</td>
			<td class="tdc">&nbsp;${element.EM_ENT_NAME}</td>
			<td class="tdc">&nbsp;${element.VERIFY_RESULT}</td>
			<td class="tdc">&nbsp;${element.PROJECT_NAME}</td>
			<td class="tdp">&nbsp;${element.ADDRESS}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">10、使用信息</th>
		</tr>
		<tr>
			<th class="tdp" width="15%">启用日期</th>
			<th class="tdp" width="15%">拆卸日期</th>
			<th class="tdp" width="20%">使用单位</th>
			<th class="tdp" width="20%">项目名称</th>
			<th class="tdp" width="30%">项目所属地</th>
		</tr>
		<c:forEach var="element" items="${employs}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.EMPLOY_DATE}</td>
			<td class="tdc">&nbsp;${element.END_PLAN_DATE}</td>
			<td class="tdc">&nbsp;${element.UN_CUSTOM_NAME}</td>
			<td class="tdc">&nbsp;${element.PROJECT_NAME}</td>
			<td class="tdp">&nbsp;${element.ADDRESS}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">11、巡检信息</th>
		</tr>
		<tr>
			<th class="tdp" width="15%">巡检编号</th>
			<th class="tdp" width="15%">巡检日期</th>
			<th class="tdp" width="25%">巡检人员</th>
			<th class="tdp" width="25%">巡检结果</th>
			<th class="tdp" width="20%">项目名称</th>
		</tr>
		<c:forEach var="element" items="${inspects}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.INSPECT_SERIAL}</td>
			<td class="tdc">&nbsp;${element.INSPECT_DATE}</td>
			<td class="tdc">&nbsp;${element.INSPECT_PEPOLES}</td>
			<td class="tdc">&nbsp;${element.INSPECT_RESULT}</td>
			<td class="tdp">&nbsp;${element.PROJECT_NAME}</td>
		</tr>
		</c:forEach>
	</table>
	<c:choose>
		<c:when test="${fn:length(maints) > 0}">
		<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
			<tr>
				<th class="tdp" colspan="6">12、保养记录</th>
			</tr>
			<c:forEach var="element" items="${maints}" varStatus="status">
			<tr>
				<th class="tdp" width="14%">保养编号</th>
				<td class="tdc" width="14%">&nbsp;${element.MAINT_SERIAL}</td>
				<th class="tdp" width="15%">保养截止时间</th>
				<td class="tdc" width="14%">&nbsp;${element.THIS_END_CYCLE_DATE}</td>
				<th class="tdp" width="15%">保养类型</th>
				<td class="tdc" colspan="2">&nbsp;${element.MAINT_TYPE}</td>
			</tr>
			<tr>
				<th class="tdp">保养人员</th>
				<td class="tdc">&nbsp;${element.MAINT_PEPOLES}</td>
				<th class="tdp">保养时间</th>
				<td class="tdc" colspan="2">&nbsp;${element.MAINT_DATE}</td>
				<th class="tdp" width="14%">保养结果</th>
				<td class="tdc" width="14%">&nbsp;${element.MAINT_RESULT}</td>
			</tr>
			</c:forEach>
		</table>
		</c:when>
		<c:otherwise>
		<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
			<tr>
				<th class="tdp" colspan="6">12、保养记录</th>
			</tr>
			<tr>
				<th class="tdp" width="14%">保养编号</th>
				<td class="tdc" width="14%">&nbsp;</td>
				<th class="tdp" width="15%">保养截止时间</th>
				<td class="tdc" width="14%">&nbsp;</td>
				<th class="tdp" width="15%">保养类型</th>
				<td class="tdc" colspan="2">&nbsp;</td>
			</tr>
			<tr>
				<th class="tdp">保养人员</th>
				<td class="tdc">&nbsp;</td>
				<th class="tdp">保养时间</th>
				<td class="tdc" colspan="2">&nbsp;</td>
				<th class="tdp" width="14%">保养结果</th>
				<td class="tdc" width="14%">&nbsp;</td>
			</tr>
		</table>
		</c:otherwise>
	</c:choose>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">13、拆卸信息</th>
		</tr>
		<tr>
			<th class="tdp" width="15%">进场时间</th>
			<th class="tdp" width="15%">退场时间</th>
			<th class="tdp" width="15%">拆卸人员</th>
			<th class="tdp" width="20%">项目名称</th>
			<th class="tdp" width="15%">拆卸高度</th>
			<th class="tdp" width="20%">安装负责人</th>
		</tr>
		<c:forEach var="element" items="${dismantles}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.STARTDIS_DATE}</td>
			<td class="tdc">&nbsp;${element.ENDDIS_DATE}</td>
			<td class="tdc">&nbsp;${element.PRACTI_NAMES}</td>
			<td class="tdc">&nbsp;${element.PROJECT_NAME}</td>
			<td class="tdc">&nbsp;${element.DISMANTLE_HEIGHT}</td>
			<td class="tdp">&nbsp;${element.PRINCIPAL}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">14、保险信息</th>
		</tr>
		<tr>
			<th class="tdp" width="20%">保险公司</th>
			<th class="tdp" width="15%">起保日期</th>
			<th class="tdp" width="15%">终止日期</th>
			<th class="tdp" width="20%">保单号</th>
			<th class="tdp" width="15%">拆保费</th>
			<th class="tdp" width="15%">赔偿额</th>
		</tr>
		<c:forEach var="element" items="${insures}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.INSURANCE_COMPANY}</td>
			<td class="tdc">&nbsp;${element.START_INSURE_DATE}</td>
			<td class="tdc">&nbsp;${element.END_INSURE_DATE}</td>
			<td class="tdc">&nbsp;${element.INSURE_SERIAL}</td>
			<td class="tdc">&nbsp;${element.PREMIUM}</td>
			<td class="tdp">&nbsp;${element.COMPENSATE_AMOUNT}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">15、收款明细</th>
		</tr>
		<tr>
			<th class="tdp" width="15%">回款状态</th>
			<th class="tdp" width="15%">收款金额</th>
			<th class="tdp" width="25%">收款日期</th>
			<th class="tdp" width="25%">付款单位</th>
			<th class="tdp" width="20%">收款单号</th>
		</tr>
		<c:forEach var="element" items="${receives}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.RECEIVE_STATUS}</td>
			<td class="tdc">&nbsp;${element.RECEIVE_AMOUNT}</td>
			<td class="tdc">&nbsp;${element.RECEIVE_DATE}</td>
			<td class="tdc">&nbsp;${element.PAYMENT_NAME}</td>
			<td class="tdp">&nbsp;${element.AMOUNT_SERIAL}</td>
		</tr>
		</c:forEach>
	</table>
	<table class="tabp" width="660" border="0" align="center" cellpadding="2" cellspacing="0" style="margin-top: -2px">
		<tr>
			<th class="tdp" colspan="6">16、支出明细</th>
		</tr>
		<tr>
			<th class="tdp" width="15%">付款状态</th>	 			
			<th class="tdp" width="15%">付款金额</th>
			<th class="tdp" width="25%">付款日期</th>
			<th class="tdp" width="25%">收款单位</th>
			<th class="tdp" width="20%">关联业务</th>
		</tr>
		<c:forEach var="element" items="${payments}" varStatus="status">
		<tr>
			<td class="tdc">&nbsp;${element.PAYMENT_STATUS}</td>
			<td class="tdc">&nbsp;${element.PAYMENT_AMOUNT}</td>
			<td class="tdc">&nbsp;${element.PAYMENT_DATE}</td>
			<td class="tdc">&nbsp;${element.RECEIVE_NAME}</td>
			<td class="tdp">&nbsp;${element.RELATE_THEME}</td>
		</tr>
		</c:forEach>
	</table>
</center>
</body>
</html>