<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>临时用电工程安全技术交底</title>
  <link href="../css/er_style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<center>
<div class="er_main_detail">
<div class="er_wrod_title">临时用电工程安全技术交底</div>
<div class="er_w100" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="480" height="30" align="left">施工单位： ${project.unCustomName}</td>
    <td align="right" style=" font-family:'宋体'">GDAQ330905&nbsp;<input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
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
    <td align="left" style="line-height:17px;">
      <p>一、进入施工现场必须遵守安全操作规程和安全生产纪律，特种作业人员必须持证上岗。 <br />
        二、严格执行《施工现场临时用电安全技术规范》JGJ  46―2005，按照施工用电组织设计架设三相五线制的电气线路，所有电线均应架空，过道或穿墙均要用钢管或胶套管保护，严禁利用大地作为工作零线。 <br />
        三、配电箱、开关箱内电气设备完好无缺。箱体下方进出线，开关箱应符合“一机、一闸、一漏、一箱”的要求，门、锁完善，有防雨、防尘措施，箱内无杂物，箱前通道畅通，并应对电箱统一编号，并设危险标志。保护零线（PE、绿/黄线）中间和末端必须重复接地,严禁与工作零线混接；产生振动的设备的重复接地不少于两处。 <br />
        四、使用设备必须按规定穿戴和配备好相应的劳动保护用品，并应检查电气装置和保护设施是否完好，严禁设备带病运转和进行在运转中维修。 <br />
        五、停用的设备必须拉闸断电，锁好开关箱。负载线、保护零线和开关箱发现问题应及时报告解决。搬迁或移动的用电设备，必须由专业电工切断电源并作妥善处理。 <br />
        六、在建工程与外电线路的安全距离及外电防护和接地与防雷等应严格按规范执行。 <br />
        七、配电线路的架空线必须采用绝缘铜线和绝缘铜线和绝缘铝线。架空线必须设置在专用电杆上，严禁架设在树木或脚手架、龙门架或井字架上。 <br />
        八、空线的接头、相序排列、档距、线间距离及横担的垂直距离和横担的选择及规格，严格执行规范规定。<br />
        九、动力配电箱与照明配电箱宜设置，如合置在同一配电箱内，动力和照明线路应分路设置。 <br />
        十、开关箱应由末级配电箱配电，配电箱、开关箱制作所用的材料、箱的规格设置要求及安装技术应按规范执行。  配电箱、开关箱最好购合格的成品使用。 <br />
        十一、配电箱、开关箱内的开关电器安装，绝缘要求和箱壳保护接零应按规范执行。 <br />
        十二、每台用电设备应有各自专用的开关箱，必须实行“一机、一闸、一漏、一箱”制。严禁用同一个开关电器直接控制两台及两台以上用电设备（含插座）。 <br />
        十三、开关箱内必须装设漏电保护器，漏电保护器的选择、安装和额定漏电动作应符合规范要求。 <br />
        十四、总配电箱和开关箱中两级漏电保护器的额定漏电动作时间作合理配合匹配，实现分段保护的功能。 <br />
        十五、手动开关电器只许用于直接控制照明电器和容量不大于5.5kW动力电路。容量大于5.5kW的动力电路应采用自动开关电器或降压启动装置控制。各种开关电器元器件的额定值与其控制用电设备的额定值相适应。 <br />
        十六、所有配电箱、开关箱应由专人负责。且应每月定期检修一次。检查、维修人员必须是专业电工，检查、维修时必须按规定穿戴绝缘鞋、手套、必须使用电工绝缘工具。 <br />
        十七、对配电箱、开关箱进行检查、维修时，必须将其前一级相应的电源开关分闸断电，并悬挂停电检修标志牌，严禁带电作业。 <br />
        十八、移动的用电设备使用的电源线路，必须使用绝缘胶套管式电缆。 <br />
        十九、用电设备和电气线路必须有保护接零。 <br />
        二十、严禁施工现场非正式电工乱接用电线和安装用电开关。 <br />
        二十一、残缺绝缘盖的闸刀开关禁止使用，电气设备所用保险丝，禁止用其他金属丝代替，并且需与设备容量相匹配。 <br />
        二十二、电工必须严格执行电工安全操作规程，对电气设备要进行定期检查和试验，凡不合格的电气设备、工具要停止使用。 <br />
        二十三、施工现场内严禁使用劲塑料线，所用绝缘导线型号及截面必须符合临电设计。 <br />
        二十四、当发生电气火灾时即切断电源，用干砂灭火，或用干粉灭火器灭火，严禁使用导电的灭火剂灭火<br />
        二十五、凡移动式照明，必须采用安全电压；地下室照明和潮湿现场的照明，应采用36V以下安全电压。 <br />
        二十六、不得私自乱拉电源，严禁将电源线的金属丝直接插入插座。 <br />
        二十七、现场补充交底内容： </p>
      <p style="text-align:right; padding-right:200px; line-height:26px;">交底人签字： <br />
        日      期： </p>
		</td>
    </tr>
  <tr>
    <td height="60" align="left" valign="top">
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
