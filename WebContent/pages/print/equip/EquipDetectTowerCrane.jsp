<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>塔式起重机_安装质量检测（验收）资料汇总表</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_word.css" />
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
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
<div class="main_detail">
<p style='text-align:center'><span class="wrod_title">安装质量检测（验收）资料汇总表</span></p>
<p style='text-align:center;'><span class="wrod_title">（塔式起重机）</span></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="100" height="30" align="right"><strong>安装单位：</strong></td>
    <td align="left" width="200" style="border-bottom:1px solid #000000;">&nbsp;</td>
	<td align="left" width="50" >&nbsp;</td>
    <td width="100" height="30" align="right"><strong>报送日期：</strong></td>
    <td align="left" style="border-bottom:1px solid #000000;">&nbsp;</td>
  </tr>
</table>
</p>
<p style="padding-top:5px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="jljc_table">
  <tr>
    <td width="136" align="center">统一编号</td>
    <td width="180">&nbsp;${equipDetect.equipFlow.equipDiary.recordId }</td>
    <td width="116">设备型号</td>
    <td>&nbsp;${equipDetect.equipFlow.equipDiary.equipSpecificName }</td>
  </tr>
  <tr>
    <td align="center">工程名称</td>
    <td>&nbsp;${equipDetect.equipFlow.equipDiary.projectName }</td>
    <td>工程地址</td>
    <td>&nbsp;${equipDetect.equipFlow.equipDiary.address }</td>
  </tr>
  <tr>
    <td align="center">施工总承包</td>
    <td>&nbsp;${equipDetect.emEntName }</td>
    <td>预计使用日期</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">分包(使用)单位</td>
    <td>&nbsp;${equipDetect.emEntName }</td>
    <td>监理单位</td>
    <td>&nbsp;${equipDetect.supEntName }</td>
  </tr>
  <tr>
    <td align="center">设备出租单位</td>
    <td>&nbsp;${currentCorpInfo.corpName }</td>
    <td>维修保养单位</td>
    <td>&nbsp;${currentCorpInfo.corpName }</td>
  </tr>
  <tr>
    <td align="center">安装单位</td>
    <td>&nbsp;${currentCorpInfo.corpName }</td>
    <td>安全生产许可证号</td>
    <td>&nbsp;${equipDetect.licenseNumber }</td>
  </tr>
  <tr>
    <td align="center">安装单位主要负责人</td>
    <td>&nbsp;${equipDetect.installPrincipal }</td>
    <td rowspan="3">安全生产考核<br />合格证书编号</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">安装单位项目负责人</td>
    <td>&nbsp;${equipDetect.projectPrincipal }</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">安装单位专职安全<br />
      生产管理人员</td>
    <td>&nbsp;${equipDetect.safetyPrincipal }</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">安装作业人员名单</td>
    <td colspan="3">&nbsp;</td>
    </tr>
  <tr>
    <td align="center">工程安监单位</td>
    <td colspan="3">&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top-style:none;" class="jljc_table">
  <tr>
    <td width="98" align="center"><strong>资料</strong></td>
    <td width="36" align="center"><strong>序号</strong></td>
    <td width="520" align="center"><strong>验收内容</strong></td>
  </tr>
  <tr>
    <td rowspan="3" align="center">安装前资料</td>
    <td align="center">1</td>
    <td align="left">安装任务书及技术方案经技术负责人审批，企业盖章</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td align="left">安装方案已作技术交底，有交底记录</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td align="left">安装前已对设备的金属结构、主要零部件、安全装置等进行检查，确认完好</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">基础及附着<br />
      部位</td>
    <td align="center">4</td>
    <td align="left">基础制作符合说明书要求； <br />
      已经过建设机械质量评估中介机构评估或通过施工总承包单位技术负责人审批</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td align="left">隐蔽工程及预制钢构件验收符合施工方案要求</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td align="left">混泥土的强度符合要求</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">自检记录</td>
    <td align="center">7</td>
    <td align="left">金属结构及联接、安全装置、电气保护、各运行机构（钢丝绳、制动器）等零部件，空载及载荷试验等情况</td>
  </tr>
  <tr>
    <td align="center">8</td>
    <td align="left">现场有相应吊重和吊索具，应具备检测起重量限制器和起重力矩限制器的条件</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="jljc_table" style="border-top-style:none;">
    <tr>
    <td align="left">审核后，合格的在以下对应序号□中打“√”，存在问题的在以下对应序号□中打“×”并可用文字说明，内容较多的可另附页，提供检测单位复检。</td>
    </tr>
</table>


<table width="100%" border="0" cellspacing="0" cellpadding="0"  class="jljc_table" style="border-top-style:none;">
  <tr>
    <td width="33%" align="left"><p>施工总承包单位意见： <br />
      1 <input type="checkbox" name="checkbox" value="checkbox" />       
      2<input type="checkbox" name="checkbox" value="checkbox" />  
	  4<input type="checkbox" name="checkbox" value="checkbox" /> 
	  5<input type="checkbox" name="checkbox" value="checkbox" />
	  6<input type="checkbox" name="checkbox" value="checkbox" /> </p>
      <p>&nbsp;</p>
      <p>负责人： </p>
      日期：         （单位盖章）</td>
    <td width="34%" align="left"><p>分包（使用）单位意见（无分包单位不填）： <br />
       1 <input type="checkbox" name="checkbox" value="checkbox" />       
      2<input type="checkbox" name="checkbox" value="checkbox" /> </p>
      <p>&nbsp;</p>
      <p>负责人： </p>
      日期：         （单位盖章）</td>
    <td align="left"><p>安装单位意见： <br />
      1 <input type="checkbox" name="checkbox" value="checkbox" />       
      2<input type="checkbox" name="checkbox" value="checkbox" /> 
	  3<input type="checkbox" name="checkbox" value="checkbox" />  
	  4<input type="checkbox" name="checkbox" value="checkbox" /> 
	  5<input type="checkbox" name="checkbox" value="checkbox" /><br />
	  6<input type="checkbox" name="checkbox" value="checkbox" /> 
	  7<input type="checkbox" name="checkbox" value="checkbox" />
	  8<input type="checkbox" name="checkbox" value="checkbox" /> 
	  </p>
      <p>&nbsp;</p>
      <p>负责人： </p>
      日期：          （单位盖章）</td>
  </tr>
  <tr>
    <td colspan="3" align="left"><p><strong>备注：</strong>1、本表由塔机安装、分包（使用）及施工单位填写并盖章。分包（使用）单位须查阅安装单位的上述证书、证件及序号1、2项的内容；安装单位确认本表所有内容；施工总承包单位审查安装单位的上述证书、证件及确认序号1、2项和序号4至6项的内容。 <br />
   2、盖章单位应详细审核资料，对填写内容的真实性负责。 <br />
   3、本表一式四联，设备检测时，一联交检测机构备案，其余各单位留存一联。 </p>
      </td>
    </tr>
</table>


</p>
<br />
</div>
</center>
</body>
</html>