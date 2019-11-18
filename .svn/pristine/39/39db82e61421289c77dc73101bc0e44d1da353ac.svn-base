<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>建筑起重机械使用登记申请表</title>
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
<p style='text-align:center'><span class="wrod_title">建筑起重机械使用登记申请表</span></p><br />

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
  <tr>
    <td align="left">申请单位（盖章）：</td>
    <td align="left">申请人：${equipEmploy.principal}</td>
    <td align="left">电话： ${equipEmploy.principalTel}</td>
    <td align="right">${equipEmploy.providedDate}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table">
  <tr>
    <td height="32"><strong>工程名称</strong></td>
    <td colspan="3" align="left"><span style="line-height:20px; padding-top:5px;">${equipEmploy.equipFlow.equipDiary.projectName}</span></td>
    <td height="32" ><strong>使用地点</strong></td>
    <td colspan="2" align="left">${equipEmploy.equipFlow.equipDiary.address}</td>
    </tr>
  <tr>
    <td height="32"><strong>使用单位</strong></td>
    <td colspan="3" align="left">&nbsp;</td>
    <td height="32"><strong>项目经理</strong></td>
    <td colspan="2" align="left">${equipEmploy.principal}</td>
    </tr>
  <tr>
    <td width="13%" height="32"><strong>设备名称</strong></td>
    <td width="14%" align="left">${equipEmploy.equipFlow.equipDiary.equipGenericName}</td>
    <td width="11%">规格型号</td>
    <td width="12%" align="left">${equipEmploy.equipFlow.equipDiary.equipSpecificName}</td>
    <td width="13%" rowspan="2"><strong>设备高度<br />
      （米）</strong></td>
    <td width="12%">首次安装</td>
    <td align="left">${equipEmploy.equipFlow.equipInstall.installHeight}</td>
  </tr>
  <tr>
    <td height="32"><strong>制造厂家</strong></td>
    <td colspan="3" align="left">${equipEmploy.equipFlow.equipDiary.equipVender}</td>
    <td>最终使用</td>
    <td align="left">${equipEmploy.equipFlow.equipInstall.installHeight}</td>
  </tr>
  <tr>
    <td height="32"><strong>产权单位</strong></td>
    <td colspan="3" align="left">${equipEmploy.equipFlow.equipDiary.propertyName}</td>
    <td height="32"><strong>备案编号</strong></td>
    <td colspan="2" align="left">${equipEmploy.equipFlow.equipDiary.recordId}</td>
    </tr>
  <tr>
    <td height="32"><strong>安装单位</strong></td>
    <td colspan="3" align="left">&nbsp;</td>
    <td height="32"><strong>资质等级</strong></td>
    <td colspan="2" align="left">&nbsp;</td>
    </tr>
  <tr>
    <td><strong>现场安装<br />
      负责人</strong></td>
    <td colspan="3" align="left">${equipEmploy.equipFlow.equipInstall.principal}</td>
    <td><strong>安装<br />
      起止时间</strong></td>
    <td colspan="2" align="left"><fmt:formatDate value="${equipEmploy.equipFlow.equipInstall.startinDate}" type="date"/>/<fmt:formatDate value="${equipEmploy.equipFlow.equipInstall.endinDate}" type="date"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table" style="border-top-style:none;">
  <tr>
    <td width="13%" align="center"><strong>检测机构</strong></td>
    <td width="21%" align="left" style="line-height:20px;padding-top:5px;">${equipDetect.detectEntName}</td>
    <td width="13%" align="center" style="line-height:20px;"><strong>资质证书<br />编号</strong></td>
    <td width="20%" align="left">&nbsp;</td>
    <td width="13%" align="center" style="line-height:20px;"><strong>项目检测<br />
      负责人</strong></td>
    <td width="20%" align="left">&nbsp;</td>
  </tr>
  <tr>
    <td align="center" style="line-height:20px;"><strong>检测报告 <br />
      编号</strong></td>
    <td align="left">${equipDetect.detectSerial}</td>
    <td align="center" style="line-height:20px;"><strong>检测报告<br />日期</strong></td>
    <td align="left">&nbsp;</td>
    <td align="center"><strong>检测结论</strong></td>
    <td align="left">&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="jsjtable" style="border-top-style:none;">
  <tr>
    <td width="10%" align="center" style="line-height:24pt;">安装及 <br />
      使用作 <br />业人员</td>
    <td width="45%" align="left" valign="top" style="padding:0px; border-left-style:none; border-bottom-style:none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
		  <tr>
			<td width="30%" height="32" align="center"><strong>姓名</strong></td>
			<td width="30%" align="center"><strong>工种</strong></td>
			<td align="center"><strong>岗位证号</strong></td>
		  </tr>
          <c:forEach items="${equipEmploy.practiDiarySet}" var="element" varStatus="status" begin="0" step="2">
          <tr>
			<td height="32">${element.practiName}</td>
			<td>${element.kindWorkName}</td>
			<td>${element.station}</td>
		  </tr>
          </c:forEach>
		  <c:if test="${fn:length(equipEmploy.practiDiarySet) <= 2 }">
		  <tr>
            <td height="40">&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          </c:if>
		  <c:if test="${fn:length(equipEmploy.practiDiarySet) <= 0 }">
		  <tr>
            <td height="40">&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          </c:if>
		</table>
	</td>
    <td width="45%" align="left" valign="top" style="padding:0px; border-left-style:none; border-bottom-style:none;">
	  <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="30%" height="32" align="center"><strong>姓名</strong></td>
            <td width="30%" align="center"><strong>工种</strong></td>
            <td align="center"><strong>岗位证号</strong></td>
          </tr>
          <c:forEach items="${equipEmploy.practiDiarySet}" var="element" varStatus="status" begin="1" step="2">
          <tr>
			<td height="32">${element.practiName}</td>
			<td>${element.kindWorkName}</td>
			<td>${element.station}</td>
		  </tr>
          </c:forEach>
		  <c:if test="${fn:length(equipEmploy.practiDiarySet) % 2 == 1 }">
		  <tr>
            <td height="32">&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          </c:if>
		  <c:if test="${fn:length(equipEmploy.practiDiarySet) <= 2 }">
		  <tr>
            <td height="40">&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          </c:if>
		  <c:if test="${fn:length(equipEmploy.practiDiarySet) <= 0 }">
		  <tr>
            <td height="40">&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          </c:if>
      </table>
	</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table" style="border-top-style:none;">
  <tr>
    <td width="10%" align="center" style="line-height:20px; padding:10pt 0;">安 装 <br />单 位<br />意 见</td>
    <td width="40%" align="left" valign="bottom">技术负责人（签字）：<br />
      （盖章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</td>
    <td width="10%" align="center" style="line-height:20px;">使 用 <br />单 位 <br />意 见</td>
    <td valign="bottom">技术负责人（签字）：<br />
      （盖章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;</td>
  </tr>
  <tr>
    <td align="center" style="line-height:24px; padding:10pt 0;">登记机构<br />审核意见</td>
    <td colspan="3" align="left" valign="bottom">审核人（签字）：<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（盖章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</td>
    </tr>
  <tr>
    <td align="center" style="line-height:24px;">使用<br />登记<br />编号</td>
    <td colspan="3">${equipEmploy.employSerial}</td>
    </tr>
</table>

<p style="line-height:24px; text-align:left; padding-top:5px;">填表说明：<br />
1、由使用单位填报，一式四份（使用单位、设备产权单位、安装单位、登记机构各一份）；<br />
2、本表中除使用登记编号及登记机构意见栏外，其余栏目由申请单位填写；<br />
3、表中“使用单位”指使用该机的施工单位或工程项目。
</p>
</div>
</center>
</body>
</html>
