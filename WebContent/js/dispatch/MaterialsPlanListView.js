var MaterialsPlanListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var projectTypeCombo = $initComboBoxField("工程类型", "Q_projectType_S_LK", "projectType", {
			width : 140,
			lable : "工程类型",
			editable : true,
			allowBlank : true,
		});
		var planTypeCombo = $initComboBoxField("计划类型", "Q_planType_S_LK", "planType", {
			width : 140,
			lable : "计划类型",
			editable : true,
			allowBlank : true,
		});
		var generalItems = [ {
			lable : "单据号",
			name : "Q_documentSerial_S_LK"
		}, projectTypeCombo, {
			lable : "工程名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "计划申报人",
			name : "Q_userName_S_LK"
		}, planTypeCombo, {
			lable : "申报时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_reportingTime_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_reportingTime_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadMaterialsPlan
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		delayed_load : this.delayed_load,
		store : {
			fields : MaterialsPlanListViewField
		},
		rowAction : {
			width : 75,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 60,
			header : "状态",
			dataIndex : "applyforStateName"
		}, {
			header : "单据号",
			dataIndex : "documentSerial"
		}, {
			header : "工程名称",
			dataIndex : "projectName"
		}, {
			header : "申报时间",
			dataIndex : "reportingTime"
		}, {
			header : "工程类型",
			dataIndex : "projectTypeName"
		}, {
			header : "计划申报人",
			dataIndex : "userName"
		}, {
			header : "计划类型",
			dataIndex : "planTypeName"
		}, {
			header : "租赁资产属性",
			dataIndex : "assetsPropertyName"
		} ]
	};
	MaterialsPlanListView.superclass.constructor.call(this, Ext.apply({
		id : "MaterialsPlanListView",
		title : TabTitle.MATERIALS_PLAN_LIST,
		iconCls : "menu-business-settle",
		url : __ctxPath + "/dispatch/listMaterialsPlan.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(MaterialsPlanListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "核准",
			hidden : true,
			handler : this.acceptMaterialsPlan
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "确认",
			hidden : true,
			handler : this.approveMaterialsPlan
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
		case "1":
			if (isGranted("_MaterialsPlanAccept")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_MaterialsPlanApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_MaterialsPlanNewAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addMaterialsPlan.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsPlanEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editMaterialsPlan.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsPlanMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delMaterialsPlan.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsPlanMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitMaterialsPlan.createDelegate(this)
			});
		}
//		if (isGranted("_MaterialsPlanAccept")) {
//			tbarItems.push({
//				iconCls : "btn-submit",
//				text : "核准",
//				handler : this.submitMaterialsPlan.createDelegate(this)
//			});
//		}
//		if (isGranted("_MaterialsPlanApprove")) {
//			tbarItems.push({
//				iconCls : "btn-submit",
//				text : "确认",
//				handler : this.submitMaterialsPlan.createDelegate(this)
//			});
//		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va, cmm) {
		var msg1 = "请选择要【" + op + "】的周材计划信息！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的周材计划信息吗？";
		var msg3 = "成功【" + op + "】所选的周材计划信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptMaterialsPlan : function(a) {
		if ("1" != a.applyforState) {
			$toast("【核准】的业务申请必须是【待核准】的状态！");
			return;
		}
		new MaterialsPlanForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveMaterialsPlan : function(a) {
		if ("2" != a.applyforState) {
			$toast("【确认】的周材计划必须是【待确认】的状态！");
			return;
		}
		new MaterialsPlanForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadMaterialsPlan : function(a) {
		new MaterialsPlanForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addMaterialsPlan : function() {
		new MaterialsPlanForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editMaterialsPlan : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new MaterialsPlanForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delMaterialsPlan : function() {
		this.speciallyGridAction(this.dataGridPanel, "materialsPlanId", __ctxPath + "/dispatch/multiDelMaterialsPlan.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的周材计划必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	submitMaterialsPlan : function() {
		this.speciallyGridAction(this.dataGridPanel, "materialsPlanId", __ctxPath + "/dispatch/multiSubmitMaterialsPlan.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的周材计划必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
});