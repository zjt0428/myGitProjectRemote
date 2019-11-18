<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>租赁公司塔机第三者责任险购买明细表</title>
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
<div class="a8_bmain_detail">
<p style='text-align:center'><span class="wrod_title">租赁公司塔机第三者责任险变更表</span></p>
<p style='text-align:right'><span >打印时间：${newDate}</span></p>
<br />
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table" >
  <tr>
    <td width="100" align="center">期限内改批单</td>
    <td width="30" align="center">序号</td>
    <td  width="100" align="center">现项目名称</td>
	<td  width="100" align="center">项目地址</td>
	<td width="100" align="center">设备型号</td>
	<td width="100" align="center">出厂编号</td>
	<td width="100"  align="center">原项目名称</td>
	<td width="100" align="center">保险期限</td>
	<td width="100" align="center">备注(司机派遣)</td>
  </tr>
  <c:forEach items="${equipInsurance}" var="element" varStatus="status" >
  <tr>
  	<td align="center">新购保险</td>
  	<td align="center">${status.count}</td>
  	<td  align="center">${element.PROJECT_NAME}</td>
  	<td  align="center">${element.ADDRESS}</td>
  	<td  align="center">${element.VALUE}</td>
  	<td  align="center">${element.EXW_SERIAL}</td>
  	<td  align="center">${element.EQUIP_SERIAL}</td>
  	<td  align="center">${element.DEP_NAME}></td>
  	<td  align="center">${element.REMARK}</td>
  </tr>
  </c:forEach>
 </table>
<p>
</div>
</center>
</body>
</html>
