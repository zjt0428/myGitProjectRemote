<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<div class="contentDiv">
	<table class="newsList" cellpadding="0" cellspacing="0" rules="rows">
		<c:forEach var="display" items="${displayList}">
			<tr>
				<td><a href="#" onclick="PortletPanelView.contractLeaseElementOnclick('${display.contractId}', '${display.fundType}')">合同编号：${display.contractSerial}&nbsp;&nbsp;|&nbsp;&nbsp;主题：${display.contractTheme}&nbsp;&nbsp;|&nbsp;&nbsp;合同金额：${display.contractAmount}</a></td>
				<td width="80" nowrap="nowrap"><a>${display.providedDate}</a></td>
			</tr>
		</c:forEach>
	</table>
</div>
<div class="moreDiv">
	<span><a href="#" onclick="PortletPanelView.contractLeaseListView()">更多...</a></span>
</div>