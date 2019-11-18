var AppLogisticsEquipGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
			header : "设备名称",
			dataIndex : "tAppEquipDispatchDetail.equipName"
		},{
			header : "规格型号",
			dataIndex : "tAppEquipDispatchDetail.equipSpec"
		},{
			header : "备案编号",
			dataIndex : "tAppEquipDispatchDetail.recordId",
		},{
			header : "物流数量",
			dataIndex : "logiNum"
		}, {
            header: "签收数量",
            dataIndex: "receNum"
        }];
	if (this.saveable) {
		if (!this.tbarItems) {
			this.tbarItems = [];
		}
	}
	AppLogisticsEquipGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : AppLogisticsEquipListViewField,
		title : "设备明细",
		option : "设备明细",
		tbarItems : this.tbarItems,
		height : 300,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(AppLogisticsEquipGrid, Knight.ux.SubModuleBaseGrid, {
	delSubModule : function(data, grid, action, rowIndex) {
		var m = this.getSelectionModel().getSelections();
		for ( var i = 0; i < m.length; i++) {
			this.stopEditing();
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});