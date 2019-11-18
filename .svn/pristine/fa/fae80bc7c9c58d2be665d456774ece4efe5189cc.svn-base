<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<title>租金结算清单</title>
<style media=print>
.Noprint {
	display: none;
}
</style>
<style type="text/css">
<!--
body,td,th {
	font-size: 18px;
}

.main_detail_0523{width:900px; margin:0 auto; height:1050px; font-size:16px;}
.mar_15{margin-top:15px; margin-right:20px; margin-bottom:5px; width:660px;text-align:right;}

/*列表页表格0523*/
.listtable0523{
	width:100%;	
	font-size:16px;	
	border: 1px solid #000000; 
	border-collapse: collapse;}

	
.listtable0523 td {
	border-left:1px solid #000000;
	border-bottom:1px solid #000000;
	color:#000000;
	line-height:24px;
	text-align:center;
	}	


-->
</style>
</head>
<body>
<center class="Noprint">
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size:12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size:12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size:12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
<div class="main_detail_0523">
<p style="text-align:center;"><span style="font-size:20px; font-weight:bold;">${settleContract.pbEntName} 租金结算清单</span></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="40" align="left"><strong>工程名称：${settleContract.projectName}</strong></td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable0523">
  <tr>
    <td rowspan="2" bgcolor="#CCCCCC" width="50">楼号</td>
    <td rowspan="2" bgcolor="#CCCCCC" width="130">品名</td>
    <td rowspan="2" bgcolor="#CCCCCC" width="100">规格</td>
    <td colspan="2" bgcolor="#CCCCCC">本次计费时间</td>
    <td rowspan="2" bgcolor="#CCCCCC" width="60">计费<br />天数</td>
    <td rowspan="2" bgcolor="#CCCCCC" width="60">租用<br />数量</td>
    <td rowspan="2" bgcolor="#CCCCCC" width="60">单价 <br />（元）</td>
    <td rowspan="2" bgcolor="#CCCCCC" width="80">扣除租金</td>
    <td rowspan="2" bgcolor="#CCCCCC" width="100">租金累计<br />（元）</td>
    <td rowspan="2" bgcolor="#CCCCCC">备注</td>
     <td rowspan="2" bgcolor="#CCCCCC" width="60">启用管理</td>
  </tr>
  <tr>
    <td bgcolor="#CCCCCC" width="80">开始日</td>
    <td bgcolor="#CCCCCC" width="80">截止日</td>
  </tr>
</table>
<c:forEach var="element" items="${settleBuildingNumItems}" varStatus="status">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable0523">
  <c:forEach var="item" items="${element.settleRentItems}" begin="0" end="0">
  <tr>
    <td height="36" width="50" rowspan="${fn:length(element.settleRentItems)}">&nbsp;${item.buildingNum}</td>
    <td width="130">&nbsp;${item.categoryName}</td>
    <td width="100">&nbsp;${item.specificName}</td>
    <td width="80">&nbsp;${item.startSettleDate}</td>
    <td width="80">&nbsp;${item.endSettleDate}</td>
    <td width="60">&nbsp;${item.settleDays}</td>
    <td width="60">&nbsp;${item.quantity}</td>
    <td width="60">&nbsp;${item.daysRent}</td>
    <td width="80">&nbsp;${item.deductRent}</td>
    <td width="100">&nbsp;${item.summary}</td>
    <td>&nbsp;${item.remark}</td>
  </tr>
  </c:forEach>
  <c:forEach var="item" items="${element.settleRentItems}" begin="1">
  <tr>
    <td height="36" width="130">&nbsp;${item.categoryName}</td>
    <td width="100">&nbsp;${item.specificName}</td>
    <td width="80">&nbsp;${item.startSettleDate}</td>
    <td width="80">&nbsp;${item.endSettleDate}</td>
    <td width="60">&nbsp;${item.settleDays}</td>
    <td width="60">&nbsp;${item.quantity}</td>
    <td width="60">&nbsp;${item.daysRent}</td>
    <td width="80">&nbsp;${item.deductRent}</td>
    <td width="100">&nbsp;${item.summary}</td>
    <td>&nbsp;${item.remark}</td>
  </tr>
  </c:forEach>
  <tr>
    <td height="36" colspan="8" style="text-align:right;">小计：</td>
    <td>&nbsp;${element.deductRent}</td>
    <td colspan="2">&nbsp;${element.summary}</td>
  </tr>
</table>
</c:forEach>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable0523">  
  <tr>
    <td height="36" colspan="8" style="text-align:right;"><strong>本次应收总计：</strong></td>
    <td width="80">&nbsp;</td>
    <td colspan="2">&nbsp;${totalAmount}</td>
  </tr>
  <tr>
    <td height="36" colspan="11" style="text-align:left;">&nbsp;租费金额（大写）&nbsp;&nbsp;&nbsp;${digTotalAmount }</td>
  </tr>
  <tr style="display: none;">
    <td height="36" width="50">&nbsp;</td>
    <td width="130">&nbsp;</td>
    <td width="100">&nbsp;</td>
    <td width="80">&nbsp;</td>
    <td width="80">&nbsp;</td>
    <td width="60">&nbsp;</td>
    <td width="60">&nbsp;</td>
    <td width="60">&nbsp;</td>
    <td width="80">&nbsp;</td>
    <td width="100">&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="80" colspan="2">承租单位</td>
    <td colspan="3">&nbsp;${settleContract.paEntName}</td>
    <td colspan="3">承租单位<br /> 签字</td>
    <td colspan="3">&nbsp;</td>
    </tr>
</table>
<table>
  <tr>
     <td colspan="3">打印日期<br /> </td>
    <td colspan="3">&nbsp;${currentTime}</td>
    <td height="80" colspan="2">启用日期</td>
    <td colspan="3">&nbsp;${settleContract.paEntName}</td>
    <td colspan="3">购置时间<br /> </td>
    <td colspan="3">&nbsp;</td>
       <td colspan="3">报停日期<br /> </td>
    <td colspan="3">&nbsp;</td>
    </tr>
</table>
</div>
</center>
</body>
</html>