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
<link rel="stylesheet" type="text/css" href="../pages/print/css/style_table.css" />
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
		<object id="WebBrowser" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
<div class="main_detail">
<p style="font-size:28px;text-align:center; padding-top:10px; font-weight:bold;">机械设备安拆合同</p>
<p style="font-size:16px;text-align:right; padding-top:15px; padding-right:15px;">合同编号:<u><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${indisProtocol.contractLease.contractSerial}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></u></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height:28px; font-size:14px;">
  <tr>
    <td class="indt2">甲方：<u><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${indisProtocol.contractLease.paEntName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></u></td>
    </tr>
  <tr>
    <td class="indt2">乙方：<u><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${indisProtocol.contractLease.pbEntName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></u></td>
    </tr>
  <tr>
    <td class="indt2">根据《中华人民共和国合同法》及有关规定，为明确甲、乙双方的权利和义务关系，经双方协商一致，签订本合同。</td>
    </tr>
</table>
</p>
<br>
<p><strong>第一条：装拆机械设备的名称、型号、机号、数量、高度和附墙道数等</strong></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td align="center" width="180">设备名称</td>
    <td align="center" width="150">型号</td>
    <td align="center" width="80">数量（台）</td>
    <td align="center" width="80">高度（米）</td>
    <td align="center">备注</td>
  </tr>
  <c:forEach var="element" items="${indisProtocol.indisProtocolEquipSet}" varStatus="status">
  <tr>
    <td>&nbsp;${element.equipment.equipGenericName}</td>
    <td>&nbsp;${element.equipment.equipSpecificName}</td>
    <td>&nbsp;${element.quantity}</td>
    <td>&nbsp;${element.height}</td>
    <td>&nbsp;</td>
  </tr>
  </c:forEach>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

</p>
<br>
<p><strong>第二条：工程概况</strong></p>
<p>

1、	工程名称：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${indisProtocol.contractLease.projectName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u><br>                   
2、	工程地点：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${indisProtocol.contractLease.address}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u><br>                      
3、	装拆时间：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>年<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>月<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>至<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>年<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>月<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>止。

</p>
<br>
<p><strong>第三条：甲方职责</strong></p>
<p>
1、	负责施工场地平整、道路畅通、临电到位。<br>
2、	负责设备基础和附着装置等隐蔽工程的制作、验收，并提供合格资料。<br>
3、	协助乙方对装拆过程中的安全进行监护。<br>
4、	负责附墙操作平台、楼层至楼身之间安全走道的搭、拆。<br>
5、	负责拆卸前设备基础坑内杂物的清理、积水的排放、污垢的清理。<br>
6、	乙方做好机械设备安装、拆卸前的安全技术交底，安装结束后甲方参与安装验收工作。<br>
7、	安装、升节或拆卸前，甲方应提前    天通知乙方，便于乙方做好准备。<br>
</p>

<p><strong>第四条：乙方职责</strong></p>
<p>
1、乙方负责编制规范的机械设备装、拆施工方案，制订施工技术措施，并有专职技术人员在现场监督。安装完毕后，乙方应进行自检，并向甲方呈交安全使用及有关注意事项书面交底材料。负责组织验收，报市检测中心检测，待检测合格后将有关证件移交甲方。<br>
2、乙方在装、拆前负责对作业人员进行安全技术交底，并指派专人在装、拆现场负责安全监护工作。<br>
3、乙方在装、拆过程中，严禁违章指挥和违章作业。<br>
4、安装验收标准：所在地检测中心验收合格。<br>
</p>

<p><strong>第五条：安装、运输、拆除费用等</strong></p>
<p>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listtable">
  <tr>
    <td width="180" align="center">设备名称</td>
    <td width="100" align="center">型号</td>
    <td  width="100" align="center">数量（台）</td>
    <td  width="100" align="center">单价（元/台）</td>
    <td align="center">总价（元）</td>
  </tr>
  <c:forEach var="element" items="${indisProtocol.indisProtocolEquipSet}" varStatus="status">
  <tr>
    <td>&nbsp;${element.equipment.equipGenericName}</td>
    <td>&nbsp;${element.equipment.equipSpecificName}</td>
    <td>&nbsp;${element.quantity}</td>
    <td>&nbsp;${element.amount}</td>
    <td>&nbsp;${element.summary}</td>
  </tr>
  </c:forEach>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</p>

<p>
注：1、上表所述<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>台总价共为<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>元，实际为安、拆、检测、进出场费用之和，如需追加附墙，则每道附墙另加<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>元。<br>
2、安装、拆卸时汽车吊由乙方负责配合和安排。安装时汽车吊<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>台<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>吨，拆卸时汽车吊<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>台<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>吨，如有变动增加，汽吊费按实结算。安装、拆卸时甲方尽可能按照乙方的要求提供可供设备安装的场地，如甲方不能提供完好场地，一切损失、费用由甲方承担。</p>

<br><p><strong>第六条：设备装拆的付款方式</strong></p>
<p>设备进场安装完毕，检测合格后<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>日内甲方付清 <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>，余款在设备拆卸后<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>日内一次性付清。</p>

<br><p><strong>第七条：违约责任</strong></p>
<p>1．	未经双方同意，任何一方不得中途变更或解除合同，违约方按《合同法》的有关条款处理。<br>
2．	甲方应根据本合同第六条中的有关规定及时付清装拆费和进出场费，如违约则按合同法的有关规定，每拖延一天，按欠款总额的3‰予以迟纳金罚款处理。<br>
3．	乙方按照装、拆施工方案要求进行装拆，确保装拆人员安全，按期完成装拆任务。</p>

<br><p>
<strong>第八条：</strong>依据《中华人民共和国安全生产法》规定，双方另订安全协议。<br><br>

<strong>第九条：</strong>合同有效期限：自双方签字后生效，本合同自行完毕自行结束。合同期满后如继续租用，本合同继续有效，直到款清后自动失效。未尽事宜双方另行协商，本合同如有附件，附件与本合同具有同等法律效力。一旦发生争议由双方协商或设备使用所在地人民法院解决。<br>
<br>
<strong>第十条：</strong>本合同一式肆份，双方各执贰份。<br>

</p>


<br><br>

<p>

甲方（盖章）：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u> &nbsp;&nbsp;&nbsp;&nbsp;乙方（盖章）：	<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u><br>			     	

授权人：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>&nbsp;&nbsp;&nbsp;&nbsp; 授权人：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u><br>	  		     	

签约日期：<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u> 年 <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>月<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>日</p>
<br>

</div>
</center>
</body>
</html>
