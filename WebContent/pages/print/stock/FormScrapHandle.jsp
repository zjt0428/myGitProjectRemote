<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>报废处理申请</title>
<style media=print>
.Noprint {
	display: none;
}

.PageNext {
	page-break-after: always;
}
</style>
<style>
.tdh {
	line-height: 28px;
	text-align: left;
	font-size: 14px;
	padding: 0px 0px 0px 0px;
}

.tabp {
	margin-top: 5px;
	border-color: #000000 #000000 #000000 #000000;
	border-style: solid;
	border-top-width: 1px;
	border-right-width: 2px;
	border-bottom-width: 2px;
	border-left-width: 1px;
}

.tdp {
	height: 28px;
	font-size: 14px;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
}

.tdc {
	height: 28px;
	font-size: 14px;
	text-align: center;
	border-bottom: 0 solid #000000;
	border-left: 1 solid #000000;
	border-right: 0 solid #000000;
	border-top: 1 solid #000000;
}

.ftdp {
	height: 60px;
	font-weight: bold;
	font-size: 30px;
}
</style>
</head>
<body>
<center class="Noprint">
	<p align="right">
		<object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" width="0"></object>
		<input type="button" style="font-size: 12px" value="直接打印" onClick="document.all.WebBrowser.ExecWB(6,6)">
		<input type="button" style="font-size: 12px" value="打印预览" onClick="document.all.WebBrowser.ExecWB(7,1)">
		<input type="button" style="font-size: 12px" value="页面设置" onClick="document.all.WebBrowser.ExecWB(8,1)">
	</p>
</center>
<center>
	
	<font size="5" style="font-weight: bold">报废处理请单</font><br /> <br />
	<table class="table-base" border="0" width="630">
		<tr>
			<td style="line-height: 28px;text-align:left;"><p style="text-indent: 2em">申请单号：${ScrapHandle.handleId}</p></td>
		</tr>
	</table>
		<table class="tabp" width="630" border="0" align="center" cellpadding="2" cellspacing="0">
		<tr>
			<th class="tdp" width="15%">制单日期:</th>
			<td class="tdc" colspan="2">&nbsp;${ScrapHandle.contractDate}</td>
			<th class="tdp" width="15%">制单人:</th>
			<td class="tdc" width="20%">&nbsp;${ScrapHandle.userName}</td>
		</tr>
		<tr>
			<th class="tdp">仓库名称:</th>
			<td class="tdc" width="35%">&nbsp;${ScrapHandle.storeName}</td>
			<th class="tdp" width="15%">&nbsp;&nbsp;库位:</th>
			<td class="tdc" colspan="2">&nbsp;${ScrapHandle.storageLocation}</td>
		</tr>
		<tr>
			<th class="tdp">状态:</th>
			<td class="tdc" colspan="2">&nbsp;${ScrapHandle.status}</td>
			<th class="tdp">报废编号:</th>
			<td class="tdc">&nbsp;${ScrapHandle.scrapSerial}</td>
		</tr>
	 <tr>
			<th class="tdp">审批情况:</th>
			
		</tr>
		
		

</center>
</body>
</html>