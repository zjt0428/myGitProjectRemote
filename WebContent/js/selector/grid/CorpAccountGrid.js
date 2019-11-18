var CorpAccountGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		width : 100,
		header : "开户行",
		dataIndex : "bankDeposit",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		width : 100,
		header : "账号",
		dataIndex : "account",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		width : 100,
		header : "开户行地址",
		dataIndex : "address",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	}, {
		width : 100,
		header : "帐户余额",
		dataIndex : "balance",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 12
		})
	} ];
	var fields = [ "corpAccountId", "corpId", "bankDeposit", "account", "balance", "address" ];
	CorpAccountGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : fields,
		title : "企业帐户信息",
		option : "企业帐户",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelAccountCorpInfo.do"
	}, this.grid_config || {}));
};
Ext.extend(CorpAccountGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			corpId : this.corpId,
			bankDeposit : "",
			account : "",
			balance : 0,
			address : ""
		};
	}
});