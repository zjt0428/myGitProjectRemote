var DeductScaleGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.title = this.title ? this.title : "提成比例";
	var columns = [ {
		width : 100,
		sortable : true,
		header : "起始金额(含)",
		dataIndex : "scaleStart",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 10
		})
	}, {
		width : 100,
		sortable : true,
		header : "最高金额(含)",
		dataIndex : "scaleEnd",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 10
		})
	}, {
		width : 100,
		sortable : true,
		header : "提成比例(%)",
		dataIndex : "scalePercent",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 3
		})
	} ];
	var fields = [ "deductScaleId", "scaleStart", "scaleEnd", "scalePercent" ];
	DeductScaleGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : fields,
		title : this.title,
		option : "比例",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/fund/multiDelDeductScale.do"
	}, this.grid_config || {}));
};
Ext.extend(DeductScaleGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			scaleStart : 1,
			scaleEnd : 0,
			scalePercent : 0
		};
	}
});