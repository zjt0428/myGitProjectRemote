var ProjectRepairListView = function(a) {
	Ext.apply(this, a || {});
	Ext.apply(this.params, (a && a.params) || {});
	this.params = {};
	// =====================================================================//
	
	var statusCombo = $initComboBoxField("状态", "Q_status_S_EQ", "AUDIT_APPROVAL_STATUS", {
		width : 80,
		allowBlank : true
	});
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [statusCombo, {
			lable : "填报人",
			name : "Q_userName_S_LK"
		}, {
			lable : "维修编号",
			name : "Q_repairSerial_S_LK"
		}, {
			lable : "维修主题",
			name : "Q_repairTheme_S_LK"
		}, {
			lable : "维修日期",
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
			lable : "合同编号",
			name : "Q_[contractMaterials.contractSerial]_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_[contractMaterials.projectName]_S_LK"
		} ]
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readProjectRepair
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	
	var datagrid_config = {
			store : {
				fields : ProjectRepairListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems,
				renderer : this.rendererRowActionItems.createDelegate(this)
			},
			tbarItems : tbarItems,
			columns : [{
				header : "状态",
				dataIndex : "statusName"
			}, {
				header : "单据编号",
				dataIndex : "repairSerial"
			}, {
				header : "填报人",
				dataIndex : "userName"
			}, {
				header : "填报时间",
				dataIndex : "fillDate"
			}, {
				header : "维修时间",
				dataIndex : "repairDate"
			}, {
				header : "维修主题",
				dataIndex : "repairTheme"
			}, {
				header : "合同编号",
				dataIndex : "contractMaterials",
				renderer : function(n) {
					return n.contractSerial;
				}
			}, {
				header : "项目名称",
				dataIndex : "contractMaterials",
				renderer : function(n) {
					return n.projectName;
				}
			}, {
				header : "项目地址",
				dataIndex : "contractMaterials",
				renderer : function(n) {
					return n.address;
				}
			}, {
				header : "维修班组",
				dataIndex : "depName"
			}]
	}
	
	ProjectRepairListView.superclass.constructor.call(this, Ext.apply({
		id : "ProjectRepairListView",
		title : "项目维修",
		url : __ctxPath + "/archive/listProjectRepair.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}
Ext.extend(ProjectRepairListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的信息！";
		var msg2 = "您确认要【" + op + "】所选的信息吗？";
		var msg3 = "成功【" + op + "】所选的信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptProjectRepair
		});
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveProjectRepair
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.status) {
		case "1":
			if (isGranted("_ProjectRepairAccept")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_ProjectRepairApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ProjectRepairAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addProjectRepair.createDelegate(this)
			});
		}
		if (isGranted("_ProjectRepairEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editProjectRepair.createDelegate(this)
			});
		}
		if (isGranted("_ProjectRepairMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delProjectRepair.createDelegate(this)
			});
		}
		if (isGranted("_ProjectRepairMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitProjectRepair.createDelegate(this)
			});	
		}
		return tbarItems;
	},
	readProjectRepair : function(a) {
		new ProjectRepairForm(a).show();
	},
	addProjectRepair : function() {
		new ContractMaterialsSelector({
			single : true,
			params : {
				"Q_[delFlag]_S_EQ" : "1",
				"Q_[applyforState]_S_EQ " : "3"
			},
			callback : function(a) {
				var data = $ajaxSyncCall(__ctxPath + "/dispatch/loadContractMaterials.do", {
					contractmaId : a[0].data.contractmaId
				})
				new ProjectRepairForm(null, {
					saveable : true,
					data : data.data[0],
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editProjectRepair : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.status != "0") {
			$toast("要【修改】的记录必须是【待提交】状态！");
			return;
		}
		new ProjectRepairForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delProjectRepair : function() {
		this.speciallyGridAction(this.dataGridPanel, "repairId", __ctxPath + "/archive/multiDelProjectRepair.do", "删除", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【删除】的租借申请必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	submitProjectRepair : function() {
		this.speciallyGridAction(this.dataGridPanel, "repairId", __ctxPath + "/archive/multiSubmitProjectRepair.do", "提交", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【提交】的租借申请必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	acceptProjectRepair : function(a) {
		if ("1" != a.status) {
			$toast("【审核】的信息必须是【待审核】的状态！");
			return;
		}
		new ProjectRepairForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveProjectRepair : function(a) {
		if ("2" != a.status) {
			$toast("【审批】的信息必须是【待审批】的状态！");
			return;
		}
		new ProjectRepairForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	}
})