var ExeuntPlanListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "单据号",
			name : "Q_exeuntPlanSerial_S_LK"
		}, {
			lable : "工程名称",
			name : "Q_projectName_S_LK"
		}, $initComboBoxField("工程类型", "Q_projectType_S_LK", "projectType", {
			width : 140,
			lable : "工程类型",
			editable : false,
			allowBlank : true,
		}), {
			lable : "计划申报人",
			name : "Q_planApplicant_S_LK"
		}, $initComboBoxField("计划类型", "Q_planType_S_LK", "planType", {
			width : 140,
			lable : "计划类型",
			editable : false,
			allowBlank : true,
		}),{
			lable : "申报日期",
			width : 115,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_declareDate_S_GE"
		}, {
			lable : "至",
			width : 115,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_declareDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadExeuntPlan
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
			fields : ExeuntPlanListViewField
		},
		rowAction : {
			width : 80,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : " 状态",
			dataIndex : "applyforStateName"
		}, {
			header : "单据号",
			dataIndex : "exeuntPlanSerial"
		}, {
			header : "申报时间",
			dataIndex : "declareDate"
		}, {
			header : "工程名称",
			dataIndex : "projectName"
		}, {
			header : "工程类型",
			dataIndex : "projectTypeName"
		}, {
			header : "计划申报人",
			dataIndex : "planApplicant"
		}, {
			header : "计划类型",
			dataIndex : "planTypeName"
		}, {
			header : "租赁资产属性 ",
			dataIndex : "assetsPropertyName"
		}]
	};
	ExeuntPlanListView.superclass.constructor.call(this, Ext.apply({
		id : "ExeuntPlanListView",
		title : TabTitle.EXEUNT_PLAN_LIST,
		iconCls : "menu-business-borrow",
		url : __ctxPath + "/dispatch/listExeuntPlan.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config,
		datagrid_view : {
			stripeRows : true
		}
	}, a));
};
Ext.extend(ExeuntPlanListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "核准",
			hidden : true,
			handler : this.acceptExeuntPlan.createDelegate(this)
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "确认",
			hidden : true,
			handler : this.approveExeuntPlan.createDelegate(this)
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
		case "1":
			if (isGranted("_ExeuntPlanApproval")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_ExeuntPlanConfirm")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ExeuntPlanNewAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addExeuntPlan.createDelegate(this)
			});
		}
		if (isGranted("_ExeuntPlanEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editExeuntPlan.createDelegate(this)
			});
		}
		if (isGranted("_ExeuntPlanMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitExeuntPlan.createDelegate(this)
			});
		}
		if (isGranted("_ExeuntPlanMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delExeuntPlan.createDelegate(this)
			});
		}
		tbarItems.push("->");
		/*
		if (isGranted("_ExeuntPlanPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printExeuntPlan.createDelegate(this)
			});
		}
		*/
		if (isGranted("_ExeuntPlanExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportExeuntPlan.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】所选的退场计划！";
		var msg2 = "您确认要【" + op + "】所选的退场计划吗？";
		var msg3 = "成功【" + op + "】所选的退场计划！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptExeuntPlan : function(a) {
		if ("1" != a.applyforState) {
			$toast("【核准】的业务申请必须是【待核准】的状态！");
			return;
		}
		new ExeuntPlanForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveExeuntPlan : function(a) {
		if ("2" != a.applyforState) {
			$toast("【确认】的业务申请必须是【待确认】的状态！");
			return;
		}
		new ExeuntPlanForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadExeuntPlan : function(a) {
		new ExeuntPlanForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addExeuntPlan : function() {
		new ExeuntPlanForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editExeuntPlan : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的退场计划必须是【待提交】的状态！");
			return;
		}
		new ExeuntPlanForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitExeuntPlan : function() {
		this.speciallyGridAction(this.dataGridPanel, "exeuntPlanId", __ctxPath + "/dispatch/multiSubmitExeuntPlan.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的退场计划必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	delExeuntPlan : function() {
		this.speciallyGridAction(this.dataGridPanel, "exeuntPlanId", __ctxPath + "/dispatch/multiDelExeuntPlan.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的退场计划必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	printExeuntPlan : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/dispatch/printExeuntPlan.do?formpage=ExeuntPlan&exeuntPlanId=" + a[0].data["exeuntPlanId"];
		});
	},
	exportExeuntPlan : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportExeuntPlan.do", this.dataGridPanel);
	}
});