var EquipWarehouseListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")) {
		this.params['QVO_equipFlow.contractLease.permissionFlag_S_LK'] = curUserInfo.dataPermission;
	}
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
			lable : "备案编号",
			name : "Q_equipFlow.equipDiary.recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipFlow.equipDiary.exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipFlow.equipDiary.projectName_S_LK"
		}, {
			lable : "设备自编号",
			name : "Q_equipFlow.equipDiary.equipSerial_S_LK"
		},{
			lable : "入库时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_warehouseDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_warehouseDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadEquipWarehouse
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
			fields : EquipWarehouseListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "备案编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.exwSerial;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipGenericName;
			}
		}, {
			header : "生产厂家",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipVender;
			}
		}, {
			header : "设备型号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipSpecificName;
			}
		}, {
			header : "设备自编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipSerial;
			}
		},{
			header : "项目名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "项目所属地",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.address;
			}
		}, {
			header : "入库时间",
			dataIndex : "warehouseDate"
		}, {
			header : "入库仓库",
			dataIndex : "storeName"
		},{
			width : 50,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		} ]
	};
	EquipWarehouseListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipWarehouseListView",
		title : TabTitle.EQUIP_WAREHOUSE_LIST,
		iconCls : "menu-business-employ",
		url : __ctxPath + "/equip/listEquipWarehouse.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipWarehouseListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveEquipWarehouse
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
		case "2":
			if (isGranted("_EquipWarehouseApprove")) {
				action[1].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipWarehouseAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addEquipWarehouse.createDelegate(this)
			});
		}
		if (isGranted("_EquipWarehouseEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipWarehouse.createDelegate(this)
			});
		}
		if (isGranted("_EquipWarehouseMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipWarehouse.createDelegate(this)
			});
		}
		if (isGranted("_EquipWarehouseMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipWarehouse.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的入库申请！";
		var msg2 = "您确认要【" + op + "】所选的入库申请吗？";
		var msg3 = "成功【" + op + "】所选的入库申请！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	approveEquipWarehouse : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的入库申请必须是【待审批】的状态！");
			return;
		}
		new EquipWarehouseForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadEquipWarehouse : function(a) {
		new EquipWarehouseForm(a).show();
	},
	addEquipWarehouse : function() {
		new EquipFlowDismantleSelector({
			single : true,
			params : {
				"Q_flowState_S_EQ" : "6"
			},
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do",
					params : {
						subversion : true,
						flowId : data.flowId
					},
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						new EquipWarehouseForm({
							equipFlow : resp.data[0]
						}, {
							saveable : true,
							callback : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	editEquipWarehouse : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.applyforState) {
				$toast("【修改】的入库申请必须是【待提交】的入库申请！");
				return false;
			}
			return true;
		}, function(a) {
			new EquipWarehouseForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	submitEquipWarehouse : function() {
		this.speciallyGridAction(this.dataGridPanel, "warehouseId", __ctxPath + "/equip/multiSubmitEquipWarehouse.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的入库申请必须是【待提交】的入库申请！");
			return false;
		}.createDelegate(this));
	},
	delEquipWarehouse : function() {
		this.speciallyGridAction(this.dataGridPanel, "warehouseId", __ctxPath + "/equip/multiDelEquipWarehouse.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}	
			$toast("【删除】的入库申请必须是【待提交】的入库申请！");
			return false;
		}.createDelegate(this));
	}
});