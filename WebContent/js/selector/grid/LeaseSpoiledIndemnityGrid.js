var LeaseSpoiledIndemnityGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		dataIndex : "damageId"
	}, {
		hidden : true,
		dataIndex : "commodityId"
	}, {
		header : "周材名称",
		dataIndex : "commodity"
	}, {
		header : "损坏类型",
		dataIndex : "damageType"
	}, {
		header : "损坏单价",
		dataIndex : "damageUnitPrice",
		editor : new Ext.form.NumberField({
			allowDecimals: true,
			decimalPrecision: 3,
			allowNegative: false,
			allowBlank : false
		})
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit"
	}]
	
	LeaseSpoiledIndemnityGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		title : "损坏赔偿",
		option : "损坏赔偿",
		tbarItems : this.tbarItems,
		fields : LeaseSpoiledIndemnityListViewField,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelSpoiledLeaseContract.do"
	}, this.grid_config || {}));
}
Ext.extend(LeaseSpoiledIndemnityGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function (data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.damageId == data.damageId) {
				return;
			}
		}
		//this.addHeight(recordHeight);
		var SubModuleType = this.getStore().recordType;
		var subRecord = new SubModuleType();
		Ext.apply(subRecord.data, {
			damageId : data.damageId,
			commodityId : data.materialsCommodity.commodityId,
			commodity : data.materialsCommodity.commodity,
			damageType : data.damageType,
			measurementUnit : data.measurementUnit,
			damageUnitPrice : data.damageUnitPrice
		})
		this.stopEditing();
		this.getStore().add(subRecord);
		this.startEditing(0, 0)
	}
})