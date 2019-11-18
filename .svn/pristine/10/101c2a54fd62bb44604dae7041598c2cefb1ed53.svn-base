<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<%
    String basePath=request.getContextPath();
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>资料信息</title>
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_word.css" />
<style media="print">
.Noprint {
	display: none;
	
}
.PageNext {
	page-break-after: always;
}
</style>
</head>
<body>
<center class="Noprint">
	<p align="right" class="mar_15">
        <input type="button" style="font-size: 12px" value="直接打印" onClick="LODOP.PRINT()"/>
        <input type="button" style="font-size: 12px" value="打印预览" onClick="LODOP.PREVIEW()"/>
	</p>
</center>
<center>
<table width="500" border="0" cellspacing="0" cellpadding="0"  class="wrod_title">

  <tr><td colspan="2" align="center" style="padding-top:50px; font-size:32px; font-family:'黑体';">${equipDiary.propertyName}</td>
  <tr><td colspan="2" style="padding-top:10px; font-size:32px; font-family:'黑体'; line-height:48px;" align="center">建筑起重机械技术管理档案</td>
  </tr>
  </tr>
  <tr><td colspan="2"  style="font-size:32px; font-family:'黑体'; line-height:48px;" align="center">【一机一档】</td></tr>
  <tr><td colspan="2" height="50">&nbsp;</td></tr> 
  </table>
<table width="500" border="0" cellspacing="0" cellpadding="0"  class="wrod_title">
  <tr>
    <td width="120" height="0" align="right"><div style="margin-top:20px; font-weight:bold;">项目名称</div></td>
    <td align="left" class="botton_line">${equipDiary.projectName}</td>
  </tr>
  <tr>
    <td align="right"><div style="margin-top:20px; font-weight:bold;">设备名称</div></td>
    <td align="left" class="botton_line"><div style="margin-top:20px;">${equipDiary.equipGenericName}</div></td>
  </tr>
  <tr>
    <td align="right"><div style="margin-top:20px;font-weight:bold;">备案编号</div></td>
    <td align="left" class="botton_line"><div style="margin-top:20px;">${equipDiary.recordId}</div></td>
  </tr>
  <tr>
    <td align="right"><div style="margin-top:20px;font-weight:bold;">出厂编号</div></td>
    <td align="left" class="botton_line"><div style="margin-top:20px;">${equipDiary.exwSerial}</div></td>
  </tr>
  <tr>
    <td align="right"><div style="margin-top:20px;font-weight:bold;">规格型号</div></td>
    <td align="left" class="botton_line"><div style="margin-top:20px;">${equipDiary.equipSpecificName}</div></td>
  </tr>
  <tr>
    <td align="right"><div style="margin-top:20px;font-weight:bold;">出厂日期</div></td>
    <td align="left" class="botton_line"><div style="margin-top:20px;">${equipDiary.exwDate}</div></td>
  </tr>
  <tr>
    <td align="right"><div style="margin-top:20px;font-weight:bold;">制造厂家</div></td>
    <td align="left" class="botton_line"><div style="margin-top:20px;">${equipDiary.equipVender}</div></td>
  </tr>
  <tr>
    <td align="right">&nbsp;</td>
    <td align="center" class="botton_line"><div style="margin-top:20px;">${currentDate}</div></td>
  </tr>
</table>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
<c:if test="${InstallIndisPrecheck}">
<c:forEach var="indisPrecheck" items="${installIndisPrechecks}" >
<center>
<div class="main_detail">
  <div class="wrod_title">塔式起重机/施工升降机安装前检查表</div>
  <p>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="75" height="32" align="center">产权单位</td>
    <td width="140">${indisPrecheck.equipment.propertyName}</td>
    <td align="center" width="90">备案登记号</td>
    <td colspan="2" width="150">${indisPrecheck.equipment.recordId}</td>
    <td width="50"><p align="center">工程<br />项目</td>
    <td width="120">${indisPrecheck.project.projectName}</td>
  </tr>
  <tr>
    <td height="32" align="center">生产厂家</td>
    <td>${indisPrecheck.equipment.equipVender}</td>
    <td align="center">规格型号</td>
    <td width="100">${indisPrecheck.equipment.equipSpecificName}</td>
    <td  align="center" width="50">安装<br />单位</td>
    <td colspan="2">${indisPrecheck.inEntName}</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td width="10%" align="center" height="32">序号</td>
    <td width="20%" align="center">项 目</td>
    <td align="center">检 查 要 求</td>
    <td width="20%" align="center">检查记录</td>
  </tr>
  <c:forEach var="element" items="${indisPrecheck.verifyStandardSet}" varStatus="status" >
  <tr>
    <td align="center" height="32">${status.count}</td>
    <td align="center">${element.itemName}</td>
    <td>${element.demandDes}</td>
    <td>${element.standardResult}</td>
  </tr>
  </c:forEach>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td width="150" rowspan="2" align="center">安装单位人员</td>
    <td style="padding:20px 10px;">现场安装负责人（签字）：</td>
    <td width="240" style="border-left-style:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
  <tr>
    <td style="padding:20px 10px;">检查人员（签字）：</td>
    <td style="border-left-style:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td style="padding:20pt 0;"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td colspan="4">检查结论:</td>
        </tr>
      <tr>
        <td width="300">安装单位技术负责人（签字）：</td>
        <td>&nbsp;</td>
        <td width="100">（盖章）</td>
        <td width="240">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
      </tr>
    </table></td>
  </tr>
</table>
</p>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${InstallIndisBasecheck}">
<c:forEach var="indisBasecheck" items="${installIndisBasechecks}" >
<center>
<div class="main_detail">
  <div class="wrod_title">建筑起重机械基础验收表</div>
  <p>
  <table width="640" border="0" cellspacing="0" cellpadding="0" style="font-size:14px">
  <tr>
    <td width="80" height="42" align="right"><div style="margin-top:20px;">工程名称：</div></td>
    <td width="140" style="border-bottom:1px solid #000000;">${indisBasecheck.project.projectName}<br></td>
    <td width="80" align="right" ><div style="margin-top:20px;">设备名称：</div></td>
    <td width="140" style="border-bottom:1px solid #000000;"><div style="margin-top:20px;">${indisBasecheck.equipment.equipGenericName}</div></td>
    <td width="80" align="right"><div style="margin-top:20px;">型号规格：</div></td>
    <td width="120" style="border-bottom:1px solid #000000;"><div style="margin-top:20px;">${indisBasecheck.equipment.equipSpecificName}</div></td>
  </tr>
  <tr>
    <td height="42" align="right"><div style="margin-top:20px;">安装单位：</div></td>
    <td style="border-bottom:1px solid #000000;"><div style="margin-top:20px;">${indisBasecheck.inEntName}</div></td>
    <td align="right"><div style="margin-top:20px;">使用单位：</div></td>
    <td style="border-bottom:1px solid #000000;">${indisBasecheck.emEntName}</td>
    <td align="right"><div style="margin-top:20px;">项目经理：</div></td>
    <td style="border-bottom:1px solid #000000;"><div style="margin-top:20px;">${indisBasecheck.managerProject}</div></td>
  </tr>
</table></p><br />
  <p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="jctable">
  <tr>
    <td align="center" width="6%">序号</td>
    <td align="center" width="15%">内   容</td>
    <td align="center" width="45%">要 求 标 准</td>
    <td align="center" width="10%">实   测</td>
    <td align="center">备  注</td>
  </tr>
  <c:forEach var="element" items="${indisBasecheck.verifyStandardSet}" varStatus="status" >
  <tr>
    <td align="center">${status.count}</td>
    <td align="left">${element.itemName}</td>
    <td align="left">${element.demandDes}</td>
    <td align="left">${element.standardResult}</td>
    <td align="left">${element.remark}</td>
  </tr>
  </c:forEach>
  <tr>
    <td align="center">验<br />收<br />意<br />见</td>
    <td colspan="4" align="right" valign="bottom">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
  <tr>
    <td align="center" style="padding:10pt 0;">验<br />收<br />人</td>
    <td colspan="4">项目部技术负责人（签字）： <br />
      建机一体化企业（安装单位）技术负责人（签字）： <br />
      其他参验人员（签字）：</td>
    </tr>
  <tr>
    <td align="center">备<br />注</td>
    <td colspan="4">基础验收时应附以下资料：<br />
      1、设备平面布置图；<br />
      2、基础桩基设计图；<br />
      3、基础承台设计图；<br />
      4、基础承台混凝土强度试验报告；<br />
      5、基础土壤承载力资料及计算书。</td>
    </tr>
</table>
</p>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${EquipmentInstall}">
<center> 
<div class="main_detail">
  <div class="wrod_title">建筑起重机械安装告知表</div>
 <table border="0" width="630">
		<tbody><tr>
			<td class="tdh">__________________建设局：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>福建永诚机械设备有限公司</u>
				单位（&nbsp;安装资质证书号：<u>B3174035040301</u>，资质等级：<u>三级</u>&nbsp;&nbsp;），拟定于 <u>&nbsp;<fmt:formatDate value="${equipInstall.startinDate}" type="date"/>&nbsp;</u>至
				<u>&nbsp;<fmt:formatDate value="${equipInstall.endinDate}" type="date"/>&nbsp;</u>，在本市（县）&nbsp;<u>${equipInstall.equipFlow.equipDiary.countyName} </u>&nbsp;区（乡、镇）&nbsp;<u>${equipInstall.equipFlow.equipDiary.projectName}</u>&nbsp;工程（工地），<input type="checkbox" checked="checked" disabled="disabled"/>
				安装 / <input type="checkbox" disabled="disabled"/>拆卸下列建筑起重设备（表一），现告知贵局，请予以监督，并提供经施工总承包单位、监理单位审核合格的以下资料（表二）：
			</td>
		</tr>
	</tbody></table>
	<font style="font-weight: bold; font-size: 14px">表一：拟安装（拆卸）建筑起重机清单</font><br>
	<table class="listtable" width="640" border="0" align="center" cellpadding="0" cellspacing="0">
		<tbody><tr>
			<th class="tdp">设备名称</th>
			<th class="tdp">规格型号</th>
			<th class="tdp">备案证号</th>
			<th class="tdp">本次安装高度(m)</th>
			<th class="tdp">安装现场负责人</th>
			<th class="tdp">联系电话</th>
		</tr>
		<tr height="25px">
			<td class="tdp" align="center">${equipInstall.equipFlow.equipDiary.equipGenericName}</td>
			<td class="tdp" align="center">${equipInstall.equipFlow.equipDiary.equipSpecificName}</td>
			<td class="tdp" align="center">${equipInstall.equipFlow.equipDiary.recordId}</td>
			<td class="tdp" align="center">${equipInstall.installHeight}</td>
			<td class="tdp" align="center">${equipInstall.principal}</td>
			<td class="tdp" align="center">${equipInstall.principalTel}</td>
		</tr>
	</tbody></table><br>
	<font style="font-weight: bold; font-size: 14px">表二：总承包单位、监理单位审核资料及审核意见</font><br>
	<table class="listtable" width="630" border="0" align="center" cellpadding="0" cellspacing="0">
		<tbody><tr>
			<th class="tdp" width="70%">审核资料</th>
			<th class="tdp">审核意见</th>
		</tr>
		<tr>
			<td class="tdp" rowspan="2" align="left" valign="top">
				<div style="margin-left: 10px; margin-right: 10px; line-height: 28px">
				    <input type="checkbox" name="checkbox" value="checkbox" /> 建筑起重机械备案证<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位资质证书、安装生产许可证副本<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位特种作业人员证书<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 经安拆单位技术负责人审核签字的建筑起重机械安装（拆卸）工程专项施工方案<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位与使用单位签订的安装（拆卸）合同及安全协议书<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位负责建筑起重机械安装（拆卸）工程的专职安全生产管理人员专业技术人员名单<br> 
					<input type="checkbox" name="checkbox" value="checkbox" />建筑起重机械安装（拆卸）工程生产安全事故应急救援方案<br> 
					<input type="checkbox" name="checkbox" value="checkbox" />辅助建筑起重机械资料及特种作业人员证书<br>
			  </div>
			</td>
			<td class="tdp" align="left">&nbsp;施工总承包单位审核意见：
				<div style="margin-top: 140px;" valign="bottom" align="right">
					<p style="margin-right: 50px">(盖章)</p>
					<p>年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;</p>
				</div>
			</td>
		</tr>
		<tr>
			<td class="tdp" align="left">&nbsp;监理单位审核意见：
				<div style="margin-top: 140px;" valign="bottom" align="right">
					<p style="margin-right: 50px">(盖章)</p>
					<p>年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;</p>
				</div>
			</td>
		</tr>
	</tbody></table>
	<table border="0" width="630">
		<tbody><tr>
			<td class="tdh" colspan="3">说明:本表由告知单位填写,一式二份（告知单位、登记机构各一份）</td>
		</tr>
		<tr>
			<td class="tdh" width="40%" height="30">告知单位（盖章）:</td>
			<td class="tdh" width="40%">登记机构接收人:</td>
			<td class="tdh" align="right">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;</td>
		</tr>
	</tbody>
	</table>
	</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:if>
<c:if test="${InstallSecureProtocol}">
<c:forEach var="secureProtocol" items="${installSecureProtocols}" >
<center>
<DIV class="main_detail">
<p style="font-size:32px;text-align:center; padding-top:10px; font-weight:bold;">安 全 协 议</p>
<p style="font-size:16px;text-align:right; padding-top:15px; padding-right:15px;">合同编号:<strong>&nbsp;&nbsp;${secureProtocol.protocolSerial}</strong></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px; font-size:14px;">
  <tr>
    <td class="indt2">总承包单位（简称甲方）：<u><strong>&nbsp;&nbsp;${secureProtocol.emEntName}&nbsp;&nbsp;</strong></u></td>
    </tr>
  <tr>
    <td class="indt2">机械设备安装单位（简称乙方）：<u><strong>&nbsp;${secureProtocol.inEntName}&nbsp;&nbsp;</strong></u></td>
    </tr>
  <tr>
    <td class="indt2">安装/拆卸单位安装资质证书号<u><strong>：&nbsp;${secureProtocol.inEntCertNum}&nbsp;&nbsp;</strong></u>&nbsp;&nbsp;资质等级:<u><strong>&nbsp;&nbsp;${secureProtocol.inEntTitleLevel}&nbsp;&nbsp;</strong></u></td>
    </tr>
</table>
</p>
<p class="indt2" style="font-size:14px;">依照《中华人民共和国合同法》及相关法律、法规和《建筑起重机械安全监督管理规定》(原建设部令第166号)的规定，遵循平等、自愿、公平和诚实信用的原则，双方协商就建筑起重机械的安装/拆卸（以下简称安拆）相关事宜达成协议如下：</p>
<p><strong>第一条  项目名称、机械安装地点和安装高度</strong></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px; font-size:14px;">
  <tr>
    <td class="indt2">项目名称：<u><strong>&nbsp;&nbsp;${secureProtocol.project.projectName}&nbsp;&nbsp;</strong></u></td>
  </tr>
    <tr>
    <td class="indt2">机械安装地点：<u><strong>&nbsp;&nbsp;${secureProtocol.project.address}&nbsp;&nbsp;</strong></u></td>
  </tr>
  <tr>
  <td class="indt2">安装高度：初次安装高度<u><strong>&nbsp;&nbsp;${secureProtocol.finalHeight}&nbsp;&nbsp;</strong></u>米，最终安装高度<u><strong>&nbsp;&nbsp;${secureProtocol.finalHeight}&nbsp;&nbsp;</strong></u>米。附墙按规范附着 。</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px;">
  <tr>
    <td><p><strong>第二条&nbsp;&nbsp;双方权利义务 </strong><br /></p> 
     <p> 一、甲方权利义务 <br /></p> 
      <p class="indt2">1.甲方负责组织有关人员会同乙方研究确定机械设备的安装位置等工作，并要及时做好记录。</p> 
      <p class="indt2">2.负责机械设备基础的设计与施工（含承台、桩基），并组织机械设备基础验收。 </p>
      <p class="indt2">3.负责机械设备基础预埋件和接地装置的埋设，负责基础的日常维护和检查工作。 </p>
      <p class="indt2">4.负责提供的机械设备基础内业技术资料包括：机械设备基础设计图、验收合格相关资料、基础砼试块报告、钢筋、预埋件隐蔽部分验收记录等。</p>
      <p class="indt2">5.机械设备安装前，负责为机械设备提供足够的电源（380V±5%）。负责提供由配电箱（房）至机械设备基础处的专用开关箱与电源线，电源线应采用“三相五线”制，专用开关箱内应符合“一机一闸一漏一箱  ”。 </p>
      <p class="indt2">6.机械设备安装完毕，委托检测单位进行检测；检测合格后， 组织出租、安装、监理等有关单位进行验收；验收合格后方可投入使用，未经验收或者验收不合格的不得使用。 </p>
      <p class="indt2">7.机械设备使用过程中，若需顶升附着，应提前<u>七</u>日通知乙方，以便乙方统筹安排；附着铁件预埋后，应派架子工在预埋铁件相应高度处搭设附着安装人员操作防护平台。附着后要组织验收，验收合格后才能使用。</p> 
      <p class="indt2">8.机械设备进场安装前，负责做好进场道路压实，作业场地的平整，周边障碍物（含外架）的清除等工作。</p> 
      <p>二、乙方权利义务</p>
      <p class="indt2">1.积极配合甲方做好机械设备安装位置的确定和基础预埋的技术指导，并参与基础验收工作。</p>
      <p class="indt2">2.负责根据工程及机械设备情况编制安装专项施工方案，经本单位技术负责人审批签字，报施工及监理单位审核并告知当地机械设备备案机关后方可进行作业。</p> 
      <p class="indt2">3.负责组织人员进行机械设备的进场安装、顶升加节、附着锚固等工作，并在双方约定的时间内完成。 </p>
      <p class="indt2">4.负责提供安装作业所需的辅助起重设备以及吊具、索具等器械。</p> 
      <p class="indt2">5.机械设备需要附着时，附着装置应采用原制造厂家提供的产品，附着杆根据工程结构情况，若需改造加工，由乙方按规范要求设计、制作，并由原制造厂家确认或经本单位技术负责人审核、专家认证后方可安装。制作材料须提供质保书，发生的费用按合同约定。 </p>
      <p class="indt2">6.机械设备安装完毕，负责按照安全技术标准及使用说明书的有关要求对机械设备进行自检、调试和试运转。 </p>
      <p class="indt2">7.负责提供的内业技术资料包括：相应安装资质、安全生产许可证、安装管理人员证书、安装作业人员上岗证、安装专项施工方案、顶升加节、附着锚固专项施工方案、自检合格报告、安装安全技术交底记录等。</p> 
      <p><strong>第三条&nbsp;&nbsp;双方安全责任 </strong></p>
      <p> 一、甲方安全责任 </p>
      <p class="indt2">1．甲方应向乙方提供确保建筑起重机械设备进场安装所需的施工条件，并设置安全警戒区。</p> 
      <p class="indt2">2．甲方应跟据不同施工阶段、周围环境以及季节、气候的变化，对建筑起重机械采取相应的安全防护措施。 </p>
      <p class="indt2">3．甲方应指定专职机械设备管理人员、专职安全员进行现场监督检查。 </p>
      <p> 二、乙方安全责任 </p>
      <p class="indt2">1.乙方组织的安装作业人员须持证上岗并按规定穿戴好安全防护用品，严格遵守安装程序和安全操作规程，严格按照经审批的安装专项施工方案进行作业。</p> 
      <p class="indt2">2.乙方组织机械设备安装、顶升加节、附着锚固作业必须在白天或照明良好的夜间进行，不得在大风（12m/s以上）、浓雾和雨雪天气进行作业。</p> 
      <p class="indt2">3.乙方在安装前应对吊具索具以及机械设备各部件进行检查，同时对辅助起重设备进行检查，确认正常后方可开始安装。 </p>
      <p class="indt2">4.乙方每次作业前，须对参与作业人员进行安全技术交底并签字确认。在作业条件符合要求的前提下，乙方对机械设备安装、顶升加节、附着锚固等作业过程的安全生产负责。</p>
       <p><strong>第四条&nbsp;&nbsp;争议解决 </strong></p>
      <p class="indt2">本协议项下发生的争议，由双方协商解决，也可由行业主管部门调解，协商或者调解不成的，按下列第<u>&nbsp;1&nbsp;</u>种方式解决。 </p>
      <p class="indt2">1．向武夷山市人民法院提起诉讼；</p>
      <p class="indt2">2．向武夷山市仲裁委员会申请仲裁。</p> 
      <p> <strong>第五条&nbsp;&nbsp;其他条款 </strong></p>
      <p class="indt2">1．本协议自双方签字并盖章之日起生效。本合同一式叁份，具有同等法律效力，其中甲方壹份，乙方壹份、建设局壹份。</p> 
      <p class="indt2">2．本协义附件以及合同履行过程中形成的各种书面文件，经双方签署确认后为本合同的组成部分，与本协义具有同等法律效力。 </p>
      <p class="indt2">3．本协义未尽事宜，双方可协商签订补充协议，补充协议与本协义具有同等法律效力。 </p>
      <p class="indt2">4．协义签订地：<u>&nbsp;&nbsp;<strong>福建省武夷山市天和街18-20号 </strong>&nbsp;&nbsp;</u></p>
      <p class="indt2">5．其他约定：机械设备需安装、加节、附着甲方必须通知乙方并核对人员（在安装告知资料中的人员）到位安装操作，若不是乙方人员操作，出现任何问题均与乙方无关。 </p></td>
  </tr>
</table>
<br />

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px; font-size:14px;">
  <tr>
    <td width="50%">总承包单位：（盖章 ） </td>
    <td>安装单位：（盖章） </td>
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
    <td>年  月   日 : </td>
    <td>年  月   日 : </td>
  </tr>
</table>
</p>
</DIV>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${InstallIndisProtocol}">
<c:forEach var="indisProtocol" items="${installIndisProtocols}" >
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
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${InstallApproveIndisSchema}">
<c:forEach var="indisSchema" items="${installIndisSchemas}" >
<center>
<div class="main_detail">
  <div class="fsong_title"><strong>施工组织设计安装方案审批表</strong></div>
  <p>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spbtable">
  <tr>
    <td colspan="2" align="center" width="120" >工 程 名 称</td>
    <td>${indisSchema.project.projectName}</td>
  </tr>
  <tr>
    <td colspan="2" align="center">安 装 单 位</td>
    <td>${indisSchema.inEntName}</td>
  </tr>
  <tr>
    <td colspan="2" align="center">施 工 单 位</td>
    <td>${indisSchema.emEntName}</td>
  </tr>
  <tr>
    <td width="60" rowspan="2" align="center">编制<br />
      人员</td>
    <td align="center" width="60">主持</td>
    <td>${indisSchema.schemaDesigner}</td>
  </tr>
  <tr>
    <td align="center">参加</td>
    <td>${indisSchema.technicalDirector}&nbsp;&nbsp;${indisSchema.secureDirector}</td>
  </tr>
  <tr>
    <td colspan="2" align="center" style="padding:5pt 0;">安全技术措施<br />
      专项方案类别</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan="2" align="center" style="padding:10pt 0;">安   装<br />
      单   位<br />
      审   核<br />
      意   见</td>
    <td>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="spbtable_none">
	  <tr>
		<td width="50%">企业技术负责人签字：</td>
		<td align="center"> 单位：（公章）</td>
	  </tr>
	  <tr>
		<td>年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
		<td>&nbsp;</td>
	  </tr>
	</table>
</td>
  </tr>
  <tr>
    <td colspan="2" align="center" style="padding:10pt 0;">施   工<br />
      单   位<br />
      审   核<br />
      意   见</td>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0" class="spbtable_none">
      <tr>
        <td width="50%">企业技术负责人签字：</td>
        <td align="center"> 单位：（公章）</td>
      </tr>
      <tr>
        <td>年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan="2" align="center" style="padding:10pt 0;">监   理<br />
      单   位<br />
      审   查<br />
      意   见</td>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0" class="spbtable_none">
      <tr>
        <td width="50%">总监理工程师签字：</td>
        <td align="center"> 单位：（公章）</td>
      </tr>
      <tr>
        <td>年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>
</p>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${InstallSpecialIndisSchema}">
<c:forEach var="indisSchema" items="${installIndisSchemas}" >
<center>
<div class="main_detail">
  <div class="fsong_title"><strong>施工升降机（塔机）安装专项施工方案</strong></div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="zxsgtable">
      <tr>
        <td width="120" align="center">设备型号</td>
        <td colspan="3">${indisSchema.equipment.equipSpecificName}</td>
      </tr>
      <tr>
        <td align="center">出厂编号</td>
        <td>${indisSchema.equipment.exwSerial}</td>
        <td align="center" width="100">备案证号</td>
        <td width="200">${indisSchema.equipment.recordId}</td>
      </tr>
      <tr>
        <td align="center">产权单位</td>
        <td colspan="3">${indisSchema.equipment.propertyName}</td>
      </tr>
      <tr>
        <td align="center">生产厂家</td>
        <td colspan="3">${indisSchema.equipment.equipVender}</td>
      </tr>
      <tr>
        <td align="center">安装单位</td>
        <td colspan="3">${indisSchema.inEntName}</td>
      </tr>
      <tr>
        <td align="center">使用单位</td>
        <td colspan="3">${indisSchema.emEntName}</td>
      </tr>
      <tr>
        <td align="center">项目名称</td>
        <td colspan="3">${indisSchema.project.projectName}</td>
      </tr>
      <tr>
        <td align="center">技术负责</td>
        <td colspan="3">${indisSchema.technicalDirector}</td>
      </tr>
      <tr>
        <td align="center">安全负责</td>
        <td colspan="3">${indisSchema.secureDirector}</td>
      </tr>
      <tr>
        <td align="center">方案编制</td>
        <td colspan="3">${indisSchema.schemaDesigner}</td>
      </tr>
    </table>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${InstallSchemaIndisSchema}">
<c:forEach var="indisSchema" items="${installIndisSchemas}" >
<c:if test="${indisSchema.equipment.equipGeneric == 'T'}">
<center>
<div class="main_detail">
  <div class="tj_title">塔机安装施工方案</div>
  <div class="tj_detail">
    <p><strong>一、概况</strong> </p>
    <p class="indt2">根据<u>&nbsp;&nbsp;${indisSchema.project.projectName}&nbsp;&nbsp;</u>施工的需要，拟在<u>&nbsp;&nbsp;${indisSchema.project.address}&nbsp;&nbsp;</u>工程工地，安装1台<u>&nbsp;&nbsp;${indisSchema.equipment.equipSpecificName}&nbsp;&nbsp;</u>型塔吊。建筑总高<u>&nbsp;&nbsp;${indisSchema.overallHeight}&nbsp;&nbsp;</u>米，塔吊需安装总高度为<u>&nbsp;&nbsp;${indisSchema.finalHeight}&nbsp;&nbsp;</u>米。</p>
      <p><strong>二、安装时间、人员</strong> </p>
      <p class="indt2">1、时间：<u>&nbsp;&nbsp;&nbsp;${indisSchema.providedDate}&nbsp;&nbsp;&nbsp;</u> </p>
      <p class="indt2">2、安装人员:<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></p>
    <p class="indt2">3、安全员：<u>&nbsp;&nbsp;${indisSchema.secureDirector}&nbsp;&nbsp;</u> </p>
    <p align="left"><strong>三、塔吊概述 </strong></p>
      <p class="indt2">3.1该型号塔吊采用的是一种上回转水平臂架牵引小车变幅自升塔式起重机，其最大工作臂长56米，最大起重量6000 kg。</p>
      <p class="indt2">3.2 该塔吊的起升机构采用远极比三速电机驱动，最大起升速度为80m/min，最低速度小于4.2m/min,从而实现了轻载高速、重载低速和理想的空钩速度及慢就为速度，大大提高了工作效率。回转机构采用涡流调速、直流制动的力矩电动机，具有较大的过载能力及重载下启动的优良性能。使塔机起、制动更平稳，操作更安全可靠。</p>
      <p class="indt2">3.3 塔机的升高加节，采用液压顶升，使起升高度能随着施工建筑物的升高而加高，而塔吊的起重性能在各种高度下仍保持不变。司机室安装在上转台，视野开阔，操作舒适方便。 </p>
      <p class="indt2">3.4 该塔吊设有各种安全保护装置，包括：起重力矩限制器，最大起升重量限制器，起升高度限制器，回转限制器和变幅限制器等，从而保证了塔机安全可靠的运行。</p>

  <p align="left"><strong>四、塔机安装 </strong></p>
  <p><strong>4.1安装准备工作</strong> </p>
  <p class="indt2">4.1.1了解施工现场布局和土质情况，清理现场的障碍物。 </p>
    <p class="indt2">4.1.2根据建筑物的布置决定塔机基础相对于建筑物的位置，然后按混凝土基础图上所规定的技术要求进行施工。 </p>
    <p class="indt2">4.1.3配备吊装机械，需16t的汽车吊，其起升高度不低于23m的起重机械。购买小底架的用户。汽车吊起升高度应不低于18m。 </p>
    <p class="indt2">4.1.4准备辅助吊装设备、枕木、木楔以及足够的铁丝、索具、绳扣等常用工具。 </p>
    <p class="indt2">4.1.5混凝土基础必须预先浇好，而且要过10天以上才能安装。 </p>
    <p class="indt2">4.1.6电压配置应合理、安全、方便、不得与安装场地相距过远。 </p>
<p><strong>4.2安装要求注意事项 </strong></p>
    <p class="indt2">4.2.1起重机的安装应严格按本说明书所规定的顺序和要求进行。 </p>
    <p class="indt2">4.2.2在安装过程中，作业人员应佩带安全帽和安全带。 </p>
    <p class="indt2">4.2.3在安装过程中,各连接销必须涂黄油后进行安装,装好后的连接销轴孔开口销必须张开,轴端卡板必须紧固,连接螺栓必须拧紧。 </p>
    <p class="indt2">4.2.4本机各部件之间的连接销轴,紧固,连接螺栓必须使用生产厂随机专用件,不得随意自行代用。 </p>
    <p class="indt2">4.2.5本机的电气操作部分,必须严格按线路图执行,不得任意更改。 </p>
    <p class="indt2">4.2.6大底架安装后用户必须加上压重。 </p>
<p><strong>4.3安装程序 </strong></p>
 <p class="indt2">4.3.1安装底架(节)</p>
 <p class="indt2">4.3.1.1 独立式基础节的安装 </p>
<p class="indt2">将四个独立主弦杆组件与一个标准节用高强螺栓紧固，吊放在混凝土基础的垫层上，用水准仪检查四主弦杆上平面，平面度不大于1/1000，未达到要求允许在底架底板下垫板达到要求，按基础图要求捆扎好钢筋骨架，进行二次混凝土浇筑，待地基干透后，接着安装下塔身。 </p>
<p class="indt2">4.3.2· 安装标准节 </p>
<p class="indt2">安装前应用水准仪重新检查基础节上平面的平面度，保证不大于1/1000。 </p>
    <p class="indt2">4.3.2.1将一个标准节I吊装在基础节上，用12个M30*2高强度螺栓副连接，预紧力矩为180kg.m（注意：标准节的踏步方向应在建建筑物完工后能顺利拆下塔机的起重臂）。 </p>
    <p class="indt2">4.3.2.2再吊装一个标准节I,分别用12个M30高强度螺栓副紧固连接，预紧力矩为180kg.m（注意：顶升踏步在同一侧）。 </p>
    <p class="indt2">4.3.2.3装配完紧固螺栓后，用经纬仪或吊线法检查已立好的部分，四根主弦杆翼缘所形成的铅垂直平面、与基础节的上平面垂直度为1/1000。此时标准节基本安装高度为6000mm.</p>
 <p class="indt2">4.3.3吊装套架</p>
  <p class="indt2">先将套架平台与套架拼装牢固，然后将套架吊起套在标准节的外面（注意：套架引进平台应与塔身顶升踏步的方向相反），慢慢放下，将套架上两卡板卡牢在自下往上第二个踏步上（即下面第一个标准节的上端踏步上）。然后将液压泵站吊上平台，接好油管，检查泵站运转情况。 </p>
    <p class="indt2">4.3.4回转部分包括</p>
<p class="indt2">下支座、回转支承、上支座、回转塔身、司机室等部分，并在地面组装好。吊装已组装好的回转部分，用4个Φ40的销轴将下支座与爬升架和利用8-M30×2螺栓将下支座与下塔身连接起来，用4个Φ6的开口销穿入销轴内，并充分张开尾部。在特殊情况下，可以视实际情况分开吊装。 </p>
    <p class="indt2">4.3.5吊装塔顶</p>
<p class="indt2">在地面上将塔顶与平衡臂拉杆第一节用销轴连接好后,再吊装塔顶至回转塔身上,塔顶上焊接装有力矩限制器一侧与司机室朝向相同,用4个Φ50的销轴连接起来,并装好开口销,充分张开尾部。 </p>
    <p class="indt2">4.3.6吊装平衡臂：</p>
  <p class="indt2">在平整的地面上拼装好平衡臂臂节，用高强度销轴连接，并锁紧，安装平衡臂平台、栏杆。将平衡臂栏杆，每根三节中的下部两节组合一端与平衡臂尾部连接，上部一节一端装入塔顶拉板连接销孔（可在地面时装好）。其余部分平直搁在平衡臂上，用绳索扎紧，准备起吊。吊装平衡臂，臂根部分插入上支座连接耳板中，装入销轴，张开开口销，然后臂尾上翘，将三节栏杆连成整根装入销轴，张开开口销。平衡臂尾部慢慢下放，拉杆逐步伸直而受张力，直到平衡臂接近水平。吊装一块2.5t的配重块放置平衡臂安装配重块处（靠近拉杆吊点处） </p>
   <p class="indt2">4.3.7吊装起重臂</p>
<p class="indt2">将起重臂各节按顺序装好，并把载重小车装上，穿绕载重小车的牵引钢丝绳，捆扎载重小车于起重臂根部。在连接好起重臂拉杆后，捆扎在起重臂的弦杆上。将起重臂平行吊起，臂根插进上支座连接耳板中，使其上翘3°左右，作装拉杆准备。将起升钢丝绳经过塔顶顶部其中一个滑轮，再绕过起重臂拉杆板上的滑轮，再绕过塔顶顶部的另一滑轮，将钢丝绳固定在拉杆拉板架的耳板上，固定牢靠后慢慢地开动起升机构，提起拉杆，使拉杆与塔顶的拉板用销轴连接，两支拉杆连接牢靠后，穿好开口销，并将开口销充分张开，慢慢松开起升机构钢丝绳。起重臂拉杆逐步受张力而伸直，起重臂逐步减小上翘而接近水平位置，钢丝绳放松后卸下钢丝绳。 </p>
    <p class="indt2">4.3.8吊装配重块</p>
    <p class="indt2">根据所使用的臂架长度，吊装不同的配重块数量:</p>
  <table border="0" cellspacing="0" cellpadding="0" width="100%" class="listtable">
    <tr>
      <td width="20%" align="center" valign="top">
        臂长(m）</td>
      <td width="40%" align="center" valign="top">配重块数量 </td>
      <td width="40%" align="center" valign="top">配重总重量(kg)</td>
    </tr>
    <tr>
      <td align="center" valign="top">56</td>
      <td align="center" valign="top">4x2.9t+2x1.35t</td>
      <td align="center" valign="top">14300</td>
    </tr>
  </table>
  <p class="indt2">4.3.9穿绕起升钢丝</p>
    <p class="indt2">起升钢丝绳由起升机构引出，经排绳装置至塔顶滑轮、起重量限制器滑轮，再引向载重小车与吊钩穿绕，最后将绳端固定在起重臂端上（未装平衡块之前，严禁穿绕钢丝绳） </p>
    <p class="indt2">4.3.10塔机立塔完毕后进行试运转，并检查各处钢丝绳是否处于正常工作状态，遇有机构磨擦钢丝绳应予排除，工作期间应每周检查两次，并做好记录。 </p>
 <p><strong>4.4塔身标准节的安装方法及顺序 </strong></p>
    <p class="indt2">4.4.1将所需加高的标准节全部吊放在套架引进标准节方向的前方排成一排,以便加节方便。 </p>
    <p class="indt2">4.4.2详细检查各机械部位及电器部份和液压部份,将油缸空载伸缩数次,排除液压系统内的空气,在活塞杆全缩状态,调正活塞杆,将顶升横梁两端的销轴插入标准节就近的踏步销孔中,必须两端同时插牢,否则不允许顶升。检查无误后，吊起一个标准节，在标准节下端的导向连接套孔中插入四个引进滚轮，将标准节吊放在引进台上，准备顶升。 </p>
    <p class="indt2">4.4.3将回转机构制动器处于制动锁紧状态（注意：整个加节顶升过程回转机构应始终处于制动锁紧状态，严禁塔机回转），再吊起一个标准节,并将牵引小车开到：55米臂长开到靠近塔身约10米处，50米臂长开到靠近塔身约13米处，44米臂长开到靠近塔身约20米处，以作顶升调节平衡作用。拆除下支座与标准节之间的连接螺栓副，必须全部拆除，否则不允许顶升。开动液压顶升系统，稍微顶升至下支座四主肢下平面与标准节上平面刚离开2厘米左右即可，检查顶升部分的重心是否落在油缸中心线上，具体可观察套架四面滚轮与标准节的间隙大小是否一致，不一致可调节小车的平位置来达到一致。然后调正好套架滚轮与标准节主肢的间隙，间隙为2至3毫米为好。 </p>
    <p class="indt2">4.4.4继续开动顶升系统，油缸活塞杆伸出约1.5米,套架的爬爪应在标准节顶升踏步的上方时,稍缩活塞杆,使套架的爬爪卡牢在标准节顶升踏步的卡槽内(注意:必须两个爬爪同时卡牢,否则决不允许进行下步操作)。 </p>
    <p class="indt2">4.4.5开动顶升系统，缩回活塞杆，调正活塞杆，使顶升横梁两端的销轴全部插靠插牢在标准节顶升踏步的销孔内（注意：必须两端销轴同时插牢），继续顶升，油缸活塞杆再伸出约1.5米,套架的爬爪应在标准节顶升踏步的上方时,稍缩活塞杆,使套架的爬爪卡牢在标准节顶升踏步的卡槽内(注意:必须两个爬爪同时卡牢)。 </p>
    <p class="indt2">4.4.6经过两次顶升，此时套架上方开口处正好有一个引进标准节的高度，将原放在引进平台的标准节推进塔身位置，将塔身标准节对正下标准节，操纵手柄，徐徐放下他身标准节，对接后，抽出引进滚轮，用螺栓副将引进的塔身标准节与下标准节连接起来，并拧紧，用螺栓副将引进的标准节与下转台四主肢连接坚固。这样就完成了一个塔身标准节的加高工作。 </p>
<p class="indt2">4.4.7按以上方法可完成塔身的加高工作：每次吊装塔身标准节之前，塔身与下支座之间每根主弦杆上至少应紧上一个连接螺栓副，当吊好一节塔身标准节放在引进梁上，牵引小车开到规定的平衡位置后，再拆开这些螺栓副进行顶升过程。 </p>
<p class="indt2">4.4.8顶升工作风力应低于四级风力,决不允许在四级风以上进行顶升作业。 </p>
<p class="indt2">4.4.9顶升工作全部完成后，可将爬升架下降到塔身底部并加以固定，以降低整个塔机的重心和减少迎风面积。 </p>
<p><strong>4.5</strong><strong>安全装置调整方法</strong> </p>
    <p class="indt2">4.5.1调整起升高度限位器:启动起升机构使吊钩侧板上缘离牵引小车下缘钢丝绳，距离四倍率时不小于0.7米，二倍率时不小于1米，把电线接入限位器内，拧紧限位器输入轴与卷筒主轴上的止动螺钉，调整好高度限位器，然后再启动起吊起升机构，下放吊钩10m左右，再以高速提升，到达距离要求时,起升高度限位，切断上升电源，只有下限动作，重复数次，检查是否起升高度限位准确，直到符合要求。顶升到工作高度后，吊钩落地，调整下限位开关使之断开，提升吊钩并再次下降，吊钩落地时应自动断电，不符合要求重新调整，直至符合要求，当塔机高度发生变化时，应重新调整限位器。 </p>
    <p class="indt2">4.5.2调整回转限位器：将牵引小车（空钩）运行到起重臂根部，并保证电源电缆处于不打绞状态，用手指逐个压下微动开关，确认控制左或右的微动开关是否正确，向右回转540°，松开螺钉，调动调整凸轮，使凸轮动作至使微动开关瞬时换接，然后拧紧螺母。同上方法：调整左回转限位器，重复数次，直至符合要求。 </p>
    <p class="indt2">4.5.3调整幅度限位器：启动牵引机构，使载重小车上的吊钩离回转中心3.0m处和离50m（55m）处，分别把电缆接入限位器内。然后再起动牵引机构，载重小车向内开到离回转中心3.0m处、向外开到离回转中心50m(55m)处，幅度限位器中的开关动作，幅度限位，切断牵引机构电机电源，使载重小车不能向内（只能向外）或者不能再向外（只能向内）变幅。重复数次，直至符合要求。 </p>
<p class="indt2">4.5.4调整起重量限位器 </p>
<p class="indt2">4.5.4.1四倍率滑轮组调整 </p>
<p class="indt2">4.5.4.1.1高速挡调整（按起重特性表规定的幅度与对应起重量进进行调整） </p>
<p class="indt2">a,吊重3000Kg,幅度在25m以内，吊钩以低、中、高三档速度均应能正常升降，不允许任何一档产生不能升降现象。 </p>
    <p class="indt2">b，再加重100Kg,并调整测力环上的调整螺钉，使高速档起重量限制器的LHM3动作，这时高速档不能起升，自动转为中速上升运行。在幅度小于18m时，吊重4690kg,调整测力环上的调整螺钉，使LHM2动作，联动台上的蜂鸣器发出讯号，这时中速档不能起升。 </p>
<p class="indt2">c,重复a、b的动作两次，直到调好为止。 </p>
<p class="indt2">4.5.4.1.2低速档调整（幅度不大于13.91m） </p>
<p class="indt2">a.吊重6000kg，吊重以低、中速档，速度应能正常工作，而不允许产生不能起升现象，但操作高速档时，应不能动作。 </p>
<p class="indt2">b．每次加重150kg，以低速升高2～3m，调整测力环上的调整螺钉，使低速档重量限制器LHM1直到6150～6300kg范围动作，限制上升动作，允许下降动作；变幅小车停止向外运动，允许向内运动，司机室联动台上的超重红色信号灯亮。 </p>
<p class="indt2">c.重复a、b动作两次，直到调整好为止。 </p>
<p class="indt2">4.5.4.2二倍率滑轮组校核 </p>
<p class="indt2">a．吊重3000kg,吊重以中、低速档起升，高速应不能动作（幅度不大于25m）。 </p>
<p class="indt2">b．再加载至3050～3100kg，范围应报警断电。 </p>
<p class="indt2">c．重复a、b的全部动作两次。考核其重复性和可靠性。 </p>
<p class="indt2">4.5.5调整力矩限制器 </p>
<p class="indt2">4.5.5.1臂端点调整（调整时载重小车以低速运行），调整力矩限制器上的螺钉，使LDM２? 动作，见c条R断幅度 </p>
<p class="indt2">a、当a=4, 50m （44m）臂长时,起吊Q=1300kg（Q=1650kg）开小车使幅度在39～40m（34～35m）,范围内鸣铃（蜂鸣发光）发讯，中间值较为理想。 </p>
<p class="indt2">b、开回小车，至解除报警为止。 </p>
<p class="indt2">c、重新把下车往外开，直至断电为止，并测出断电开始时小车所在幅度R断，当R断在49～50m（43～44m）之间，即满足要求，中间值较为理想。 </p>
<p class="indt2">d、重复a、b、c、动作三次记录下每次报警时和断电时的幅度，以检验其重复性能。三次小车断电幅度均在规定值范围，即为合格。?? </p>
<p class="indt2">4.5.5.2臂根点校核（载重小车以低速度运行），调整力矩限制器上的螺钉，使LHM12动作，见c条R断幅度。 </p>
<p class="indt2">a、当a=4, 50m臂长时，吊重6000kg，自最小幅度将小车往外开，测出报警时的幅度R报应在10.6～11.1m范围，中间值较为理想 </p>
<p class="indt2">b、开回小车至解除报警为止。 </p>
<p class="indt2">c、重新把小车往外开，测出断电幅度R断，R断应在13.9～12.5m范围，中间值较为理想。 </p>
<p class="indt2">d、重复a、b、c、动作三次，测出的R报和R断在上述范围内即可。 </p>
<p class="indt2">4.5.6倍率变更调整方法 </p>
    <p class="indt2">当起吊在3t以下的重物时，可使用2或4倍率工作，但当起吊3t以上重物时，必须采用4倍率工作。 
    滑轮倍率装置的目的，为的是使吊钩滑轮的绕绳倍率变更，使起升机构起重能力提高一倍而速度降低一倍。 倍率变更方法如下：将吊钩降至地面，取出中间的销轴，然后将上滑轮夹板提升到载重小车下部顶住，这时吊钩滑轮由四倍率变为二倍率。利用同一原理，若需要从二倍率变成四倍率，只需要吊钩落地，放下上滑轮，用销轴将上、下夹板连接即可。 </p>
<p><strong>4.6起重机的试运转 </strong></p>
<p class="indt2">起重机安装调试后应进行试运转 </p>
<p class="indt2">4.6.1空负荷试运转通过负荷试运转检查各种机构是否正确，各限位开关是否可靠。起重臂向左、右方向各回转两次，每次均需检查该方向的回转是否可靠。 </p>
<p class="indt2">4.6.2额定负荷试运转：通过额定负荷试运转检查各机构的工作是否正常，各超载保护机构是否可靠，幅度50m时，吊重为1.3t，幅度3.0-13.91m时，吊重为6t，塔机正常运行。 </p>
<p class="indt2">4.6.2.1检查起重限制器：幅度小于13.91m，起吊6.2t，应有声光报警，并切断起升机构上升的电路。 </p>
    <p class="indt2">4.6.2.2检查起重力矩限制器：幅度小于50m，起吊1.365t，向外变幅，当吊钩达到50m的幅度时，应有鸣铃（蜂鸣发光）报警，载重小车应自行停止运动，吊钩无法上升。司机应时时注意力矩限制器是否符合要求，并做好定期检查工作（最好5-10天为一次，最长不超过15天，避免在无人知道下，塔机超力矩使用，造成事故）。 </p>
<p class="indt2">4.6.2.3起吊6t，幅度13.91m，起重臂左右回转三次。 </p>
<p class="indt2">4.6.2.4起吊6t，载重小车由幅度3.0-13.91m各往返一次 </p>
<p class="indt2">4.6.2.5起吊6t，幅度小于7m,吊钩起升不小于5m,升降三次进行起升机构刹车试验。不允许吊钩有下滑现象。 </p>
<p class="indt2">4.6.2.6起吊1.3t，幅度50m，起重臂左、右方向各回转两次。 </p>
<p class="indt2">4.6.2.7起吊1.3t，载重小车由幅度3.0-50m，往返一次。 </p>
<p class="indt2">4.6.2.8起吊1.3t，同时进行起升与回转两项运动的复合操作，循环一次，变幅与回转的复合操作，循环一次。 </p>
	
  <p><strong> 11 验收项目</strong></p>
  <p>
    <table border="0" cellspacing="0" cellpadding="0" class="tjtable">
      <tr>
        <td  valign="top">11.1 施工方案 </td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.1.1 有专项安全施工组织设计经上级审批，针对性强，能指导施工 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.1.2有专项安全技术交底 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.1.3安装单位及人员具有相应的资质 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.2    固定式塔吊的基础 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.2.1 基础设计和处理必须符合本塔机说明书要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.2.2 基础设计应有土壤承载力资料及计算，并有上级审批 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.2.3 基础完工后有履行验收手续 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.2.4 有良好排水措施 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3    塔吊结构 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.1 结构应无开焊、裂纹及永久性变形 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.2 架体各节点螺栓应紧固 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.3 开口销应完全撬开 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.4 压重、配重应按说明书要求设置 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.5 上人爬梯护圈及休息平台设置应符合要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.3.6 塔身与基础平面的垂直度偏差应不大于4/1000</p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4    绳轮传动系统 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4.1 钢丝绳规格应符合要求，断丝和磨损达到报废标准的不得使用 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4.2 钢丝绳固定编插缠绕应符合规定要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4.3 各部份滑轮应转动灵活，无破损。轮槽磨损达到报废标准的不得使用。 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4.4 各机构运行平稳，无异常，润滑良好 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.4.5 各制动器装置应灵敏可靠 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5    电气系统 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.1 控制、操纵装置应动作灵敏可靠 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.2 仪表、报警装置应齐全完好 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.3 电气各安全保护装置应灵敏可靠 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.4 司机室及通道应有良好的照明 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.5 电气系统对塔吊绝缘电阻值应不小于0.5MΩ </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.6 塔机接地、接零应符合规定要求。接地电阻值应小于4Ω </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.7 避雷装置是否符合规定要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.8高于30m的塔机应在塔顶及臂架头部装设防撞红色灯 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.5.9 塔机的任何部位与架空线路应保持安全距离。达不到的，应采取防护措施 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6    安全装置 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6.1 力矩限制器应灵敏可靠，并有试验报告 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6.2 行走、回转、变幅、超高限位装置应灵敏可靠 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6.3 卷扬机卷筒应按规定设置保险装置 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6.4 夹轨钳应符合规定要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.6.5 吊钩应有保险装置并完好 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.7    附墙装置 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.7.1 附墙装置应符合说明书要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.7.2 塔身与附墙装置连接牢固可靠 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.7.3 最高附着点以上塔身悬臂高度应符合规定要求 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.8    试运转 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.8.1 经空载、额定荷载试验，各驱动装置、制动装置、限位装置及保险装置运行无异常且灵敏可靠并有检验报告 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.9    多塔作业 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.9.1 多台塔吊在同一现场作业，应有可靠的防碰撞措施 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.10    操作 </p></td>
      </tr>
      <tr>
        <td  valign="top"><p align="left">11.10.1 司机、指挥持证上岗，指挥信号符合要求 </p></td>
      </tr>
    </table>
  </p>
  <p align="left"><strong>塔机安全使用运行说明 </strong></p>
<p ><strong>一、塔吊在安拆过程中的必须注意以下事项：</strong> </p>
<p class="indt2">1、塔机的安拆作业必须在白天进行，如需加快进度，一定要在具备良好的照明条件的夜间进行安拆，决不能在大风、浓雾和大雨天进行拆装。 </p>
<p class="indt2">2、在拆装上回转和起重臂、平衡臂时，一定要根据该塔机说明书上的要求进行，要始终保持塔机的平衡，严禁只拆装一个臂就中断作业。 </p>
    <p class="indt2">3、在拆装过程中，如突然发生停电、机械故障、天气骤变等情况下不继续作业或作业时间已到休息时，必须使塔机已安装、拆卸的部位达到稳定状态并已锁牢固，所有结构件已经连接牢固，塔顶的重心线外于塔底支承四边中心处，再经过检查确认妥善后方可停止作业。 </p>
<p class="indt2">4、安装时应按说明书的要求使用螺栓、销轴等连接件，高强螺栓紧固应用扭力扳手或专用扳手并有一定的预紧力，螺栓、销轴都要有可靠防松措施或防止轴向移动措施。 </p>
<p><strong>二、塔机应调试检验合格后，方能投入使用。 </strong></p>
<p><strong>三、塔机不许在有故障的情况下使用，尤其不允许拆除安全保护装置使用。 </strong></p>
<p><strong>四</strong>、塔机的使用应定机定人，专人负责，严禁无证操作。非安装、维护、操作人员，未经许可不得攀爬塔机。 </p>
<p><strong>五</strong>、塔机正常工作温度为-20℃—40℃，工作时风速不大于20米/秒。天气预报有10级以上大风时，塔机应用缆风绳加固。 </p>
<p><strong>六</strong>、塔机停止工作后，应保证起重臂随风自由转动。 </p>
<p><strong>七</strong>、夜间工作时，工地现场应具备良好的照明条件。 </p>
<p><strong>八</strong>、在多台塔机的施工现场，应防止空中干涉。 </p>
<p><strong>九</strong>、塔机出现临时故障需检修时，必须切断电源，不允许带电作业。 </p>
<p><strong>十</strong>、塔机必须有良好的电气接地以防雷击，接地电阻小于4欧。 </p>
<p><strong>十一</strong>、塔机工作的安全距离不小于0.5米。 </p>
<p><strong>十二</strong>、司机室禁止存放润滑油，油棉纱及其他易烯易爆品，用电取暖要注意防火。 </p>
<p><strong>十三</strong>、司机必须得到指挥信号后方可操作。操作前必须鸣笛，操作时要精神集中。 </p>
<p><strong>十四</strong>、塔机不许超载使用，不许斜拉斜吊，禁止用于拔桩作业。 </p>
<p><strong>十五</strong>、液压系统、电气系统及各种机构的调整值不许随意更动。 </p>
<p><strong>十六</strong>、起升电机在十分钟内低速运行的累计时间不得超过1.5分钟。 </p>
<p><strong>十七</strong>、塔机作业完毕，吊钩升起，小车应停在臂架端部。 </p>
<p><strong>十八</strong>、塔机顶升作业要严格按施工方案执行，并注意以下事项： </p>
<p class="indt2">1、顶升作业一定要在白天进行。 </p>
<p class="indt2">2、作业过程中，必须有专人指挥，专人照看电源，专人操作液压系统，专人紧固螺栓，非有关操作人员不得登上顶升套操作平台，更不能擅自启动泵阀开头或其他电气设备，操作室内只准一人操作，且必须听从指挥。 </p>
<p class="indt2">3、顶升作业风速应在13米/秒以下。如在顶升作业中风力突然加大时，必须立即停止作业，并紧固上下塔身联接螺栓。 </p>
<p class="indt2">4、顶升时，必须使起重臂和平衡臂处于平衡状态，并把回转制动。严禁回转起重臂和其它作业。顶升过程中如以现其它故障，必须立即停止作业并进行检查，待故障排除后方可继续顶升。如在短期内不能排除故障，应将顶升套架降回原位并及时将各连接螺栓紧固。 </p>
<p class="indt2">5、在拆除回转台与标准节之间的连接螺栓时，如出现最后一处螺栓拆装困难，应将其对角的螺栓重新插入，再采取其他措施  ，不得采取旋转起重臂动作来松动螺栓 </p>
<p class="indt2">6、顶升时，必须确认顶升爬爪稳妥就位后，方可继续下一步动作。 </p>
<p class="indt2">7、顶升到规定高度后，必须先将塔身附在建筑物上，方可继续顶升。 </p>
<p class="indt2">8、顶升前后必须认真做好准备工作和收尾工作。特别是在顶升后，各联接螺栓应按规定坚固，液压操作杆应回到中间位置，液压系统的电源应切断。 </p>
<p><strong>十九、</strong>附着锚固作业时要严格按施工方案第执行，并注意以下事项： </p>
<p class="indt2">1、建筑物的预埋附着支座处的受力强度必须经过验算，能保证塔机在工作或非工作状态下的载荷。 </p>
<p class="indt2">2、应根据建筑物施工总高度、建筑结构特点以及施工进度要求等情况，确定附着方案。 </p>
<p class="indt2">3、附着的间距、间隔、悬臂高度等到应符合使用说明书的要求。 </p>
<p class="indt2">4、在设附着框架和附着杆时，要先用经纬仪观察塔身的垂直度，并通过调整附着杆的距离，保持塔身的垂直度（a、独立高度时垂直度误差应控制在4/1000以下。b、最上一道附着点以下塔身垂直度应控制在2/1000以下）。 </p>
<p><strong>二十、</strong>塔机操作司机应熟悉塔机的性能与使用方法，全面掌握塔机的有关知识，做好塔机维护保养工作，确保塔机安全运行。严格按《塔机安全操作规程》，进行操作使用。 </p>
  </p>
  </div>	
</div>
</center>
</c:if>
<c:if test="${indisSchema.equipment.equipGeneric == 'S'}">
<center>
<div class="main_detail">
  <div class="tj_title">施工升降机安装施工方案</div>
  <div class="tj_detail">
  
<p><strong>一、工程概述</strong></p>
<p class="indt2">根据<u>&nbsp;&nbsp;<strong>${indisSchema.project.projectName}</strong>&nbsp;&nbsp;</u>施工工地需要，按照合同决定在<u>&nbsp;&nbsp;<strong>${indisSchema.project.address}</strong>&nbsp;&nbsp;</u>工地安装1台由<u>&nbsp;&nbsp;<strong>${indisSchema.equipment.equipVender}</strong>&nbsp;&nbsp;</u>制造的<u>&nbsp;&nbsp;<strong>${indisSchema.equipment.equipSpecificName}</strong>&nbsp;&nbsp;</u>型人货施工升降机。总高度为<u>&nbsp;&nbsp;${indisSchema.overallHeight}&nbsp;&nbsp;</u>米。施工升降机安装总高度为<u>&nbsp;&nbsp;${indisSchema.finalHeight}&nbsp;&nbsp;</u>米，基础标高为±0米。</p>

<p>二<strong>、编制说明</strong></p>
<p><strong>（一） 编制依据</strong></p>
<p class="indt2">1.  本工程《施工组织设计》。</p>
<p class="indt2">2.  GB10055—2007《施工升降机安全规则》</p>
<p class="indt2">3.  JGJ33——2001《建筑机械使用安全技术规程》</p>
<p class="indt2">4.  GJ46——2005《施工现场临时用电安全技术规范》</p>
<p class="indt2">5.  JGJI30——2001《建筑施工扣件式钢管脚手架安装技术规范》</p>
<p class="indt2">6.  福建盛建建筑机械有限公司施工升降机安装使用说明书</p>
<p><strong>三 、施工准备</strong></p>
<p><strong>（一） 施工电梯及安装工机具准备</strong></p>
<p class="indt2">1. 施工电梯</p>
<p class="indt2">使用的外用电梯应有出厂合格证，并标有铭牌。安全装置每年经法定检测单位检测合格后才能使用，并有检测报告。</p>
<p class="indt2">2. 施工用的工机具准备	</p>	
<p style="text-align:center; font-size:16px;">主要机具配备表</p>
<p><table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td align="center" width="10%">序号</td>
    <td align="center">名称</td>
    <td align="center" width="20%">规格 </td>
    <td align="center" width="15%">数量</td>
    <td align="center" width="20%">备注</td>
  </tr>
  <tr>
    <td align="center">1</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
    <tr>
    <td align="center">6</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</p>	
  <p><p><strong>（二）人员要求</strong> </p>
    <p class="indt2">1. 人员要求：安装人员，应按登高架设特种作业人员的要求，经过安全技术培训和经考核合格并取得福建省建设厅发给的“特种作业人员操作证”后，方能上岗操作。 </p>
 <p><strong>（三）技术准备</strong></p>
    <p class="indt2">1.升降机安装前，由其产权单位编制详细的专项施工方案，并经产权单位分管负责人审批签字后，报审监理/建设单位批准同意签字后，方可实行安装；方案编制时对安装过程和使用过程中的危险源和不利环境因素进行辨识，制订相应的控制措施；并以此为要求对作业人员和管理人员进行安全、技术质量交底，并作好相应的记录。 </p>
<p class="indt2"> 2. 升降机装拆前，应确定指挥人员，划定安全警戒区并设监护人员，排除作业障碍。 </p>
<p ><strong>（四）作业条件</strong> </p>
<p class="indt2">1. 施工升降机在安装作业前，应对升降机的各部件作如下检查： </p>
<p class="indt2">1.1. 导轨架、吊笼、等金属结构的成套性和完好性； </p>
<p class="indt2">1.2. 曳引机传动系统、限速器的装配精度； </p>
<p class="indt2">1.3. 电气设备主电路和控制电路是否符合国家规定的产品标准：电缆、电气线路绝缘良好，对地绝缘电阻值大于1MΩ；电气原器件动作灵敏；操作系统灵活可靠。 </p>
<p class="indt2">1.4. 基础位置和做法是否符合该产品的设计要求；必须有隐蔽工程验收，并有土建技术负责人签字。 </p>
<p class="indt2">1.5. 附墙架设置处的混凝土强度和螺栓孔是否符合安装条件； </p>
<p class="indt2">1.6. 各安全装置是否齐全，安装位置是否正确牢固，各限位开关动作是否灵敏、可靠； </p>
<p class="indt2">1.7. 升降机安装作业环境有无影响作业安全的因素。 </p>
<p><strong>四、升降机安装具体步骤</strong></p>
<p><strong>（一）安装前准备阶段</strong> </p>
<p class="indt2">1. 场地清理，扫除场内道路上的障碍物，保证具备应有的作业空间，作业区域上空（有无）高压电线电缆（如有高压电线、电缆，现场应采取保护措施）。 </p>
<p class="indt2">2. 组织安装作业队伍，工作时必须先进行安全任务书技术交底。 </p>
<p class="indt2">3. 所有作业人员必须戴好安全帽，高空作业人员系好安全带，认真检查索具、起重机具、手拉葫芦、专用扳手及其他辅助工具。不合格品一概不准使用。 </p>
<p class="indt2">4. 根据升降机装拆规程对升降机安装的基础部位和附墙装置进行验收。 </p>
<p><strong>（二）安装实施阶段</strong> </p>
<p class="indt2">1. 阅读、熟悉升降机使用说明书，整个装拆过程严格按上述型号升降机安装规定执行。 </p>
<p class="indt2">2. 待安装的升降机应做到性能完好，金属结构部分无疲劳损伤，无焊缝开裂脱焊，无严重锈蚀。对钢丝绳、滑轮组、电气设备、安全保险机构等，安装前均应认真检查，发现问题必须马上整改。 </p>
<p class="indt2">3. 组装区域设置警戒线，设有明显标志，并有专人监护。 </p>
<p class="indt2">4. 安装顺序：基础准备→附墙预埋件→底架、基础节安装→曳引机安装→标准节与滑车等安装→对重装置、顶架的安装→吊笼安装→防护围栏安装→电气安装、调整→整机的安装、测试。 </p>
<p class="indt2">5．按施工要求和操作规定升节到指定工作高度。 </p>
<p class="indt2">6、按规定和施工要求拆卸附墙架。 </p>
<p><strong>五、施工升降机安装要求</strong></p>
<p class="indt2">概述：SSD150/150 型施工升降机由钢结构、机械传动、安全设施及电气等部分组成。升降机安装之前，必须了解其独特性能，熟悉其机械和电气原理，这样才能保证安全、快速和高质量地完成安装工作。 </p>
<p><strong>（一） 升降机基础要求</strong></p>
<p class="indt2">1. SSD150/150型人货两用电梯安装基础混凝土平台示意图见附图（基础图）。 </p>
<p class="indt2">2. 施工升降机基础的要求： </p>
<p class="indt2">2.1. 配置加强钢筋网格，钢筋直径Φ10，网格间距200mm。 </p>
<p class="indt2">2.2. 预埋底架地脚钩及4 个地脚钩必须与钢筋网格绑扎成一体。 </p>
<p class="indt2">2.3. 允许预埋底架和4 个地脚处预留方孔，以便实施二次浇灌。 </p>
<p class="indt2">2.4. 混凝土平台下地面的地耐力要求：R≥20t/m。 </p>
<p><strong>（二） 升降机的安装</strong></p>
<p><strong>1．安装基础节</strong> </p>
<p class="indt2">1.1 将基础表面清扫干净； </p>
<p class="indt2">1.2 把基础节安放在基础上(参见附图，基础图)，卷筒座要背离建筑物（与进料门同一侧），通过地脚螺栓及螺母与基础联接。 </p>
    <p class="indt2">1.3利用水平仪测量基础节的水平误差，要求偏差不大于1㎜，可用3～6mm厚的钢垫片来调整，直至符合要求为止。最后在所有地脚螺栓孔内填塞C30速凝混凝土，并用C30以上水泥沙浆填充底座与基础之间的间隙，（注意留排水沟）；待混凝土完全凝固后（砼浇注后3～4天）锁紧各个地脚螺栓，并做好螺栓露出端的防护。 </p>
<p><strong>2．安装曳引机</strong> </p>
<p class="indt2">2.1 在基础节底框上安装曳引机，其中进料门一侧要装带链轮的，其中标号1、2、3、4的是固定曳引机用的。 </p>
<p class="indt2">2.2 把安装卷筒装在基础节底框上，其中标号5、6、7、8的是固定卷筒用的。后再安装上链条。 </p>
<p class="indt2">2.3 按电路图中的安装状态把控制线路以及控制按钮排连接好。此时，控制系统处于慢速控制状态，便于安装的安全。控制按钮排上按钮分布，其中按钮“上升”或“下降”表示该按钮按下不放开时，物件处于上升或安装用控制按钮
    下降状态。操作方法：看到可以开始操作的指挥信号后，按住按钮不放，安装卷筒开始运行。当物件到达适当位置时松开按钮，这时物件作减速停止。当有紧急情况时，使钮子开关处于OFF（关）位置，总电源断电。 
<p class="indt2">2.4 把安装钢丝绳卷进卷筒。卷绕安装钢丝绳时，钢丝绳要排列有序，紧密相连，不得有纠缠现象。 </p>
<p ><strong>3．安装第二节</strong> </p>
    <p class="indt2">把第2节标准节两端管子接头处及齿条销子处擦干净，并加少量润滑脂，安装在基础节上，4个立柱要和基础节的对接起来，即第2节立柱下端的锥形短管要插入到基础节立柱的定位孔中。另外第2节的限位开关板要朝上，并朝向卸料平台（建筑物）。用4个高强度螺栓将标准节连接好，并拧紧螺母。 </p>
<p><strong>4．安装滑车</strong> </p>
<p class="indt2">4.1 在安装卷筒上方安放好安装滑车。 </p>
<p class="indt2">4.2 4个滑块用螺栓锁紧，使得俩俩相对，套在第2节和基础节的立柱上。但定位销先不要往里面插，以便滑动提。 </p>
<p class="indt2">4.3 把扒杆用抱箍固定在滑车上 </p>
<p class="indt2">4.4 用人工办法抬升滑车，使得定位销插进去后能支在第2节中间框上。穿绕好安装钢丝绳，用标准节进行试吊，检查制动器、链传动、安装卷筒及电气控制系统的运行情况，确定都能正常运行后准备吊装作业； 
    注意：安装扒杆只能吊装重量不超过200kg的物件；</p>
<p><strong>5．吊装第三标准节</strong> </p>
<p class="indt2">5.1 把标准节移到基础旁边，用一个千斤绳将.标准节绑好，准备提升。</p>
<p class="indt2">5.2 按住控制按钮排上的“上升”按钮，开始提升标准节，并应注意观察安装钢丝绳在卷筒里的卷绕情况防止钢丝绳脱槽。</p>
<p class="indt2">5.3 标准节提升到指定位置后，人工拉住并转动到第2节上方，方向对好后，慢慢放下。用4个高强度螺栓将标准节连接好。 </p>
<p><strong>6．提升滑车</strong> </p>
<p class="indt2">6.1 按住“下降”按纽，让钢丝绳退出一段。 </p>
<p class="indt2">6.2 穿绕好钢丝绳。</p>
<p class="indt2">6.3 操纵按钮，使滑车稍微上升一点，把定位销拔离标准节。</p>
<p class="indt2">6.4 用“上升”提升滑车，使得定位销稍微超过最后一节标准节的中间框，把定位销插入标准节里面。 </p>
<p class="indt2">6.5 操纵按钮，把滑车放下，使得滑车依靠定位销支撑在标准节上，把钢丝绳从定滑轮中脱出，恢复吊装状态。</p>
<p><strong>7．吊装第4～5标准节标准节与提升滑车交替进行。</strong> </p>
<p><strong>8．安装对重架及对重</strong> </p>
<p class="indt2">8.1 用千斤绳穿过对重架的吊装孔，再处于吊装状态。 </p>
<p class="indt2">8.2 在地面安放4块对重块到对重架里。 </p>
<p class="indt2">8.3 参照吊装标准节的办法，把对重架提升到上方并转向标准节上方，对重导轮对准对重导轨后放入对重运行轨道内。 </p>
<p class="indt2">8.4 在对重架底部用横杆架(钢管或木材，但应能承载大于1.6吨的重量)支撑在标准节上。
    用同样方法安放好第2个对重。 </p>
<p><strong>9．继续加一节标准节</strong> </p>
<p><strong>10．安装第一道附墙</strong> </p>
    <p class="indt2">用附墙架将标准节和墙体连接起来，测量正面和侧面的垂直度，将抱箍锁紧后，调节活节螺栓和调节螺杆，以便调整架体的垂直度，使偏差小于1/1000时方可进行锚固（每道附墙装置的安装都须先调整好垂直度）。 </p>
<p class="indt2">说明：附墙架每道间隔距离不大于9m,本工程只在三层砼楼面设置一道。 </p>
<p><strong>11．安装其余标准节和顶架。</strong> </p>
<p><strong>12．提升对重 </strong></p>
<p class="indt2">12.1 穿好安装钢丝绳I。 </p>
<p class="indt2">12.2 提升对重I到距顶架1.5个标准节的高度，用钢丝绳将其挂在标准节上。同样提升对重II并用钢丝绳将其挂在标准节上； </p>
<p class="indt2">12.3 检查配重导向轮与滑道的间隙等于0.5mm，确保每个转轮的灵活。 </p>
<p class="indt2">注意：提升对重或吊笼等重量超过200kg的物体时，不能使用安装扒杆，必须使用天滑轮。 </p>
<p><strong>13．安装吊笼</strong> </p>
<p class="indt2">13.1 先安装滑车对面的吊笼。注意，吊笼的驾驶室操纵柜要朝向建筑物方向。 </p>
<p class="indt2">13.2 安装滚轮装置。 </p>
<p class="indt2">13.3 调整滚轮的偏心轴，使滚轮与立柱导轨刚好贴住（既不紧也不松）。 </p>
<p class="indt2">13.4 把吊笼升高约50cm高度，并挂在标准节上。把钢丝绳提升到顶架上，穿好对重吊梁上的钢丝绳，并用绳扣扣紧。 </p>
<p class="indt2">13.5 把吊笼放下，去掉绑挂对重的钢丝绳。 </p>
<p class="indt2">13.6 把安装钢丝绳收回到卷筒里，拆除卷筒。  参照本节步骤安装另一个吊笼。 </p>
<p class="indt2">13.7 在顶架上安装好防脱槽杆和避雷针。 </p>
<p class="indt2">13.8 在吊笼上安装好安全器。 </p>
<p class="indt2">注意：1、安装曳引系统时，每一套里独立的钢丝绳的松紧程度要基本一致。 </p>
<p class="indt2">2、对重架和吊笼的吊梁顶部要基本处于水平状态。 </p>
<p><strong>14．安装电气设备</strong> </p>
<p class="indt2">14.1 按照电气原理图连接好电气线路。 </p>
<p class="indt2">14.2 安装好电缆防风架和电缆筒。 </p>
<p><strong>15. 限位开关及极限开关碰铁的安装</strong> </p>
<p class="indt2">15.1 下限位碰铁的位置，应在吊笼满载下行时自动停止在碰到缓冲弹簧100～200mm处； </p>
<p class="indt2">15.2 下限碰铁应安装在吊笼碰到缓冲弹簧之前制动； </p>
<p class="indt2">15.3 上限碰铁调整到使吊笼制动停止在上终端平台位置； </p>
<p class="indt2">15.4 上限碰铁安装在吊笼超过上终端平台150mm 处； </p>
<p class="indt2">15.5 确保上、下限位开关距限位碰铁的距离； </p>
<p class="indt2">15.6 必须保证极限开关触柄与上下极限碰铁的距离在极限开关断开位置时，其触柄距碰铁0.2～2mm 范围内； </p>
<p class="indt2">15.7 紧固所有碰铁上的螺栓，确保碰铁不移动。 </p>
<p class="indt2">15.8 按电路图连接好各限位开关，并检验其有效性。 </p>
<p><strong>16．降下对重，安装尚没安装的对重块</strong> </p>
<p><strong>17．安装底围栏</strong> </p>
<p class="indt2">17.1 将底围笼的各个侧片、门框安装好。 </p>
<p class="indt2">17.2 安装进料门及连锁机构。 </p>
<p><strong>18．增加标准节</strong> </p>
<p class="indt2">18．1把两个对重用钢丝绳绑挂在最高处。 </p>
<p class="indt2">18.2 拆除曳引系统。 </p>
<p class="indt2">18.3 把位于安装卷筒一侧的吊笼拉升到1～2节标准节高的位置并用钢丝绳绑住。 </p>
<p class="indt2">18.4 安装好卷筒。 </p>
<p class="indt2">18.5 穿绕好安装钢丝绳，使其处于吊装状态。 </p>
<p class="indt2">18.6 参照安装标准节、附着、顶架、曳引系统等步骤进行。 </p>
<p class="indt2">18.7 在开始吊装时，需人工钩住物件使之在上升时不会碰刮吊笼或底围笼。 </p>
<p><strong>六、施工升降机安装质量要求</strong></p>
<p class="indt2">外用电梯的验收应在安装单位调试检测合格后，经安装单位和使用单共同验收合格后，报当地建筑安全监督管理部门备案后使用。 </p>
<p><strong>（一） 验收前的验证工作</strong></p>
<p class="indt2">1. 是否制定安装专项方案，安装单位是否对班组装拆人员进行安全技术交底； </p>
<p class="indt2">2. 施工升降机是否有出厂合格证、说明书及其相应质量、安全性能资料； </p>
<p class="indt2">3. 查安装单位的许可证和参加安装人员的上岗证； </p>
<p class="indt2">4. 安装单位应对班组下达安装任务单，明确安装负责人和参加安装人员及其工作职责； </p>
<p class="indt2">5. 外用电梯基础必须有隐蔽工程验收记录，并由甲方或监理验收签字； </p>
<p class="indt2">6. 安装结束后安装单位应进行调试与自检，并有验收记录，数据齐全。 </p>
 <p><strong>（二） 施工升降机完好设备标准</strong> </p>
<p class="indt2">1. 整机 </p>
<p class="indt2">1.1. 起重能力达到额定标准； </p>
<p class="indt2">1.2. 钢结构无变形、裂纹、脱焊，各连接部分坚固可靠，零部件齐全； </p>
<p class="indt2">1.3. 吊笼无破损及严重锈蚀现象，结构完好无破损； </p>
<p class="indt2">1.4. 安装质量符合有关规定，有主管部门验收合格签证。 </p>
<p class="indt2">2. 电气及安全装置 </p>
<p class="indt2">2.1. 电动机运行平稳、无异响，无超温发热现象； </p>
<p class="indt2">2.2. 电气线路及电气装置完整规范，性能良好，线路无破损，绝缘良好； </p>
<p class="indt2">2.3. 所有安全限位装置，齐全可靠。限速器动作灵敏可靠； </p>
<p class="indt2">2.4. 底部缓冲装置完好，弹簧无疲劳断裂。 </p>
<p class="indt2">3. 起重系统 </p>
<p class="indt2">3.1. 吊笼运行平稳，无异常振动或噪音。 </p>
<p class="indt2">3.2. 零部件配合正常，无严重磨损； </p>
<p class="indt2">3.3. 钢丝绳质量、规格符合规定，绳头、绳卡符合规定。 </p>
<p class="indt2">4. 控制系统 </p>
<p class="indt2">4.1. 制动装置安全可靠，性能良好； </p>
<p class="indt2">4.2. 摩擦片与制动轮间均匀，磨损不超过规定； </p>
<p class="indt2">4.3. 操作指示清晰齐全； </p>
<p class="indt2">4.4. 各种开关、仪表齐全。完好、灵敏、可靠。 </p>
<p class="indt2">5. 润滑及维护 </p>
<p class="indt2">5.1. 润滑装置齐全、完好，油路畅通，减速箱无漏油； </p>
<p class="indt2">5.2. 机械、电气部件清洁、整齐、维护良好。 </p>
<p><strong>（三） 外用电梯安全技术要求</strong></p>
<p class="indt2">1. 施工升降机安全技术要求见附表1：《外用电梯安全技术要求和验收表》 </p>
<p><strong>七、施工升降机安装、使用的安全技术要求</strong></p>
<p><strong>（一） 施工升降机的安全使用和管理 </strong></p>
<p class="indt2">1. 施工企业必须建立健全施工升降机的各类管理制度，落实专职机构和专职管理人员，明确各级安全使用和管理责任制。 </p>
<p class="indt2">2. 驾驶升降机的司机应经有关行政主管部门培训合格的专职人员，司机必须身体健康，严禁无证操作。司机必须熟悉电梯的结构、原理、性能、运行特点和操作规程。 </p>
<p class="indt2">3. 限速器、制动器等安全装置必须由专人管理，并按规定进行调试检查，保持灵敏可靠。 </p>
<p class="indt2">4. 建立和执行定期检查和维修保养制度，每周或每旬对升降机进行全面检查，对查出的隐患按“三定”原则落实整改。整改后须经有关人员复查确认符合安全要求后，方能使用。 </p>
<p class="indt2">5. 新安装或转移工地重新安装以及经过大修后的升降机，在投入使用前，必须经过坠落试验。升降机在使用中每隔三个月，应进行一次防坠落试验。试验程序应按说明书进行了，当试验中梯笼坠落1.2m  制动距离时，应查明原因，并应调整防坠安全器，切实保证不超过1.2m 制动距离。试验后以及正常操作中每发生一次防坠动作，均必须对防坠安全器进行复位。</p>

<p class="indt2">6. 电梯底笼周围2.5m  范围内，必须设置稳固的防护栏杆。各停靠层的运料通道应平整牢固、两侧必须有良好的防护。楼层门应处于常闭状态，其高度应符合规范要求，任何人不得擅自打开或将头伸出门外，当楼层门未关闭时，司机不得开动电梯。 
<p class="indt2">7. 升降机的防坠安全器，在使用中不得任意拆检调整，需要拆检调整时或每用满一年后，均应由生产厂或指定的认可单位进行调整、检修或鉴定。 </p>
<p class="indt2">8. 电梯安装完毕正式投入使用之前，应在首层一定高度的地方架设防护棚。各停靠层通道口处，应安装栏杆或安全门。其他周边各处，应用栏杆和立网等材料封闭。 </p>
<p class="indt2">9. 确保通讯装置的完好，司机应当在确认信号后方能开动升降机。在多层交叉作业，同时使用电梯时，要明确联络信号；作业中无论任何人在任何楼层发出紧急停车信号，司机都应当立即执行。 </p>
<p class="indt2">10. 升降机应按规定单独安装接地保护和避雷装置。 </p>
<p class="indt2">11. 严禁在升降机运行状态下进行维修保养工作。若需维修，必须切断电源并在醒目处挂上“有人检修，禁止合闸”的标志牌，并有专人监护。 </p>
<p class="indt2">12. 在下述情况下严禁使用： </p>
<p class="indt2">12.1. 电动机制动系统不灵活可靠； </p>
<p class="indt2">12.2. 控制元件失灵和控制系统不全； </p>
<p class="indt2">12.3. 导轨架和管架的连接松动； </p>
<p class="indt2">12.4. 视野很差、滑杆结冰以及其他恶劣作业条件； </p>
<p class="indt2">12.5. 站台和安全栏杆不合格； </p>
<p class="indt2">12.6. 钢丝绳卡得不牢或有锈蚀断裂现象； </p>
<p class="indt2">12.7. 限速器不灵； </p>
<p class="indt2">12.8. 润滑不良； </p>
<p class="indt2">12.9. 司机身体不正常； </p>
<p class="indt2">12.10. 风速超过六级风（12m/s）； </p>
<p class="indt2">12.11. 导轨架垂直度不符合要求； </p>
<p class="indt2">12.12. 减速器声音不正常； </p>
<p class="indt2">12.13. 钢丝绳磨损断丝超标； </p>
<p class="indt2">12.14. 限速器未按时检查与重新标定； </p>
<p class="indt2">12.15. 导轨架管壁厚度磨损过大 </p>
<p><strong>（二） 使用过程检查 </strong> </p>
<p class="indt2">1. 使用前的检查 </p>
<p class="indt2">1.1. 金属结构有无开焊和明显变形； </p>
<p class="indt2">1.2. 架体各节点连接螺栓是否紧固； </p>
<p class="indt2">1.3. 附墙架、缆风绳、地锚位置和安装情况； </p>
<p class="indt2">1.4. 架体的安装精度是否符合要求； </p>
<p class="indt2">1.5. 安全防护装置是否灵敏可靠； </p>
<p class="indt2">1.6. 卷扬机的位置是否合理； </p>
<p class="indt2">1.7. 电气设备及操作系统的可靠性； </p>
<p class="indt2">1.8. 信号及通讯装置的使用效果是否良好清晰； </p>
<p class="indt2">1.9. 钢丝绳、滑轮组的固接情况； </p>
<p class="indt2">1.10. 提升机与输电线路的安全距离及防护情况。 </p>
<p class="indt2">2. 日常检查： </p>
<p class="indt2">2.1. 地锚与缆风绳的连接有无松动； </p>
<p class="indt2">2.2. 空载提升吊篮做1 次上下运动，验证是否正常，并同时碰撞限位器和观察安全门是否灵敏完好； </p>
<p class="indt2">2.3. 在定额荷载下，将吊篮提升至地面1-2m 高度时，  检查制动器的可靠性和架体的稳定性； </p>
<p class="indt2">2.4. 安全停靠装置和断绳保护装置的可靠性； </p>
<p class="indt2">2.5. 吊篮运行通道内有无障碍物； </p>
<p class="indt2">2.6. 作业司机的视线或通讯装置的使用效果是否清晰良好。 </p>
<p><strong>（三） 施工升降机使用操作规程 </strong></p>
<p class="indt2">1. 操作人员必须持证上岗，严禁无证人员开机。 </p>
<p class="indt2">2. 作业前重点检查项目应符合下列要求： </p>
<p class="indt2">2.1. 各部结构无变形，连接螺栓无松动； </p>
<p class="indt2">2.2. 导向轮与导轨均接合正常； </p>
<p class="indt2">2.3. 各部钢丝绳固定良好，无异常磨损； </p>
<p class="indt2">2.4. 运行范围内无障碍。 </p>
<p class="indt2">3.启动前，应检查并确认电缆、接地线完整无损，控制开关在零位。电源接通后，应检查并确认电压正常，应测试无漏电现象。应试验并确认各限位装置、梯笼、围护门等处的电器联锁装置良好可靠，电器仪表灵敏有效。启动后，应进行空载升降试验，测定各传动机构制动器的效能，确认正常后，方可开始作业。 </p>
<p class="indt2">4. 司机应做好日常检查工作，即在电梯每班首次运行时，应分别作空载和满载试运行，检查电动机制动效果（点动1m 高度，停2min，里笼无下滑现象），必须从最低层上升，严禁自上而下进行，将梯笼升高离地面1m 处停车，检查制动器的灵敏性和可靠性，确认正常后方可投入使用。 </p>
<p class="indt2">5. 笼内乘人或载物时，应使载荷均匀分布，不得偏重。严禁超载运行。当超载时，起重量限制器应当自动停止提升。 </p>
<p class="indt2">6. 载人外用电梯必须设置平衡重，严禁未加配重载人。 </p>
<p class="indt2">7. 司机开车时应思想集中，随时注意信号，遇事故或危险时应立即停车。操作人员应根据指挥信号操作，作业前应鸣声示意。在升降机未切断总电源开关前，操作人员不得离开操作岗位。 </p>
<p class="indt2">8. 当升降机运行中发现有异常情况时，应立即停机并采取有效措施将梯笼降到底层，排除故障后方可继续运行。在运行中发现电气失控时，应立即按下急停按钮；在未排除故障前，不得打开急停按钮。 </p>
<p class="indt2">9. 升降机在大雨、大雾、六级以上大风以及导轨架、电缆结冰时，必须停止运行，并将梯笼降到底层，切断电源。暴风雨后，应对升降机各有关安全装置进行一次检查，确认正常后方可运行。 </p>
<p class="indt2">10. 升降机运行到最上层或最下层时，严禁用行程限位开关作为停止运行的控制开关。 </p>
<p class="indt2">11. 司机因故离开吊笼及下班时，应将吊笼降至地面，各控制开关扳至零位，切断总电源并锁上电箱门，以防止其他无证人员擅自开动吊笼，并关好梯门和围护门。 </p>
<p class="indt2">12. 当升降机在运行中由于断电或其他原因而中途停止时，可进行手动下降，将制动电磁铁手动释放拉手缓缓向外拉出，使梯笼缓慢地向下滑行。梯笼下滑时，不得超过额定运行速度，手动下降必须由专业维修人员进行操纵。 </p>
<p class="indt2">13. 闭合主电源前或作业中突然断电时，应将所有开关扳回零位。在重新恢复作业前，应在确认提升机动作正常后方可继续使用。 </p>
<p class="indt2">14. 当升降机运行中发现异常情况时，应立即停机并采取有效措施将梯笼降到底层，排除故障后方可继续运行。在运行中发现电气失控时，应立即按下急停按钮；在未排除故障前，不得打开急停按钮。发现安全装置、通讯装置失灵时，应立即停机修复。作业中不得随意使用极限限位装置。 </p>
<p class="indt2">15. 使用中要经常检查钢丝绳、滑轮工作情况。如发现磨损严重，必须按照有关规定及时更换。 </p>
<p class="indt2">16. 定期进行保养维修，确保机械运转正常。一般定为：一级保养160h；二级保养480h；中修1440h；大修5760h。 </p>
<p class="indt2">17. 司机每班作业前检查及作业情况应做好记录，多班作业应履行交接班记录。 </p>
<p><strong>（四） 外用电梯安安全注意事项</strong></p>
<p class="indt2">1. 进入现场必须遵守安全生产六大纪律。 </p>
<p class="indt2">2. 安装人员必须按高处作业要求，挂好安全带。 </p>
<p class="indt2">3. 安装人员不准穿硬底、高跟鞋，衣着要灵便。 </p>
<p class="indt2">4. 安装作业时，要设置安全警戒区域，派专人警戒，严禁无关人员进入； </p>
<p class="indt2">5. 雨天和风速大于12m/s  时停止安装或拆除作业； </p>
<p class="indt2">6. 吊笼上行前必须将围栏安装完毕，以防无关人员进入； </p>
<p class="indt2">7. 安装过程中吊笼上下行时必须将加节按钮盒移至吊笼顶部操作，严禁在吊笼内开行； </p>
<p class="indt2">8. 用塔吊配合安装时，指挥信号必须简洁、明了清晰； </p>
<p class="indt2">9. 吊笼运行时，人的各个部位严禁伸出吊笼护栏； </p>
<p class="indt2">10. 安装作业过程中吊笼荷载严禁超过工作载重量； </p>
<p class="indt2">11. 接线由电工完成； </p>
<p class="indt2">12. 所有作业人员必须戴好安全帽，必要时必须系好保险带，严禁穿硬底鞋作业； </p>
<p class="indt2">13. 安装附墙架，连系梁时，操作人员必须系好保险带； </p>
<p class="indt2">14. 严禁酒后从事安装作业； </p>
<p class="indt2">15. 所有作业人员必须一切行动听指挥，吊笼开行由专职司机操作； </p>
<p class="indt2">16. 安装前要检查吊索、吊环、吊钩等用具，不准带病操作。 </p>
<p class="indt2">17. 安装过程中，要有专人统一指挥，并熟悉图纸、安装程序及检查要点。 </p>
<p class="indt2">18. 装上两节立柱后，要在其两个方向调整垂直度，并把平衡重、梯笼就位。 </p>
<p class="indt2">19. 调试梯笼。调试导向滚轮与导轨间隙，以电梯不能自动下滑为限，并在离地面10m 高度以内，做上下运行试验。 </p>
<p class="indt2">20.第一次安装34米，在附着的情况下第一道应在12米以内，设一道附墙连接，连接件必须紧固，随紧固随调整立柱的垂直度，每10m 偏差不大于4mm。顶部悬臂部分不得超过说明书规定的高度。 </p>
<p class="indt2">21.安装完毕进行整机运行调试，荷载试验按照《建筑机械技术试验规程》进行，合格后方能投入使用。 </p>
<p class="indt2">22. 安装附墙杆，以及各层通道架设铺板时，梯笼应随之停置在作业层的高度，不得在拆除过程中同时上下运行。 </p>
  </div>	
</div>
</center>
</c:if>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${InstallContingencyPlan}">
<c:forEach var="contingencyPlan" items="${installContingencyPlans}" >
<center>
<div class="main_detail">
 <div class="tj_detail">
   <p class="tj_title">建筑起重机械生产安全事故应急救援预案</p>
<p><strong>第一章、编制依据与工程项目概况</strong></p>
<p><strong>一、编制依据 </strong></p>
<p class="indt2">1、《建筑法》 </p>
<p class="indt2">2、《安全生产法》 </p>
<p class="indt2">3、《关于特大安全事故行政责任追究的规定》 </p>
<p class="indt2">4、《福建省安全生产条例》 </p>
<p class="indt2">5、《特种设备安全监察条例》 </p>
<p class="indt2">6、《建筑起重机械安全监督管理规定》（建设部令第166号） </p>
<p class="indt2">7、其它法律、法规。</p> 
<p><strong>二、工程规模和建筑起重机械概况 </strong></p>
<p class="indt2">（一）工程规模</p>
<p class="indt2">拟建设<u>&nbsp;&nbsp;<strong>${contingencyPlan.project.projectName}</strong>&nbsp;&nbsp;</u>一幢</p>
<p class="indt2">（二）建筑起重机械概况 </p>
<p class="indt2">根据本工程主体工程量和装饰工程量的大小，本工程拟设置一台<u>&nbsp;&nbsp;<strong>${contingencyPlan.equipment.equipGenericName}</strong>&nbsp;&nbsp; </u>，屋面高度为<u>&nbsp;&nbsp;<strong>${contingencyPlan.overallHeight}</strong>&nbsp;&nbsp;</u>米，<u>&nbsp;&nbsp;<strong>${contingencyPlan.equipment.equipGenericName}</strong>&nbsp;&nbsp;</u>设计安装总高度为<u>&nbsp;&nbsp;<strong>${contingencyPlan.finalHeight}</strong>&nbsp;&nbsp;</u>米。</p>
<br>
<p><strong>第二章 编制目的 </strong></p>
<p class="indt2">为加强对起重机安全事故的防范，及时做好安全事故发生后的救援处置工作，最大限度地减少事故造成的损失，维护正常的社会秩序和工作秩序，根据《特种设备安全监察条例》的要求，结合本工程实际，特制定本单位起重机安全事故应急救援预案。 </p>
<p><strong>第三章 预案的适用范围 </strong></p>
<p class="indt2">本预案所称安全事故，是指在本工程起重机使用中发生的，造成或可能造成人身安全和财物损失的事故，事故类别包括： </p>
<p class="indt2">1、因检查维修出现问题而造成事故。 </p>
<p class="indt2">2、操作不当；违章违纪蛮干，不良操作习惯；判断操作失误，指挥信号不明确，安全意识差和操作技能低下是引发的事故。 </p>
<p><strong>第四章&nbsp;应急救援指挥机构的设置 </strong></p>
<p class="indt2">（一）指挥机构的设置和职责 </p>
<p class="indt2">1、指挥机构的设置 </p>
<p class="indt2">项目部成立施工现场安全生产事故应急救援指挥领导小组，组长由项目经理担任，副组长为项目副经理担任，成员由技术负责人、安全员、施工员等各承包组组长等人员组成。 </p>
<p align="center" style="padding:10px;"><img src="../pages/print/images/yingj.jpg" /></p>
<p class="indt2">现场指挥：项目部项目经理 </p>
<p class="indt2">工程应急反应小组：项目部管理人员、各班组长成员、义务消防队成员通讯负责人。 </p>
<p class="indt2">2、指挥机构的职责 </p>
<p class="indt2">在应急情况下，值班人员组成最初应急组织。值班主管一旦发现或接到紧急情况通知，应马上确定应急级别，报告现场指挥或应急总指挥，调动应急反应小组。在此阶段的指挥和控制通过现场指挥中心来执行，作为应急指挥中心，根据应急总指挥（项目经理）的指示，及时通报公司管理层或指挥联络外界。事故发生初期，先由值班主管担任初期应急岗位指挥，直到按应急预案规定的负责人到岗位后再交接岗位，正式启动应急预案。 </p>
<p class="indt2">（二）项目应急救援小组名单 </p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" align="center">
  <tr>
    <td width="10%" align="center"><strong>序号</strong></td>
    <td width="15%" align="center"><strong>姓名</strong></td>
    <td width="20%" align="center"><strong>职务</strong></td>
    <td align="center"><strong>应急救援职务</strong></td>
    <td width="20%" align="center"><strong>电话</strong></td>
  </tr>
  <c:forEach var="element" items="${contingencyPlan.contingencyWorkerSet}" varStatus="status" >
  <tr>
    <td align="center">${status.count}</td>
    <td align="center">${element.name}</td>
    <td align="center">${element.duties}</td>
    <td align="center">${element.contingencyDuties}</td>
    <td align="center">${element.phone}</td>
  </tr>
  </c:forEach>
</table>
<p class="indt2">（三）应急救援专业队伍任务 </p>
<p class="indt2">（1）事故发生后立即组织营救受害人员，组织撤离或者采取其他措施保护危害区域内的其他人员。抢救受害人是应急救援的首要任务，在应急救援行动中，要求做到快速、有序、有效地实施现场急救与安全转送伤员降低伤率，减少事故的损失。 </p>
<p class="indt2">（2）指导群众防护，防止事态发展，组织群众安全撤离现场。 </p>
<p class="indt2">（3）迅速控制危险源，对事故造成的危害进行监测、测定事故危害区域、危害性质及危害程度。</p>
<p class="indt2">（4）查清事故原因，查明人员伤亡情况，协助公司等上级部门对事故调查。 </p>
<p class="indt2">（5）做好现场清洁，减少、消除事故灾痕。 </p>
<p><strong>第五章&nbsp;应急救援报警和联络方式 </strong></p>
<p class="indt2">根据事故规模危害程度紧急情况确定报警方式，包括城市公用特殊通讯电话：报警110；火警119；急救120；交警122；气象站121。 </p>
<p class="indt2">项目部应急救援通讯网络包括本工程应急办公电话:<u><strong>&nbsp;&nbsp;${contingencyPlan.contingencyPhone}&nbsp;&nbsp;</strong> </u>，明确联络方式：应急救援联络方式有： </p>
<p class="indt2">（1）电话； </p>
<p class="indt2">（2）应急机构人员手机； </p>
<p class="indt2">（3）场内广播。 </p>
<p><strong>第六章&nbsp;事故的紧急处置措施</strong></strong></p>
<p class="indt2">事故处理程序：</p>
<p class="indt2">发现事故→发出警报→尽快切断电源→救治伤者→通知应急小组→排除险情→查明原因→处理善后</p>
<p class="indt2">1、一旦事故发生，不论事故现场何种情况，发现事故人员必须第一时间发出警报（大声呼叫），由机械操作人员切断电源，通知周边作业人员全部停止作业，撤离到安全地带。并用手机通知项目应急总指挥和联络员。 </p>
<p class="indt2">2、应急总指挥接到事故报告后，应立即召集应急机构人员，带齐必要工具，到事故现场集中。</p>
<p class="indt2">3、应急救援人员集中后，应全面听从应急总指挥的安排，合理分工，一方面排除险情，一方面组织救援人员对伤员实施救护，并根据伤情，实施救治或转送医院<u><strong>（武夷山市市立医院）</strong></u>。 </p>
<p class="indt2">4、险情排除，人员得到有效救护后，应组织对事故进行调查，按事故处理“四不放过”原则进行处理，并按事故类别上报上级相关部门。 </p>
<p><strong>第七章&nbsp;应急保障条件 </strong></p>
<p class="indt2">1、抢险队伍 </p>
<p class="indt2">项目部由项目管理人员组成应急救援小组，由项目经理任总指挥。 </p>
<p class="indt2">2、应急救援装备 </p>
<p class="indt2">项目部应急救援装备包括值班电话、报警电话、灭火器材、消防斧、防毒面具、紧急照明灯具、应急药箱及担架等。 </p>
<p class="indt2">3、应急救援药品 </p>
<p class="indt2">外用药品：通常有双氧水、雷佛奴尔水、红药水、碘酒、消毒棉签、药棉、纱布、胶布、绷带、创可贴、跌打万花油、眼膏、碘胺结晶、烫火膏、清凉油或驱风油、三角巾、急救包等。 </p>
<p class="indt2">4、内服药品：人丹、十滴水、保济丸或藿香正气丸、一般退烧药品等。</p>
<p><strong>第八章&nbsp;应急救援措施</strong> </p>
<p class="indt2"><strong>1、工作原则 </strong></p>
<p class="indt2">事故发生后，救援工作应有序进行，重、特大事故应急救援工作遵循“保护人员安全优先，防止和控制事故蔓延、扩大为主；统一领导指挥、人员分工、分级负责、综合协调、快速高效、现场自救与上级或社会救援相结合”的原则。  </p>
<p class="indt2">人员急救步骤：急救是对伤员提供紧急的监护和救治，给伤员最大的生存机会，急救一定要遵循下述四个步骤： </p>
<p class="indt2">（1）调查事故现场，调查时要确保对调查人、伤病员或其他人无任何危险，迅速使伤病员脱离危险场所，尤其在工地、工厂大型事故现场，更是如此。  </p>
<p class="indt2">（2）初步检查伤病员，判断其神志、气管、呼吸循环是否有问题，必要时立即进行现场急救和监护，使伤病员保持呼吸道通畅，视情况采取有效的止血、防止休克、包扎伤口、固定、保存好断离的器官或组织、预防感染、止痛等措施。  </p>
<p class="indt2">（3）呼救，应请人去呼叫救护车，你可继续施救，一直要坚持到救护人员或其他施救者到达现场接替为止。此时还应反映伤病员的伤病情和简单的救治过程。  </p>
<p class="indt2">（4）如果没有发现危及伤病员体征，可作第二次检查，以免遗漏其他的损伤、骨折和病变。这样有利于现场施行必要的急救和稳定病情，降低并发症和伤残率。  </p>
<p class="indt2"><strong>2、起重机械伤害事故的急救措施 </strong></p>
<p class="indt2">当机械性伤害发生时，应尽快将伤员搬支安全地点进行包扎、止血、固定伤肢，应急以后及时送医院治疗。 </p>
<p class="indt2">（1）止血 </p>
<p class="indt2">①出血的种类 </p>
<p class="indt2">动脉出血：血色鲜红，出血时像小喷泉一样喷出，时间捎久，就会有生命危险； </p>
<p class="indt2">静脉出血：血色暗红，出血时慢慢流出，时间久了也有危险； </p>
<p class="indt2">毛细管出血：血色鲜红，出血时血液从整个伤面渗出，常自动凝固。 </p>
<p class="indt2">②止血方法 </p>
<p class="indt2">止血方法一般有四种，即加压包扎止血法、指压止血法、填塞止血法和止血带止血法。 </p>
<p class="indt2">加压包扎止血法：用止血纱布或干净毛巾、布料折成比伤口稍大的垫子盖住伤口，然后用三角巾或绷带加压包扎，就可以达到止血的目的。 </p>
<p class="indt2">指压止血法：用手指或掌、掌把出血的血管上部（近心脏的一头）用力压向其下面的骨头，阻断血液来源，达到临时止血的目的。 </p>
<p class="indt2">堵塞止血法：把消毒过的棉花或纱布堵塞在伤口处，在用加压法包扎，在此适用于腋窝、肩部、大腿部伤口的止血。 </p>
<p class="indt2">止血带止血法：止血带止血适用于大血管出血，尤其是动脉出血，当采用加压包扎止血法不可以有效地止住出血时可用此法，常用橡皮管作止血带，也可用绷带、三角巾、布带等代替，使用止血带时要记住六个字：快、准、垫、上、适、放。 </p>
<p class="indt2">快：动作快，抢时间； </p>
<p class="indt2">准：看准出血点，准确包扎止带； </p>
<p class="indt2">垫：垫上垫子，不要直接扎在皮肤上； </p>
<p class="indt2">上：扎在伤口上方，接近伤出口，但禁扎于上臂中段； </p>
<p class="indt2">适：松紧适宜，以出血停止，摸不到远端脉搏为合适； </p>
<p class="indt2">放：每隔半小时放松2～3分钟，松止血带时，应同时用指压法压迫止血，缓缓放松。 </p>
<p class="indt2">（2）包扎 </p>
<p class="indt2">包扎的目的：保护伤口、减少感染、压迫止血、固定骨折、扶托伤肤、减轻疼痛。 </p>
<p class="indt2">①扎注意事项：动作要轻而熟练，不可碰撞伤口。包扎部位要准确接触、覆盖伤口的敷料要干净，最好经过消毒。包扎要牢固，紧松合适，打结应避开伤口。 </p>
<p class="indt2">②扎用器材：有条件时可用三角巾，四头带和专用绷带等包扎救护材料。当无专用材料时，可灵活的采用身边干净的衣服、毛巾等进行包扎。 </p>
<p ><strong>第九章 起重机械安全事故预防措施 </strong></p>
<p class="indt2">1、建筑起重机械必须按建筑起重机械备案登记办法执行，并办理产权登记、安装告知和使用登记等相关手续，各种防护措施应齐全、有效，并经检测、验收合格后再投入使用。 </p>
<p class="indt2">2、项目部必须制订起重机械操作规程和设备管理制度，并严格执行。 </p>
<p class="indt2">3、建筑起重机械应配备持建筑特种作业操作工上岗证的人员，并由专人负责操作。 </p>
<p class="indt2">4、每班作业前，应检查钢丝绳、螺栓紧固、安全装置等，确认安全可靠，方准操作。</p>
<p class="indt2">5、作业时应严格遵守操作规范，严禁违规作业、严禁超载，操作时不准擅离岗位。工作中要听从指挥信号，信号不明或可能引起事故时，应停止操作，待弄清情况后方可继续作业。</p>
<p class="indt2">6、作业后应切断电源，锁紧电源控制箱，防止无关人员随意操作。 </p>
<p class="indt2">7、起重机械应定期保养、定期检查，确保机械完好、防护设施齐全有效，杜绝带病运作。</p>
 
 </div>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${InstallTechnicalDisclosure}">
<c:forEach var="technicalDisclosure" items="${installTechnicalDisclosures}" >
<center>
<div class="main_detail">
 <div class="wrod_title">建筑起重机械安全技术交底书</div>
<p align="right">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;
</p>
<p align="left"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="jsjtable">
  <tr>
    <td width="100" height="36" align="center"><strong>工程名称</strong></td>
    <td width="220" align="left">${technicalDisclosure.equipFlow.equipDiary.projectName}</td>
    <td width="100" align="center" ><strong>施工单位</strong></td>
    <td width="220" align="left">${technicalDisclosure.constructeEntname}</td>
    </tr>
  <tr>
    <td height="36" align="center"><strong>施工地点</strong></td>
    <td align="left">${technicalDisclosure.equipFlow.equipDiary.address}</td>
    <td align="center"><strong>交底项目</strong></td>
    <td align="left">${technicalDisclosure.disclosureItem}</td>
    </tr>
  <tr>
    <td height="36" colspan="4" align="center">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="100" height="36" align="center" style="border-left-style:none;border-bottom-style:none;"><strong>机械名称</strong></td>
        <td width="120" align="left" style="border-bottom-style:none;">${technicalDisclosure.equipFlow.equipDiary.equipGenericName}</td>
        <td width="100" align="center" style="border-bottom-style:none;"><strong>规格型号</strong></td>
        <td width="59" style="border-bottom-style:none;">${technicalDisclosure.equipFlow.equipDiary.equipSpecificName}</td>
        <td width="40" style="border-bottom-style:none;"><strong>高度</strong></td>
        <td width="98" style="border-bottom-style:none;">${technicalDisclosure.height}&nbsp;</td>
        <td width="40" style="border-bottom-style:none;"><strong>臂长</strong></td>
        <td width="75" style="border-bottom-style:none;">${technicalDisclosure.brachium}&nbsp;</td>
      </tr>
    </table></td>
    </tr>
  <tr>
    <td height="36" align="center" width="100"><strong>起重设备配备</strong></td>
    <td width="220" align="left">${technicalDisclosure.erectingEquipart}</td>
    <td width="100" align="center"><strong>运输设备配备</strong></td>
    <td>${technicalDisclosure.deliveryEquipart}</td>
    </tr>
  <tr>
    <td height="300" colspan="4" align="center" valign="top" style="padding-top:5px;"><p align="center"><strong>其他交底内容</strong><strong></strong></p>${technicalDisclosure.replenishContents}</td>
  </tr>
  <tr>
    <td height="200" colspan="4" align="center" valign="top" style="padding-top:5px;"><strong>安全技术交底内容</strong></br>${technicalDisclosure.contents}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="jsjtable" style="border-top-style:none;">
  <tr>
    <td width="150" height="36" align="center">接受人（签字）</td>
    <td width="200">&nbsp;</td>
    <td align="center" width="120">交底人（签字）</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="center">关联人员（签字）</td>
    <td colspan="3">&nbsp;</td>
    </tr>
  <tr>
    <td height="36" align="center">交底日期</td>
    <td colspan="3">${technicalDisclosure.disclosureDate}</td>
    </tr>
</table>
</p>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${InstallVerifySelf}">
<c:forEach var="verifySelf" items="${installVerifySelfs}" >
<c:if test="${verifySelf.equipFlow.equipDiary.equipGeneric == 'T'}">
<center>
<div class="main_detail">
<p style='text-align:center'><span class="wrod_title"><font color="#FF0000">${verifySelf.inEntName}</font></span></p>
<p style='text-align:center'><span class="wrod_title">塔式起重机安装自检记录表</span></p>
<br />
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="13%" height="36" align="center"><strong>工程名称</strong></td>
    <td width="21%" align="left">${verifySelf.equipFlow.equipDiary.projectName}</td>
    <td width="13%" align="center" ><strong>设备型号</strong></td>
    <td width="20%" align="left">${verifySelf.equipFlow.equipDiary.equipSpecificName}</td>
    <td width="13%" align="center"><strong>出厂编号</strong></td>
    <td width="20%" align="left">${verifySelf.equipFlow.equipDiary.exwSerial}</td>
  </tr>
  <tr>
    <td align="center"><strong>生产厂家</strong></td>
    <td align="left">${verifySelf.equipFlow.equipDiary.equipVender}</td>
    <td align="center"><strong>出厂日期</strong></td>
    <td align="left">${verifySelf.equipFlow.equipDiary.exwDate}</td>
    <td align="center" style="line-height:24px;"><strong>设计安装<br>
      高度</strong></td>
    <td align="left">${verifySelf.equipFlow.equipInstall.installHeight}</td>
  </tr>
  <tr>
    <td align="center"><strong>安装单位</strong></td>
    <td align="left">${verifySelf.inEntName}</td>
    <td align="center" style="line-height:24px;"><strong>资质证书<br />
      编号</strong></td>
    <td align="left">${verifySelf.inEntCertNum}</td>
    <td align="center"><strong>检查高度</strong></td>
    <td align="left">${verifySelf.maxHeight}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="zijian_table" style="border-top-style:none;">
  <tr>
    <th width="5%" height="36" align="center">序<br />号</th>
    <th width="15%">项目</th>
    <th width="55%">检查内容</th>
    <th width="11%">检查结果</th>
    <th width="14%">检查人</th>
  </tr>
  <c:forEach var="element" items="${verifyStandards}" varStatus="status" >
  <c:forEach var="standard" items="${element.value }" varStatus="standardstatus">
  <tr>
  <c:if test="${standardstatus.count == 1 }">
    <td class="tdp" rowspan="${fn:length(element.value)}">&nbsp;${status.count}</td>
	<td class="tdp" rowspan="${fn:length(element.value)}" align="center">&nbsp;${element.key}</td>
  </c:if>
	<td class="tdp">${standardstatus.count}、${standard.demandDes}</td>
	<td class="tdp" align="center">&nbsp;${standard.standardResult}</td>
	<td class="tdp" align="center">&nbsp;${standard.remark}</td>
  </tr>
  </c:forEach>
  </c:forEach>
  <tr>
    <td height="45" colspan="5" align="left" style="border-bottom-style:none;"><p>安装单位或建机一体化企业自检意见： </p></td>
    </tr>
	 <tr>
    <td height="45" colspan="5" align="right" style="border-top-style:none;">自检负责人（签字）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</td>
    </tr>
  <tr>
    <td colspan="2" align="center" style="padding:10px 5px;">参加 <br />
      自检 <br />
      人员<br />
      签字</td>
    <td colspan="3" align="left"><p>安装单位或建机一体化企业技术负责人（签字）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
      安装单位或建机一体化企业安全员、机管员（签字）：<br />
      安装班组长（签字）： <br />
      机组人员（签字）：</p></td>
    </tr>
</table>
</p>
</div>
</center>
</c:if>
<c:if test="${verifySelf.equipFlow.equipDiary.equipGeneric == 'S'}">
<center>
<div class="main_detail">
<p style='text-align:center'><span class="wrod_title"><font color="#FF0000">${verifySelf.inEntName}（安装单位）</font></span></p>
<p style='text-align:center'><span class="wrod_title">施工升降机安装自检记录表</span></p>
<br />
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="13%" align="center"><strong>工程名称</strong></td>
    <td width="21%" align="left">${verifySelf.equipFlow.equipDiary.projectName}</td>
    <td width="13%" align="center" ><strong>设备型号</strong></td>
    <td width="20%" align="left">${verifySelf.equipFlow.equipDiary.equipSpecificName}</td>
    <td width="13%" align="center" style="line-height:24px;"><strong>备案编号/出厂编号</strong></td>
    <td width="20%" align="left">${verifySelf.equipFlow.equipDiary.recordId}/${verifySelf.equipFlow.equipDiary.exwSerial}</td>
  </tr>
  <tr>
    <td align="center"><strong>生产厂家</strong></td>
    <td align="left">${verifySelf.equipFlow.equipDiary.equipVender}</td>
    <td align="center"><strong>出厂日期</strong></td>
    <td align="left">${verifySelf.equipFlow.equipDiary.exwDate}</td>
    <td align="center" style="line-height:24px;"><strong>设计安装<br />
      高度（米）</strong></td>
    <td align="left">${verifySelf.equipFlow.equipInstall.installHeight}</td>
  </tr>
  <tr>
    <td align="center"><strong>安装单位</strong></td>
    <td align="left">${verifySelf.inEntName}</td>
    <td align="center" style="line-height:24px;"><strong>资质证书<br />
      编号</strong></td>
    <td align="left">${verifySelf.inEntCertNum}</td>
    <td align="center" style="line-height:24px;"><strong>检查高度<br />
      （米）</strong></td>
    <td align="left">${verifySelf.maxHeight}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="sjj_table" style="border-top-style:none;">
  <tr>
    <th width="5%" height="36" align="center">序<br />号</th>
    <th width="15%">项目</th>
    <th width="55%">检查内容</th>
    <th width="11%">检查结果</th>
    <th width="14%">检查人</th>
  </tr>
  <c:forEach var="element" items="${verifyStandards}" varStatus="status" >
  <c:forEach var="standard" items="${element.value }" varStatus="standardstatus">
  <tr>
  <c:if test="${standardstatus.count == 1 }">
    <td class="tdp" rowspan="${fn:length(element.value)}">&nbsp;${status.count}</td>
	<td class="tdp" rowspan="${fn:length(element.value)}" align="center">&nbsp;${element.key}</td>
  </c:if>
	<td class="tdp">${standardstatus.count}、${standard.demandDes}</td>
	<td class="tdp" align="center">&nbsp;${standard.standardResult}</td>
	<td class="tdp" align="center">&nbsp;${standard.remark}</td>
  </tr>
  </c:forEach>
  </c:forEach>
  <tr>
    <td height="45" colspan="5" align="left" style="border-bottom-style:none;"><p>安装单位或建机一体化企业自检意见： </p></td>
    </tr>
	 <tr>
    <td height="45" colspan="5" align="right" style="border-top-style:none;">自检负责人（签字）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</td>
    </tr>
  <tr>
    <td colspan="2" align="center" style="padding:10px 5px;">参加 <br />
      自检 <br />
      人员<br />
      签字</td>
    <td colspan="3" align="left"><p>安装单位或建机一体化企业技术负责人（签字）：<br />
      安装单位或建机一体化企业安全员、机管员（签字）：<br />
      安装班组长（签字）：<br />
      机长（签字）： <br />
    </p></td>
    </tr>
</table>
</p>
</div>
</center>
</c:if>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${InstallEquipVerify}">
<c:forEach var="equipVerify" items="${installEquipVerifys}" >
<center>
<div class="main_detail">
<p style='text-align:center'><span class="wrod_title">施工升降机/塔式起重机安装验收表</span></p>
<br />
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="13%" height="36" align="center"><strong>工程名称</strong></td>
    <td width="21%" align="left">${equipVerify.equipFlow.equipDiary.projectName}</td>
    <td width="13%" align="center" ><strong>设备型号</strong></td>
    <td width="20%" align="left">${equipVerify.equipFlow.equipDiary.equipSpecificName}</td>
    <td width="13%" align="center" style="line-height:24px;"><strong>备案编号</strong></td>
    <td width="20%" align="left">${equipVerify.equipFlow.equipDiary.recordId}</td>
  </tr>
  <tr>
    <td align="center"><strong>生产厂家</strong></td>
    <td align="left">${equipVerify.equipFlow.equipDiary.equipVender}</td>
    <td align="center"><strong>出厂日期</strong></td>
    <td align="left">${equipVerify.equipFlow.equipDiary.exwDate}</td>
    <td align="center" style="line-height:24px;"><strong>设计安装<br />      
      高度</strong></td>
    <td align="left">${equipVerify.equipFlow.equipInstall.installHeight}</td>
  </tr>
    <tr>
    <td align="center"><strong>安装单位</strong></td>
    <td align="left">${equipVerify.inEntName}</td>
    <td align="center"><span style="line-height:24px;"><strong>资质证书<br />
编号</strong></span></td>
    <td align="left">&nbsp;</td>
    <td align="center" style="line-height:24px;"><strong>验收高度</strong></td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td align="center"><strong>检测单位</strong></td>
    <td align="left">${equipVerify.supEntName}</td>
    <td align="center" style="line-height:24px;"><strong>检测报告<br />
      编号</strong></td>
    <td align="left">${equipVerify.verifySerial}</td>
    <td align="center" style="line-height:24px;"><strong>检验结论</strong></td>
    <td align="left">${equipVerify.verifyResult}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="sjj_table" style="border-top-style:none;">
  <tr>
    <th width="5%" height="36" align="center">序<br>号</th>
    <th width="15%">项目</th>
    <th width="55%">验收内容</th>
    <th width="12%">验收结果</th>
    <th width="13%"><span style="line-height:24px;">结论</span></th>
  </tr>
  <c:forEach var="element" items="${verifyStandards}" varStatus="status" >
  <c:forEach var="standard" items="${element.value }" varStatus="standardstatus">
  <tr>
  <c:if test="${standardstatus.count == 1 }">
    <td class="tdp" rowspan="${fn:length(element.value)}">&nbsp;${status.count}</td>
	<td class="tdp" rowspan="${fn:length(element.value)}" align="center">&nbsp;${element.key}</td>
  </c:if>
	<td class="tdp">${standardstatus.count}、${standard.demandDes}</td>
	<td class="tdp" align="center">&nbsp;${standard.standardResult}</td>
	<td class="tdp" align="center">&nbsp;${standard.remark}</td>
  </tr>
  </c:forEach>
  </c:forEach>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td align="center" width="100" style="padding:40pt 0;">安装<br />
      单位<br />
      意见</td>
    <td width="220"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td align="left" style="line-height:40px;">&nbsp;安装单位签字：<br />
          （盖章）</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
    </table></td>
    <td width="99" align="center">出租<br />
      单位<br />
      意见</td>
    <td width="220"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td align="left" style="line-height:40px;">&nbsp;出租单位签字：<br />
          （盖章）</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align="center" style="padding:40pt 0;">使用<br />
      单位<br />
      意见</td>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td style="line-height:40px;">&nbsp;使用单位签字：<br />
          （盖章）</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
    </table></td>
    <td align="center">监理<br />
      单位<br />
      意见<br /></td>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td style="line-height:40px;">&nbsp;监理单位签字：<br />
          （盖章）</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>
</p>
<p style="text-align:left; line-height:24px; padding-top:5px;">本安装验收表一式伍份（安装单位、租赁单位、使用单位、监理单位、建设局各一份）</p>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${EquipmentEmploy && equipEmploy != null}">
<center>
<div class="main_detail">
<p style='text-align:center'><span class="wrod_title">建筑起重机械使用登记申请表</span></p><br />

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
  <tr>
    <td align="left">申请单位（盖章）：${equipEmploy.department.depName}</td>
    <td align="left">申请人：${equipEmploy.principal}</td>
    <td align="left">电话： ${equipEmploy.principalTel}</td>
    <td align="right">${equipEmploy.providedDate}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table">
  <tr>
    <td height="32"><strong>工程名称</strong></td>
    <td colspan="3" align="left"><span style="line-height:20px; padding-top:5px;">${equipEmploy.equipFlow.equipDiary.projectName}</span></td>
    <td height="32" ><strong>使用地点</strong></td>
    <td colspan="2" align="left">${equipEmploy.equipFlow.equipDiary.address}</td>
    </tr>
  <tr>
    <td height="32"><strong>使用单位</strong></td>
    <td colspan="3" align="left">&nbsp;</td>
    <td height="32"><strong>项目经理</strong></td>
    <td colspan="2" align="left">${equipEmploy.principal}</td>
    </tr>
  <tr>
    <td width="13%" height="32"><strong>设备名称</strong></td>
    <td width="14%" align="left">${equipEmploy.equipFlow.equipDiary.equipGenericName}</td>
    <td width="11%">规格型号</td>
    <td width="12%" align="left">${equipEmploy.equipFlow.equipDiary.equipSpecificName}</td>
    <td width="13%" rowspan="2"><strong>设备高度<br />
      （米）</strong></td>
    <td width="12%">首次安装</td>
    <td align="left">${equipEmploy.equipFlow.equipInstall.installHeight}</td>
  </tr>
  <tr>
    <td height="32"><strong>制造厂家</strong></td>
    <td colspan="3" align="left">${equipEmploy.equipFlow.equipDiary.equipVender}</td>
    <td>最终使用</td>
    <td align="left">${equipEmploy.equipFlow.equipInstall.installHeight}</td>
  </tr>
  <tr>
    <td height="32"><strong>产权单位</strong></td>
    <td colspan="3" align="left">${equipEmploy.equipFlow.equipDiary.propertyName}</td>
    <td height="32"><strong>备案编号</strong></td>
    <td colspan="2" align="left">${equipEmploy.equipFlow.equipDiary.recordId}</td>
    </tr>
  <tr>
    <td height="32"><strong>安装单位</strong></td>
    <td colspan="3" align="left">&nbsp;</td>
    <td height="32"><strong>资质等级</strong></td>
    <td colspan="2" align="left">&nbsp;</td>
    </tr>
  <tr>
    <td><strong>现场安装<br />
      负责人</strong></td>
    <td colspan="3" align="left">${equipEmploy.equipFlow.equipInstall.principal}</td>
    <td><strong>安装<br />
      起止时间</strong></td>
    <td colspan="2" align="left"><fmt:formatDate value="${equipEmploy.equipFlow.equipInstall.startinDate}" type="date"/>/<fmt:formatDate value="${equipEmploy.equipFlow.equipInstall.endinDate}" type="date"/></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table" style="border-top-style:none;">
  <tr>
    <td width="13%" align="center"><strong>检测机构</strong></td>
    <td width="21%" align="left" style="line-height:20px;padding-top:5px;">${equipDetect.detectEntName}</td>
    <td width="13%" align="center" style="line-height:20px;"><strong>资质证书<br />编号</strong></td>
    <td width="20%" align="left">&nbsp;</td>
    <td width="13%" align="center" style="line-height:20px;"><strong>项目检测<br />
      负责人</strong></td>
    <td width="20%" align="left">${equipDetect.detector}</td>
  </tr>
  <tr>
    <td align="center" style="line-height:20px;"><strong>检测报告 <br />
      编号</strong></td>
    <td align="left">${equipDetect.detectSerial}</td>
    <td align="center" style="line-height:20px;"><strong>检测报告<br />日期</strong></td>
    <td align="left">${equipDetect.detectDate}</td>
    <td align="center"><strong>检测结论</strong></td>
    <td align="left">${equipDetect.detectResult}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="jsjtable" style="border-top-style:none;">
  <tr>
    <td width="10%" align="center" style="line-height:24pt;">安装及 <br />
      使用作 <br />业人员</td>
    <td width="45%" align="left" valign="top" style="padding:0px; border-left-style:none; border-bottom-style:none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
		  <tr>
			<td width="30%" height="32" align="center"><strong>姓名</strong></td>
			<td width="30%" align="center"><strong>工种</strong></td>
			<td align="center"><strong>岗位证号</strong></td>
		  </tr>
          <c:forEach items="${equipEmploy.practiDiarySet}" var="element" varStatus="status" begin="0" step="2">
          <tr>
			<td height="32">${element.practiName}</td>
			<td>${element.kindWorkName}</td>
			<td>${element.station}</td>
		  </tr>
          </c:forEach>
		  <c:if test="${fn:length(equipEmploy.practiDiarySet) <= 2 }">
		  <tr>
            <td height="40">&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          </c:if>
		  <c:if test="${fn:length(equipEmploy.practiDiarySet) <= 0 }">
		  <tr>
            <td height="40">&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          </c:if>
		</table>
	</td>
    <td width="45%" align="left" valign="top" style="padding:0px; border-left-style:none; border-bottom-style:none;">
	  <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="30%" height="32" align="center"><strong>姓名</strong></td>
            <td width="30%" align="center"><strong>工种</strong></td>
            <td align="center"><strong>岗位证号</strong></td>
          </tr>
          <c:forEach items="${equipEmploy.practiDiarySet}" var="element" varStatus="status" begin="1" step="2">
          <tr>
			<td height="32">${element.practiName}</td>
			<td>${element.kindWorkName}</td>
			<td>${element.station}</td>
		  </tr>
          </c:forEach>
		  <c:if test="${fn:length(equipEmploy.practiDiarySet) % 2 == 1 }">
		  <tr>
            <td height="32">&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          </c:if>
		  <c:if test="${fn:length(equipEmploy.practiDiarySet) <= 2 }">
		  <tr>
            <td height="40">&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          </c:if>
		  <c:if test="${fn:length(equipEmploy.practiDiarySet) <= 0 }">
		  <tr>
            <td height="40">&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          </c:if>
      </table>
	</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table" style="border-top-style:none;">
  <tr>
    <td width="10%" align="center" style="line-height:20px; padding:10pt 0;">安 装 <br />单 位<br />意 见</td>
    <td width="40%" align="left" valign="bottom">技术负责人（签字）：<br />
      （盖章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</td>
    <td width="10%" align="center" style="line-height:20px;">使 用 <br />单 位 <br />意 见</td>
    <td valign="bottom">技术负责人（签字）：<br />
      （盖章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;</td>
  </tr>
  <tr>
    <td align="center" style="line-height:24px; padding:10pt 0;">登记机构<br />审核意见</td>
    <td colspan="3" align="left" valign="bottom">审核人（签字）：<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（盖章）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;</td>
    </tr>
  <tr>
    <td align="center" style="line-height:24px;">使用<br />登记<br />编号</td>
    <td colspan="3">${equipEmploy.employSerial}</td>
    </tr>
</table>

<p style="line-height:24px; text-align:left; padding-top:5px;">填表说明：<br />
1、由使用单位填报，一式四份（使用单位、设备产权单位、安装单位、登记机构各一份）；<br />
2、本表中除使用登记编号及登记机构意见栏外，其余栏目由申请单位填写；<br />
3、表中“使用单位”指使用该机的施工单位或工程项目。
</p>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:if>
<c:if test="${EmployEquipMaint}">
<center>
<div class="main_detail">
<div class="tj_detail">
   <div class="tj_title">施工升降机保养规程</div>
<p align="center"><strong>保养间隔及作业分工</strong></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="bygz_table" style="text-align:center">
  <tr>
    <td width="20%" height="32">保养级别</td>
    <td width="50%">保养间隔周期</td>
    <td width="30%">作业分工</td>
  </tr>
  <tr>
    <td height="32">例行保养</td>
    <td>工作前、中、后、每班进行</td>
    <td>操作人员</td>
  </tr>
  <tr>
    <td height="32">初级保养</td>
    <td>每月一次或运行300h</td>
    <td>操作人员机械班</td>
  </tr>
  <tr>
    <td height="32">高级保养</td>
    <td>现场安装后使用一年内一次</td>
    <td>机械班或维修组</td>
  </tr>
</table>

<br />
<p align="center"><strong>例行保养：工作前、中、后，每班一次</strong></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="bygz_table">
  <tr>
    <td width="10%" height="32" align="center"><strong>序号</strong></td>
    <td width="22%" align="center"><strong>作业项目</strong></td>
    <td align="center"><strong>技术要求及说明</strong></td>
  </tr>
  <tr>
    <td height="32" align="center">1</td>
    <td align="center">检查围栏</td>
    <td align="left">各结构件、围网无损坏、变形等，机械、电气连锁灵敏、有效。</td>
  </tr>
  <tr>
    <td height="32" align="center">2</td>
    <td align="center">梯笼门</td>
    <td align="left">结构件、围网无损坏、变形等，天窗门、双、单行门电气连锁灵敏、可靠。</td>
  </tr>
  <tr>
    <td height="32" align="center">3</td>
    <td align="center">检查开关</td>
    <td align="left">分别试验上、下限位开关和操作控制开关灵敏、可靠。</td>
  </tr>
  <tr>
    <td height="32" align="center">4</td>
    <td align="center">防松绳开关</td>
    <td align="left">装有配重时，试验偏心松绳限位开关，断开时，吊笼应不能启动。</td>
  </tr>
  <tr>
    <td height="32" align="center">5</td>
    <td align="center">检查轨道</td>
    <td align="left">梯龙轨道与配重块运行轨道应畅通，无任何障碍物。</td>
  </tr>
  <tr>
    <td height="32" align="center">6</td>
    <td align="center">检查传动</td>
    <td align="left">检查传动钢丝绳有无磨损，断丝断股，变形，添加润滑油。</td>
  </tr>
  <tr>
    <td height="32" align="center">7</td>
    <td align="center">清洁</td>
    <td align="left">清洁传动板上的灰尘、油污，下班应清洁吊笼、操作台，锁好开关箱</td>
  </tr>
</table>

<br />
<p align="center"><strong>初级保养：每月进行一次</strong></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="bygz_table">
  <tr>
    <td width="10%" height="32" align="center"><strong>序号</strong></td>
    <td width="22%"  align="center"><strong>作业项目</strong></td>
    <td align="center"><strong>技术要求及说明</strong></td>
  </tr>
  <tr>
    <td height="32" align="center">1</td>
    <td align="center">执行例行保养</td>
    <td align="left">按例行保养的要求进行例行保养工作</td>
  </tr>
  <tr>
    <td height="32" align="center">2</td>
    <td align="center">检修电器</td>
    <td align="left">检查电缆磨损及扭绕情况，导向护圈无张口，有损坏应修理和更换;检查电动机无发热，清洁传动机构，调整制动器，片式制动盘间隙为0.3～0.5mm,检查制动力矩：在满载下降时，制动距离为0.2～0.3m.</td>
  </tr>
  <tr>
    <td height="32" align="center">3</td>
    <td align="center">检查减速器</td>
    <td align="left">无异常发热现象，油温升不超过60℃,有漏油时应修复，油位不足应加油。</td>
  </tr>
  <tr>
    <td height="32" align="center">4</td>
    <td align="center" style="line-height:28pt;">检查防坠<br />安全器</td>
    <td align="left">查看运转中没有异响，用手拨动微动开关是否断电。</td>
  </tr>
  <tr>
    <td height="32" align="center">5</td>
    <td align="center">紧固</td>
    <td align="left">传动板上的各部螺栓拧紧，导向流滚轮组件及齿条靠轮及导轨架，附着架等各联接螺栓拧紧。</td>
  </tr>
  <tr>
    <td height="32" align="center">6</td>
    <td align="center">检查配重</td>
    <td align="left">配重块导轮应转动灵活，导板磨损不严格：钢丝绳应在规定的使用范围内，绳头卡夹符合规格：导轮转动灵活并加注润滑脂。</td>
  </tr>
  <tr>
    <td height="32" align="center">7</td>
    <td align="center">清洁、润滑</td>
    <td align="left">整机均应清洁：各部位按要求进行润滑。</td>
  </tr>
</table>

<br />
<p align="center"><strong>高级保养：工作一年内一次</strong></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="bygz_table">
  <tr>
    <td width="10%" height="32" align="center"><strong>序号</strong></td>
    <td width="22%" align="center"><strong>作业项目</strong></td>
    <td align="center"><strong>技术要求及说明</strong></td>
  </tr>
  <tr>
    <td height="32" align="center">1</td>
    <td align="center">执行初级保养</td>
    <td align="left">按初级保养的要求进行初级保养的工作。</td>
  </tr>
  <tr>
    <td height="32" align="center">2</td>
    <td align="center">检修传动</td>
    <td align="left">清洗蜗轮减速器，并更换润滑油：检修联；轴器，弹性体老化应换：检查导向液轮磨损及其轴承，调整其间隙。</td>
  </tr>
  <tr>
    <td height="32" align="center">3</td>
    <td align="center" style="line-height:28pt;">检查防坠<br />安全器</td>
    <td align="left">察看是否在有效定期内，要求标定期不于一年。</td>
  </tr>
  <tr>
    <td height="32" align="center">4</td>
    <td align="center">检修电器</td>
    <td align="left">检修全部主电源线、辅线及照明线等绝缘及磨损情况，各接触器触点要接触可靠，调整过流继电器的整定值：调整控制器和各限位开关各触点的间隙及压力，要求工作可靠，外壳绝缘电阻  ＞0.5MW</td>
  </tr>
  <tr>
    <td height="32" align="center">5</td>
    <td align="center">防腐</td>
    <td align="left">对电梯进行油潦防腐。</td>
  </tr>
</table>

<br />
 <div class="tj_title">建筑起重机械管理制度</div>
 <p align="left"><strong>第一章&nbsp;&nbsp;总则</strong> </p>
   <p class="indt2">第一条&nbsp;&nbsp;为加强建筑起重机械的管理，提高建筑施工的水平，规范建筑起重机械租凭市场，防范安全事故的发生，确保建设工程质量和安全，根据建设部及省建设厅有关机械设备管理文件规定，特制定本制度。 </p>
   <p class="indt2">第二条&nbsp;&nbsp;凡在我省房屋建筑工地和市政工程工地使用和建筑起重机械的购置﹑租赁﹑使用﹑维保﹑检查﹑管理等适用本制度。 </p>
   <p class="indt2">第三条&nbsp;&nbsp;建筑施工企业﹑建筑机械租赁企业应当根据企业和规模配备机械设备管理机构设备专（兼）职管理人员，建立健全机械设备管理机构或管理人员的岗位职责。</p>
   <p align="left"><strong>第二章&nbsp;&nbsp;购置与租赁 </strong></p>
   <p class="indt2">第四条&nbsp;&nbsp;企业应根据工程施工的需要或市场租赁的需要，考虑本企业的实际情况，以及建筑起重机械的发展要求，确定本企业建筑起重机械购置计划以及所购置设备的型号规格。 </p>
   <p class="indt2">第五条&nbsp;&nbsp;建筑起重机械的购置应选择具有制造许可证并且质量可靠﹑信誉高大型生产厂家的设备。选购时要遵循货比三家，质优价廉的原则，并签订购销合同。 </p>
   <p class="indt2">第六条&nbsp;&nbsp;所购置的建筑起重机械到场时光﹑应按设备清单（或合同） 行开箱验收。 收集机械设备备制造许可证﹑产品合格证﹑使用说明书﹑随机附件及工具等有关资料，并将资料存入单机技档案内保管。新机投入使用后，要严格执行机械设备走合期 的有关规定。 </p>
   <p class="indt2">第七条&nbsp;&nbsp;建筑起重机械验收合格后，应对机械设备进行分类编号﹑建帐。 </p>
   <p class="indt2">第八条&nbsp;&nbsp;建筑起重机械的出租单位必须具备建筑施工机械租赁行业的确认资格，出租或使用的建筑起重机械应有生产厂家的产品合格证﹑使用维护说明书﹑注册登记证﹑检测合格证明﹑定期检测记录﹑并配备齐全﹑有效的保险﹑限位等安全设施和装置。 </p>
   <p class="indt2">第九条&nbsp;&nbsp;建筑起重机械有以下情况之一的，不得出租或使用： </p>
  <p class="indt2">（一）国家及本省明令淘汰﹑严禁使用的设备： </p>
  <p class="indt2">（二）超过安全技术规范规定使用年限的： </p>
  <p class="indt2">（三）安全保护装置配备不齐全的： </p>
  <p class="indt2">（四）经检验达不到国家和行业安全技术标准的。</p>
  <p class="indt2">第十条&nbsp;&nbsp;建筑起重机械租﹑用双方要签订建筑起重机械租赁合同，明确双方权利和义务以及双方的安全责任。 </p>
  <p class="indt2">第十一条&nbsp;&nbsp;建筑施工企业或建筑起重机械租赁企业，应当建立建筑起重机械技术档案，建筑起重机械的技术档案包括下列资料： </p>
  <p class="indt2">一、建筑起重机械原始资料：包括购销合同﹑购机发票﹑制造许可证﹑产品合格证﹑注册登记证﹑安装使用说明书等。</p>
  <p class="indt2">二、建筑起重机械运行资料：包括检验记录﹑自行检查记录﹑日常维护保养记录﹑维修和技术改造记录﹑运行故障和事故记录﹑运行时间及累计运转记录﹑交接班记录等资料。 </p>
  <p class="indt2">三、建筑起重机械台帐和历次安装验收资料。 </p>
 <p align="left"><strong>第三章安装与验收 </strong> </p>
  <p class="indt2">第十二条&nbsp;&nbsp;建筑起重机械和安装，顶升﹑附着﹑拆卸等工作，必须由取得建设行政主管部门颁发的起重设备安装工程专业承包资质和安全生产许可证的单位承担，安拆人员必须持有建设行政主管部门颁发的岗位证。若本单位无安装资质的应委托具有相应  资质的单位承担，并与其签订委托安装合同，明确双方的权利和义务以及双方的安全责任。 </p>
  <p class="indt2">第十三条&nbsp;&nbsp;起重机械安拆前，安拆单位应编制安拆专项施工方案，并由安拆单位技术负责人审批，报施工总承包单位和项目监理单位审核后，告知工程所在地县级以上地方人民政府建设主管部门。 </p>
  <p class="indt2">第十四条&nbsp;&nbsp;建筑起重机械在安拆前，使用单位必须审核安装单位的安装资质证书﹑安全生产许可证和安拆人员岗位证书，对整个安装过程实施现场监督，并见证以下工作； </p>
  <p class="indt2"> 一、安装项目技术负责人向全体作业人员，进行安拆专顶施工方面案和安全技术交底； </p>
  <p class="indt2">二、对所安装的设备以及参与安装用的工具﹑索具及辅助起重机械设备进行检查； </p>
  <p class="indt2">三、建筑起重机械基础验收资料； </p>
  <p class="indt2">四、设备安装后对所安装的设备进行自检。 </p>
  <p class="indt2">第十五条&nbsp;&nbsp;设备安装结束后，应委托有资质的检测机构进行设备安装质量检测。检测合格后，应组织使用单位﹑安装单位﹑租赁单位和监理单位对设备进行验收，验收合格后方可投入使用。未经检测和验收的机械设备严禁使用。</p>
  <p class="indt2">第十六条&nbsp;&nbsp;设备顶升加节或附着后要经安装单位和使用单位有关人员验收，验收合格后方可投入使用，并填好建筑起重机械顶升加节﹑附着检验表。 </p>
 <p align="left"><strong>第四章&nbsp;&nbsp;使用与检查 </strong> </p>
  <p class="indt2">第十七条&nbsp;&nbsp;设备操作人员和指挥人员应持有建设行政主管部门颁发的岗位证方可上岗，设备操作人员和指挥人员应严格遵守安全操作规程，正确操作。按规定执行班前﹑班后的检查和维护保养制度，发现设备存在异常情况，应及时处理，不  能解决的应及时报告，待隐患消除后方可继续使用。严禁操作工擅自调整安全限制、限位开关。严禁无证人员上机操作。</p>
  <p class="indt2">第十八条&nbsp;&nbsp;建筑起重机械要做到“三定”即：定人、定机、定责，并实行机长负责制。操作人员要做到“三懂四会”即：懂性能、懂构造；会操作、会维护保养、会检查、会排除故障：精心操作，并填好机械运转记录卡和交接班记录。 </p>
  <p class="indt2">第十九条&nbsp;&nbsp;使用单位应当做好建筑起重机械的安全防护措施，如安全防护棚等，在建筑起重机械活动范围内设置明显的警示标志、对作业范围内的设备、设施做好安全防护。 </p>
  <p class="indt2"><p class="indt2">第二十条&nbsp;&nbsp;建筑起重机械操作人员在作业中有权拒绝违章指挥和强令冒险作业，有权要发生危及人身安全的紧急情况时，立即停止使用设备或者采取必要的应措施后撤离危险区或。 </p>
  <p class="indt2">第二十一条&nbsp;&nbsp;企业至少每月组织一次由安全员、机管员组成检查小组，对在用的建筑起重机械进行安全检查，并校验各种安全保护装置，做好记录，检查中发现存在的隐患应及时整改并有反馈记录。</p>
  <p class="indt2">第二十二条&nbsp;&nbsp;有条件的建筑施工企业、租凭企业要开展红旗设备竞寞活动，按红旗设备的有关求载展检查评比，促进机木工完好率和利用率的提高。 </p>
  <p class="indt2">第二十三条&nbsp;&nbsp;有下列情况之一，应重新组织有关单位对设备检查验收。 </p>
  <p class="indt2">并向检测机构提出检测申请，末经检测或检测不合格不得使用：</p>
  <p class="indt2">一、在同一施工地点；连续使用超过一年的： </p>
  <p class="indt2">二、正常安装使用后，停止使用一年以上，重新 启用前： </p>
  <p class="indt2">三、施工升降机防坠安全器、高处作业吊篮安全锁超过其标定有效年限的应重新标定，合格后方可使用。 </p>
  <p class="indt2">第二十四条&nbsp;&nbsp;企业权对违反操作规程及存在安全隐患不及时整改的操作工或使用单位采取罚款或停机整改等相应措施。在检查中若发现操作工擅自调整各种安全限制、限位装置及其它违规行为将按有关规定给予处罚。</p>
  <p class="indt2">第二十五条&nbsp;&nbsp;使用单位应建立建筑起重机械事故报告制度。一旦发生安全产事故无论有无人员伤亡，应按规定及时报告企业及有关部门。 </p>
  <p class="indt2">第二十六条&nbsp;&nbsp;发生事故后应立即启动事故应急预案，组织抢救，防止事故扩大，减少人员伤亡和财产损失。本着事故“四不放过”的原则，进行事故原因和责任人的分析，对责任人进行相应的处罚，采取相应的防范措施，教育全体员工和操作人员。 </p>
 <p align="left"><strong>第五章报废与处理 </strong> </p>
  <p class="indt2">第三十一条&nbsp;&nbsp;建筑起重机械的报废按省标DBJ13 一89一2007《建筑施工塔式起重机﹑施工升降机报废规程》实行。</p>
  <p class="indt2">第三十二条&nbsp;&nbsp;建筑起重机械报废后应当到建筑起重机械注册登记部门办理报废﹑注销手续，并按废钢铁处理。</p>
</div>
</div>
</center>
<center>
<div class="main_detail">
<div class="tj_detail">
   <div class="tj_title">塔式起重机保养规程</div>
<p align="center"><strong>保养间隔及作业分工</strong></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="bygz_table" style="text-align:center">
  <tr>
    <td width="20%" height="32">保养级别</td>
    <td width="50%">保养间隔周期</td>
    <td>作业分工</td>
  </tr>
  <tr>
    <td height="32">例行保养</td>
    <td>工作前、中、后、每班进行</td>
    <td>塔式起重机班组</td>
  </tr>
  <tr>
    <td height="32">初级保养</td>
    <td>每月一次</td>
    <td>塔式起重机班组</td>
  </tr>
  <tr>
    <td height="32">高级保养</td>
    <td>现场安装后使用一年内一次</td>
    <td>维修班组</td>
  </tr>
</table>

<br />
<p align="center"><strong>例行保养：工作前、中、后、每班一次</strong></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="bygz_table">
  <tr>
    <td width="10%" height="32" align="center"><strong>序号</strong></td>
    <td width="22%" align="center"><strong>作业项目</strong></td>
    <td align="center"><strong>技术要求及说明</strong></td>
  </tr>
  <tr>
    <td height="32" align="center">1</td>
    <td align="center">检查电器</td>
    <td align="left">合上电源开关，检查各接触器及控制电路各元件，要求接触可靠，电压表值的电压值勤不应超过额定值的±5﹪，电缆无损伤。</td>
  </tr>
  <tr>
    <td height="32" align="center">2</td>
    <td align="center">传动机构</td>
    <td align="left">分别查看各机构的电动机，包括减速器、制动器、联轴器、安全<br />
      罩，要求制动可靠，响声正常，绝缘良好。各安装螺栓无松动现象，并清洁机体。</td>
  </tr>
  <tr>
    <td height="32" align="center">3</td>
    <td align="center">检查齿轮箱</td>
    <td align="left">各齿轮箱的油量不足或变质的应按润滑表所规定的周期加注润滑油、脂或换油。</td>
  </tr>
  <tr>
    <td height="32" align="center">4</td>
    <td align="center">检查钢丝绳</td>
    <td align="left">钢丝绳应在规定和使用范围内，各绳头紧固规范可靠，绳轮转动灵活不脱槽，卷筒内钢丝绳排列整齐。</td>
  </tr>
  <tr>
    <td height="32" align="center">5</td>
    <td align="center">检查连接件<br /></td>
    <td align="left">应巡视检查钢结构各部的螺栓、销子连接情况，要求稳妥。</td>
  </tr>
  <tr>
    <td height="32" align="center">6</td>
    <td align="center">试运转</td>
    <td align="left">注意察听各机构应无异响、过大噪声与刮碰、振动的现象，若发现有上述现象应立即排除。</td>
  </tr>
  <tr>
    <td height="32" align="center">7</td>
    <td align="center">检查各<br />
      安全装置<br /></td>
    <td align="left">检查起重量、力矩、变幅、高度、行走等安全限制、限位装置，均应灵敏可靠，发现问题及时修复。</td>
  </tr>
</table>
<br />
<p align="center"><strong>初级保养：每月进行一次</strong></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="bygz_table">
  <tr>
    <td width="10%" height="32" align="center"><strong>序号</strong></td>
    <td width="22%" align="center"><strong>作业项目</strong></td>
    <td align="center"><strong>技术要求及说明</strong></td>
  </tr>
  <tr>
    <td height="32" align="center">1</td>
    <td align="center">执行例行保养</td>
    <td align="left">按例行保养的要求进行例持保养工作</td>
  </tr>
  <tr>
    <td height="32" align="center">2</td>
    <td align="center">检查金属构件<br />
      及紧固性</td>
    <td align="left">检查塔身底座、标准节、套架、塔身及附着撑杆等金属构件有无变形，焊缝有无裂缝，发现异常时应修补、更换；连接件（螺栓、销子）应无松动，各开口销应齐全，必要时对平衡臂和起重臂的金属构件及连接进行检查</td>
  </tr>
  <tr>
    <td height="32" align="center">3</td>
    <td align="center">检修电器</td>
    <td align="left">清扫配电盘内灭弧装置、底板的污垢，拧紧接线端螺栓，清除电阻片上的积尘，检查控制器各触点间隙是否接触可靠，适量润滑，拧紧接线柱；</td>
  </tr>
  <tr>
    <td height="32" align="center">4</td>
    <td align="center" style="line-height:28pt;">检调制动器</td>
    <td align="left">调整制动器的间隙，块式式制动器械的间隙为0。3~0.5m；片式制动器的间隙为0.3m;若制动片磨去1/3时应更换。</td>
  </tr>
  <tr>
    <td height="32" align="center">5</td>
    <td align="center">检查润滑</td>
    <td align="left">按规定的周期对各规定的部位加换润滑油，对得润滑点加注润滑脂。</td>
  </tr>
  <tr>
    <td height="32" align="center">6</td>
    <td align="center">检查各传动<br />机构</td>
    <td align="left">各机件无裂纹、破损、滚轮转动自如，齿轮啮合良好，传动可靠无异响。</td>
  </tr>
  <tr>
    <td height="32" align="center">7</td>
    <td align="center">检查吊钩<br />及钢丝绳</td>
    <td align="left">吊钩尾部无裂 纹，挂绳处危险断面磨损〈10%；钢丝绳磨损变形及腐蚀情况达报废标准时及时更换。</td>
  </tr>
</table>
</p>

<br />
<p align="center"><strong>高级保养：工作一年内一次</strong></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="bygz_table">
  <tr>
    <td width="10%" align="center"><strong>序号</strong></td>
    <td width="22%" align="center"><strong>作业项目</strong></td>
    <td align="center"><strong>技术要求及说明</strong></td>
  </tr>
  <tr>
    <td height="32" align="center">1</td>
    <td align="center">执行初级保养</td>
    <td align="left">按初级保养的要求进持初级保养的工作。</td>
  </tr>
  <tr>
    <td height="32" align="center">2</td>
    <td align="center">检修钢结构</td>
    <td align="left">更换失效的销子、螺栓等连接件，对有开裂的焊缝进行补焊，对产生形变形的杆件进行调直或加固。</td>
  </tr>
  <tr>
    <td height="32" align="center">3</td>
    <td align="center" style="line-height:28pt;">检修减速器</td>
    <td align="left">拆洗箱体零件，更换润滑油，检查调整齿轮啮合间隙，更换损坏的油封、轴承、键、挡圈和销子等零件，转动各档无异响</td>
  </tr>
  <tr>
    <td height="32" align="center">4</td>
    <td align="center">检修联轴器</td>
    <td align="left">调整其轴向、径向间隙，视情况更换弹性圈、键、轴、轴承及裂 损的机件等</td>
  </tr>
  <tr>
    <td height="32" align="center">5</td>
    <td align="center">检调回转机构</td>
    <td align="left">检查回转轴承有无损坏、异响，；加注润滑，调整小轮啮合间隙，调整回转制动器。</td>
  </tr>
    <tr>
    <td height="32" align="center">6</td>
    <td align="center">拆检电器</td>
    <td align="left">检修全部电源线，辅线及照明线等绝缘及磨损情况，各接触器触点要接触可靠，调整过流继电器的整定值，更换电阻器破裂的电阻片；调整控制顺和各限位开关各触点的间隙及压力，要求工作可靠，外壳绝缘电阻〉0.5MΩ</td>
  </tr>
    <tr>
    <td height="32" align="center">7</td>
    <td align="center">检修电动机</td>
    <td align="left">检查清扫定子绕组\转子和风扇,更换轴承并加注润滑脂,换炭刷,修磨滑环.</td>
  </tr>
</table>

<br />
 <div class="tj_title">建筑起重机械管理制度</div>
 <p align="left"><strong>第一章&nbsp;&nbsp;总则</strong> </p>
   <p class="indt2">第一条&nbsp;&nbsp;为加强建筑起重机械的管理，提高建筑施工的水平，规范建筑起重机械租凭市场，防范安全事故的发生，确保建设工程质量和安全，根据建设部及省建设厅有关机械设备管理文件规定，特制定本制度。 </p>
   <p class="indt2">第二条&nbsp;&nbsp;凡在我省房屋建筑工地和市政工程工地使用和建筑起重机械的购置﹑租赁﹑使用﹑维保﹑检查﹑管理等适用本制度。 </p>
   <p class="indt2">第三条&nbsp;&nbsp;建筑施工企业﹑建筑机械租赁企业应当根据企业和规模配备机械设备管理机构设备专（兼）职管理人员，建立健全机械设备管理机构或管理人员的岗位职责。</p>
   <p align="left"><strong>第二章&nbsp;&nbsp;购置与租赁 </strong></p>
   <p class="indt2">第四条&nbsp;&nbsp;企业应根据工程施工的需要或市场租赁的需要，考虑本企业的实际情况，以及建筑起重机械的发展要求，确定本企业建筑起重机械购置计划以及所购置设备的型号规格。 </p>
   <p class="indt2">第五条&nbsp;&nbsp;建筑起重机械的购置应选择具有制造许可证并且质量可靠﹑信誉高大型生产厂家的设备。选购时要遵循货比三家，质优价廉的原则，并签订购销合同。 </p>
   <p class="indt2">第六条&nbsp;&nbsp;所购置的建筑起重机械到场时光﹑应按设备清单（或合同） 行开箱验收。 收集机械设备备制造许可证﹑产品合格证﹑使用说明书﹑随机附件及工具等有关资料，并将资料存入单机技档案内保管。新机投入使用后，要严格执行机械设备走合期 的有关规定。 </p>
   <p class="indt2">第七条&nbsp;&nbsp;建筑起重机械验收合格后，应对机械设备进行分类编号﹑建帐。 </p>
   <p class="indt2">第八条&nbsp;&nbsp;建筑起重机械的出租单位必须具备建筑施工机械租赁行业的确认资格，出租或使用的建筑起重机械应有生产厂家的产品合格证﹑使用维护说明书﹑注册登记证﹑检测合格证明﹑定期检测记录﹑并配备齐全﹑有效的保险﹑限位等安全设施和装置。 </p>
   <p class="indt2">第九条&nbsp;&nbsp;建筑起重机械有以下情况之一的，不得出租或使用： </p>
  <p class="indt2">（一）国家及本省明令淘汰﹑严禁使用的设备： </p>
  <p class="indt2">（二）超过安全技术规范规定使用年限的： </p>
  <p class="indt2">（三）安全保护装置配备不齐全的： </p>
  <p class="indt2">（四）经检验达不到国家和行业安全技术标准的。</p>
  <p class="indt2">第十条&nbsp;&nbsp;建筑起重机械租﹑用双方要签订建筑起重机械租赁合同，明确双方权利和义务以及双方的安全责任。 </p>
  <p class="indt2">第十一条&nbsp;&nbsp;建筑施工企业或建筑起重机械租赁企业，应当建立建筑起重机械技术档案，建筑起重机械的技术档案包括下列资料： </p>
  <p class="indt2">一、建筑起重机械原始资料：包括购销合同﹑购机发票﹑制造许可证﹑产品合格证﹑注册登记证﹑安装使用说明书等。</p>
  <p class="indt2">二、建筑起重机械运行资料：包括检验记录﹑自行检查记录﹑日常维护保养记录﹑维修和技术改造记录﹑运行故障和事故记录﹑运行时间及累计运转记录﹑交接班记录等资料。 </p>
  <p class="indt2">三、建筑起重机械台帐和历次安装验收资料。 </p>
 <p align="left"><strong>第三章安装与验收 </strong> </p>
  <p class="indt2">第十二条&nbsp;&nbsp;建筑起重机械和安装，顶升﹑附着﹑拆卸等工作，必须由取得建设行政主管部门颁发的起重设备安装工程专业承包资质和安全生产许可证的单位承担，安拆人员必须持有建设行政主管部门颁发的岗位证。若本单位无安装资质的应委托具有相应  资质的单位承担，并与其签订委托安装合同，明确双方的权利和义务以及双方的安全责任。 </p>
  <p class="indt2">第十三条&nbsp;&nbsp;起重机械安拆前，安拆单位应编制安拆专项施工方案，并由安拆单位技术负责人审批，报施工总承包单位和项目监理单位审核后，告知工程所在地县级以上地方人民政府建设主管部门。 </p>
  <p class="indt2">第十四条&nbsp;&nbsp;建筑起重机械在安拆前，使用单位必须审核安装单位的安装资质证书﹑安全生产许可证和安拆人员岗位证书，对整个安装过程实施现场监督，并见证以下工作； </p>
  <p class="indt2"> 一、安装项目技术负责人向全体作业人员，进行安拆专顶施工方面案和安全技术交底； </p>
  <p class="indt2">二、对所安装的设备以及参与安装用的工具﹑索具及辅助起重机械设备进行检查； </p>
  <p class="indt2">三、建筑起重机械基础验收资料； </p>
  <p class="indt2">四、设备安装后对所安装的设备进行自检。 </p>
  <p class="indt2">第十五条&nbsp;&nbsp;设备安装结束后，应委托有资质的检测机构进行设备安装质量检测。检测合格后，应组织使用单位﹑安装单位﹑租赁单位和监理单位对设备进行验收，验收合格后方可投入使用。未经检测和验收的机械设备严禁使用。</p>
  <p class="indt2">第十六条&nbsp;&nbsp;设备顶升加节或附着后要经安装单位和使用单位有关人员验收，验收合格后方可投入使用，并填好建筑起重机械顶升加节﹑附着检验表。 </p>
 <p align="left"><strong>第四章&nbsp;&nbsp;使用与检查 </strong> </p>
  <p class="indt2">第十七条&nbsp;&nbsp;设备操作人员和指挥人员应持有建设行政主管部门颁发的岗位证方可上岗，设备操作人员和指挥人员应严格遵守安全操作规程，正确操作。按规定执行班前﹑班后的检查和维护保养制度，发现设备存在异常情况，应及时处理，不  能解决的应及时报告，待隐患消除后方可继续使用。严禁操作工擅自调整安全限制、限位开关。严禁无证人员上机操作。</p>
  <p class="indt2">第十八条&nbsp;&nbsp;建筑起重机械要做到“三定”即：定人、定机、定责，并实行机长负责制。操作人员要做到“三懂四会”即：懂性能、懂构造；会操作、会维护保养、会检查、会排除故障：精心操作，并填好机械运转记录卡和交接班记录。 </p>
  <p class="indt2">第十九条&nbsp;&nbsp;使用单位应当做好建筑起重机械的安全防护措施，如安全防护棚等，在建筑起重机械活动范围内设置明显的警示标志、对作业范围内的设备、设施做好安全防护。 </p>
  <p class="indt2"><p class="indt2">第二十条&nbsp;&nbsp;建筑起重机械操作人员在作业中有权拒绝违章指挥和强令冒险作业，有权要发生危及人身安全的紧急情况时，立即停止使用设备或者采取必要的应措施后撤离危险区或。 </p>
  <p class="indt2">第二十一条&nbsp;&nbsp;企业至少每月组织一次由安全员、机管员组成检查小组，对在用的建筑起重机械进行安全检查，并校验各种安全保护装置，做好记录，检查中发现存在的隐患应及时整改并有反馈记录。</p>
  <p class="indt2">第二十二条&nbsp;&nbsp;有条件的建筑施工企业、租凭企业要开展红旗设备竞寞活动，按红旗设备的有关求载展检查评比，促进机木工完好率和利用率的提高。 </p>
  <p class="indt2">第二十三条&nbsp;&nbsp;有下列情况之一，应重新组织有关单位对设备检查验收。 </p>
  <p class="indt2">并向检测机构提出检测申请，末经检测或检测不合格不得使用：</p>
  <p class="indt2">一、在同一施工地点；连续使用超过一年的： </p>
  <p class="indt2">二、正常安装使用后，停止使用一年以上，重新 启用前： </p>
  <p class="indt2">三、施工升降机防坠安全器、高处作业吊篮安全锁超过其标定有效年限的应重新标定，合格后方可使用。 </p>
  <p class="indt2">第二十四条&nbsp;&nbsp;企业权对违反操作规程及存在安全隐患不及时整改的操作工或使用单位采取罚款或停机整改等相应措施。在检查中若发现操作工擅自调整各种安全限制、限位装置及其它违规行为将按有关规定给予处罚。</p>
  <p class="indt2">第二十五条&nbsp;&nbsp;使用单位应建立建筑起重机械事故报告制度。一旦发生安全产事故无论有无人员伤亡，应按规定及时报告企业及有关部门。 </p>
  <p class="indt2">第二十六条&nbsp;&nbsp;发生事故后应立即启动事故应急预案，组织抢救，防止事故扩大，减少人员伤亡和财产损失。本着事故“四不放过”的原则，进行事故原因和责任人的分析，对责任人进行相应的处罚，采取相应的防范措施，教育全体员工和操作人员。 </p>
 <p align="left"><strong>第五章报废与处理 </strong> </p>
  <p class="indt2">第三十一条&nbsp;&nbsp;建筑起重机械的报废按省标DBJ13 一89一2007《建筑施工塔式起重机﹑施工升降机报废规程》实行。</p>
  <p class="indt2">第三十二条&nbsp;&nbsp;建筑起重机械报废后应当到建筑起重机械注册登记部门办理报废﹑注销手续，并按废钢铁处理。</p>
</div>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:if>
<c:if test="${EmployEquipRepair}">
<c:forEach var="equipRepair" items="${employEquipRepairs}" >
<center>
<div class="main_detail">
<p style='text-align:center'><span class="wrod_title"><font color="#FF0000">${equipRepair.equipment.propertyName}</font></span></p>
<p style='text-align:center'><span class="wrod_title">设备维修记录表</span></p>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="100" height="36" align="right"><strong>维修单号：</strong></td>
    <td align="left">${equipRepair.repairSerial}</td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="qzj_table">
  <tr>
    <td height="28" colspan="4" align="left" bgcolor="#E0E0E0"><strong>基本信息</strong></td>
    </tr>
  <tr>
    <td width="16%" height="28" align="center"><strong>项目名称</strong></td>
    <td width="34%" align="left">${equipRepair.project.projectName}</td>
    <td width="16%" align="center"><strong>项目所属地</strong></td>
    <td width="34%" align="left">${equipRepair.project.address}</td>
  </tr>
  <tr>
    <td height="28" align="center"><strong>备案编号</strong></td>
    <td align="left">${equipRepair.equipment.recordId}</td>
    <td align="center"><strong>出厂编号</strong></td>
    <td align="left">${equipRepair.equipment.exwSerial}</td>
  </tr>
  <tr>
    <td height="28" align="center"><strong>故障部件</strong></td>
    <td align="left">&nbsp;</td>
    <td align="center"><strong>故障时间</strong></td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td height="28" align="center"><strong>故障现象</strong></td>
    <td colspan="3" align="left">${equipRepair.phenomenon}</td>
    </tr>
	 <tr>
    <td height="28" align="center"><strong>故障诊断</strong></td>
    <td colspan="3" align="left">&nbsp;</td>
    </tr>
    <tr>
    <td height="28" colspan="4" align="left" bgcolor="#E0E0E0"><strong>维修情况</strong></td>
    </tr>
  <tr>
    <td height="60" align="center">维修方案</td>
    <td colspan="3" align="left">${equipRepair.schemaName}</td>
    </tr>
    <tr>
    <td height="28" align="center">维修人员</td>
    <td align="left">${equipRepair.repairMan}</td>
    <td align="center">故障排除时间</td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td height="28" align="center">实际维修工时</td>
    <td align="left">&nbsp;小时</td>
    <td align="center">累计停机工时</td>
    <td align="left">&nbsp;小时</td>
  </tr>
  <tr>
    <td height="28" align="center">维修费用(元)</td>
    <td align="left">${equipRepair.repairAmount}</td>
    <td align="center">维修结果</td>
    <td align="left">${equipRepair.repairResultName}</td>
  </tr>
  <tr>
    <td>部件更换<br />
      说明</td>
    <td height="150" colspan="3" align="left">${equipRepair.renewalDescription}</td>
    </tr>
  <tr>
    <td colspan="4" style="padding-left:0px; padding-top:0px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="8%" height="32" align="center" style="background-color:#E0E0E0; font-weight:bold; border-left-style:none;">序号</td>
        <td width="30%" align="center" style="background-color:#E0E0E0; font-weight:bold;">更换配件名称</td>
        <td width="20%" align="center" style="background-color:#E0E0E0; font-weight:bold;">更换配件型号</td>
        <td width="15%" align="center" style="background-color:#E0E0E0; font-weight:bold;">更换数量</td>
        <td align="center" style="background-color:#E0E0E0; font-weight:bold;">说明</td>
      </tr>
      <c:forEach var="element" items="${equipRepair.equipRepairNewComponSet}" varStatus="status" >
      <tr>
        <td height="32" style="border-left-style:none;">${status.count}</td>
        <td align="left">${element.component.componGenericName}</td>
        <td>${element.component.componSpecificName}</td>
        <td>${element.counts}</td>
        <td align="left">${element.remark}</td>
      </tr>
      </c:forEach>
    </table></td>
    </tr>
  <tr>
    <td align="center" height="100">预防措施<br />
      建议</td>
    <td colspan="3" align="left">${equipRepair.preventiveMeasures}</td>
    </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
  <tr>
    <td align="center">维修主管（签字）<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
    <td align="center">经办人员（签字）<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
    </tr>

</table>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${DismantleIndisPrecheck}">
<c:forEach var="indisPrecheck" items="${dismantleIndisPrechecks}" >
<center>
<div class="main_detail">
  <div class="wrod_title">塔式起重机/施工升降机拆卸前检查表</div>
  <p>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="75" height="32" align="center">产权单位</td>
    <td width="140">${indisPrecheck.equipment.propertyName}</td>
    <td align="center" width="90">备案登记号</td>
    <td colspan="2" width="150">${indisPrecheck.equipment.recordId}</td>
    <td width="50"><p align="center">工程<br />项目</td>
    <td width="120">${indisPrecheck.project.projectName}</td>
  </tr>
  <tr>
    <td height="32" align="center">生产厂家</td>
    <td>${indisPrecheck.equipment.equipVender}</td>
    <td align="center">规格型号</td>
    <td width="100">${indisPrecheck.equipment.equipSpecificName}</td>
    <td  align="center" width="50">安装<br />单位</td>
    <td colspan="2">${indisPrecheck.inEntName}</td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td width="10%" align="center" height="32">序号</td>
    <td width="20%" align="center">项 目</td>
    <td align="center">检 查 要 求</td>
    <td width="20%" align="center">检查记录</td>
  </tr>
  <c:forEach var="element" items="${indisPrecheck.verifyStandardSet}" varStatus="status" >
  <tr>
    <td align="center" height="32">${status.count}</td>
    <td align="center">${element.itemName}</td>
    <td>${element.demandDes}</td>
    <td>${element.standardResult}</td>
  </tr>
  </c:forEach>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td width="150" rowspan="2" align="center">安装单位人员</td>
    <td style="padding:20px 10px;">现场安装负责人（签字）：</td>
    <td width="240" style="border-left-style:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
  <tr>
    <td style="padding:20px 10px;">检查人员（签字）：</td>
    <td style="border-left-style:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" style="border-top-style:none;">
  <tr>
    <td style="padding:20pt 0;"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_none">
      <tr>
        <td colspan="4">检查结论:</td>
        </tr>
      <tr>
        <td width="300">安装单位技术负责人（签字）：</td>
        <td>&nbsp;</td>
        <td width="100">（盖章）</td>
        <td width="240">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
      </tr>
    </table></td>
  </tr>
</table>
</p>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${DismantleSecureProtocol}">
<c:forEach var="secureProtocol" items="${dismantleSecureProtocols}" >
<center>
<DIV class="main_detail">
<p style="font-size:32px;text-align:center; padding-top:10px; font-weight:bold;">安 全 协 议</p>
<p style="font-size:16px;text-align:right; padding-top:15px; padding-right:15px;">合同编号:&nbsp;<strong><u>&nbsp;${secureProtocol.protocolSerial}</u></strong></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px; font-size:14px;">
  <tr>
    <td class="indt2">总承包单位（简称甲方）：<u><strong>&nbsp;&nbsp;${secureProtocol.emEntName}&nbsp;&nbsp;</strong></u></td>
    </tr>
  <tr>
    <td class="indt2">机械设备拆卸单位（简称乙方）：<u><strong>&nbsp;${secureProtocol.inEntName}&nbsp;&nbsp;</strong></u></td>
    </tr>
  <tr>
    <td class="indt2">拆卸单位拆卸资质证书号<u><strong>：&nbsp;${secureProtocol.inEntCertNum}&nbsp;&nbsp;</strong></u>&nbsp;&nbsp;资质等级:<u><strong>&nbsp;&nbsp;${secureProtocol.inEntTitleLevel}&nbsp;&nbsp;</strong></u></td>
    </tr>
</table>
</p>
<p class="indt2" style="font-size:14px;">依照《中华人民共和国合同法》及相关法律、法规和《建筑起重机械安全监督管理规定》(原建设部令第166号)的规定，遵循平等、自愿、公平和诚实信用的原则，双方协商就建筑起重机械的安装/拆卸（以下简称安拆）相关事宜达成协议如下：</p>
<p><strong>第一条  项目名称、机械拆卸地点和拆卸高度</strong></p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px; font-size:14px;">
  <tr>
    <td class="indt2">项目名称：<u><strong>&nbsp;&nbsp;${secureProtocol.project.projectName}&nbsp;&nbsp;</strong></u></td>
  </tr>
    <tr>
    <td class="indt2">机械拆卸地点：<u><strong>&nbsp;&nbsp;${secureProtocol.project.address}&nbsp;&nbsp;</strong></u></td>
  </tr>
  <tr>
  <td class="indt2">拆卸高度：拆卸高度<u><strong>&nbsp;&nbsp;${secureProtocol.finalHeight}&nbsp;&nbsp;</strong></u>米，附着<u><strong>&nbsp;&nbsp;${secureProtocol.wallAttacheQty}&nbsp;&nbsp;</strong></u>道。</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px;">
  <tr>
    <td><p><strong>第二条&nbsp;&nbsp;双方权利义务 </strong></p> 
     <p> 一、甲方权利义务 </p> 
      <p class="indt2">1.机械设备拆卸前，负责为机械设备提供足够的电源（380V±5%）。负责提供由配电箱（房）至机械设备基础处的专用开关箱与电源线，电源线应采用“三相五线”制，专用开关箱内应符合“一机一闸一漏一箱  ”。 
        </p>
      <p class="indt2"> 2.机械设备拆卸退场前，负责做好退场道路压实，作业场地的平整，周边障碍物（含外架）的清除等工作。</p> 
      <p>二、乙方权利义务</p>
      <p class="indt2">1.负责根据工程及机械设备情况编制拆卸专项施工方案，经本单位技术负责人审批签字，报施工及监理单位审核并告知当地机械设备备案机关后方可进行作业。  </p>  
      <p class="indt2">2.负责组织人员进行机械设备的拆卸工作，并在双方约定的时间内完成。</p>
	  <p class="indt2"> 3. 负责提供的内业技术资料包括：相应拆卸资质、安全生产许可证、拆卸管理人员证书、拆卸作业人员上岗证、拆卸专项施工方案、拆卸前检查表、拆卸安全技术交底记录等。
	  </p>
	  
      <p><strong>第三条&nbsp;&nbsp;双方安全责任 </strong></p>
      <p> 一、甲方安全责任 </p>
      <p class="indt2">1．甲方应向乙方提供确保建筑起重机械设备进场安装所需的施工条件，并设置安全警戒区。</p> 
      <p class="indt2">2．甲方应跟据不同施工阶段、周围环境以及季节、气候的变化，对建筑起重机械采取相应的安全防护措施。 </p>
      <p class="indt2">3．甲方应指定专职机械设备管理人员、专职安全员进行现场监督检查。 </p>
      <p> 二、乙方安全责任 </p>
      <p class="indt2">1.乙方组织的拆卸作业人员须持证上岗并按规定穿戴好安全防护用品，严格遵守拆卸程序和安全操作规程，严格按照经审批的拆卸专项施工方案进行作业。</p> 
      <p class="indt2">2.乙方组织机械设备拆卸、降节、拆除附着作业必须在白天或照明良好的夜间进行，不得在大风（12m/s以上）、浓雾和雨雪天气进行作业。 </p>
      <p class="indt2">3.乙方在拆卸前应对吊具索具以及机械设备各部件进行检查，同时对辅助起重设备进行检查，确认正常后方可开始拆卸。 </p>
      <p class="indt2">4.乙方每次作业前，须对参与作业人员进行安全技术交底并签字确认。在作业条件符合要求的前提下，乙方对机械设备拆卸、降节、拆除附着等作业过程的安全生产负责。</p>
       <p><strong>第四条&nbsp;&nbsp;争议解决 </strong></p>
      <p class="indt2">本协议项下发生的争议，由双方协商解决，也可由行业主管部门调解，协商或者调解不成的，按下列第壹种方式解决。 </p>
      <p class="indt2">1．向武夷山市人民法院提起诉讼；</p>
      <p class="indt2">2．向武夷山市仲裁委员会申请仲裁。</p> 
      <p> <strong>第五条&nbsp;&nbsp;其他条款 </strong></p>
      <p class="indt2">1．本协议自双方签字并盖章之日起生效。本合同一式叁份，具有同等法律效力，其中甲方壹份，乙方壹份、建设局壹份。</p> 
      <p class="indt2">2．本协义附件以及合同履行过程中形成的各种书面文件，经双方签署确认后为本合同的组成部分，与本协义具有同等法律效力。 </p>
      <p class="indt2">3．本协义未尽事宜，双方可协商签订补充协议，补充协议与本协义具有同等法律效力。 </p>
      <p class="indt2">4．协义签订地：<u>&nbsp;&nbsp;<strong>福建省武夷山市天和街18-20号 </strong>&nbsp;&nbsp;</u></p>
      <p class="indt2">5．其他约定：机械设备需拆卸、降节、拆除附着甲方必须通知乙方并核对人员（在拆卸告知资料中的人员）到位拆卸操作，若不是乙方人员操作，出现任何问题均与乙方无关。 </p></td>
  </tr>
</table>
<br />

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px; font-size:14px;">
  <tr>
    <td width="50%">总承包单位：（盖章 ） </td>
    <td>拆卸单位：（盖章） </td>
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
    <td>年  月   日 : </td>
    <td>年  月   日 : </td>
  </tr>
</table>
</p>
</DIV>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${DismantleIndisProtocol}">
<c:forEach var="indisProtocol" items="${dismantleIndisProtocols}" >
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
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${DismantleSchemaIndisSchema}">
<c:forEach var="indisSchema" items="${dismantleIndisSchemas}" >
<c:if test="${indisSchema.equipment.equipGeneric == 'T'}">
<center>
<div class="main_detail">
  <div class="tj_title">塔机起重机拆卸施工方案</div>
  
<p><strong>一、工程概况 </strong></p>
<p class="indt2">根据<u>&nbsp;&nbsp;${indisSchema.project.projectName}&nbsp;&nbsp;</u>施工的需要，拟在<u>&nbsp;&nbsp;${indisSchema.project.address}&nbsp;&nbsp;</u>工地，拆卸1台由${indisSchema.equipment.equipVender}制造&nbsp;${indisSchema.equipment.equipSpecificName}&nbsp;型塔吊。拆卸总高&nbsp;${indisSchema.finalHeight}&nbsp;米。 </p>
<p><strong>二、拆卸时间、人员 </strong></p>
<p class="indt2">1、时间：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u> </p>
<p class="indt2">2、拆卸人员：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></p>
<p class="indt2">3、安全员：<u>&nbsp;&nbsp;${indisSchema.secureDirector}&nbsp;&nbsp;</u> </p>
<p><strong>三、塔式起重机的拆卸</strong> </p>
<p class="indt2"><strong>1、拆卸前的准备工作及应注意的事项 </strong></p>
<p class="indt2">1.1塔机拆卸是一项非常细致和专业性很强的工作，稍有疏忽，都随时可能导致机毁人亡，因此在拆卸的过程中，必须严格按照说明书的规定操作。 </p>
<p class="indt2">1.2塔机拆卸之前，先检查顶升系统是否正常，检查各机构制动器是否可靠，确认无误后方可进行下一步工作程序。 </p>
<p class="indt2">1.3在塔身标准节已引出、下转台与塔身没有连接成整体之前，严禁使用回转，牵引和起升机构。 </p>
<p class="indt2">1.4顶升机构工作时，所有操作人员应精力集中，检查各相对运动件的相对位置是否处于正常状态，发现情况应立即停止顶升机构，及时排除故障。 </p>
<p class="indt2">1.5拆卸时风力必须小于四级。 </p>
<p class="indt2"><strong>2、塔机拆卸正好与安装的步骤相反，即先装的后卸，后装的先卸，具体程序如下： </strong></p>
<p class="indt2"><strong>2.1拆除塔身 </strong></p>
<p class="indt2">a.将起重臂回转到标准节的引进方向（爬升架中有开口的一侧），使回转制动器处于制动状态，载重小车停在配平的位置（与立塔顶升加节时载重小车的配平位置一致； </p>
<p class="indt2">b.伸长顶升油缸，将顶升横梁顶在从上往下数第四个踏步的圆孔内，在第一个标准节下面四角装引进滚轮，卸下下转台与最上一个标准节的链接螺栓，将上部结构稍微顶起，使引进滚轮与引进横梁接触，拆除最上一个标准节与上面第二个标准节的链接螺栓，稍顶活塞杆，当最上一节标准节（即标准节1）离开标准节2顶面2～5cm左右，停止顶升。 </p>
<p class="indt2">c.将最上一节标准节沿引进梁推出在引进台上。 </p>
<p class="indt2">d.扳开活动爬爪，回缩油缸，让活动爬爪躲过距它最近的一对踏步后，复位放平，继续下降至活动爬爪支承在下一对踏步上，并支承住上部结构后，再回缩油缸。 </p>
<p class="indt2">e.将顶升横梁在下一对踏步上，稍微顶升至爬爪翻转时能躲过原来支承的踏步后停止，拨开爬爪，继续回缩油缸，至下一个标准节与下支座相接触时为止。 </p>
<p class="indt2">f.下支座与塔身标准节之间用螺栓连接号后，用小车吊钩将原退出再引进平台上的标准节吊至地面。 
注意：爬升架的下落过程中，当爬升架上的活动爬爪通过与塔身标准节主弦杆踏步和标准节连接螺栓时，须有人工翻转活动爬爪，同时派专人看管顶升横梁和导向轮，观察爬升架下降时有无被障碍物卡住的现象，以便爬升架顺利下降。 </p>
<p class="indt2">g.重复上述动作，将塔身标准节依次拆下。 塔身拆下至安装高度后，若要继续拆塔，必须先拆平衡臂上的平衡重。 </p>
<p class="indt2"><strong>2.2拆卸平衡臂配重 </strong></p>
<p class="indt2">a.将载重小车固定在起重臂根部，借助辅助吊车拆卸配重。 </p>
<p class="indt2">b.安装配重的相反程序，将各块配重依次卸下，仅留一块2.5t的配重块。 </p>
<p class="indt2"><strong>2.3起重臂的拆卸 </strong></p>
<p class="indt2">a.放下吊钩至地面，拆除起重钢丝绳与配重臂前端上的防扭装置的链接。开动起升机构，回收全部钢丝绳。 </p>
<p class="indt2">b.根据安装时的吊点位置挂绳。 </p>
<p class="indt2">c.汽车吊轻轻提起起重臂，将起升钢丝绳绕过塔顶滑轮固定在拉杆上慢慢启动起升机构，使起重臂拉起约与水平成20°角，拆去起重臂拉杆与塔顶拉板的连接销，放下拉杆至起重臂固定；拆去钢丝绳，将起重臂放平至水平位置，拆掉起重臂与上转台的连接销。 </p>
<p class="indt2">d.放下起重臂，并搁在垫有枕木的支座上。 </p>
<p class="indt2"><strong>2.4平衡臂的拆卸 </strong></p>
<p class="indt2">将最后一块配重全部吊下，然后通过平衡臂上的四个安装吊耳吊起平衡臂，使平衡臂拉杆处于放松状态，拆下拉杆链接销轴，然后拆掉平衡臂与上转台的连接销，将平衡臂平稳放至地面上。 </p>
<p class="indt2"><strong>2.5拆卸司机室</strong></p>
<p class="indt2">拆卸前，检查与相邻的组件之间是否还有电缆连接，电缆应全部拆除。 </p>
<p class="indt2"><strong>2.6拆卸塔顶 </strong></p>
<p class="indt2"><strong>2.7拆卸回转总成</strong></p>
<p class="indt2">拆掉下转台与塔身的链接螺栓，伸长顶升油缸，将顶升横梁定在踏步的圆孔内并稍微顶紧，拆掉下转台与爬升架的链接销轴，回缩顶升油缸，将爬升架的爬还支承在塔身上，再用吊索将回转总成吊起卸下。 </p>
<p class="indt2"><strong>2.8拆走爬升架及塔身标准节 </strong></p>
<p class="indt2">a.吊起爬升架，缓缓地沿着标准节主弦杆吊出，放至地面。 </p>
<p class="indt2"><strong>3、塔机拆卸后的注意事项 </strong></p>
<p class="indt2">1）塔机拆卸后由工程技术人员和专业维修人员进行检查。 </p>
<p class="indt2">2）对主要受力的结构件应检查金属疲劳、焊缝、裂纹、结构变形等情况检查各零部件是否有损坏或碰伤等。 </p>
<p class="indt2">3）检查完毕后，对缺陷、隐患进行修复后，再进行除锈、喷漆处理。
</p>
</p>
</div>
</center>
</c:if>
<c:if test="${indisSchema.equipment.equipGeneric == 'S'}">
<center>
<div class="main_detail">
  <div class="tj_title">施工升降机拆卸施工方案</div>
 <p><strong>1、工程概述 </strong>
<p class="indt2">根据<u>&nbsp;&nbsp;${indisSchema.project.projectName}&nbsp;&nbsp;</u>施工工地需要，按照合同决定在<u>&nbsp;&nbsp;${indisSchema.project.address}&nbsp;&nbsp;</u>工地拆卸两台由<u><strong>&nbsp;&nbsp;${indisSchema.equipment.equipVender}&nbsp;&nbsp;</strong></u>制造的&nbsp;${indisSchema.equipment.equipSpecificName}&nbsp;型人货施工升降机。A1，拆卸高度46米；6-7#楼，拆卸高度31米。 </p>
<p><strong>&nbsp;2、施工及编制依据 </strong></p>
<p class="indt2">2.1、GB10055-2007《施工升降机安全规程》 </p>
<p class="indt2">2.2、JGJ33-2001《建筑机械使用安全技术规程》 </p>
<p class="indt2">2.3、${indisSchema.inEntName}施工升降机使用说明书 </p>
<p><strong>3、施工人员组织 </strong></p>
<p class="indt2">施工升降机拆卸施工由本公司委派拆卸组长${indisSchema.schemaDesigner}负责，人员由施工升降机拆卸工、电工等3-4人组成（具体施工人员组织名单见前表）。工地安全员协助安全监督。 </p>
<p><strong>4、升降机的拆卸 </strong></p>
<p><strong>（一）拆卸前准备阶段 </strong></p>
<p class="indt2">1．场地清理，扫除场内道路上的障碍物，保证具备应有的作业空间，作业区域上空（有无）高压电线电缆（如有高压电线，电缆，现场应采取保护措施） </p>
<p class="indt2">2．组织拆卸作业队伍，工作时必须先进行安全任务书技术交底。 </p>
<p class="indt2">3．所有作业人员必须戴好安全帽，高空作业人员系好安全带，认真检查索具、起重机具、手拉葫芦、专用扳手及其他辅助工具，不合格品一概不准使用。 </p>
<p><strong>（二）拆卸实施阶段 </strong></p>
<p class="indt2">1．阅读、熟悉电梯使用说明书，整个拆卸过程严格按升降机拆除规定执行。 </p>
<p class="indt2">2．待拆卸的升降机应做到性能完好，金属结构部分无变形损伤，无焊缝开裂脱焊，无严重锈蚀。对传动机构、钢丝绳、滑轮组、电气设备、安全保险机构等，拆卸前均应认真检查，发现问题必须马上整改。 </p>
<p class="indt2">3．拆卸区域设置警戒，设有明显标志，并有专人监护。 </p>
<p class="indt2">4、按规定和施工要求拆卸附墙架。 </p>
<p class="indt2">5．拆卸后及时做好转移使用或入库等运输工作。 </p>
<p><strong>（三）、施工电梯拆卸方案</strong></p>
<p class="indt2">1、拆卸时，应对电梯进行一次大检查，确认各部件功能正常，动作无误后，方可投入拆卸作业。按以上安装顺序进行反顺序作业即可。 </p>
<p class="indt2">2、拆卸要点： </p>
<p class="indt2">（1）电梯拆卸前应先阅读、理解使用说明书，指定专人指挥、协调，确保安装安全。 </p>
<p class="indt2">（2）将施工电梯周围围出足够大的场地，挂上“注意空中落物”等标牌。 </p>
<p class="indt2">（3）笼顶操作按钮盒移至笼顶，试运行，并将加节扳至“加节”位置。 </p>
<p class="indt2">（4）上升吊笼，使吊笼停在架体顶部，卸去四处高强螺栓拆除标准节。 </p>
<p class="indt2">（5）有辅助起重设备时（如起重机），可一次拆除四节标准节。 </p>
<p class="indt2">（6）无辅助起重设备时，应借助笼顶吊杆进行拆卸。</p>
<p class="indt2">（7）拆除相应的附墙装置、电缆护架等。注意：始终保持导轨架最大自由端高度不超过允许范围。 </p>
<p class="indt2">（8）当导轨架拆至10m以下时，可用吊车等起重设备拆除栏杆、吊杆、导轨架、滑车等。 </p>
<p class="indt2">（9）手动下降吊笼，落在缓冲弹簧上。 </p>
<p class="indt2">（10）切断主电源，拆除电源线。 </p>
<p class="indt2">（11）松开电机制动器，将吊笼吊离导轨架。 </p>
<p class="indt2">（12）拆除最后几节标准节和底架。</p>
</div>
</center>
</c:if>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${EquipmentDismantle}">
<c:if test="${equipDismantle != null}">
<center> 
<div class="main_detail">
  <div class="wrod_title">建筑起重机械拆卸告知表</div>
 <table border="0" width="630">
		<tbody><tr>
			<td class="tdh">__________________建设局：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>福建永诚机械设备有限公司</u>
				单位（&nbsp;安装资质证书号：<u>B3174035040301</u>，资质等级：<u>三级</u>&nbsp;&nbsp;），拟定于 <u>&nbsp;<fmt:formatDate value="${equipDismantle.startdisDate}" type="date"/>&nbsp;</u>至
				<u>&nbsp;<fmt:formatDate value="${equipDismantle.enddisDate}" type="date"/>&nbsp;</u>，在本市（县）&nbsp;<u>${equipDismantle.equipFlow.equipDiary.countyName} </u>&nbsp;区（乡、镇）&nbsp;<u>${equipDismantle.equipFlow.equipDiary.projectName}</u>&nbsp;工程（工地），<input type="checkbox" disabled="disabled"/>
				安装 / <input type="checkbox" checked="checked" disabled="disabled"/>拆卸下列建筑起重设备（表一），现告知贵局，请予以监督，并提供经施工总承包单位、监理单位审核合格的以下资料（表二）：
			</td>
		</tr>
	</tbody></table>
	<font style="font-weight: bold; font-size: 14px">表一：拟安装（拆卸）建筑起重机清单</font><br>
	<table class="listtable" width="640" border="0" align="center" cellpadding="0" cellspacing="0">
		<tbody><tr>
			<th class="tdp">设备名称</th>
			<th class="tdp">规格型号</th>
			<th class="tdp">备案证号</th>
			<th class="tdp">本次拆卸高度(m)</th>
			<th class="tdp">安装现场负责人</th>
			<th class="tdp">联系电话</th>
		</tr>
		<tr height="25px">
			<td class="tdp" align="center">${equipDismantle.equipFlow.equipDiary.equipGenericName}</td>
			<td class="tdp" align="center">${equipDismantle.equipFlow.equipDiary.equipSpecificName}</td>
			<td class="tdp" align="center">${equipDismantle.equipFlow.equipDiary.recordId}</td>
			<td class="tdp" align="center">${equipDismantle.dismantleHeight}</td>
			<td class="tdp" align="center">${equipDismantle.principal}</td>
			<td class="tdp" align="center">&nbsp;</td>
		</tr>
	</tbody></table><br>
	<font style="font-weight: bold; font-size: 14px">表二：总承包单位、监理单位审核资料及审核意见</font><br>
	<table class="listtable" width="630" border="0" align="center" cellpadding="0" cellspacing="0">
		<tbody><tr>
			<th class="tdp" width="70%">审核资料</th>
			<th class="tdp">审核意见</th>
		</tr>
		<tr>
			<td class="tdp" rowspan="2" align="left" valign="top">
				<div style="margin-left: 10px; margin-right: 10px; line-height: 28px">
				    <input type="checkbox" name="checkbox" value="checkbox" /> 建筑起重机械备案证<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位资质证书、安装生产许可证副本<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位特种作业人员证书<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 经安拆单位技术负责人审核签字的建筑起重机械安装（拆卸）工程专项施工方案<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位与使用单位签订的安装（拆卸）合同及安全协议书<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 安装单位负责建筑起重机械安装（拆卸）工程的专职安全生产管理人员专业技术人员名单<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 建筑起重机械安装（拆卸）工程生产安全事故应急救援方案<br> 
					<input type="checkbox" name="checkbox" value="checkbox" /> 辅助建筑起重机械资料及特种作业人员证书<br>
			  </div>
			</td>
			<td class="tdp" align="left">&nbsp;施工总承包单位审核意见：
				<div style="margin-top: 140px;" valign="bottom" align="right">
					<p style="margin-right: 50px">(盖章)</p>
					<p>年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;</p>
				</div>
			</td>
		</tr>
		<tr>
			<td class="tdp" align="left">&nbsp;监理单位审核意见：
				<div style="margin-top: 140px;" valign="bottom" align="right">
					<p style="margin-right: 50px">(盖章)</p>
					<p>年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;</p>
				</div>
			</td>
		</tr>
	</tbody></table>
	<table border="0" width="630">
		<tbody><tr>
			<td class="tdh" colspan="3">说明:本表由告知单位填写,一式二份（告知单位、登记机构各一份）</td>
		</tr>
		<tr>
			<td class="tdh" width="40%" height="30">告知单位（盖章）:</td>
			<td class="tdh" width="40%">登记机构接收人:</td>
			<td class="tdh" align="right">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;</td>
		</tr>
	</tbody></table>
	
	</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:if>
</c:if>
<c:if test="${DismantleContingencyPlan}">
<c:forEach var="contingencyPlan" items="${dismantleContingencyPlans}" >
<center>
<div class="main_detail">
 <div class="tj_detail">
   <p class="tj_title">建筑起重机械生产安全事故应急救援预案</p>
<p><strong>第一章、编制依据与工程项目概况</strong></p>
<p><strong>一、编制依据 </strong></p>
<p class="indt2">1、《建筑法》 </p>
<p class="indt2">2、《安全生产法》 </p>
<p class="indt2">3、《关于特大安全事故行政责任追究的规定》 </p>
<p class="indt2">4、《福建省安全生产条例》 </p>
<p class="indt2">5、《特种设备安全监察条例》 </p>
<p class="indt2">6、《建筑起重机械安全监督管理规定》（建设部令第166号） </p>
<p class="indt2">7、其它法律、法规。</p> 
<p ><strong>二、工程规模和建筑起重机械概况 </strong></p>
<p class="indt2">（一）工程规模</p>
<p class="indt2">拟建设<u>&nbsp;&nbsp;<strong>${contingencyPlan.project.projectName}</strong>&nbsp;&nbsp;</u>一幢</p>
<p class="indt2">（二）建筑起重机械概况 </p>
<p class="indt2">根据本工程主体工程量和装饰工程量的大小，本工程拆卸一台<u>&nbsp;&nbsp;<strong>${contingencyPlan.equipment.equipGenericName}</strong>&nbsp;&nbsp; </u>设计，拆卸总高度为<u>&nbsp;&nbsp;<strong>${contingencyPlan.finalHeight}</strong>&nbsp;&nbsp;</u>米。</p>
<br>
<p><strong>第二章 编制目的 </strong></p>
<p class="indt2">为加强对起重机安全事故的防范，及时做好安全事故发生后的救援处置工作，最大限度地减少事故造成的损失，维护正常的社会秩序和工作秩序，根据《特种设备安全监察条例》的要求，结合本工程实际，特制定本单位起重机安全事故应急救援预案。  </p>
<p><strong>第三章 预案的适用范围 </strong></p>
<p class="indt2">预案所称安全事故，是指在本工程起重机使用中发生的，造成或可能造成人身安全和财物损失的事故，事故类别包括： </p>
<p class="indt2">1、因检查维修出现问题而造成事故。 </p>
<p class="indt2">2、操作不当；违章违纪蛮干，不良操作习惯；判断操作失误，指挥信号不明确，安全意识差和操作技能低下是引发的事故。 </p>
<p><strong>第四章&nbsp;应急救援指挥机构的设置 </strong></p>
<p class="indt2">（一）指挥机构的设置和职责 </p>
<p class="indt2">1、指挥机构的设置 </p>
<p class="indt2">项目部成立施工现场安全生产事故应急救援指挥领导小组，组长由项目经理担任，副组长为项目副经理担任，成员由技术负责人、安全员、施工员等各承包组组长等人员组成。 </p>
<p align="center" style="padding:10px;"><img src="images/yingj.jpg" /></p>
<p class="indt2">现场指挥：项目部项目经理 </p>
<p class="indt2">工程应急反应小组：项目部管理人员、各班组长成员、义务消防队成员通讯负责人。 </p>
<p class="indt2">2、指挥机构的职责 </p>
<p class="indt2">在应急情况下，值班人员组成最初应急组织。值班主管一旦发现或接到紧急情况通知，应马上确定应急级别，报告现场指挥或应急总指挥，调动应急反应小组。在此阶段的指挥和控制通过现场指挥中心来执行，作为应急指挥中心，根据应急总指挥（项目经理）的指示，及时通报公司管理层或指挥联络外界。事故发生初期，先由值班主管担任初期应急岗位指挥，直到按应急预案规定的负责人到岗位后再交接岗位，正式启动应急预案。 </p>
<p class="indt2">（二）项目应急救援小组名单 </p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable" align="center">
  <tr>
    <td width="10%" height="30" align="center"><strong>序号</strong></td>
    <td width="15%" align="center"><strong>姓名</strong></td>
    <td width="20%" align="center"><strong>职务</strong></td>
    <td align="center"><strong>应急救援职务</strong></td>
    <td width="20%" align="center"><strong>电话</strong></td>
  </tr>
  <c:forEach var="element" items="${contingencyPlan.contingencyWorkerSet}" varStatus="status" >
  <tr>
    <td align="center">${status.count}</td>
    <td align="center">${element.name}</td>
    <td align="center">${element.duties}</td>
    <td align="center">${element.contingencyDuties}</td>
    <td align="center">${element.phone}</td>
  </tr>
  </c:forEach>
  <c:if test="${fn:length(contingencyPlan.contingencyWorkerSet) <= 0 }">
  <tr>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
  </tr>
  </c:if>
</table>
<p class="indt2">（三）应急救援专业队伍任务 </p>
<p class="indt2">（1）事故发生后立即组织营救受害人员，组织撤离或者采取其他措施保护危害区域内的其他人员。抢救受害人是应急救援的首要任务，在应急救援行动中，要求做到快速、有序、有效地实施现场急救与安全转送伤员降低伤率，减少事故的损失。 </p>
<p class="indt2">（2）指导群众防护，防止事态发展，组织群众安全撤离现场。 </p>
<p class="indt2">（3）迅速控制危险源，对事故造成的危害进行监测、测定事故危害区域、危害性质及危害程度。</p>
<p class="indt2">（4）查清事故原因，查明人员伤亡情况，协助公司等上级部门对事故调查。 </p>
<p class="indt2">（5）做好现场清洁，减少、消除事故灾痕。 </p>
<p><strong>第五章&nbsp;应急救援报警和联络方式 </strong></p>
<p class="indt2">根据事故规模危害程度紧急情况确定报警方式，包括城市公用特殊通讯电话：报警110；火警119；急救120；交警122；气象站121。 </p>
<p class="indt2">项目部应急救援通讯网络包括本工程应急办公电话:<u><strong>&nbsp;&nbsp;${contingencyPlan.contingencyPhone}&nbsp;&nbsp;</strong> </u>，明确联络方式：应急救援联络方式有： </p>
<p class="indt2">（1）电话； </p>
<p class="indt2">（2）应急机构人员手机； </p>
<p class="indt2">（3）场内广播。 </p>
<p><strong>第六章&nbsp;事故的紧急处置措施</strong></strong></p>
<p class="indt2">事故处理程序：</p>
<p class="indt2">发现事故→发出警报→尽快切断电源→救治伤者→通知应急小组→排除险情→查明原因→处理善后</p>
<p class="indt2">1、一旦事故发生，不论事故现场何种情况，发现事故人员必须第一时间发出警报（大声呼叫），由机械操作人员切断电源，通知周边作业人员全部停止作业，撤离到安全地带。并用手机通知项目应急总指挥和联络员。 </p>
<p class="indt2">2、应急总指挥接到事故报告后，应立即召集应急机构人员，带齐必要工具，到事故现场集中。</p>
<p class="indt2">3、应急救援人员集中后，应全面听从应急总指挥的安排，合理分工，一方面排除险情，一方面组织救援人员对伤员实施救护，并根据伤情，实施救治或转送医院<u><strong>（武夷山市市立医院）</strong></u>。 </p>
<p class="indt2">4、险情排除，人员得到有效救护后，应组织对事故进行调查，按事故处理“四不放过”原则进行处理，并按事故类别上报上级相关部门。 </p>
<p><strong>第七章&nbsp;应急保障条件 </strong></p>
<p class="indt2">1、抢险队伍 </p>
<p class="indt2">项目部由项目管理人员组成应急救援小组，由项目经理任总指挥。 </p>
<p class="indt2">2、应急救援装备 </p>
<p class="indt2">项目部应急救援装备包括值班电话、报警电话、灭火器材、消防斧、防毒面具、紧急照明灯具、应急药箱及担架等。 </p>
<p class="indt2">3、应急救援药品 </p>
<p class="indt2">外用药品：通常有双氧水、雷佛奴尔水、红药水、碘酒、消毒棉签、药棉、纱布、胶布、绷带、创可贴、跌打万花油、眼膏、碘胺结晶、烫火膏、清凉油或驱风油、三角巾、急救包等。 </p>
<p class="indt2">4、内服药品：人丹、十滴水、保济丸或藿香正气丸、一般退烧药品等。</p>
<p><strong>第八章&nbsp;应急救援措施</strong> </p>
<p class="indt2"><strong>1、工作原则 </strong></p>
<p class="indt2">事故发生后，救援工作应有序进行，重、特大事故应急救援工作遵循“保护人员安全优先，防止和控制事故蔓延、扩大为主；统一领导指挥、人员分工、分级负责、综合协调、快速高效、现场自救与上级或社会救援相结合”的原则。  </p>
<p class="indt2">人员急救步骤：急救是对伤员提供紧急的监护和救治，给伤员最大的生存机会，急救一定要遵循下述四个步骤： </p>
<p class="indt2">（1）调查事故现场，调查时要确保对调查人、伤病员或其他人无任何危险，迅速使伤病员脱离危险场所，尤其在工地、工厂大型事故现场，更是如此。  </p>
<p class="indt2">（2）初步检查伤病员，判断其神志、气管、呼吸循环是否有问题，必要时立即进行现场急救和监护，使伤病员保持呼吸道通畅，视情况采取有效的止血、防止休克、包扎伤口、固定、保存好断离的器官或组织、预防感染、止痛等措施。  </p>
<p class="indt2">（3）呼救，应请人去呼叫救护车，你可继续施救，一直要坚持到救护人员或其他施救者到达现场接替为止。此时还应反映伤病员的伤病情和简单的救治过程。  </p>
<p class="indt2">（4）如果没有发现危及伤病员体征，可作第二次检查，以免遗漏其他的损伤、骨折和病变。这样有利于现场施行必要的急救和稳定病情，降低并发症和伤残率。  </p>
<p class="indt2"><strong>2、起重机械伤害事故的急救措施 </strong></p>
<p class="indt2">当机械性伤害发生时，应尽快将伤员搬支安全地点进行包扎、止血、固定伤肢，应急以后及时送医院治疗。 </p>
<p class="indt2">（1）止血 </p>
<p class="indt2">①出血的种类 </p>
<p class="indt2">动脉出血：血色鲜红，出血时像小喷泉一样喷出，时间捎久，就会有生命危险； </p>
<p class="indt2">静脉出血：血色暗红，出血时慢慢流出，时间久了也有危险； </p>
<p class="indt2">毛细管出血：血色鲜红，出血时血液从整个伤面渗出，常自动凝固。 </p>
<p class="indt2">②止血方法 </p>
<p class="indt2">止血方法一般有四种，即加压包扎止血法、指压止血法、填塞止血法和止血带止血法。 </p>
<p class="indt2">加压包扎止血法：用止血纱布或干净毛巾、布料折成比伤口稍大的垫子盖住伤口，然后用三角巾或绷带加压包扎，就可以达到止血的目的。 </p>
<p class="indt2">指压止血法：用手指或掌、掌把出血的血管上部（近心脏的一头）用力压向其下面的骨头，阻断血液来源，达到临时止血的目的。 </p>
<p class="indt2">堵塞止血法：把消毒过的棉花或纱布堵塞在伤口处，在用加压法包扎，在此适用于腋窝、肩部、大腿部伤口的止血。 </p>
<p class="indt2">止血带止血法：止血带止血适用于大血管出血，尤其是动脉出血，当采用加压包扎止血法不可以有效地止住出血时可用此法，常用橡皮管作止血带，也可用绷带、三角巾、布带等代替，使用止血带时要记住六个字：快、准、垫、上、适、放。 </p>
<p class="indt2">快：动作快，抢时间； </p>
<p class="indt2">准：看准出血点，准确包扎止带； </p>
<p class="indt2">垫：垫上垫子，不要直接扎在皮肤上； </p>
<p class="indt2">上：扎在伤口上方，接近伤出口，但禁扎于上臂中段； </p>
<p class="indt2">适：松紧适宜，以出血停止，摸不到远端脉搏为合适； </p>
<p class="indt2">放：每隔半小时放松2～3分钟，松止血带时，应同时用指压法压迫止血，缓缓放松。 </p>
<p class="indt2">（2）包扎 </p>
<p class="indt2">包扎的目的：保护伤口、减少感染、压迫止血、固定骨折、扶托伤肤、减轻疼痛。 </p>
<p class="indt2">①扎注意事项：动作要轻而熟练，不可碰撞伤口。包扎部位要准确接触、覆盖伤口的敷料要干净，最好经过消毒。包扎要牢固，紧松合适，打结应避开伤口。 </p>
<p class="indt2">②扎用器材：有条件时可用三角巾，四头带和专用绷带等包扎救护材料。当无专用材料时，可灵活的采用身边干净的衣服、毛巾等进行包扎。 </p>
<p ><strong>第九章 起重机械安全事故预防措施 </strong></p>
<p class="indt2">1、建筑起重机械必须按建筑起重机械备案登记办法执行，并办理产权登记、安装告知和使用登记等相关手续，各种防护措施应齐全、有效，并经检测、验收合格后再投入使用。 </p>
<p class="indt2">2、项目部必须制订起重机械操作规程和设备管理制度，并严格执行。 </p>
<p class="indt2">3、建筑起重机械应配备持建筑特种作业操作工上岗证的人员，并由专人负责操作。 </p>
<p class="indt2">4、每班作业前，应检查钢丝绳、螺栓紧固、安全装置等，确认安全可靠，方准操作。</p>
<p class="indt2">5、作业时应严格遵守操作规范，严禁违规作业、严禁超载，操作时不准擅离岗位。工作中要听从指挥信号，信号不明或可能引起事故时，应停止操作，待弄清情况后方可继续作业。</p>
<p class="indt2">6、作业后应切断电源，锁紧电源控制箱，防止无关人员随意操作。 </p>
<p class="indt2">7、起重机械应定期保养、定期检查，确保机械完好、防护设施齐全有效，杜绝带病运作。</p> 
 </div>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
<c:if test="${DismantleTechnicalDisclosure}">
<c:forEach var="technicalDisclosure" items="${dismantleTechnicalDisclosures}" >
<center>
<div class="main_detail">
 <div class="wrod_title">建筑起重机械安全技术交底书</div>
<p align="right">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;
</p>
<p align="left"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="jsjtable">
  <tr>
    <td width="100" height="36" align="center"><strong>工程名称</strong></td>
    <td width="220" align="left">上海明达建筑工程有限公司厦门分公司</td>
    <td width="100" align="center" ><strong>施工单位</strong></td>
    <td width="220" align="left">11</td>
    </tr>
  <tr>
    <td height="36" align="center"><strong>施工地点</strong></td>
    <td align="left">1</td>
    <td align="center"><strong>交底项目</strong></td>
    <td align="left">1</td>
    </tr>
  <tr>
    <td height="36" colspan="4" align="center">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="100" height="36" align="center" style="border-left-style:none;border-bottom-style:none;"><strong>机械名称</strong></td>
        <td width="120" align="left" style="border-bottom-style:none;">1</td>
        <td width="100" align="center" style="border-bottom-style:none;"><strong>规格型号</strong></td>
        <td width="59" style="border-bottom-style:none;">1</td>
        <td width="40" style="border-bottom-style:none;"><strong>高度</strong></td>
        <td width="98" style="border-bottom-style:none;" align="right">101011米&nbsp;</td>
        <td width="40" style="border-bottom-style:none;"><strong>臂长</strong></td>
        <td width="75" style="border-bottom-style:none;" align="right">0101米&nbsp;</td>
      </tr>
    </table></td>
    </tr>
  <tr>
    <td height="36" align="center" width="100"><strong>起重设备配备</strong></td>
    <td width="220" align="left">1</td>
    <td width="100" align="center"><strong>运输设备配备</strong></td>
    <td>1</td>
    </tr>
  <tr>
    <td height="300" colspan="4" align="center" valign="top" style="padding-top:5px;"><p align="center"><strong>其他交底内容</strong><strong> </strong></p></td>
    </tr>
  <tr>
    <td height="200" colspan="4" align="center" valign="top" style="padding-top:5px;"><strong>安全技术交底内容</strong></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="jsjtable" style="border-top-style:none;">
  <tr>
    <td width="150" height="36" align="center">接受人（签字）</td>
    <td width="200">&nbsp;</td>
    <td align="center" width="120">交底人（签字）</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="36" align="center">关联人员（签字）</td>
    <td colspan="3">&nbsp;</td>
    </tr>
  <tr>
    <td height="36" align="center">交底日期</td>
    <td colspan="3">&nbsp;</td>
    </tr>
</table>
</p>
</div>
</center>
<hr align="center" width="90%" size="1" noshade class="NOPRINT">
<div class="PageNext"></div><br /><br />
</c:forEach>
</c:if>
</body>
</html>