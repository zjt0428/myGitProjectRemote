var CostHandleGrid = function(a,b) {
	Ext.apply(this, a||{});
	Ext.apply(this, b||{});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var columns = [ {
		header : "品名",
		dataIndex : "commodity"
	},{
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "收费单价",
		dataIndex : "chargeUnitPrice",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 999999
		})
	},{
		header : "收费类型",
		dataIndex : "feesTypeName"
	},{
		header : "收费类别",
		dataIndex : "feeCategory"
	},{
		header : "换算数值",
		dataIndex : "theoriesValueConversion"
	},{
		header : "换算单位",
		dataIndex : "auxiliaryUnit"
	} ];
	CostHandleGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		title : "费用单价设定",
		option : "费用单价设定",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : CostHandleListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelCostHandleContractMaterials.do",
	}, this.grid_config || {}));
};
Ext.extend(CostHandleGrid, Knight.ux.SubModuleBaseGrid, {	
	createSubModule : function() {
		return {
			quantity : 0
		};
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.feeId == data.feeId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			commodityId : data.materialsCommodity.commodityId,
			measurementUnit : data.measurementUnit,
			commodity : data.materialsCommodity.commodity,
			feeId : data.feeId,
			feesType : data.feesType,
			feesTypeName : data.feesTypeName,
			auxiliaryUnit : data.unitConversion,
			chargeUnitPrice : data.chargeUnitPrice,
			theoriesValueConversion : data.theoriesValueConversion,
			feeCategory : data.feeCategory
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new MaterialsCommoditySelector({
			callback : function(d) {
				for(var i=0;i<d.length;i++){
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});
