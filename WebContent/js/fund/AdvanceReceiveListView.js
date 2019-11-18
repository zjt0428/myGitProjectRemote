var AdvanceReceiveListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")) {
		this.params['QVO_contractLease.permissionFlag_S_LK'] = curUserInfo.dataPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	Ext.apply(this, {
		practiDepartmentId : Ext.id()
	});
	// =====================================================================//
	var generalItems = null;
	var depSelector = new TreeSelector("depTreeSelector", __ctxPath + "/system/listDepartment.do?opt=appUser", "所属部门", this.practiDepartmentId,true, {
		lable : "所属部门",
		width : 130,
		value : this.depId,
	});
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "制单人",
			name : "Q_userName_S_LK"
		}, {
			lable : "收款单号",
			name : "Q_advanceSerial_S_LK"
		}, {
			lable : "收款单位",
			name : "Q_receiveEntName_S_LK"
		}, {
			lable : "付款单位",
			name : "Q_paymentName_S_LK"
		}, {
			lable : "收款主题",
			name : "Q_advanceTheme_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_contractLease.projectName_S_LK"
		}, {
			lable : "预收款日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_advanceDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_advanceDate_S_LE"
		} ,{
			lable : "合同编号",
			name : "Q_contractLease.contractNo_S_LK"
		},{
			id : Ext.id(),
			valId : this.practiDepartmentId,
			xtype : "treecombo",
			width : 160,
			editable : false,
			lable : "所属部门",
			url : __ctxPath + "/system/listDepartment.do?opt=practitioner"
		}, {
			hidden : true,
			id : this.practiDepartmentId,
			name : "Q_contractLease.competentDepartmentId_L_EQ"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadAdvanceReceive
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
			fields : AdvanceReceiveListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 60,
			header : "制单人",
			dataIndex : "userName"
		}, {
			header : "预收款主题",
			dataIndex : "advanceTheme"
		}, {
			header : "合同编号",
			dataIndex : "contractLease.contractNo"
		}, {
			header : "合同编号",
			dataIndex : "contractLease",
			renderer : function(n) {
				return n.contractSerial;
			}
		}, {
			header : "项目名称",
			dataIndex : "contractLease.projectName"
		}, {
			header : "收款单位",
			dataIndex : "receiveEntName"
		}, {
			header : "预收款金额",
			dataIndex : "advanceReceiveAmount"
		}, {
			header : "付款方",
			dataIndex : "paymentName"
		}, {
			header : "预收款日期",
			dataIndex : "advanceDate"
		}, {
			header : "经办人员",
			dataIndex : "practiName"
		}, {
			width : 60,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		}]
	};
	AdvanceReceiveListView.superclass.constructor.call(this, Ext.apply({
		id : "AdvanceReceiveListView",
		title : "预收款管理",
		iconCls : "menu-business-receive",
		url : __ctxPath + "/fund/listAdvanceReceive.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AdvanceReceiveListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptAdvanceReceive
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveAmountReceive
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_AdvanceReceiveAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_AdvanceReceiveApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AdvanceReceiveAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSettleContractReceive.createDelegate(this)
			});
		}
		if (isGranted("_AdvanceReceiveEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAdvanceReceive.createDelegate(this)
			});
		}
		if (isGranted("_AdvanceReceiveMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitAdvanceReceive.createDelegate(this)
			});
		}
		if (isGranted("_AdvanceReceiveMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delAdvanceReceive.createDelegate(this)
			});
		}
		return tbarItems;
	},
	showAdvanceReceiveDetail : function(data, cfg) {
		if (data && data.relateId && data.relateModule) {
			data.relation = {};
			Ext.apply(data.relation, {
				relateId : data.relateId,
				relateSerial : data.relateSerial,
				relateTheme : data.relateTheme,
				relateModule : data.relateModule,
				relateModuleName : data.relateModuleName
			});
		}
		new AdvanceReceiveForm(data, cfg).show();
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的预收款！";
		var msg2 = "您确认要【" + op + "】所选的预收款吗？";
		var msg3 = "成功【" + op + "】所选的预收款！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptAdvanceReceive : function(data) {
		if ("1" != data.applyforState) {
			$toast("【审核】的预收款信息必须是【待审核】的状态！");
			return;
		}
		this.showAdvanceReceiveDetail(data, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},
	approveAmountReceive : function(data) {
		if ("2" != data.applyforState) {
			$toast("【审批】的收款信息必须是【待审批】的状态！");
			return;
		}
		this.showAdvanceReceiveDetail(data, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},
	loadAdvanceReceive : function(data) {
		this.showAdvanceReceiveDetail(data, null);
	},
	addSettleContractReceive : function() {
		new ContractLeaseSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "3",
				Q_applyforState_S_LE : "8"
//				QUERY_FILTER : "settle_contract_list"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				var mount = {
						contractId : data.contractId,
						contractNo : data.contractNo,
						projectName : data.projectName,
						address : data.address,
						receiveEntId : data.pbEnt,
						receiveModule : data.pbModule,
						receiveEntName : data.pbEntName,
						paymentId : data.paEnt,
						paymentModule : data.paModule,
						paymentName : data.paEntName,
//					relateId : data.settleId,
//					relateSerial : data.settleSerial,
//					relateTheme : data.settleTheme,
//					relateModule : RelationModule.settleContract.relateModule,
//					relateModuleName : RelationModule.settleContract.relateModuleName,
//					relationData : data
				}
				new AdvanceReceiveForm(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editAdvanceReceive : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的收款信息必须是【待提交】的收款！");
			return;
		}
		new AdvanceReceiveForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitAdvanceReceive : function() {
		this.speciallyGridAction(this.dataGridPanel, "adreceiveId", __ctxPath + "/fund/multiSubmitAdvanceReceive.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的收款信息必须是【待提交】的收款！");
			return false;
		}.createDelegate(this));
	},
	delAdvanceReceive : function() {
		this.speciallyGridAction(this.dataGridPanel, "adreceiveId", __ctxPath + "/fund/multiDelAdvanceReceive.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的收款信息必须是【待提交】的收款！");
			return false;
		}.createDelegate(this));
	}
});