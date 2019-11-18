var LaborSettleListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_applyforState_S_EQ = "0";
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
		handler : this.loadLaborSettle
	} ];
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : LaborSettleListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
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
		}]
	};
LaborSettleListView.superclass.constructor.call(this, Ext.apply({
		id : "LaborSettleListView",
		title : '待办事项',
		iconCls : "menu-business-inspect",
		url : __ctxPath + "/dispatch/listLaborSettle.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(LaborSettleListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_LaborSettleEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editLaborSettle.createDelegate(this)
			});
		}
		if (isGranted("_LaborSettleMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLaborSettle.createDelegate(this)
			});
		}
		if (isGranted("_LaborSettleSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.subLaborSettle.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的结算单！";
		var msg2 = "您确认要【" + op + "】所选结算单吗？";
		var msg3 = "成功【" + op + "】所选结算单！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	editLaborSettle : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new LaborSettleForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delLaborSettle : function() {
		this.speciallyGridAction(this.dataGridPanel, "laborSettId", __ctxPath + "/dispatch/multiDelLaborSettle.do", "删除");
	},
	subLaborSettle : function() {
		this.speciallyGridAction(this.dataGridPanel, "laborSettId", __ctxPath + "/dispatch/submitLaborSettle.do", "提交");
	},
	loadLaborSettle : function(a) {
		new LaborSettleForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
});