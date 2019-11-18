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
<div class="hzbmain_detail">
<p style='text-align:center'><span class="wrod_title">${equipRepair.equipment.propertyName}</span></p>
<p style='text-align:center'><span class="wrod_title">设备维修作业单</span></p><br>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table">
  <tr>
    <td width="100" height="30">填报人</td>
    <td width="300">&nbsp;${equipRepair.userName }</td>
    <td width="100">填报日期</td>
    <td width="300">&nbsp;<fmt:formatDate value="${equipRepair.providedDate}" pattern="yyyy-MM-dd" /></td>
    <td width="100">填报部门</td>
    <td width="250">&nbsp;${appUser.department.depName }</td>
  </tr>
  <tr>
    <td height="30">项目名称</td>
    <td>&nbsp;${equipRepair.project.projectName}</td>
    <td>设备名称</td>
    <td>&nbsp;${equipRepair.equipment.equipGenericName}</td>
    <td>规格型号</td>
    <td>&nbsp;${equipRepair.equipment.equipSpecificName}</td>
  </tr>
  <tr>
    <td height="30">出厂编号</td>
    <td>&nbsp;${equipRepair.equipment.exwSerial}</td>
    <td>项目地址</td>
    <td>&nbsp;${equipRepair.project.address}</td>
    <td>现场编号</td>
    <td>&nbsp;${equipRepair.buildingNum}</td>
  </tr>
  <tr>
    <td height="30">备案编号</td>
    <td>&nbsp;${equipRepair.equipment.recordId}</td>
    <td>车牌号</td>
    <td>&nbsp;</td>
    <td>主修人员</td>
    <td>&nbsp;${equipRepair.repairMan}</td>
  </tr>
  <tr>
    <td rowspan="4">故障<br />
      描述</td>
    <td colspan="3" rowspan="4">&nbsp;${equipRepair.phenomenon}</td>
    <td height="30">协助人员</td>
    <td>&nbsp;</td>
  </tr>
 <tr>
    <td height="30">运行状态</td>
    <td>&nbsp;${equipRepair.runningStateName}</td>
  </tr>
  <tr>
    <td height="30">维修结果</td>
    <td>&nbsp;${equipRepair.repairResultName}</td>
  </tr>
  <tr>
    <td height="30">维修方法</td>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table" style="border-top-style:none;"> 
  <tr>
    <td height="30" colspan="7" style="background-color:#E0E0E0; font-weight:bold; padding-left:5px; text-align:left;">维修内容</td>
    </tr>
  <tr>
    <td height="30" width="15%">故障部位</td>
    <td width="12%">故障时间</td>
    <td width="25%">故障原因</td>
    <td width="10%">修复时间</td>
    <td width="10%">维修耗时</td>
    <td width="10%">人工费用</td>
    <td>备注</td>
  </tr>
  <c:forEach var="element" items="${equipRepair.equipRepairLocationSet}" varStatus="status" >
  <tr>
    <td height="30">&nbsp;${element.faultLocation}</td>
    <td>&nbsp;<fmt:formatDate value="${element.spendDate}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
    <td>&nbsp;${element.diagnosis}</td>
    <td>&nbsp;<fmt:formatDate value="${element.troubleshootDate}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
    <td>&nbsp;${element.repairTime}</td>
    <td>&nbsp;${element.labourCharges}</td>
    <td>&nbsp;</td>
  </tr>
  </c:forEach>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table" style="border-top-style:none;"> 
  <tr>
    <td height="30" colspan="7" style="background-color:#E0E0E0; font-weight:bold; padding-left:5px; text-align:left;">更换配件信息</td>
    </tr>
  <tr>
    <td height="30" width="15%">部件名称</td>
    <td width="12%">配件型号规格</td>
    <td width="25%">单位</td>
    <td width="10%">单价</td>
    <td width="10%">更换数量</td>
    <td width="10%">小计</td>
    <td>备注</td>
  </tr>
  <c:forEach var="element" items="${equipRepair.equipRepairNewComponSet}" varStatus="status" >
  <tr>
    <td height="30">&nbsp;${element.component.componGenericName}</td>
    <td>&nbsp;${element.component.componSpecificName}</td>
    <td>&nbsp;${element.component.calculate}</td>
    <td>&nbsp;${element.unitPrice}</td>
    <td>&nbsp;${element.counts}</td>
    <td>&nbsp;${element.summary}</td>
    <td>&nbsp;</td>
  </tr>
  </c:forEach>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
    <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</div>
</center>
</body>
</html>

