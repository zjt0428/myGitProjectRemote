<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>安装验收表</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
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
	</p>
</center>
<center>
<div class="main_detail">
<p style='text-align:center'><span class="wrod_title">${equipVerify.equipFlow.equipDiary.equipGenericName}安装验收表</span></p>
<br />
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="13%" height="36" align="center"><strong>工程名称</strong></td>
    <td width="21%" align="left">${equipVerify.equipFlow.equipDiary.projectName}</td>
    <td width="13%" align="center" ><strong>设备型号</strong></td>
    <td width="20%" align="left">${equipVerify.equipFlow.equipDiary.equipSpecificName}</td>
    <td width="13%" align="center" style="line-height:24px;"><strong>备案编号</strong></td>
    <td width="20%" align="left">${equipVerify.equipFlow.equipDiary.recordId}</td>
  </tr>
  <tr>
    <td align="center"><strong>生产厂家</strong></td>
    <td align="left">${equipVerify.equipFlow.equipDiary.equipVender}</td>
    <td align="center"><strong>出厂日期</strong></td>
    <td align="left">${equipVerify.equipFlow.equipDiary.exwDate}</td>
    <td align="center" style="line-height:24px;"><strong>设计安装<br />      
      高度</strong></td>
    <td align="left">${equipVerify.equipFlow.equipInstall.installHeight}</td>
  </tr>
    <tr>
    <td align="center"><strong>安装单位</strong></td>
    <td align="left">${equipVerify.inEntName}</td>
    <td align="center"><span style="line-height:24px;"><strong>资质证书<br />
编号</strong></span></td>
    <td align="left">&nbsp;</td>
    <td align="center" style="line-height:24px;"><strong>验收高度</strong></td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td align="center"><strong>检测单位</strong></td>
    <td align="left">${equipVerify.supEntName}</td>
    <td align="center" style="line-height:24px;"><strong>检测报告<br />
      编号</strong></td>
    <td align="left">${equipVerify.verifySerial}</td>
    <td align="center" style="line-height:24px;"><strong>检验结论</strong></td>
    <td align="left">${equipVerify.verifyResult}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="sjj_table" style="border-top-style:none;">
  <tr>
    <th width="5%" height="36" align="center">序<br>号</th>
    <th width="15%">项目</th>
    <th width="55%">验收内容</th>
    <th width="12%">验收结果</th>
    <th width="13%"><span style="line-height:24px;">结论</span></th>
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
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td align="center" width="100" style="padding:40pt 0;">安装<br />
      单位<br />
      意见</td>
    <td width="220"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td align="left" style="line-height:40px;">&nbsp;安装单位签字：<br />
          （盖章）</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
    </table></td>
    <td width="99" align="center">出租<br />
      单位<br />
      意见</td>
    <td width="220"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td align="left" style="line-height:40px;">&nbsp;出租单位签字：<br />
          （盖章）</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align="center" style="padding:40pt 0;">使用<br />
      单位<br />
      意见</td>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td style="line-height:40px;">&nbsp;使用单位签字：<br />
          （盖章）</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
    </table></td>
    <td align="center">监理<br />
      单位<br />
      意见<br /></td>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td style="line-height:40px;">&nbsp;监理单位签字：<br />
          （盖章）</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>


</p>
<p style="text-align:left; line-height:24px; padding-top:5px;">本安装验收表一式伍份（安装单位、租赁单位、使用单位、监理单位、建设局各一份）</p>
</div>
</center>
</body>
</html>
