var LeasedLostDetailGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		header : "detailId",
		dataIndex : "detailId"
	}, {
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
		header : "品名",
		dataIndex : "commodity"
	}, {
		header : "规格",
		dataIndex : "specifications"
	}, {
		header : "计量单位",
		dataIndex : "unit"
	}, {
		header : "数量",
		dataIndex : "quantity"
	}, {
		header : "辅助单位",
		dataIndex : "supplementUnit"
	}, {
		header : "辅助数量",
		dataIndex : "supplementQuantity"
	},{
		header : "赔偿单价",
		dataIndex : "compensationUnit"
	},{
		header : "金额",
		dataIndex : "amount"
	}]
	
	LeasedLostDetailGrid.superclass.constructor.call(this, Ext.apply({
		title : "租借丢失赔偿",
		saveable : this.saveable,
		addForbidden : true,
		fields : SettleMaterialsDetailViewField,
//		loadurl : __ctxPath + "/materials/detailListLeasedLostCompensation.do",
		base_params : this.params,
		tbarItems : this.tbarItems,
		columns : columns
	}, this.grid_config || {}));
}
Ext.extend(LeasedLostDetailGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
//		for ( var i = 0; i < this.getStore().getCount(); i++) {
//			if (this.getStore().getAt(i).data.specificationsId == data.materialsSpecifications.specificationsId) {
//				return;
//			}
//		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			detailId : data.detailId,
			receiptDate : data.receiptDate,
			receiptType : data.receiptType,
			relateSerial : data.relateSerial,
			commodity :data.commodity,
			specifications : data.specifications,
			unit : data.unit,
			quantity : data.quantity,
			supplementUnit : data.supplementUnit,
			supplementQuantity : data.supplementQuantity,
			compensationUnit : data.compensationUnit,
			amount :data.amount
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	accumulationAmount : function () {
		var total = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			total += (this.getStore().getAt(i).data.amount) * 10e5;
		}
		return total / 10e5;
	}
})