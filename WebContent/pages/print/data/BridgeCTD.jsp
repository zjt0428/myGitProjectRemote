<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>桥（门）式起重机操作安全技术交底</title>
<link href="../css/er_style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<center>
<div class="er_main_detail">
<div class="er_wrod_title">桥（门）式起重机操作安全技术交底</div>
<div class="er_w100" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="480" height="30" align="left">施工单位：${project.unCustomName}</td>
    <td align="right" style=" font-family:'宋体'">GDAQ330609&nbsp;<input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="70" align="center">工程名称</td>
    <td width="180">&nbsp;${project.projectName}</td>
    <td width="70" align="center">分部分项<br />工&nbsp;&nbsp;&nbsp;&nbsp;程</td>
    <td width="180">&nbsp;${printData.qiaoMenCaoProject}</td>
    <td width="50" align="center">工 种</td>
    <td align="center">${printData.qiaoCaoKindWork}</td>
  </tr>
  </table>
 <table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;"> 
  <tr>
    <td align="left" style="line-height:24px;">
      <p>一、进入施工现场必须遵守安全操作规程和安全生产纪律，操作工人必须取得省级建设主管部门颁发的建筑施工特种作业人员操作证书，方可上岗。 <br />
        二、起重机路基和轨道的铺设应符合出厂规定，轨道接地电阻不应大于4Ω。 <br />
        三、使用电缆的门式起重机，应设有电缆卷筒，配电箱应设置在轨道中部。 <br />
        四、用滑线供电的起重机,应在滑线两端标有鲜明的颜色,滑线应设置防护栏杆。 <br />
        五、轨道应平直，鱼尾板连接螺栓应无松动，轨道和起重机运行范围内应无障碍物，门式起重机应松开夹轨器。 <br />
        六、操作室内应垫木板或绝缘板，接通电源后应采用试电笔测试金属结构部分，确认无漏电方可上机，上、下操纵室应使用专用扶梯。 <br />
        七、门式、桥式起重机作业前的重点检查项目应符合下列要求： <br />
        （一）机械结构外观正常，各连接件无松动； <br />
        （二）钢丝绳外表情况良好，绳卡牢固； <br />
        （三）各安全限位装置齐全完好。 <br />
        八、作业前，应进行空载运转，在确认各机构运转正常，制动可靠，各限位开关灵敏有效后，方可作业。 <br />
        九、开动前，应先发出音响信号示意，重物提升和下降操作应平稳匀速，在提升大件时不得用快速，并应拴拉绳防止摆动。 <br />
        十、吊运易燃、易爆、有害等危险品时，应经安全主管部门批准，并应有相应的安全措施。 <br />
        十一、重物的吊运路线严禁从人上方通过，亦不得从设备上面通过，空车行走时，吊钩应离地面2m以上。 <br />
        十二、吊起重物后应慢速行驶，行驶中不得突然变速或倒退。两台起重机同时作业时，应保持距离3～5m。 <br />
        十三、严禁用一台起重机顶推另一台起重机。 <br />
        十四、起重机行走时，两侧驱动轮应同步，发现偏移应停止作业，调整好后方可继续使用。 <br />
        十五、作业中，严禁任何人从一台桥式起重机跨越到另一台桥式起重机上去。 <br />
        十六、操作人员由操纵室进入桥架或进行保养检修时，应有自动断电联锁装置或事先切断电源。 <br />
        十七、露天作业的门式、桥式起重机，当遇六级及以上大风时，应停止作业  并锁紧夹轨器。 <br />
        十八、门式、桥式起重机的主梁挠度超过规定值时，必须修复后方可使用。 <br />
        十九、作业后，门式起重机应停放在停机线上，用夹轨器锁紧，并将吊钩升到上部位置，桥式起重机应将小车停放在两条轨道中间，吊钩提升到上部位置，吊钩上不得悬挂重物。 <br />
        二十、作业后，应将控制器拨到零位，切断电源，关闭并锁好操纵室门窗。 <br />
        二十一、现场补充交底内容： </p>
      <p style="text-align:right; padding-right:200px; line-height:26px;">交底人签字： <br />
        日      期： </p>
		</td>
    </tr>
  <tr>
    <td height="70" align="left" valign="top">
	<p>接受人（全员）签字：</p>
	<p>&nbsp;</p>
	</td>
  </tr>
</table>
<p style="text-align:left;">&nbsp;<strong>&nbsp;注：</strong>本交底一式三份，班组、交底人、资料保管员各一份。</p>
</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
