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
<p style="font-size:28px;text-align:center; padding-top:10px; font-weight:bold;">建筑起重机械拆卸合同</p>
<p style="font-size:16px;text-align:right; padding-top:15px; padding-right:15px;">合同编号:<strong>${indisProtocol.protocolSerial}</strong></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px; font-size:14px;">
  <tr>
    <td class="indt2">机械设备使用单位（简称甲方）：<u><strong>&nbsp;&nbsp;${indisProtocol.emEntName}&nbsp;&nbsp;</strong></u></td>
    </tr>
  <tr>
    <td class="indt2">机械设备拆卸单位（简称乙方）：<u><strong>&nbsp;&nbsp;${indisProtocol.inEntName}&nbsp;&nbsp;</strong></u></td>
    </tr>
  <tr>
    <td class="indt2">拆卸单位拆卸资质证书号：<u><strong>&nbsp;${indisProtocol.inEntCertNum}&nbsp;&nbsp;</strong></u>&nbsp;&nbsp;资质等级：<u><strong>&nbsp;&nbsp;${indisProtocol.inEntTitleLevel}&nbsp;&nbsp;</strong></u></td>
    </tr>
</table>
</p>
<p class="indt2">依照《中华人民共和国合同法》及相关法律、法规和《建筑起重机械安全监督管理规定》(原建设部令第166号)的规定，遵循平等、自愿、公平和诚实信用的原则，双方协商就建筑起重机械的拆卸（以相关事宜达成协议如下）：</p>

<p><strong>第一条  机械拆卸费用计算与支付</strong></p>
<p style=" text-align:center; font-size:18px;">1.机械拆卸费用明细表 (如不够用可另附表格)</p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
		<tbody><tr>
			<td width="13%" align="center" valign="middle">机械名称</td>
			<td width="10%" align="center">数量</td>
			<td width="15%" align="center">规格/型号</td>
			<td width="18%" align="center">生产厂商</td>
			<td width="16%" align="center">拆卸时间</td>
			<td width="15%" align="center">拆卸总费用(元/台）</td>
			<td  align="center">拆卸费用小计（元）</td>
		</tr>
		<c:forEach var="element" items="${indisProtocol.indisProtocolEquipSet}">
		<tr>
			<td align="center">${element.equipment.equipGenericName}&nbsp;</td>
			<td align="center">${element.quantity}&nbsp;</td>
			<td align="center">${element.equipment.equipSpecificName}&nbsp;</td>
			<td align="center">${element.equipment.equipVender}&nbsp;</td>
			<td align="center">${indisProtocol.providedDate}&nbsp;</td>
			<td align="center">&nbsp;</td>
			<td align="center">${element.summary}&nbsp;</td>
		</tr>
		</c:forEach>
	</tbody></table>
</p>
<p><p class="indt2">2.塔式起重机自甲方书面通知乙方拆卸1 0日内进场拆卸 </p>
<p class="indt2">3.支付方式：按合同指定账号转账或现金支付。 </p>
<p class="indt2">4.以上机械设备费用税金属于甲方（使用单位）承担范畴内，若由乙方承担，税率按总额5﹪进行计算。</p>

<p><strong>第二条 项目名称、机械拆卸地点和拆卸高度</strong></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:32px;">
  <tr>
    <td><p class="indt2">项目名称：<u><strong>&nbsp;&nbsp;${indisProtocol.project.projectName}&nbsp;&nbsp;</strong></u></td>
  </tr>
    <tr>
    <td><p class="indt2">机械拆卸地点：<u><strong>&nbsp;&nbsp;${indisProtocol.project.address}&nbsp;&nbsp;</strong></u></td>
  </tr>
   <tr>
  <td class="indt2">拆卸高度：拆卸高度<u><strong>&nbsp;&nbsp;${indisProtocol.finalHeight}&nbsp;&nbsp;</strong></u>米，附着<u><strong>&nbsp;&nbsp;${indisProtocol.wallAttacheQty}&nbsp;&nbsp;</strong></u>道。</td>
  </tr>
</table>
</p>

<p><strong>第三条&nbsp;&nbsp;双方权利义务</strong> </p>
<p>一、甲方权利义务 </p>
<p class="indt2">1.有权要求乙方按合同约定如期进场拆卸机械设备。 </p>
<p class="indt2">2.机械设备拆卸退场前，负责做好退场道路压实，作业场地的平整，周边障碍物（含外架）的清除等工作。 </p>
<p>二、乙方权利义务 </p>
<p class="indt2">1.有权要求甲方按合同约定支付机械设备拆卸费用。</p>
<p class="indt2">2.负责根据工程及机械设备情况编制拆卸专项施工方案，经本单位技术负责人审批签字，报施工及监理单位审核并告知当地机械设备备案机关后方可进行作业。</p>
<p class="indt2">3.负责组织人员进行机械设备的拆卸工作，并在双方约定的时间内完成。 </p>
<p class="indt2">4.负责提供的内业技术资料包括：相应拆卸资质、安全生产许可证、拆卸管理人员证书、拆卸作业人员上岗证、拆卸专项施工方案、拆卸安全技术交底记录等。</p>
<p><strong>第四条&nbsp;&nbsp;双方安全责任 </strong></p>
<p>一、甲方安全责任 </p>
<p class="indt2">1．甲方应向乙方提供确保建筑起重机械设备拆卸所需的施工条件，并设置安全警戒区。 </p>
<p class="indt2">2．甲方应跟据不同施工阶段、周围环境以及季节、气候的变化，对建筑起重机械采取相应的安全防护措施 </p>
<p class="indt2">3．甲方应指定专职机械设备管理人员、专职安全员进行现场监督检查。</p>
<p>二、乙方安全责任 </p>
<p class="indt2">1.乙方组织的拆卸作业人员须持证上岗并按规定穿戴好安全防护用品，严格遵守拆卸程序和安全操作规程，严格按照经审批的拆卸专项施工方案进行作业。 </p>
<p class="indt2">2.乙方组织机械设备拆卸、降节、拆除附着作业必须在白天或照明良好的夜间进行，不得在大风（12m/s以上）、浓雾和雨雪天气进行作业。 </p>
<p class="indt2">3.乙方在拆卸前应对吊具索具以及机械设备各部件进行检查，同时对辅助起重设备进行检查，确认正常后方可开始拆卸。 </p>
<p class="indt2">4.乙方每次作业前，须对参与作业人员进行安全技术交底并签字确认。在作业条件符合要求的前提下，乙方对机械设备拆卸、降节、拆除附着作业过程的安全生产负责。 </p>
<p><strong>第五条&nbsp;&nbsp;违约责任 </strong></p>
<p>一、甲方违约责任 </p>
<p class="indt2">1.甲方未按合同约定做好机械设备拆卸前场地平整、周边障碍物（含外架）的清除工作，影响拆卸而产生的责任与费用由甲方承担。 </p>
<p class="indt2">2.甲方未按合同约定按时支付机械设备拆卸费，须按每逾期一日<u>&nbsp;&nbsp;￥<strong>30.00&nbsp;</strong>/&nbsp;&nbsp;</u>元的标准向乙方支付延期违约金。 </p>
<p class="indt2">3.其他约定：<u>&nbsp;&nbsp;/&nbsp;&nbsp;</u>。 </p>
<p>二、乙方违约责任 </p>
<p class="indt2">1.乙方未按合同约定时间完成机械设备拆卸，须支付违约金<u>&nbsp;&nbsp;¥<strong>30.00</strong> </u>元/日。</p>
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
<p class="indt2">4．合同签订地：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合同签订地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></p>
<p class="indt2">5．其他约定：</p> 
<p class="indt2"> 塔式起重机需拆卸甲方必须通知乙方并核对人员（在拆卸告知资料中的人员）到位拆卸操作，若不是乙方人员操作，出现任何问题均与乙方无关。 </p>
<p style=" padding-top:20px; padding-left:15px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px; font-size:14px;">
  <tr>
    <td width="50%">总承包单位：（盖章 ） </td>
    <td><p>拆卸单位：（盖章） </p></td>
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
    <td>开户银行：</td>
    <td>开户银行：</td>
  </tr>
 <tr>
    <td>账号：</td>
    <td>账号：</td>
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

