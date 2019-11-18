<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>安装协议</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_word.css" />
<style media="print">
.Noprint {
	display: none;	
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
<div class="main_detail">
<p style="font-size:28px;text-align:center; padding-top:10px; font-weight:bold;">建筑起重机械安装合同</p>
<p style="font-size:16px;text-align:right; padding-top:15px; padding-right:15px;">合同编号:<strong>${indisProtocol.protocolSerial}</strong></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px; font-size:14px;">
  <tr>
    <td class="indt2">机械设备使用单位（简称甲方）：<u><strong>&nbsp;&nbsp;${indisProtocol.emEntName}&nbsp;&nbsp;</strong></u></td>
    </tr>
  <tr>
    <td class="indt2">机械设备安装单位（简称乙方）：<u><strong>&nbsp;&nbsp;${indisProtocol.inEntName}&nbsp;&nbsp;</strong></u></td>
    </tr>
  <tr>
    <td class="indt2">安装单位安装资质证书号：<u><strong>&nbsp;${indisProtocol.inEntCertNum}&nbsp;&nbsp;</strong></u>&nbsp;&nbsp;资质等级：<u><strong>&nbsp;&nbsp;${indisProtocol.inEntTitleLevel}&nbsp;&nbsp;</strong></u></td>
    </tr>
</table>
</p>
<p class="indt2">依照《中华人民共和国合同法》及相关法律、法规和《建筑起重机械安全监督管理规定》(原建设部令第166号)的规定，遵循平等、自愿、公平和诚实信用的原则，双方协商就建筑起重机械的安装/拆卸（以下简称安拆）相关事宜达成协议如下：
</p>

<p><strong>第一条  机械安装费用计算与支付</strong></p>
<p style=" text-align:center; font-size:18px;">1.机械设备费用明细表 (如不够用可另附表格)</p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
	<tbody>
	<tr>
		<td width="13%" align="center" valign="middle">机械名称</td>
		<td width="6%" align="center">数量</td>
		<td width="13%" align="center">规格/型号</td>
		<td width="20%" align="center">生产厂商</td>
		<td width="10%" align="center">费用项目</td>
		<td width="15%" align="center">安装费用</p>小计（元/台）</td>
	</tr>
	<c:forEach var="element" items="${indisProtocol.indisProtocolEquipSet}">
	<tr>
		<td align="center">${element.equipment.equipGenericName}</td>
		<td align="center">${element.quantity}</td>
		<td align="center">${element.equipment.equipSpecificName}</td>
		<td align="center">${element.equipment.equipVender}</td>
		<td align="center">&nbsp;</td>
		<td align="center">${element.summary}</td>
	</tr>
	</c:forEach>
	</tbody>
</table>
</p>
<p><p class="indt2">2.甲方支付乙方机械进出场费用<u>￥</u><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u><strong>元/台</strong>，乙方提供的机械安装服务包括进（退）场、加节、附着。 </p>
<p class="indt2">3.甲方自合同签订之日起应积极配合乙方开展安装工作，在机械设备安装完毕经检测、验收合格后3日内一次性支付给乙方进出场费用<u>￥</u><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u><strong>元/台</strong>，机械设备经有资质单位检测合格交付甲方使用之日（以租金确认单时间为准）起，机械设备使用满一个月时支付首月设备使用费，每月结算支付一次，至工程竣工。不足月的尾数日，机械设备使用费按月使用费除以30天乘以实际使用天数计算，直至机械设备使用费付清为止。 </p>
<p class="indt2">4.支付方式：按合同指定账号转账或现金支付。 </p>
<p class="indt2">5.以上所有费用的税金由甲方自行负责（若乙方代开，按总费用5﹪收取）。 </p>

<p><strong>第二条 项目名称、机械安装地点和安装高度</strong></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:32px;">
  <tr>
    <td><p class="indt2">项目名称：<u><strong>&nbsp;&nbsp;${indisProtocol.project.projectName}&nbsp;&nbsp;</strong></u></td>
  </tr>
    <tr>
    <td><p class="indt2">使用地点：<u><strong>&nbsp;&nbsp;${indisProtocol.project.address}&nbsp;&nbsp;</strong></u></td>
  </tr>
</table>
</p>

<p><strong>第三条&nbsp;&nbsp;双方权利义务</strong> </p>
<p>一、甲方权利义务 </p>
<p class="indt2">1.有权要求乙方按合同约定如期进场安装机械设备。 </p>
<p class="indt2">2.负责组织甲方有关人员会同乙方研究确定机械设备的安装位置等工作，并要及时做好记录。 </p>
<p class="indt2">3.负责机械设备基础的设计与施工（含承台、桩基），并组织机械设备基础验收。 </p>
<p class="indt2">4.负责配合机械设备基础预埋及接地装置的埋设，负责基础的日常维护和检查工作。 </p>
<p class="indt2">5.负责提供的机械设备基础的承载力，验收合格相关资料、基础砼试块报告、钢筋、预埋件隐蔽部分验收记录等。</p>
<p class="indt2">6.机械设备安装前，负责为机械设备提供足够的电源（380V±5%）。负责提供由配电箱（房）至机械设备基础处的专用开关箱与电源线，电源线应采用“三相五线”制，专用开关箱内应符合“一机一闸一漏一箱  ”。 </p>
<p class="indt2">7.机械设备使用过程中，若需顶升附着，应提前七日通知乙方，以便乙方统筹安排；附着铁件预埋后，应派架子工在预埋铁件相应高度处搭设附着安装人员操作防护平台。附着后要组织验收，验收合格后才能使用。 </p>
<p class="indt2">8.机械设备进场安装负责做好进场道路压实，作业场地的平整，周边障碍物（含外架）的清除等工作。 </p>
<p>二、乙方权利义务 </p>
<p class="indt2">1.有权要求甲方按合同约定支付机械设备安装费用。 </p>
<p class="indt2">2.积极配合甲方做好机械设备安装位置的确定和基础预埋的技术指导，并参与基础验收工作。 </p>
<p class="indt2">3.负责根据工程及机械设备情况编制安装专项施工方案，经本单位技术负责人审批签字，报施工及监理单位审核并告知当地机械设备备案机关后方可进行作业。 </p>
<p class="indt2">4.负责组织人员进行机械设备的进场安装、顶升加节、附着锚固等工作，并在双方约定的时间内完成。 </p>
<p class="indt2">5. 机械设备需要附着时，附着装置应采用原制造厂家提供的产品，附着杆根据工程结构情况，若需改造加工，由乙方按规范要求设计、制作，并由原制造厂家确认或经本单位技术负责人审核、专家认证后方可安装。制作材料须提供质保书，发生的费用按合同约定。 </p>
<p class="indt2">6. 机械设备安装完毕，负责按照安全技术标准及使用说明书的有关要求对机械设备进行自检、调试和试运转。 </p>
<p class="indt2">7. 负责提供的内业技术资料包括：相应安装资质、安全生产许可证、安装管理人员证书、安装作业人员上岗证、安装专项施工方案、自检合格报告、安装安全技术交底记录等。 </p>
<p><strong>第四条&nbsp;&nbsp;双方安全责任 </strong></p>
<p>一、甲方安全责任 </p>
<p class="indt2">1．甲方应向乙方提供确保建筑起重机械设备进场安装所需的施工条件，并设置安全警戒区。 </p>
<p class="indt2">2．甲方应跟据不同施工阶段、周围环境以及季节、气候的变化，对建筑起重机械采取相应的安全防护措施。 </p>
<p class="indt2">3．甲方应指定专职机械设备管理人员、专职安全员进行现场监督检查。 </p>
<p>二、乙方安全责任 </p>
<p class="indt2">1.乙方组织的安装作业人员须持证上岗并按规定穿戴好安全防护用品，严格遵守安装程序和安全操作规程，严格按照经审批的安装专项施工方案进行作业。 </p>
<p class="indt2">2.乙方组织机械设备安装、顶升加节、附着锚固作业必须在白天或照明良好的夜间进行，不得在大风（12m/s以上）、浓雾和雨雪天气进行作业。 </p>
<p class="indt2">3.乙方在安装前应对吊具索具以及机械设备各部件进行检查，同时对辅助起重设备进行检查，确认正常后方可开始安装。 </p>
<p class="indt2">4.乙方每次作业前，须对参与作业人员进行安全技术交底并签字确认。在作业条件符合要求的前提下，乙方对机械设备安装、顶升加节、附着锚固等作业过程的安全生产负责。 </p>
<p><strong>第五条&nbsp;&nbsp;违约责任 </strong></p>
<p>一、甲方违约责任 </p>
<p class="indt2">1.甲方未按合同约定做好机械设备安装前场地平整、周边障碍物（含外架）的清除工作，影响安装而产生的责任与费用由甲方承担。 </p>
<p class="indt2">2.甲方未按合同约定按时支付机械设备安装费，须按每逾期一日<u>￥</u><u>&nbsp;&nbsp;/&nbsp;&nbsp;</u>元的标准向乙方支付延期违约金。 </p>
<p class="indt2">3.其他约定：<u>&nbsp;&nbsp;/&nbsp;&nbsp;</u>。 </p>
<p>二、乙方违约责任 </p>
<p class="indt2">1.乙方未按合同约定时间完成机械设备安装、顶升加节、附着锚固，须支付违约金每日&nbsp;￥</u><u>&nbsp;&nbsp;/&nbsp;&nbsp;</u>>元。 </p>
<p class="indt2">2.其他约定： </p>
<p><strong>第六条&nbsp;&nbsp;不可抗力</strong></p>
<p class="indt2">当事人一方因不可抗力不能按照约定履行本合同的，根据不可抗力的影响，可部分或全部免除责任；当事人一方因不可抗力不能履行合同的，应当及时告知对方，并自不可抗力结束之日起七日内向对方当事人提供证明。 </p>
<p><strong>第七条&nbsp;&nbsp;争议解决 </strong></p>
<p class="indt2">本合同项下发生的争议，由双方协商解决，也可由行业主管部门调解，协商或者调解不成的，按下列第壹种方式解决。 </p>
<p class="indt2">1．向武夷山市人民法院提起诉讼； </p>
<p class="indt2">2．向武夷山市仲裁委员会申请仲裁。 </p>
<p><strong>第八条&nbsp;&nbsp;其他条款 </strong></p>
<p class="indt2">1．本合同自双方签字并盖章之日起生效。本合同一式贰份，具有同等法律效力，其中甲方壹份，乙方壹份。 </p>
<p class="indt2">2．本合同附件以及合同履行过程中形成的各种书面文件，经双方签署确认后为本合同的组成部分，与本合同具有同等法律效力。 </p>
<p class="indt2">3．本合同未尽事宜，双方可协商签订补充协议，补充协议与本合同具有同等法律效力。 </p>
<p class="indt2">4．合同签订地：___________________________________________________________</p>
<p class="indt2">5．其他约定：</p> 
<p class="indt2">（1）建筑起重机械安装、加节、附着，甲方必须通知乙方（在安装告知资料中的人员）到位安装，若不是乙方人员进行安装、加节、附着，出现任何问题均由甲方自行负责。 </p>
<p class="indt2">（2）在安装过程中，若遇到人力不可抗拒的特殊情况，甲乙双方另行协商。 </p>
<p class="indt2">（3）设备安装到设计要求高度并检测合格后安装合同自行终止。 </p>
<p class="indt2">（4）<u>三个月之内，若甲方未书面通知乙方设备进场，此合同自动作废。</u></p>
<p style=" padding-top:20px; padding-left:15px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px; font-size:14px;">
  <tr>
    <td width="50%">总承包单位：（盖章 ） </td>
    <td><p>安装单位：（盖章） </p></td>
  </tr>
  <tr>
    <td>地    址：</td>
    <td>地    址：</td>
  </tr>
  <tr>
    <td>法定代表人：</td>
    <td>法定代表人：</td>
  </tr>
  <tr>
    <td>法定代表人或委托人：</td>
    <td>法定代表人或委托人：</td>
  </tr>
  <tr>
    <td>电      话：</td>
    <td>电      话：</td>
  </tr>
  <tr>
    <td>传      真：</td>
    <td>传      真：</td>
  </tr>
  <tr>
    <td>邮 政 编 码：</td>
    <td>邮 政 编 码：</td>
  </tr>
  <tr>
    <td>年  月   日：</td>
    <td>年  月   日：</td>
  </tr>
</table>


</p>
</div>
</center>
</body>
</html>
