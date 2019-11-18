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
<div class="er_wrod_title" style="padding-bottom:15px;">施工升降机垂直度测量记录表</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="300" height="30" align="left">工程名称： ${project.projectName}</td>
    <td width="300" align="left">使用单位：${project.unCustomName}</td>
    <td width="180" align="left">电梯型号：${equip.equipSpecificName}</td>
    <td width="200" align="left">自编号：${equip.equipSerial}</td>
    <td align="left">测量仪器型号：</td>
    </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="480" style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="30" rowspan="3" align="center" style="border-left-style:none; border-bottom-style:none;">垂<br />直<br />度<br />允<br />许<br />偏<br />差</td>
        <td width="80" align="center">安装高度h(m)</td>
        <td align="center">h≤70</td>
        <td align="center">70&lt;h≤100</td>
        <td align="center">100&lt;h≤150</td>
        <td align="center">150&lt;h≤200</td>
        <td align="center">h&gt;200</td>
      </tr>
      <tr>
        <td rowspan="2" align="center" style="border-bottom-style:none;">垂直度<br />偏差<br />（mm）</td>
        <td align="center">不大于<br />(1/1000)<strong>.</strong>h</td>
        <td align="center">≤70</td>
        <td align="center">≤90</td>
        <td align="center">≤110</td>
        <td align="center">≤130</td>
      </tr>
      <tr>
        <td colspan="5" align="center" style="border-bottom-style:none;">对钢丝绳式施工升降机，垂直度偏差不大于（1.5/1000）<strong>.</strong>h</td>
        </tr>
    </table></td>
    <td width="290" align="left" valign="top" ><p>电梯位置（注明东南西北）</p>
	<p align="right"><img src="../images/xy_top.jpg" width="128" height="129" /></p>
	</td>
    <td align="left">
	<p>电梯位置（注明东南西北）</p>
	<p align="right"><img src="../images/xy_right.jpg" width="128" height="129" /></p>
	</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="114" height="80" valign="middle">测量时间</td>
    <td width="114" valign="middle">测量人员</td>
    <td width="114" valign="middle">复核人</td>
    <td width="119" valign="middle">实际安装高度</td>
    <td width="90" valign="middle">偏移方向</td>
    <td width="100" valign="middle">偏移量（mm）</td>
    <td width="90" valign="middle">是否合格</td>
    <td valign="middle">偏移方向</td>
    <td valign="middle">偏移量（mm）</td>
    <td valign="middle">是否合格</td>
  </tr>
  <tr>
    <td height="80">&nbsp;</td>
    <td>&nbsp;</td>
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
    <td height="80" align="center">测量时间</td>
    <td align="center">测量人员</td>
    <td align="center">复核人</td>
    <td align="center">实际安装高度</td>
    <td align="center">偏移方向</td>
    <td align="center">偏移量（mm）</td>
    <td align="center">是否合格</td>
    <td align="center">偏移方向</td>
    <td align="center">偏移量（mm）</td>
    <td align="center">是否合格</td>
  </tr>
  <tr>
    <td height="80">&nbsp;</td>
    <td>&nbsp;</td>
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
    <td height="80" align="center">测量时间</td>
    <td align="center">测量人员</td>
    <td align="center">复核人</td>
    <td align="center">实际安装高度</td>
    <td align="center">偏移方向</td>
    <td align="center">偏移量（mm）</td>
    <td align="center">是否合格</td>
    <td align="center">偏移方向</td>
    <td align="center">偏移量（mm）</td>
    <td align="center">是否合格</td>
  </tr>
  <tr>
    <td height="80">&nbsp;</td>
    <td>&nbsp;</td>
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
