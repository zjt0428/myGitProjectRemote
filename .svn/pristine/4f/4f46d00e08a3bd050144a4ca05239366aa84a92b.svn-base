var StoreDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [{
		header : "仓库名称",
		dataIndex : "storeName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	}, {
		header : "库存数量",
		dataIndex : "counts",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	}];
	StoreDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : StoreDetailGridListViewField,
		title : "库存明细",
//		option : "合同设备",
		tbarItems : this.tbarItems,
		addForbidden : true,
		height : this.height,
		columns : columns,
//		loadurl : __ctxPath + "/archive/countStoreStoreHouse.do",
		base_params : {
			componId : this.componId
		},
		grid_view : {
			enableHdMenu : true
		}
	}, this.grid_config || {}));
};
Ext.extend(StoreDetailGrid, Knight.ux.SubModuleBaseGrid, {
});