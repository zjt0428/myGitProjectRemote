<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>维保制度表</title>
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
<div class="er_wrod_title">安全专项施工（方案）报审表</div>
<div class="er_w100" id="page1" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="20" align="right" style="padding-right:10px; padding-bottom:2px;">GDAQ21103&nbsp;
      <input name="" type="text" style="width:60px; border:1px solid #000000;"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="200" height="24" align="left"><p>工程名称： ${project.projectName}</p></td>
    <td align="left">  编号： </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td height="300" align="left" valign="top" style="padding:10px;"><p>
	   致：<u>${project.supCustomName}</u> （监理单位） <br />
      <br />
      我方已根据施工合同的有关规定完成了<u>    ${project.projectName}    </u><u>&nbsp;&nbsp;&nbsp;&nbsp;    &nbsp;&nbsp;&nbsp;</u><u>塔式起重机使用及维护保养度 </u><br />
      的编制，并经我单位上级技术负责人批准，请允以审查。 </p>
      <p><br />附：<u>    ${project.projectName}              </u><u>塔式起重机使用及维护保养度</u> </p>
	  <br />
	  <br />
	  <br />
	  <br />
	  <p style="text-align:right; line-height:40px;">
		总承包单位（项目章）_________________________   <br />                        
		
		项目负责人（注册章）_________________________   <br />                                     
		
		年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp; </p>
	  
	  </td>
  </tr>
  <tr>
    <td height="200" align="left" valign="top" style="padding:10px;">	
	<p>专业监理工程师审查意见：</p>
	<br /><br /><br /><br />
	<p style="text-align:right; line-height:40px;">
		专业监理工程师（签名）_________________________   <br />                                     
		
		年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp; 
	</p>
	
	
	</td>
  </tr>
  <tr>
    <td height="260" align="left"  valign="top" style="padding:10px;">
	<p>总监理工程师审核意见： </p>
	<br /><br /><br />
	<br /><br /><br /><br />
		<p style="text-align:right; line-height:40px;">
		项目监理机构（章）：_________________________   <br />                                     
		
	总监理工程师（注册章）：_________________________   <br />                                     
		
		年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp; 
	</p>
	
	</td>
  </tr>
</table>
</div>
<div class="PageNext"></div>

<div class="er_w100" id="page2" style="page-break-after:always">

<p style="height:100px;">&nbsp;</p>

<p style="text-align:center; font-size:48px; line-height:58px; font-weight:bold;">塔式起重机<br />
使用及维护保养制度
</p>

<p style="height:400px;">&nbsp;</p>

<p style="line-height:46px; font-size:18px; text-align:left; padding-left:50px;">

<strong>工程名称: ${project.projectName}  <br />
工程地点: ${project.address} <br />
安装(维保)单位: ${equip.propertyName}</strong><br />

</p>

</div>
<div class="PageNext"></div>


<div class="er_w100" id="page3" style="page-break-after:always">
<p style="text-align:left; font-size:20px; line-height:46px; font-weight:bold;"> 一、编制依据</p>
<p style="text-align:left; line-height:46px; font-size:18px;">
1．【施工现场机械设备检查技术规程】（JGJ160-2008）<br />
2．H3/36B塔机使用说明书
</p>
<p style="text-align:left; font-size:20px; line-height:46px; font-weight:bold;"> 二、工程概况</p>

<p style="text-align:left; line-height:46px; font-size:18px;">
	工程名称：能源大厦施工总承包 <br />
	工程地点：深圳市福田中心区滨河大道与金田路交汇处东北角<br />
	计划安装______台塔式起重机,自编号为_________________  。</p>

<p style="text-align:left; font-size:20px; line-height:46px; font-weight:bold;"> 三、塔机安全使用条件</p>
<p style="text-align:left; line-height:46px; font-size:18px;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;塔式起重机在安装前必须办理产权备案、安装告知，使用前必须经有资质的检测机构检测合格和办理使用登记手续后，方可投入使用。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;塔机在正式投入使用后，应根据本项目塔机数量及使用频率配备足够数量的符合建设行政主管部门要求的塔机司机、司索指挥人员。塔机司机、司索指挥人员在正式上岗前，必须熟悉本工程在用塔机的基本性能，并按塔机操作规程的有关要求进行吊装作业。
</p>

<p style="text-align:left; font-size:20px; line-height:46px; font-weight:bold;"> 四、维保作业人员的安全操作要求</p>
<p style="text-align:left; line-height:46px; font-size:18px;">
&nbsp;&nbsp;&nbsp;&nbsp;1）对维保人员所使用的工具、安全带、安全帽等进行检查，不合格者立即更换；<br />
&nbsp;&nbsp;&nbsp;&nbsp;2）起重机的维保作业应在白天进行，当遇大风、浓雾和雨雪等恶劣天气时，应停止作业。<br />
&nbsp;&nbsp;&nbsp;&nbsp;3）维保人员在进入工作现场时，应穿戴安全保护用品，高处作业时应系好安全带，熟悉并认真执行拆装工艺和操作规程一，当发现异常情况或疑难问题时，应及时向技术负责人反映，不得自行其是，应防止处理不当而造成事故。</p>

</div>
<div class="PageNext"></div>


<div class="er_w100" id="page4" style="page-break-after:always">
<p style="text-align:left; font-size:20px; line-height:44px; font-weight:bold;">五、塔机使用的主要注意事项</p>

<p style="text-align:left; line-height:42px; font-size:18px;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.塔机司机应按有关规定要求每天进行日常检查。检查的内容主要有：标准节连接螺栓的松紧程度，驾驶室电笛是否正常，紧急停机按钮开关是否正常，各运行机构及电控系统是否正常，各安全装置是否正常等，并填写塔机运行记录。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.当风速达到6级时，应立即停止作业。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.塔机的各种安全装置不得随意进行调整，更不准擅自取消。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.塔机在作业中临时停歇或停电时，必须将重物卸下，升起吊钩。将各操作手柄（钮）置于“零”位，并切断总电源。如因停电无法升、降重物，则应根据现场具体情况，由现场机电设备主管人员研究，采取适当的措施。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.多机作业时，应避免各塔机在回转半径内重叠作业。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.凡是回转机构带有止动装置或常闭式制动器的塔机，在停止作业后，司机必须松开制动。绝对禁止限制起重臂随风转动。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7.司机、司索指挥人员必须严格遵守塔机操作规程，自觉抵制违章作业。
</p>

<p style="text-align:left; font-size:20px; line-height:44px; font-weight:bold;">六、塔机维保管理小组的建立和各自职责要求</p>
<p style="text-align:left; line-height:42px; font-size:18px;">
塔机维保管理小组组长：肖劲松&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上岗证件号码：粤建安C（2012）0006976<br />
塔机维保管理小组组长职责：负责组织、安排维保管理小组的各项检查、维保活动，对检查、维保内容进行技术交底，填写检查、维保记录表。<br />
塔机维保管理小组成员：丁合平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上岗证件号码：粤B012013000372<br />
塔机维保管理小组成员：王燕平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上岗证件号码：粤B032013001037<br />
塔机维保管理小组成员职责：服从组长的领导，认真完成组长安排的各项维保任务。<br />
维保周期原则上每月不少于2次，施工高峰期、塔吊使用频率较高时，应相应增加维保次数。
</p>

</div>
<div class="PageNext"></div>


<div class="er_w100" id="page5" style="page-break-after:always">
<p style="text-align:left; font-size:20px; line-height:44px; font-weight:bold;">七、塔机定期检查、维保的主要内容和要求</p>
<p style="text-align:left; line-height:45px; font-size:18px;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1．检查基础排水设施及基座螺栓松紧情况。确保塔机基础排水通畅，无明显积水现象。基座螺栓连接紧固，并符合塔机使用说明书所要求的预紧力矩要求，无松动现象。检查频率为每月至少2次。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2．标准节及附着件处连接坚固的检查。标准节及附着件处连接应紧固，不应有松动现象，主要焊缝不应有裂纹和开焊，附着杆有调整装置的应按要求调整后锁紧。检查频率为每月至少2次。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3．各安全装置的维护检查。每月至少2次对塔机力矩限制器、起重量限制器进行试吊检验，确保该安全装置在塔机使用说明书规定的范围内可靠、有效。如发现失效的安全装置，应及时按塔机使用说明书的有关要求进行调整。每月至少2次对塔机回转限制器、小车幅度限制器、起升高度限制器等安全装置进行检验，确保该安全装置安全、有效。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4．钢丝绳磨损的检查及保养。钢丝绳在卷筒上的缠绕必须整齐，如发现有爬绳、乱绳、啃绳，以及各层间互相塞挤现象时，应及时进行处理，重新进行排绳，确保钢丝绳排列整齐、有序。如发现钢丝绳有断丝断股、松股、折弯等缺陷，且达到钢丝绳报废标准的，应及时更换钢丝绳。应按塔机使用说明书的要求定期对钢丝绳进行润滑保养。检查频率为每月至少2次。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5．吊钩防脱落装置的检查。吊钩及各部滑轮、导绳轮应转动灵活，无卡塞现象。每月至少2次检查吊钩防脱落装置，确保该装置可靠、有效。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6．吊臂连接节点的检查。每月至少2次检查吊臂连接节点，确保吊臂连接节点连接坚固，开口销按规定张开。

</p>
</div>
<div class="PageNext"></div>

<div class="er_w100" id="page6" style="page-break-after:always">
<p style="text-align:left; line-height:46px; font-size:18px;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7．制动器与传动机构的维护检查。A.各机构的制动器应动作灵活，制动可靠。检查液压油箱和制动器储油装置中的油量应符合规定，油路无泄漏。制动瓦和制动轮的间隙应符合使用说明书要求，摩擦面上不应有污物存在。B.各传动机构应动转灵活，无异常噪音，各电气系统运转正常。检查各传动机构的润滑油量和油质。当油量不足时，应及时加注。当油质不符合要求时，应及时更换。当电气系统发生故障时，应及时处理。检查频率为每月至少2次。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8．指定部位的维护保养。进行顶升加节前，必须对液压系统进行全面细致的检查。务必确保液压油量的油质、溢流阀的压力的调整符合使用说明书的要求，油压表顶升压力应正常，各部管接头连接紧密，无漏油现象。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9．卸料平台的检查。每月至少2次检查卸料平台的拉结点情况，应确保牢固、可靠。</p>
</div>



</div>
<div class="PageNext"></div>
</center>
</body>
</html>
