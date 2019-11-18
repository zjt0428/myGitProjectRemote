var LeaseContractListView = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	Ext.apply(this, {
		departmentId : Ext.id()
	});
	// =====================================================================//
	var statusCombo = $initComboBoxField("状态", "Q_status_S_EQ", "LEASE_CONTRACT_STATUS", {
		width : 80,
		allowBlank : true
	});
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			xtype : "hidden",
			id : this.departmentId,
			name : "Q_depId_L_EQ"
		}, statusCombo, {
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		}, {
			lable : "合同主题",
			name : "Q_leaseTheme_S_LK"
		}, {
			lable : "合同编号",
			name : "Q_leaseIdentifier_S_LK"
		}, {
			lable : "租借单位",
			name : "Q_leaseUnit_S_LK"
		}, {
			xtype : "treecombo",
			width : 150,
			valId : this.departmentId,
			url : __ctxPath + "/system/listDepartment.do",
			lable : "管理部门",
			name : "depName"
		}]
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readLeaseContract
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
				fields : LeaseContractListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems,
				renderer : this.rendererRowActionItems.createDelegate(this)
			},
			tbarItems : tbarItems,
			columns : [{
				width : 40,
				header : "状态",
				dataIndex : "statusName"
			}, {
				width : 50,
				header : "合同流水号",
				dataIndex : "leaseSerial"
			}, {
				header : "合同编号",
				dataIndex : "leaseIdentifier"
			}, {
				header : "合同主题",
				dataIndex : "leaseTheme"
			}, {
				header : "项目名称",
				dataIndex : "project",
				renderer : function(n) {
					return n.projectName;
				}
			}, {
				header : "承租单位",
				dataIndex : "lesseeUnit"
			}, {
				header : "租借单位",
				dataIndex : "leaseUnit"
			}, {
				header : "管理部门",
				dataIndex : "depName"
			}, {
				width : 50,
				header : "签订日期",
				dataIndex : "signingDate"
			}]
	}
	
	LeaseContractListView.superclass.constructor.call(this, Ext.apply({
		id : "LeaseContractListView",
		title : "租借合同",
		url : __ctxPath + "/materials/listLeaseContract.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(LeaseContractListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材信息！";
		var msg2 = "您确认要【" + op + "】所选的周材信息吗？";
		var msg3 = "成功【" + op + "】所选的周材信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptLeaseContract
		});
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveLeaseContract
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.status) {
		case "1":
			if (isGranted("_LeaseContractAccept")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_LeaseContractApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_LeaseContractAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addLeaseContract.createDelegate(this)
			});
		}
		if (isGranted("_LeaseContractEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editLeaseContract.createDelegate(this)
			});
		}
		if (isGranted("_LeaseContractMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLeaseContract.createDelegate(this)
			});
		}
		if (isGranted("_LeaseContractMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitLeaseContract.createDelegate(this)
			});	
		}
		if(isGranted("_LeaseContractInvalid")) {
			tbarItems.push({
				iconCls : "btn-invalid",
				text : "作废",
				handler : this.invalidLeaseContract.createDelegate(this)
			});
		}
		return tbarItems;
	},
	readLeaseContract : function (a) {
		new LeaseContractForm(a).show();
	},
	addLeaseContract : function () {
		/*//关联租借申请
		new LeaseApplicationSelector({
			single : true,
			params : {
				"Q_[status]_S_EQ ": "3"
			},
			callback : function(a) {
				var data = $ajaxSyncCall(__ctxPath + "/materials/loadLeaseApplication.do", {
					applicationId : a[0].data.applicationId
				})
				var project = $ajaxSyncCall(__ctxPath + "/archive/loadProject.do", {
					projectId : a[0].data.project.projectId
				})
				new LeaseContractForm(null, {
					saveable : true,
					relation : true,
					data : data.data[0],
					project : project.data[0],
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();*/
		new LeaseContractForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editLeaseContract : function () {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.status != "0") {
			$toast("要【修改】的记录必须是【待提交】状态！");
			return;
		}
		new LeaseContractForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delLeaseContract : function () {
		this.speciallyGridAction(this.dataGridPanel, "leaseId", __ctxPath + "/materials/multiDelLeaseContract.do", "删除", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【删除】的租借申请必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	submitLeaseContract : function () {
		this.speciallyGridAction(this.dataGridPanel, "leaseId", __ctxPath + "/materials/multiSubmitLeaseContract.do", "提交", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【提交】的租借申请必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	acceptLeaseContract : function (a) {
		if ("1" != a.status) {
			$toast("【审核】的信息必须是【待审核】的状态！");
			return;
		}
		new LeaseContractForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveLeaseContract : function (a) {
		if ("2" != a.status) {
			$toast("【审批】的信息必须是【待审批】的状态！");
			return;
		}
		new LeaseContractForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	invalidLeaseContract : function(a) {
		this.speciallyGridAction(this.dataGridPanel, "leaseId", __ctxPath + "/materials/invalidLeaseContract.do", "作废", true);
	}
})