<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>建筑起重机械使用登记牌(施工升降机)</title>
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
<div class="er_wrod_title">建筑起重机械使用登记牌<br />( 施 工 升 降 机 )</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="24" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ21009
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
  <tr>
    <td height="24" align="left" style="padding-right:10px; padding-bottom:2px;"> 使用登记号:</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_24">
  <tr>
    <td height="28" align="center">工 程 名 称</td>
    <td colspan="3" align="left">&nbsp;${project.projectName}</td>
    </tr>
  <tr>
    <td height="28" align="center">工 程 地 址</td>
    <td colspan="3" align="left">&nbsp;${project.address}</td>
    </tr>
  <tr>
    <td width="100" height="28" align="center"> 设备安装位置</td>
    <td width="230" align="left">&nbsp;${indisSchema.axisPosition}</td>
    <td width="100" align="center">告知受理号</td>
    <td width="230" align="left">&nbsp;${indisNotice.acceptNumber}</td>
  </tr>
  <tr>
    <td height="28" align="center">规 格 型 号</td>
    <td align="left">&nbsp;${equip.equipSpecificName}</td>
    <td align="center">备案编号</td>
    <td align="left">&nbsp;${equip.recordId}</td>
  </tr>
  <tr>
    <td height="28" align="center"> 出 厂 编 号</td>
    <td align="left">&nbsp;${equip.exwSerial}</td>
    <td align="center">工地自编号</td>
    <td align="left">&nbsp;${indisNotice.indisSchema.blockNumber}</td>
  </tr>
  <tr>
    <td height="28" align="center">总承包单位</td>
    <td colspan="3" align="left">&nbsp;${project.unCustomName}</td>
    </tr>
  <tr>
    <td height="28" align="center"> 安 装 单 位</td>
    <td colspan="3" align="left">&nbsp;${equip.propertyName}</td>
    </tr>
  <tr>
    <td height="28" align="center"> 使 用 单 位</td>
    <td colspan="3" align="left">&nbsp;${equip.propertyName}</td>
    </tr>
  <tr>
    <td height="28" align="center" style="line-height:20px;">产权(或出租)<br />单        位</td>
    <td colspan="3" align="left">&nbsp;${project.unCustomName}</td>
    </tr>
  <tr>
    <td height="28" align="center"> 制 造 单 位</td>
    <td colspan="3" align="left">&nbsp;${equip.equipVender}</td>
    </tr>
  <tr>
    <td height="28" align="center"> 检 验 单 位</td>
    <td colspan="3" align="left">&nbsp;${equipDetect.detectEntName}</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_24" style="border-top-style:none;">
  <tr>
    <td width="100" height="28" align="center">检验类别</td>
    <td width="340">&nbsp;</td>
    <td width="70" rowspan="2" align="center">检验时<br /> 高度(m)</td>
    <td rowspan="2" width="150">&nbsp;   </td>
  </tr>
  <tr>
    <td height="28" align="center">检验报告编号</td>
    <td>&nbsp;</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="50" height="50" align="center">性能<br />参数</td>
    <td width="80" align="center">额定载重量</td>
    <td width="110" align="right">${equip.loadingWeight}kg&nbsp;</td>
    <td width="60" align="center">最大架<br />设高度</td>
    <td width="110" align="right">m </td>
    <td width="70" align="center">最大自由<br />
      端高度</td>
    <td align="right">m </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td height="30" colspan="2">&nbsp;</td>
    </tr>
  <tr>
    <td colspan="2">
	<br><br><br>
	<p>签发机构(章)：</p>
	<br>
	<p>签发日期：</p>
	<br>
	<p style="align:left;">使用登记牌有效期：</p>
	<br>
	</td>
    </tr>
  <tr>
    <td width="60" height="120" align="center"><p>备</p>
      <p>注</p></td>
    <td width="600" align="left">1.本牌登记的设备参数，若与有效的产品使用说明书有异，则以产品说明书为准。<br />
      2.此使用登记牌附于施工升降机轿厢内显著位置</td>
  </tr>
</table>



</div>

</div>
<div class="PageNext"></div>
</center>
</body>
</html>
