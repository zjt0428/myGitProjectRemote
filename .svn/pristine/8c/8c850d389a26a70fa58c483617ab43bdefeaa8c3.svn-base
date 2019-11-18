var SettleContractRecordListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	Ext.apply(this, {
		practiDepartmentId : Ext.id()
	});
	// =====================================================================//
	if (!this.searchDisenable) {
		var fundStatusCombo = $initComboBoxField("款项状态", "Q_fundStatus_S_EQ", "FUND_PLAN_STATUS", {
			width : 80,
			lable : "款项状态",
			allowBlank : true
		});
		var generalItems = [];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadSettleContract
	}, {
		iconCls : "btn-package_go",
		qtip : "查看",
		handler : this.readSettleContractEquip
	}];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		delayed_load : this.delayed_load,
		store : {
			fields : SettleContractRecordListViewField
		},
		rowAction : {
			width : 75,
			/*actionItems : actionItems*/
		},
		tbarItems : tbarItems,
		columns : [ 
			{
			width : 60,
			header : "打印时间",
			dataIndex : "createTime"
		}, {
			width : 60,
			header : "制单人",
			dataIndex : "userName"
		}
		]
	};
	SettleContractRecordListView.superclass.constructor.call(this, Ext.apply({
		id : "SettleContractRecordListView",
		title : "结算单打印记录",
		iconCls : "menu-business-settle",
		url : __ctxPath + "/dispatch/recordlistSettleContract.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config,
	}, a));
};
Ext.extend(SettleContractRecordListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	
	
});