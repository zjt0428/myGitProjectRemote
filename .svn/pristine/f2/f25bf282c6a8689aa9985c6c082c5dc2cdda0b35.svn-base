<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>设备维修记录表</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_word.css" />
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<style media="print">
.Noprint {
	display: none;
	
}
.PageNext {
	page-break-after: always;
}
</style>
</head>
<body>
<center class="Noprint">
	<p align="right" class="mar_15">
		<object id="WebBrowser" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
	</p>
</center>
<center>
<div class="main_detail">
	<p style='text-align:center'><span class="wrod_title"><font color="#FF0000">${equipRepair.equipment.propertyName}</font></span></p>
	<p style='text-align:center'><span class="wrod_title">设备维修记录表</span></p>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td width="120" height="36" align="right"><strong>维修单号：</strong></td>
			<td align="left">&nbsp;${equipRepair.repairSerial}</td>
		</tr>
	</table>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table">
		<tr>
			<td height="28" colspan="4" align="left" bgcolor="#E0E0E0"><strong>基本信息</strong></td>
		</tr>
		<tr>
			<td width="16%" height="30" align="center"><strong>填报人</strong></td>
			<td width="34%" align="left">&nbsp;${equipRepair.userName}</td>
			<td width="16%" align="center"><strong>填报时间</strong></td>
			<td width="34%" align="left">&nbsp;${equipRepair.providedDate}</td>
		</tr>
		<tr>
			<td width="16%" height="30" align="center"><strong>现场编号</strong></td>
			<td width="34%" align="left">&nbsp;${equipRepair.buildingNum}</td>
			<td width="16%" align="center"><strong>填报部门</strong></td>
			<td width="34%" align="left">&nbsp;${equipRepair.department.depName}</td>
		</tr>
		
		
		
		<tr>
			<td width="16%" height="30" align="center"><strong>项目名称</strong></td>
			<td width="34%" align="left">&nbsp;${equipRepair.project.projectName}</td>
			<td width="16%" align="center"><strong>项目所属地</strong></td>
			<td width="34%" align="left">&nbsp;${equipRepair.project.address}</td>
		</tr>
		<tr>
			<td height="30" align="center"><strong>备案编号</strong></td>
			<td align="left">&nbsp;${equipRepair.equipment.recordId}</td>
			<td align="center"><strong>出厂编号</strong></td>
			<td align="left">&nbsp;${equipRepair.equipment.exwSerial}</td>
		</tr>
		<tr>
			<td height="30" align="center"><strong>维修人员</strong></td>
			<td align="left">&nbsp;${equipRepair.repairMan}</td>
			<td align="center"><strong>维修结果</strong></td>
			<td align="left">&nbsp;${equipRepair.repairResultName}</td>
		</tr>
		<tr>
			<td height="30" align="center"><strong>状态</strong></td>
			<td align="left">&nbsp;${equipRepair.statusName}</td>
			<td align="left"><strong>维修费用(元)</strong></td>
			<td align="left">&nbsp;${equipRepair.repairAmount}</td>
		</tr>
		<tr>
			<td height="30" align="center"><strong>故障描述</strong></td>
			<td align="left">&nbsp;${equipRepair.phenomenon}</td>
			<td align="left"><strong>规格型号</strong></td>
			<td align="left">&nbsp;${equipRepair.equipment.equipSpecificName }</td>
		</tr>
		<tr>
			<td height="28" colspan="4" align="left" bgcolor="#E0E0E0"><strong>维修情况</strong></td>
		</tr>
	</table>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table" style="border-top-style:none;">
		<tr>
			<td>故障部件</td>
			<td>故障时间</td>
			<td>故障现象</td>
			<td>故障诊断</td>
			<td>故障排除时间</td>
			<td>维修耗时<br>（时）</td>
			<td>停机耗时<br>（时）</td>
		</tr>
		<c:forEach var="element" items="${equipRepair.equipRepairLocationSet}" varStatus="status" >
		<tr>
			<td height="28">&nbsp;${element.faultLocation}</td>
			<td>&nbsp;<fmt:formatDate value="${element.spendDate}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
			<td>&nbsp;${element.phenomenon}</td>
			<td>&nbsp;${element.diagnosis}</td>
			<td>&nbsp;<fmt:formatDate value="${element.troubleshootDate}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
			<td>&nbsp;${element.repairTime}</td>
			<td>&nbsp;${element.cumulativeDowntime}</td>
		</tr>
		</c:forEach>
		<tr>
			<td height="28">&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td height="28">&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td height="28">&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td height="50"><strong>维修方案</strong></td>
			<td colspan="6">&nbsp;${equipRepair.schemaName}</td>
		</tr>
	</table>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table" style="border-top-style:none;">
		<tr>
			<td height="28" colspan="5" align="left" bgcolor="#E0E0E0"><strong>部件更换清单</strong></td>
		</tr>
		<tr>
			<td height="28" width="60">序号</td>
			<td>更换配件名称</td>
			<td width="120">更换配件型号</td>
			<td width="80">更换数量</td>
			<td width="100">配件现值（元）</td>
		</tr>
		<c:forEach var="element" items="${equipRepair.equipRepairNewComponSet}" varStatus="status" >
		<tr>
			<td height="28">&nbsp;${status.count}</td>
			<td align="left">&nbsp;${element.component.componGenericName}</td>
        	<td>&nbsp;${element.component.componSpecificName}</td>
			<td>&nbsp;${element.counts}</td>
			<td align="left">&nbsp;${element.component.presentValue}</td>
		</tr>
		</c:forEach>
		<tr>
			<td height="28">&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td height="28">&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td height="28">&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td height="28">&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td height="28">&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td height="28" colspan="3" align="right"><strong>合   计：</strong></td>
			<td>&nbsp;${totleCounts}</td>
			<td>&nbsp;${totlePresentValue}</td>
		</tr>
		<tr>
			<td height="28">预防措<br />施建议</td>
			<td colspan="4">&nbsp;${preventiveMeasures}</td>
		</tr>
	</table>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td width="50%" height="28" align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;维修主管（签字）：</td>
			<td align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经办人员（签字）：</td>
		</tr>
		<tr>
			<td height="28" align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日　</td>
			<td align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</td>
		</tr>
	</table>
</p>
</div>
</center>
</body>
</html>

