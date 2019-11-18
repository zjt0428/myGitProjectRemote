<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>起重指挥司索工安全技术交底</title>
    <link href="../css/er_style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<center>
<div class="er_main_detail">
<div class="er_wrod_title">起重指挥司索工安全技术交底</div>
<div class="er_w100" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="480" height="30" align="left">施工单位：  ${project.unCustomName}</td>
    <td align="right" style=" font-family:'宋体'">GDAQ330613&nbsp;<input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="70" align="center">工程名称</td>
    <td width="180">&nbsp;${project.projectName}</td>
    <td width="70" align="center">分部分项<br />工&nbsp;&nbsp;&nbsp;&nbsp;程</td>
    <td width="180">&nbsp;${printData.zhiHuiProject}</td>
    <td width="50" align="center">工 种</td>
    <td>&nbsp;${printData.siSuoKindWork}</td>
  </tr>
  </table>
 <table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list" style="border-top-style:none;"> 
  <tr>
    <td align="left" style="line-height:24px;"><p>一、吊运指挥人员必须是18周岁以上（含18周岁），视力（包括矫正视力）在0.8以上，无色盲症，听力能满足工作条件的要求，身体健康者。 <br />
二、指挥人员必须安全技术培训，劳动部门考核合格，并发给安全技术操作证后，方可从事指挥。 <br />
三、指挥人员必须严格执行GB 5082标准与起重司机联络时做到准确无误。 <br />
四、指挥人员应熟知《起重机械安全规程》GB 6067和《起重机械吊具与索具安全规程》LD 48—1993。 <br />
五、指挥人员寻所指定的起重机械，必须熟悉技术性能后方可指挥。 <br />
六、指挥人员不能干涉起重司机对手柄或旋钮的选择。 <br />
七、负责载荷的重量计算和索具的正确选择。 <br />
八、指挥人员负责对可能出现的事故采取必要的防范措施。 <br />
九、指挥人员应佩戴鲜明的标志和特殊颜色的安全帽。 <br />
十、指挥人员在发出吊钩或负载下降信号时，应有保护负载降落地点的人身、设备安全措施。 <br />
十一、在开始指挥起吊负载时，用微动信号指挥；待负载离开地面100～200mm时，停止起升，进行试吊，确认安全可靠后，方可用正常起升信号指挥重物上升。 <br />
十二、指挥起重机在雨、雪天气作业时，应先经过试吊，检验制动器灵敏可靠后，方可进行正常的起吊作业。 <br />
十三、在高处指挥时，指挥人员应严格遵守高处作业安全要求。 <br />
十四、指挥人员选择指挥位置时： <br />
（一）应保证与起重机司机之间视线清楚。 <br />
（二）在所指定的区域内，应能清楚地看到负载。 <br />
（三）指挥人员应与被吊运物体保持安全距离。 <br />
（四）当指挥人员不能同时看见起重司机和负载时，应站到能看见起重机司机的一侧，并增设中间指挥人员传递信号。 <br />
十五、现场补充交底内容： </p><br /><br />
      <p style="text-align:right; padding-right:200px; line-height:26px;">交底人签字： <br />
        日      期： </p>
		<br /><br />
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
