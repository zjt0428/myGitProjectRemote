<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>建筑起重机械安全技术交底书</title>
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
<div class="main_detail">
 <div class="wrod_title">建筑起重机械安全技术交底书</div>
<p align="right">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;
</p>
<p align="left"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="jsjtable">
  <tr>
    <td width="100" height="36" align="center"><strong>工程名称</strong></td>
    <td width="220" align="left">${technicalDisclosure.project.projectName}</td>
    <td width="100" align="center" ><strong>施工单位</strong></td>
    <td width="220" align="left">${technicalDisclosure.constructeEntname}</td>
    </tr>
  <tr>
    <td height="36" align="center"><strong>施工地点</strong></td>
    <td align="left">${technicalDisclosure.project.address}</td>
    <td align="center"><strong>交底项目</strong></td>
    <td align="left">${technicalDisclosure.disclosureItem}</td>
    </tr>
  <tr>
    <td height="36" colspan="4" align="center">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="100" height="36" align="center" style="border-left-style:none;border-bottom-style:none;"><strong>机械名称</strong></td>
        <td width="120" align="left" style="border-bottom-style:none;">${technicalDisclosure.equipment.equipGenericName}</td>
        <td width="100" align="center" style="border-bottom-style:none;"><strong>规格型号</strong></td>
        <td width="59" style="border-bottom-style:none;">${technicalDisclosure.equipment.equipSpecificName}</td>
        <td width="40" style="border-bottom-style:none;"><strong>高度</strong></td>
        <td width="98" style="border-bottom-style:none;">${technicalDisclosure.height}&nbsp;</td>
        <td width="40" style="border-bottom-style:none;"><strong>臂长</strong></td>
        <td width="75" style="border-bottom-style:none;">${technicalDisclosure.brachium}&nbsp;</td>
      </tr>
    </table></td>
    </tr>
  <tr>
    <td height="36" align="center" width="100"><strong>起重设备配备</strong></td>
    <td width="220" align="left">${technicalDisclosure.erectingEquipart}</td>
    <td width="100" align="center"><strong>运输设备配备</strong></td>
    <td>${technicalDisclosure.deliveryEquipart}</td>
    </tr>
  <tr>
    <td height="300" colspan="4" align="center" valign="top" style="padding-top:5px;"><p align="center"><strong>其他交底内容</strong><strong></strong></p>${technicalDisclosure.replenishContents}</td>
  </tr>
  <tr>
    <td height="200" colspan="4" align="center" valign="top" style="padding-top:5px;"><strong>安全技术交底内容</strong></br>${technicalDisclosure.contents}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="jsjtable" style="border-top-style:none;">
  <tr>
    <td width="150" height="36" align="center">接受人（签字）</td>
    <td width="200">&nbsp;</td>
    <td align="center" width="120">交底人（签字）</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="center">关联人员（签字）</td>
    <td colspan="3">&nbsp;</td>
    </tr>
  <tr>
    <td height="36" align="center">交底日期</td>
    <td colspan="3">${technicalDisclosure.disclosureDate}</td>
    </tr>
</table>
</p>
</div>
</center>
</body>
</html>
