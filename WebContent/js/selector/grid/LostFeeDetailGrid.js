var LostFeeDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var width = width;
	var columns = [ {
		width : width,
		header : "丢失日期",
		dataIndex : "lostDate"
	}, {
		width : width,
		header : "配件名称",
		dataIndex : "commodity"
	}, {
		width : width,
		header : "设备型号",
		dataIndex : "componSpecific"
	}, {
		width : width,
		header : "丢失数量",
		dataIndex : "lostCounts"
	}, {
		width : width,
		header : "丢失单价",
		dataIndex : "lostCosts"
	}, {     
		width : width,
		header : "损坏数量",
		dataIndex : "damageCounts"
	},  {
		width : width,
		header : "损坏单价",
		dataIndex : "damageCosts"
	},  {
		width : width,
		header : "金额小计",
		dataIndex : "totals"
	},  {
		width : width,
		header : "丢损描述",
		dataIndex : "describe"
	}];
	LostFeeDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : false,
		fields : LostFeeDetailViewField,
		height : this.height,
		loadurl : this.loadUrl,
		base_params : this.params,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(LostFeeDetailGrid, Knight.ux.SubModuleBaseGrid, {
	
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