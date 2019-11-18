var EquipWarehouseAbnormalListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "备案编号",
			name : "Q_recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadEquipWarehouseAbnormal
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
			fields : EquipWarehouseAbnormalListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "项目所属地",
			dataIndex : "address"
		}, {
			header : "负责人",
			dataIndex : "principal"
		}, {
			header : "备案编号",
			dataIndex : "recordId"
		}, {
			header : "出厂编号",
			dataIndex : "exwSerial"
		}, {
			header : "设备名称",
			dataIndex : "equipGenericName"
		}, {
			header : "规格型号",
			dataIndex : "equipSpecificName"
		} ]
	};
	EquipWarehouseAbnormalListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipWarehouseAbnormalListView",
		title : TabTitle.EQUIP_WAREHOUSE_ABNORMAL_LIST,
		iconCls : "menu-business-employ",
		url : __ctxPath + "/equip/listEquipWarehouseAbnormal.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipWarehouseAbnormalListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		return tbarItems;
	},
	loadEquipWarehouseAbnormal : function(a) {
		new EquipWarehouseAbnormalForm(a).show();
	}
});