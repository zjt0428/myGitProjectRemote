var TruckPlanListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
//	this.params["Q_arrangeType_S_EQ"] = "0";
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "业务主题",
			name : "Q_truckPlanTheme_S_LK"
		},{
			lable : "工程名称",
			name : "Q_projectName_S_LK"
		},{
			lable : "承租单位",
			name : "Q_pbEntName_S_LK"
		},{
			lable : "申请日期",
			width : 115,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_GE"
		},{
			lable : "至",
			width : 115,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadTruckPlan
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : TruckPlanListViewField
		},
		rowAction : {
			width : 80,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "业务编号",
			dataIndex : "truckPlanSerial"
		}, {
			header : "业务主题",
			dataIndex : "truckPlanTheme"
		}, {
			header : "申请日期",
			dataIndex : "providedDate"
		}, {
			header : "工程名称",
			dataIndex : "projectName"
		}, {
			header : "承租单位",
			dataIndex : "customerName"
		}, {
			header : "预计进场时间 ",
			dataIndex : "startDate"
		}, {
			hidden :true,
			width : 60,
			header : "状态 ",
			dataIndex : "applyforStateName"
		} ]
	};
	TruckPlanListView.superclass.constructor.call(this, Ext.apply({
		id : "TruckPlanListView",
		title : TabTitle.TRUCK_PLAN_LIST,
		iconCls : "menu-business-borrow",
		url : __ctxPath + "/dispatch/listTruckPlan.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(TruckPlanListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveTruckPlan
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
		case "1":
			if (isGranted("_TruckPlanApprove")) {
				action[1].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_TruckPlanNewAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addTruckPlan.createDelegate(this)
			});
		}
		if (isGranted("_TruckPlanEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editTruckPlan.createDelegate(this)
			});
		}
		if (isGranted("_TruckPlanMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitTruckPlan.createDelegate(this)
			});
		}
		if (isGranted("_TruckPlanMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delTruckPlan.createDelegate(this)
			});
		}
//		tbarItems.push("->");
//		if (isGranted("_ContractArrangePrint")) {
//			tbarItems.push({
//				iconCls : "btn-head-print",
//				text : "打印",
//				handler : this.printTruckPlan.createDelegate(this)
//			});
//		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的泵车计划！";
		var msg2 = "您确认要【" + op + "】所选的泵车计划吗？";
		var msg3 = "成功【" + op + "】所选的泵车计划！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	approveTruckPlan : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审批】的业务申请必须是【待审批】的状态！");
			return;
		}
		new TruckPlanForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadTruckPlan : function(a) {
		new TruckPlanForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addTruckPlan : function() {
		new TruckPlanForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editTruckPlan : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的业务申请必须是【待提交】的状态！");
			return;
		}
		new TruckPlanForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitTruckPlan : function() {
		this.speciallyGridAction(this.dataGridPanel, "truckPlanId", __ctxPath + "/dispatch/multiSubmitTruckPlan.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的业务申请必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	delTruckPlan : function() {
		this.speciallyGridAction(this.dataGridPanel, "truckPlanId", __ctxPath + "/dispatch/multiDelTruckPlan.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的业务申请必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	printTruckPlan : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/dispatch/printTruckPlan.do?formpage=TruckPlan&truckPlanId=" + a[0].data["truckPlanId"];
		});
	}
});