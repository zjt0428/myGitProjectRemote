<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>事故报告单</title>
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
   <p><strong>建筑起重机械事故报告单</strong> </p>
 </div>
 
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:36px;">
  <tr>
    <td>&nbsp;&nbsp;填报单位：&nbsp;${accidentReport.providedUnit}</td>
    <td align="right" width="260">填报时间：${accidentReport.providedDate}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="zgtable">
  <tr>
    <td width="110" height="36" align="center"><strong>机械名称</strong></td>
    <td width="210" align="left">${accidentReport.accident.equipment.equipGenericName}</td>
    <td width="110" align="center"><strong>厂型规格</strong></td>
    <td align="left">${accidentReport.accident.equipment.equipSpecificName}</td>
  </tr>
  <tr>
    <td height="36" align="center"><strong>事故发生时间</strong></td>
    <td align="left">${accidentReport.accident.accidentDate}</td>
	<td align="center"><strong>事故发生地点</strong></td>
	<td align="left">${accidentReport.accident.address}</td>
    </tr>
  <tr>
    <td height="36" align="center"><strong>事故类别</strong></td>
    <td align="left">${accidentReport.accident.accidentCategory}</td>
    <td align="center"><strong>事故主要负责人</strong></td>
    <td align="left">${accidentReport.accident.responsible}</td>
  </tr>
  <tr>
    <td align="center">事故概况<br />
      与 损 失</td>
    <td height="200" colspan="3" align="left">${accidentReport.accident.economicLosses}</td>
    </tr>
  <tr>
    <td align="center" height="180">事故经过<br />
      及原因</td>
    <td colspan="3" align="left">${accidentReport.accident.accidentDesc}</td>
    </tr>
	  <tr>
    <td align="center" height="100">事故处理<br />结&nbsp;&nbsp;&nbsp;&nbsp;果</td>
    <td colspan="3" align="left">${accidentReport.accident.accidentResult}</td>
    </tr>
  <tr>
    <td align="center">防止措施</td>
    <td height="120" colspan="3" align="left">${accidentReport.prevent}</td>
    </tr>
  <tr>
    <td align="center">参加事故<br>分析人员</td>
    <td height="100" colspan="3" align="left">${accidentReport.participants}</td>
    </tr>
</table>
<p style="text-align:right; line-height:40px; "> 填报人（签字）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
</div>
</center>
</body>
</html>
