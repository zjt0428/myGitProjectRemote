var EquipRepairListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var statusCombo = $initComboBoxField("处理结果", "Q_status_S_EQ", "HANDLE_STATUS", {
			width : 80,
			lable : "处理结果",
			allowBlank : true
		});
		generalItems = [ statusCombo, {
			lable : "备案编号",
			name : "Q_equipment.recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipment.exwSerial_S_LK"
		},  {
			lable : "填报时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_DG_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_DG_LE"
		}, {
			lable : "设备自编号",
			name : "Q_equipment.equipSerial_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadEquipRepair
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
			fields : EquipRepairListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 60,
			header : "状态",
			dataIndex : "statusName"
		}, {
			header : "规格型号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSpecificName;
			}
		},{
			header : "申报人",
			dataIndex : "userName"
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.exwSerial;
			}
		},{
			header : "设备自编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSerial;
			}
		},{
			header : "维修仓库",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.storeName;
			}
		},{
			header : "入库时间",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.warehouseDate;
			}
		},{
			header : "维修费用",
			dataIndex : "repairAmount"
		},{
			header : "维修类型",
			dataIndex : "preventiveMeasures"
		},{
			header : "完成日期",
			dataIndex : "repairDate"
		}, {
			header : "维修结果",
			dataIndex : "repairResultName"
		}, {
			header : "维修班组",
			dataIndex : "teamName"
		},{
			width : 50,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}, {
			header : "填报时间",
			format : "Y-m-d",
			dataIndex : "providedDate"
		} ]
	};
	EquipRepairListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipRepairListView",
		title : TabTitle.EQUIP_REPAIR_LIST,
		iconCls : "menu-business-employ",
		url : __ctxPath + "/equip/listEquipRepair.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipRepairListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveEquipRepair
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
		case "2":
			if (isGranted("_EquipRepairApprove")) {
				action[1].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipRepairAdd")) {
			tbarItems.push({
				//xtype : "tbsplit",
				iconCls : "btn-head-add",
				text : "新增",
				tooltip : {
					text : "关联业务维修信息",
					title : "仓库维修"
				},
				/*menu : {
					items : [ {
						text : "现场安装",
						handler : this.addInstallEquipRepair.createDelegate(this)
					}, {
						text : "巡检管理",
						handler : this.addInspectEquipRepair.createDelegate(this)
					}, {
						text : "保养管理",
						handler : this.addMaintEquipRepair.createDelegate(this)
					}, {
						text : "转场验收",
						handler : this.addWarehouseEquipRepair.createDelegate(this)
					}, {
						text : "仓库维修",*/
						handler : this.addEquipment.createDelegate(this)
					/*} ]
				}*/
			});
		}
		if (isGranted("_EquipRepairEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipRepair.createDelegate(this)
			});
		}
		if (isGranted("_EquipRepairMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipRepair.createDelegate(this)
			});
		}
		if (isGranted("_EquipRepairDealwith")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "填报",
				handler : this.dealwithEquipRepair.createDelegate(this)
			});
		}
        if (isGranted("_EquipRepairAuto")) {
            tbarItems.push({
                iconCls : "btn-head-add",
                text : "生成付款单",
                handler : this.autoEquipRepair.createDelegate(this)
            });
        }
		if (isGranted("_EquipRepairMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipRepair.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipRepairPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印1",
				handler : this.printEquipRepair.createDelegate(this, [ "One" ])
			});
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印2",
				handler : this.printEquipRepair.createDelegate(this, [ "Two" ])
			});
		}
		if (isGranted("_EquipRepairExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportEquipRepair.createDelegate(this)
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
	approveEquipRepair : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的维修信息必须是【待审批】的状态！");
			return;
		}
		new EquipRepairForm(a, {
			dealwithable : true,
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadEquipRepair : function(a) {
		new EquipRepairForm(a, {
			dealwithable : true
		}).show();
	},
	addInstallEquipRepair : function() {
		new EquipFlowInstallSelector({
			params : {
				"Q_flowState_S_EQ" : "2"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do?flowId=" + data.flowId,
					success : function(g, h) {
						var equipFlow = Ext.util.JSON.decode(g.responseText).data[0];
						new EquipRepairForm({
							relateId : equipFlow.installId,
							relateSerial : equipFlow.equipInstall.installSerial,
							relateModule : RelationModule.equipInstall.relateModule,
							relateModuleName : RelationModule.equipInstall.relateModuleName,
							equipDiary : equipFlow.equipDiary
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
	addEmployEquipRepair : function() {
		new EquipFlowEmploySelector({
			params : {
//				"Q_flowState_S_EQ" : "4"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do?flowId=" + data.equipFlow.flowId,
					success : function(g, h) {
						var equipFlow = Ext.util.JSON.decode(g.responseText).data[0];
						new EquipRepairForm({
//							relateId : equipFlow.equipEmploy.employId,
//							relateSerial : equipFlow.equipEmploy.employSerial,
//							relateModule : RelationModule.equipEmploy.relateModule,
//							relateModuleName : RelationModule.equipEmploy.relateModuleName,
							equipDiary : equipFlow.equipDiary
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
	addInspectEquipRepair : function() {
		new EquipInspectSelector({
			params : {
				"Q_status_S_GE" : "1",
				"Q_repairStatus_S_EQ" : "0"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipInspect.do?inspectId=" + data.inspectId,
					success : function(g, h) {
						var equipInspect = Ext.util.JSON.decode(g.responseText).data[0];
						new EquipRepairForm({
							relateId : equipInspect.inspectId,
							relateSerial : equipInspect.inspectSerial,
							relateModule : RelationModule.equipInspect.relateModule,
							relateModuleName : RelationModule.equipInspect.relateModuleName,
							equipDiary : equipInspect.equipInspectSchema.equipDiary
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
	addMaintEquipRepair : function() {
		new EquipMaintSelector({
			params : {
				"Q_status_S_GE" : "1",
				"Q_repairStatus_S_EQ" : "0"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipMaint.do?maintId=" + data.maintId,
					success : function(g, h) {
						var equipMaint = Ext.util.JSON.decode(g.responseText).data[0];
						new EquipRepairForm({
							relateId : equipMaint.maintId,
							relateSerial : equipMaint.maintSerial,
							relateModule : RelationModule.equipMaint.relateModule,
							relateModuleName : RelationModule.equipMaint.relateModuleName,
							equipDiary : equipMaint.equipMaintSchema.equipDiary
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
	addWarehouseEquipRepair : function() {
		new EquipWarehouseSelector({
			params : {
				"Q_applyforState_S_EQ" : "3"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipWarehouse.do?warehouseId=" + data.warehouseId,
					success : function(g, h) {
						var equipWarehouse = Ext.util.JSON.decode(g.responseText).data[0];
						new EquipRepairForm({
							relateId : equipWarehouse.warehouseId,
							relateSerial : equipWarehouse.warehouseSerial,
							relateModule : RelationModule.equipWarehouse.relateModule,
							relateModuleName : RelationModule.equipWarehouse.relateModuleName,
							equipDiary : equipWarehouse.equipFlow.equipDiary
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
	addEquipment : function() {
		new EquipSelector({
			single : true,
			params : {
				"Q_businessStatus_S_EQ" : "A",
			},
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/archive/loadEquipment.do?equipId=" + data.equipId,
					success : function(g, h) {
						var equipment = Ext.util.JSON.decode(g.responseText).data[0];
						new EquipRepairForm({
							relateId : equipment.equipId,
							relateSerial : equipment.recordId,
							relateModule : RelationModule.equipment.relateModule,
							relateModuleName : RelationModule.equipment.relateModuleName,
							equipDiary : equipment
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
	editEquipRepair : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.applyforState) {
				$toast("【修改】的维修信息必须是【待提交】的状态！");
				return false;
			}
			return true;
		}, function(a) {
			var form = new EquipRepairForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			});
			form.show();
		}.createDelegate(this));
	},
	dealwithEquipRepair : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("1" != a.applyforState && "2" != a.applyforState) {
				$toast("【处理】的维修信息未提交或已审核！");
				return false;
			}
			return true;
		}, function(a) {
			var form = new EquipRepairForm(a.data, {
				dealwithable : true,
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			});
			form.show();
		}.createDelegate(this));
	},
	submitEquipRepair : function() {
		this.speciallyGridAction(this.dataGridPanel, "repairId", __ctxPath + "/equip/multiSubmitEquipRepair.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的维修信息必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	delEquipRepair : function() {
		this.speciallyGridAction(this.dataGridPanel, "repairId", __ctxPath + "/equip/multiDelEquipRepair.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的维修信息必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	printEquipRepair : function(type) {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printEquipRepair.do?formpage=EquipRepair" + type + "&repairId=" + a[0].data["repairId"];
		});
	},
	exportEquipRepair : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportEquipRepair.do", this.dataGridPanel);
	},
	autoEquipRepair : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("请最多选择一个进行生成付款单！");
			return ;
		}
		for(var c = 0;c<length;c++){
			$request({
				url : __ctxPath + "/equip/loadEquipRepair.do",
				params : {
                    repairId : a[c].data.repairId
				},
				success : function(g, h) {
					var resp = Ext.util.JSON.decode(g.responseText);
					var data = resp.data[0];
					data.projectId = data.project.projectId;
					data.projectSerial = data.project.projectSerial;
					data.projectName = data.project.projectName;
					data.address = data.project.address;
                    var mount = {
                        relateId : data.repairId,
                        relateSerial : data.repairSerial,
                        relateTheme : data.repairSerial,
                        relateModule : RelationModule.equipRepair.relateModule,
                        relateModuleName : RelationModule.equipRepair.relateModuleName,
                        relationData : data
                    };
                    if (mount && mount.relateId && mount.relateModule) {
                        mount.relation = {};
                        Ext.apply(mount.relation, {
                            relateId : mount.relateId,
                            relateTheme : mount.relateTheme,
                            relateModule : mount.relateModule,
                            relateModuleName : mount.relateModuleName,
                            projectName : mount.projectName
                        });
                    }
					new AmountPaymentForm(mount, {
						saveable : true,
						auto:true,
						paymentPlanDisabled : true,
						callback : function() {
							this.dataGridPanel.getStore().reload();
						}.createDelegate(this)
					}).show();
				}.createDelegate(this)
			});}
	}
});