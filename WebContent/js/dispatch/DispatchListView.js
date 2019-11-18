var DispatchListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	var advancedItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "DISPATCH_APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo, {
			lable : "调度主题",
			name : "Q_dispatchTheme_S_LK"
		}, {
			lable : "调度人",
			name : "Q_userName_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "设备自编号",
			name : "Q_dispatchEquipSet.equipment.equipSerial_S_LK"
		},{
			id : Ext.id(),
			xtype : "treecombo",
			lable : "所属部门",
			width: 160,
			readOnly : false,
			allowBlank : true,
			name : "Q_competentDepartment_S_LK",
			url : __ctxPath + "/system/listDepartment.do"
		}  ];
		advancedItems = [ {
			fieldType : "CHAR_FIELD",
			fieldLabel : "调度编号",
			name : "Q_dispatchSerial_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "关联编号",
			name : "Q_relateSerial_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "项目负责人",
			name : "Q_projectManager_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "调度主题",
			name : "Q_dispatchTheme_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "调度人",
			name : "Q_userName_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "设备自编号",
			name : "Q_dispatchEquipSet.equipment.equipSerial_S_LK"
		},{
			fieldType : "CODE_TREE_FIELD",
			id : Ext.id(),
			url : __ctxPath + "/system/listDepartment.do?opt=practitioner",
			name : "Q_competentDepartment_S_LK",
			fieldLabel : "所属部门"
		},{
			fieldType : "CODE_FIELD",
			codeId : "DISPATCH_APPLYFOR_STATE",
			name : "Q_applyforState_S_EQ",
			fieldLabel : "状态"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.showDispatch
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
			fields : DispatchListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "applyforStateName"
		},{
			width : 50,
			header : "调度状态",
			dataIndex : "effective",
			renderer : function(n) {
				if (n == "0") {
					return "<font face='宋体' color='red'>失效</font>";
				}
				return "生效";
			}
		}, {
			width : 50,
			header : "款项状态",
			dataIndex : "fundStatusName"
		}, {
			header : "调度主题",
			dataIndex : "dispatchTheme"
		}, {
			header : "合同编号",
			dataIndex : "relateSerial"
		},{
			header : "合同编号",
			dataIndex : "contractSerial"
		},{
			header : "项目名称",
			dataIndex : "projectName"
		},{
			header : "项目地址",
			dataIndex : "receiveAddress"
		}, {
			header : "承租单位",
			dataIndex : "receiveEntName"
		},{
			header : "调度人员",
			dataIndex : "userName"
		}, {
			header : "调度仓库",
			dataIndex : "deliveryEntName"
		},/*{ 与零配件相关
			width : 50,
			header : "装车状态",
			dataIndex : "isTransport",
			renderer : function(n) {
				if (n == "0") {
					return "未装车";
				}
				return "已装车";
			}
		}, */ {
			header : "填报时间",
			dataIndex : "providedDate"
		}, {
			header : "所属部门",
			dataIndex : "competentDepartment"
		} ]
	};
	DispatchListView.superclass.constructor.call(this, Ext.apply({
		id : "DispatchListView",
		title : TabTitle.DISPATCH_LEASE_LIST,
		iconCls : "menu-business-dispatch",
		url : __ctxPath + "/dispatch/listDispatch.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(DispatchListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptDispatch
		});
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveDispatch
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_DispatchAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_DispatchApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_DispatchAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addDispatchContractLease.createDelegate(this)
			});
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "复制",
				handler : this.copyDispatch.createDelegate(this)
			});
		}
		if (isGranted("_DispatchEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editDispatch.createDelegate(this)
			});
		}
		if (isGranted("_DispatchMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitDispatch.createDelegate(this)
			});
		}
		if (isGranted("_DispatchMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delDispatch.createDelegate(this)
			});
		}
		if (isGranted("_DispatchMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveDispatch.createDelegate(this)
			});
		}
		if (isGranted("_DispatchRollback")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "回退",
				handler : this.rollbackDispatch.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_DispatchPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printDispatch.createDelegate(this)
			});
		}
		/*if (isGranted("_DispatchLiftPrinter")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "升降机配送单",
				handler : this.printDispatch.createDelegate(this, [ "AllocateLift" ])
			});
		}
		if (isGranted("_DispatchPreInstallPrinter")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "安装前审批表",
				handler : this.printDispatch.createDelegate(this, [ "PreInstall" ])
			});
		}*/
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的调度信息！";
		var msg2 = "您确认要【" + op + "】所选的调度信息吗？";
		var msg3 = "成功【" + op + "】所选的调度信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadDispatch : function(a, b) {
		switch (a.relateModule) {
			case RelationModule.contractLease.relateModule:
				if (b && b.saveable && (Ext.isEmpty(a.applyforState) || "0" == a.applyforState)) {
					$request({
						url : __ctxPath + "/dispatch/loadContractLease.do?contractId=" + a.relateId,
						success : function(g, h) {
							var resp = Ext.util.JSON.decode(g.responseText);
							var data = resp.data[0];
							data["manager"] = data.salesman;
							data["relateId"] = data.contractId;
							data["relateSerial"] = data.contractNo;
							data["relateTheme"] = data.contractTheme;
							data["relateModule"] = RelationModule.contractLease.relateModule;
							data["relateModuleName"] = RelationModule.contractLease.relateModuleName;
							data["storeId"] = a.deliveryEntId;
							new DispatchContractForm({
								dispatchId : a.dispatchId,
								relation : data
							}, b).show();
						}.createDelegate(this)
					});
				} 
				else {
					new DispatchContractForm(a, b).show();
				}
				break;
			case RelationModule.equipInstall.relateModule:
				if (b && b.saveable && (Ext.isEmpty(a.applyforState) || "0" == a.applyforState)) {
					$request({
						url : __ctxPath + "/equip/loadEquipInstall.do?installId=" + a.relateId,
						success : function(g, h) {
							var resp = Ext.util.JSON.decode(g.responseText);
							var data = resp.data[0];
							data["manager"] = data.equipFlow.contractLease.salesman;
							data["relateId"] = data.installId;
							data["relateSerial"] = data.installSerial;
							data["relateTheme"] = data.installTheme;
							data["relateModule"] = RelationModule.equipInstall.relateModule;
							data["relateModuleName"] = RelationModule.equipInstall.relateModuleName;
							data["projectId"] = data.equipFlow.equipDiary.projectId;
							data["projectSerial"] = data.equipFlow.equipDiary.projectSerial;
							data["projectName"] = data.equipFlow.equipDiary.projectName;
							data["address"] = data.equipFlow.equipDiary.address;
							new DispatchEquipInstallForm({
								dispatchId : a.dispatchId,
								relation : data
							}, b).show();
						}.createDelegate(this)
					});
				} else {
					new DispatchEquipInstallForm(a, b).show();
				}
				break;
			case RelationModule.equipEmploy.relateModule:
				if (b && b.saveable && (Ext.isEmpty(a.applyforState) || "0" == a.applyforState)) {
					$request({
						url : __ctxPath + "/equip/loadEquipEmploy.do?employId=" + a.relateId,
						success : function(g, h) {
							var resp = Ext.util.JSON.decode(g.responseText);
							var data = resp.data[0];
							data["manager"] = data.equipFlow.contractLease.salesman;
							data["relateId"] = data.employId;
							data["relateSerial"] = data.employSerial;
							data["relateTheme"] = data.employTheme;
							data["relateModule"] = RelationModule.equipEmploy.relateModule;
							data["relateModuleName"] = RelationModule.equipEmploy.relateModuleName;
							data["projectId"] = data.equipFlow.equipDiary.projectId;
							data["projectSerial"] = data.equipFlow.equipDiary.projectSerial;
							data["projectName"] = data.equipFlow.equipDiary.projectName;
							data["address"] = data.equipFlow.equipDiary.address;
							new DispatchEquipEmployForm({
								dispatchId : a.dispatchId,
								relation : data
							}, b).show();
						}.createDelegate(this)
					});
				} else {
					new DispatchEquipEmployForm(a, b).show();
				}
				break;
			case RelationModule.equipDismantle.relateModule:
				if (b && b.saveable && (Ext.isEmpty(a.applyforState) || "0" == a.applyforState)) {
					$request({
						url : __ctxPath + "/equip/loadEquipDismantle.do?dismantleId=" + a.relateId,
						success : function(g, h) {
							var resp = Ext.util.JSON.decode(g.responseText);
							var data = resp.data[0];
							data["manager"] = data.equipFlow.contractLease.salesman;
							data["relateId"] = data.dismantleId;
							data["relateSerial"] = data.dismantleSerial;
							data["relateTheme"] = data.dismantleTheme;
							data["relateModule"] = RelationModule.equipDismantle.relateModule;
							data["relateModuleName"] = RelationModule.equipDismantle.relateModuleName;
							data["projectId"] = data.equipFlow.equipDiary.projectId;
							data["projectSerial"] = data.equipFlow.equipDiary.projectSerial;
							data["projectName"] = data.equipFlow.equipDiary.projectName;
							data["address"] = data.equipFlow.equipDiary.address;
							new DispatchEquipDismantleForm({
								dispatchId : a.dispatchId,
								relation : data
							}, b).show();
						}.createDelegate(this)
					});
				} else {
					new DispatchEquipDismantleForm(a, b).show();
				}
				break;
		}
	},
	acceptDispatch : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的调度信息必须是【待审核】的状态！");
			return;
		}
		this.loadDispatch(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},
	approveDispatch : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的调度信息必须是【待审批】的状态！");
			return;
		}
		this.loadDispatch(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},
	showDispatch : function(a) {
		switch (a.relateModule) {
			case RelationModule.contractLease.relateModule:
				new DispatchContractForm(a).show();
				break;
			default:
				new DispatchForm(a).show();
		}
	},
	addDispatchContractLease : function() {
		new ContractLeaseSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "3",
				Q_applyforState_S_LE : "6"
			},
			callback : function(d) {
				var data = d[0].data;
				this.loadDispatch({
					relateId : data.contractId,
					relateModule : RelationModule.contractLease.relateModule
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addDispatchEquipInstall : function() {
		new EquipFlowInstallSelector({
			single : true,
			params : {
				"Q_[equipInstall.applyforState]_S_EQ" : "4"
			},
			callback : function(d) {
				var data = d[0].data;
				this.loadDispatch({
					relateId : data.installId,
					relateModule : RelationModule.equipInstall.relateModule
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addDispatchEquipEmploy : function() {
		new EquipFlowEmploySelector({
			single : true,
			params : {
				"Q_[equipEmploy.applyforState]_S_EQ" : "4"
			},
			callback : function(d) {
				var data = d[0].data;
				this.loadDispatch({
					relateId : data.employId,
					relateModule : RelationModule.equipEmploy.relateModule
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addDispatchEquipDismantle : function() {
		new EquipFlowEmploySelector({
			single : true,
			params : {
				"Q_[equipDismantle.applyforState]_S_EQ" : "4"
			},
			callback : function(d) {
				var data = d[0].data;
				this.loadDispatch({
					relateId : data.dismantleId,
					relateModule : RelationModule.equipDismantle.relateModule
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	copyDispatch : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【复制】的记录！");
			return;
		}
		$request({
			url : __ctxPath + "/dispatch/loadContractLease.do?contractId=" + a[0].data.relateId,
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var data = resp.data[0];
				new DispatchContractForm({
					dispatchId : a[0].data.dispatchId,
					relation : data
					}, {
					copyable : true,
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
					}).show();
			}.createDelegate(this)
		});
	},
	editDispatch : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的调度信息必须是【待提交】的调度信息！");
			return;
		}
		this.loadDispatch(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},
	submitDispatch : function() {
		this.speciallyGridAction(this.dataGridPanel, "dispatchId", __ctxPath + "/dispatch/multiSubmitDispatch.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的调度信息必须是【待提交】的调度信息！");
			return false;
		}.createDelegate(this));
	},
	delDispatch : function() {
		this.speciallyGridAction(this.dataGridPanel, "dispatchId", __ctxPath + "/dispatch/multiDelDispatch.do", "删除", function(a) {
			if ("0" == a.applyforState || "4" == a.applyforState) {
				return true;
			}
			$toast("【删除】的调度信息必须是【待提交】的调度信息！");
			return false;
		}.createDelegate(this));
	},
	//失效
	loseEffectiveDispatch : function() {
		this.speciallyGridAction(this.dataGridPanel, "dispatchId", __ctxPath + "/dispatch/multiLoseEffectiveDispatch.do", "失效", null, "是否确认失效");
	},
	rollbackDispatch : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length > 1) {
			$toast("请不要选择多条记录进行回退！");
			return;
		}
		this.speciallyGridAction(this.dataGridPanel, "dispatchId", __ctxPath + "/dispatch/rollbackDispatch.do", "回退", function(a) {
			if ("3" == a.applyforState) {
				return true;
			}
			$toast("【回退】的发货调度必须是【审批通过】的状态！");
			return false;
		}.createDelegate(this));
	},
	printDispatch : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/dispatch/printDispatch.do?dispatchId=" + a[0].data["dispatchId"];
		});
	}
});