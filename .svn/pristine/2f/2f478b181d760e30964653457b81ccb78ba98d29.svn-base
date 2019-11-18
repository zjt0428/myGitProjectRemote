var InspectSelfInitDetailGrid = function(a) {
	Ext.apply(this, a || {});
	this.remoteloadable = !Ext.isEmpty(this.initId);
	this.params = {};
	this.params["Q_inspectSelfInit.initId_L_EQ"] = this.initId;
	Ext.apply(this.params, (a && a.params) || {});
	// =======================================================================================================//
	var columns = [ {
		header : "标准内容",
		dataIndex : "detailContent",
		editor : new Ext.form.TextField({
			maxLength : 255
		})
	},{
		hidden : true,
		header : "检查项目分类",
		dataIndex : "inspectType"
//		value : this.inspectionType
	} ];
	InspectSelfInitDetailGrid.superclass.constructor.call(this, Ext.apply({
		title : "检查内容",
		object : "inspectSelfInitDetail",
		fields : InspectSelfInitDetailListViewField,
		saveable : this.saveable,
		height : this.height,
		base_params : this.params,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(InspectSelfInitDetailGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			initDetailId : this.initDetailId,
			initId : data.initId,
			inspectType : data.inspectType,			
			detailContent : data.detailContent
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this, record);
		}
	}
});