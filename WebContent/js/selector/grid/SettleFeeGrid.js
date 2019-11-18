var SettleFeeGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
		hidden:true,
		dataIndex : "settleFeeId"
	}, {
		width : 130,
		header : "费用项目",
		dataIndex : "item"
	}, {
		width : 200,
		header : "费用金额",
		dataIndex : "amount"
	} ];
	SettleFeeGrid.superclass.constructor.call(this, Ext.apply({
		saveable : false,
		id : "settleFeeId",
		fields : SettleFeeViewField,
		title : "费用清单",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(SettleFeeGrid, Knight.ux.SubModuleBaseGrid, {
	
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
	},
	detailFee : function(data){
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【查看】的记录！");
			return;
		}
		if (a.length >1 ) {
			$toast("请不要选择多条数据！");
			return;
		}
		if(a[0].data.amount==0){
			$toast("该项统计暂无数据！");
			return;
		}
		data.selection = a[0];
		//判断 周材结算 or 项目结算
		if(data.materials) {
			new SettleMaterialsFeeDetailForm(data, {
				backOff : data.backOff,
				saveable : true,
				callback : function() {
				}.createDelegate(this)
			}).show();
		} else {
			new SettleFeeDetailForm(data, {
				saveable : true,
				callback : function() {
				}.createDelegate(this)
			}).show();
		}
		
	}
	
});