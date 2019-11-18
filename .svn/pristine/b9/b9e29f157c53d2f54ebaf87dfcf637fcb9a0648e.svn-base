var ContractSubcontractListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_subcontract_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "CONTRACT_APPLYFOR_STATUS", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		var generalItems = [ applyforStatusCombo, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "总承包方",
			name : "Q_paEntName_S_LK"
		}, {
			lable : "专业分包方",
			name : "Q_pbEntName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadContractSubcontract
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : ContractLeaseListViewField
		},
		rowAction : {
			width : 75,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "applyforStateName"
		}, {
			header : ContractLeaseFormConfigure.contractSerialHeader,
			dataIndex : "contractSerial"
		}, {
			header : "总承包方",
			dataIndex : "paEntName"
		}, {
			header : "专业分包方",
			dataIndex : "pbEntName"
		}, {
			header : "企业名录批号",
			dataIndex : "enterpriseSerial"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "建筑面积",
			dataIndex : "cover"
		}, {
			width : 80,
			header : "合同金额",
			dataIndex : "contractAmount"
		} ]
	};
	ContractSubcontractListView.superclass.constructor.call(this, Ext.apply({
		id : "ContractSubcontractListView",
		title : TabTitle.CONTRACT_SUBCONTRACT_LIST,
		iconCls : "menu-business-contract",
		url : __ctxPath + "/dispatch/listContractLease.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ContractSubcontractListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptContractSubcontract
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveContractSubcontract
		});
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "作废审核",
			hidden : true,
			handler : this.acceptNullifyContractSubcontract
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "作废审批",
			hidden : true,
			handler : this.approveNullifyContractSubcontract
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_ContractSubcontractAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_ContractSubcontractApprove")) {
					action[2].hidden = false;
				}
				break;
			case "7":
				if (isGranted("_ContractSubcontractNullifyAccept")) {
					action[3].hidden = false;
				}
				break;
			case "8":
				if (isGranted("_ContractSubcontractNullifyApprove")) {
					action[4].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ContractSubcontractAdd") && !Ext.isEmpty(curUserInfo.corpInfo)) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addContractSubcontract.createDelegate(this)
			});
		}
		if (isGranted("_ContractSubcontractEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editContractSubcontract.createDelegate(this)
			});
		}
		if (isGranted("_ContractSubcontractMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitContractSubcontract.createDelegate(this)
			});
		}
		if (isGranted("_ContractSubcontractMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delContractSubcontract.createDelegate(this)
			});
		}
		
		if (isGranted("_ContractSubcontractMultiNullify")) {
			tbarItems.push({
				iconCls : "btn-dustbin",
				text : "作废",
				handler : this.nullifyContractSubcontract.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if(isGranted("_ContractSubcontractEditContent")){
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "合同编辑",
				handler : this.editContentContractLease.createDelegate(this)
			});			
		}
		if (isGranted("_ContractSubcontractExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportContractSubcontract.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的租赁合同！";
		var msg2 = "您确认要【" + op + "】所选的租赁合同吗？";
		var msg3 = "成功【" + op + "】所选的租赁合同！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptContractSubcontract : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的合同信息必须是【待审核】的状态！");
			return;
		}
		new ContractSubcontractForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveContractSubcontract : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的合同信息必须是【待审批】的状态！");
			return;
		}
		new ContractSubcontractForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	acceptNullifyContractSubcontract : function(a) {
		if ("7" != a.applyforState) {
			$toast("【审核】的合同信息必须是【作废待审】的状态！");
			return;
		}
		new ContractSubcontractForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveNullifyContractSubcontract : function(a) {
		if ("8" != a.applyforState) {
			$toast("【审批】的合同信息必须是【作废待批】的状态！");
			return;
		}
		new ContractSubcontractForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadContractSubcontract : function(a) {
		var form = new ContractSubcontractForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
		form.show();
	},
	addContractSubcontract : function() {
		var form = new ContractSubcontractForm(null, {
			animateTarget : this.el,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
		form.show();
	},
	editContractSubcontract : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的合同信息必须是【待提交】的合同！");
			return;
		}
		var form = new ContractSubcontractForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
		form.show();
	},
	submitContractSubcontract : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractId", __ctxPath + "/dispatch/multiSubmitContractLease.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的合同信息必须是【待提交】的合同！");
			return false;
		}.createDelegate(this));
	},
	delContractSubcontract : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractId", __ctxPath + "/dispatch/multiDelContractLease.do", "删除", function(a) {
			if ("0" == a.applyforState || "9" == a.applyforState) {
				return true;
			}
			$toast("【删除】的合同信息必须是【待提交/作废】的合同！");
			return false;
		}.createDelegate(this));
	},
	nullifyContractSubcontract : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractId", __ctxPath + "/dispatch/multiDeprecateContractLease.do", "作废", function(a) {
			if ("3" == a.applyforState) {
				return true;
			}
			$toast("【作废】的合同信息必须是【待调度】的合同！");
			return false;
		}.createDelegate(this));
	},
	exportContractSubcontract : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportContractLease.do", this.dataGridPanel);
	},
	editContentContractLease : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		var url = __ctxPath + "/dispatch/editContentContractLease.do?formpage=ContractSubcontract&contractId=" + a[0].data["contractId"];
		window.open(url, '合同编辑', 'height='+(window.screen.availHeight-30)+',width='+(window.screen.availWidth-10)+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no');
	}
});