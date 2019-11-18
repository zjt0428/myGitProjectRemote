var OtherFeeDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var width = width;
	var columns = [ {
		width : width,
		header : "收费时间",
		dataIndex : "chargeableTime"
	}, {
		width : width,
		header : "收费类型",
		dataIndex : "feesTypeName"
	}, {
		width : width,
		header : "结算关系",
		dataIndex : "calculationMethodName"
	}, {
		width : width,
		header : "收费金额",
		dataIndex : "fee"
	}];
	OtherFeeDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : false,
		fields : OtherFeeDetailViewField,
		height : this.height,
		loadurl : this.loadUrl,
		base_params : this.params,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(OtherFeeDetailGrid, Knight.ux.SubModuleBaseGrid, {
	
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