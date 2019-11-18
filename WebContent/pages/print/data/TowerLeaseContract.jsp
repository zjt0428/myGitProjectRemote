<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>塔式起重机租赁合同</title>
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
    <th width="450" height="40" align="left"><strong>承租方：  </strong>${project.unCustomName}</th>
    <td align="left"><strong>（简称甲方）  </strong></td>
    </tr>
  <tr>
    <th height="40" align="left"><strong>出租方：  </strong>${equip.propertyName}</th>
    <td align="left"><strong>（简称乙方）</strong></td>
    </tr>
</table>
</p>

<p style="line-height:45px; font-size:16px; text-align:right;"><strong>合同编号：</strong><u>${contractLease.contractSerial}</u>&nbsp;&nbsp;&nbsp;&nbsp;</p>

 <p style="line-height:42px; font-size:16px; text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因甲方建筑工程施工需要，由乙方出租塔式起重暂定<u>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; </u>台（以现场实际安装数量计数，后续安装的塔吊同一型号的将自动形成合同，合同内容条款同本合同相同）。为明确双方的权利和义务，经甲、乙双方友好协商一致，现就租赁期内的有关事宜订立如下合同条款，双方共同遵守： </a></p>
 
 <p style="font-size:18px;line-height:52px; text-align:left;"><strong>第一条、租赁设备概况：</strong></p>
 <p>
 <table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="120" height="45" align="center">设备名称</td>
    <td width="200" align="center">生产厂家</td>
    <td width="100" align="center">型   号</td>
    <td align="center">最大工作<br />      
      幅度(米）<br /></td>
    <td align="center">独立高度<br />（米）<br /></td>
    <td align="center">最大起重量<br />（吨）</td>
  </tr>
  <tr>
    <td height="45" align="center">&nbsp;${equip.equipGenericName}</td>
    <td align="center">&nbsp;${equip.equipVender}</td>
    <td align="center">&nbsp;${equip.equipSpecificName}</td>
    <td align="center">&nbsp;${equip.workingRange}</td>
    <td align="center">&nbsp;${equip.independentHeight}</td>
    <td align="center">&nbsp;${equip.loadingWeight}</td>
  </tr>
  <tr>
    <td height="45" align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
</table>
 </p>
  <p style="font-size:18px;line-height:52px; text-align:left;"><strong>第二条、租赁设备费用的组成： </strong></p>
  <p>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td height="45" align="center">设备型号</td>
    <td align="center">数量(台）</td>
    <td align="center"><p>最大安装<br />
      高度(米)</p>
      <p></p></td>
    <td align="center">塔机月租<br />
      金费 (万元)<br /></td>
    <td align="center">进、退<br />
      场费(万元)<br /></td>
    <td align="center">基脚/预埋<br />
      螺栓(万元)</td>
  </tr>
  <tr>
    <td height="45">&nbsp;${equip.equipSpecificName}</td>
    <td>&nbsp;1</td>
    <td>&nbsp;${contractEquip.finalHeight}</td>
    <td>&nbsp;${contractEquip.rentStandard}</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="45">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
  </p>

<p style="font-size:18px;line-height:52px; text-align:left;"><strong>第三条、工程名称、租赁设备期限及确定起租日条件：</strong></p>
 
 <p style="line-height:42px; font-size:16px; text-align:left;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、工程名称：<u>       ${project.projectName}                  </u><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、租期暂定为<u> 6 </u>个月，少于<u>6</u>  个月，按 <u> 6</u>个月计算.期满，若甲方因工程需要继续使用该设备，乙方没有提出异议的，本合同继续有效，按实际使用时间计算租金。租期从乙方塔机主机进场安装、调试合格，交付甲方工地使用之日起（以甲、乙双方签字盖章的设备起用
</div>
<div class="PageNext"></div>

<div class="er_w100" id="page2" style="page-break-after:always">
<p style="line-height:34px; font-size:16px; text-align:left;">日期确认书为准）至甲方书面通知乙方拆除之日止。甲方签发的设备拆除（停用）通知书须经乙方代表人签收或加盖公章有效。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、塔机安装调试完毕，甲、乙双方配合进行自检，自检合格，甲、乙双方在自检报告上签字、盖章。同时，乙方将塔机交给甲方工地使用，甲方在塔机使用确认书上签字、盖章。双方未签塔机使用确认书，甲方不得使用塔机。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、从签自检报告、塔机使用确认书之日起三十个工作日内，为塔机申报检测正常工作日，在此期间，甲方可正常使用塔机，乙方按本条第一款之约定，计算租期，收取租金。 <br />
、塔机主机进场后，因甲方原因导致塔机不能及时安装，或者塔机安装调试合格，甲方暂时不使用塔机，甲方同意从乙方塔机主机进场之日起第十日为租期计算起始日，乙方开始计算租期，收取租金。 </p>

<p style="font-size:18px;line-height:52px; text-align:left;"><strong>第四条、租赁费、进退场费、预埋件/预埋螺栓的结算及付款方式：</strong></p>

<p style="line-height:34px; font-size:16px; text-align:left;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、塔吊月租赁费按月结算，每月20日为结算日期。乙方向甲方递交当月申请单，经甲方相关部门签字后返还给乙方。甲方相关部门签字手续应在一个工作日内完成，不能影响乙方每月上报公司工程量报表。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、本合同商定的设备机械进退场费、月租金标准均为含税价，采用人民币结算支付。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、进退场费支付：进场费随第一次租金支付，退场费、基脚/预埋螺栓随最后一次租金支付<br />
</p>

<p style="font-size:18px;line-height:40px; text-align:left;"><strong>第五条、甲、乙双方的工作：<br />（一）、甲方的工作内容：</strong></p>
<p style="line-height:34px; font-size:16px; text-align:left;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、合同签订后，甲方需至少提前10天书面通知乙方进场安装时间，若因甲方原因使塔机实际进场时间比预计进场时间延迟达10天以上，乙方有权终止本合同或在本合同预计的租用起始时间开始向甲方收取租赁费。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、应确保塔吊吊臂在正常使用中能360°回转，现场安装、加节、拆除二次倒运车辆由甲方提供并承担费用。确保塔机安装、拆卸时施工使用25吨吊车的作业空间。因甲方工地现场（含地面、空中）障碍，导致乙方安、拆施工使用25吨以上的吊车，所增加的吊车台班费由甲方承担。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、负责按乙方提供的图纸进行塔机基础的施工并承担费用，确保符合安装要求；保证现场条件满足设备进、退场和安、拆的要求，尤其要确保运输道路畅通及安拆区域内无障碍物。 </p>

</div>
<div class="PageNext"></div>

<div class="er_w100" id="page3" style="page-break-after:always">
<p style="line-height:32px; font-size:16px; text-align:left;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、负责提供塔机申报检测的相关资料，如基础隐蔽资料、工程概况、塔机使用备案表、塔机安装验收表等，因提供资料不及时，导致不能及时申报检测，其责任由甲方承担。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、负责租赁期间塔式起重机的防火、防盗、防损工作，若由于管理不善致使塔机遭受人为损坏或零部件丢失，甲方应承担全部损失费用。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6、免费提供乙方操作和维修人员住宿和用水用电，允许上述人员在食堂就餐，费用自理。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7、负责配合乙方的进退场、安拆工作，根据要求和塔吊说明书在规定范围内设置专用配电箱。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8、在塔机活动范围内设置明显的安全警示标志，对集中作业区做好安全防护；指定专职设备管理人员、专职安全生产管理人员进行现场监督检查。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9、租赁期间设备出现故障或者发生异常情况的，立即停止使用，消除故障和事故隐患后，方可投入使用。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10、甲方不得随意拆卸、调整塔吊的任何限位装置。否则，因此造成的所有事故及其损失责任全部由甲方承担。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11、如塔吊高度需要增加，应提前通知乙方，双方商定增加的费用；如需延长租赁时间，应提前一个月通知乙方。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12、塔机进场、安装、附着预埋、顶升加节或拆除，甲方应提前十天书面通知乙方，以便乙方作好准备工作；若没有及时通知乙方而造成工期的延误，责任由甲方承担。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13、由于塔吊司机是特种作业，从安全生产的角度考虑，每天工作时间不宜超过八小时。若需要增加塔吊司机，乙方应甲方要求增加配备持有操作证的司机进场，其工资、保险及福利等费用按每人每月元    包干由甲方支付。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14、甲方配备的所有操作人员必须按塔吊使用说明书和操作规程进行操作、指挥，合理调度。若因甲方人员操作、指挥不当造成设备损坏或安全事故由甲方承担责任并赔偿损失。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15、按合同约定及时支付乙方租赁费用。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16、在塔机安装、拆卸、升高加节、安装附着时，负责免费提供电焊机、氧气、乙炔等物资，供乙方施工作业使用。在塔机使用过程中，负责免费提供符合塔机运行要求的专用电源送到塔机下部（5米以内）专用电箱内，安装附墙时的工作平台由甲方负责搭建并承担其费用。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;17、负责配备塔机吊钩以下的吊具。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;18、合理安排塔机的使用，保证塔机每月有48小时的检修维护时间，以便保持设备的安全良好状态。其中白日检修期不得少于8小时，在检修期间租赁费正常收取，甲方不得随意扣减租金。 </p>
</div>
<div class="PageNext"></div>


<div class="er_w100" id="page4" style="page-break-after:always">
<p style="line-height:32px; font-size:16px; text-align:left;">
19、甲方负责提供塔机附着距离超过5.0米以外的附着拉杆并承担其费用。</p>

<p style="font-size:18px;line-height:52px; text-align:left;"><strong>（二）、乙方的工作内容：</strong></p>

<p style="line-height:31px; font-size:16px; text-align:left;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、合同签定后，乙方须在3日内将所有塔吊的基础技术参数以及使用说明书提供给甲方，以便甲方对基础进行承载力核算并施工。同时向甲方提供租赁设备的三证（生产许可证、出厂合格证、注册证）复印件（加盖红章）、“广东省建筑施工起重机械登记证”和“起重机械履历手册”，还要提供所有设备的检测报告和使用说明书一份。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、合同签定后，乙方应按甲方要求的时间、型号组织设备进场安装，在现场满足安装的条件下保证在接到甲方通知后10日内投入使用。否则，乙方承担因延迟进场安装给甲方造成的损失。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、乙方提供的设备必须状况良好、安全可靠，符合国家、行业相关标准，符合地方法规。塔吊的安、拆过程中乙方须有负责人在场指导和监督。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、乙方所提供的安拆资质能满足所租用设备安、拆过程中的所有工作，同时负责办理当地塔吊安装告知手续以及安装就位后的调试和检测工作。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、负责为每台塔吊配备<u>   </u>名合格操作司机（每人每天工作8小时，每天共16个小时）并承担所发生的一切费用。乙方人员必须服从甲方管理人员的合理指挥。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6、负责为现场所有乙方人员按政府规定购买相关保险，并承担费用。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7、乙方保证其雇员及车辆进入甲方工地，应遵守现场的一切保卫、安全的规定，尤其注意必须配戴好安全帽、不得穿拖鞋等。乙方车辆进、退场过程中发生的事故及其损失由乙方承担。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8、根据不同施工阶段、周围环境以及季节、气候的变化，对塔机采取相应的安全防护措施；制定塔机生产安全事故应急救援预案并报甲方审批和备案。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9、安装验收完毕后，一周内到安监站办理有相应资质的检测机构出具的检测报告书、设备使用登记等。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10、租赁期间应对塔机及其安全保护装置、吊具、索具等进行经常性和定期检查、维护和保养，并做好记录，并定期向甲方提供该记录。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11、乙方现场人员持有的相关证件必须是合法有效的。否则，所发生的一切后果均由乙方承担。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12、如租赁设备发生故障，乙方维修人员应及时到场，积极抢修，在最短时间内恢复正常。对有拖延时间，消极怠工的情况，甲方有权对其进行经济处罚，并保留向乙方索赔损失的权利。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13、负责塔机进场的运输、进场后的安装（具备相应安拆资质的单位和人员）、附墙、顶
</p>

</div>
<div class="PageNext"></div>


<div class="er_w100" id="page5" style="page-break-after:always">
<p style="line-height:34px; font-size:16px; text-align:left;">
升加节到最终高度、退场时拆卸及塔机运离工地现场的运输，并承担其费用。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14、塔机安装、拆卸前，应编制安装、拆卸方案。负责塔机检测资料的收集、整理、报送，做到塔机检测一次合格，并及时将特种设备检测部门的检测合格报告送交甲方配合办理使用备案手续（乙方承担检测费）。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15、负责租期内塔机的维修、配件供应并承担全部费用。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16、负责提供塔机预埋固定支腿、附墙拉杆（附着距离5.0米以内）、附着预埋件，并按甲方通知预埋日期要求送到工地，甲方配合处理塔机基础及附着预埋。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;17、塔机司机必须严格按照塔机操作规程安全操作塔机，制定塔机安全生产责任制，做好塔机的维护、保养、运行记录工作，并认真填写塔机维护、保养及运行检查记录。<br />
</p>
<p style="font-size:18px;line-height:40px; text-align:left;"><strong>第六条、安全责任：<br />（一）甲方责任：</strong></p>

<p style="line-height:34px; font-size:16px; text-align:left;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、严格遵守塔机使用“十不吊”作业规定，不得违章指挥，不得强行要求乙方司机超过塔机额定载荷量的物体进行起吊作业，因甲方违反塔机使用“十不吊”规定，违章指挥造成的安全事故责任，由甲方承担。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、严格按照塔机安全操作规程操作塔机，甲方承担所有因塔机操作不符合标准或任意调节各限位装置造成的事故责任及直接经济损失。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、甲方负有设备进场日起至设备退场日止乙方设备及部件、配件在甲方工地施工现场的看护和保护责任，因甲方工地现场管理不善等原因，造成设备部件、配件被盗丢失、损坏，甲方应按所丢失或损坏部件、配件当时的市场价格照价赔偿。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、甲方负责承担因基础制作不合格和塔机指挥不当等因塔机本身质量缺陷责任以外的所有安全事故责任及经济损失。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、甲方负责该工程项目塔机使用的日常安全管理工作，制定塔机使用安全管理制度，并指定专人负责监管塔机安全施工作业。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6、甲方不得故意损坏乙方的设备，否则承担相应的法律责任和经济责任。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7、甲方必须保证乙方在工地现场作业人员的人身安全，不得殴打乙方现场施工人员，甲方所属人员有前述行为，造成乙方施工人员人身伤害的，相应的民事责任、行政责任及刑事责任，由甲方及甲方当事人承担。受甲方监管的分包单位的工作人员殴打乙方现场施工人员，甲方必须及时阻止，如果由于甲方监管不严，造成乙方人员人身伤害的，甲方必须承担相应的民
</p>

</div>
<div class="PageNext"></div>

<div class="er_w100" id="page6" style="page-break-after:always">
<p style="line-height:34px; font-size:16px; text-align:left;">
事责任、行政责任及刑事责任。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8、在塔机活动范围内设置明显的安全警示标志，对集中作业区做好安全防护；指定专职设备管理人员、专职安全生产管理人员进行现场监督检查。
</p>

<p style="font-size:18px;line-height:50px; text-align:left;"><strong>（二）乙方责任：</strong></p>

<p style="line-height:32px; font-size:16px; text-align:left;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、负责承担因塔机本身质量缺陷，安装、附墙、顶升、拆除、调试隐患，维修保养隐患造成的事故责任及经济损失。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、乙方施工人员严格遵守施工现场规章制度、作业安全技术交底及操作规程、严禁酒后上班，反之则承担相应的损失。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、乙方提供的设备必须状况良好、安全可靠，符合国家、行业相关标准，符合地方法规。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、在塔机检修过程中，工人须穿戴安全防护用品作业，工人的所有工具须用绳子绑扎牢靠，避免掉落后发生安全事故。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、在甲方要求的时间内向甲方提供以下档案材料进行审批和报监理： <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）塔机安拆合同及安全协议书； <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）安装、拆除工程专项施工方案； <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3安拆安全施工技术交底； <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）安装单位资质证书、人员名单及相关操作证书复印件（加盖红章）； <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（5）安装、拆除安全事故应急救援预案，安拆时间等。 </p>

<p style="font-size:18px;line-height:50px; text-align:left;"><strong>第七条、安装和拆除时间</strong></p>

<p style="line-height:32px; font-size:16px; text-align:left;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、设备安装、调试、验收通过等与本合同有关的各项工作，具体时间以甲方书面通知为准。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、设备拆除、指定堆放、外运工作等与本合同有关的各项工作，具体时间以甲方书面通知为准。
</p>

<p style="font-size:18px;line-height:50px; text-align:left;"><strong>第八条 安全及文明操作</strong></p>
<p style="line-height:32px; font-size:16px; text-align:left;">

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、乙方必须教育自已的工人严格执行操作规程，做好安全防护措施，杜绝违章施工，对其操作人员做好符合“劳动保护法”所要求的防护用具配备和佩带；<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、垂直运输设备安装、拆除前乙方应对自己的操作人员进行安全和技术交底并做好相关记录，甲方有权随时进行检查；<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、甲方有权对乙方人员的违章行为给予经济处罚，乙方人员有权拒绝执行甲方人员的违<br />
</p>

</div>
<div class="PageNext"></div>


<div class="er_w100" id="page7" style="page-break-after:always">
<p style="line-height:34px; font-size:16px; text-align:left;">
章指示。在垂直运输设备安装、拆除期间乙方应指派一名全职安全负责人，配合甲方安全主任做好安装、拆除现场的安全工作。<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、垂直运输设备安装、拆除工作禁止在以下时间（18：00至次日8：00）内和大风、暴雨等恶劣自然条件下作业。
</p>

<p style="font-size:18px;line-height:50px; text-align:left;"><strong>第九条、环保要求：</strong></p>

<p style="line-height:34px; font-size:16px; text-align:left;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乙方在配合甲方施工期间，在设备的计划保养维修和日常保养维修过程中，对废料、费油集中回收排放，遵守甲方环保要求。
</p>

<p style="font-size:18px;line-height:50px; text-align:left;"><strong>第十条、其他约定事项：</strong></p>

<p style="line-height:32px; font-size:16px; text-align:left;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、若租赁期间因故停工，甲方应及时通知乙方。经双方协商，乙方同意设备进入停滞期，直到再次运转为止，停滞期的租赁费按合同价的70%收取。若故障累计达8小时，结算时扣减一天的租赁费，以此类推。每日22:00至次日8:00期间的故障停机不计入故障时间。法定节假日或非设备原因造成停机，租赁费照常收取。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、租期结束，乙方收到甲方报停通知单而甲方工程因场地障碍，造成延期拆塔退场，其延期期间租期租金照计。报停以后，没有乙方允许，甲方不得随意使用塔机，因此而造成的事故责任由甲方承担。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、甲方不按期支付租金，乙方有权停止塔机使用，停机期间租期租金照计。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、甲方工程完工拆塔之日，必须付清全部塔机租赁费。若甲方延期支付租赁费，按拖欠租赁费总额的日千分之三向乙方支付违约金。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、为了保证甲方工程按时使用塔机和乙方设备的合理利用，从本合同签订之日起，乙方保留塔机时间为一个月，超过一个月，乙方不保证按本合同约定的塔机品牌、型号提供塔机。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6、本合同价格为暂定价，最终以市场价为依据，按照双方签字确认的过程计算单为准。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>第十一条</strong>、设备所有权属乙方，甲方在按期支付租赁费的前提下，拥有设备使用权；任何情况下，甲方无权对设备进行抵押、转让或转租。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>第十二条</strong>、本合同在执行过程中发生纠纷，双方协商解决；协商不能达成一致时，任何一方均可申请深圳仲裁委员会仲裁。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>第十三</strong>、本合同未尽事宜经双方协商一致后，另立补充协议，与本合同具有同等法律效力。 <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>第十四、</strong>本合同经双方代表签字并加盖公章后生效。本合同一式贰份，甲方、乙方各执壹份。 
  </p>
</div>
<div class="PageNext"></div>

<div class="er_w100" id="page8" style="page-break-after:always">

<p  style="line-height:32px; font-size:16px; text-align:left;">（本页无正文）</p>
<br />
<br />
<br />
<br />
<br />
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="er_list">
  <tr>
    <td width="50%" height="120" align="left"><strong>甲方：</strong>${project.unCustomName}</td>
    <td align="left"><strong>乙方：</strong>${equip.propertyName}</td>
  </tr>
  <tr>
    <td height="120" align="left"><strong>代表人：</strong></td>
    <td align="left"><strong>代表人：</strong></td>
  </tr>
  <tr>
    <td height="120" align="left"><strong>日期：</strong></td>
    <td align="left"><strong>日期：</strong></td>
  </tr>
</table>



</div>




</div>
<div class="PageNext"></div>
</center>
</body>
</html>
