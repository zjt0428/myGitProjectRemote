<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>6.应急救援方案封皮</title>
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
<div class="er_w100" id="page1" style="page-break-after:always">
<p style="text-align:right;"><strong>GDAQ21008&nbsp;&nbsp;</strong> <input name="" type="text" style="width:80px; border:1px solid #000000;"/><br /><br /></p>
<p><table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:18px; font-family:"宋体"">
  <tr>
    <td width="250" style="font-size:18px;"><u><strong>${indisSchema.blockNumber}塔吊安装<br />升应急救援预案施工方案</strong></u></td>
    <td align="center" style="font-size:24px;font-family:'Microsoft YaHei';"><strong>专业承包工程安全专项施工方案</strong></td>
  </tr>
</table>
</p>
<br /><br />

<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:18px; font-weight:bold;">
  <tr>
    <td width="200" height="90" align="right">工 程 名 称:</td>
    <td colspan="2">&nbsp;${project.projectName}</td>
    </tr>
  <tr>
    <td height="90" align="right" style="line-height:24px;">专业承包单位:<br /><font style="font-weight:normal; font-size:14px;">(公章)</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td colspan="2">&nbsp;${equip.propertyName}</td>
    </tr>
  <tr>
    <td height="90" align="right">编&nbsp;&nbsp;&nbsp;&nbsp;制&nbsp;&nbsp;&nbsp;&nbsp;人 :</td>
    <td width="400">&nbsp;</td>
    <td width="160" style="font-weight:normal; ">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
  <tr>
    <td height="90" align="right">审&nbsp;&nbsp;&nbsp;&nbsp;核&nbsp;&nbsp;&nbsp;&nbsp;人 :</td>
    <td>&nbsp;</td>
    <td style="font-weight:normal; ">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
  <tr>
    <td height="90" align="right"  style="line-height:24px;">审&nbsp;&nbsp;&nbsp;&nbsp;批&nbsp;&nbsp;&nbsp;&nbsp;人 :<br />
      <font style="font-weight:normal; font-size:14px;">(企业技术负责人</font><font style="font-weight:normal; font-size:14px;">)</font>&nbsp; </td>
    <td>&nbsp;</td>
    <td style="font-weight:normal; ">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
  <tr>
    <td height="20" colspan="3" align="right" style="border-bottom:1px dashed #000000">&nbsp;</td>
  </tr>
  <tr>
    <td height="70" align="right" style="padding-top:20px; line-height:24px;">总 承 包 单 位 :<br /><font style="font-weight:normal; font-size:14px;">(公章)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font> </td>
    <td colspan="2" align="left">&nbsp;中国建筑第二工程局有限公司</td>
    </tr>	
	
  <tr>
    <td height="90" align="right">总承包单位审核人:</td>
    <td>&nbsp;</td>
    <td style="font-weight:normal; ">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
  <tr>
    <td height="90" align="right" style="line-height:24px;">总承包单位审批人:<br />
	<font style="font-weight:normal; font-size:14px;">(企业技术负责人)</font>	&nbsp;&nbsp;&nbsp;</td>
    <td>&nbsp;</td>
    <td style="font-weight:normal; ">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
</table>


</p>



</div>



</div>
<div class="PageNext"></div>
</center>
</body>
</html>
