<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>隐患整改通知单</title>
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
 <div class="wrod_title">
   <p><strong>隐患整改通知单</strong></p>
 </div>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="32" align="right">通知单号：</td>
    <td width="150" align="left">${risk.riskSerial}</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="zgtable">
  <tr>
    <td width="15%" height="32" align="center"><strong>工程名称</strong></td>
    <td width="35%" align="left"> ${risk.project.projectName} </td>
    <td width="15%" align="center"><strong>施工单位</strong></td>
    <td align="left" >${risk.project.unCustomName}</td>
  </tr>
  <tr>
    <td height="32" align="center"><strong>检查日期</strong></td>
    <td align="left">${risk.checkDate}</td>
    <td align="center"><strong>设备名称</strong></td>
    <td align="left">${risk.equipment.equipGenericName}</td>
  </tr>
  <tr>
    <td height="32" align="center"><strong>检查部门</strong></td>
    <td align="left">${risk.checkDepartment}</td>
    <td align="center"><strong>型号规格</strong></td>
    <td align="left">${risk.equipment.equipSpecificName}</td>
  </tr>
    <tr>
    <td height="32" align="center"><strong>参加检查人：</strong></td>
    <td colspan="3" align="left">${risk.checkPerson}</td>
    </tr>
  <tr>
    <td height="380" colspan="4" align="left" valign="top">&nbsp;&nbsp;现场存在问题：<br />${risk.riskDesc}</td>
  </tr>
  <tr>
    <td height="100" colspan="2" align="left" valign="top">&nbsp;&nbsp;落实整改负责人（签字）：
	<p style="padding-left:150px; padding-top:50px;">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p></td>
	<td colspan="2" align="left" valign="top">&nbsp;&nbsp;&nbsp;&nbsp;检查负责人（签字）：
    <p style="padding-left:150px;padding-top:50px;">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p></td>
   </tr>
  <tr>
    <td align="center" style="line-height:24px;" height="160">复查<br />意见
    <td colspan="3" valign="bottom" align="right">复查人（签字）： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</td>
    </tr>
</table>
</p>
</div>
</center>
</body>
</html>
