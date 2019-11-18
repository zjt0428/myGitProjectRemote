var SettleMaterialsDetailSecondGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [ {
		xtype : "datecolumn",
		header : "单据日期",
		dataIndex : "receiptDate",
		format : "Y-m-d"
	}, {
		header : "单据类型",
		dataIndex : "receiptType"
	}, {
		header : "单据号码",
		dataIndex : "relateSerial"
	}, {
		header : "品名",
		dataIndex : "commodity"
	}, {
		hidden : this.display? false : true,
		header : "损坏类型",
		dataIndex : "damageType"
	}, {
		header : "计量单位",
		dataIndex : "unit"
	}, {
		header : "数量",
		dataIndex : "quantity"
	}, {
		header : "单价",
		dataIndex : "compensationUnit"
	}, {
		header : "金额",
		dataIndex : "amount"
	}]
	
	SettleMaterialsDetailSecondGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		addForbidden : true,
		fields : SettleMaterialsDetailSecondViewField,
		loadurl : this.loadUrl,
		base_params : this.params,
		columns : columns
	}, this.grid_config || {}));
}
Ext.extend(SettleMaterialsDetailSecondGrid, Knight.ux.SubModuleBaseGrid, {

})