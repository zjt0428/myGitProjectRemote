<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>电梯租赁合同</title>
<link href="css/er_style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<center>
<div class="er_main_detail">
<div class="er_wrod_title">施 工 升 降 机 租 赁 合 同</div>
<div class="er_w100" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="180" height="30" align="left">&nbsp;</td>
    <td align="right" style=" font-family:'宋体'">合同编号： ${contractLease.contractSerial}</td>
  </tr>
</table>

 <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:18px;">
  <tr>
    <td height="36" align="left"><strong>承租方：</strong>${project.unCustomName}</td>
    <td width="150" align="left"><strong>(甲方) </strong></td>
  </tr>
  <tr>
    <td height="36" align="left"><strong>出租方：</strong>${equip.propertyName}</td>
    <td align="left"><strong>(乙方)</strong></td>
  </tr>
</table>

 <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
  <td class="er_hetong_td" align="left">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;甲、乙双方经过友好协商，决定由乙方出租<u>贰</u>台施工电梯给甲方在“ 深圳市南山区腾讯滨海大厦工程”项目使用，具体租赁条款如下： </p>

<p><strong>1、所出租施工电梯的基本情况： </strong></p>

<p>出租施工电梯型号:<br />
  1.1、${equip.equipSpecificName}型双笼施工电梯，额定载重量${equip.loadingWeight}T ，不带对重，提升速度：${equip.ratedLiftSpeed} m/min，附着后自由端高度：${equip.freedomHeight} m，电机功率：${equip.motorPower} KW。 <br /> <br />
  <strong>2、租期： </strong><br />
  2.1 所出租施工电梯租期： <br />
  A、${equip.equipSpecificName}型暂定为12个月，不足12个月按12个月计算，如超过12个月按实际使用天数计算。 <br />
  2.2租期计算：施工电梯安装调试正常运转，交付甲方使用之日起至甲方工程主体封顶后通知拆电梯之日止(如因甲方原因造成电梯安装完毕不能使用，则从安装完毕之日起第五天开始计算租期)。租期结束如因甲方工程障碍或租金未付清造成不能拆梯，拖延期间租金照计，由此造成的一切损失与乙方无关。 </p>

 <br />  <p><strong>3、租金：</strong> </p>
  
<p>3.1  月租金： <br />
    ${equip.equipSpecificName}型每台每月租金为 ${equipBrief.rentStandardTemp}万元整(￥ ${equipBrief.rentStandard}元整)； <br />
  <br /> <strong>4</strong><strong>、租金支付方式： </strong><br />
  4.1  每台施工电梯安装调试完毕验收合格并交付甲方使用之日起满30天，甲方五日内支付乙方当月租金，以后每月租金以此类推，直至所有租金付清为止。 <br />
  4.2  乙方凭发票收取租金。 <br />
  4.3  甲方以现金、转帐支票、电汇或银行汇票的方式支付租金，任何未经乙方书面同意的期票或银行承兑汇票用以支付上述款项，均被视为甲方拖欠租金行为。 </p>

  <br /> <p><strong>5、双方负责项目： </strong></p>

<p>5.1 基础及预埋件： <br />
  5.1.1甲方负责：制作塔机基础和附墙预埋，对基础和附墙预埋隐蔽施工部分做出详细书面记录。 <br />
  5.1.2乙方负责：提供基础预埋件、厂方基础图和乙方制作基础及附墙预埋时的技术指导工作及拉杆材料的供应。 <br />
  5.1.3 甲方负责找附墙的预埋点，负责打孔及其费用，承担预埋点不合格责任。 <br />
  5.2使用、维修、保养和配件更换： <br />
  5.2.1甲方负责：提供持证的合格电梯司机,提供施工电梯使用所需的专线电源及进电配电箱，送至电梯基础范围内并保证供电质量，（电压380V，正负不超过5%）保证塔机工作时不得突然停电（非甲方原因除外），维修时提供必要的民工配合(仅限地面工作)， <br />
  5.2.2  乙方负责：保证施工电梯24小时可以提供给工地使用，负责维修、保养和配件更换。 <br />
  5.2.3电梯出现故障而电梯司机不能处理时，甲方有权通知乙方派人到现场维修，乙方接到通知后应保证技术员及时赶到达现场。 <br />
  5.3 验收： <br />
  5.3.1甲方负责：提供使用单位应提供的必要资料，配合乙方施工电梯在当地主管部门的验收申报手续。 <br />
  5.3.2乙方负责：提供必要的技术资料供当地主管部门验收时使用并保证将电梯调试合格满足甲方验收一次性通过的需要，并承担验收费用。 <br />
  5.3.3在施工电梯安装调试完毕至当地主管部门验收发证之间有二十二个工作日，不影响电梯安全使用，甲方不得以此为理由拒付租金。但以双方签字的启用通知书的日期做计算租金的依据。 <br />
  5.4电梯司机： <br />
  5.4.1甲方负责：提供租期内电梯司机的工作和生活所需的住宿、生活用电用水及上述各项所需的费用。 <br />
  5.4.2乙方负责：每台电梯提供两名持证电梯司机并负责司机工资及保险。 <br />
  5.4.3电梯司机工作时间为二人每天合计不超过14小时，超出工作时间如甲方需使用塔机，电梯司机应无条件服从工地安排，甲方每月每人定额补贴300元（包干费用，保证随叫随到）。甲方随时有权要求乙方更换不符合工地要求的电梯司机。 <br />
  5.5安全责任： <br />
  5.5.1甲方责任：甲方承担因基础制作不合格和司机不当造成的事故责任和直接经济损失。 <br />
  5.5.2乙方责任：乙方承担因产品质量、操作、保养、维修不符合标准造成的事故责任及直接经济损失。 <br />
   <br /><strong>6</strong><strong>、进场时间约定及场地要求：</strong><br />
  6.1甲方电梯基础达到保养期后，凭甲方书面进场通知五天内进场。工程结束甲方提前十五天书面通知乙方退场。 <br />
  6.2进退场时保证汽车吊及平板车能正常出入。 <br />
  <br /> <strong>7</strong><strong>、违约责任：</strong> <br />
  7.1双方约定：每月因电梯故障停机时间累计不得超过48小时，否则甲方有权拒付超出时间的叁倍租金（按24小时/天计算及减去司机当天工资）。 <br />
  7.2乙方有权在甲方拖欠租金的情况下停止电梯使用，停机期间租金照计，由此造成的工程损失与乙方无关。 </p>

  <br /> <p><strong>8、其他约定事项： </strong></p>

<p>8.1 甲方在按时支付租金的前提下只拥有塔机的使用权，任何情况下，甲方无权转让、变卖、抵押扣押处置所出租的电梯。 <br />
  8.2处理分歧方式： <br />
  8.2.1双方以平等、友好的精神协商处理双方合作过程中的分歧。 <br />
  8.2.2如协商不成，可向当地法院提起诉讼。 <br />
  8.3本《合同》一式四份，甲乙双方各执两份，经双方公司盖章、代表签字后生效。
  
  </td>
  </tr>
</table>
<br />
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:30px; font-size:18px;">
  <tr>
    <td width="50%">甲方：<strong> ${project.unCustomName}</strong></td>
    <td>乙方：${equip.propertyName}</td>
  </tr>
  <tr>
    <td height="150" align="center">（盖章）</td>
    <td align="center">（盖章）</td>
  </tr>
  <tr>
    <td align="center">代表：<br />（签字）</td>
    <td align="center">代表：<br />（签字）</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td><p>合同签订时间：         年      月     日 </p></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

</div>


</div>
<div class="PageNext"></div>
</center>
</body>
</html>
