<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>市安监站告知表、使用登记表</title>
<style media="print">
.Noprint {
	display: none;
	
}
.PageNext {
	page-break-after: always;
}
</style>

<style type="text/css">
.er_main_detail_700{width:680px; margin:0 auto;}

/*表格样式*/
.er_list_16{
	width:100%;	
	font-size:12px;	
	border: 1px solid #000000; 
	border-collapse: collapse;}
	
.er_list_16 td {
	border-left:1px solid #000000;
	border-bottom:1px solid #000000;
	color:#000000;
	line-height:16px;
	padding:2px;}

</style>

<link href="../css/er_style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<center>
<div class="er_main_detail_700">
<div class="er_wrod_title">
  <p align="center">深圳市建筑起重机械安装（拆卸）告知表（2013-1）</p>
</div>

<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16">
  <tr>
    <td width="40" rowspan="3">基本<br />情况</td>
    <td height="22" align="center">告知流水号</td>
    <td colspan="2" align="left"><input type="checkbox" name="checkbox" value="checkbox" />安装&nbsp;
      <input type="checkbox" name="checkbox" value="checkbox" />拆卸</td>
    <td align="center">经办人及电话</td>
    <td colspan="2">&nbsp;</td>
    </tr>
  <tr>
    <td width="80" height="22" align="center">设备名称</td>
    <td width="110">&nbsp;${equip.equipGenericName}</td>
    <td width="80" align="center">规格型号</td>
    <td width="120">&nbsp;${equip.equipSpecificName}</td>
    <td width="80" align="center">备案编号</td>
    <td>&nbsp;${equip.recordId}</td>
  </tr>
  <tr>
    <td height="22" align="center">出厂日期</td>
    <td>&nbsp;${equip.exwDate}</td>
    <td align="center">出厂编号</td>
    <td>&nbsp;${equip.exwSerial}</td>
    <td align="center">现场编号</td>
    <td>&nbsp;${indisSchema.blockNumber}</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" align="center">相<br />
      关<br />单<br />位
</td>
    <td style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="80" height="20" align="center" style="border-left-style:none">工程名称</td>
        <td width="230">&nbsp;${project.projectName}</td>
        <td colspan="2" align="center">施工许可证号</td>
        <td colspan="2">&nbsp;${project.constructPermit}</td>
        </tr>
      <tr>
        <td height="20" align="center" style="border-left-style:none">工程地址</td>
        <td>&nbsp;${project.address}</td>
        <td colspan="2" align="center">设备安装位置</td>
        <td colspan="2">&nbsp;${indisSchema.axisPosition}</td>
        </tr>
      <tr>
        <td height="20" align="center" style="border-left-style:none">产权单位</td>
        <td>&nbsp;${equip.propertyName}</td>
        <td width="70" align="center">负责人</td>
        <td width="70">&nbsp;${equip.dutyman}</td>
        <td>电话</td>
        <td>&nbsp;${equip.dutymanTel}</td>
      </tr>
      <tr>
        <td height="20" align="center" style="border-left-style:none">总包单位</td>
        <td>&nbsp;${project.unCustomName}</td>
        <td align="center">项目经理</td>
        <td>&nbsp;${project.unCustomLinker}</td>
        <td width="32">电话</td>
        <td>&nbsp;${project.unCustomLinkTel}</td>
      </tr>
      <tr>
        <td height="20" align="center" style="border-left-style:none">监理单位</td>
        <td>&nbsp;${project.supCustomName}</td>
        <td align="center">项目总监</td>
        <td>&nbsp;${project.supCustomLinker}</td>
        <td>电话</td>
        <td>&nbsp;${project.supCustomLinkTel}</td>
      </tr>
      <tr>
        <td height="20" align="center" style="border-left-style:none;">安装单位</td>
        <td>&nbsp;${indisSchema.inEntName}</td>
        <td align="center">技术负责人</td>
        <td >&nbsp;${indisSchema.technicalDirector}</td>
        <td>电话</td>
        <td>&nbsp;${indisSchema.technicalPhone}</td>
      </tr>
    </table>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="center" style="border-left-style:none;">安装单位资质证编号</td>
    <td width="140">&nbsp;${indisSchema.inEntCertNum}</td>
    <td width="76" align="center">资质等级</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td width="170" height="20" align="center" style="border-left-style:none; border-bottom-style:none">安装单位安全生产许可证编号</td>
    <td style="border-bottom-style:none">&nbsp;${equip.licenseNumber}</td>
    <td align="center" style="border-bottom-style:none">开始作业时间</td>
    <td align="right" style="border-bottom-style:none">年   &nbsp;月 &nbsp;  日
      <input type="checkbox" name="checkbox2" value="checkbox" />上午<input type="checkbox" name="checkbox3" value="checkbox" />下午&nbsp;</td>
  </tr>
</table>	
	</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" rowspan="3" align="center">提交<br />
      资料</td>
    <td align="center"><strong>资料名称</strong></td>
    <td width="120" align="center"><strong>总包单位审核记录</strong></td>
    <td width="120" align="center"><strong>监理单位审核记录</strong></td>
  </tr>
  <tr>
    <td align="left">1、建筑起重机械备案证（安装告知）或使用登记牌（拆卸告知）</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">2、《广东省建筑起重机械及特种作业人员资格管理系统》设备<br />
      安装告知页面拷贝（加盖公章）。</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" align="center">安装<br />
      单位<br />
      意见</td>
    <td align="left">
	<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本公司具有安装本表所列建筑起重机械相应的资质证书和安全生产许可证，本公司与使用单位已签订安装(拆卸)合同，本公司已与施工总承包单位签订的安全协议书，安装（拆卸）工程专项施工方案、建筑起重机械安装(拆卸)工程生产安全事故应急救援预案已按规定编审，本公司负责建筑起重机械安装(拆卸)工程专职安全生产管理人员、专业技术人员数量满足要求，具有相应的资格证书、安全考核证书，本公司拟安装本建筑起重机械的特种作业人员已经录入《广东省建筑起重机械及特种作业人员资格管理系统》， 数量满足要求，持有特种作业操作资格证书、平安卡、已购买社会保险、签订劳务合同。安装过程中使用的辅助起重机械具备相应技术安全条件，具有相应的特种作业人员，安装塔式起重机的，相关安全条件已确认，安装电梯的，防坠安全器已标定检测，安装龙门架及物料提升机的，重量限制器、防坠安全器型式检验符合规定，本公司已按规定组织安全技术交底。
本公司将严格按本表及其附件的内容安装(拆卸)建筑起重机械，特此告知。并郑重承诺：本告知提供的资料真实、有效、准确；本单位对资料的真实性、有效性、准确性负一切法律责任，概与受理单位无关。
本公司明白，本公司必须在本告知指定的开始作业时间，具备本次作业的作业条件（包括但不限于现场条件、人员和设备）。</p>
<p style="text-align:center; line-height:24px;">负责人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（公司公章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>
	</td>
  </tr>
  <tr>
    <td align="center">总包<br />
      单位<br />
      意见<br /></td>
    <td align="left">
	<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本公司施工的本工程已取得施工许可，安装单位具有安装本表所列建筑起重机械相应的资质证书和安全生产许可证，安装单位与使用单位已签订安装(拆卸)合同，本公司已与安装单位签订的安全协议书，安装（拆卸）工程专项施工方案、建筑起重机械安装(拆卸)工程生产安全事故应急救援预案已按规定编审，安装单位负责建筑起重机械安装(拆卸)工程专职安全生产管理人员、专业技术人员数量满足要求，具有相应的资格证书、安全考核证书，经审查，安装单位拟安装本建筑起重机械的特种作业人员已经录入《广东省建筑起重机械及特种作业人员资格管理系统》， 数量满足要求，持有特种作业操作资格证书、平安卡、已购买社会保险、签订劳务合同。安装过程中使用的辅助起重机械具备相应技术安全条件，具有相应的特种作业人员，安装塔式起重机的，相关安全条件已确认，安装电梯的，防坠安全器已标定检测，安装龙门架及物料提升机的，重量限制器、防坠安全器型式检验符合规定，安装单位已按规定组织安全技术交底。 <br />
安装单位将按本表及其附件的内容安装（拆卸）建筑起重机械，特此告知。并郑重承诺：本告知提供的资料真实、有效、准确；本单位对资料的真实性、有效性、准确性负一切法律责任，概与受理单位无关。设备未超过有关法律法规文件及产品说明书规定的使用年限；不擅自使用非原厂制造的标准节和附着装置。 </p>
<p style="text-align:center; line-height:24px;">项目经理：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; （注册建造师执业印章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;负责人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; （公司公章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>
	
	</td>
  </tr>
  <tr>
    <td align="center">监理<br />
      单位<br />
      意见</td>
    <td align="left">
	<p>&nbsp;&nbsp;&nbsp;经审核，施工现场具备安装本表所列建筑起重机械的安全条件，安装单位和总包单位提供的资料真实、有效、准确。 <br />
&nbsp;&nbsp;&nbsp;同意安装单位和总包单位意见。 <br />
&nbsp;&nbsp;&nbsp;我公司郑重承诺：按照《危险性较大的分部分项工程安全管理办法》（建质[2009]87号印发）规定，针对建筑起重机械安装（拆卸）作业，制定安全监理方案，按规定实施包括旁站监理在内的安全监理。 </p>
<p style="text-align:center;line-height:24px;">总监理工程师： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（注册监理工程师章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>	
	</td>
  </tr>
  <tr>
    <td height="40" align="center">受理<br />单位</td>
    <td><p style="text-align:center;">（盖章）</p><p style="text-align:right;"><span style="text-align:right">&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</span></p></td>
  </tr>
</table>
<p style="text-align:left; font-size:12px; line-height:16px;">注：1、本表所列“开始作业时间”必须为法定工作日；上午时间为8:00-13:00，下午为13:00-18:00。2、安装单位应当在建筑起重机械安装(拆卸)前2个工作日办理安装(拆卸)告知。3、本表一式二份，一份受理单位留存，一份经受理单位签章后作为受理回执。</p>

</div>
<div class="PageNext"></div>


<div class="er_w100" id="page2" style="page-break-after:always">
<div class="er_wrod_title">
  <p align="center">深圳市建筑起重机械使用登记表（2013-1） </p>
</div>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16">
  <tr>
    <td width="40" rowspan="3" align="center">基本<br />情况</td>
    <td height="24" align="center">申请流水号</td>
    <td colspan="2" align="left">&nbsp;</td>
    <td align="center">经办人及电话</td>
    <td colspan="2">&nbsp;</td>
    </tr>
  <tr>
    <td width="80" height="24" align="center">设备名称</td>
    <td width="110">&nbsp;${equip.equipGenericName}</td>
    <td width="80" align="center">规格型号</td>
    <td width="120">&nbsp;${equip.equipSpecificName}</td>
    <td width="80" align="center">备案编号</td>
    <td>&nbsp;${equip.recordId}</td>
  </tr>
  <tr>
    <td height="24" align="center">出厂日期</td>
    <td>&nbsp;${equip.exwDate}</td>
    <td align="center">出厂编号</td>
    <td>&nbsp;${equip.exwSerial}</td>
    <td align="center">现场编号</td>
    <td>&nbsp;${indisSchema.blockNumber}</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" align="center">相<br/>关<br/>单<br/>位</td>
    <td style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="80" height="24" align="center" style="border-left-style:none">工程名称</td>
        <td width="220">&nbsp;${project.projectName}</td>
        <td colspan="2" align="center">施工许可证号</td>
        <td colspan="2">&nbsp;${project.constructPermit}</td>
        </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">产权单位</td>
        <td>&nbsp;${equip.propertyName}</td>
        <td width="70" align="center">负责人</td>
        <td width="70">&nbsp;${equip.dutyman}</td>
        <td align="center">电话</td>
        <td>&nbsp;${equip.dutymanTel}</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">总包单位</td>
        <td>&nbsp;${project.unCustomName}</td>
        <td align="center">项目经理</td>
        <td>&nbsp;${project.unCustomLinker}</td>
        <td align="center">电话</td>
        <td>&nbsp;${project.unCustomLinkTel}</td>
      </tr>
	 <tr>
        <td height="24" align="center" style="border-left-style:none">使用单位</td>
        <td>&nbsp;</td>
        <td align="center">项目经理</td>
        <td>&nbsp;</td>
        <td align="center">电话</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">监理单位</td>
        <td>&nbsp;${project.supCustomName}</td>
        <td align="center">项目总监</td>
        <td>&nbsp;${project.supCustomLinker}</td>
        <td align="center">电话</td>
        <td>&nbsp;${project.supCustomLinkTel}</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none;">检测单位</td>
        <td>&nbsp;</td>
        <td align="center">检测日期</td>
        <td >&nbsp;</td>
        <td align="center">有效日期</td>
        <td>&nbsp;</td>
      </tr>
    </table>

	</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" rowspan="8" align="center">提交<br />
      资料</td>
    <td height="24" align="center"><strong>资料名称</strong></td>
    <td width="120" align="center"><strong>总包单位审核记录</strong></td>
    <td width="120" align="center"><strong>监理单位审核记录</strong></td>
  </tr>
  <tr>
    <td height="24" align="left">1、建筑起重机械产权备案证（原件）</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="24" align="left">2、建筑起重机械安装验收表（原件）</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="24" align="left">3、建筑起重机械检验报告（原件）</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="24" align="left">4、《广东省建筑起重机械及特种作业人员资格管理系统》设备使用登记页面拷贝（加盖公章）</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="24" align="left">5、安全技术交底记录（复印件加盖公章）</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" align="center">使用<br />
      单位<br />
      意见</td>
    <td align="left">
	<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	  <input type="checkbox" name="checkbox4" value="checkbox" />
	  本公司已经按规定与租赁单位签订建筑起重机械租赁合同。□本公司为本建筑起重机械的产权单位。 <br />
本公司已按规定对建筑起重机械进行安装验收，申报督监督检验合格。本建筑起重机械的维修保养协议已签订、使用及维护保养制度已落实，建筑起重机械生产安全事故应急救援预案已按规定编审，操作本建筑起重机械的特种作业人员已经录入《广东省建筑起重机械及特种作业人员资格管理系统》，  数量满足要求，持有特种作业操作资格证书、平安卡、已购买社会保险、签订劳务合同。建筑起重机械履历符合规定，本公司已按规定组织安全技术交底。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本公司将严格按本表及其附件的内容使用建筑起重机械，并郑重承诺：提供的资料真实、有效、准确；本单位对资料的真实性、有效性、准确性负一切法律责任，概与受理单位无关。 </p>
<p style="text-align:center; line-height:24px;">负责人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（公章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>

</td>
  </tr>
  <tr>
    <td align="center">总包<br />
      单位<br />
      意见<br /></td>
    <td align="left">
	<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经审查，本建筑起重机械已按规进行安装验收，申报督监督检验合格。本建筑起重机械的维修保养协议已签订、使用及维护保养制度已落实，建筑起重机械生产安全事故应急救援预案已按规定编审，操作本建筑起重机械的特种作业人员已经录入《广东省建筑起重机械及特种作业人员资格管理系统》，  数量满足要求，持有特种作业操作资格证书、平安卡、已购买社会保险、签订劳务合同。建筑起重机械履历符合规定，已按规定组织安全技术交底。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本公司施工的工程将按本表及其附件的内容使用建筑起重机械，请予以登记。本公司郑重承诺：本表及随表提供的资料真实、有效、准确；本单位对资料的真实性、有效性、准确性负一切法律责任，概与受理单位无关。设备未超过有关法律法规文件及产品说明书规定的使用年限。不擅自使用非原厂制造的标准节和附着装置。 </p>
<p style="text-align:center; line-height:24px;">项目经理：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; （注册建造师执业印章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（公司公章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>
</td>
  </tr>
  <tr>
    <td align="center">监理<br />
      单位<br />
      意见</td>
    <td align="left">
	<p>&nbsp;&nbsp;&nbsp;经审核，施工现场具备本表所列建筑起重机械的安全使用条件，使用单位和总包单位提供的资料真实、有效、准确。 <br />
&nbsp;&nbsp;&nbsp;同意使用单位和总包单位意见。 </p>
<p style="text-align:center;line-height:24px;">总监理工程师： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（注册监理工程师章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>	
	</td>
  </tr>
  <tr>
    <td height="100" align="center">受理<br />
      单位</td>
    <td>
	<br /><br /><br />
	<p style="text-align:center;">（盖章）</p><p style="text-align:right;"><span style="text-align:right">&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</span></p>
	</td>
  </tr>
</table>
<p style="line-height:24px; text-align:left;">注：使用单位应当自建筑起重机械安装验收合格之日起30日内办理使用登记。</p>

</div>
<div class="PageNext"></div>


<div class="er_w100" id="page3" style="page-break-after:always">
<div class="er_wrod_title">
  <p align="center">深圳市建筑起重机械责任主体变更表（2013-1） </p>
</div>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16">
  <tr>
    <td width="40" rowspan="3" align="center">基本<br/>情况</td>
    <td height="24" align="center">使用登记牌编号</td>
    <td colspan="2" align="left">&nbsp;</td>
    <td align="center">经办人及电话</td>
    <td colspan="2">&nbsp;</td>
    </tr>
  <tr>
    <td width="90" height="24" align="center">设备名称</td>
    <td width="110">&nbsp;${equip.equipGenericName}</td>
    <td width="80" align="center">规格型号</td>
    <td width="120">&nbsp;${equip.equipSpecificName}</td>
    <td width="80" align="center"></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="24" align="center">出厂日期</td>
    <td>&nbsp;${equip.exwDate}</td>
    <td align="center">出厂编号</td>
    <td>&nbsp;${equip.exwSerial}</td>
    <td align="center">现场编号</td>
    <td>&nbsp;${indisSchema.blockNumber}</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" align="center">相<br/>关<br/>单<br/>位</td>
    <td style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="90" height="24" align="center" style="border-left-style:none">工程名称</td>
        <td width="220">&nbsp;${project.projectName}</td>
        <td colspan="2" align="center">施工许可证号</td>
        <td colspan="2">&nbsp;${project.constructPermit}</td>
        </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">产权单位</td>
        <td>&nbsp;${equip.propertyName}</td>
        <td width="70" align="center">负责人</td>
        <td width="70">&nbsp;${equip.dutyman}</td>
        <td align="center">电话</td>
        <td>&nbsp;${equip.dutymanTel}</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">总包单位</td>
        <td>&nbsp;${project.unCustomName}</td>
        <td align="center">项目经理</td>
        <td>&nbsp;${project.unCustomLinker}</td>
        <td align="center">电话</td>
        <td>&nbsp;${project.unCustomLinkTel}</td>
      </tr>
	 <tr>
        <td height="24" align="center" style="border-left-style:none">使用单位</td>
        <td>&nbsp;</td>
        <td align="center">项目经理</td>
        <td>&nbsp;</td>
        <td align="center">电话</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">监理单位</td>
        <td>&nbsp;${project.supCustomName}</td>
        <td align="center">项目总监</td>
        <td>&nbsp;${project.supCustomLinker}</td>
        <td align="center">电话</td>
        <td>&nbsp;${project.supCustomLinkTel}</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none;">检测单位</td>
        <td>&nbsp;</td>
        <td align="center">检测日期</td>
        <td >&nbsp;</td>
        <td align="center">有效日期</td>
        <td>&nbsp;</td>
      </tr>
    </table>

	</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" align="center"><p>变<br/>更<br/>后<br/>责<br/>任<br/>主<br/>体</p></td>
    <td style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="90" height="24" align="center" style="border-left-style:none">工程名称</td>
        <td width="220">&nbsp;</td>
        <td colspan="2" align="center">施工许可证号</td>
        <td colspan="2">&nbsp;</td>
        </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">产权单位</td>
        <td>&nbsp;</td>
        <td align="center">负责人</td>
        <td>&nbsp;</td>
        <td align="center">电话</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">总包单位</td>
        <td>&nbsp;</td>
        <td align="center">项目经理</td>
        <td>&nbsp;</td>
        <td align="center">电话</td>
        <td>&nbsp;</td>
      </tr>
	 <tr>
        <td height="24" align="center" style="border-left-style:none">使用单位</td>
        <td>&nbsp;</td>
        <td align="center">项目经理</td>
        <td>&nbsp;</td>
        <td align="center">电话</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">监理单位</td>
        <td>&nbsp;</td>
        <td align="center">项目总监</td>
        <td>&nbsp;</td>
        <td align="center">电话</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none; border-bottom-style:none;">检测单位</td>
        <td style="border-bottom-style:none;">&nbsp;</td>
        <td style="border-bottom-style:none;" align="center">检测日期</td>
        <td style="border-bottom-style:none;">&nbsp;</td>
        <td style="border-bottom-style:none;" align="center">有效日期</td>
        <td style="border-bottom-style:none;">&nbsp;</td>
      </tr>
    </table>

	</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" rowspan="4" align="center">提交<br />
      资料</td>
    <td height="24" align="center"><strong>资料名称</strong></td>
    <td width="120" align="center"><strong>总包单位审核记录</strong></td>
    <td width="120" align="center"><strong>监理单位审核记录</strong></td>
  </tr>
  <tr>
    <td height="24" align="left">责任主体变更后的建筑起重机械检验报告（原件）</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" align="center">使用<br />
      单位<br />
      意见</td>
    <td align="left">
	<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本公司将严格按本表及其附件的内容使用建筑起重机械，并郑重承诺：提供的资料真实、有效、准确；本单位对资料的真实性、有效性、准确性负一切法律责任，概与受理单位无关。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作本建筑起重机械的特种作业人员数量满足要求，且具有规定的特种作业操作资格证书、平安卡、购买社会保险；本建筑起重机械的维修保养协议已签订；使用及维护保养制度已落实；建筑起重机械生产安全事故应急救援预案已按规定编审；已按规定进行安全技术交底；建筑起重机械履历记录符合要求。 </p>
<p style="text-align:center; line-height:24px;">负责人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（公章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>

</td>
  </tr>
  <tr>
    <td align="center">总包<br/>单位<br/>意见<br/></td>
    <td align="left">
	<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 本公司施工的工程将按本表及其附件的内容使用建筑起重机械，请予以登记。本公司郑重承诺：本表及随表提供的资料真实、有效、准确；本单位对资料的真实性、有效性、准确性负一切法律责任，概与受理单位无关。设备未超过有关法律法规文件及产品说明书规定的使用年限。不擅自使用非原厂制造的标准节和附着装置。 </p>
<p style="text-align:center; line-height:24px;">项目经理：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; （注册建造师执业印章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（公司公章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>
</td>
  </tr>
  <tr>
    <td align="center">监理<br/>单位<br/>意见</td>
    <td align="left">
	<p>&nbsp;&nbsp;&nbsp;经审核，施工现场具备本表所列建筑起重机械的安全使用条件，使用单位和总包单位提供的资料真实、有效、准确。 <br />
&nbsp;&nbsp;&nbsp;同意使用单位和总包单位意见。 </p>
<p style="text-align:center;line-height:24px;">总监理工程师： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（注册监理工程师章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>	
	</td>
  </tr>
  <tr>
    <td height="100" align="center">受理<br/>单位</td>
    <td><br/><br/><br/>
	<p style="text-align:center;">（盖章）</p><p style="text-align:right;"><span style="text-align:right">&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</span></p>
	</td>
  </tr>
</table>
<p style="line-height:24px; text-align:left;">

注：1、本表适用于已有广东省建筑起重机械使用登记牌的建筑起重机械在安装位置及机械本体不变更，整体移交给其他工程或施工单位使用的情况。2、本表一式二份，一份受理单位留存，一份经受理单位签章后作为建筑起重机械使用登记牌记载的相关责任主体变更的证明。
</p>

</div>
<div class="PageNext"></div>

<div class="er_w100" id="page4" style="page-break-after:always">
<div class="er_wrod_title">
  <p align="center">深圳市建筑起重机械使用登记续期表（2013-1）</p>
</div>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16">
  <tr>
    <td width="40" rowspan="3" align="center">基本<br/>情况</td>
    <td height="24" align="center">申请流水号</td>
    <td colspan="2" align="left">&nbsp;</td>
    <td align="center">经办人及电话</td>
    <td colspan="2">&nbsp;</td>
    </tr>
  <tr>
    <td width="90" height="24" align="center">设备名称</td>
    <td width="110">&nbsp;</td>
    <td width="80" align="center">规格型号</td>
    <td width="120">&nbsp;</td>
    <td width="80" align="center">备案编号</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="24" align="center">出厂日期</td>
    <td>&nbsp;</td>
    <td align="center">出厂编号</td>
    <td>&nbsp;</td>
    <td align="center">现场编号</td>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" align="center"><p>变<br/>更<br/>后<br/>责<br/>任<br/>主<br/>体</p></td>
    <td style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="90" height="24" align="center" style="border-left-style:none">工程名称</td>
        <td width="220">&nbsp;</td>
        <td colspan="2" align="center">施工许可证号</td>
        <td colspan="2">&nbsp;</td>
        </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">产权单位</td>
        <td>&nbsp;</td>
        <td align="center">负责人</td>
        <td width="70">&nbsp;</td>
        <td align="center">电话</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">总包单位</td>
        <td>&nbsp;</td>
        <td align="center">项目经理</td>
        <td>&nbsp;</td>
        <td align="center">电话</td>
        <td>&nbsp;</td>
      </tr>
	 <tr>
        <td height="24" align="center" style="border-left-style:none">使用单位</td>
        <td>&nbsp;</td>
        <td align="center">项目经理</td>
        <td>&nbsp;</td>
        <td align="center">电话</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none">监理单位</td>
        <td>&nbsp;</td>
        <td align="center">项目总监</td>
        <td>&nbsp;</td>
        <td align="center">电话</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="24" align="center" style="border-left-style:none; border-bottom-style:none;">检测单位</td>
        <td style="border-bottom-style:none;">&nbsp;</td>
        <td style="border-bottom-style:none;" align="center">检测日期</td>
        <td style="border-bottom-style:none;">&nbsp;</td>
        <td style="border-bottom-style:none;">有效日期</td>
        <td style="border-bottom-style:none;">&nbsp;</td>
      </tr>
    </table>

	</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" rowspan="5" align="center">提交<br />
      资料</td>
    <td height="24" align="center"><strong>资料名称</strong></td>
    <td width="120" align="center"><strong>总包单位审核记录</strong></td>
    <td width="120" align="center"><strong>监理单位审核记录</strong></td>
  </tr>
  <tr>
    <td height="24" align="left">1、使用登记牌（原件）；</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="24" align="left">2、新的建筑起重机械检验报告（原件）；</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_16" style="border-top-style:none;">
  <tr>
    <td width="40" align="center">使用<br/>单位<br/>意见</td>
    <td align="left">
	<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本公司将严格按本表及其附件以及本表相对应的建筑起重机械使用登记表的内容使用建筑起重机械，并郑重承诺：提供的资料真实、有效、准确；本单位对资料的真实性、有效性、准确性负一切法律责任，概与受理单位无关。</p>
<p style="text-align:center; line-height:24px;">负责人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（公章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>

</td>
  </tr>
  <tr>
    <td align="center">总包<br />
      单位<br />
      意见<br /></td>
    <td align="left">
	<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本公司施工的工程将按本表及其附件以及本表相对应的建筑起重机械使用登记表的内容使用建筑起重机械，请予以登记。本公司郑重承诺：本表及随表提供的资料真实、有效、准确；本单位对资料的真实性、有效性、准确性负一切法律责任，概与受理单位无关。设备未超过有关法律法规文件及产品说明书规定的使用年限。不擅自使用非原厂制造的标准节和附着装置。 </p>
<p style="text-align:center; line-height:24px;">项目经理：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; （注册建造师执业印章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（公司公章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>
</td>
  </tr>
  <tr>
    <td align="center">监理<br/>单位<br/>意见</td>
    <td align="left">
	<p>&nbsp;&nbsp;&nbsp;经审核，施工现场具备本表所列建筑起重机械的安全使用条件，使用单位和总包单位提供的资料真实、有效、准确。 <br />
&nbsp;&nbsp;&nbsp;同意使用单位和总包单位意见。 </p>
<p style="text-align:center;line-height:24px;">总监理工程师： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（注册监理工程师章）</p>
<p style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</p>	
	</td>
  </tr>
  <tr>
    <td height="100" align="center">受理<br />
      单位</td>
    <td>
	<br /><br /><br />
	<p style="text-align:center;">（盖章）</p><p style="text-align:right;"><span style="text-align:right">&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;</span></p>
	</td>
  </tr>
</table>
<p style="line-height:24px; text-align:left;">
注：使用单位应当在原使用登记失效14天前，办理延长使用登记证的有效期手续。  
</p>

</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
