var ContractArrangeSituationListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_arrangeId_L_EQ = a.arrangeId ? a.arrangeId : -1;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var equipCategoryCombo = $initSimpleComboBoxField("类型", "Q_equipCategory_S_EQ", [ [ "T", "塔吊" ], [ "S", "升降机" ] ], {
			lable : "类型",
			allowBlank : true
		});
		generalItems = [ equipCategoryCombo ];
	}

	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadContractArrangeSituation
	} ];
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : ContractArrangeSituationListViewField
		},
		rowAction : {
			width : 80,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "类型",
			dataIndex : "equipCategoryName"
		}, {
			header : "承租单位",
			dataIndex : "receiveEntName"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "项目要求",
			dataIndex : "demand"
		}, {
			header : "安装高度",
			dataIndex : "installHeight"
		}, {
			header : "安装时间(估)",
			dataIndex : "duration"
		}, {
			header : "设备型号",
			dataIndex : "equipSpecificName"
		}, {
			header : "基础",
			dataIndex : "baseDescribe"
		}, {
			header : "产权",
			dataIndex : "propertyName"
		}, {
			header : "设备来源",
			dataIndex : "equipSource"
		}, {
			header : "设备品牌",
			dataIndex : "equipVender"
		}, {
			header : "IC编号",
			dataIndex : "icSerial"
		}, {
			header : "备注",
			dataIndex : "remark"
		} ]
	};
	ContractArrangeSituationListView.superclass.constructor.call(this, Ext.apply({
		id : "ContractArrangeSituationListView",
		title : this.arrangeSerial + "-" + TabTitle.CONTRACT_ARRANGE_SITUATION_LIST,
		iconCls : "menu-business-borrow",
		url : __ctxPath + "/dispatch/listContractArrangeSituation.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ContractArrangeSituationListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ContractArrangeSituationAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "塔吊",
				handler : this.addContractArrangeSituation.createDelegate(this, [ "T" ])
			});
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "升降机",
				handler : this.addContractArrangeSituation.createDelegate(this, [ "S" ])
			});
		}
		if (isGranted("_ContractArrangeSituationEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editContractArrangeSituation.createDelegate(this)
			});
		}
		if (isGranted("_ContractArrangeSituationMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delContractArrangeSituation.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_ContractArrangeSituationExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportContractArrangeSituation.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的信息！";
		var msg2 = "您确认要【" + op + "】所选的信息吗？";
		var msg3 = "成功【" + op + "】所选的信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadContractArrangeSituation : function(a) {
		new ContractArrangeSituationForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addContractArrangeSituation : function(a) {
		new ContractArrangeSituationForm({
			arrangeId : this.arrangeId,
			equipCategory : a
		}, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editContractArrangeSituation : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new ContractArrangeSituationForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delContractArrangeSituation : function() {
		this.speciallyGridAction(this.dataGridPanel, "arrangeSituationId", __ctxPath + "/dispatch/multiDelContractArrangeSituation.do", "删除");
	},
	exportContractArrangeSituation : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportContractArrangeSituation.do", this.dataGridPanel);
	}
});