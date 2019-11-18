var EquipInstallJjListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params["Q_delFlag_S_EQ"] = "1";
	this.params["Q_equipFlow.flowState_S_EQ"] = "2";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "EQUIP_APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		var flowStateCombo = $initComboBoxField("状态", "Q_equipFlow.flowState_S_EQ", "FLOW_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ flowStateCombo, applyforStatusCombo, {
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
		}, {
			lable : "进场时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startinDate_DL_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_startinDate_DG_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
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
			header : "进场日期",
			dataIndex : "startinDate"
		}, {
			header : "安装负责人",
			dataIndex : "principal"
		}, {
			header : "规格型号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipSpecificName;
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
		} ]
	};
	EquipInstallJjListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipInstallJjListView",
		title : TabTitle.EQUIP_INSTALL_LIST,
		iconCls : "menu-business-install",
		url : __ctxPath + "/equip/listEquipInstall.do?applyforState=3",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipInstallJjListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipInstallJj")) {
			tbarItems.push({
				iconCls : "btn-clock",
				text : "调度(顶升)",
				handler : this.dispatchEquipInstall.createDelegate(this)
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
				iconCls : "btn-head-exporter",
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
			projectId : a.equipFlow.equipDiary.projectId
		}).show();
	},
	addEquipInstall : function() {
		new ContractDispatchEquipSelector({
			params : {
				Q_applyforState_S_GE : "4",
				Q_applyforState_S_LE : "6"
			},
			target_params : {
				Q_workStatus_S_EQ : "0"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				if ("0" != data.workStatus) {
					$toast("【该调度设备已经执行任务,请更换设备！");
					return;
				}
				$request({
					url : __ctxPath + "/dispatch/loadDispatch.do?dispatchId=" + data.dispatchId,
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						data.dispatch = resp.data[0];
						new EquipInstallForm(data, {
							projectId : data.dispatch.projectId,
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
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	dispatchEquipInstall : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if (Number(a.equipFlow.flowState) < 2) {
				$toast("【提交】的安装告知必须是【审批通过】的安装告知！");
				return false;
			}
			return true;
		}, function(a) {
			new EquipInstallForm(a.data, {
				projectId : a.data.equipFlow.equipDiary.projectId,
				saveable : true,
				jj:true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
		
		/*this.speciallyGridAction(this.dataGridPanel, "installId", __ctxPath + "/equip/multiDispatchEquipInstall.do", "调度", function(a) {
			if ("2" == a.equipFlow.flowState) {
				return true;
			}
			if (Number(a.equipFlow.flowState) < 2) {
				$toast("【提交】的安装告知必须是【审批通过】的安装告知！");
			} else if (Number(a.equipFlow.flowState) >= 3 && Number(a.equipFlow.flowState) <= 4) {
				$toast("【提交】的安装告知已经在【使用过程中】,无法再执行安装调度操作！");
			} else {
				$toast("【提交】的安装告知已经在【拆卸过程中】,无法再执行安装调度操作！");
			}
			return false;
		}.createDelegate(this));*/
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
	}
});