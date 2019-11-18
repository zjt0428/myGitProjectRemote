var StoreEquipStockListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_storeId_L_EQ = -1;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "备案编号",
			name : "Q_[equipment.recordId]_S_LK"
		} ];
	}
	var datagrid_config = {
		delayed_load : true,
		store : {
			fields : StoreEquipStockListViewField
		},
		columns : [ {
			header : "库存操作",
			dataIndex : "stockType",
			renderer : function(n) {
				return n == "0" ? "<font color='red'>出库</font>" : "入库";
			}
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.exwSerial;
			}
		}, {
			header : "设备类别",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipCategoryName;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipGenericName;
			}
		}, {
			header : "规格型号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSpecificName;
			}
		}, {
			header : "出入时间",
			dataIndex : "boundDate"
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				return n.projectName;
			}
		}, {
			header : "项目地点",
			dataIndex : "project",
			renderer : function(n) {
				return n.address;
			}
		} ]
	};
	StoreEquipStockListView.superclass.constructor.call(this, Ext.apply({
		id : "StoreEquipStockListView",
		title : "设备出入情况",
		url : __ctxPath + "/archive/listEquipStockStoreHouse.do",
		base_params : this.params,
		search_config : {
			collapsed : true,
			preLableHidden : true,
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(StoreEquipStockListView, Knight.ux.SearchGridPanel, {});