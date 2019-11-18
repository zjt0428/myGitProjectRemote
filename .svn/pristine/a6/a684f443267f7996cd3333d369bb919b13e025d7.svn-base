var LeaseOtherBusinessDetailGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [ {
		xtype : "datecolumn",
		header : "单据日期",
		dataIndex : "receiptDate",
		format : "Y-m-d"
	}, {
		header : "单据类型",
		dataIndex : "receiptType"
	}, {
		header : "单据号码",
		dataIndex : "relateSerial"
	}, {
		header : "仓库",
		dataIndex : "depotName"
	}, {
		header : "收费类型",
		dataIndex : "feesType"
	}, {
		header : "结算关系",
		dataIndex : "calculationMethod"
	}, {
		header : "金额",
		dataIndex : "amount"
	}]
	
	LeaseOtherBusinessDetailGrid.superclass.constructor.call(this, Ext.apply({
		title : "租借其他业务清单",
		saveable : this.saveable,
		tbarItems : this.tbarItems,
		addForbidden : true,
		fields : LeaseOtherBusinessDetailViewField,
		loadurl : this.loadUrl,
		base_params : this.params,
		columns : columns
	}, this.grid_config || {}));
}
Ext.extend(LeaseOtherBusinessDetailGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			otherId : data.otherId,
			receiptDate : data.receiptDate,
			receiptType : data.receiptType,
			relateSerial : data.relateSerial,
			depotName : data.depotName,
			feesType : data.feesType,
			calculationMethod : data.calculationMethod,
			amount : data.amount
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	accumulationAmount : function () {
		var total = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if(this.getStore().getAt(i).data.calculationMethod=='相加'){
				total += (this.getStore().getAt(i).data.amount) * 10e5;
			}else if(this.getStore().getAt(i).data.calculationMethod=='相减') {
				total -= (this.getStore().getAt(i).data.amount) * 10e5;
			}
		}
		return total / 10e5;
	}
})