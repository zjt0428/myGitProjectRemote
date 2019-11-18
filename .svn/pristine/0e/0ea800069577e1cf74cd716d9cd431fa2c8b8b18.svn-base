var CustomerAccountGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var defaultFlagChecked = new Ext.grid.CheckColumn({
		width : 40,
		header : "默认",
		dataIndex : "defaultFlag"
	});
	var columns = [ {
		header : "开户行",
		dataIndex : "bankDeposit",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "账号",
		dataIndex : "account",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "开户行地址",
		dataIndex : "address",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	}, defaultFlagChecked ];
	CustomerAccountGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : CustomerAccountListViewField,
		title : "客户帐户信息",
		option : "客户帐户",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		grid_view : {
			plugins : defaultFlagChecked
		},
		delurl : __ctxPath + "/archive/multiDelAccountCustomer.do"
	}, this.grid_config || {}));
};
Ext.extend(CustomerAccountGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			customerId : this.customerId,
			bankDeposit : null,
			account : null,
			address : null
		};
	}
});