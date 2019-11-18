<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>安装前审批表</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_word.css" />
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
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
<div class="main_detail">
  <div class="wrod_title">上海宁鑫起重设备安装有限公司<br>设备安装前审批表</div><br> 
   <table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="110" height="40" align="center">设备所属单位</td>
    <td width="260">&nbsp;${dispatch.deliveryEntName}</td>
    <td width="100" align="center">设备型号</td>
    <td>&nbsp;${dispatchEquip.equipment.equipSpecificName }</td>
  </tr>
  <tr>
    <td height="40" align="center">设备使用单位</td>
    <td>&nbsp;${dispatch.receiveEntName }</td>
    <td align="center">设备IC编号</td>
    <td>&nbsp;${dispatchEquip.equipment.recordId }</td>
  </tr>
  <tr>
    <td height="40" align="center">安排项目名称</td>
    <td>&nbsp;${dispatch.projectName }</td>
    <td align="center">出厂日期</td>
    <td>&nbsp;${dispatchEquip.equipment.exwDate }</td>
  </tr>
  <tr>
    <td height="40" align="center">安排项目地址</td>
    <td>&nbsp;${dispatch.address }</td>
    <td align="center">项目负责人</td>
    <td>&nbsp;${dispatch.projectManager }</td>
  </tr>
  <tr>
    <td height="40" align="center">预计安装日期</td>
    <td>&nbsp;<fmt:formatDate value="${dispatchEquip.startDate}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
    <td align="center">安装高度</td>
    <td>&nbsp;${dispatchEquip.installHeight }</td>
  </tr>
  <tr>
    <td height="40">&nbsp;</td>
    <td>&nbsp;</td>
    <td align="center">楼号</td>
    <td>&nbsp;${dispatchEquip.buildingNum}</td>
  </tr>
  <tr>
    <td height="150" align="center">维修部负责人</td>
    <td colspan="3" valign="bottom"><p style="text-align:right; padding-bottom:10px;"> 审批人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></td>
    </tr>
  <tr>
    <td height="150" align="center">仓库负责人</td>
    <td colspan="3" valign="bottom"><p style="text-align:right; padding-bottom:10px;"> 审批人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></td>
    </tr>
  <tr>
    <td height="150" align="center">项目负责人</td>
    <td colspan="3" valign="bottom"><p style="text-align:right; padding-bottom:10px;"> 审批人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></td>
    </tr>
  <tr>
    <td height="150" align="center">公司负责人</td>
    <td colspan="3" valign="bottom"><p style="text-align:right; padding-bottom:10px;"> 审批人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></td>
    </tr>
</table>

  </p>
  <p style="text-align:left; padding-top:10px;">&nbsp;&nbsp;备注：</p>

</div>

</center>
</body>
</html>