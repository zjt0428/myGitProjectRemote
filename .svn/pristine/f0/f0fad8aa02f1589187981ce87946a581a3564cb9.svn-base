<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>设备巡检记录表</title>
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
<p style='text-align:center'><span class="wrod_title"><font color="#FF0000">${equipInspect.equipInspectSchema.equipDiary.propertyName}</font></span></p>
<p style='text-align:center'><span class="wrod_title">设备巡检记录表</span></p>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="100" height="36" align="right"><strong>巡检单号：</strong></td>
    <td align="left">${equipInspect.inspectSerial}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table">
  <tr>
    <td height="28" colspan="4" align="left" bgcolor="#E0E0E0"><strong>基本信息</strong></td>
    </tr>
  <tr>
    <td width="16%" height="30" align="center"><strong>项目名称</strong></td>
    <td width="34%" align="left">${equipInspect.equipInspectSchema.equipDiary.projectName}</td>
    <td width="16%" align="center"><strong>项目所属地</strong></td>
    <td width="34%" align="left">${equipInspect.equipInspectSchema.equipDiary.address}</td>
  </tr>
  <tr>
    <td height="30" align="center"><strong>备案编号</strong></td>
    <td align="left">${equipInspect.equipInspectSchema.equipDiary.recordId}</td>
    <td align="center"><strong>出厂编号</strong></td>
    <td align="left">${equipInspect.equipInspectSchema.equipDiary.exwSerial}</td>
  </tr>
  <tr>
    <td height="30" align="center"><strong>巡检人员</strong></td>
    <td align="left">${equipInspect.inspectPepoles}</td>
    <td align="center"><strong>实际巡检时间</strong></td>
    <td align="left">${equipInspect.inspectDate}</td>
  </tr>
  <tr>
    <td height="30" align="center"><strong>整机巡检结果</strong></td>
    <td colspan="3" align="left">${equipInspect.inspectResultName}</td>
    </tr>
    <tr>
    <td height="28" colspan="4" align="left" bgcolor="#E0E0E0"><strong>巡检信息</strong></td>
    </tr>
  <tr>
    <td align="center" style="background-color:#E0E0E0;" width="15%"><strong>巡检部位</strong></td>
    <td align="center" style="background-color:#E0E0E0;" width="35%" height="28"><strong>巡检内容</strong></td>
    <td align="center" style="background-color:#E0E0E0;" width="15%"><strong>巡检结果</strong></td>
    <td align="center" style="background-color:#E0E0E0;" width="35%"><strong>结果说明</strong></td>
  </tr>
  <c:forEach var="element" items="${equipInspect.equipInspectDetailSet}" varStatus="status" >
  <tr>
    <td align="left">&nbsp;<c:choose><c:when test="${element.component!=null}">${element.component.componGenericName}</c:when><c:otherwise>${element.position}</c:otherwise></c:choose></td>
    <td height="28">${element.substance}</td>
    <td>${element.detailResultName}</td>
    <td align="center">${element.description}</td>
  </tr>
  </c:forEach>
  <tr>
    <td height="80" align="center">预防措施建议</td>
    <td colspan="3" align="left">&nbsp;</td>
    </tr>
  <tr>
    <td colspan="2" align="center">监理单位确认 <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
    <td colspan="2" align="center">施工单位（项目经理）确认 <br />
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
    </tr>
  <tr>
    <td colspan="2" align="center">巡检主管确认<br />
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
    <td colspan="2" align="center">巡检人员确认 <br />
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
    </tr>
</table>
</p>
</div>
</center>
</body>
</html>
