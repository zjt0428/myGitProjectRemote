<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>塔式起重机附墙、顶升加节合同</title>
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
	<div class="er_wrod_title">
	  <p align="center"><strong>承</strong><strong>  </strong><strong>诺</strong><strong>  </strong><strong>书</strong><strong> </strong></p>
	</div>
	<div style="width:90%; margin:0 auto;" id="page1" style="page-break-after:always">

	<p style="line-height:46px; text-align:left; font-size:18px;">
	<br />
	<br />
	<strong>
	致：中国建筑第二工程局有限公司   <br />
	中国建筑第二工程局有限公司深圳分公司</strong></p>
				<br />
	<p style="line-height:46px; text-align:left; font-size:18px;">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为满足贵司<u>&nbsp;&nbsp;&nbsp;&nbsp;${project.projectName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>工程施工需要，我公司与中国建筑第二工程局有限公司深圳分公司（以下简称甲方）经初步协商，双方同意将本工程的塔式起重机（施工电梯）的安拆、租赁和维保等工作分包给我公司。 <br />

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为配合甲方完善政府部门的安拆等申报手续，我司与甲方为中国建筑第二工程局有限公司先行签订了<u>&nbsp;&nbsp;&nbsp;&nbsp;${project.projectName}&nbsp;&nbsp;&nbsp;&nbsp;</u>工程项目的设备安拆合同（编号：${printData.installContractSerial}  ）、租赁合同（编号：  ${contractLease.contractSerial}  ）和维保合同（编号：${printData.repairContractSerial}      ），我们郑重承诺，执行以下条款： <br />

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、我公司确认与中国建筑第二工程局有限公司签订的<u>&nbsp;&nbsp;${project.projectName}&nbsp;&nbsp;</u><br />
	工程合同只做备案用途，与中国建筑第二工程局有限公司没有发生实际交易，此合同本司不留存。 <br />

	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、最终执行的合同以我公司与中国建筑第二工程局有限公司深圳分公司签订的<u>&nbsp;&nbsp;&nbsp;${project.projectName}&nbsp;&nbsp;&nbsp;</u>工程设备安拆合同、租赁合同和维保合同等为准.</p>
	</div>
</div>
<div class="PageNext"></div>
</center>
</body>
</html>
