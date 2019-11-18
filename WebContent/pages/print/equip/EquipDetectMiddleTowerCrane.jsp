<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>塔吊_安装质量检测（验收）资料汇总表</title>
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
<p style='text-align:center;'><span class="wrod_title">（<strong>塔吊 中间检测</strong>）</span></p>
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
    <td>安装单位</td>
    <td>&nbsp;${currentCorpInfo.corpName }</td>
  </tr>
  <tr>
    <td align="center">分包(使用)单位</td>
    <td>&nbsp;${equipDetect.emEntName }</td>
    <td>维修保养单位</td>
    <td>&nbsp;${currentCorpInfo.corpName }</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top-style:none;" class="jljc_table">
  <tr>
    <td width="98" align="center"><strong>资料</strong></td>
    <td width="36" align="center"><strong>序号</strong></td>
    <td width="520" align="center"><strong>验收内容</strong></td>
  </tr>
  <tr>
    <td rowspan="2" align="center">设备维护保养</td>
    <td align="center">1</td>
    <td align="left">有维护保养计划</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td align="left">有维护保养记录，内容完整</td>
  </tr>
  <tr>
    <td rowspan="4" align="center"> 加节方案、<br />人员资格和<br />技术交底</td>
    <td align="center">3</td>
    <td align="left">加节（升高）安装方案通过安装单位技术部门审批</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td align="left">附着安装形式、尺寸间距等符合说明书要求或已经设计计算并通过施工总承包单位技术负责人审批</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td align="left">安装作业人员持有上岗证</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td align="left">安装方案已作技术交底，有交底记录</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">附着点、隐蔽<br />工程验收</td>
    <td align="center">7</td>
    <td align="left"><p>基础制作符合说明书要求； </p>
      已经过建设机械质量评估中介机构评估或通过施工总承包单位技术负责人审批</td>
  </tr>
  <tr>
    <td align="center">8</td>
    <td align="left">设备的运行性能符合要求</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">加节后<br />验收记录</td>
    <td align="center">9</td>
    <td align="left">主要零部件无损坏及异常</td>
  </tr>
  <tr>
    <td align="center">10</td>
    <td align="left">安全保护装置有效</td>
  </tr>
    <tr>
    <td align="center">11</td>
    <td align="left">坠落试验已经通过（每三个月一次）</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="jljc_table" style="border-top-style:none;">
    <tr>
    <td align="left">审核后，合格的在以下对应序号□中打“√”，存在问题的在以下对应序号□中打“×”并可用文字说明，内容较多的可另附页，提供检测单位复检。</td>
    </tr>
</table>


<table width="100%" border="0" cellspacing="0" cellpadding="0"  class="jljc_table" style="border-top-style:none;">
  <tr>
    <td width="25%" align="left" valign="top"><p>施工总承包单位意见： <br />
1 <input type="checkbox" name="checkbox" value="checkbox" />       
      2<input type="checkbox" name="checkbox" value="checkbox" /> 
	  3<input type="checkbox" name="checkbox" value="checkbox" />  
	  4<input type="checkbox" name="checkbox" value="checkbox" /> <br />
	  5<input type="checkbox" name="checkbox" value="checkbox" />
	  &nbsp;6<input type="checkbox" name="checkbox" value="checkbox" />
	  &nbsp;7<input type="checkbox" name="checkbox" value="checkbox" />
</p>
      <p>&nbsp;</p>
	   <p>&nbsp;</p>
	   <p>&nbsp;</p>
	   <p>&nbsp;</p>
      <p>负责人： <br />
        日期： </p>
              
      （单位盖章）</td>
    <td width="25%" align="left" valign="top"><p>分包（使用）单位意见（无分包单位不填）： <br />
1 <input type="checkbox" name="checkbox" value="checkbox" />       
      2<input type="checkbox" name="checkbox" value="checkbox" /> 
	  3<input type="checkbox" name="checkbox" value="checkbox" />  
	  4<input type="checkbox" name="checkbox" value="checkbox" /> <br />
	  5<input type="checkbox" name="checkbox" value="checkbox" />
	  &nbsp;6<input type="checkbox" name="checkbox" value="checkbox" />
</p>
      <p>&nbsp;</p>
	  <p>&nbsp;</p>
	  <p>&nbsp;</p>
      <p>负责人： <br />
        日期： </p>
      （单位盖章）</td>
	<td width="25%" align="left" valign="top"><p>安装单位意见： <br />
1 <input type="checkbox" name="checkbox" value="checkbox" />       
      2<input type="checkbox" name="checkbox" value="checkbox" /> 
	  3<input type="checkbox" name="checkbox" value="checkbox" />  
	  4<input type="checkbox" name="checkbox" value="checkbox" /> <br />
	  5<input type="checkbox" name="checkbox" value="checkbox" />
	  &nbsp;6<input type="checkbox" name="checkbox" value="checkbox" />
	  &nbsp;7<input type="checkbox" name="checkbox" value="checkbox" />
	  &nbsp;8<input type="checkbox" name="checkbox" value="checkbox" /><br />
	  9
	  <input type="checkbox" name="checkbox" value="checkbox" />
	  10
	  <input type="checkbox" name="checkbox" value="checkbox" />
	  11
	  <input type="checkbox" name="checkbox" value="checkbox" />

</p>
	  <p>&nbsp;</p>
	  <p>&nbsp;</p>
	  <p>&nbsp;</p>
	  <p>负责人： <br />
	    日期： </p>
	  （单位盖章）</td>
	<td align="left" valign="top"><p>维护保养单位意见： <br />
1 <input type="checkbox" name="checkbox" value="checkbox" />       
      2<input type="checkbox" name="checkbox" value="checkbox" /> </p>
      <p>&nbsp;</p>
	  <p>&nbsp;</p>
      <p>&nbsp;</p>
	  <p>&nbsp;</p>
	   <p>&nbsp;</p>
      <p>负责人： <br />
        日期： </p>
      （单位盖章）</td>
  </tr>
  <tr>
    <td colspan="4" align="left"><p><strong>备注：</strong>1、本表由塔机安装、分包（使用）及施工单位填写并盖章。分包（使用）单位须查阅安装单位的上述证书、证件及序号1、2项的内容；安装单位确认本表所有内容；施工总承包单位审查安装单位的上述证书、证件及确认序号1、2项和序号4至6项的内容。 <br />
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