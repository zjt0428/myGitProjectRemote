var FinanceSettleContractListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	FinanceSettleContractListView.superclass.constructor.call(this, Ext.apply({
		id : "FinanceSettleContractListView",
		title : TabTitle.SETTLE_CONTRACT_LIST,
		params : this.params
	}, a));
};
Ext.extend(FinanceSettleContractListView, SettleContractListView, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_FinanceSettleContractAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSettleContract.createDelegate(this)
			});
		}
		if (isGranted("_FinanceSettleContractEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSettleContract.createDelegate(this)
			});
		}
		if (isGranted("_FinanceSettleContractMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveSettleContract.createDelegate(this)
			});
		}
		if (isGranted("_FinanceSettleContractMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSettleContract.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_FinanceSettleContractPrinter")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printSettleContract.createDelegate(this)
			});
		}
		if (isGranted("_FinanceSettleContractExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportSettleContract.createDelegate(this)
			});
		}
		return tbarItems;
	}
});