var OutStockListView = function(a) {
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
			fields : OutStockListViewField
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "userName",
			renderer : function(){
				return "200";
			}
		},{
			header : "申请人",
			dataIndex : "userName"
		}, {
			header : "申请单号",
			dataIndex : "scrapSerial"
		}, {
			header : "申请日期",
			dataIndex : "applyDate"
		}, {
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			header : "库位",
			dataIndex : "storageLocation"
		}, {
			width : 40,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}]
	};
	OutStockListView.superclass.constructor.call(this, Ext.apply({
		id : "OutStockListView",
		title : TabTitle.SCRAP_APPLY_LIST,
		iconCls : "menu-business-scrap",
		url : __ctxPath + "/stock/listScrapApply.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(OutStockListView, Knight.ux.SearchGridPanel, {
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
	initTopBarActionItems : function() {
		var tbarItems = [];
		tbarItems.push("->");
		if (isGranted("_BorrowPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printOutStock.createDelegate(this)
			});
		}
		if (isGranted("_BorrowExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportOutStock.createDelegate(this)
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
	printOutStock : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/stock/printFormScrapApply.do?scrapId=" + a[0].data["scrapId"];
		});
	},
	exportOutStock : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/stock/exportOutStock.do", this.dataGridPanel);
	}
});