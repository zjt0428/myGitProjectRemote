<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>项目信息收集表</title>
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
<div class="er_wrod_title">项目信息收集表</div>
<div class="er_w100" id="page1" style="page-break-after:always">

<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="33%" height="20" align="left" style="padding-right:10px; padding-bottom:2px;">&nbsp;发至：   </td>
    <td width="33%" align="left" style="padding-right:10px; padding-bottom:2px;">电话：</td>
    <td align="left" style="padding-right:10px; padding-bottom:2px;">传真号： </td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_24">
  <tr>
    <td height="36" align="center">工程项目名称</td>
    <td colspan="3">&nbsp;${project.projectName}</td>
    </tr>
  <tr>
    <td height="36" align="center">工程项目地址</td>
    <td colspan="3">&nbsp;${project.address}</td>
    </tr>
  <tr>
    <td width="100" height="36" align="center">总包单位</td>
    <td width="300">&nbsp;${project.unCustomName}</td>
    <td width="100" align="center" style="line-height:18px;">项目负责人<br />
      (一级建造师)<br /></td>
    <td>&nbsp;${project.unCustomLinker}</td>
  </tr>
  <tr>
    <td height="36" align="center">监理单位</td>
    <td>&nbsp;${project.ctCustomName}</td>
    <td align="center">项目总监</td>
    <td>&nbsp;${project.supCustomLinker}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_24" style="border-top-style:none;">
  <tr>
    <td width="100" height="32" align="center">施工许可证号</td>
    <td width="200">&nbsp;${project.constructPermit}</td>
    <td width="95">安监登记证号</td>
    <td>&nbsp;${project.safetyPermit}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_24" style="border-top-style:none;">
  <tr>
    <td width="100" height="36" align="center"  style="line-height:18px;">项目经理<br />(一级建造师)<br /></td>
    <td width="120">&nbsp; ${project.unCustomLinker}</td>
    <td width="40" align="center">电话</td>
    <td width="130">&nbsp;${project.unCustomLinkTel}</td>
    <td width="100" align="center">注册证书号</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="center" valign="middle">项目总监</td>
    <td>&nbsp;${project.supCustomLinker}</td>
    <td align="center">电话</td>
    <td>&nbsp;${project.supCustomLinkTel}</td>
    <td align="center">注册证书号</td>
    <td>&nbsp;</td>
  </tr>
</table>
</p>

<p style="font-size:20px; line-height:40px; text-align:left;"><br /><br /><strong>项目应急小组：</strong></p>

<p><table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="180" height="36" align="center"><strong>职   务</strong></td>
    <td width="150" align="center"><strong>姓   名</strong></td>
    <td align="center"><strong>联  系  电  话</strong></td>
  </tr>
  <tr>
    <td height="36" align="left">组  长(项目经理)</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="left">副组长</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="left">通讯组组长</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="left">技术支持组组长</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="left">保卫组组长</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="left">抢救抢修组组长</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="left">医疗救护组组长</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="left">后勤保障组组长</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="left">安全员</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</p>

</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
