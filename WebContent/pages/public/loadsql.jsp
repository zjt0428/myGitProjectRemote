<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>数据库辅助工具</title>
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
<script Language="javascript">
	function query() {
		document.sqlform.action = "<%=request.getContextPath()%>/system/sql/querySystemDataBase.do";
		document.sqlform.submit();
	}
	function update() {
		document.sqlform.action = "<%=request.getContextPath()%>/system/sql/updateSystemDataBase.do";
		document.sqlform.submit();
	}
</script>
</head>
<body>
<center class="Noprint">
	<form action="/system/sql/querySystemDataBase.do" name="sqlform" method="post">
		<table cellpadding="2" cellspacing="0" border="0">
			<tr>
				<td style="border: 0"><textarea rows="8" name="sql" cols="89">${sql}</textarea></td>
				<td style="border: 0">
					<input type="button" style="font-size: 12px" value="查询" onClick="query()" /></br></br>
					<input type="button" style="font-size: 12px" value="执行" onClick="update()" />
				</td>
			</tr>
		</table>
	</form>
</center>
<center>
	<table class="table-base" border="0" width="860">
		<tr>
			<td style="line-height: 28px; text-align: left;"><p style="text-indent: 2em">${message}</p></td>
		</tr>
	</table>
	<c:if test="${fn:length(result) > 0}">
	<table class="tabp" width="960" border="0" align="center" cellpadding="2" cellspacing="0">
		<tr>
			<th class="tdp" width="3%" style="height: 36px">序号</th>
			<c:forEach var="title" items="${matedate}">
				<th class="tdp" width="10%">${title}</th>
			</c:forEach>
		</tr>
		<c:forEach var="dataelement" items="${result}" varStatus="status">
			<tr>
				<td class="tdc">${status.count}</td>
				<c:forEach var="element" items="${dataelement}">
					<td class="tdc">&nbsp;${element.value}</td>
				</c:forEach>
			</tr>
		</c:forEach>
	</table>
	</c:if>
</center>
</body>
</html>