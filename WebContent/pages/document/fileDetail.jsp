<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<table class="table-info" cellpadding="0" cellspacing="1" width="98%">
	<tr>
		<th width="10%">文件名</th>
		<td width="90%">
				<c:choose>
			<c:when test="${fn:length(fileAttach.fileName) > 20}">
				<c:out value="${fn:substring(fileAttach.fileName, 0, 20)}" /><c:out value="......" />
			</c:when>
			<c:otherwise>
				<c:out value="${fileAttach.fileName}" />
			</c:otherwise>
		</c:choose>
		</td>
	</tr>
	<tr>
		<th>文件路径</th>
		<td>
		<c:choose>
			<c:when test="${fn:length(fileAttach.filePath) > 55}">
				<c:out value="${fn:substring(fileAttach.filePath, 0, 55)}" /><c:out value="......" />
			</c:when>
			<c:otherwise>
				<c:out value="${fileAttach.filePath}" />
			</c:otherwise>
		</c:choose>
		</td>
	</tr>
	<tr>
		<th>上传者</th>
		<td>${fileAttach.creator }</td>
	</tr>
	<tr>
		<th>备注</th>
		<td>${fileAttach.note}</td>
	</tr>
	<tr>
		<th>上传时间</th>
		<td><fmt:formatDate value="${fileAttach.createtime}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
	</tr>
	<tr>
		<th>操作</th>
		<td>
			<img src="<%=request.getContextPath()%>/images/system/download.png" /> <a href="<%=request.getContextPath()%>/file-upload?method=download&fileId=${fileAttach.fileId}" target="_blank">下载</a>
			<c:if test="${fileAttach.ext == 'jpg'}">	<!-- FileAttachDetail.showImage(${fileAttach.fileId}, this) -->		
			  <img src="<%=request.getContextPath()%>/img/btn/commons/grid_read.png" /><a href="#" onclick="window.open('./pages/document/Preview.jsp?fileId='+${fileAttach.fileId},'预览','height=768px, width=1300px,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no')">预览</a>
			</c:if>
			<c:if test="${fileAttach.ext == 'png'}">	<!-- FileAttachDetail.showImage(${fileAttach.fileId}, this) -->		
			  <img src="<%=request.getContextPath()%>/img/btn/commons/grid_read.png" /><a href="#" onclick="window.open('./pages/document/Preview.jsp?fileId='+${fileAttach.fileId},'预览','height=768px, width=1300px,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no')">预览</a>
			</c:if>
			<c:if test="${fileAttach.ext == 'gif'}">	<!-- FileAttachDetail.showImage(${fileAttach.fileId}, this) -->		
			  <img src="<%=request.getContextPath()%>/img/btn/commons/grid_read.png" /><a href="#" onclick="window.open('./pages/document/Preview.jsp?fileId='+${fileAttach.fileId},'预览','height=768px, width=1300px,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no')">预览</a>
			</c:if>
			<c:if test="${fileAttach.ext == 'ejpg'}">	<!-- FileAttachDetail.showImage(${fileAttach.fileId}, this) -->		
			  <img src="<%=request.getContextPath()%>/img/btn/commons/grid_read.png" /><a href="#" onclick="window.open('./pages/document/Preview.jsp?fileId='+${fileAttach.fileId},'预览','height=768px, width=1300px,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no')">预览</a>
			</c:if>
		</td>		
	</tr>
</table>