var InventoryListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "盘点编号",
			name : "Q_inventorySerial_S_LK"
		}, {
			lable : "盘点主题",
			name : "Q_inventoryTheme_S_LK"
		}, {
			lable : "盘点时间",
			editable : false,
			xtype : "datetimefield",
			format : "Y-m-d H:i:s",
			name : "Q_startTime_D_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datetimefield",
			format : "Y-m-d H:i:s",
			name : "Q_startTime_D_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadInventory
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
			sortField : "inventoryId",
			sortDir : "desc",
			id : "inventoryId",
			fields : [ "inventoryId", "inventorySerial", "inventoryTheme", "repertoryCategoryName", "startTime", "endTime", "userName", "providedDate", "department" ]
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 80,
			header : "盘点编号",
			dataIndex : "inventorySerial"
		}, {
			width : 80,
			header : "盘点主题",
			dataIndex : "inventoryTheme"
		}, {
			width : 80,
			header : "设备类别",
			dataIndex : "repertoryCategoryName"
		}, {
			width : 80,
			header : "期初时间",
			dataIndex : "startTime"
		}, {
			width : 80,
			header : "期末时间",
			dataIndex : "endTime"
		}, {
			width : 80,
			header : "盘点人员",
			dataIndex : "userName"
		}, {
			width : 80,
			header : "盘点时间",
			dataIndex : "providedDate"
		}, {
			width : 80,
			header : "盘点部门",
			dataIndex : "department",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.depName;
				}
			}
		} ]
	};
	InventoryListView.superclass.constructor.call(this, Ext.apply({
		id : "InventoryListView",
		title : TabTitle.INVENTORY_LIST,
		iconCls : "menu-business-inventory",
		url : __ctxPath + "/form/listInventory.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(InventoryListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_InventoryAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addInventory.createDelegate(this)
			});
		}
		if (isGranted("_InventoryEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editInventory.createDelegate(this)
			});
		}
		if (isGranted("_InventoryMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delInventory.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的盘点信息！";
		var msg2 = "您确认要【" + op + "】所选的盘点信息吗？";
		var msg3 = "成功【" + op + "】所选的盘点信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadInventory : function(a) {
		new InventoryForm(a).show();
	},
	addInventory : function() {
		new InventoryForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editInventory : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new InventoryForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delInventory : function() {
		this.speciallyGridAction(this.dataGridPanel, "inventoryId", __ctxPath + "/form/multiDelInventory.do", "删除");
	}
});