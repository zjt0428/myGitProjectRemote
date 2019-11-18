var PurchaseAcceptanceGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "验收结果",
		dataIndex : "acceptanceStatusName"
	}, {
		header : "处理方式",
		dataIndex : "handleMethodName"
	}, {
		header : "预计到货时间",
		dataIndex : "arrivalPlanDate"
	}, {
		header : "预计退款时间",
		dataIndex : "refundPlanDate"
	}, {
		header : "登记人",
		dataIndex : "userName"
	}, {
		header : "登记时间",
		dataIndex : "providedDate"
	}, {
		header : "不合格原因",
		dataIndex : "unqualified"
	}, {
		header : "备注",
		dataIndex : "remark"
	} ];
	PurchaseAcceptanceGrid.superclass.constructor.call(this, {
		fields : PurchaseAcceptanceListViewField,
		title : "验收信息",
		height : this.height,
		columns : columns
	});
};
Ext.extend(PurchaseAcceptanceGrid, Knight.ux.SubModuleBaseGrid, {});