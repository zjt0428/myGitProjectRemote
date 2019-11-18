<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>施工升降机定期自检表GDAQ209010901</title>
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
<div class="er_wrod_title">施工升降机定期自检表</div>
<div class="er_w100" id="page1"  style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010901&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="80" height="20" align="center"> 使用单位</td>
    <td colspan="3">&nbsp;${project.unCustomName}</td>
    </tr>
  <tr>
    <td height="20" align="center"> 备案编号</td>
    <td width="230">&nbsp;${equip.recordId}</td>
    <td width="90" align="center">规格型号</td>
    <td>&nbsp;${equip.equipSpecificName}</td>
  </tr>
  <tr>
    <td height="20" align="center"> 出厂编号</td>
    <td>&nbsp;${equip.exwSerial}</td>
    <td align="center">自 编 号</td>
    <td>&nbsp;${indisSchema.blockNumber}</td>
  </tr>
  <tr>
    <td height="20" align="center"> 安装位置</td>
    <td>&nbsp;${project.address}</td>
    <td align="center">上次自检日期</td>
    <td>&nbsp;</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" style="border-top-style:none">
  <tr>
    <td width="40" align="center"><strong>序号</strong></td>
    <td width="80" align="center"><strong>项  目</strong></td>
    <td align="center"><strong>检  查  内  容</strong></td>
    <td width="90" align="center"><strong>检 查 结 果</strong></td>
    <td width="80" align="center"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="2" align="center">一</td>
    <td rowspan="2" align="center">资料</td>
    <td align="left">使用相关资料</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">使用登记牌有效期</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">二</td>
    <td rowspan="4" align="center"><p>作业环境<br />及外观</p></td>
    <td align="left">运动部件与建筑物之间的安全距离</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 运动部件与固定设备之间的安全距离</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">危险部位安全标志</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 安全操作牌</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="4" align="center">三</td>
    <td rowspan="4" align="center">金属结构</td>
    <td align="left"> 金属结构状况</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 金属结构连接</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 导轨架垂直度</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 附着装置的布置与连接状况</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="2" align="center">四</td>
    <td rowspan="2" align="center">司机室</td>
    <td align="left">司机室室内设施</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">司机室内的操纵装置及相关标牌、标志</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">五</td>
    <td align="center">基础</td>
    <td align="left">基础排水措施及杂物清理</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="22" align="center">六</td>
    <td rowspan="22" align="center">主要<br />
      零部<br />
      件与<br />
      传动<br />
      系统<br />
      项目</td>
    <td align="left"> 钢丝绳选用、安装状况及绳端固定</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">钢丝绳安全圈数</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">钢丝绳润滑与干涉</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 钢丝绳缺陷</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">钢丝绳直径磨损</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">钢丝绳断丝数</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">滑轮缺陷</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 滑轮防脱槽装置</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 制动器零部件缺陷</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">制动轮与摩擦片</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">制动器调整</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 制动轮缺陷</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">制动器制动块磨损</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 减速器连接与固定</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 减速器工作状况</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 开式齿轮啮合与缺损</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">滚轮、导向轮缺陷</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">联轴器及其工作状况</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">卷筒缺陷</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"><p>吊笼、传动支架和电缆小车滚轮与导轨架立管间隙</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 传动系统齿轮齿条啮合间隙</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 对重导向轮及其轨道间隙</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</div>
<div class="PageNext"></div>

<div class="er_wrod_title">施工升降机定期自检表(续表)</div>
<div class="er_w100" id="page2" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ209010901-1&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list_18" >
  <tr>
    <td width="40" align="center"><strong>序号</strong></td>
    <td width="80" align="center"><strong>项  目</strong></td>
    <td align="center"><strong>检  查  内  容</strong></td>
    <td width="90" align="center"><strong>检 查 结 果</strong></td>
    <td width="80" align="center"><strong>结  论</strong></td>
  </tr>
  <tr>
    <td rowspan="15" align="center">七</td>
    <td rowspan="15" align="center">电气</td>
    <td align="left"> 电气设备及电器元件</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 线路绝缘电阻</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">外部供电线路总电源开关</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">电气隔离装置</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">总电源回路的短路保护</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 失压保护</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 零位保护</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 过流保护</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 断错相保护</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 便携式控制装置</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 照明</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 信号</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">电气设备的接地</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 金属结构的接地</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 防雷</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="9" align="center">八</td>
    <td rowspan="9" align="center">安全<br />
      装置<br />
      有效<br />
      性与<br />
      防护</td>
    <td align="left">安全器</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 安全钩</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">断绳保护开关</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">行程开关</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 限位开关</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">极限开关</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 防护罩和防雨罩</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">紧急断电开关</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 超载保护装置</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td rowspan="3" align="center">九</td>
    <td rowspan="3" align="center">试验</td>
    <td align="left">空载试验</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left"> 额定荷载试验</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="left">坠落试验</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="40" align="center">十</td>
    <td align="center">其他</td>
    <td align="left">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="80" colspan="2" align="center">自检结论</td>
    <td colspan="3" align="left">&nbsp;</td>
    </tr>
  <tr>
    <td colspan="2" align="center">检查人员<br />
      (签名)</td>
    <td height="130" colspan="3" align="left" style="line-height:30px;">
	<p> 项目技术负责人(签名):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专职设备管理人员(签名):&nbsp;</p>
	<p>专职安全员(签名):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其他人员(签名):&nbsp;</p>
	<p align="right" style="padding-right:30px;">（项目章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> 
	  年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</p>
	
	</td>
    </tr>
</table>
<p style="padding-top:5px; text-align:left;"> 注：本表由使用单位填写，定期检查每月不少于一次。</p>

</div>

</div>
<div class="PageNext"></div>
</center>
</body>
</html>
