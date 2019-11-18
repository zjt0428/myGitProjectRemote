var EquipInstallListView = function(a) {
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
			lable : "审批状态",
			allowBlank : true
		});
		var flowStateCombo = $initComboBoxField("状态", "Q_equipFlow.flowState_S_EQ", "FLOW_STATE", {
			width : 80,
			lable : "设备状态",
			allowBlank : true
		});
		generalItems = [ flowStateCombo, applyforStatusCombo, {
			lable : "设备自编号",
			name : "Q_equipFlow.equipDiary.equipSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_equipFlow.equipDiary.recordId_S_LK"
		}, {
			lable : "安装负责人",
			name : "Q_principal_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipFlow.equipDiary.exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipFlow.equipDiary.projectName_S_LK"
		},{
			id : Ext.id(),
			xtype : "treecombo",
			lable : "所属部门",
			width: 160,
			readOnly : false,
			allowBlank : true,
			name : "Q_competentDepartment_S_LK",
			url : __ctxPath + "/system/listDepartment.do?opt=appUser"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadEquipInstall
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
			fields : EquipInstallListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 40,
			header : "楼号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.buildingNum;
			}
		}, {
			width : 60,
			header : "设备状态",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.flowStateName;
			}
		}, {
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
			header : "生产厂家",
			dataIndex : "equipVender"
		}, {
			header : "设备名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipGenericName;
			}
		}, {
			header : "承租单位",
			dataIndex : "equipFlow",
			renderer : function(n) {
				if (n.contractLease) {
					return n.contractLease.paEntName;
				}
				return null;
			}
		}, {
			header : "合同编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				if (n.contractLease) {
					return n.contractLease.contractSerial;
				}
				return null;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "安装开始日期",
			dataIndex : "startinDate"
		}, {
			header : "安装人员",
			dataIndex : "partake"
		}, {
			header : "规格型号",
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
		}, {
			header : "标准节数",
			dataIndex : "knotCounts"
		}, {
			header : "附墙数",
			dataIndex : "wallAttacheQty"
		}, {
			width : 50,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		}, {
			header : "所属部门",
			dataIndex : "competentDepartment"
		} ]
	};
	EquipInstallListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipInstallListView",
		title : TabTitle.EQUIP_INSTALL_LIST,
		iconCls : "menu-business-install",
		url : __ctxPath + "/equip/listEquipInstall.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipInstallListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptEquipInstall
		});
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveEquipInstall
		});

	},
	importMutilPractiArchives : function(datas) {
		var partakeField = this.findFormField("partake");
		for (var i = 0; i < datas.length; i++) {
			var data = datas[i].data;
			if (Ext.isEmpty(partakeField.getValue())) {
				partakeField.setValue(data.practiName);
			} else {
				partakeField.setValue(partakeField.getValue() + "," + data.practiName);
			}
		}
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_EquipInstallAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_EquipInstallApprove")) {
					action[2].hidden = false;
				}
				break;

		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipInstallAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addEquipInstall.createDelegate(this)
			});
		}
		if (isGranted("_EquipInstallEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipInstall.createDelegate(this)
			});
		}
		if (isGranted("_EquipInstallMultiDispatch")) {
			tbarItems.push({
				iconCls : "btn-clock",
				text : "调度(顶升)",
				handler : this.dispatchEquipInstall.createDelegate(this)
			});
		}
		if (isGranted("_EquipInstallMultiDispatch")) {
			tbarItems.push({
				iconCls : "btn-clock",
				text : "调度(降节)",
				handler : this.dropDispatchEquipInstall.createDelegate(this)
			});
		}
		if (isGranted("_EquipInstallMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipInstall.createDelegate(this)
			});
		}
		if (isGranted("_EquipInstallMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipInstall.createDelegate(this)
			});
		}
		if(isGranted("_EquipInstallEditLH")){
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "修改安装信息",
				handler : this.editLhEquipInstall.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipInstallPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipInstall.createDelegate(this)
			});
		}
		if (isGranted("_EquipInstallExporter")) {
			tbarItems.push({
				iconCls :"btn-head-exporter",
				text : "导出",
				handler : this.exportEquipInstall.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的安装告知！";
		var msg2 = "您确认要【" + op + "】所选的安装告知吗？";
		var msg3 = "成功【" + op + "】所选的安装告知！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptEquipInstall : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的安装告知必须是【待审核】的状态！");
			return;
		}
		new EquipInstallForm(a, {
			store : {
				belongToArea : a.belongToArea,
				contractId : a.equipFlow.contractId,
				equipSpecificName : a.equipFlow.equipDiary.equipSpecificName
			},
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveEquipInstall : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的安装告知必须是【待审批】的状态！");
			return;
		}
		new EquipInstallForm(a, {
			store : {
				belongToArea : a.belongToArea,
				contractId : a.equipFlow.contractId,
				equipSpecificName : a.equipFlow.equipDiary.equipSpecificName
			},
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	retrieveInstallSource : function(a) {
		new EquipInstallForm(a, {
			retrieveable : true
		}).show();
	},
	loadEquipInstall : function(a) {
		new EquipInstallForm(a,{
			store : {
				belongToArea : a.belongToArea,
				contractId : a.equipFlow.contractId,
				equipSpecificName : a.equipFlow.equipDiary.equipSpecificName
			}
		}).show();
	},
	addEquipInstall : function() {
		new ContractDispatchEquipSelector({
			params : {
				//Q_applyforState_S_GE : "4",
				//Q_applyforState_S_LE : "4"
			},
			target_params : {
				Q_workStatus_S_EQ : "0"
			},
			single : true,
			collectEnable : true,
			callback : function(d) {
				var data = d[0].data;
				if ("0" != data.workStatus) {
					$toast("【该调度设备已经执行任务,请更换设备！");
					return;
				}
				$request({
					params : {
						equipId: data.equipId
					},
					url : __ctxPath + "/dispatch/loadDispatch.do?dispatchId=" + data.dispatchId,
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						data.dispatch = resp.data[0];
                        data.indisNotice = resp.data[1];
						new EquipInstallForm(data, {
							projectId : data.dispatch.projectId,
                            indisNotice : data.indisNotice,
                            store : {
                            	belongToAreaName : data.contractLease.belongToAreaName,
                            	belongToArea : data.contractLease.belongToArea,
                            	contractId : data.contractLease.contractId,
                            	equipSpecificName : data.equipment.equipSpecificName,
                            	equipSpecific : data.equipment.equipSpecific
                            },
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
	
	editEquipInstall : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.applyforState) {
				$toast("【修改】的安装告知必须是【待提交】的安装告知！");
				return false;
			}
			return true;
		}, function(a) {
			a.data.dispatchId = a.data.equipFlow.dispatchId;
			new EquipInstallForm(a.data, {
				projectId : a.data.equipFlow.equipDiary.projectId,
				store : {
                	belongToArea : a.data.belongToArea,
                	contractId : a.data.equipFlow.contractId,
                	equipSpecificName : a.data.equipFlow.equipDiary.equipSpecificName,
                },
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	dropDispatchEquipInstall : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if (Number(a.equipFlow.flowState) != 2) {
				$toast("【降节】的安装告知必须是【安装完成】的安装告知！");
				return false;
			}
			return true;
		}, function(a) {
		new EquipInstallForm(a.data, {
				store : {
					belongToArea : a.data.belongToArea,
					belongToAreaName : a.data.belongToAreaName,
					contractId : a.data.equipFlow.contractId,
					equipSpecific : a.data.equipFlow.equipDiary.equipSpecific,
					equipSpecificName : a.data.equipFlow.equipDiary.equipSpecificName
				},
				projectId : a.data.equipFlow.equipDiary.projectId,
				saveable : true,
				drop:true,
				jj:true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));},
	dispatchEquipInstall : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if (Number(a.equipFlow.flowState) != 2) {
				$toast("【顶升】的安装告知必须是【安装完成】的安装告知！");
				return false;
			}
			return true;
		}, function(a) {
		new EquipInstallForm(a.data, {
				store : {
					belongToArea : a.data.belongToArea,
					belongToAreaName : a.data.belongToAreaName,
					contractId : a.data.equipFlow.contractId,
					equipSpecific : a.data.equipFlow.equipDiary.equipSpecific,
					equipSpecificName : a.data.equipFlow.equipDiary.equipSpecificName
				},
				projectId : a.data.equipFlow.equipDiary.projectId,
				saveable : true,
				drop:false,
				jj:true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	submitEquipInstall : function() {
		this.speciallyGridAction(this.dataGridPanel, "installId", __ctxPath + "/equip/multiSubmitEquipInstall.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的安装告知必须是【待提交】的安装告知！");
			return false;
		}.createDelegate(this));
	},
	delEquipInstall : function() {
		this.speciallyGridAction(this.dataGridPanel, "installId", __ctxPath + "/equip/multiDelEquipInstall.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的安装告知必须是【待提交】的安装告知！");
			return false;
		}.createDelegate(this));
	},
	printEquipInstall : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printEquipInstall.do?formpage=EquipInstall&installId=" + a[0].data["installId"];
		});
	},
	exportEquipInstall : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportEquipInstall.do", this.dataGridPanel);
	},
	editLhEquipInstall : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		
		new EquipInstallLhForm({
			installId : a[0].data.installId,
			buildNum : a[0].data.equipFlow.equipDiary.buildingNum,
			currentInstallHeight : a[0].data.currentInstallHeight,
			brachium : a[0].data.brachium,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	}
});