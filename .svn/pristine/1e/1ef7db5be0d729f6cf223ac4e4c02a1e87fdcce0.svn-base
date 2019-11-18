<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>专项施工方案表</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<style media="print">
.Noprint {
	display: none;	
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
  <div class="fsong_title"><strong>施工升降机（塔机）安装专项施工方案</strong></div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="zxsgtable">
      <tr>
        <td width="120" align="center">设备型号</td>
        <td colspan="3">${indisSchema.equipment.equipSpecificName}</td>
      </tr>
      <tr>
        <td align="center">出厂编号</td>
        <td>${indisSchema.equipment.exwSerial}</td>
        <td align="center" width="100">备案证号</td>
        <td width="200">${indisSchema.equipment.recordId}</td>
      </tr>
      <tr>
        <td align="center">产权单位</td>
        <td colspan="3">${indisSchema.equipment.propertyName}</td>
      </tr>
      <tr>
        <td align="center">生产厂家</td>
        <td colspan="3">${indisSchema.equipment.equipVender}</td>
      </tr>
      <tr>
        <td align="center">安装单位</td>
        <td colspan="3">${indisSchema.inEntName}</td>
      </tr>
      <tr>
        <td align="center">使用单位</td>
        <td colspan="3">${indisSchema.emEntName}</td>
      </tr>
      <tr>
        <td align="center">项目名称</td>
        <td colspan="3">${indisSchema.project.projectName}</td>
      </tr>
      <tr>
        <td align="center">技术负责</td>
        <td colspan="3">${indisSchema.technicalDirector}</td>
      </tr>
      <tr>
        <td align="center">安全负责</td>
        <td colspan="3">${indisSchema.secureDirector}</td>
      </tr>
      <tr>
        <td align="center">方案编制</td>
        <td colspan="3">${indisSchema.schemaDesigner}</td>
      </tr>
    </table>
</div>
</center>
</body>
</html>
