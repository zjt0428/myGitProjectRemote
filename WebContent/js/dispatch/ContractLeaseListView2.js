var ContractLeaseListView2 = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_subcontract_S_EQ = "0";
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
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
			lable : "合同编号",
			name : "Q_contractNo_S_LK"
		}, {
			lable : "承租方",
			name : "Q_paEntName_S_LK"
		}, {
			lable : "出租方",
			name : "Q_pbEntName_S_LK"
		}, {
			lable : "所属部门(分公司）",
			name : "Q_depName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadContractLease
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
			hidden : true,
			header : ContractLeaseFormConfigure.contractSerialHeader,
			dataIndex : "contractSerial" 
		}, {
			width : 60,
			header : "合同编号",
			dataIndex : "contractNo"
		}, {
			width : 60,
			header : "款项类别",
			dataIndex : "fundTypeName"
		}, {
			header : "承租方",
			dataIndex : "paEntName"
		}, {
			header : "出租方",
			dataIndex : "pbEntName"
		}, {
			width : 80,
			header : "制单人",
			dataIndex : "userName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "合同主题",
			dataIndex : "contractTheme"
		}, {
			header : "签订时间",
			dataIndex : "signingTime"
		}, {
			width : 80,
			header : "合同金额",
			dataIndex : "contractAmount"
		}, {
			width : 80,
			header : "合同设备数",
			dataIndex : "equipCount"
		}, {
			width : 80,
			header : "已发货数",
			dataIndex : "sentEquipQuantity"
		}, {
			width : 80,
			header : "已安装数",
			dataIndex : "installEquipQuantity"
		}, {
			width : 80,
			header : "在用数",
			dataIndex : "usedQuantity"
		}, {
			header : "已拆卸数",
			dataIndex : "removeQuantity"
		} , {
			header : "所属部门(分公司）",
			dataIndex : "depName"
		}]
	};
	ContractLeaseListView2.superclass.constructor.call(this, Ext.apply({
		id : "ContractLeaseListView",
		title : TabTitle.CONTRACT_LEASE_LIST,
		iconCls : "menu-business-contract",
		url : __ctxPath + "/dispatch/listContractLease.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ContractLeaseListView2, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptContractLease
		});
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveContractLease
		});
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "作废审核",
			hidden : true,
			handler : this.acceptNullifyContractLease
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "作废审批",
			hidden : true,
			handler : this.approveNullifyContractLease
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_ContractLeaseAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_ContractLeaseApprove")) {
					action[2].hidden = false;
				}
				break;
			case "7":
				if (isGranted("_ContractLeaseNullifyAccept")) {
					action[3].hidden = false;
				}
				break;
			case "8":
				if (isGranted("_ContractLeaseNullifyApprove")) {
					action[4].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ContractArrangeAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "合同信息登记新增",
				handler : this.addContractArrange.createDelegate(this, [ {
					fundType : 1
				} ])
			});
		}
//		if (isGranted("_ContractLeaseAdd")) {
//			tbarItems.push({
//				iconCls : "btn-head-add",
//				text : "新增收款合同",
//				handler : this.addContractLease.createDelegate(this, [ {
//					fundType : 1
//				} ])
//			});
//		}
		if (isGranted("_ContractLeaseEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editContractLease.createDelegate(this)
			});
		}
		if (isGranted("_ContractLeaseMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitContractLease.createDelegate(this)
			});
		}
		if (isGranted("_ContractLeaseMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delContractLease.createDelegate(this)
			});
		}
		if (isGranted("_ContractLeaseMultiNullify")) {
			tbarItems.push({
				iconCls : "btn-dustbin",
				text : "作废",
				handler : this.nullifyContractLease.createDelegate(this)
			});
		}
//		if (isGranted("_ContractLeaseAdd")) {
//			tbarItems.push({
//				iconCls : "btn-head-add",
//				text : "新增付款合同",
//				handler : this.addContractLease.createDelegate(this, [ {
//					fundType : 0
//				} ])
//			});
//		}
		if (isGranted("_ContractLeaseApproval")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "一键审批",
				handler : this.approvalContractLease.createDelegate(this, [ {
					fundType : 0
				} ])
			});
		}
		if (isGranted("_ContractLeaseInit")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "初始化合同",
				handler : this.initContractLease.createDelegate(this, [ {
					fundType : 0
				} ])
			});
		}
		if (isGranted("_ContractLeaseBinding")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "绑定",
				handler : this.bindingContractLease.createDelegate(this)
			});
		}
		if (isGranted("_ContractLeaseChange")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改合同编号",
				handler : this.changeContractLease.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_ContractLeaseEditContent")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "合同编辑",
				handler : this.editContentContractLease.createDelegate(this)
			});
		}
		if (isGranted("_ContractLeaseExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportContractLease.createDelegate(this)
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
	acceptContractLease : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的合同信息必须是【待审核】的状态！");
			return;
		}
		new ContractLeaseForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveContractLease : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的合同信息必须是【待审批】的状态！");
			return;
		}
		new ContractLeaseForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	acceptNullifyContractLease : function(a) {
		if ("7" != a.applyforState) {
			$toast("【审核】的合同信息必须是【作废待审】的状态！");
			return;
		}
		new ContractLeaseForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveNullifyContractLease : function(a) {
		if ("8" != a.applyforState) {
			$toast("【审批】的合同信息必须是【作废待批】的状态！");
			return;
		}
		new ContractLeaseForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadContractLease : function(a) {
		var form = new ContractLeaseForm(a, {
			baseWidth : 0.25,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
		if ("0" == a.fundType) {
			form.getForm().findField("contractLease.deduct").setValue("0").setReadOnly(true);
			form.getForm().findField("contractLease.deductDesc").setReadOnly(true);
		}
		form.show();
	},
	
	addContractArrange : function() {
		new ContractApplicationSelector({
			single : true,
			params : { // 过滤提交拆卸告知
				"Q_inuse_S_NULL" : "1",
				"Q_applyforState_S_EQ" : "3"
			},
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/dispatch/loadContractArrange.do",
					params : {
						loadProject : true,
						//flowId : data.flowId
						arrangeId:data.arrangeId
					},
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						$request({
							url : __ctxPath + "/archive/loadProject.do",
							params : {
								projectId : data.projectId
							},
							success : function(g, h) {
								var resp1 = Ext.util.JSON.decode(g.responseText);
								new ContractLeaseForm(resp.data[0], {
									data:resp.data[0],
									data1:resp1.data[0],
									fundType:1,
									saveable : true,
									callback : function() {
										this.dataGridPanel.getStore().reload();
									}.createDelegate(this)
								}).show();
							}.createDelegate(this)
						})
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addContractLease : function(a) {
		var form = new ContractLeaseForm(a, {
			animateTarget : this.el,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
		if ("0" == a.fundType) {
			form.getForm().findField("contractLease.deduct").setValue("0").setReadOnly(true);
			form.getForm().findField("contractLease.deductDesc").setReadOnly(true);
		}
		form.show();
	},
	editContractLease : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的合同信息必须是【待提交】的合同！");
			return;
		}
		var form = new ContractLeaseForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
		if ("0" == a[0].data.fundType) {
			form.getForm().findField("contractLease.deduct").setValue("0").setReadOnly(true);
			form.getForm().findField("contractLease.deductDesc").setReadOnly(true);
		}
		form.show();
	},
	submitContractLease : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractId", __ctxPath + "/dispatch/multiSubmitContractLease.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的合同信息必须是【待提交】的合同！");
			return false;
		}.createDelegate(this));
	},
	approvalContractLease : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractId", __ctxPath + "/dispatch/approvalContractLease.do", "一键审批", function(a) {
			if ("2" == a.applyforState||"1"==a.applyforState||"0"==a.applyforState) {
				return true;
			}
			$toast("【审批】的合同信息必须是【待审批】的合同！");
			return false;
		}.createDelegate(this));
	},
	initContractLease : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractId", __ctxPath + "/dispatch/initContractLease.do", "初始化合同", function(a) {
			if ("3" == a.applyforState) {
				return true;
			}
			$toast("【初始化】的合同信息必须是【待调度】的合同！");
			return false;
		}.createDelegate(this));
	},
	delContractLease : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractId", __ctxPath + "/dispatch/multiDelContractLease.do", "删除", function(a) {
			if ("0" == a.applyforState || "9" == a.applyforState) {
				return true;
			}
			$toast("【删除】的合同信息必须是【待提交/作废】的合同！");
			return false;
		}.createDelegate(this));
	},
	nullifyContractLease : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractId", __ctxPath + "/dispatch/multiDeprecateContractLease.do", "作废", function(a) {
			if ("3" == a.applyforState) {
				return true;
			}
			$toast("【作废】的合同信息必须是【待调度】的合同！");
			return false;
		}.createDelegate(this));
	},
	exportContractLease : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportContractLease.do", this.dataGridPanel);
	},
	editContentContractLease : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【编辑】的合同！");
			return;
		}
		var url = __ctxPath + "/dispatch/editContentContractLease.do?formpage=ContractLease&contractId=" + a[0].data["contractId"];
		window.open(url, '合同编辑', 'height=' + (window.screen.availHeight - 30) + ',width=' + (window.screen.availWidth - 10) + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no');
	},
	bindingContractLease : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>0) {
			var contractId = "";
			for(var i=0;i<a.length;i++) {
				contractId += a[i].data.contractId+","
			}
			contractId = contractId.substr(0,contractId.length-1);
		}else {
			$toast("请先选择合同");
			return;
		}
		new BindingFormWindows({
			contractId : contractId,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	changeContractLease : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("只能选择一条记录");
			return;
		}
		new ChangeContractNumForm({
			maximized : false ,
			contractId : a[0].data.contractId,
			contractNo : a[0].data.contractNo,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
});