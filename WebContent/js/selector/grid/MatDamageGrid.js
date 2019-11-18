var MatDamageGrid = function(a,b) {
	Ext.apply(this, a||{});
	Ext.apply(this, b||{});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var columns = [ {
		header : "品名",
		dataIndex : "commodity"
	},{
		header : "损坏类型",
		dataIndex : "damageType"
	}, {
		header : "损坏单价",
		dataIndex : "damageUnitPrice",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 999999
		})
	},{
		header : "计量单位",
		dataIndex : "measurementUnit"
	} ];
	MatDamageGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		title : "损坏赔偿设定",
		option : "损坏赔偿设定",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : MatDamageListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelMatDamageContractMaterials.do",
	}, this.grid_config || {}));
};
Ext.extend(MatDamageGrid, Knight.ux.SubModuleBaseGrid, {	
	createSubModule : function() {
		return {
			quantity : 0
		};
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.damageId == data.damageId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			damageId : data.damageId,
			commodityId : data.materialsCommodity.commodityId,
			commodity : data.materialsCommodity.commodity,
			measurementUnit : data.measurementUnit,//计量单位==租金核算单位
			damageType : data.damageType,
			damageUnitPrice : data.damageUnitPrice
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	}
});
