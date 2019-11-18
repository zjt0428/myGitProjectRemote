var InvoiceCollectListView = function(a) {
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
			lable : "收票项目",
			name : "Q_invoiceItem_S_LK"
		}, {
			lable : "收票日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_collectDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_collectDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadInvoiceCollect
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
			sortField : "invoiceCollectId",
			sortDir : "desc",
			id : "invoiceCollectId",
			fields : InvoiceCollectListViewField
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
			dataIndex : "collectStatusName"
		}, {
			width : 80,
			header : "票据单号",
			dataIndex : "invoiceSerial"
		}, {
			width : 80,
			header : "收票项目",
			dataIndex : "invoiceItem"
		}, {
			width : 80,
			header : "收票日期",
			dataIndex : "collectDate"
		}, {
			width : 80,
			header : "收票金额",
			dataIndex : "collectAmount"
		}, {
			width : 80,
			header : "经办单位",
			dataIndex : "issueEnterprise"
		}, {
			width : 80,
			header : "关联业务",
			dataIndex : "relateModuleName"
		}, {
			width : 80,
			header : "业务编号",
			dataIndex : "relateSerial"
		}, {
			width : 55,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ]
	};
	InvoiceCollectListView.superclass.constructor.call(this, Ext.apply({
		id : "InvoiceCollectListView",
		title : TabTitle.INVOICE_COLLECT_LIST,
		iconCls : "menu-business-collect",
		url : __ctxPath + "/fund/listInvoiceCollect.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(InvoiceCollectListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptInvoiceCollect
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveInvoiceCollect
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_InvoiceCollectAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_InvoiceCollectApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InvoiceCollectAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addInvoiceCollect.createDelegate(this)
			});
		}
		if (isGranted("_InvoiceCollectEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editInvoiceCollect.createDelegate(this)
			});
		}
		if (isGranted("_InvoiceCollectMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitInvoiceCollect.createDelegate(this)
			});
		}
		if (isGranted("_InvoiceCollectMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delInvoiceCollect.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的收票！";
		var msg2 = "您确认要【" + op + "】所选的收票吗？";
		var msg3 = "成功【" + op + "】所选的收票！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptInvoiceCollect : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的收票信息必须是【待审核】的状态！");
			return;
		}
		new InvoiceCollectForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveInvoiceCollect : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的收票信息必须是【待审批】的状态！");
			return;
		}
		new InvoiceCollectForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadInvoiceCollect : function(a) {
		new InvoiceCollectForm(a).show();
	},
	addInvoiceCollect : function() {
		new InvoiceCollectForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editInvoiceCollect : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的收票信息必须是【待提交】的收票！");
			return;
		}
		new InvoiceCollectForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitInvoiceCollect : function() {
		this.speciallyGridAction(this.dataGridPanel, "invoiceCollectId", __ctxPath + "/fund/multiSubmitInvoiceCollect.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的收票信息必须是【待提交】的收票！");
			return false;
		}.createDelegate(this));
	},
	delInvoiceCollect : function() {
		this.speciallyGridAction(this.dataGridPanel, "invoiceCollectId", __ctxPath + "/fund/multiDelInvoiceCollect.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的收票信息必须是【待提交】的收票！");
			return false;
		}.createDelegate(this));
	}
});