<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>APP物流配件单</title>
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
<div class="hzbmain_detail">
<%-- <p style='text-align:center'><span class="wrod_title">${repair.equipment.propertyName}</span></p> --%>
  <p style='text-align:center'><span class="wrod_title">厦门日升科技</span></p><br>
<p style='text-align:center'><span class="wrod_title">设备零部件调拨物流确认单</span></p><br>

<p style='text-align:left'><span class="tj_title">车牌号:</span></p><br>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table">
  <tr>
    <td width="100" height="30">项目名称</td>
    <td width="100">&nbsp;${dispatch.projName}</td>
    <td width="100">发货时间</td>
    <td width="100">&nbsp;${tappLogistics.deliveryDate}</td>
  </tr>
  <tr>
    <td height="30">出发地</td>
    <td>&nbsp;${tappLogistics.sendWarehouseName}</td>
    <td>目的地</td>
    <td>&nbsp;${tappLogistics.receiveWarehouseName}</td>
  </tr>
  <tr>
    <td height="30">收货地址</td>
    <td>&nbsp;${tappLogistics.receWarehouseAddress}</td>
    <td>运输单位</td>
    <td>&nbsp;${tappLogistics.propertyName}</td>
  </tr>
  <tr>
    <td height="30">发货人</td>
    <td>&nbsp;${tappLogistics.deliveryMan}</td>
    <td>运输费用</td>
    <td>&nbsp;${tappLogistics.summary}</td>
  </tr>
  <tr>
    <td height="30">收货人</td>
    <td>&nbsp;${tappLogistics.signMan}</td>
    <td>出场编号</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30">备注</td>
    <td colspan="3">&nbsp;${tappLogistics.remark}</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table" style="border-top-style:none;"> 
  <tr>
    <td height="30" colspan="5" style="background-color:#E0E0E0; font-weight:bold; padding-left:5px; text-align:left;">运输清单</td>
    </tr>
  <tr>
    <td height="30" width="15%">配件名称</td>
    <td width="10%">规格型号</td>
    <td width="10%">物流数量</td>
    <td width="10%">签收数量</td>
    <td width="10%">备注</td>
  </tr>
  <c:forEach var="element" items="${tappLogistics.TAppLogisticsCompSet}" varStatus="status" >
  <tr>
    <td height="30">&nbsp;${element.TAppComponDispatchDetail.compName}</td>
    <td>&nbsp;${element.TAppComponDispatchDetail.compSpec}</td>
    <td>&nbsp;${element.logiNum}</td>
    <td>&nbsp;${element.receNum}</td>
    <td>&nbsp;</td>
  </tr>
  </c:forEach>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hzb_table" style="border-top-style:none;"> 
  <tr>
    <td height="30" colspan="5" style="background-color:#E0E0E0; font-weight:bold; padding-left:5px; text-align:left;">附件清单</td>
    </tr>
  <tr>
    <td height="30" width="15%">配件名称</td>
    <td width="10%">配件型号</td>
    <td width="10%">单位</td>
    <td width="10%">数量</td>
    <td width="10%">备注</td>
  </tr>
  <c:forEach var="element" items="${tappLogistics.logisticsTranDistributionSet}" varStatus="status" >
  <tr>
    <td height="30">&nbsp;${element.componGenericName}</td>
    <td>&nbsp;${element.component.componSpecificName}</td>
    <td>&nbsp;${element.component.calculate}</td>
    <td>&nbsp;${element.quantity}</td>
    <td>&nbsp;</td>
  </tr>
  </c:forEach>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
    <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</div>
</center>
</body>
</html>

