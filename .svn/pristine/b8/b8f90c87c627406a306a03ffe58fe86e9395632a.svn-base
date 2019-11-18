var SettlementInfoGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		dataIndex : "materialsId"
	}, {
		header : "周材编号",
		dataIndex : "mnemonics"
	}, {
		header : "周材品名",
		dataIndex : "commodity"
	}, {
		header : "规格型号",
		dataIndex : "specifications"
	}, {
		header : "结算天数",
		dataIndex : "settlementDays"
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "数量",
		dataIndex : "quantity"
	}, {
		header : "单价",
		dataIndex : "unitPrice"
	}, {
		header : "金额",
		dataIndex : "amount"
	}, {
		header : "备注",
		dataIndex : "remarks"
	}];
	
	SettlementInfoGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "结算管理清单",
		option : "结算管理",
		fields : SettlementInfoListViewField,
		tbarItems : this.tbarItems,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelInfoLeasePayment.do"
	}, this.grid_config || {}));
}
Ext.extend(SettlementInfoGrid, Knight.ux.SubModuleBaseGrid, {
	
})