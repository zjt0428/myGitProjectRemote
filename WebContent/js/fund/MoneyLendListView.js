var MoneyLendListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "借款单号",
			name : "Q_lendSerial_S_LK"
		}, {
			lable : "借款人员",
			name : "Q_practiName_S_LK"
		}, {
			lable : "借款日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_lendDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_lendDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadMoneyLend
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
			sortField : "lendId",
			sortDir : "desc",
			id : "lendId",
			fields : MoneyLendListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "借款单号",
			dataIndex : "lendSerial"
		}, {
			width : 80,
			header : "借款人员",
			dataIndex : "practiName"
		}, {
			width : 80,
			header : "借款日期",
			dataIndex : "lendDate"
		}, {
			width : 80,
			header : "借款金额",
			dataIndex : "lendAmount"
		}, {
			width : 80,
			header : "预计还款时间",
			dataIndex : "backDate"
		}, {
			width : 40,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ]
	};
	MoneyLendListView.superclass.constructor.call(this, Ext.apply({
		id : "MoneyLendListView",
		title : TabTitle.MONEY_LEND_LIST,
		iconCls : "menu-business-lend",
		url : __ctxPath + "/fund/listMoneyLend.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(MoneyLendListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptMoneyLend
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveMoneyLend
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_MoneyLendAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_MoneyLendApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_MoneyLendAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addMoneyLend.createDelegate(this)
			});
		}
		if (isGranted("_MoneyLendEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editMoneyLend.createDelegate(this)
			});
		}
		if (isGranted("_MoneyLendMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitMoneyLend.createDelegate(this)
			});
		}
		if (isGranted("_MoneyLendMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delMoneyLend.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的借款！";
		var msg2 = "您确认要【" + op + "】所选的借款吗？";
		var msg3 = "成功【" + op + "】所选的借款！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptMoneyLend : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的借款信息必须是【待审核】的状态！");
			return;
		}
		new MoneyLendForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveMoneyLend : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的借款信息必须是【待审批】的状态！");
			return;
		}
		new MoneyLendForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadMoneyLend : function(a) {
		new MoneyLendForm(a).show();
	},
	addMoneyLend : function() {
		new MoneyLendForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editMoneyLend : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的借款信息必须是【待提交】的借款！");
			return;
		}
		new MoneyLendForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitMoneyLend : function() {
		this.speciallyGridAction(this.dataGridPanel, "lendId", __ctxPath + "/fund/multiSubmitMoneyLend.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的借款信息必须是【待提交】的借款！");
			return false;
		}.createDelegate(this));
	},
	delMoneyLend : function() {
		this.speciallyGridAction(this.dataGridPanel, "lendId", __ctxPath + "/fund/multiDelMoneyLend.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的借款信息必须是【待提交】的借款！");
			return false;
		}.createDelegate(this));
	}
});