var ScrapApplyListView = function(a) {
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
			lable : "申请日期",
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
			fields : ScrapApplyListViewField
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
			header : "申请人",
			dataIndex : "userName"
		}, {
			header : "申请单号",
			dataIndex : "scrapSerial"
		}, {
			header : "报废主题",
			dataIndex : "scrapTheme"
		}, {
			header : "申请日期",
			dataIndex : "applyDate"
		}, {
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			header : "库位",
			dataIndex : "storageLocation"
		}]
	};
	ScrapApplyListView.superclass.constructor.call(this, Ext.apply({
		id : "ScrapApplyListView",
		title : TabTitle.SCRAP_APPLY_LIST,
		iconCls : "menu-business-install",
		url : __ctxPath + "/stock/listScrapApply.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ScrapApplyListView, Knight.ux.SearchGridPanel, {
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
				if (isGranted("_ScrapApplyAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_ScrapApplyApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ScrapApplyAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "申请",
				handler : this.addScrapApply.createDelegate(this)		
			});
		}
		if (isGranted("_ScrapApplyEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editScrapApply.createDelegate(this)
			});
		}
		if (isGranted("_ScrapApplySubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitScrapApply.createDelegate(this)
			});
		}
		if (isGranted("_ScrapApplyMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delScrapApply.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_ScrapApplyPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printScrapApply.createDelegate(this)
			});
		}
		if (isGranted("_ScrapApplyExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportScrapApply.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的申请！";
		var msg2 = "您确认要【" + op + "】所选的申请吗？";
		var msg3 = "成功【" + op + "】所选的申请！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptScrap : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的申请信息必须是【待审核】的状态！");
			return;
		}
		new ScrapApplyForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveScrap : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的申请信息必须是【待审批】的状态！");
			return;
		}
		new ScrapApplyForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadScrap : function(a) {
		new ScrapApplyForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addScrapApply : function(a) {
		new BaseDepotSelector({
			callback : function(d) {
				new ScrapApplyForm({
					storeId : d[0].data.depotId,
					storeName : d[0].data.depotName
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show(); 
	},
	editScrapApply : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的申请信息必须是【待提交】的申请！");
			return;
		}
		new ScrapApplyForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitScrapApply : function() {
		this.speciallyGridAction(this.dataGridPanel, "scrapId", __ctxPath + "/stock/multiSubmitScrapApply.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的申请信息必须是【待提交】的申请！");
			return false;
		}.createDelegate(this));
	},
	delScrapApply : function() {
		this.speciallyGridAction(this.dataGridPanel, "scrapId", __ctxPath + "/stock/multiDelScrapApply.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的申请信息必须是【待提交】的申请！");
			return false;
		}.createDelegate(this));
	},
	printScrapApply : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/stock/printFormScrapApply.do?scrapId=" + a[0].data["scrapId"];
		});
	},
	exportScrapApply : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/stock/exportScrapApply.do", this.dataGridPanel);
	}
});