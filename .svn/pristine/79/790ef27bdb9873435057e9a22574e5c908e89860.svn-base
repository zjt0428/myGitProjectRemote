var LaborSettleApproveListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_applyforState_S_EQ = "3";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	var actionItems = null;
		generalItems = [ {
			lable : "合同编号",
			name : "Q_contractNo_S_LK"
		}, {
			lable : "承租方",
			name : "Q_paEntName_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "项目经理",
			name : "Q_leaseProjectHead_S_LK"
		}, {
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			lable : "结算时间",
			name : "Q_startSettleDate_S_GE"
		}, {
			lable : "至",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_startSettleDate_S_LE"
		} ];
	actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "详情",
		handler : this.loadLaborSettleApprove
	} ];
	var datagrid_config = {
		store : {
			fields : LaborSettleListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		columns : [ {
			header : "合同编号",
			dataIndex : "contractNo"
		}, {
			header : "承租方",
			dataIndex : "paEntName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "结算开始时间",
			dataIndex : "startSettleDate"
		}, {
			header : "截止时间",
			dataIndex : "endSettleDate"
		}, {
			header : "工地项目经理",
			dataIndex : "leaseProjectHead"
		}, {
			header : "结算金额",
			dataIndex : "costTotal"
		}, {
			header : "结余",
			dataIndex : "afterTaxAmount"
		}, {
			header : "创建时间",
			dataIndex : "createDate"
		}, {
			header : "结算状态",
			dataIndex : "applyforStateName"
		}, {
			header : "支付状态",
			dataIndex : "payStateName"
		}, {
			header : "已付金额",
			dataIndex : "paidAmount"
		}]
	};
LaborSettleApproveListView.superclass.constructor.call(this, Ext.apply({
		id : "LaborSettleApproveListView",
		title : '办结事项',
		iconCls : "menu-business-inspect",
		url : __ctxPath + "/dispatch/listLaborSettle.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(LaborSettleApproveListView, Knight.ux.SearchGridPanel, {
	loadLaborSettleApprove : function(a) {
		new LaborSettleForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
});