var SideReportingGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		header : "旁站内容",
		dataIndex : "reportingDetail",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "检查结果",
		dataIndex : "examineUpshot",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "存在问题",
		dataIndex : "existQuestion",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}]
	SideReportingGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "旁站记录关联",
		option : "旁站记录",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : SideReportingListViewField,
		columns : columns,
		//delurl : __ctxPath + ""
	}, this.grid_config || {}));
};
Ext.extend(SideReportingGrid, Knight.ux.SubModuleBaseGrid, {
	
});