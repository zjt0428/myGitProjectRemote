<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<div class="contentDiv">
	<table class="newsList" cellpadding="0" cellspacing="0" rules="rows">
		<c:forEach var="display" items="${displayList}">
			<tr>
				<td>
					<a href="#" onclick="PortletPanelView.announceUserElementOnclick('${display.announceId}', '${display.publishTime}', '${display.announceUserId}')">
					<c:choose>
						<c:when test="${fn:length(display.announce.announce)>40}">${fn:substring(display.announce.announce,0,40)}...</c:when>
						<c:otherwise>${display.announce.announce}</c:otherwise>
					</c:choose>
					</a>
				</td>
				<td width="80" nowrap="nowrap"><a><fmt:formatDate value="${display.publishTime}" pattern="yyyy-MM-dd" /></a></td>
			</tr>
		</c:forEach>
	</table>
</div>
<div class="moreDiv">
	<span><a href="#" onclick="App.clickTopTab('AnnounceUserListView')">更多...</a></span>
</div>