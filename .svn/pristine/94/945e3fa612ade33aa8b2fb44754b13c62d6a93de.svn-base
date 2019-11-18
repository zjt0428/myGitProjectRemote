<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="kfn" uri="http://www.knight.com/jsp/jstl/functions"%>
<div class="contentDiv">
	<table class="newsList" cellpadding="0" cellspacing="0" rules="rows">
		<c:forEach var="display" items="${displayList}">
			<tr>
				<td><a href="#" onclick="PortletPanelView.settleContractElementOnclick('${display.PROJECT_NAME}', '${display.PA_ENT_NAME}')">项目名称：${display.PROJECT_NAME}&nbsp;&nbsp;|&nbsp;&nbsp;承租方：${display.PA_ENT_NAME}&nbsp;&nbsp;</a></td>
				<td width="80" nowrap="nowrap"><a>&nbsp;应收金额：${display.RECEIVABLE_DEBIT}</a></td>
			</tr>
		</c:forEach>
	</table>
</div>
<div class="moreDiv">
	<span><a href="#" onclick="PortletPanelView.settleContractListView()">更多...</a></span>
</div>