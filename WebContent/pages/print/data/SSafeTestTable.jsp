<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>施工升降机防坠安全器坠落试验检测表</title>
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
<div class="er_wrod_title">施工升降机防坠安全器坠落试验检测表</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="90" height="48" align="center">工程名称</td>
    <td width="240" align="left">&nbsp;${project.projectName}</td>
    <td width="90" align="center">使用单位</td>
    <td width="240" align="left">&nbsp;${project.unCustomName}</td>
  </tr>
  <tr>
    <td height="48" align="center">维保单位<br />
      试验单位<br /></td>
    <td align="left">&nbsp;${equip.propertyName}</td>
    <td align="center">安装日期</td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td height="48" align="center">起重机械<br />
      出厂编号</td>
    <td align="left">&nbsp;${equip.exwSerial}</td>
    <td align="center"><p align="center">起重机械 </p>
      型号</td>
    <td align="left">&nbsp;${equip.equipSpecificName}</td>
  </tr>
  <tr>
    <td height="48" align="center">备案编号</td>
    <td align="left">&nbsp;${equip.recordId}</td>
    <td align="center">使用日期</td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td height="48" align="center"><p align="center">防坠安全器 </p>
      出厂编号</td>
    <td align="left">&nbsp;</td>
    <td align="center">防坠安全<br />器型号</td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td height="48" align="center"><p align="center">检测试验 </p>
      负责人</td>
    <td align="left">&nbsp;</td>
    <td align="center"><p align="center">检测试验 </p>
      次数</td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td height="300" align="center"><p align="center">检测 <br />
      试验 <br />
      结论</td>
    <td colspan="3" align="left">&nbsp;</td>
    </tr>
  <tr>
    <td height="120" colspan="4" align="left"><p><strong>备注：</strong><br />
      1、按JS121---2000规定，经安装验收检测后的防坠安全器必须每三个月进行坠落试验，并将结论记录于表中，使用一年后需重新进行检测。 <br />
      2、本表一式三份，一份交使用单位，一份交设备的产权单位、另一份检测试验单位自留。 </p></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style=" margin-top:10px;">
  <tr>
    <td width="120" height="40">检测试验人员：  </td>
    <td width="210">&nbsp;</td>
    <td width="120" align="right">使用单位负责人：</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="40">监理单位代表：</td>
    <td>&nbsp;</td>
    <td align="right"><p>检测试验日期 ：</p></td>
    <td>&nbsp;</td>
  </tr>
</table>

</div>

</div>
<div class="PageNext"></div>
</center>
</body>
</html>
