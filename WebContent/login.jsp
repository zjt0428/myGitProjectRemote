<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.knight.system.application.ApplicationContainer"%>
<%@ page import="org.apache.commons.lang.StringUtils"%><html>
<%@ page import="java.util.Random" %>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
	<title>欢迎登录<%=ApplicationContainer.getCompanyName()%></title>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3.4/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3.4/resources/css/ext-patch.css" />
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/login.css" />
	<%
		response.addHeader("__timeout","true");
		String randomData = "";
		char upper = 'z', lower = 'a';
		Random random = new Random();
		for (int i = 0; i < 20; i++) {
			int tempval = (int) ((int) lower + (random.nextFloat() * ((int) (upper - lower))));
			randomData += new Character((char) tempval).toString();
		}
		session.setAttribute("randomData", randomData);	
		boolean codeEnabled = (Boolean) ApplicationContainer.getSysConfig().get("codeConfig");
	%>
	<script type="text/javascript">
		var __ctxPath = "<%=request.getContextPath() %>";
		var randomDigest = "<%=randomData %>";
	</script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/ext3.4/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/ext3.4/ext-all.gzjs"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/ext3.4/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/App.LoginWin.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/core/md5.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/core/base64.js"></script>
	<script type="text/javascript">
 		Ext.onReady(function() {
	 		Ext.QuickTips.init(); 
	 		new App.LoginWin(<%=codeEnabled%>).show();
		});	
	</script>
</head>
<body>
	<OBJECT classid=clsid:C7672410-309E-4318-8B34-016EE77D6B58 id=ePass name=ePass STYLE="LEFT: 0px; TOP: 0px" width=0 height=0></OBJECT>
	<div style="text-align: center;">
		<div id="loginArea">
		</div>
	</div>
</body>
</html>