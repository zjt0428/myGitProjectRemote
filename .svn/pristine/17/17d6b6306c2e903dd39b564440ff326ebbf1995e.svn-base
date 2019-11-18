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
	width : 1000px;
}
.PageNext {
	page-break-after: always;
}
.qzj_table {
	width : 800px;
}
.main_detail{
    width : 800px;
}
</style>
</head>

<body>
<center class="Noprint">
	<p align="right" class="mar_15">
		<object id="WebBrowser" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="window.print()">
	</p>
</center>
<center>
<div class="hzbmain_detail">
<p style='text-align:center'><span class="wrod_title">租赁公司塔机第三者责任险购买明细表</span></p>
<p style='text-align:right'><span >打印时间：${newDate}</span></p>
<br />
<p>
<table  border="0" cellspacing="0" cellpadding="0" class="qzj_table" >
  <tr>
    <td width="70" height="50" align="center">项目</td>
    <td width="30" align="center">序号</td>
    <td  width="110" align="center">项目名称</td>
	<td  width="110" align="center">项目地址</td>
	<td width="70" align="center">设备型号</td>
	<td width="70" align="center">出厂编号</td>
	<td width="70"  align="center">设备自编号</td>
	<td width="80" align="center">所属部门</td>
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
  	<td  align="center">${element.DEP_NAME}</td>
  	<td  align="center">${element.REMARK}</td>
  </tr>
  </c:forEach>
  <tr>
    <td  height="70" align="center" colspan="3">本次申请所购保险总台数</td>
    <td height="70" align="center">${premium}台</td>
    <td height="70" align="center" colspan="3">需办款金额</td>
    <td height="70" align="center" colspan="2">${totalPremium}元</td>		
  </tr>
  <tr>
    <td  height="70" align="center" colspan="3">经办人</td>
    <td height="70" align="center" colspan="2"> </td>
    <td height="70" align="center" colspan="2">分公司经理</td>
    <td height="70" align="center" colspan="2"> </td>		
  </tr>
 </table>
<p>
</div>
</center>
</body>
</html>
