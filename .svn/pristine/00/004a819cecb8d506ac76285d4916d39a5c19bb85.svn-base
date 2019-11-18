var MaterialsRepairListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "EQUIP_APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo, {
			lable : "维修班组",
			name : "Q_teamName_S_LK"
		}, {
			lable : "维修仓库",
			name : "Q_storeName_S_LK"
		}, {
			lable : "维修主题",
			name : "Q_repairTheme_S_LK"
		},{
			lable : "维修起止日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_repairDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_repairDate_S_LE"
		}, {
			lable : "附属单据号",
			name : "Q_affiliatedSerial_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadMaterialsRepair
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
			fields : MaterialsRepairListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 40,
			header : "状态",
			dataIndex : "applyforStateName"
		}, {
			header : "单据编号",
			dataIndex : "repairSerial"
		}, {
			header : "填报人",
			dataIndex : "userName"
		}, {
			header : "维修班组",
			dataIndex : "teamName"
		}, {
			header : "维修主题",
			dataIndex : "repairTheme"
		}, {
			header : "维修仓库",
			dataIndex : "storeName"
		}, {
			header : "维修日期",
			dataIndex : "repairDate"
		}, {
			header : "维修费用",
			dataIndex : "repairCost"
		}, {
			header : "附属单据号",
			dataIndex : "affiliatedSerial"
		} ]
	};
	MaterialsRepairListView.superclass.constructor.call(this, Ext.apply({
		id : "MaterialsRepairListView",
		title : "周材维修",
		iconCls : "menu-business-dismantle",
		url : __ctxPath + "/daily/listMaterialsRepair.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(MaterialsRepairListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveMaterialsRepair
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "2":
				if (isGranted("_MaterialsRepairApprove")) {
					action[1].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_MaterialsRepairAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler :this.addMaterialsRepair.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsRepairEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editMaterialsRepair.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsRepairMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitMaterialsRepair.createDelegate(this)
			});
		}
		if (isGranted("_MaterialsRepairMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delMaterialsRepair.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_MaterialsRepairPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printMaterialsRepair.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的维修信息！";
		var msg2 = "您确认要【" + op + "】所选的维修信息吗？";
		var msg3 = "成功【" + op + "】所选的维修信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	approveMaterialsRepair : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的维修信息必须是【待审批】的状态！");
			return;
		}
		new MaterialsRepairForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadMaterialsRepair : function(a) {
		new MaterialsRepairForm(a).show();
	},
	addMaterialsRepair : function(data,IorE) {
		new BaseDepotJoinUserSelector({
				params : {
				},
				saveable : true,
				single : true,
				callback : function(d) {
					var data = d[0].data;
					new MaterialsRepairForm({
						saveable : true,
						storeId : data.depotId,
						storeName : data.depotName,
						callback : function() {
							this.dataGridPanel.getStore().reload();
						}.createDelegate(this)
					}).show();
				}.createDelegate(this)
			}).show();
			},
	editMaterialsRepair : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的周材维修必须是【待提交】的周材维修单！");
			return;
		}
		new MaterialsRepairForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitMaterialsRepair : function() {
		this.speciallyGridAction(this.dataGridPanel, "materialsRepairId", __ctxPath + "/daily/multiSubmitMaterialsRepair.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的维修信息必须是【待提交】的维修信息！");
		}.createDelegate(this));
	},
	delMaterialsRepair : function() {
		this.speciallyGridAction(this.dataGridPanel, "materialsRepairId", __ctxPath + "/daily/multiDelMaterialsRepair.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的维修信息必须是【待提交】的维修信息！");
			return false;
		}.createDelegate(this));
	},
	printMaterialsRepair : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/daily/printMaterialsRepair.do?formpage=MaterialsRepair&materialsRepairId=" + a[0].data["materialsRepairId"];
		});
	}
});