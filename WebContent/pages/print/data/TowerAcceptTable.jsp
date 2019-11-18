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

<link href="../css/er_style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<center>
<div class="er_main_detail">
<div class="er_wrod_title">建筑起重机械安装验收表</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ2090105&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="100" height="26" align="center">工程名称</td>
    <td width="220" align="left">${project.projectName}</td>
    <td width="80" align="center">工程地址</td>
    <td>${project.address}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="100" align="center" style="line-height:16px;">施工总承包<br />
      单   位</td>
    <td width="305" align="left">${project.unCustomName}</td>
    <td width="90">项目负责人</td>
    <td align="center">${project.unCustomLinker}</td>
  </tr>
  <tr>
    <td height="26" align="center">使用单位</td>
    <td align="left">${project.unCustomName}</td>
    <td>项目负责人</td>
    <td align="center">${project.unCustomLinker}</td>
  </tr>
  <tr>
    <td height="26" align="center">安装单位</td>
    <td align="left">${indisSchema.inEntName}</td>
    <td>项目负责人</td>
    <td align="center">${indisSchema.projectPrincipal}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="100" align="center">起重机械名称</td>
    <td width="140">${equip.equipGenericName}</td>
    <td width="40" align="center" style="line-height:16px;">型号<br /> 规格</td>
    <td width="70" align="center" style="line-height:16px;">${equip.equipSpecificName}</td>
    <td width="40" align="center" style="line-height:16px;">备案<br />
      编号</td>
    <td width="90">${equip.recordId}</td>
    <td width="70">工地自编号</td>
    <td>${equip.equipSerial}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="100" style="line-height:16px;">检验评定<br />机构名称</td>
    <td width="140">&nbsp;${equipDetect.detectEntName}</td>
    <td width="70" align="center" style="line-height:16px;">检验报告<br />编    号</td>
    <td width="85">&nbsp;${equipDetect.detectSerial}</td>
    <td width="90" align="center" style="line-height:16px;">报告签发<br />日   期</td>
    <td>&nbsp;${equipDetect.eportDate}</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" style="border-top-style:none;">
  <tr>
    <td width="30" height="24" align="center"><strong>序号</strong></td>
    <td width="65" align="center" style="line-height:16px;"><strong>验收项目</strong></td>
    <td width="305" align="center"><strong>检 查 内 容 与 要 求</strong></td>
    <td align="center"><strong>现场和资料是否符合要求</strong></td>
  </tr>
  <tr>
    <td rowspan="7" align="center">1</td>
    <td rowspan="7" align="center">安全<br />
      运行<br />
      条件</td>
    <td rowspan="7" align="left"> ⑴与周边建构筑物、输电线路的安全距离； <br />
⑵周边杂物以及机体上堆积杂物和悬挂物的清<br />
理；<br />
⑶专用配电箱、电缆的安置位置是否恰当；<br />
⑷水平吊运作业路线的规定；<br />
⑸施工作业人员的安全通道；<br />
⑹基础部位的防水、排水设施；<br />
⑺作业环境危险部位的安全警示标识</td>
    <td align="left">(1)</td>
  </tr>
  <tr>
    <td>(2)</td>
  </tr>
  <tr>
    <td>(3)</td>
  </tr>
  <tr>
    <td>(4)</td>
  </tr>
  <tr>
    <td>(5)</td>
  </tr>
  <tr>
    <td>(6)</td>
  </tr>
  <tr>
    <td>(7)</td>
  </tr>
  <tr>
    <td rowspan="5" align="center">2</td>
    <td rowspan="5" align="center">落实<br />
      安全<br />
      管理<br />
      责任</td>
    <td rowspan="5" align="left"> ⑴明确起重机械的安全管理部门和管理员，及<br />
其安全管理责任； <br />
⑵本台设备管理责任人及其责任；<br />
⑶定期维护保养、顶升加节合同；<br />
⑷安全操作规程； <br />
⑸在机身上显著位置张挂设备管理标牌</td>
    <td align="left">(1)</td>
  </tr>
  <tr>
    <td>(2)</td>
  </tr>
  <tr>
    <td>(3)</td>
  </tr>
  <tr>
    <td>(4)</td>
  </tr>
  <tr>
    <td>(5)</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">3</td>
    <td rowspan="4" align="center">安全<br />
      管理<br />
      资料</td>
    <td rowspan="4" align="left"> ⑴按规定建立一机一档的安全技术档案；<br />
⑵特种作业人员的上岗资格证；<br />
⑶安全技术交底记录；<br />
⑷各项起重机械安全管理制度（含应急预案及<br />
加节、附着装置的验收等制度）</td>
    <td align="left">(1)</td>
  </tr>
  <tr>
    <td>(2)</td>
  </tr>
  <tr>
    <td>(3)</td>
  </tr>
  <tr>
    <td>(4)</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">4</td>
    <td rowspan="3" align="center">其他<br />
      资料</td>
    <td rowspan="3" align="left"> ⑴安装单位安装自检表；<br />
⑵安装检验报告；<br />
⑶检验报告中不合格项的整改情况</td>
    <td align="left">(1)</td>
  </tr>
  <tr>
    <td>(2)</td>
  </tr>
  <tr>
    <td>(3)</td>
  </tr>
  <tr>
    <td height="40" colspan="2" align="center">验收结论</td>
    <td colspan="2" valign="bottom"><p style="text-align:right">验收日期: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</p></td>
    </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" style="border-top-style:none;">
  <tr>
    <td width="60" height="26">&nbsp;</td>
    <td width="124" align="center">总承包单位</td>
    <td width="124" align="center">使用单位</td>
    <td width="124" align="center">安装单位</td>
    <td width="124" align="center">设备产权单位</td>
    <td align="center" width="124">监理单位</td>
  </tr>
  <tr>
    <td height="180" align="center"><p>参加<br />验收<br />
    人员<br /></p></td>
    <td align="left" valign="top">
	<p>专业技术人员<br />(签名):</p><br />
	<p> 项目技术负责人<br />(签名):</p><br />
	<p> 项目负责人<br />(签名):</p><br />
	<p>(公章)</p>
	</td>
    <td align="left" valign="top">
	<p>专业技术人员<br />(签名):</p><br />
	<p> 项目技术负责人<br />(签名):</p><br />
	<p> 项目负责人<br />(签名):</p><br />
	<p>(公章)</p>
	</td>
    <td align="left">
	<p>专项方案编制人<br />(签名):</p><br />
	<p> 专业技术人员<br />(签名):</p><br />
	<p> 项目负责人<br />(签名):</p><br />
	<p>(公章)</p>
	</td>
    <td align="center" valign="top">
	<p>负责人(签名):</p>
	<br /><br /><br /><br /><br />
	<p>(公章)</p></td>
    <td align="left" valign="top">
	<p>专业监理工程师<br />(签名):</p>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p> 总监理工程师<br />(签名):</p>
	<br />

	</td>
  </tr>
</table>

</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
