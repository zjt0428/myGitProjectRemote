<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%><html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>7.建筑起重机械基础验收表GDAQ2090104</title>
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
<div class="er_wrod_title">建筑起重机械基础验收表</div>
<div class="er_w100" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="30" align="right" style="padding-right:10px">GDAQ2090104&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="90" height="32" align="center">工程名称</td>
    <td colspan="3">&nbsp;${project.projectName}</td>
  </tr>
    <tr>
    <td height="32" align="center" style="padding:0px;">起重机械名称</td>
    <td colspan="3" style="padding:0px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="105" style="border-bottom-style:none; border-left-style:none;">&nbsp;${equip.equipGenericName}</td>
        <td width="40" align="center" style="line-height:16px;border-bottom-style:none;">型号<br /> 规格</td>
        <td width="90" style="border-bottom-style:none;">&nbsp;${equip.equipSpecificName}</td>
        <td width="90" style="border-bottom-style:none;">备案编号</td>
        <td width="90" style="border-bottom-style:none;">&nbsp;${equip.recordId}</td>
        <td width="50" align="center" style="line-height:16px;border-bottom-style:none;">工  地<br />
          自编号</td>
        <td style="border-bottom-style:none;" width="95">&nbsp;${indisSchema.blockNumber}</td>
      </tr>
    </table></td>
    </tr>
  <tr>
    <td height="32" align="center">施工单位</td>
    <td width="335">&nbsp;${project.unCustomName}</td>
    <td width="90" align="center">项目负责人</td>
    <td width="145">&nbsp;${project.unCustomLinker}</td>
  </tr>
  <tr>
    <td height="32" align="center">分包单位</td>
    <td>&nbsp;${equip.propertyName}</td>
    <td align="center">分包负责人</td>
    <td>&nbsp;${contractLease.paEntLinkMan}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="415" height="30" align="center"><strong>验    收    项    目</strong></td>
    <td width="88" align="center"><strong>检查结果</strong></td>
    <td align="center"><strong>验收结论</strong></td>
  </tr>
  <tr>
    <td height="30" align="left">地基的承载能力(不小于               kN/m2 )</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30" align="left">基础混凝土强度                (并附试验报告)</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30" align="left"> 基础周围有无排水设施</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30" align="left">基础地下有无暗沟、孔洞(附钎探资料)</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30" align="left"><p>混凝土基础尺寸(预埋件尺寸)和地脚螺栓数量、规格是否符合图纸 </p>
      及说明书要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30" align="left"> 混凝土基础表面平整情况（允许偏差10mm）</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30">钢筋、预埋件隐蔽验收记录</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="30"> 桩验收记录</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
    <tr>
    <td height="150" colspan="3" align="left" valign="top"><p>&nbsp;验收结论： </p>
	<br /><br /><br /><br />
	<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>	</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="40" rowspan="2" align="center">验<br />
      收<br />人<br />
      签<br />名</td>
    <td width="200" height="32" align="center">总 承 包 单 位</td>
    <td width="200" align="center">基 础 施 工 单 位</td>
    <td width="200" align="center">监 理 单 位</td>
  </tr>
  <tr>
    <td height="200" align="left" valign="top"> <p>&nbsp;专项方案编制人(签名)：<br /><br /><br />
      &nbsp;项目技术负责人(签名)：<br /><br /><br />
      &nbsp;项目负责人(签名)：<br />
      <br /><br /></p>
	  <p style="text-align:center">（公章）</p>
	</td>
    <td align="left" valign="top"><p>&nbsp;专项方案编制人(签名)：<br /> <br /><br />
  &nbsp;项目技术负责人(签名)：<br />
  <br />
  <br />
  &nbsp;项目负责人(签名)：<br />
  <br />
  <br />
    </p>
      <p style="text-align:center">（公章）</p></td>
    <td align="left" valign="top">&nbsp;专业监理工程师(签名)：<br />
      <br />
      <br />
&nbsp;总监理工程师(签名)：</td>
  </tr>
</table>

 
 
 
</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
