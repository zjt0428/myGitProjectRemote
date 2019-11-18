<%--
  Created by IntelliJ IDEA.
  User: YaoFly
  Date: 2016/12/26
  Time: 15:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title>资料打印</title>
</head>
<body>
<c:forEach items="${catalogues}" var="pageName">
    <jsp:include page="${pageName}.jsp"/>
</c:forEach>
</body>
</html>
