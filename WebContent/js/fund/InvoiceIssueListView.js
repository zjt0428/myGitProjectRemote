var InvoiceIssueListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "票据单号",
			name : "Q_invoiceSerial_S_LK"
		}, {
			lable : "开票项目",
			name : "Q_invoiceItem_S_LK"
		}, {
			lable : "开票日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_issueDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_issueDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadInvoiceIssue
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
			sortField : "invoiceIssueId",
			sortDir : "desc",
			id : "invoiceIssueId",
			fields : InvoiceIssueListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 40,
			header : "状态",
			dataIndex : "issueStatusName"
		}, {
			header : "票据单号",
			dataIndex : "invoiceSerial"
		}, {
			header : "开票项目",
			dataIndex : "invoiceItem"
		}, {
			header : "开票日期",
			dataIndex : "issueDate"
		}, {
			header : "开票金额",
			dataIndex : "issueAmount"
		}, {
			header : "税金",
			dataIndex : "taxAmount"
		}, {
			header : "经办单位",
			dataIndex : "handleEntName"
		}, {
			header : "开票人",
			dataIndex : "issuePractiName"
		}, {
			header : "关联业务",
			dataIndex : "relateModuleName"
		}, {
			header : "业务编号",
			dataIndex : "relateSerial"
		}, {
			width : 55,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ]
	};
	InvoiceIssueListView.superclass.constructor.call(this, Ext.apply({
		id : "InvoiceIssueListView",
		title : TabTitle.INVOICE_ISSUE_LIST,
		iconCls : "menu-business-issue",
		url : __ctxPath + "/fund/listInvoiceIssue.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(InvoiceIssueListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptInvoiceIssue
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveInvoiceIssue
		});
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "作废审核",
			hidden : true,
			handler : this.acceptNullifyInvoiceIssue
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "作废审批",
			hidden : true,
			handler : this.approveNullifyInvoiceIssue
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_InvoiceIssueAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_InvoiceIssueApprove")) {
					action[2].hidden = false;
				}
				break;
			case "4":
				if (isGranted("_InvoiceIssueNullifyAccept")) {
					action[3].hidden = false;
				}
				break;
			case "5":
				if (isGranted("_InvoiceIssueNullifyApprove")) {
					action[4].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InvoiceIssueAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addInvoiceIssue.createDelegate(this)
			});
		}
		if (isGranted("_InvoiceIssueEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editInvoiceIssue.createDelegate(this)
			});
		}
		if (isGranted("_InvoiceIssueMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitInvoiceIssue.createDelegate(this)
			});
		}
		if (isGranted("_InvoiceIssueMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delInvoiceIssue.createDelegate(this)
			});
		}
		if (isGranted("_InvoiceIssueMultiNullify")) {
			tbarItems.push({
				iconCls : "btn-dustbin",
				text : "作废",
				handler : this.nullifyInvoiceIssue.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的开票！";
		var msg2 = "您确认要【" + op + "】所选的开票吗？";
		var msg3 = "成功【" + op + "】所选的开票！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptInvoiceIssue : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的开票信息必须是【待审核】的状态！");
			return;
		}
		new InvoiceIssueForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveInvoiceIssue : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的开票信息必须是【待审批】的状态！");
			return;
		}
		new InvoiceIssueForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	acceptNullifyInvoiceIssue : function(a) {
		if ("4" != a.applyforState) {
			$toast("【审核】的开票信息必须是【作废待审】的状态！");
			return;
		}
		new InvoiceIssueForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveNullifyInvoiceIssue : function(a) {
		if ("5" != a.applyforState) {
			$toast("【审批】的开票信息必须是【作废待批】的状态！");
			return;
		}
		new InvoiceIssueForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadInvoiceIssue : function(a) {
		new InvoiceIssueForm(a).show();
	},
	addInvoiceIssue : function() {
		new ContractLeaseSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "3",
				Q_applyforState_S_LE : "6"
			},
			callback : function(d) {
				var data = d[0].data;
				this.loadInvoiceIssue({
					relateId : data.contractId,
					relateModule : RelationModule.contractLease.relateModule
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	editInvoiceIssue : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的开票信息必须是【待提交】的开票！");
			return;
		}
		new InvoiceIssueForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitInvoiceIssue : function() {
		this.speciallyGridAction(this.dataGridPanel, "invoiceIssueId", __ctxPath + "/fund/multiSubmitInvoiceIssue.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的开票信息必须是【待提交】的开票！");
			return false;
		}.createDelegate(this));
	},
	nullifyInvoiceIssue : function() {
		this.speciallyGridAction(this.dataGridPanel, "invoiceIssueId", __ctxPath + "/dispatch/multiDeprecateInvoiceIssue.do", "作废", function(a) {
			if ("3" == a.applyforState) {
				return true;
			}
			$toast("【作废】的开票信息必须是【审批结束】的开票！");
			return false;
		}.createDelegate(this));
	},
	delInvoiceIssue : function() {
		this.speciallyGridAction(this.dataGridPanel, "invoiceIssueId", __ctxPath + "/fund/multiDelInvoiceIssue.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的开票信息必须是【待提交】的开票！");
			return false;
		}.createDelegate(this));
	},loadInvoiceIssue : function(a, b) {
		switch (a.relateModule) {
		case RelationModule.contractLease.relateModule:
			if (b && b.saveable && (Ext.isEmpty(a.applyforState) || "0" == a.applyforState)) {
				$request({
					url : __ctxPath + "/dispatch/loadContractLease.do?contractId=" + a.relateId,
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						var data = resp.data[0];
						data["manager"] = data.salesman;
						data["relateId"] = data.contractId;
						data["relateSerial"] = data.contractNo;
						data["relateTheme"] = data.contractTheme;
						data["relateModule"] = RelationModule.contractLease.relateModule;
						data["relateModuleName"] = RelationModule.contractLease.relateModuleName;
						data["storeId"] = a.deliveryEntId;
						new InvoiceIssueForm({
							/*dispatchId : a.dispatchId*/
							relation : data
						}, b).show();
					}.createDelegate(this)
				});
			} 
			else {
				new InvoiceIssueForm(a, b).show();
			}
			break;
	}
},
});