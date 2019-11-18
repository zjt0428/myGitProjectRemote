<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>施工升降机巡检记录表</title>
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
	</p>
</center>
<center>
<div class="hzbmain_detail">
<p style='text-align:center; padding-bottom:10px;'><span class="wrod_title">施工升降机巡检记录表</span></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="100%" height="36" align="right"><strong>巡检日期：</strong><fmt:formatDate value="${equipInspect.inspectDate}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="xj_table">
  <tr>
    <td width="100" height="28" align="center">使用单位</td>
    <td width="380">&nbsp;${project.unCustomName}</td>
    <td colspan="2" align="center">设备所属单位</td>
    <td colspan="2">&nbsp;${equipInspect.equipInspectSchema.equipDiary.propertyName}</td>
    </tr>
  <tr>
    <td height="28" align="center">工程名称</td>
    <td>&nbsp;${project.projectName}</td>
    <td colspan="2" align="center">工程地址</td>
    <td colspan="2">&nbsp;${project.address}</td>
    </tr>
  <tr>
    <td height="28" align="center">设备型号</td>
    <td>&nbsp;${equipInspect.equipInspectSchema.equipDiary.equipSpecificName}</td>
    <td width="100" align="center">设备编号</td>
    <td width="100">&nbsp;${equipInspect.equipInspectSchema.equipDiary.recordSerial}</td>
    <td width="80" align="center">检查人员</td>
    <td>&nbsp;${equipInspect.inspectPepoles}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="xj_table" style="border-top-style:none;">
  <tr>
    <td align="center" bgcolor="#CCCCCC" width="100">检查部位</td>
    <td align="center" bgcolor="#CCCCCC" width="380">检查要求</td>
    <td align="center" bgcolor="#CCCCCC" width="100">检查结果</td>
    <td align="center" bgcolor="#CCCCCC" width="100">检查部位</td>
    <td align="center" bgcolor="#CCCCCC" width="360">检查要求</td>
    <td align="center" bgcolor="#CCCCCC">检查结果</td>
  </tr>
  <tr>
    <td align="center">基础</td>
    <td align="left">应用排水措施，基础无裂纹，平整度符合要求</td>
    <td>&nbsp;</td>
    <td rowspan="5" align="center">安全装置</td>
    <td>底座应设备吊智能和对重缓冲器，无缺损和变形</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">钢结构</td>
    <td align="left">不应有明显变形，脱焊和开裂、外形整洁、油漆不漏</td>
    <td>&nbsp;</td>
    <td>吊笼应设有安全和安全钩、安全开关等安全装置</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">立管接缝处错位节差≤0.8mm</td>
    <td>&nbsp;</td>
    <td>安全器有标定有效期的所限牌，安全器的有限期为三年</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">螺栓连接安装正确、紧固可靠，不得有松动</td>
    <td>&nbsp;</td>
    <td>安全开关设有笼门限位，极限开关和放松绳开关，</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="5" align="center">围栏防护</td>
    <td align="left">吊笼底部对重升降通道周围应设置防护围栏，防护围</td>
    <td>&nbsp;</td>
    <td>性能良好</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">栏高度不低于1.5m</td>
    <td>&nbsp;</td>
    <td rowspan="4" align="center">导轨架和<br />附着</td>
    <td>升降机的运动部位与建筑物和固定设备、脚手架等之</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">吊笼顶部四周应有护栏，高度不低于1.1m</td>
    <td>&nbsp;</td>
    <td>间距离不得小于0.25m</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">停层点处层门净高度应不低于1.8m，宽与吊笼净出口</td>
    <td>&nbsp;</td>
    <td>附着装置之间距离应符合使用说明书要求，水平度保</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">宽度之差不得大于0.12m</td>
    <td>&nbsp;</td>
    <td>持基础水平与埋件连接应采用螺栓连接形式</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">对重钢丝绳</td>
    <td align="left">绳卡固接地其数量不得少于3个，间距不小于绳径的6</td>
    <td>&nbsp;</td>
    <td rowspan="7" align="center">电气</td>
    <td>电气装置应防护良好，金属机构及电机等外壳均应接</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">绳头固接</td>
    <td align="left">倍，滑鞍放在受力绳的一侧，绳卡应与绳径匹配</td>
    <td>&nbsp;</td>
    <td>地，接地电阻不大于4Ω，并设置二级漏电保护</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">钢丝绳</td>
    <td align="left">钢丝绳应有出厂合格证，及未达到报废标准</td>
    <td>&nbsp;</td>
    <td>电路设有相序和断相保护器及过载保护</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">传动防护</td>
    <td align="left">传动系统的转动零部件应有防护罩等防护措施</td>
    <td>&nbsp;</td>
    <td>电路应设总接触器、断路、失压、零位保护电箱无明</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">导向轮、背轮</td>
    <td align="left">轮子连接与润滑良好，导向轮灵活，无明显倾侧现象</td>
    <td>&nbsp;</td>
    <td>显变形锈蚀、开启自如、箱内线路排列整齐,接地、</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">制动器</td>
    <td align="left">应设常闭式制动器，并装有手动紧急操作机构及手动松闸功能</td>
    <td>&nbsp;</td>
    <td>零线分开，电气元件安装牢固、无松动、过热现象</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">导向和缓冲<br />装置</td>
    <td align="left">吊笼与对重导向应正确可靠，吊笼采用滚轮导向，对</td>
    <td>&nbsp;</td>
    <td>操纵控制应安装非自行复位的急停开关</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">重采用滑轮或导轨导向，导轨接头平滑</td>
    <td>&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0"  class="xj_table" style="border-top-style:none;">
  <tr>
    <td width="582" height="56" align="left" valign="top" style="padding-top:5px;">&nbsp;<strong>检查单位意见：</strong></td>
    <td height="56" align="left" valign="top" style="padding-top:5px;">&nbsp;<strong>使用单位意见：</strong></td>
  </tr>
  
  <tr>
    <td height="28" align="right" style="padding-right:150px;">负责人：</td>
    <td align="right"><span style="padding-right:150px;">负责人：</span></td>
  </tr>
  <tr>
    <td height="28" align="right" style="padding-right:150px;">日期：</td>
    <td align="right"><span style="padding-right:150px;">日期：</span></td>
  </tr>
</table>


</div>
</center>
</body>
</html>
