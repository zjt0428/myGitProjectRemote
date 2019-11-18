<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>塔式起重机安装合同</title>
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
<div class="er_w100" id="page1" style="page-break-after:always">
<div class="er_wrod_title" style="padding-bottom:15px;">塔式起重机租赁合同</div>
<div style="clear:both;"></div>
<p><table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:18px;">
  <tr>
    <th width="450" height="40" align="left"><strong>委托方：  </strong>${project.unCustomName}</th>
    <td align="left"><strong>（以下简称甲方）</strong></td>
    </tr>
  <tr>
    <th height="40" align="left"><strong>承包方：  </strong>${equip.propertyName}</th>
    <td align="left"><strong>（以下简称乙方）</strong></td>
    </tr>
</table>
</p>

<p style="line-height:32px; font-size:16px; text-align:left;">

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据工程需要，甲方将塔式起重机 <u>   &nbsp;&nbsp;${equip.equipSpecificName}&nbsp;&nbsp;      </u>（型号）塔吊 1台安装工作委托给乙方。为明确双方权利和义务，在平等互利的原则上，经双方协商一致，签订本协议。<br />
<strong>第一条 设备型号和主要塔吊安装技术指标</strong></p>

<p style="line-height:32px; font-size:16px; text-align:left;">
1、固定式塔式起重机：<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、型号：<u>          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${equip.equipSpecificName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    </u>塔机，最大起重量<u>  ${equip.loadingWeight}   </u>吨，臂尖起重量<u>   ${equip.armTipWeight}    </u>吨。<u> </u><br />
  塔吊初始安装高度：<u>    ${ContractEquip.initialHeight}  </u>米，吊臂长度：<u>     ${indisSchema.boomLength}  </u>米， </p>

<p style="line-height:32px; font-size:16px; text-align:left;">
<strong>第二条 工程名称及地点：</strong><br />

1、工程名称：<u> ${project.projectName} </u>工程<br />
2、工程地点：<u> ${project.address}</u><br />

<strong>第三条 安装时间：</strong><br />
1、	要求在<u>&nbsp;&nbsp;7&nbsp;&nbsp;</u>工作日内完成设备安装的各项工作，暂定开始时间为<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>年<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>月 <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>日，具体时间以甲方书面通知为准；<br />

<strong>第三条 安全及文明操作</strong><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、乙方必须教育自已的工人严格执行操作规程，做好安全防护措施，杜绝违章施工，对其操作人员做好符合“劳动保护法”所要求的防护用具配备和佩带； <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、垂直运输设备安装前乙方应对自己的操作人员进行安全和技术交底并做好相关记录，甲方有权随时进行检查； <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、甲方有权对乙方人员的违章行为给予经济处罚，乙方人员有权拒绝执行甲方人员的违章指示。在垂直运输设备安装期间乙方应指派一名全职安全负责人，配合甲方安全主任做好安装现场的安全工作。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、垂直运输设备安装工作禁止在以下时间（18：00至次日8：00）内和大风、暴雨等恶劣自然条件下作业。 <br />

<strong>第四条 安装费用及支付方式</strong><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、安装费用：<u>&nbsp;30000&nbsp;</u>元/每台（暂定价）<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、支付方式：<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1)甲方在安装完毕后7个工作日内支付安装费用。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2)如发生其他新增费用，同安装费用一并支付。

</p>
</div>
<div class="PageNext"></div>


<div class="er_w100" id="page2" style="page-break-after:always">
<p style="line-height:36px; font-size:16px; text-align:left;">
<strong>第五条 甲方责任</strong><br />
1、	应在设备安装前5天通知乙方工作时间，以利于乙方作好准备工作，若不能及时通知乙方，工期的延误由甲方负责；<br />
2、	按合同约定支付乙方安装费用；<br />
3、	甲方指派<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>为本合同项下工作协调负责人。<br />
</p>

<p style="line-height:38px; font-size:16px; text-align:left;">
<strong>第六条 乙方责任</strong><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、乙方应按合同规定的时间内完成垂直运输设备的安装工作。由于乙方工作和管理的原因，不能按时完成垂直运输设备的安装工作，造成甲方损失，应承担违约责任；<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、负责垂直运输设备安装前的设备检查工作，查验相关检测报告，确认设备状况对垂直运输设备的安装不构成任何潜在影响；<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、乙方指派<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>为垂直运输设备安装负责人，指挥和协调整个塔吊安装的有关工作。同时应派相应专业技术人员到现场指导垂直运输设备安装工作；<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、提供本单位的专项安全备案证书、安装和设备操作人员的合法操作证、安全上岗证、用工文件、员工保险文件等原件供甲方审核，复印并加盖公司法人公章和安装队章后一式二份留甲方存档；<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、安装前，乙方应按国家相关规范要求编制切实可行的、内容全面安装技术和操作方案，经甲方审核批准后（甲方对乙方提供的安装技术和操作方案的审核和批准并不减轻乙方应承担责任和义务），方可进行安装工作。在安装的过程中不得擅自改变方案中已规定的操作方法，如发现原方案不合理或未涵盖应由原方案编制者针对有关问题做补充方案，禁止随意处理；<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6、乙方人员应遵守甲方现场的规章制度，服从甲方协调安排。<br />

<strong>第七条 补充条款</strong><br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本合同安装价格为暂定价，最终结算以市场价为依据，按照双方签字的过程结算单为准。<br />

<strong>第八条 违约责任</strong><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在合同的履行过程中甲乙双方应严格按照合同规定的条款执行，如违反应承担违约责任。对造成对方经济损失的应负责赔偿，承担相关法律、法规责任。<br />

</p>
</div>
<div class="PageNext"></div>


<div class="er_w100" id="page3" style="page-break-after:always">
<p style="line-height:38px; font-size:16px; text-align:left;">
<strong>第九条 其他事宜</strong><br />
1、	本合同在履行中发生争议，双方协商解决，协商解决不成的，任何一方可向有管辖权的人民法院提起诉讼；<br />
2、	本协议未尽事宜，由甲乙双方友好协商，补充协议，与本合同具解决；<br />
3、	本协议一式贰份，双方各执壹份，双方代表签字之日起生效。安装完工并付清合同款后自行失效。<br /><br /><br />
</p>

<p>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="50%" height="60" align="left">甲方：  ${project.unCustomName}</td>
    <td align="left">乙方： ${equip.propertyName}</td>
  </tr>
  <tr>
    <td height="60" align="left">代表签字：</td>
    <td align="left">代表签字：</td>
  </tr>
  <tr>
    <td height="60" align="left">日期：</td>
    <td align="left">日期：</td>
  </tr>
</table>

</p>

</div>

</div>
<div class="PageNext"></div>
</center>
</body>
</html>
