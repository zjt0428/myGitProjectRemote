var ProductMakeGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "助记码",
		dataIndex : "mnemonics"
	},{
		hidden : true,
		header : "品名id",
		dataIndex : "commodityId"
	},{
		header : "品名",
		dataIndex : "commodity"
	},{
		hidden : true,
		header : "规格id",
		dataIndex : "specificationsId"
	},{
		header : "规格",
		dataIndex : "specifications"
	},{
		header : "计量单位",
		dataIndex : "measurementUnit"
	},{
		header : "制作数量",
		dataIndex : "makeQuanity",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 99999
		})
	},{
		header : "辅助单位",
		dataIndex : "secondUnitConversion"
	},{
		hidden : true,
		header : "换算数量",
		dataIndex : "auxiliaryQuantity"
	},{
		header : "辅助数量",
		dataIndex : "auxiliaryNum",
		renderer : function(value, metadata, record) {
			value =Number(record.get("makeQuanity"))*Number(record.get("auxiliaryQuantity"));
			if(Ext.isEmpty(value)){
				record.data.auxiliaryNum = 0;
				return value = 0;
			}
			record.data.auxiliaryNum = value.toFixed(2);
			return value.toFixed(2);
		}
	} ];
	ProductMakeGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "制作申请明细",
		option : "制作申请明细",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : ProductMakeListViewField,
		columns : columns,
		delurl : __ctxPath + "/daily/multiDelProductMakeApplyMake.do"
	}, this.grid_config || {}));
};
Ext.extend(ProductMakeGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			quantity : 0
		};
	},	
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.specificationsId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			commodityId : data.materialsCommodity.commodityId,
			mnemonics : data.mnemonics,
			commodity : data.materialsCommodity.commodity,
			specifications : data.specifications,
			specificationsId : data.specificationsId,
			measurementUnit : data.firstUnitConversion,
			secondUnitConversion : data.secondUnitConversion,
			auxiliaryQuantity : data.secondConvertedQuantity,
			makeQuanity : 0
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new MaterialsInfoSelector({
			collectEnable : true,
			callback : function(d) {
				for(var i=0;i<d.length;i++){
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});