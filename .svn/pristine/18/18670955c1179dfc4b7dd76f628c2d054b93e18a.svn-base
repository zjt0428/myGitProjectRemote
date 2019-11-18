var LeaseScrapCompensationGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		dataIndex : "scrapId"
	}, {
		hidden : true,
		dataIndex : "commodityId"
	}, {
		header : "周材名称",
		dataIndex : "commodity"
	}, {
		header : "报废类型",
		dataIndex : "scrapType"
	}, {
		header : "报废单价",
		dataIndex : "scrapUnitPrice",
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
	
	LeaseScrapCompensationGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		title : "报废赔偿",
		option : "报废赔偿",
		tbarItems : this.tbarItems,
		fields : LeaseScrapCompensationListViewField,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelCompensationLeaseContract.do"
	}, this.grid_config || {}));
}
Ext.extend(LeaseScrapCompensationGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function (data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.scrapId == data.scrapId) {
				return;
			}
		}
		//this.addHeight(recordHeight);
		var SubModuleType = this.getStore().recordType;
		var subRecord = new SubModuleType();
		Ext.apply(subRecord.data, {
			scrapId : data.scrapId,
			commodityId : data.materialsCommodity.commodityId,
			commodity : data.materialsCommodity.commodity,
			scrapType : data.scrapType,
			scrapUnitPrice : data.scrapUnitPrice,
			measurementUnit : data.measurementUnit
		});
		this.stopEditing();
		this.getStore().add(subRecord);
		this.startEditing(0, 0)
	}
})