<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>报销单</title>
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
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
<div class="main_detail">
<p style='text-align:center'><span class="wrod_title" style="font-size:16px;">${reimburse.paymentEntName}</span></p>
<p style='text-align:center'><span class="wrod_title">费用报销单</span></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-bottom:5px;padding-top:10px;">
  <tr>
    <td width="70">报销部门</td>
    <td width="120" style="border-bottom:1px #000000 solid;">&nbsp;${appUser.department.depName }</td>
    <td width="20">&nbsp;</td>
    <td width="40">时间</td>
    <td width="100" style="border-bottom:1px #000000 solid;">&nbsp;${reimburse.providedDate}</td>
    <td width="20">&nbsp;</td>
    <td width="50">票据共</td>
    <td width="40" style="border-bottom:1px #000000 solid;">&nbsp;${reimburse.ticketCount}</td>
    <td width="25">张</td>
     <td width="20">&nbsp;</td>
    <td width="40">编号</td>
    <td style="border-bottom:1px #000000 solid;">&nbsp;${reimburse.reimburseSerial}</td>
  </tr>
</table>
</p><p>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td height="36" width="50">序号</td>
    <td width="80">发生日期</td>
    <td width="220">用途</td>
    <td width="100">金额</td>
    <td width="200">费用说明</td>
  </tr>
  <c:forEach var="element" items="${reimburse.reimburseTicketSet}" varStatus="status">
  <tr>
    <td height="36">${status.count}</td>
    <td>&nbsp;${element.ticketDate}</td>
    <td>&nbsp;${element.reimburseTypeName}</td>
    <td>&nbsp;${element.summary}</td>
    <td>&nbsp;${element.remark}</td>
  </tr>
  </c:forEach>
  <tr>
    <td height="36" colspan="3">合计（大写金额）：  ${bigAskforAmount }</td>
    <td>&nbsp;合计</td>
    <td>&nbsp;${reimburse.askforAmount }</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;" >
  <tr>
    <td width="130" height="50" align="center">备注</td>
    <td>&nbsp;${reimburse.description }</td>
  </tr>
  <tr>
    <td height="50" align="center">领导审批</td>
    <td  align="center">（签字）</td>
  </tr>
</table>


<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="33%" height="40"> 会计主管：  </td>
    <td width="33%">出纳：</td>
    <td><p>报销人：</p></td>
  </tr>
</table>

</p>



</div>
</center>
</body>
</html>