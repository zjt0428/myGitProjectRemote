<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>施工机械验收鉴定单</title>
<style media="print">
.Noprint {
	display: none;
	
}
.PageNext {
	page-break-after: always;
}
</style>

<link href="../css/er_style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<center>
<div class="er_main_detail">
<div class="er_wrod_title" style="padding-bottom:15px;">施工机械验收鉴定单</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="80" height="30">使用单位：</td>
    <td width="350" align="left">&nbsp;${equip.propertyName}</td>
    <td width="50" align="center">序号：</td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td height="30">使用地点： </td>
    <td align="left">&nbsp;${project.address}</td>
    <td align="center"><p>附表：</p></td>
    <td align="left">&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_24">
  <tr>
    <td width="80" height="36" align="center">名    称</td>
    <td width="250">&nbsp;${equip.equipGenericName}</td>
    <td width="80" align="center">统一编号</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="center">规格型号</td>
    <td>&nbsp;${equip.equipSpecificName}</td>
    <td align="center">生产厂家</td>
    <td>&nbsp;${equip.equipVender}</td>
  </tr>
  <tr>
    <td height="36" align="center">出厂编号</td>
    <td>&nbsp;${equip.exwSerial}</td>
    <td align="center">出厂日期</td>
    <td>&nbsp;${equip.exwDate}</td>
  </tr>
  <tr>
    <td height="36" align="center">价    格</td>
    <td>&nbsp;</td>
    <td align="center">进场日期</td>
    <td>&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="80" height="80" align="center">主要技术 <br />
      参     &nbsp;数</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="60" align="center">随机附件<br />
      及 资 料</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="60" align="center">安装调试 <br />
      情     况</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">符合法规、<br />环保要求<br />情况</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="60" align="center">验收(鉴定)<br />
      结    论</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="200" align="center">参加验收<br />
      (鉴定)人员</td>
    <td align="left">
	<p><span>&nbsp;总包单位：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 日</p><br />
	<p><span>&nbsp;安装单位：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 日</p><br />
	<p><span>&nbsp;监理单位：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 日</p>
	</td>
  </tr>
</table>
<p style="width:100%; line-height:24px; padding-top:10px; text-align:left;"><strong>注意：</strong>验收是指基础设施的完好和满足环保要求的程度；<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;鉴定是指基础设施完好情况下对质量的保证能力。</p>

</div>

</div>
<div class="PageNext"></div>
</center>
</body>
</html>
