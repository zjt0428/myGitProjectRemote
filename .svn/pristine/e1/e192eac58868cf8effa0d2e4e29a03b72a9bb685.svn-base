<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>隐患整改反馈表</title>
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
 <div>
   <p style="font-size:28px;font-weight:bold; line-height:32px; text-align:center; "><strong>隐患整改反馈表</strong></p>
 </div>
 
 <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="450" height="36" align="right">反馈单：</td>
    <td>${riskReport.reportSerial}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="zgtable">
  <tr>
    <td width="100" height="36" align="center"><strong>工程名称</strong></td>
    <td width="220" align="left">${riskReport.risk.project.projectName}</td>
    <td width="100" align="center"><strong>施工单位</strong></td>
    <td align="left">${riskReport.risk.project.unCustomName}</td>
  </tr>
  <tr>
    <td height="36" align="center"><strong>存在问题项数</strong></td>
    <td align="left">&nbsp;</td>
    <td align="center" style="line-height:20pt;"><strong>设备名称规<br />      
      格检查部位</strong></td>
    <td align="left">${riskReport.risk.equipment.equipGenericName}/${riskReport.risk.equipment.equipSpecificName}/${riskReport.checkPosition}</td>
  </tr>
  <tr>
    <td height="36" align="center"><strong>整改负责人</strong></td>
    <td align="left">${riskReport.risk.improvePerson}</td>
    <td align="center"><strong>完成时间</strong></td>
    <td align="left">${riskReport.completeDate}</td>
  </tr>
  <tr>
    <td colspan="4" valign="top" height="400" align="left" style="padding-left:20px; padding-top:15px;">整改结果：<br />${riskReport.improveDesc}</td>
    </tr>
  <tr>
    <td align="center" style="line-height:24px;" height="200">其他<br />
      需要<br /> 
      说明<br /> 
      的问题</td>
    <td colspan="3" valign="bottom" align="left">${riskReport.remark}<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;整改负责人（签字）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</td>
    </tr>
</table>
</div>
</center>
</body>
</html>
