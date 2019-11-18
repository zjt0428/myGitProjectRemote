var EquipEmployListView = function(a) {
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
			lable : "备案编号",
			name : "Q_equipFlow.equipDiary.recordId_S_LK"
		}, {
			lable : "使用负责人",
			name : "Q_principal_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipFlow.equipDiary.exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipFlow.equipDiary.projectName_S_LK"
		}, {
			lable : "启用日",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_employDate_DL_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_employDate_DG_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadEquipEmploy
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
			fields : EquipEmployListViewField
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
			header : "启用日期",
			dataIndex : "employDate"
		}, {
			header : "使用负责人",
			dataIndex : "principal"
		}, {
			width : 50,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		} ]
	};
	EquipEmployListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipEmployListView",
		title : TabTitle.EQUIP_EMPLOY_LIST,
		iconCls : "menu-business-employ",
		url : __ctxPath + "/equip/listEquipEmploy.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipEmployListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptEquipEmploy
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveEquipEmploy
		});
		actionItems.push({
			iconCls : "btn-rowaction_del",
			qtip : "回收",
			hidden : true,
			handler : this.retrieveEmploySource
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_EquipEmployAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_EquipEmployApprove")) {
					action[2].hidden = false;
				}
				break;
			case "3":
				if (isGranted("_EquipEmployRetrieve") && record.data.equipFlow.flowState == "4") {
					action[3].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipEmployAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addEquipEmploy.createDelegate(this)
			});
		}
		if (isGranted("_EquipEmployEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipEmploy.createDelegate(this)
			});
		}
		if (isGranted("_EquipEmployMultiDispatch")) {
			tbarItems.push({
				iconCls : "btn-clock",
				text : "调度(顶升)",
				handler : this.dispatchEquipEmploy.createDelegate(this)
			});
		}
		if (isGranted("_EquipEmployMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipEmploy.createDelegate(this)
			});
		}
		if (isGranted("_EquipEmployMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipEmploy.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipEmployPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipEmploy.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的使用告知！";
		var msg2 = "您确认要【" + op + "】所选的使用告知吗？";
		var msg3 = "成功【" + op + "】所选的使用告知！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptEquipEmploy : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的使用告知必须是【待审核】的状态！");
			return;
		}
		new EquipEmployForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveEquipEmploy : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的使用告知必须是【待审批】的状态！");
			return;
		}
		new EquipEmployForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	retrieveEmploySource : function(a) {
		new EquipEmployForm(a, {
			retrieveable : true
		}).show();
	},
	loadEquipEmploy : function(a) {
		new EquipEmployForm(a).show();
	},
	addEquipEmploy : function() {
		new EquipFlowInstallSelector({
			single : true,
			params : {
				"Q_flowState_S_EQ" : "2",
				"Q_activateId_L_GT" : "0",
				"Q_[equipInstall.applyforState]_S_EQ" : "3"
			},
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do",
					params : {
						loadwhole : true,
						subversion : true,
						flowId : data.flowId
					},
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						new EquipEmployForm({
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
	editEquipEmploy : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的使用告知必须是【待提交】的使用告知！");
			return;
		}
		new EquipEmployForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	dispatchEquipEmploy : function() {
		this.speciallyGridAction(this.dataGridPanel, "employId", __ctxPath + "/equip/multiDispatchEquipEmploy.do", "调度", function(a) {
			if ("4" == a.equipFlow.flowState) {
				return true;
			}
			if (Number(a.equipFlow.flowState) < 4) {
				$toast("【调度】的使用告知必须是【审批通过】的使用告知！");
			} else if (Number(a.equipFlow.flowState) >= 5 && Number(a.equipFlow.flowState) <= 6) {
				$toast("【提交】的安装告知已经在【拆卸过程中】,无法再执行安装调度操作！");
			}
			return false;
		}.createDelegate(this));
	},
	submitEquipEmploy : function() {
		this.speciallyGridAction(this.dataGridPanel, "employId", __ctxPath + "/equip/multiSubmitEquipEmploy.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的使用告知必须是【待提交】的使用告知！");
			return false;
		}.createDelegate(this));
	},
	delEquipEmploy : function() {
		this.speciallyGridAction(this.dataGridPanel, "employId", __ctxPath + "/equip/multiDelEquipEmploy.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的使用告知必须是【待提交】的使用告知！");
			return false;
		}.createDelegate(this));
	},
	printEquipEmploy : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printEquipEmploy.do?formpage=EquipEmploy&employId=" + a[0].data["employId"];
		});
	}
});