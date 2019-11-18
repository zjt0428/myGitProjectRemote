<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>设备维护保养合同</title>
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
<div class="er_wrod_title">设备维护保养合同</div>
<div class="er_w100" style="page-break-after:always">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="30" align="left">&nbsp;</td>
    <td align="left" style=" font-family:'宋体' " width="180" >合同编号：${contractLease.contractSerial}</td>
  </tr>
</table>

 <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:16px;">
  <tr>
    <td height="36" align="left"><p>甲方（使用单位）： ${project.unCustomName}</p></td>
    </tr>
  <tr>
    <td height="36" align="left"><p>乙方（安装单位）： ${equip.propertyName}</p></td>
    </tr>
  <tr>
    <td height="36" align="left"><p>甲方租赁施工设备： ${equip.equipGenericName}</p></td>
  </tr>
  <tr>
    <td height="36" align="left"><p>产权备案编号： ${equip.recordId}</p></td>
  </tr>
</table>

 <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
  <td class="er_hetong_td" align="left" style="line-height:32px;">
<p>
为了保障施工设备正常运行、确保施工安全，特签定本协议。<br />
<strong>一、	设备概况</strong><br />
1、施工内容：维修、保养<br />
2、设备名称：${equip.equipGenericName}<br />
3、安装地点：${project.projectName}<br />
4、项目名称：${project.address}<br />
工程甲方保证机械设备完好和符合安全生产的要求。<br />
二、	乙方确保为甲方的 施工升降机做好故障维修、保养、维护等服务;对维修保养工作过程中的安全负责。<br />
三、	甲方本项目使用的施工机械设备维修保养由乙方负责并承担相应的责任。<br />
<strong>维保单位：<br />
资质等级：<br />
证书编号：</strong><br />
四、	维修保养过程中，甲方有关人员应到现场监督确保安全作业，保证现场安全警戒的有效性，无关人员不准进入施工升降机维护保养现场。<br />
五、	乙方按要求对设备进行月保、定保作业，更换零配件费用由乙方承担（若甲方或甲方人员人为损坏设备或遗失零配件按厂价赔偿，并承担维保费用）。另外甲方需支付乙方月维保费用<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>元/月台。<br />
<strong>六、	维修保养标准及制度</strong><br />
1、	对设备进行月保养作业，保养内容和要求（附“建筑起重机械护保养记录表”单）<br />
1.1电气系统：检查各电气元件齐全、紧固情况；目测各元件损伤；检查各线路绝缘情况，开机试验项电器控制功能是否灵敏、可靠有效。<br />
1.2动力装置：检查电机运转情况；零部件齐全、紧固。<br />
1.3操纵系统：检查各零部件齐全、紧固情况；检查操纵灵活、可靠情况。<br />
1.4传动系统：检查各传动机构运行情况；各零部件齐全、紧固；各向导间隙是否符合要求。<br />
1.5安全装置：检查各限位、保护装置是否齐全；各装置是否灵敏可靠。<br />
1.6钢结构：检查标准节、附壁架、底架和吊笼；有否扭曲、变形、开裂；检查各紧固件有否松动、缺少；做好清洁防腐工作。<br />
1.7其他：按规定进行清洁、润滑工作。<br />
2、  对机械设备进行三个月一次的定期保养作业，保养内容和要求<br />
2.1进行月保作业全部工作<br />
2.2电气系统：全面检查各电器元件、线路布置情况；更换或修复老化、损伤、反应不灵敏元件。<br />
2.3动力装置：拆检电机传动机，检查电刷、轴承；易损件，不合格需更换；检查绕线组导电情况。<br />
2.4操纵系统：拆检各零部件易损情况；检查操纵是否灵活、可靠。<br />
2.5传动系统：拆检各齿轮箱、导向轮、制动器进行清洗、润滑；修复或更换不合格易损件和磨损件。<br />
2.6安全装置：拆检调整各限位安全保护装置；检查零部件是否齐、动件是否灵活可靠；限速器按规定送有关部门鉴定，并有证书。<br />
2.7钢结构：检查钢结构是否变形、开裂、齿条磨损情况；不符合要求，不能修复则需报废；检查各紧固件齐全、松动情况；全面做好防锈、防腐工作。<br />
七、维修保养完毕后，需检查电源，试运转，检查各种安全装置无安全隐患后方可使用，并填写“建筑起重机械护保养记录表” 。<br />
八、	若甲方指挥调度不当或强行违章作业造成的事故由甲方负责。<br />
九、	本协议双方单位公章签字生效。双方各执一份。<br />
</p>

</td>
  </tr>
</table>
<br />
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:30px; font-size:18px;">
  <tr>
    <td width="50%" height="60" align="left">甲  方：（公章）${project.unCustomName}</td>
    <td align="left"> 乙  方：（公章） </td>
  </tr>
  <tr>
    <td height="60" align="left">经办人：</td>
    <td align="left">经办人：</td>
  </tr>
  <tr>
    <td height="60" align="left">日期：</td>
    <td align="left"><p> 日期：</p></td>
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
