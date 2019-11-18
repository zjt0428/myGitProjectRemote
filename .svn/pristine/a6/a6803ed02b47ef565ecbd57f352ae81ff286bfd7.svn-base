var InstallFeeDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var width = width;
	var columns = [ {
		width : width,
		header : "发生时间",
		dataIndex : "startTime"
	}, {
		width : width,
		header : "设备自编号",
		dataIndex : "equipmentNo"
	}, {
		width : width,
		header : "设备型号",
		dataIndex : "equipSpecificName"
	}, {
		width : width,
		header : "收费类型",
		dataIndex : "feesTypeName"
	}, {
		width : width,
		header : "计量单位",
		dataIndex : "unit"
	}, {   
		width : width,
		header : "数量",
		dataIndex : "number"
	}, {
		width : width,
		header : "项目单价",
		dataIndex : "projectPrice"
	}, {
		width : width,
		header : "费用小计",
		dataIndex : "chargesSubtotal"
	}];
	InstallFeeDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : false,
		fields : InstallFeeDetailViewField,
		height : this.height,
		loadurl : this.loadUrl,
		base_params : this.params,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(InstallFeeDetailGrid, Knight.ux.SubModuleBaseGrid, {
	
	addSubModuleDate : function(data) {
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			item : data.item,
			amount : data.amount
			
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	}
	
});