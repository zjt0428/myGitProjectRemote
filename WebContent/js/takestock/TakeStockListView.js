var TakeStockListView = function(a) {
	Ext.apply(this, a || {});
	this.params = this.params ? this.params : {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "仓库名称",
			name : "Q_takeStockStorehouse_S_EQ"
		},{
			lable : "盘点日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_takeStockDate_DL_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_takeStockDate_DG_LE"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadTakeStock
	}];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : TakeStockListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "applyforStateName"
		}, {
			header : "单据编号",
			dataIndex : "invoicesSerial"
		}, {
			header : "制单人",
			dataIndex : "userName"
		}, {
			header : "盘点日期",
			dataIndex : "takeStockDate"
		}, {
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			header : "仓库库位",
			dataIndex : "locationName"
		}]
	};
	TakeStockListView.superclass.constructor.call(this, Ext.apply({
		id : "TakeStockListView",
		title : TabTitle.TAKESTOCK_LIST,
		iconCls : "menu-business-equip",
		url : __ctxPath + "/takestock/listTakeStock.do",
		base_params : this.params,
		search_config : {
			preLableHidden : true,
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(TakeStockListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptTakeStock
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveTakeStock
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
		case "1":
			if (isGranted("_TakeStockAccept")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_TakeStockApprove")) {
				action[2].hidden = false;
			}
			break;
	}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_TakeStockAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addTakeStock.createDelegate(this, [ {
					mortgage : 0
				} ])
			});
		}
		if (isGranted("_TakeStockEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editTakeStock.createDelegate(this)
			});
		}
		if (isGranted("_TakeStockMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitTakeStock.createDelegate(this)
			});
		}
		if (isGranted("_TakeStockMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delTakeStock.createDelegate(this)
			});
		}
		tbarItems.push("->");
//		if (isGranted("_TakeStockPrintDocument")) {
//			tbarItems.push({
//				iconCls : "btn-head-print",
//				text : "打印",
//				handler : this.printTakeStockDocument.createDelegate(this)
//			});
//		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, v) {
		var msg1 = "请选择要【" + op + "】的盘点信息！";
		var msg2 = "您确认要【" + op + "】所选盘点信息吗？";
		var msg3 = "成功【" + op + "】所选盘点信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, v);
	},
	acceptTakeStock : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的盘点信息必须是【待审核】的状态！");
			return;
		}
		new TakeStockForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveTakeStock : function(a){
		if ("2" != a.applyforState) {
			$toast("【审批】的盘点信息必须是【待审批】的状态！");
			return;
		}
		new TakeStockForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadTakeStock : function(a) {
		new TakeStockForm(a).show();
	},
	addTakeStock : function(a) {
		new TakeStockForm(a, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editTakeStock : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的盘点信息必须是【待提交】的盘点信息！");
			return;
		}
		new TakeStockForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitTakeStock : function() {
		this.speciallyGridAction(this.dataGridPanel, "takeStockId", __ctxPath + "/takestock/multiSubmitTakeStock.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的盘点信息必须是【待提交】的盘点！");
			return false;
		}.createDelegate(this));
	},
	delTakeStock : function() {
		this.speciallyGridAction(this.dataGridPanel, "takeStockId", __ctxPath + "/takestock/multiDelTakeStock.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的盘点信息必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	printTakeStockDocument : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的信息！");
			return;
		}
		/*var url = __ctxPath + "/archive/.do?takeStockId=" + a[0].data["takeStockId"];*/
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	}
});