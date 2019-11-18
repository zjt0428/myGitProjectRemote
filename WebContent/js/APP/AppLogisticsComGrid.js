var AppLogisticsComGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
			header : "配件名称",
			dataIndex : "tAppComponDispatchDetail.compName"
		},{
			header : "规格型号",
			dataIndex : "tAppComponDispatchDetail.dimensions"
		},{
			header : "备案编号",
			dataIndex : "tAppComponDispatchDetail.recordId",
		},{
			header : "物流数量",
			dataIndex : "logiNum"
		},{
			header : "签收数量",
			dataIndex : "receNum"
		}];
	if (this.saveable) {
		if (!this.tbarItems) {
			this.tbarItems = [];
		}
		/*this.tbarItems.push({
			iconCls : "btn-approvalTask",
			text : "删除",
			handler : this.delSubModule.createDelegate(this)
		});*/
	}
	AppLogisticsComGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : AppLogisticsComListViewField,
		title : "配件明细",
		option : "配件明细",
		tbarItems : this.tbarItems,
		height : 300,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(AppLogisticsComGrid, Knight.ux.SubModuleBaseGrid, {
	delSubModule : function(data, grid, action, rowIndex) {
		var m = this.getSelectionModel().getSelections();
		for ( var i = 0; i < m.length; i++) {
			this.stopEditing();
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});