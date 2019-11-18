<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>设备部件使用情况统计表</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_word.css" />
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
<p style='text-align:center; padding-bottom:5px;'><span class="wrod_title">${companyName}</span></p>
<p style='text-align:center'><span class="wrod_title">设备部件使用情况统计表</span></p>
<br />
<p style='text-align:left; padding-bottom:5px;font-size: 16px'><strong>项目名称：</strong>${projectName}</p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <c:forEach var="element" items="${equipments}" varStatus="status">
   <tr>
    <td height="30" colspan="4" align="left" bgcolor="#E0E0E0">&nbsp;<strong>设备基本信息</strong></td>
    </tr>
  <tr>
    <td width="120" height="30" align="center"><strong>备案编号</strong></td>
    <td width="200" align="left">&nbsp;${element.value["RECORD_ID"]}</td>
    <td width="100" align="center"><strong>规格型号</strong></td>
    <td width="220" align="left">&nbsp;${element.value["EQUIP_SPECIFIC"]}</td>
  </tr>
  <tr>
    <td height="30" align="center"><strong>设备名称</strong></td>
    <td align="left">&nbsp;${element.value["EQUIP_GENERIC"]}</td>
    <td align="center"><strong>出厂编号</strong></td>
    <td align="left">&nbsp;${element.value["EXW_SERIAL"]}</td>
  </tr>
  <tr>
    <td height="30" align="center"><strong>楼号</strong></td>
    <td align="left">&nbsp;${element.value["BUILDING_NUM"]}</td>
    <td align="center"><strong>当前高度</strong></td>
    <td align="left">&nbsp;${element.value["KNOT_METRIC"]}</td>
  </tr>
  <tr>
    <td height="30" colspan="4" align="left"><strong>&nbsp;已安装明细</strong></td>
  </tr>
  <tr>
    <td colspan="4"  style="border-bottom-style:none; padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td height="30"  width="115" style="border-left-style:none;" ><strong>配件名称</strong></td>
        <td width="195"><strong>规格型号</strong></td>
        <td width="95"><strong>单位</strong></td>
        <td width="100"><strong>数量</strong></td>
        <td><strong>备注</strong></td>
      </tr>
      <c:forEach var="item" items="${components[element.key]}">
      <tr>
        <td height="30" style=" border-left-style:none;" >&nbsp;${item["COMPON_GENERIC"]}</td>
        <td>&nbsp;${item["DIMENSIONS"]}</td>
        <td>&nbsp;${item["CALCULATE"]}</td>
        <td>&nbsp;${item["COUNTS"]}</td>
        <td>&nbsp;</td>
      </tr>
	  </c:forEach>
	  <c:if test="${fn:length(components[element.key]) <= 0 }">
	  <tr>
        <td height="30" style=" border-left-style:none;" colspan="5">&nbsp;----</td>
      </tr>
	  </c:if>
    </table>
    </td>
  </tr>
  </c:forEach>
  <tr>
	<td height="60"><strong>备 注</strong></td>
	<td colspan="3" align="left">&nbsp;</td>
  </tr>
</table>
<p>
</div>
</center>
</body>
</html>