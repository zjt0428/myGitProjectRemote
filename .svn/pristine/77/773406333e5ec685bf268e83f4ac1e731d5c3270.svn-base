<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>基础验收表</title>
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
.word_bottom{vertical-align:text-bottom;height:22px;}
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
  <div class="wrod_title">建筑起重机械基础验收表</div>
  <p>
  <table width="640" border="0" cellspacing="0" cellpadding="0" style="font-size:14px">
  <tr>
    <td width="80" height="42" align="right"><div style="margin-top:20px;">工程名称：</div></td>
    <td width="140" style="border-bottom:1px solid #000000;">${indisBasecheck.project.projectName}<br></td>
    <td width="80" align="right" ><div style="margin-top:20px;">设备名称：</div></td>
    <td width="140" style="border-bottom:1px solid #000000;"><div style="margin-top:20px;">${indisBasecheck.equipment.equipGenericName}</div></td>
    <td width="80" align="right"><div style="margin-top:20px;">型号规格：</div></td>
    <td width="120" style="border-bottom:1px solid #000000;"><div style="margin-top:20px;">${indisBasecheck.equipment.equipSpecificName}</div></td>
  </tr>
  <tr>
    <td height="42" align="right"><div style="margin-top:20px;">安装单位：</div></td>
    <td style="border-bottom:1px solid #000000;"><div style="margin-top:20px;">${indisBasecheck.inEntName}</div></td>
    <td align="right"><div style="margin-top:20px;">使用单位：</div></td>
    <td style="border-bottom:1px solid #000000;">${indisBasecheck.emEntName}</td>
    <td align="right"><div style="margin-top:20px;">项目经理：</div></td>
    <td style="border-bottom:1px solid #000000;"><div style="margin-top:20px;">${indisBasecheck.managerProject}</div></td>
  </tr>
</table></p><br />
  <p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="jctable">
  <tr>
    <td align="center" width="6%">序号</td>
    <td align="center" width="15%">内   容</td>
    <td align="center" width="45%">要 求 标 准</td>
    <td align="center" width="10%">实   测</td>
    <td align="center">备  注</td>
  </tr>
  <c:forEach var="element" items="${indisBasecheck.verifyStandardSet}" varStatus="status" >
  <tr>
    <td align="center">${status.count}</td>
    <td align="left">${element.itemName}</td>
    <td align="left">${element.demandDes}</td>
    <td align="left">${element.standardResult}</td>
    <td align="left">${element.remark}</td>
  </tr>
  </c:forEach>
  <tr>
    <td align="center">验<br />收<br />意<br />见</td>
    <td colspan="4" align="right" valign="bottom">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
  <tr>
    <td align="center" style="padding:10pt 0;">验<br />收<br />人</td>
    <td colspan="4">项目部技术负责人（签字）： <br />
      建机一体化企业（安装单位）技术负责人（签字）： <br />
      其他参验人员（签字）：</td>
    </tr>
  <tr>
    <td align="center">备<br />注</td>
    <td colspan="4">基础验收时应附以下资料：<br />
      1、设备平面布置图；<br />
      2、基础桩基设计图；<br />
      3、基础承台设计图；<br />
      4、基础承台混凝土强度试验报告；<br />
      5、基础土壤承载力资料及计算书。</td>
    </tr>
</table>
</p>
</div>
</center>
</body>
</html>
