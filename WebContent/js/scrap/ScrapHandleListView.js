var ScrapHandleListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "SCRAP_APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo, {
			lable : "资产属性",
			name : "Q_scrapSerial_S_LK"
		}, {
			lable : "存放仓库",
			name : "Q_storeName_S_LK"
		}, {
			lable : "库位",
			name : "Q_storageLocation_S_LK"
		},{
			lable : "制单日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadScrap
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
			fields : ScrapHandleListViewField
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
		},{
			header : "制单人",
			dataIndex : "userName"
		}, {
			header : "报废单号",
			dataIndex : "scrapSerial"
		}, {
			header : "制单日期",
			dataIndex : "applyDate"
		}, {
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			header : "库位",
			dataIndex : "storageLocation"
		}]
	};
	ScrapHandleListView.superclass.constructor.call(this, Ext.apply({
		id : "ScrapHandleListView",
		title : TabTitle.SCRAP_HANDLE_LIST,
		iconCls : "menu-business-install",
		url : __ctxPath + "/stock/listScrapHandle.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ScrapHandleListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptScrap
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveScrap
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_ScrapHandleAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_ScrapHandleApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ScrapHandleAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "申请",
				handler : this.addScrapHandle.createDelegate(this)		
			});
		}
		if (isGranted("_ScrapHandleEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editScrapHandle.createDelegate(this)
			});
		}
		if (isGranted("_ScrapHandleSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitScrapHandle.createDelegate(this)
			});
		}
		if (isGranted("_ScrapHandleMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delScrapHandle.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_ScrapHandlePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printScrapHandle.createDelegate(this)
			});
		}
		if (isGranted("_ScrapHandleExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportScrapHandle.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的处理！";
		var msg2 = "您确认要【" + op + "】所选的处理吗？";
		var msg3 = "成功【" + op + "】所选的处理！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptScrap : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的处理信息必须是【待审核】的状态！");
			return;
		}
		new ScrapHandleForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveScrap : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的处理信息必须是【待审批】的状态！");
			return;
		}
		new ScrapHandleForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadScrap : function(a) {
		new ScrapHandleForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addScrapHandle : function(a) {
		new ScrapContractSelector({
			params : {
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				data.demandDetailSet= d[0].json.demandDetailSet;
				new ScrapHandleForm(data, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editScrapHandle : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的处理信息必须是【待提交】的处理！");
			return;
		}
		new ScrapHandleForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitScrapHandle : function() {
		this.speciallyGridAction(this.dataGridPanel, "handleId", __ctxPath + "/stock/multiSubmitScrapHandle.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的处理信息必须是【待提交】的处理！");
			return false;
		}.createDelegate(this));
	},
	delScrapHandle : function() {
		this.speciallyGridAction(this.dataGridPanel, "handleId", __ctxPath + "/stock/multiDelScrapHandle.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的处理信息必须是【待提交】的处理！");
			return false;
		}.createDelegate(this));
	},
	printScrapHandle : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/stock/printFormScrapHandle.do?handleId=" + a[0].data["handleId"];
		});
	},
	exportScrapHandle : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/stock/exportScrapHandle.do", this.dataGridPanel);
	}
});