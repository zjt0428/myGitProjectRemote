var ContractMaterialsListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "CONTRACT_MATERIALS_STATUS", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		var generalItems = [ applyforStatusCombo, {
			lable : "合同编号",
			name : "Q_contractSerial_S_LK"
		},{
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "项目地址",
			name : "Q_address_S_LK"
		}, {
			lable : "出租单位",
			name : "Q_pbEntName_S_LK"
		}, {
			lable : "签订起止日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_sigingTime_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_sigingTime_S_LE"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadContractMaterials
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : ContractMaterialsListViewField
		},
		rowAction : {
			width : 10,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "applyforStateName"
		}, {
			header : "出租单位",
			dataIndex : "pbEntName"
		}, {
			width : 80,
			header : "项目主管部门",
			dataIndex : "competentDepartment"
		}, {
			width : 80,
			header : "合同编号",
			dataIndex : "contractSerial"
		}, {
			width : 40,
			header : "合同类型",
			dataIndex : "contractCategoryName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "项目地址",
			dataIndex : "address"
		}, {
			width : 40,
			header : "签订时间",
			dataIndex : "sigingTime"
		} ]
	};
	ContractLeaseListView.superclass.constructor.call(this, Ext.apply({
		id : "ContractMaterialsListView",
		title : TabTitle.CONTRACT_MATERIALS_LIST,
		iconCls : "menu-business-contract",
		url : __ctxPath + "/dispatch/listContractMaterials.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ContractMaterialsListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptContractMaterials
		});
		actionItems.push({
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveContractMaterials
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_ContractMaterialsAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_ContractMaterialsApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ContractMaterialsAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增（周材计划）",
				handler : this.addMaterialsPlan.createDelegate(this, [ {
				} ])
			});
		}
		if (isGranted("_ContractMaterialsAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addMaterials.createDelegate(this)
			});
		}
		if (isGranted("_ContractMaterialsEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editContractMaterials.createDelegate(this)
			});
		}
		if (isGranted("_ContractMaterialsMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitContractMaterials.createDelegate(this)
			});
		}
		if (isGranted("_ContractMaterialsMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delContractMaterials.createDelegate(this)
			});
		}
		if (isGranted("_ContractMaterialsInvalid")) {
			tbarItems.push({
				iconCls : "btn-invalid",
				text : "作废",
				handler : this.invalidContractMaterials.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_ContractMaterialsExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportContractMaterials.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材合同！";
		var msg2 = "您确认要【" + op + "】所选的周材合同吗？";
		var msg3 = "成功【" + op + "】所选的周材合同！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptContractMaterials : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的合同信息必须是【待审核】的状态！");
			return;
		}
		new ContractMaterialsForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveContractMaterials : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的合同信息必须是【待审批】的状态！");
			return;
		}
		new ContractMaterialsForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	loadContractMaterials : function(a) {
		new ContractMaterialsForm(a, {
			baseWidth : 0.20,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	addMaterialsPlan : function() {
		new MaterialsPlanSelector({
			single : true,
			params : { 
				"Q_[applyforState]_S_EQ" : "3"
			},
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/dispatch/loadMaterialsPlan.do",
					params : {
						materialsPlanId:data.materialsPlanId
					},
							success : function(g, h) {
								var resp1 = Ext.util.JSON.decode(g.responseText);
								new ContractMaterialsForm( {
									data1:resp1.data[0],
									saveable : true,
									callback : function() {
										this.dataGridPanel.getStore().reload();
									}.createDelegate(this)
								}).show();
							}.createDelegate(this)
						})
			}.createDelegate(this)
		}).show();
	},
	addMaterials : function(){
		new ContractMaterialsForm2(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editContractMaterials : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的合同信息必须是【待提交】的合同！");
			return;
		}
		var form = new ContractMaterialsForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
		form.show();
	},
	submitContractMaterials : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractmaId", __ctxPath + "/dispatch/multiSubmitContractMaterials.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的合同信息必须是【待提交】的合同！");
			return false;
		}.createDelegate(this));
	},
	delContractMaterials : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractmaId", __ctxPath + "/dispatch/multiDelContractMaterials.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的合同信息必须是【待提交】的合同！");
			return false;
		}.createDelegate(this));
	},
	invalidContractMaterials : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractmaId", __ctxPath + "/dispatch/invalidContractMaterials.do", "作废", true);
	},
	exportContractMaterials : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportContractMaterials.do", this.dataGridPanel);
	},
});