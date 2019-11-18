var FlowApproveGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
			header : "审批级别",
			dataIndex : "nodeid",
			renderer : function(f) {
				return '第'+f+'级';
			}
		},{
			header : "审批人",
			dataIndex : "chkUserName"
		},{
			header : "审批结果",
			dataIndex : "chkResult",
			renderer : function(f) {
				var g = "";
				if (f == "1") {
					g = '同意';
				} else {
					g = '不同意';
				}
				return g;
			}
		},{
			header : "审批意见",
			dataIndex : "chkOpinion"
		},{
			header : "审批时间",
			dataIndex : "chkDate"
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
	FlowApproveGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : TransProcessListViewField,
		title : "审批意见列表",
		option : "审批意见列表",
		tbarItems : this.tbarItems,
		height : 300,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(FlowApproveGrid, Knight.ux.SubModuleBaseGrid, {
	delSubModule : function(data, grid, action, rowIndex) {
		var m = this.getSelectionModel().getSelections();
		for ( var i = 0; i < m.length; i++) {
			this.stopEditing();
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});