var FinanceSalaryListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	FinanceSalaryListView.superclass.constructor.call(this, Ext.apply({
		id : "FinanceSalaryListView",
		params : this.params
	}, a));
};
Ext.extend(FinanceSalaryListView, SalaryListView, {
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_FinanceSalaryAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_FinanceSalaryApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_FinanceSalaryAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSalary.createDelegate(this)
			});
		}
		if (isGranted("_FinanceSalaryEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSalary.createDelegate(this)
			});
		}
		if (isGranted("_FinanceSalaryMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitSalary.createDelegate(this)
			});
		}
		if (isGranted("_FinanceSalaryMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSalary.createDelegate(this)
			});
		}
		return tbarItems;
	}
});