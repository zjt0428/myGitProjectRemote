<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>启用单</title>
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
<p style='text-align:center'><span class="wrod_title">起重机械租赁交付使用通知单</span></p>
<br />
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td height="36" colspan="4" align="left">&nbsp;&nbsp;<strong>启用单号：<font class="blue_bold">${equipActivate.activateSerial}</strong></td>
    </tr>
  <tr>
    <td width="100" height="36" align="center"><strong>设备名称</strong></td>
    <td width="220" align="left">${equipActivate.equipFlow.equipDiary.equipGenericName}</td>
    <td width="100" align="center"><strong>备案编号</strong></td>
    <td width="220" align="left">${equipActivate.equipFlow.equipDiary.recordId}</td>
  </tr>
  <tr>
    <td height="36" align="center"><strong>出厂编号</strong></td>
    <td align="left">${equipActivate.equipFlow.equipDiary.exwSerial}</td>
    <td align="center"><strong>规格型号</strong></td>
    <td align="left">${equipActivate.equipFlow.equipDiary.equipSpecificName}</td>
  </tr>
  <tr>
    <td align="center"><strong>项目名称</strong></td>
    <td align="left">${equipActivate.equipFlow.equipDiary.projectName}</td>
    <td height="36" align="center"><strong>项目地点</strong></td>
    <td align="left">${equipActivate.equipFlow.equipDiary.address}</td>
  </tr>
  <tr>
    <td align="center"><strong>安装高度</strong></td>
    <td align="left">${equipActivate.equipFlow.equipInstall.installHeight}</td>
    <td height="36" align="center"><strong>合同编号</strong></td>
    <td align="left">${equipActivate.contractSerial}</td>
  </tr>
  <tr>
    <td align="center"><strong>安装日期</strong></td>
    <td align="left"><fmt:formatDate value="${equipActivate.equipFlow.equipInstall.startinDate}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
    <td height="36" align="center"><strong>验收日期</strong></td>
    <td align="left">${equipActivate.acceptanceDate}</td>
  </tr>
  <tr>
    <td height="36" align="center"><strong>启用日期</strong></td>
    <td align="left">&nbsp;${activateDate}</td>
    <td height="36" align="center"><strong>楼号</strong></td>
    <td align="left">&nbsp;${equipActivate.equipFlow.equipDiary.buildingNum}</td>
  </tr>
  <tr>
    <td align="center"><strong>出租单位</strong></td>
    <td align="left">&nbsp;${equipActivate.equipFlow.contractLease.pbEntName}</td>
    <td align="center"><strong>使用单位</strong></td>
    <td align="left">&nbsp;${equipActivate.emEntName}</td>
  </tr>
  <tr>
    <td height="36" align="center">备注</td>
    <td colspan="3" align="left">${equipActivate.remark}</td>
    </tr>
  <tr>
    <td height="36" colspan="4" align="center">该设备已符合启用要求，从启用日始交付使用并开始计算租金。</td>
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
    <td colspan="2" width="310" align="left"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td style="line-height:40px;">&nbsp;承租单位<br />
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
    <td height="36" colspan="4" align="left">说明：本通知单经出租单位、承租单位签章后生效，将作为租金起始计算的相关凭证，具有法律效应。</td>
    </tr>
</table>
<p>
</div>
</center>
</body>
</html>
