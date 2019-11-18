var MoneyBackListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "还款单号",
			name : "Q_backSerial_S_LK"
		}, {
			lable : "还款人员",
			name : "Q_practiName_S_LK"
		}, {
			lable : "还款日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_backDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_backDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadMoneyBack
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
			sortField : "backId",
			sortDir : "desc",
			id : "backId",
			fields : MoneyBackListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "还款单号",
			dataIndex : "backSerial"
		}, {
			width : 80,
			header : "还款人员",
			dataIndex : "practiName"
		}, {
			width : 80,
			header : "还款日期",
			dataIndex : "backDate"
		}, {
			width : 80,
			header : "还款金额",
			dataIndex : "backAmount"
		}, {
			width : 40,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ]
	};
	MoneyBackListView.superclass.constructor.call(this, Ext.apply({
		id : "MoneyBackListView",
		title : TabTitle.MONEY_BACK_LIST,
		iconCls : "menu-business-back",
		url : __ctxPath + "/fund/listMoneyBack.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(MoneyBackListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptMoneyBack
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveMoneyBack
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_MoneyBackAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_MoneyBackApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_MoneyBackAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addMoneyBack.createDelegate(this)
			});
		}
		if (isGranted("_MoneyBackEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editMoneyBack.createDelegate(this)
			});
		}
		if (isGranted("_MoneyBackMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitMoneyBack.createDelegate(this)
			});
		}
		if (isGranted("_MoneyBackMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delMoneyBack.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的还款！";
		var msg2 = "您确认要【" + op + "】所选的还款吗？";
		var msg3 = "成功【" + op + "】所选的还款！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptMoneyBack : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的还款信息必须是【待审核】的状态！");
			return;
		}
		new MoneyBackForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveMoneyBack : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的还款信息必须是【待审批】的状态！");
			return;
		}
		new MoneyBackForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadMoneyBack : function(a) {
		new MoneyBackForm(a).show();
	},
	addMoneyBack : function() {
		new MoneyLendSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				new MoneyBackForm({
					lend : data
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editMoneyBack : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的还款信息必须是【待提交】的还款！");
			return;
		}
		new MoneyBackForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitMoneyBack : function() {
		this.speciallyGridAction(this.dataGridPanel, "backId", __ctxPath + "/fund/multiSubmitMoneyBack.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的还款信息必须是【待提交】的还款！");
			return false;
		}.createDelegate(this));
	},
	delMoneyBack : function() {
		this.speciallyGridAction(this.dataGridPanel, "backId", __ctxPath + "/fund/multiDelMoneyBack.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的还款信息必须是【待提交】的还款！");
			return false;
		}.createDelegate(this));
	}
});