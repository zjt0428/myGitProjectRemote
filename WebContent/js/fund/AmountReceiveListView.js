var AmountReceiveListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
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
	
	var statusCombo = $initComboBoxField("审批情况", "Q_applyforState_S_EQ", "APPLYFOR_STATE", {
		width : 75,
		lable : "审批情况",
		allowBlank : true
	});
	if (!this.searchDisenable) {
		generalItems = [ statusCombo,{
			lable : "付款单位",
			name : "Q_paymentEntName_S_LK"
		}, {
			lable : "收款主题",
			name : "Q_amountTheme_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "收款日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_receiveDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_receiveDate_S_LE"
		},{
			lable : "合同编号",
			name : "Q_contractLease.contractNo_S_LK"
		}, {
			id : Ext.id(),
			valId : this.practiDepartmentId,
			xtype : "treecombowithchild",
			width : 160,
			editable : false,
			lable : "所属部门",
			url : __ctxPath + "/system/listDepartment.do?opt=practitioner"
		}, {
			hidden : true,
			id : this.practiDepartmentId,
			name : "QVO_competentDepartmentId_L_EQ"
		}];
		var advancedItems = [{
			fieldType : "CHAR_FIELD",
			fieldLabel : "制单人",
			name : "Q_userName_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "收款单号",
			name : "Q_amountSerial_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "收款单位",
			name : "Q_receiveEntName_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "付款单位",
			name : "Q_paymentEntName_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "收款主题",
			name : "Q_amountTheme_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "合同编号",
			name : "Q_contractLease.contractNo_S_LK"
		},{
			fieldType : "CODE_TREE_FIELD",
			id : Ext.id(),
			url : __ctxPath + "/system/listDepartment.do?opt=practitioner",
			name : "Q_competentDepartment_S_LK",
			fieldLabel : "所属部门"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "收款日期",
			leftFieldLabel : "Q_receiveDate_S_GE",
			rightFieldLabel : "Q_receiveDate_S_LE"
		},{
			fieldType : "CODE_FIELD",
			codeId : "APPLYFOR_STATE",
			name : "Q_applyforState_S_EQ",
			fieldLabel : "审批情况"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadAmountReceive
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
			fields : AmountReceiveListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			hidden : true,
			header : "状态",
			dataIndex : "receiveStatusName"
		}, {
			width : 60,
			header : "制单人",
			dataIndex : "userName"
		}, {
			header : "收款主题",
			dataIndex : "amountTheme"
		}, {
			header : "合同编号",
			dataIndex : "contractLease",
			renderer : function(n) {
				return n.contractSerial;
			}
		}, {
			header : "合同编号",
			dataIndex : "contractLease",
			renderer : function(n) {
				return n.contractNo;
			}
		}, {
			header : "业务编号",
			dataIndex : "relateSerial"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "收款单位",
			dataIndex : "receiveEntName"
		}, {
			header : "收款金额",
			dataIndex : "receiveAmount"
		}, {
			header : "付款方",
			dataIndex : "paymentName"
		}, {
			header : "收款日期",
			dataIndex : "receiveDate"
		}, {
			header : "经办人员",
			dataIndex : "practiName"
		}, {
			header : "关联业务",
			dataIndex : "relateModuleName"
		}, {
			width : 60,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		}]
	};
	AmountReceiveListView.superclass.constructor.call(this, Ext.apply({
		id : "AmountReceiveListView",
		title : TabTitle.AMOUNT_RECEIVE_LIST,
		iconCls : "menu-business-receive",
		url : __ctxPath + "/fund/listAmountReceive.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AmountReceiveListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptAmountReceive
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
				if (isGranted("_AmountReceiveAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_AmountReceiveApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AmountReceiveAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSettleContractReceive.createDelegate(this)
			}/*{
				xtype : "tbsplit",
				iconCls : "btn-head-add",
				text : "新增",
				menu : {
					items : [ {
						text : "合同结算",
						handler : this.addSettleContractReceive.createDelegate(this)
					}, {
						text : "借用回款",
						iconCls : "calendar",
						handler : this.addBorrowReceive.createDelegate(this)
					}, {
						text : "采购回款",
						iconCls : "calendar",
						handler : this.addPurchaseReceive.createDelegate(this)
					}, {
						text : "其他",
						iconCls : "calendar",
						handler : this.addAmountReceive.createDelegate(this)
					} ]
				}
			}*/);
			/*tbarItems.push({
				iconCls : "btn-head-add",
				text : "复制",
				handler : this.copyAmountReceive.createDelegate(this)
			});*/
		}
		if (isGranted("_AmountReceiveEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAmountReceive.createDelegate(this)
			});
		}
		if (isGranted("_AmountReceiveMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitAmountReceive.createDelegate(this)
			});
		}
		if (isGranted("_AmountReceiveMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delAmountReceive.createDelegate(this)
			});
		}
		/*if (isGranted("_AmountReceiveMultiRestore")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "huanyuan",
				handler : this.restoreAmountReceive.createDelegate(this)
			});
		}
		if (isGranted("_AmountReceiveMultiaddBack")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "addback",
				handler : this.addbackAmountReceive.createDelegate(this)
			});
		}
		if (isGranted("_AmountReceiveMultiaddBack")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "calculate",
				handler : this.calculate.createDelegate(this)
			});
		}*/
		tbarItems.push("->")
		if (isGranted("_AmountReceiveExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportAmountReceive.createDelegate(this)
			});
		}
		return tbarItems;
	},
	showAmountReceiveDetail : function(data, cfg) {
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
		new AmountReceiveForm(data, cfg).show();
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的收款！";
		var msg2 = "您确认要【" + op + "】所选的收款吗？";
		var msg3 = "成功【" + op + "】所选的收款！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptAmountReceive : function(data) {
		if ("1" != data.applyforState) {
			$toast("【审核】的收款信息必须是【待审核】的状态！");
			return;
		}
		this.showAmountReceiveDetail(data, {
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
		this.showAmountReceiveDetail(data, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},

	loadAmountReceive : function(data) {
		this.showAmountReceiveDetail(data, null);
	},
	addSettleContractReceive : function() {
		new ContractLeaseSelector({
			params : {
				Q_applyforState_S_GE : "3",
				Q_applyforState_S_LE : "8"
//				Q_fundType_S_EQ : "1",
//				Q_effective_S_EQ : "1",
//				Q_closedStatus_S_EQ : "0"
//				QUERY_FILTER : "settle_contract_list"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.contractId,
					relateSerial : data.contractSerial,
					relateTheme : data.contractTheme,
					relateModule : RelationModule.contractLease.relateModule,
					relateModuleName : RelationModule.contractLease.relateModuleName,
					relationData : data
				}
				this.showAmountReceiveDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addBorrowReceive : function() {
		new BorrowSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.borrowId,
					relateSerial : data.borrowSerial,
					relateTheme : data.borrowTheme,
					relateModule : RelationModule.borrow.relateModule,
					relateModuleName : RelationModule.borrow.relateModuleName,
					relationData : data
				}
				this.showAmountReceiveDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addPurchaseReceive : function() {
		new PurchaseSelector({
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.purchaseId,
					relateSerial : data.purchaseSerial,
					relateTheme : data.purchaseTheme,
					relateModule : RelationModule.purchase.relateModule,
					relateModuleName : RelationModule.purchase.relateModuleName,
					relationData : data
				}
				this.showAmountReceiveDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addAmountReceive : function() {
		this.showAmountReceiveDetail(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},
	copyAmountReceive : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【复制】的记录！");
			return;
		}
		new AmountReceiveForm(a[0].data, {
			copyable : true,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editAmountReceive : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的收款信息必须是【待提交】的收款！");
			return;
		}
		if (a[0].data.relateId && a[0].data.relateModule) {
			a[0].data.relation = {
				relateId : a[0].data.relateId,
				relateSerial : a[0].data.relateSerial,
				relateModule : a[0].data.relateModule
			}
		}
		new AmountReceiveForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitAmountReceive : function() {
		this.speciallyGridAction(this.dataGridPanel, "amountReceiveId", __ctxPath + "/fund/multiSubmitAmountReceive.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的收款信息必须是【待提交】的收款！");
			return false;
		}.createDelegate(this));
	},
	delAmountReceive : function() {
		this.speciallyGridAction(this.dataGridPanel, "amountReceiveId", __ctxPath + "/fund/multiDelAmountReceive.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的收款信息必须是【待提交】的收款！");
			return false;
		}.createDelegate(this));
	},
	restoreAmountReceive : function() {
		this.speciallyGridAction(this.dataGridPanel, "amountReceiveId", __ctxPath + "/fund/restoreAmountReceive.do", "huanyuan", null);
	},
	addbackAmountReceive : function() {
		this.speciallyGridAction(this.dataGridPanel, "amountReceiveId", __ctxPath + "/fund/addBackAmountReceive.do", "huanyuan", null);
	},
	calculate : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		var b = 0
		for(var i=0; i<a.length; i++) {
			b+=Number(a[i].data.receiveAmount);
		}
		alert(b);
	},
	exportAmountReceive : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/fund/exportAmountReceive.do", this.dataGridPanel);
	},
});