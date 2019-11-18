var LeaseMaterialsInventoryGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		dataIndex : "commodityId"
	}, {
		header : "周材名称",
		dataIndex : "commodity"
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "日租金",
		dataIndex : "dailyRent",
		allowBlank : false,
		editor : new Ext.form.NumberField({
			allowDecimals: true,
			decimalPrecision: 4,
			allowNegative: false,
			allowBlank : false
		})
	}, {
		header : "计划租借数量",
		dataIndex : "plannedLeaseQuantity",
		allowBlank : false,
		editor : new Ext.form.NumberField({
			allowDecimals: false,
			decimalPrecision: 0,
			allowNegative: false,
			allowBlank : false
		})
	}]
	
	LeaseMaterialsInventoryGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "租借清单",
		option : "租借清单",
		tbarItems : this.tbarItems,
		fields : LeaseMaterialsInventoryListViewField,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelInventoryLeaseContract.do"
	}, this.grid_config || {}));
}
Ext.extend(LeaseMaterialsInventoryGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		//判断是否重复添加并过滤
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.commodityId == data.commodityId) {
				return;
			}
		}
		this.addRecordHeight(recordHeight);
		var SubModuleType = this.getStore().recordType;
		var subRecord = new SubModuleType();
		var specificationsData = $ajaxSyncCall(__ctxPath + "/materials/listMaterialsSpecifications.do", {
			"S_[materialsCommodity.commodityId]_L_EQ" : data.commodityId
		});
		var resultDate = specificationsData.result[0];
		Ext.apply(subRecord.data, {
			commodityId : data.commodityId,
			commodity : data.commodity,
			measurementUnit : resultDate.firstUnitConversion,
			dailyRent : 0
		});
		this.stopEditing();
		this.getStore().add(subRecord);
		this.startEditing(0, 0);
	},
	
	addSubModule : function() {
		new MaterialsCommoditySelector({
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
})