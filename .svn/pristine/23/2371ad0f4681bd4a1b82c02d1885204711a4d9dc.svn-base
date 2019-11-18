var MaterialsStoreDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [{
		header : "仓库名称",
		dataIndex : "baseDepot",
		renderer : function (n) {
			return n.depotName;
		}
	},{
		header : "库位名称",
		dataIndex : "baseLocation",
		renderer : function (n) {
			return n.locationName;
		}
	}, {
		header : "数量",
		dataIndex : "quantity"
	}, {
		header : "辅助数量",
		dataIndex : "materialsSpecifications",
		renderer : function(n,m,record){
			n = (Number(n.secondConvertedQuantity)*Number(record.data.quantity)).toFixed(1);
			return n;
		}
	}];
	MaterialsStoreDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : false,
		selectable : this.selectable,
		fields : ["storeId","baseDepot","baseLocation","quantity","materialsSpecifications"],
		title : "库存明细",
		addForbidden : true,
		height : this.height,
		columns : columns,
		grid_view : {
			enableHdMenu : true
		}
	}, this.grid_config || {}));
};
Ext.extend(MaterialsStoreDetailGrid, Knight.ux.SubModuleBaseGrid, {
});