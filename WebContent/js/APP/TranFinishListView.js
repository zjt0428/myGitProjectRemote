var TranFinishListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_state_S_EQ = 3;
	this.userId = "";
	if (!isGranted("_FlowQueryAll")) {
		this.userId = curUserInfo.userId;
	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var flowTypeCombo = $initComboBoxField("申请流程", "Q_flowType_S_EQ", "flowType");
	var stateNameCombo = $initComboBoxField("状态", "Q_state_S_EQ", "APPFLOW_STATE");
	var depSelector = new TreeSelector("depTreeSelector", __ctxPath + "/system/listDepartment.do?opt=appUser", "所属部门", "appUser.depId",true, {
		lable : "所属部门",
		name : "Q_depname_S_LK",
		width : 100
	});
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [flowTypeCombo,stateNameCombo,{
			lable : "申请内容",
			name : "Q_content_S_LK"
		},{
			lable : "审批人",
			name : "Q_chkUserName_S_LK"
		},{
			lable : "申请人",
			name : "Q_userName_S_LK"
		},depSelector,{
			lable : "开始日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDt_S_GE"
		},{
			lable : "结束日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDt_S_LE"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readTransaction
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : TransApprovelListViewField
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [{
			header : "状态",
			dataIndex : "stateName"
		}, {
			header : "申请流程",
			dataIndex : "flowName"
		}, {
			header : "流程类型",
			dataIndex : "flowType"
		}, {
			header : "出差/休假天数",
			dataIndex : "days"
		},{
			header : "申请日期",
			dataIndex : "applyDt"
		},{
			header : "申请人",
			dataIndex : "userName"
		},{
			header : "申请内容",
			dataIndex : "content"
		},{
			header : "申请部门",
			dataIndex : "depname"
		},{
			header : "当前审批人",
			dataIndex : "chkUserName"
		}]
	};
	TranFinishListView.superclass.constructor.call(this, Ext.apply({
		id : "TranFinishListView",
		title : TabTitle.TRANFINISH_VIEW,
		iconCls : "menu-info",
		url : __ctxPath + "/app/listFlow.do?TYPE=4&userId="+this.userId,
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(TranFinishListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		tbarItems.push("->");
		if (isGranted("_FinishExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportFlow.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的工作备忘！";
		var msg2 = "您确认要【" + op + "】所选的工作备忘吗？";
		var msg3 = "成功【" + op + "】所选的工作备忘！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	readTransaction : function(a) {
		new FlowForm(a,{title:"我的审批"}).show();
	},
	exportFlow : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/app/exportFlow.do", this.dataGridPanel);
	}
});