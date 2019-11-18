<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<div class="contentDiv">
	<table class="newsList" cellpadding="0" cellspacing="0" rules="rows">
		<c:forEach var="display" items="${displayList}">
			<tr>
				<td><a href="#" onclick="PortletPanelView.componentParachuteElementOnclick('${display.componId}')">配件名称：${display.componGenericName}&nbsp;&nbsp;|&nbsp;&nbsp;设备型号：${display.componSpecificName}&nbsp;&nbsp;|&nbsp;&nbsp;RFID号：${display.rfidCode}</a></td>
				<td width="80" nowrap="nowrap"><a>检测日期:${display.parachuteCheckDate}</a></td>
			</tr>
		</c:forEach>
	</table>
</div>
<div class="moreDiv">
	<span><a href="#" onclick="PortletPanelView.settleContractListView()">更多...</a></span>
</div>