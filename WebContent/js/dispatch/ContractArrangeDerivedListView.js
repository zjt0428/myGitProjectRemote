var ContractArrangeDerivedListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	this.params["Q_arrangeType_S_EQ"] = "1";
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
		handler : this.loadContractArrange
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
			fields : ContractArrangeListViewField
		},
		rowAction : {
			width : 80,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "设备类别",
			dataIndex : "equipCategoryName"
		}, {
			header : "填报日期",
			dataIndex : "providedDate"
		}, {
			header : "填报人",
			dataIndex : "userName"
		} ]
	};
	ContractArrangeDerivedListView.superclass.constructor.call(this, Ext.apply({
		id : "ContractArrangeDerivedListView",
		title : "塔吊升降机安排",
		iconCls : "menu-business-borrow",
		url : __ctxPath + "/dispatch/listContractArrange.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ContractArrangeDerivedListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ContractArrangeDerivedAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "塔吊",
				handler : this.addContractArrange.createDelegate(this, [ "T", "塔吊" ])
			});
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "升降机",
				handler : this.addContractArrange.createDelegate(this, [ "S", "升降机" ])
			});
		}
		if (isGranted("_ContractArrangeDerivedEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editContractArrange.createDelegate(this)
			});
		}
		if (isGranted("_ContractArrangeDerivedMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delContractArrange.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的数据！";
		var msg2 = "您确认要【" + op + "】所选的数据吗？";
		var msg3 = "成功【" + op + "】所选的数据！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadContractArrange : function(a) {
		new ContractArrangeDerivedForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addContractArrange : function(a, b) {
		new ContractArrangeDerivedForm({
			equipCategory : a,
			equipCategoryName : b
		}, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editContractArrange : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new ContractArrangeDerivedForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delContractArrange : function() {
		this.speciallyGridAction(this.dataGridPanel, "arrangeId", __ctxPath + "/dispatch/multiDelContractArrange.do", "删除");
	}
});