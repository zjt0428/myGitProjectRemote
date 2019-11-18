<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>建筑起重机械基础验收表</title>
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
<div class="er_wrod_title">建筑起重机械基础验收表</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ2090104&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="100" height="40" align="center"> 工程名称</td>
    <td>&nbsp; ${project.projectName}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="100" height="40" align="center">起重机械名称</td>
    <td width="140">&nbsp; ${equip.equipGenericName}</td>
    <td width="40" align="center" style="line-height:16px;">型号<br /> 规格</td>
    <td width="70" align="center" style="line-height:16px;">&nbsp;${equip.equipSpecificName}</td>
    <td width="40" align="center" style="line-height:16px;">备案<br />
      编号</td>
    <td width="90">&nbsp;${equip.recordId}</td>
    <td width="60" align="center" style="line-height:16px;">工地<br />
      自编号</td>
    <td>&nbsp;${equip.equipSerial}</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="100" height="38" align="center"> 总承包单位</td>
    <td width="305">&nbsp;${project.unCustomName}</td>
    <td width="90" align="center">项目负责人</td>
    <td>&nbsp;${project.unCustomLinker}</td>
  </tr>
  <tr>
    <td height="38" align="center">基础施工单位</td>
    <td>&nbsp;${project.unCustomName}</td>
    <td align="center">项目负责人</td>
    <td>&nbsp;${project.unCustomLinker}</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td height="38" align="center"><strong>验    收    项    目</strong></td>
    <td align="center"><strong>检  查  结  果</strong></td>
    <td align="center"><strong>验 收 结 论</strong></td>
  </tr>
  <tr>
    <td height="38" align="left">地基的承载能力(不小于&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;169&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kN/㎡ )</td>
    <td width="140" align="center">&nbsp;</td>
    <td width="120" align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="38" align="left">基础混凝土强度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C35&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(附试验报告)</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="38" align="left"> 基础周围有无排水设施</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="38" align="left"> 基础地下有无暗沟、孔洞（附钎探资料）</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="38" align="left">混凝土基础尺寸(预埋件尺寸)、规格是<br />
      否符合图纸及说明书要求</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="38" align="left"> 混凝土基础表面平整情况（允许偏差10mm）</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="38" align="left">钢筋、预埋件隐蔽验收记录</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="38" align="left"> 桩验收记录</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td height="120" colspan="3" align="left"  valign="top" style="padding-top:10px;">
	<p>&nbsp;验收结论：</p>
	<p>&nbsp;<br /><br /><br /></p>
	<p style="text-align:right;">验收日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>
	</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="40" rowspan="2" align="center">验<br />
      收<br />
      人<br />
      签<br />
      名</td>
    <td width="200" height="36" align="center">总 承 包 单 位</td>
    <td width="210" align="center">基 础 施 工 单 位</td>
    <td align="center">监 理 单 位</td>
  </tr>
  <tr>
    <td height="180" align="left" valign="top">
	<p>专项方案编制人(签名):</p>
	<br />
	<p> 项目技术负责人(签名):</p>
	<br />
    <p>项目负责人(签名):</p>
	<br />
	<p style="text-align:center;">（公章）</p>
	<br />
	</td>
    <td align="left" valign="top"><p>专项方案编制人(签名):</p>
      <br />
      <p> 项目技术负责人(签名):</p>
      <br />
      <p>项目负责人(签名):</p>
      <br />
      <p style="text-align:center;">（公章）</p></td>
    <td align="left" valign="top"><p>专业监理工程师(签名):</p>
      <br />
      <p> 总监理工程师(签名): </p>
      <p style="text-align:center;">&nbsp;</p></td>
  </tr>
</table>



</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
