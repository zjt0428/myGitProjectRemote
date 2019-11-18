var FlowDefineListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_N_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "流程名称",
			name : "Q_flowName_S_LK"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readFlowDefine
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : FlowDefineListViewField
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "流程名称",
			dataIndex : "flowName"
		}, {
			header : "创建时间",
			dataIndex : "createDt"
		}, {
			header : "创建人",
			dataIndex : "createByName"
		} ]
	};
	FlowDefineListView.superclass.constructor.call(this, Ext.apply({
		id : "FlowDefineListView",
		title : TabTitle.FLOWDEFINE_LIST,
		iconCls : "menu-business-corp",
		url : __ctxPath + "/app/listFdefine.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(FlowDefineListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_FlowDefineAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addFlow.createDelegate(this)
			});
		}
		if (isGranted("_FlowDefineEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editFlow.createDelegate(this)
			});
		}
		if (isGranted("_FlowDefineDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delFlow.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的流程！";
		var msg2 = "您确认要【" + op + "】所选的流程信息吗？";
		var msg3 = "成功【" + op + "】所选的流程信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readFlowDefine : function(a) {
		new FlowDefineForm(a,{
			title:"申请流程明细"
			}).show();
	},
	addFlow : function() {
		new FlowDefineForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editFlow : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new FlowDefineForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delFlow : function() {
		this.speciallyGridAction(this.dataGridPanel, "flowid", __ctxPath + "/app/delFdefine.do", "删除");
	}
});