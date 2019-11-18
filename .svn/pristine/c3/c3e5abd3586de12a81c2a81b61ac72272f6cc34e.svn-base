var AmountReceiveGrid = function(a,b){
	Ext.apply(this,a||{});
	Ext.apply(this.b||{});
	this.title = this.title ? this.title : "收款信息";
	var columns = [ {
		header : "收款主题",
		dataIndex : "amountTheme"
	}, {
		header : "项目名称",
		dataIndex : "projectName"
	}, {
		header : "收款单位",
		dataIndex : "receiveEntName"
	}, {
		header : "收款金额",
		dataIndex : "receiveAmount"
	}, {
		header : "付款方",
		dataIndex : "paymentName"
	}, {
		header : "收款日期",
		dataIndex : "receiveDate"
	}, {
		header : "经办人员",
		dataIndex : "practiName"
	},{
		header : "填报时间",
		dataIndex : "providedDate"
	} ];
	AmountReceiveGrid.superclass.constructor.call(this, Ext.apply({
//		saveable : this.saveable,
//		selectable : this.selectable,
		fields : AmountReceiveListViewField,
		title : this.title,
		option : "收款信息",
//		tbarItems : this.tbarItems,
//		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/fund/multiDelAmountReceive.do"
	}, this.grid_config || {}));
};
Ext.extend(AmountReceiveGrid, Knight.ux.SubModuleBaseGrid, {});