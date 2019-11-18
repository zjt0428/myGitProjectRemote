<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<div class="contentDiv">
	<table class="newsList" cellpadding="0" cellspacing="0" rules="rows">
		<tr>
			<th width="20%">备忘主题</th>
			<th width="40%">办理内容</th>
			<th width="20%">办理人</th>
			<th width="20%">计划完成时间</th>
		</tr>
		<c:forEach var="display" items="${displayList}">
			<tr>
				<td nowrap="nowrap">
					<a href="#" onclick="PortletPanelView.memoElementOnclick('${display.MEMO_ID}')">${display.MEMO_THEME}</a>
				</td>
				<td nowrap="nowrap">
				<c:choose>
					<c:when test="${fn:length(display.CONTENTS)>40}"><a>${fn:substring(display.CONTENTS,0,40)}...</a></c:when>
					<c:otherwise><a>${display.CONTENTS}</a></c:otherwise>
				</c:choose>
				</td>
				<td nowrap="nowrap"><a>${display.PRACTI_NAME}</a></td>
				<td nowrap="nowrap"><a>${display.PLAN_FINISHED_DATE}</a></td>
			</tr>
		</c:forEach>
	</table>
</div>
<div class="moreDiv">
	<span><a href="#" onclick="App.clickTopTab('MemoListView')">更多...</a></span>
</div>