<%@ page pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String content = (String) request.getAttribute("content");
	Long contractId = (Long) request.getAttribute("contractId");
%>
<html>
<head>
<base target="_self">
<title>合同编辑</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/ueditor/ueditor.config.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/ueditor/ueditor.all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/ueditor/lang/zh-cn/zh-cn.js"></script>
<style type="text/css">
div {
	width: 99%;
	align: center;
}

body {
	text-align: center;
}
</style>
</head>
<body>
	<form name="form1" action="ueAction.do" method="post">
		<div align="center">
			<input type="hidden" id="content1" name="content1" value="">
			<script id="editor" type="text/plain" style="width:800px;height:400px;"><%=content%></script>
		</div>
		<div>
			<input type="button" name="save" value="保存" onClick="doSave();"> <input type="button" name="print" value="word下载打印"
				onClick="doPrint();">
		</div>
	</form>
	<script type="text/javascript">
		var ue = UE.getEditor('editor')
		function doSave(){
			if (confirm("是否提交合同信息？")) {
				var content = UE.getEditor('editor').getContent();
				document.getElementById("content1").value=content;
				document.form1.action="editContentContractLease.do?formpage=ContractSubcontract&EVENT=SAVE&contractId=<%=contractId%>";
				document.form1.submit();
			}
		}
		function doPrint(){
			var content = UE.getEditor('editor').getContent();
			document.getElementById("content1").value=content;
			document.form1.action="editContentContractLease.do?formpage=ContractSubcontract&EVENT=PRINT&contractId=<%=contractId%>";
			document.form1.submit();
		}

		//解决console  未定义问题
		if (!window.console || !console.firebug) {
			var names = [ "log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd" ];
			window.console = {};
			for (var i = 0; i < names.length; ++i)
				window.console[names[i]] = function() {
			}
		}
	</script>
</body>
</html>