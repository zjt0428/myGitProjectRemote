<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>升降机安装作业人员名单</title>
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
<div class="er_wrod_title" style="padding-bottom:15px;">${project.projectName}<br />${contractEquip.buildingNum}${equip.equipSpecificName}${equip.equipGenericName}安装管理人员名单<br />设备名称产权备案证号：${equip.recordId}</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_24">
  <tr>
    <td width="66" height="36">人员类别</td>
    <td width="90">姓名</td>
    <td width="200" align="center">身份证</td>
    <td width="160" align="center">证书号</td>
    <td align="center">电话</td>
  </tr>
<c:forEach var="element" items="${installCO.constructManagerSet}" varStatus="status" >
  <tr>
    <td height="36">&nbsp;${element.kindWorkName}</td>
    <td>&nbsp;${element.practiName}</td>
    <td>&nbsp;${element.idCard}</td>
    <td>&nbsp;${element.certNum}</td>
    <td>&nbsp;${element.mobile}</td>
  </tr>
    </c:forEach>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top-style:none;" class="er_list">
  <tr>
    <td width="161" height="36" align="center">资质证书号码</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="center">安全生产许可证</td>
    <td>&nbsp;</td>
  </tr>
</table>

<div class="er_wrod_title" style="padding-bottom:15px;"><br />${equip.equipSpecificName}${equip.equipGenericName}安装作业人员名单<br /></div>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_24">
  <tr>
    <td width="66" height="36">人员类别</td>
    <td width="90">姓名</td>
    <td width="200" align="center">身份证</td>
    <td width="160" align="center">证书号</td>
    <td align="center">电话</td>
  </tr>
<c:forEach var="element" items="${installCO.constructPlanPractiSet}" varStatus="status" >
  <tr>
    <td height="36">&nbsp;</td>
    <td>&nbsp;${element.practiName}</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;${element.mobile}</td>
  </tr>
</c:forEach>
</table>

</div>

</div>
<div class="PageNext"></div>
</center>
</body>
</html>
