var LeaseExpenseHandlingGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		dataIndex : "feeId"
	}, {
		hidden : true,
		dataIndex : "commodityId"
	}, {
		header : "周材名称",
		dataIndex : "commodity"
	}, {
		header : "收费类型",
		dataIndex : "feesType"
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "换算数值",
		dataIndex : "theoriesValueConversion"
	}, {
		header : "换算单位",
		dataIndex : "unitConversion"
	}, {
		header : "收费单价",
		dataIndex : "chargeUnitPrice",
		editor : new Ext.form.NumberField({
			allowDecimals: true,
			decimalPrecision: 3,
			allowNegative: false,
			allowBlank : false
		})
	}]	
	
	LeaseExpenseHandlingGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		title : "费用处理",
		option : "费用处理",
		tbarItems : this.tbarItems,
		fields : LeaseExpenseHandlingListViewField,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelExpenseLeaseContract.do"
	}, this.grid_config || {}));
}
Ext.extend(LeaseExpenseHandlingGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function (data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.feeId == data.feeId) {
				return;
			}
		}
		//this.addHeight(recordHeight);
		var SubModuleType = this.getStore().recordType;
		var subRecord = new SubModuleType();
		Ext.apply(subRecord.data, {
			feeId : data.feeId,
			commodityId : data.materialsCommodity.commodityId,
			commodity : data.materialsCommodity.commodity,
			feesType : data.feesTypeName,
			measurementUnit : data.measurementUnit,
			theoriesValueConversion : (typeof(data.theoriesValueConversion) == undefined) ? "" : data.theoriesValueConversion,
			unitConversion : data.unitConversion,
			chargeUnitPrice : data.chargeUnitPrice
		})
		this.stopEditing();
		this.getStore().add(subRecord);
		this.startEditing(0, 0)
	}
})