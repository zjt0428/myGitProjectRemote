var LeasePriceSettingGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		dataIndex : "specificationsId"
	}, {
		hidden : true,
		dataIndex : "commodityId"
	}, {
		header : "周材名称",
		dataIndex : "commodity"
	}, {
		header : "规格型号",
		dataIndex : "specifications"
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "日租金",
		dataIndex : "dailyRent",
		editor : new Ext.form.NumberField({
			allowDecimals: true,
			decimalPrecision: 3,
			allowNegative: false,
			allowBlank : false
		})
	}, {
		header : "丢失单价",
		dataIndex : "compensationCosts",
		editor : new Ext.form.NumberField({
			allowDecimals: true,
			decimalPrecision: 3,
			allowNegative: false,
			allowBlank : false
		})
	}]
	
	LeasePriceSettingGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		title : "价格设定",
		option : "价格设定",
		tbarItems : this.tbarItems,
		fields : LeasePriceSettingListViewField,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelPriceLeaseContract.do"
	}, this.grid_config || {}));
}
Ext.extend(LeasePriceSettingGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function (data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.specificationsId) {
				return;
			}
		}
		//this.addHeight(recordHeight);
		var SubModuleType = this.getStore().recordType;
		var subRecord = new SubModuleType();
		Ext.apply(subRecord.data, {
			specificationsId : data.specificationsId,
			commodityId : data.materialsCommodity.commodityId,
			commodity : data.materialsCommodity.commodity,
			specifications : data.specifications,
			measurementUnit : data.materialsCommodity.rentUnit,
			dailyRent : data.dailyRent,
			compensationCosts : data.materialsCommodity.compensationCosts
		});
		this.stopEditing();
		this.getStore().add(subRecord);
		this.startEditing(0, 0)
	}
})