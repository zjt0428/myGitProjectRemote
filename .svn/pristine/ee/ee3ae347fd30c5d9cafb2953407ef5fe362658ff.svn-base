var MaterialsDetailGrid = function(a) {
	Ext.apply(this, a);
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var columns = [ {
		header : "品名",
		dataIndex : "commodity"
	},{
		hidden : true,
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "计费单位",
		dataIndex : "caculateUnit"
	},{
		header : "计划出租量",
		dataIndex : "planLease",
		editor : new Ext.form.NumberField({
			allowDecimals: false,
			decimalPrecision: 0,
			allowNegative: false,
			allowBlank : true
		})
	},{
		header : "计划进场时间",
		dataIndex : "startDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.startDate = value;
			return value;
		}
	},{
		header : "计划退场时间",
		dataIndex : "exitDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.exitDate = value;
			return value;
		}
	}  ];
	MaterialsDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "周材明细",
		option : "周材明细",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : MaterialsDetailListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelMaterialsDetailContractMaterials.do",
	}, this.grid_config || {}));
};
Ext.extend(MaterialsDetailGrid, Knight.ux.SubModuleBaseGrid, {	
	createSubModule : function() {
		return {
			quantity : 0
		};
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.commodityId == data.commodityId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			madetailId : this.madetailId,
			commodityId : data.commodityId,
			measurementUnit : data.rentUnit,//计量单位==租金核算单位
			caculateUnit : data.compensationUnit,//计费单位==丢失赔偿单位
			commodity : data.commodity,
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
