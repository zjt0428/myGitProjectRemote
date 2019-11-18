<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<div class="contentDiv">
	<table class="newsList" cellpadding="0" cellspacing="0" rules="rows">
		<c:forEach var="display" items="${displayList}">
			<tr>
				<td><a href="#" onclick="PortletPanelView.insureEquipElementOnclick('${display.insureId}')">保险单号：${display.insureSerial}&nbsp;&nbsp;|&nbsp;&nbsp;备案编号：${display.equipment.recordId}&nbsp;&nbsp;|</a></td>
				<td width="80" nowrap="nowrap"><a>起保日：${display.startInsureDate}&nbsp;|</a></td>
				<td width="80" nowrap="nowrap"><a>&nbsp;终保日：${display.endInsureDate}</a></td>
			</tr>
		</c:forEach>
	</table>
</div>
<div class="moreDiv">
	<span><a href="#" onclick="PortletPanelView.insureEquipListView()">更多...</a></span>
</div>