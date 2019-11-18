<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>付款审批单</title>
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
<p style='text-align:center'><span class="wrod_title">${amountPayment.paymentEntName }</span></p>
<p style='text-align:center'><span class="wrod_title">付款审批单</span></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-top:20px;">
  <tr>
    <td width="80" height="36">&nbsp;收款单位：</td>
    <td width="240">&nbsp;${amountPayment.receiveName }</td>
    <td width="72">上报部门：</td>
    <td width="110">&nbsp;${amountPayment.department.depName }</td>
    <td width="50">时间：</td>
    <td>&nbsp;${amountPayment.providedDate }</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="90" height="50" align="center">付款单位</td>
    <td width="220">&nbsp;${amountPayment.paymentEntName }</td>
    <td width="80" align="center">付款主题</td>
    <td>&nbsp;${amountPayment.amountTheme }</td>
  </tr>
  <tr>
    <td height="50" align="center">费用类别</td>
    <td>&nbsp;${amountPayment.feesTypeName }</td>
    <td align="center">支付内容</td>
    <td>&nbsp;${amountPayment.paymentContent }</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td width="90" height="40" align="center">总价</td>
    <td width="160">&nbsp;${amountPayment.relateAmount }</td>
    <td width="54" align="center">余额</td>
    <td width="120">&nbsp;${amountPayment.payableDebit }</td>
    <td width="80">累计支付</td>
    <td>&nbsp;${amountPayment.hasPaymentAmount }</td>
  </tr>
  <tr>
    <td height="40" align="center">本次支付金额</td>
    <td>&nbsp;${amountPayment.paymentAmount }</td>
    <td align="center">大写</td>
    <td colspan="3">&nbsp;${digPaymentAmount }</td>
    </tr>
  <tr>
    <td height="40" align="center">付款类型</td>
    <td>&nbsp;${amountPayment.paymentTypeName }</td>
    <td align="center">账号</td>
    <td colspan="3">&nbsp;${amountPayment.receiveAccount }</td>
    </tr>
  <tr>
    <td height="50" colspan="3" align="left">部门审批</td>
    <td colspan="3" align="left">领导审批</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="80" height="36">会计主管：  </td>
    <td width="160">&nbsp;</td>
    <td width="50">出纳： </td>
    <td width="160">&nbsp;</td>
    <td width="60"> 收款人：</td>
    <td>&nbsp;</td>
  </tr>
</table>


</p>



</div>
</center>
</body>
</html>
