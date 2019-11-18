<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>施工升降机垂直度测量记录表</title>
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
<div class="er_heng_main_detail">
<div class="er_wrod_title" style="padding-bottom:15px;">塔吊垂直度测量记录表</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="300" height="30" align="left">工程名称： ${project.projectName}</td>
    <td width="300" align="left">使用单位：${project.unCustomName}</td>
    <td width="180" align="left">塔吊型号：${equip.equipSpecificName}</td>
    <td width="200" align="left">自编号：${equip.equipSerial}</td>
    <td align="left">测量仪器型号：</td>
    </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="480" style="padding:0px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="40" rowspan="3" align="center" style="border-bottom-style:none; border-left-style:none;">相<br />关<br />数<br />据</td>
        <td height="50" align="left">1、塔身基础对建筑物±0.00（±）（                 ）</td>
      </tr>
      <tr>
        <td height="50" align="left">2、悬臂端高度或自由高度偏移量不超4‰为合格</td>
      </tr>
      <tr>
        <td height="50" align="left" style="border-bottom-style:none">3、塔身基础至最上一道附着之间高度不超2‰为合格</td>
      </tr>
    </table></td>
    <td width="290" align="left" valign="top" ><p>塔身位置（注明东南西北）</p>
	<p align="right"><img src="../images/xy_top.jpg" width="128" height="129" /></p>
	</td>
    <td align="left">
	<p>塔身位置（注明东南西北）</p>
	<p align="right"><img src="../images/xy_right.jpg" width="128" height="129" /></p>
	</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" style="border-top-style:none;">
  <tr>
    <td width="90" rowspan="2" align="center">测量时间</td>
    <td width="80" rowspan="2" align="center">测量人员</td>
    <td width="80" rowspan="2" align="center">复核人</td>
    <td width="80" rowspan="2" align="center">实际安装<br /> 高度</td>
    <td width="126" align="center">塔身基础至最上一<br />道附着之间高度</td>
    <td width="70" align="center">偏移<br />方向<br /></td>
    <td width="65" align="center">偏移量<br />mm<br /></td>
    <td width="70" align="center">垂直度‰</td>
    <td width="70" align="center">是否合格</td>
    <td width="90" align="center">偏移<br />方向</td>
    <td width="90" align="center">偏移量<br />mm</td>
    <td width="80" align="center">垂直度‰</td>
    <td align="center">是否合格</td>
  </tr>
  <tr>
    <td height="26">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2">&nbsp;</td>
    <td rowspan="2">&nbsp;</td>
    <td rowspan="2">&nbsp;</td>
    <td rowspan="2">&nbsp;</td>
    <td align="center">塔身基础至最上一<br />道附着之间高度</td>
    <td align="center">偏移<br />方向</td>
    <td align="center">偏移量<br />mm</td>
    <td align="center">垂直度‰</td>
    <td align="center">是否合格</td>
    <td align="center">偏移<br />方向</td>
    <td align="center">偏移量<br />mm</td>
    <td align="center">垂直度‰</td>
    <td align="center">是否合格</td>
  </tr>
  <tr>
    <td height="26">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" style="border-top-style:none;">
  <tr>
    <td width="90" rowspan="2" align="center">测量时间</td>
    <td width="80" rowspan="2" align="center">测量人员</td>
    <td width="80" rowspan="2" align="center">复核人</td>
    <td width="80" rowspan="2" align="center">实际安装<br /> 高度</td>
    <td width="126" align="center">塔身基础至最上一<br />道附着之间高度</td>
    <td width="70" align="center">偏移<br />方向<br /></td>
    <td width="65" align="center">偏移量<br />mm<br /></td>
    <td width="70" align="center">垂直度‰</td>
    <td width="70" align="center">是否合格</td>
    <td width="90" align="center">偏移<br />方向</td>
    <td width="90" align="center">偏移量<br />mm</td>
    <td width="80" align="center">垂直度‰</td>
    <td align="center">是否合格</td>
  </tr>
  <tr>
    <td height="26">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2">&nbsp;</td>
    <td rowspan="2">&nbsp;</td>
    <td rowspan="2">&nbsp;</td>
    <td rowspan="2">&nbsp;</td>
    <td align="center">塔身基础至最上一<br />道附着之间高度</td>
    <td align="center">偏移<br />方向</td>
    <td align="center">偏移量<br />mm</td>
    <td align="center">垂直度‰</td>
    <td align="center">是否合格</td>
    <td align="center">偏移<br />方向</td>
    <td align="center">偏移量<br />mm</td>
    <td align="center">垂直度‰</td>
    <td align="center">是否合格</td>
  </tr>
  <tr>
    <td height="26">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>


<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" style="border-top-style:none;">
  <tr>
    <td width="90" rowspan="2" align="center">测量时间</td>
    <td width="80" rowspan="2" align="center">测量人员</td>
    <td width="80" rowspan="2" align="center">复核人</td>
    <td width="80" rowspan="2" align="center">实际安装<br /> 高度</td>
    <td width="126" align="center">塔身基础至最上一<br />道附着之间高度</td>
    <td width="70" align="center">偏移<br />方向<br /></td>
    <td width="65" align="center">偏移量<br />mm<br /></td>
    <td width="70" align="center">垂直度‰</td>
    <td width="70" align="center">是否合格</td>
    <td width="90" align="center">偏移<br />方向</td>
    <td width="90" align="center">偏移量<br />mm</td>
    <td width="80" align="center">垂直度‰</td>
    <td align="center">是否合格</td>
  </tr>
  <tr>
    <td height="26">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2">&nbsp;</td>
    <td rowspan="2">&nbsp;</td>
    <td rowspan="2">&nbsp;</td>
    <td rowspan="2">&nbsp;</td>
    <td align="center">塔身基础至最上一<br />道附着之间高度</td>
    <td align="center">偏移<br />方向</td>
    <td align="center">偏移量<br />mm</td>
    <td align="center">垂直度‰</td>
    <td align="center">是否合格</td>
    <td align="center">偏移<br />方向</td>
    <td align="center">偏移量<br />mm</td>
    <td align="center">垂直度‰</td>
    <td align="center">是否合格</td>
  </tr>
  <tr>
    <td height="26">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>


</div>



</div>
<div class="PageNext"></div>
</center>
</body>
</html>
