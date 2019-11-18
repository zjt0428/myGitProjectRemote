var StoreComponStockListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "操作时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_boundDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_boundDate_S_LE"
		} ];
	}
	var datagrid_config = {
		delayed_load : true,
		store : {
			fields : StoreComponStockListViewField
		},
		columns : [ {
			header : "库存操作",
			dataIndex : "stockType",
			renderer : function(n) {
				return n == "0" ? "<font color='red'>出库</font>" : "入库";
			}
		}, {
			header : "配件名称",
			dataIndex : "component",
			renderer : function(n) {
				return n.componGenericName;
			}
		}, {
			header : "规格型号",
			dataIndex : "component",
			renderer : function(n) {
				return n.componSpecificName;
			}
		}, {
			header : "计量单位",
			dataIndex : "component",
			renderer : function(n) {
				return n.calculate;
			}
		}, {
			header : "数量",
			dataIndex : "counts"
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
	StoreComponStockListView.superclass.constructor.call(this, Ext.apply({
		id : "StoreComponStockListView",
		title : "配件出入情况",
		url : __ctxPath + "/archive/listComponStockStoreHouse.do",
		base_params : this.params,
		search_config : {
			collapsed : true,
			preLableHidden : true,
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(StoreComponStockListView, Knight.ux.SearchGridPanel, {});