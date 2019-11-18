var CompensationScrapGrid = function(a,b) {
	Ext.apply(this, a||{});
	Ext.apply(this, b||{});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var columns = [ {
		header : "品名",
		dataIndex : "commodity"
	},{
		header : "报废类型",
		dataIndex : "scrapType"
	}, {
		header : "报废单价",
		dataIndex : "scrapUnitPrice",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 999999
		})
	},{
		header : "计量单位",
		dataIndex : "measurementUnit"
	}];
	CompensationScrapGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		title : "报废赔偿设定",
		option : "报废赔偿设定",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : CompensationScrapListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelScrapContractMaterials.do",
	}, this.grid_config || {}));
};
Ext.extend(CompensationScrapGrid, Knight.ux.SubModuleBaseGrid, {	
	createSubModule : function() {
		return {
			quantity : 0
		};
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.scrapId == data.scrapId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			scrapId : data.scrapId,
			commodityId : data.materialsCommodity.commodityId,
			measurementUnit : data.measurementUnit,
			commodity : data.materialsCommodity.commodity,
			measurementUnit : data.measurementUnit,
			scrapUnitPrice : data.scrapUnitPrice,
			scrapType : data.scrapType
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	}
});
