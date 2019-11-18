<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>报停单</title>
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
<p style='text-align:center'><span class="wrod_title">${companyName}</span></p>
<p style='text-align:center'><span class="wrod_title">起重机械租赁使用报停通知单</span></p>
<br />
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td height="36" colspan="4" align="left"><strong>报停单号：${equipBlockup.blockupSerial}</strong></td>
    </tr>
  <tr>
    <td width="100" height="36" align="center"><strong>设备名称</strong></td>
    <td width="220" align="left">${equipBlockup.equipFlow.equipDiary.equipGenericName}</td>
    <td width="100" align="center"><strong>备案编号</strong></td>
    <td width="220" align="left">${equipBlockup.equipFlow.equipDiary.recordId}</td>
  </tr>
  <tr>
    <td height="36" align="center"><strong>出厂编号</strong></td>
    <td align="left">${equipBlockup.equipFlow.equipDiary.exwSerial}</td>
    <td align="center"><strong>项目名称</strong></td>
    <td align="left">${equipBlockup.equipFlow.equipDiary.projectName}</td>
  </tr>
  <tr>
    <td height="36" align="center"><strong>项目地点</strong></td>
    <td align="left">${equipBlockup.equipFlow.equipDiary.address}</td>
    <td align="center"><strong>使用单位</strong></td>
    <td align="left">&nbsp;${equipBlockup.equipFlow.contractLease.paEntName}</td>
  </tr>
  <tr>
    <td height="36" align="center"><strong>启用日期</strong></td>
    <td align="left">${activateDate}</td>
	<td align="center"><strong>报停日期</strong></td>
    <td align="left">${blockupDate}</td>
    </tr>
  <tr>
    <td height="36" align="center"><strong>备注</strong></td>
    <td colspan="3" align="left">${equipBlockup.remark}</td>
    </tr>
  <tr>
    <td colspan="2" width="310"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td style="line-height:40px;" align="left">&nbsp;出租单位<br />
          （盖章）</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;经办人</td>
      </tr>
      <tr>
        <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
    </table></td>
    <td colspan="2" width="310"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td align="left" style="line-height:40px;">&nbsp;承租单位<br />
          （盖章）</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;经办人</td>
      </tr>
      <tr>
        <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
    </table></td>
    </tr>
  <tr>
    <td height="36" colspan="4" align="left">说明：该设备于<font color="#FF0000">${blockupDate}</font>（报停日期）使用报停。本通知单经出租单位、承租单位签章后生效，具有法律效应。</td>
  </tr>
</table>
<p>
</div>
</center>
</body>
</html>
