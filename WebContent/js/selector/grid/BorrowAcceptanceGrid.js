var BorrowAcceptanceGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		width : 100,
		header : "验收结果",
		dataIndex : "acceptanceStatusName"
	}, {
		width : 100,
		header : "处理方式",
		dataIndex : "handleMethodName"
	}, {
		width : 100,
		header : "预计到货时间",
		dataIndex : "arrivalPlanDate"
	}, {
		width : 100,
		header : "预计退款时间",
		dataIndex : "refundPlanDate"
	}, {
		width : 100,
		header : "退款金额",
		dataIndex : "compensateAmount"
	}, {
		width : 100,
		header : "登记人",
		dataIndex : "userName"
	}, {
		width : 100,
		header : "登记时间",
		dataIndex : "providedDate"
	}, {
		width : 100,
		header : "不合格原因",
		dataIndex : "unqualified"
	}, {
		width : 100,
		header : "备注",
		dataIndex : "remark"
	} ];
	BorrowAcceptanceGrid.superclass.constructor.call(this, {
		fields : BorrowAcceptanceListViewField,
		title : "验收信息",
		height : this.height,
		columns : columns
	});
};
Ext.extend(BorrowAcceptanceGrid, Knight.ux.SubModuleBaseGrid, {});