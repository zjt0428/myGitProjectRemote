<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>升降机（自检表）</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<style media="print">
.Noprint {
	display: none;
	
}
.PageNext {
	page-break-after: always;
}
</style>
<style type="text/css">
<!--
.tdp {	height: 36px;
	font-size: 14px;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
}
-->
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
<p style='text-align:center'><span class="wrod_title"><font color="#FF0000">${verifySelf.inEntName}（安装单位）</font></span></p>
<p style='text-align:center'><span class="wrod_title">施工升降机安装自检记录表</span></p>
<br />
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="13%" align="center"><strong>工程名称</strong></td>
    <td width="21%" align="left">${verifySelf.equipFlow.equipDiary.projectName}</td>
    <td width="13%" align="center" ><strong>设备型号</strong></td>
    <td width="20%" align="left">${verifySelf.equipFlow.equipDiary.equipSpecificName}</td>
    <td width="13%" align="center" style="line-height:24px;"><strong>备案编号/出厂编号</strong></td>
    <td width="20%" align="left">${verifySelf.equipFlow.equipDiary.recordId}/${verifySelf.equipFlow.equipDiary.exwSerial}</td>
  </tr>
  <tr>
    <td align="center"><strong>生产厂家</strong></td>
    <td align="left">${verifySelf.equipFlow.equipDiary.equipVender}</td>
    <td align="center"><strong>出厂日期</strong></td>
    <td align="left">${verifySelf.equipFlow.equipDiary.exwDate}</td>
    <td align="center" style="line-height:24px;"><strong>设计安装<br />
      高度（米）</strong></td>
    <td align="left">${verifySelf.equipFlow.equipInstall.installHeight}</td>
  </tr>
  <tr>
    <td align="center"><strong>安装单位</strong></td>
    <td align="left">${verifySelf.inEntName}</td>
    <td align="center" style="line-height:24px;"><strong>资质证书<br />
      编号</strong></td>
    <td align="left">${verifySelf.inEntCertNum}</td>
    <td align="center" style="line-height:24px;"><strong>检查高度<br />
      （米）</strong></td>
    <td align="left">${verifySelf.maxHeight}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="sjj_table" style="border-top-style:none;">
  <tr>
    <th width="5%" height="36" align="center">序<br />号</th>
    <th width="15%">项目</th>
    <th width="55%">检查内容</th>
    <th width="11%">检查结果</th>
    <th width="14%">检查人</th>
  </tr>
  <c:forEach var="element" items="${verifyStandards}" varStatus="status" >
  <c:forEach var="standard" items="${element.value }" varStatus="standardstatus">
  <tr>
    <c:if test="${standardstatus.count == 1 }">
    <td class="tdp" rowspan="${fn:length(element.value)}">&nbsp;${status.count}</td>
	<td class="tdp" rowspan="${fn:length(element.value)}" align="center">&nbsp;${element.key}</td>
    </c:if>
	<td class="tdp">${standardstatus.count}、${standard.demandDes}</td>
	<td class="tdp" align="center">&nbsp;${standard.standardResult}</td>
	<td class="tdp" align="center">&nbsp;${standard.remark}</td>
  </tr>
  </c:forEach>
  </c:forEach>
  <tr>
    <td height="45" colspan="5" align="left" style="border-bottom-style:none;"><p>安装单位或建机一体化企业自检意见： </p></td>
    </tr>
	 <tr>
    <td height="45" colspan="5" align="right" style="border-top-style:none;">自检负责人（签字）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</td>
    </tr>
  <tr>
    <td colspan="2" align="center" style="padding:10px 5px;">参加 <br />
      自检 <br />
      人员<br />
      签字</td>
    <td colspan="3" align="left"><p>安装单位或建机一体化企业技术负责人（签字）：<br />
      安装单位或建机一体化企业安全员、机管员（签字）：<br />
      安装班组长（签字）：<br />
      机长（签字）： <br />
    </p></td>
    </tr>
</table>
</p>
</div>
</center>
</body>
</html>

