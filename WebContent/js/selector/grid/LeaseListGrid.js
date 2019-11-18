var LeaseListGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [ {
		hidden : true,
		dataIndex : "specificationsId"
	}, {
		hidden : true,
		dataIndex : "commodityId"
	}, {
		header : "周材名称",
		dataIndex : "commodity"
	}, {
		header : "周材编号",
		dataIndex : "mnemonics"
	}, {
		header : "规格型号",
		dataIndex : "specifications"
	},{
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			allowNegative: false,
			allowDecimals: false
		})
	}, {
		header : "含税单价",
		dataIndex : "taxUnitPrice"
	}, {
		header : "预计金额",
		dataIndex : "estimatedAmount",
		renderer : function(value, record, data) {
			var quantity = data.get("quantity");
			var taxUnitPrice = data.get("taxUnitPrice");
			var amount = Number(quantity) * Number(taxUnitPrice);
			return amount;
		}
	}]
	
	LeaseListGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "申请清单",
		option : "租借申请",
		fields : LeaseListListViewField,
		tbarItems : this.tbarItems,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelLeaseLeaseApplication.do"
	}, this.grid_config || {}));
}
Ext.extend(LeaseListGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.specificationsId) {
				return;
			}
		}
		this.addRecordHeight(recordHeight);
		var SubModuleType = this.getStore().recordType;
		var subRecord = new SubModuleType();
		Ext.apply(subRecord.data, {
			specificationsId : data.specificationsId,
			commodityId : data.materialsCommodity.commodityId,
			commodity : data.materialsCommodity.commodity,
			mnemonics : (typeof(data.mnemonics) == undefined) ? "" : data.mnemonics,
			specifications : data.specifications,
			measurementUnit : data.firstUnitConversion,
			taxUnitPrice : data.materialsCommodity.dailyRent,
			quantity : 0,
			estimatedAmount : 0
		});
		this.stopEditing();
		this.getStore().add(subRecord);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new MaterialsInfoSelector({
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