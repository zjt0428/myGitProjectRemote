var SettleMaterialsDetailOtherFeeGrid = function (a, b) {
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
		header : "仓库",
		dataIndex : "depotName"
	}, {
		header : "收费类型",
		dataIndex : "feesType"
	}, {
		header : "结算关系",
		dataIndex : "calculationMethod"
	}, {
		header : "金额",
		dataIndex : "amount"
	}]
	
	SettleMaterialsDetailOtherFeeGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		addForbidden : true,
		fields : SettleMaterialsDetailOtherFeeViewField,
		loadurl : this.loadUrl,
		base_params : this.params,
		columns : columns
	}, this.grid_config || {}));
}
Ext.extend(SettleMaterialsDetailOtherFeeGrid, Knight.ux.SubModuleBaseGrid, {

})