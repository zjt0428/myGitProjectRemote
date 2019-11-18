<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>施工作业任务单</title>
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
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
<div class="main_detail">
<p style='text-align:center'><span class="wrod_title">施工作业任务单</span></p>
<br />
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="80" height="36" align="center">填报人</td>
    <td width="240" align="left">&nbsp;${constructOperation.userName}</td>
    <td width="80" align="center">填报日期</td>
    <td align="left">&nbsp;${constructOperation.providedDate}</td>
  </tr>
  <tr>
    <td height="36" align="center">产权单位</td>
    <td align="left">&nbsp;${constructOperation.equipment.propertyName}</td>
    <td align="center">使用单位</td>
    <td align="left">&nbsp;${constructOperation.paEntName}</td>
  </tr>
  <tr>
    <td height="36" align="center">设备型号</td>
    <td align="left">&nbsp;${constructOperation.equipment.equipSpecificName}</td>
    <td align="center">项目地址</td>
    <td align="left">&nbsp;${constructOperation.project.address}</td>
  </tr>
    <tr>
    <td height="36" align="center">备案编号</td>
    <td align="left">&nbsp;${constructOperation.equipment.recordId}</td>
    <td align="center">作业人员</td>
    <td align="left">&nbsp;${constructOperation.practiNames}</td>
  </tr>
    <tr>
    <td height="36" align="center">项目名称</td>
    <td align="left">&nbsp;${constructOperation.project.projectName}</td>
    <td align="center">现场编号</td>
    <td align="left">&nbsp;${constructOperation.constructSerial}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0"  class="listtable" style="border-top-style:none;">
  <tr>
    <td height="36" colspan="6" align="center"  bgcolor="#e0e0e0"><strong>计划任务清单</strong></td>
  </tr>
  <tr>
    <td height="30" width="100">任务内容</td>
    <td width="240">单位</td>
    <td width="50">数量</td>
    <td width="50">单价</td>
    <td width="60">合计</td>
    <td>备注</td>
  </tr>
  <c:forEach var="element" items="${constructOperation.constructOperationPlanTaskSet}" varStatus="status" >
  <tr>
    <td height="30">&nbsp;${element.contents}</td>
    <td>&nbsp;${element.unit}</td>
    <td>&nbsp;${element.quantity}</td>
    <td>&nbsp;${element.unitPrice}</td>
    <td>&nbsp;${element.summary}</td>
    <td>&nbsp;${element.remark}</td>
  </tr>
  </c:forEach>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0"  class="listtable" style="border-top-style:none;">
  <tr>
    <td height="36" colspan="6" align="center"  bgcolor="#e0e0e0"><strong>实际任务清单</strong></td>
  </tr>
  <tr>
    <td height="30" width="100">任务内容</td>
    <td width="240">单位</td>
    <td width="50">数量</td>
    <td width="50">单价</td>
    <td width="60">合计</td>
    <td>备注</td>
  </tr>
  <c:forEach var="element" items="${constructOperation.constructOperationRealTaskSet}" varStatus="status" >
  <tr>
    <td height="30">&nbsp;${element.contents}</td>
    <td>&nbsp;${element.unit}</td>
    <td>&nbsp;${element.quantity}</td>
    <td>&nbsp;${element.unitPrice}</td>
    <td>&nbsp;${element.summary}</td>
    <td>&nbsp;${element.remark}</td>
  </tr>
  </c:forEach>
</table>
<p>
<p style="text-align:right; padding-right:100px; height:40px; line-height:40px;">审核人：</p>
</div>
</center>
</body>
</html>