<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>升降机（自检表）</title>
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
<style type="text/css">
<!--
.tdp {	height: 36px;
	font-size: 14px;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
}
-->
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
  <div class="wrod_title">施工升降机电梯安装（加节）验收单</div>
  <p>
  <table width="650" border="0" cellspacing="0" cellpadding="0" style="font-size:14px; margin-bottom:5px;">
  <tr>
    <td width="100" height="42" align="right"><div style="margin-top:20px;">工程名称：</div></td>
    <td width="220" style="border-bottom:1px solid #000000;">${verifySelf.equipFlow.equipDiary.projectName}</td>
    <td width="100" align="right" ><div style="margin-top:20px;">工程地址：</div></td>
    <td style="border-bottom:1px solid #000000;"><div style="margin-top:20px;">${verifySelf.equipFlow.equipDiary.address}</div></td>
  </tr>
  <tr>
    <td height="32" align="right"><div style="margin-top:10px;">规格型号：</div></td>
    <td style="border-bottom:1px solid #000000;"><div style="margin-top:10px;">${verifySelf.equipFlow.equipDiary.equipSpecificName}</div></td>
    <td align="right"><div style="margin-top:10px;">机械编号：</div></td>
    <td style="border-bottom:1px solid #000000;">&nbsp;${verifySelf.equipFlow.equipDiary.recordId}</td>
  </tr>
   <tr>
    <td height="42" align="right"><div style="margin-top:20px;">安装单位：</div></td>
    <td style="border-bottom:1px solid #000000;"><div style="margin-top:20px;">${verifySelf.inEntName}</div></td>
    <td align="right"><div style="margin-top:20px;">使用单位：</div></td>
    <td style="border-bottom:1px solid #000000;">&nbsp;${verifySelf.equipFlow.contractLease.paEntName}</td>
  </tr>
</table></p>

  <p>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="jjtable">
  <tr>
    <td width="100" align="center"><strong>验收单位</strong></td>
    <td width="50" align="center"><strong>序号</strong></td>
    <td align="center"><strong>验收要求</strong></td>
    <td width="100" align="center"><strong>结果</strong></td>
  </tr>
  <tr>
    <td rowspan="2" align="center">基 础</td>
    <td align="center">1</td>
    <td>基础隐蔽工程验收资料齐全、并签字</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td>应有排水措施，基础无裂纹，平整度符合要求</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">纲<br>结<br>构</td>
    <td align="center">3</td>
    <td>不应有明显变形、脱焊和开裂，外形整洁、油漆不漏</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td>立管接缝处错位节差≤0.8mm</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td>螺栓连接安装准确、紧固可靠，不得有松动</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td><table border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="420" style="border-left-style:none;"><p align="center">垂直度要求 </p></td>
      </tr>
      <tr>
        <td width="420" style="border-left-style:none;border-bottom-style:none;"><p>架设高度（mm）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;垂直公差值（m） <br>
          ＜70&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;＜1/1000<br>
          ＞70~100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;70 <br>
          ＞100~150&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;90 <br>
          ＞150~200&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;110 <br>
          ＞200&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;130</p></td>
      </tr>
    </table></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">围栏 <br> 
      防护</td>
    <td align="center">7</td>
    <td>吊笼底部对重升降通道周围应设置防护围栏，防护围栏高度不低于1.5m</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">8</td>
    <td>升降机周围三面应搭设双层防坠棚、上下层间距不小于0.6m</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">9</td>
    <td>吊笼顶部四周应有护栏,高度不低于1.1m</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">10</td>
    <td>停层点处层门净高度应不低于1.8m,宽与吊笼净出口宽度之差不得大于0.12m</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">对重钢丝绳绳头固接</td>
    <td align="center">11</td>
    <td>绳卡固接地其数量不得少于3个,间距不小于绳径的6倍,滑鞍放在受力绳的一侧,绳卡应与绳径匹配</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">钢丝绳</td>
    <td align="center">12</td>
    <td>钢丝绳应有出厂合格证及未达到报废标准</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">传动防护</td>
    <td align="center">13</td>
    <td>传动系统的转动零部件应有防护罩等防护措施</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">导向轮、背轮</td>
    <td align="center">14</td>
    <td>轮子连接与润滑良好，导向轮灵活，无明显倾侧现象</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">制动器</td>
    <td align="center">15</td>
    <td>应设常闭式制动器，并装有手动紧急操作机构及手动松闸功能</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">导向和缓冲<br>装置</td>
    <td align="center">16</td>
    <td>吊笼与对重导向应正确可靠，吊笼采用滚轮导向，对重采用滑轮或导轨导向，导轨接头平滑</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">17</td>
    <td>底座应设备吊智能和对重缓冲器，无缺损和变形</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">安全装置</td>
    <td align="center">18</td>
    <td>吊笼应设有安全和安全钩、安全开关等安全装置</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">19</td>
    <td>安全器有标定有效期的所限牌，安全器的有效期为三年</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">20</td>
    <td>安全开关设有笼门限位，极限开关和放松绳开关，性能良好</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">21</td>
    <td>上限位和下限位开关之间的超程距离不小于0.15m</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">导轨架<br>和附着</td>
    <td align="center">22</td>
    <td>升降机的运动部位与建筑物和固定设备、脚手架等之间距离不得小于0.25m</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">23</td>
    <td>附着装置之间距离应符合使用说明书要求，水平度保持基础水平,与埋件连接应采用螺栓连接形式</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">电&nbsp;&nbsp;气</td>
    <td align="center">24</td>
    <td>电气装置应防护良好，金属机构及电机等外壳均应接地，接地电阻不大于4Ω，并设置二级漏电保护</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">25</td>
    <td>电路设有相序和断相保护器及过载保护</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">26</td>
    <td>电路应设总接触器、断路、失压、零位保护电箱无明显变形锈蚀、开启自如、箱内线路排列整齐，接地、零线分开，电气元件安装牢固、无松动、过热现象</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">27</td>
    <td>操纵控制应安装非自行复位的急停开关</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">其 他</td>
    <td align="center">28</td>
    <td>安装调试后的坠落试验及记录完整</td>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="jctable" style="border-top-style:none;">
  <tr>
    <td colspan="3" align="center" style="background-color:#E0E0E0;"><strong>安装单位班组验收</strong></td>
    </tr>
  <tr>
    <td width="265" rowspan="2" valign="top">自检情况:</td>
    <td width="120" height="46" align="center" valign="middle">班组长</td>
    <td width="265">&nbsp;</td>
  </tr>
  <tr>
    <td height="46" align="center" valign="middle">班组人员</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan="3" align="center" style="background-color:#E0E0E0;"><strong>使用单位验收</strong></td>
    </tr>
  <tr>
    <td rowspan="3" valign="top"><p>验收意见:</p></td>
    <td height="24" align="center">机管部门</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="24" align="center">安全部门</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="24" align="center">技术负责人</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>升降机司机</td>
    <td colspan="2">&nbsp;</td>
    </tr>
  <tr>
    <td colspan="3" align="center"  style="background-color:#E0E0E0;"><strong>公司级验收</strong></td>
    </tr>
  <tr>
    <td rowspan="2"><p>公司验收意见： </p>
      <p>&nbsp;</p>
      盖章：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：</td>
    <td height="60" align="center">机管部门</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="60" align="center">安全部门</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="150" valign="top">结论：</td>
    <td colspan="2" valign="top">注：验收栏目内有数据时，必须在验收栏内填写实测的数据，无数据用文字说明</td>
    </tr>
</table> 
  </p>
</div>
</center>
</body>
</html>

