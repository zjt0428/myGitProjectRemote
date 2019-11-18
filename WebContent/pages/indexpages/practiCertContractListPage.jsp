<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<div class="contentDiv">
	<table class="newsList" cellpadding="0" cellspacing="0" rules="rows">
		<c:forEach var="display" items="${displayList}">
			<tr>
				<td><a href="#" onclick="PortletPanelView.practiCertElementOnclick('${display.certId}')">所属人员：${display.practitioner.practiName}&nbsp;&nbsp;|&nbsp;&nbsp;从业工种：${display.practiKindworkName}&nbsp;&nbsp;|</a></td>
				<td width="80" nowrap="nowrap"><a>发证单位：${display.awardDepart}&nbsp;|</a></td>
				<td width="80" nowrap="nowrap"><a>&nbsp;截止日期：${display.contractDate}</a></td>
			</tr>
		</c:forEach>
	</table>
</div>
<div class="moreDiv">
	<span><a href="#" onclick="PortletPanelView.practiCertListView()">更多...</a></span>
</div>