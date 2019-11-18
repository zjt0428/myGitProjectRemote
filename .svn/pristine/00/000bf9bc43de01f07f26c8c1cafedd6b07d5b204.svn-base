<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>运输确认单</title>
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
<DIV class="main_detail">
<p style='text-align:center'><span class="wrod_title">${corpInfo.corpName}</span></p>
<p style='text-align:center'><span class="wrod_title">设备零部件调拔物流确认单</span></p>
<p style='text-align:center'>
<table width="98%" border="0" cellspacing="0" cellpadding="0" style="font-size:16px;">
  <tr>
    <td align="right"width="15%" style="font-weight:bold; height:40px; line-height:40px;">物流单号:</td>
    <td style="padding-left:3px;">${logisticsTransport.transportSerial}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <th width="20%" height="32">项目名称</th>
    <td width="30%">${logisticsTransport.projectName}</td>
    <th width="20%">发货时间</th>
    <td>${logisticsTransport.deliveryDate}</td>
  </tr>
  <tr>
    <th height="32">收货地址</th>
    <td>${logisticsTransport.address}</td>
    <th>运输费用</th>
    <td>${logisticsTransport.transportAmount}</td>
  </tr>
  <tr>
    <th height="32">发货单位</th>
    <td>${logisticsTransport.deliveryEntName}</td>
    <th>收货单位</th>
    <td>${logisticsTransport.receiveEntName}</td>
  </tr>
  <tr>
    <th height="32">发货经办人</th>
    <td>${logisticsTransport.deliveryMan}</td>
    <th>联系电话</th>
    <td>${logisticsTransport.deliveryPhone}</td>
  </tr>
  <tr>
    <th height="32">收货人</th>
    <td>${logisticsTransport.receiveMan}</td>
    <th>联系电话</th>
    <td>${logisticsTransport.receivePhone}</td>
  </tr>
  <tr>
    <th height="32">备  注</th>
    <td colspan="3">${logisticsTransport.remark}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
<c:forEach var="element" items="${logisticsTransport.logisticsTrancarfeeSet}" varStatus="status">
	<c:if test="${status.count==1&&element!=null}">
  <tr>
    <td colspan="7" bgcolor="#acacac" style="font-weight:bold; border-top-style:none;" height="32">运输费用清单</td>
  </tr>
		<tr>
    	<th height="32" width="20%">运输车辆 </th>
    	<th width="12%">车型</th>
    	<th width="12%">车次台班</th>
    	<th width="16%">产权归属</th>
    	<th width="15%">单价</th>
    	<th width="8%">小计</th> 
    	<th>备注</th>
  	</tr>           
    </c:if>
  <tr>
    <td height="32">${element.licensePlate}</td>
    <td>${element.sedan}</td>
    <td>${element.motorcoach}</td>
    <td>${element.propertyName}</td>
    <td>${element.unitPrice}</td>
    <td align="center">${element.amount}</td>
    <td>${element.remark}</td>
  </tr>
  </c:forEach>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
<c:forEach var="element1" items="${logisticsTransport.logisticsTranDistributionbutionSet}"  varStatus="status">
<c:if test="${status.count==1&&element1==null}">
<c:forEach var="element2" items="${trandetails}" varStatus="status">
	<c:if test="${status.count==1&&element2==null}">
  </c:if>
  <c:if test="${status.count==1&&element2!=null}">
  <tr>
    <td colspan="8" bgcolor="#acacac" style="font-weight:bold; border-top-style:none;" height="32">发货运输清单</td>
  </tr>
  <tr>
    <th width="18%">配件名称</th>
    <th width="6%">单位</th>
    <th width="15%">规格型号</th>
    <th width="6%">数量</th>
    <th width="15%">出厂编号</th>
    <th>备注</th>
  </tr>  
  </c:if> 
  </c:forEach>
  </c:if>
  <c:if test="${status.count==1&&element1!=null}">
  <tr>
    <td colspan="8" bgcolor="#acacac" style="font-weight:bold; border-top-style:none;" height="32">发货运输清单</td>
  </tr>
  <tr>
    <th width="18%">配件名称</th>
    <th width="6%">单位</th>
    <th width="15%">规格型号</th>
    <th width="6%">数量</th>
    <th width="15%">出厂编号</th>
    <th>备注</th>
  </tr> 
  </c:if>  
  </c:forEach>
  <c:forEach var="element" items="${trandetails}">
  <c:if test="${element.COUNTS !=0}">
  <tr>
    <td>${element.COMPON_GENERIC}</td>
    <td>${element.CALCULATE}</td>
    <td>${element.COMPON_SPECIFIC}</td>
    <td align="center">${element.COUNTS}</td>
    <td>${logisticsTransport.equipment.exwSerial}</td>
    <td>${element.REMARK}</td>
  </tr>
  </c:if>
  </c:forEach>
  <c:forEach var="element" items="${logisticsTransport.logisticsTranDistributionbutionSet}">
   <c:if test="${element.quantity !=0}">
  <tr>
    <td>${element.componGenericName}</td>
    <td>${element.calculate}</td>
    <td>${element.dimensions}</td>
    <td align="center">${element.quantity}</td>
    <td></td>
    <td></td>
  </tr>
   </c:if>
   </c:forEach>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0"  class="listtable" style="border-top-style:none;">
 <tr>
    <td colspan="2" bgcolor="#acacac" style="font-weight:bold;" height="32">运输签收确认</td>
  </tr>
  <tr>
    <td  width="50%">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
		  <tr>
			<td width="50%" class="tbold">运输人员签字：</td>
			<td>&nbsp;</td>
		  </tr>
		  <tr>
			<td>&nbsp;</td>
			<td>年&nbsp;&nbsp;月&nbsp;&nbsp;日</td>
		  </tr>
		</table>
	</td>
     <td height="100" width="50%">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
		  <tr>
			<td width="50%" class="tbold">接收人员签字：</td>
			<td>&nbsp;</td>
		  </tr>
		  <tr>
			<td>&nbsp;</td>
			<td>年&nbsp;&nbsp;月&nbsp;&nbsp;日</td>
		  </tr>
		</table>
	</td>
  </tr>
</table>
</p>
</DIV>
</center>
</body>
</html>