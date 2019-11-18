var AmountPaymentGrid = function(){
//	Ext.apply(this,a||{});
//	Ext.apply(this.b||{});
	this.title = this.title ? this.title : "已付款记录";
	var columns = [ {
		header : "已付款金额",
		dataIndex : "paymentAmount"
	}, {
		header : "付款日期",
		dataIndex : "paymentDate"
	}, {
		header : "经办人",
		dataIndex : "practiName"
	} ];
	AmountPaymentGrid.superclass.constructor.call(this, Ext.apply({
//		saveable : this.saveable,
//		selectable : this.selectable,
		fields : AmountPaymentListViewField,
		title : this.title,
		option : "已付款记录",
//		tbarItems : this.tbarItems,
//		height : this.height,
		columns : columns,
//		delurl : __ctxPath + "/fund/multiDelAmountReceive.do"
	}, this.grid_config || {}));
};
Ext.extend(AmountPaymentGrid, Knight.ux.SubModuleBaseGrid, {});