<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>建筑起重机械安装验收表</title>
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
<div class="er_wrod_title" style=" padding-bottom:0px;">建筑起重机械安装验收表</div>
<div class="er_w100" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="22" align="right" style="padding-right:10px">GDAQ2090105&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="90" height="22" align="center">工程名称</td>
    <td width="240">&nbsp;${project.projectName}</td>
    <td width="80" align="center">工程地址</td>
    <td>&nbsp;${project.address}</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" style="border-top-style:none;">
  <tr>
    <td width="90" align="center" style="line-height:15px;">施工总承包<br />单   位</td>
    <td width="300">&nbsp;${project.unCustomName}</td>
    <td width="90" align="center">项目负责人</td>
    <td>&nbsp;${project.unCustomLinker}</td>
  </tr>
  <tr>
    <td align="center">使用单位</td>
    <td>&nbsp;${project.unCustomName}</td>
    <td align="center">项目负责人</td>
    <td>&nbsp;${project.unCustomLinker}</td>
  </tr>
  <tr>
    <td align="center">安装单位</td>
    <td>&nbsp;${indisSchema.inEntName}</td>
    <td align="center">项目负责人</td>
    <td>&nbsp;${indisSchema.projectPrincipal}</td>
  </tr>
  <tr>
    <td align="center">起重机械名称</td>
    <td style="padding:0px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="130" style="border-bottom-style:none; border-left-style:none;">&nbsp;${equip.equipGenericName}</td>
        <td width="36" align="center" style="line-height:15px;border-bottom-style:none;">型号<br />规格</td>
        <td style="border-bottom-style:none;">&nbsp;${equip.equipSpecificName}</td>
        <td width="66" align="center" style="border-bottom-style:none;">备案编号</td>
      </tr>
    </table></td>
    <td align="center">&nbsp;${equip.recordId}</td>
    <td style="padding:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="80" align="center" style="border-bottom-style:none; border-left-style:none;">工地自编号</td>
        <td style="border-bottom-style:none;">&nbsp;${indisSchema.blockNumber}</td>
      </tr>
    </table>
	</td>
  </tr>
  <tr>
    <td align="center" style="line-height:15px;">检验评定<br />机构名称</td>
    <td>&nbsp;${equipDetect.detectEntName}</td>
    <td align="center" style="line-height:15px;">报告签发<br />日   期</td>
    <td>&nbsp;${equipDetect.eportDate}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" style="border-top-style:none;">
  <tr>
    <td width="40" align="center"><strong>序号</strong></td>
    <td width="60" align="center" style="line-height:15px;"><strong>验收<br />
      项目</strong></td>
    <td width="320" align="center"><strong>检 查 内 容 与 要 求</strong></td>
    <td align="center"><strong>现场和资料是否符合要求</strong></td>
  </tr>
  <tr>
    <td rowspan="7" align="center">1</td>
    <td rowspan="7" align="center"><p>安全<br/>运行<br/>条件</p></td>
    <td rowspan="7" align="left"><p>
	  ⑴与周边建构筑物、输电线路的安全距离；<br/>
            ⑵周边杂物以及机体上堆积杂物和悬挂物的清理；<br/>
            ⑶专用配电箱、电缆的安置位置是否恰当；<br/>
	  ⑷水平吊运作业路线的规定；<br/>
	  ⑸施工作业人员的安全通道；<br/>
	  ⑹基础部位的防水、排水设施；<br/>
	  ⑺作业环境危险部位的安全警示标识</p></td>
    <td align="center">(1)</td>
  </tr>
  <tr>
    <td align="center">(2)</td>
  </tr>
  <tr>
    <td align="center">(3)</td>
  </tr>
  <tr>
    <td align="center">(4)</td>
  </tr>
  <tr>
    <td align="center">(5)</td>
  </tr>
  <tr>
    <td align="center">(6)</td>
  </tr>
  <tr>
    <td align="center">(7)</td>
  </tr>
  <tr>
    <td rowspan="5" align="center">2</td>
    <td rowspan="5" align="center"><p>落实<br />安全<br />管理<br />责任</p></td>
    <td rowspan="5" align="left"><p> 
	⑴明确起重机械的安全管理部门和管理员，及其安全管理责任； <br />
	⑵本台设备管理责任人及其责任；<br />
    ⑶定期维护保养、顶升加节合同；<br />
	⑷安全操作规程； <br />
	⑸在机身上显著位置张挂设备管理标牌</p></td>
    <td align="center">(1)</td>
  </tr>
  <tr>
    <td align="center">(2)</td>
  </tr>
  <tr>
    <td align="center">(3)</td>
  </tr>
  <tr>
    <td align="center">(4)</td>
  </tr>
  <tr>
    <td align="center">(5)</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">3</td>
    <td rowspan="4" align="center"><p>安全<br />管理<br />资料</p></td>
    <td rowspan="4" align="left"><p>
	⑴按规定建立一机一档的安全技术档案；<br />
	⑵特种作业人员的上岗资格证；<br />
	⑶安全技术交底记录；<br />
	⑷各项起重机械安全管理制度（含应急预案及加节、附着装置的验收等制度）</p></td>
    <td align="center">(1)</td>
  </tr>
  <tr>
    <td align="center">(2)</td>
  </tr>
  <tr>
    <td align="center">(3)</td>
  </tr>
  <tr>
    <td align="center">(4)</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">4</td>
    <td rowspan="3" align="center"><p>其他<br />资料</p></td>
    <td rowspan="3" align="left"><p>
	⑴安装单位安装自检表；<br />
	⑵安装检验报告；<br />
	⑶检验报告中不合格项的整改情况</p></td>
    <td align="center">(1)</td>
  </tr>
  <tr>
    <td align="center">(2)</td>
  </tr>
  <tr>
    <td align="center">(3)</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="105" height="50" align="center">验收结论</td>
    <td valign="bottom" align="right">验收日期:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
</table>

 <table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;">
  <tr>
    <td width="40">&nbsp;</td>
    <td width="124" align="center">总承包单位</td>
    <td width="124" align="center">使用单位</td>
    <td width="124" align="center">安装单位</td>
    <td width="124" align="center">设备产权<br />
      (或出租)单位</td>
    <td align="center" width="124">监理单位</td>
  </tr>
  <tr>
    <td height="180" align="center"><p>参加<br />验收<br />
    人员<br /></p></td>
    <td align="left" valign="top">
	<p>专业技术人员<br />(签名):</p>
	<p> 项目技术负责人<br />(签名):</p>
	<p> 项目负责人<br />(签名):</p><br />
	<p>(公章)</p>
	</td>
    <td align="left" valign="top">
	<p>专业技术人员<br />(签名):</p>
	<p> 项目技术负责人<br />(签名):</p>
	<p> 项目负责人<br />(签名):</p><br />
	<p>(公章)</p>
	</td>
    <td align="left">
	<p>专项方案编制人<br />(签名):</p>
	<p> 专业技术人员<br />(签名):</p>
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
