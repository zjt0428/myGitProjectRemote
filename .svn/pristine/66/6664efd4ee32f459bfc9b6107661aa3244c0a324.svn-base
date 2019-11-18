var IncomeExpenseListView = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// ===================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			width : 60,
			xtype : "combo",
			lable : "类型",
			hiddenName : "Q_[AMOUNT_TYPE]_S_EQ",
			name : "Q_[AMOUNT_TYPE]_S_EQ",
			mode : "local",
			editable : true,
			triggerAction : "all",
			store : [ [ "0", "支出" ], [ "1", "收入" ] ]
		}, {
			width : 80,
			lable : "业务编号",
			name : "Q_[RELATE_SERIAL]_S_LK"
		}, {
			width : 80,
			lable : "单据编号",
			name : "Q_[AMOUNT_SERIAL]_S_LK"
		}, {
			width : 80,
			lable : "经办人",
			name : "Q_[PRACTI_NAME]_S_LK"
		}, {
			lable : "时间区间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_[PROVIDED_DATE]_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_[PROVIDED_DATE]_S_LE"
		} ];
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : [ "AMOUNT_SERIAL", "PROVIDED_DATE", "ENT_NAME", "PROJECT_NAME", "AMOUNT_TYPE_NAME", "RELATE_THEME", "RELATE_SERIAL", "RECEIVE_AMOUNT", "PAYMENT_AMOUNT", "PRACTI_NAME" ]
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 80,
			header : "单据编号",
			dataIndex : "AMOUNT_SERIAL"
		}, {
			width : 80,
			header : "发生日期",
			dataIndex : "PROVIDED_DATE"
		}, {
			width : 60,
			header : "类型",
			dataIndex : "AMOUNT_TYPE_NAME"
		}, {
			width : 80,
			header : "收支单位",
			dataIndex : "ENT_NAME"
		}, {
			width : 80,
			header : "项目名称",
			dataIndex : "PROJECT_NAME"
		}, {
			width : 80,
			header : "业务主题",
			dataIndex : "RELATE_THEME"
		}, {
			width : 80,
			header : "业务编号",
			dataIndex : "RELATE_SERIAL"
		}, {
			width : 80,
			header : "收入金额",
			dataIndex : "RECEIVE_AMOUNT"
		}, {
			width : 60,
			header : "支出金额",
			dataIndex : "PAYMENT_AMOUNT"
		}, {
			width : 80,
			header : "经办人",
			dataIndex : "PRACTI_NAME"
		} ]
	};
	IncomeExpenseListView.superclass.constructor.call(this, Ext.apply({
		id : "IncomeExpenseListView",
		title : "收支明细表",
		iconCls : "menu-business-incomeexpense",
		url : __ctxPath + "/form/listIncomeExpense.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(IncomeExpenseListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		tbarItems.push("->");
		tbarItems.push({
			iconCls : "btn-head-exporter",
			text : "导出",
			handler : this.exportIncomeExpense.createDelegate(this)
		});
		return tbarItems;
	},
	exportIncomeExpense : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/form/exportIncomeExpense.do", this.dataGridPanel);
	}
});