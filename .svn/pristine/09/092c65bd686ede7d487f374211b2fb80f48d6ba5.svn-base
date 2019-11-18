var InventoryCategoryGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		width : 100,
		header : "盘点类别",
		dataIndex : "repertoryCategoryName"
	}, {
		width : 100,
		header : "账面数量",
		dataIndex : "bookQuantity"
	}, {
		width : 100,
		header : "盘点数量",
		dataIndex : "inventoryQuantity"
	}, {
		width : 100,
		header : "报废数",
		dataIndex : "scrapQuantity"
	}, {
		width : 100,
		header : "借用数",
		dataIndex : "borrowQuantity"
	}, {
		width : 100,
		header : "领用数",
		dataIndex : "pickupQuantity"
	}, {
		width : 100,
		header : "遗失数",
		dataIndex : "missQuantity"
	} ];
	var fields = [ "invCategoryId", "inventoryId", "repertoryCategory", "repertoryCategoryName", "bookQuantity", "inventoryQuantity", "scrapQuantity", "borrowQuantity", "pickupQuantity", "missQuantity" ];
	InventoryCategoryGrid.superclass.constructor.call(this, Ext.apply({
		selectable : this.selectable,
		fields : fields,
		title : "盘点明细",
		option : "明细",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/form/multiDelCategoryInventory.do"
	}, this.grid_config || {}));
};
Ext.extend(InventoryCategoryGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModule : function(data) {
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			repertoryCategory : data.repertoryCategory,
			repertoryCategoryName : data.repertoryCategoryName,
			bookQuantity : Ext.isEmpty(data.bookQuantity) ? 0 : data.bookQuantity,
			inventoryQuantity : Ext.isEmpty(data.inventoryQuantity) ? 0 : data.inventoryQuantity,
			scrapQuantity : Ext.isEmpty(data.scrapQuantity) ? 0 : data.scrapQuantity,
			borrowQuantity : Ext.isEmpty(data.borrowQuantity) ? 0 : data.borrowQuantity,
			pickupQuantity : Ext.isEmpty(data.pickupQuantity) ? 0 : data.pickupQuantity,
			missQuantity : Ext.isEmpty(data.missQuantity) ? 0 : data.missQuantity
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	}
});