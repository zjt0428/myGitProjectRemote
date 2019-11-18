var EquipWarehouseAbnormalComponGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "零配件名称",
		dataIndex : "componGenericName"
	}, {
		header : "设备型号",
		dataIndex : "componSpecificName"
	}, {
		header : "配件规格",
		dataIndex : "dimensions"
	}, {
		header : "计量单位",
		dataIndex : "calculate"
	}, {
		header : "调度数量",
		dataIndex : "dispatchCounts"
	}, {
		header : "待入库数量",
		dataIndex : "warehouseWaitCounts"
	}, {
		header : "入库数量",
		dataIndex : "warehouseCounts"
	}, {
		header : "验收结果",
		dataIndex : "warehouseResultName"
	}, {
		header : "入库状态",
		dataIndex : "statusName"
	} ];
	EquipWarehouseAbnormalComponGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : EquipWarehouseAbnormalComponListViewField,
		title : "入库异常配件",
		option : "入库配件",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(EquipWarehouseAbnormalComponGrid, Knight.ux.SubModuleBaseGrid, {});