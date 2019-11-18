var EquipHitchListView = function(a) {
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
		}, {
			lable : "项目名称",
			name : "Q_project.projectName_S_LK"
		}, {
			lable : "发生时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_spendDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_spendDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadEquipHitch
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
			fields : EquipHitchListViewField
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
			dataIndex : "statusName"
		}, {
			header : "关联业务",
			dataIndex : "relateSerial"
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
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				return n.projectName;
			}
		}, {
			header : "发生日期",
			dataIndex : "spendDate"
		}, {
			header : "处理日期",
			dataIndex : "handleDate"
		}, {
			header : "处理结果",
			dataIndex : "handleResult"
		}, {
			header : "处理人员",
			dataIndex : "handleMans"
		}, {
			header : "故障类型",
			dataIndex : "hitchResult"
		}, {
			width : 50,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ]
	};
	EquipHitchListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipHitchListView",
		title : TabTitle.EQUIP_HITCH_LIST,
		iconCls : "menu-business-employ",
		url : __ctxPath + "/equip/listEquipHitch.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipHitchListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "处理",
			hidden : true,
			handler : this.handleEquipHitch
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveEquipHitch
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "0":
				if (isGranted("_EquipHitchHandle")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_EquipHitchApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipHitchAdd")) {
			tbarItems.push({
				hidden : true,
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addEquipHitch.createDelegate(this)
			});
		}
		if (isGranted("_EquipHitchEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipHitch.createDelegate(this)
			});
		}
		if (isGranted("_EquipHitchMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitEquipHitch.createDelegate(this)
			});
		}
		if (isGranted("_EquipHitchMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipHitch.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipHitchExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportEquipHitch.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的故障信息！";
		var msg2 = "您确认要【" + op + "】所选的故障信息吗？";
		var msg3 = "成功【" + op + "】所选的故障信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	handleEquipHitch : function(a) {
		if ("0" != a.applyforState) {
			$toast("【处理】的故障信息必须是【待提交】的状态！");
			return;
		}
		new EquipHitchForm(a, {
			url : __ctxPath + "/equip/handleEquipHitch.do",
			handleable : true,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveEquipHitch : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的故障信息必须是【待审批】的状态！");
			return;
		}
		new EquipHitchForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadEquipHitch : function(a) {
		new EquipHitchForm(a).show();
	},
	addEquipHitch : function() {
	},
	editEquipHitch : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.applyforState) {
				$toast("【修改】的故障信息必须是【待提交】的状态！");
				return false;
			}
			if (!Ext.isEmpty(a.userId)) {
				$toast("【修改】的故障信息已经【填报】完成！");
				return false;
			}
			return true;
		}, function(a) {
			var form = new EquipHitchForm(a.data, {
				altereable : true,
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			});
			form.show();
		}.createDelegate(this));
	},
	submitEquipHitch : function() {
		this.speciallyGridAction(this.dataGridPanel, "hitchId", __ctxPath + "/equip/multiSubmitEquipHitch.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的故障信息必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	delEquipHitch : function() {
		this.speciallyGridAction(this.dataGridPanel, "hitchId", __ctxPath + "/equip/multiDelEquipHitch.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的故障信息必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	exportEquipHitch : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportEquipHitch.do", this.dataGridPanel);
	}
});