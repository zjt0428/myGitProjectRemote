<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>塔吊安装验收表</title>
<style media="print">
.Noprint {
	display: none;
	
}
.PageNext {
	page-break-after: always;
}
</style>

<style type="text/css">

.er_main_detail_680{width:680px; margin:0 auto;}

</style>

<link href="../css/er_style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<center>
<div class="er_main_detail_680">
<div class="er_wrod_title">
  <p align="center">建筑起重机械使用验收表（内部） </p>
</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="50" rowspan="2" align="center">基本<br />
      情况</td>
    <td width="80" align="center">设备名称</td>
    <td width="120">&nbsp;${equip.equipGenericName}</td>
    <td width="80" align="center">规格型号</td>
    <td width="100">&nbsp;${equip.equipSpecificName}</td>
    <td width="80" align="center">备案编号</td>
    <td>&nbsp;${equip.recordId}</td>
  </tr>
  <tr>
    <td align="center">出厂日期</td>
    <td>&nbsp;${equip.exwDate}</td>
    <td width="90" align="center">出厂编号</td>
    <td>&nbsp;${equip.exwSerial}</td>
    <td align="center">现场编号</td>
    <td>&nbsp;${indisSchema.blockNumber}</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="50" rowspan="7" align="center">相<br />
      关<br />
      单<br />
      位<br /></td>
    <td width="80" align="center">工程名称</td>
    <td colspan="5" align="center">&nbsp;${project.projectName}</td>
    </tr>
  <tr>
    <td width="80" align="center">产权单位</td>
    <td width="200" align="center">&nbsp;${equip.propertyName}</td>
    <td width="70" align="center">负责人</td>
    <td width="80" align="center">&nbsp;${equip.dutyman}</td>
    <td width="70" align="center">电话</td>
    <td align="center">&nbsp;${equip.dutymanTel}</td>
  </tr>
  <tr>
    <td align="center">安装单位</td>
    <td align="center">&nbsp;${indisSchema.inEntName}</td>
    <td align="center">负责人</td>
    <td align="center">&nbsp;${indisSchema.projectPrincipal}</td>
    <td align="center">电话</td>
    <td align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center">总包单位</td>
    <td align="center">&nbsp;${project.unCustomName}</td>
    <td align="center">项目经理</td>
    <td align="center">&nbsp;${project.unCustomLinker}</td>
    <td align="center">电话</td>
    <td align="center">&nbsp;${project.unCustomLinkTel}</td>
  </tr>
  <tr>
    <td align="center">使用单位</td>
    <td align="center">&nbsp;${project.unCustomName}</td>
    <td align="center">项目经理</td>
    <td align="center">&nbsp;${project.unCustomLinker}</td>
    <td align="center">电话</td>
    <td align="center">&nbsp;${project.unCustomLinkTel}</td>
  </tr>
  <tr>
    <td align="center">监理单位</td>
    <td align="center">&nbsp;${project.supCustomName}</td>
    <td align="center">项目经理</td>
    <td align="center">&nbsp;${project.supCustomLinker}</td>
    <td align="center">电话</td>
    <td align="center">&nbsp;${project.supCustomLinkTel}</td>
  </tr>
  <tr>
    <td align="center">检测单位</td>
    <td align="center">&nbsp;${equipDetect.detectEntName}</td>
    <td align="center" style="line-height:15px;">检测报告<br /> 编号</td>
    <td align="center">&nbsp;${equipDetect.detectSerial}</td>
    <td align="center" style="line-height:15px;">报告签发<br />日期</td>
	 <td align="center">&nbsp;${equipDetect.eportDate}</td>
    </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="50" rowspan="15" align="center">验<br />
      收<br />
      资<br />
      料<br /></td>
    <td align="center"><strong>资料名称</strong></td>
    <td width="140" align="center"><strong>项目审核记录</strong></td>
    <td width="140" align="center"><strong>公司审核记录</strong></td>
  </tr>
  <tr>
    <td align="left">建筑起重机械产权备案证</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">建筑起重机械安装(拆卸)告知表</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">建筑起重机械安装自检表</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">建筑起重机械安装验收表</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">建筑起重机械检验报告</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">建筑起重机械租赁合同</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">建筑起重机械维修保养协议</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">建筑起重机械使用及维护保养制度</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">建筑起重机械生产安全事故应急救援预案</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">建筑起重机械特种作业人员特种作业操作资格证书、劳务合同，数量满足要求</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">建筑起重机械特种作业人员三级教育、安全技术交底</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">建筑起重机械履历书</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">特种设备租赁单位是否在局合格租赁商名录内</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">特种作业劳务单位是否在局合格供应商名录内</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="50" height="110" align="center"><p>项目<br />
      验收<br />
      意见</p>
      </td>
    <td style="padding:10px;" valign="top">
	<p style="text-align:left;"><strong>验收意见：</strong></p>
	<br />
	<br />
	<p style="text-align:left;">项目设备管理负责人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 项目技术负责人： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  项目负责人： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; （项目章）</p>
	<p style="text-align:right;">  年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
	</td>
  </tr>
  <tr>
    <td height="110" align="center">公司<br />
      验收<br />
      意见</td>
    <td valign="top" style="padding:10px;"><p style="text-align:left;"><strong>验收意见：</strong></p>
     <p style="text-align:left;">经检查审核，该工程施工现场的起重机械 具备/不具备 本表所列建筑起重机械的安全使用条件，同意使用。</p>
  
      <p style="text-align:center;">公司安全管理部：&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  公司租赁事业部：</p>
      <p style="text-align:right;"> 年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></td>
  </tr>
</table>

<p style="text-align:left; line-height:32px;">注：本表一式三份，项目部、公司安全部、公司租赁事业部各执一份。</p>

</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
