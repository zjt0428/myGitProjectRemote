var MakeProductGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		dataIndex : "commodityId",
		renderer : function(value, metadata, record) {
			if(record.json.commodityId !=null){
				record.data.commodityId = record.json.commodityId;
				return record.data.commodityId;
			}
			return value;
		}
	}, {
		header : "周材名称",
		dataIndex : "commodity",
		renderer : function(value, metadata, record) {
			if(record.json.mnemonics !=null){
				record.data.commodity = record.json.commodity;
				return record.data.commodity;
			}
			return value;
		}
	}, {
		hidden : true,
		dataIndex : "specificationsId",
		renderer : function(value, metadata, record) {
			if(record.json.specificationsId !=null){
				record.data.specificationsId = record.json.specificationsId;
				return record.data.specificationsId;
			}
			return value;
		}
	}, {
		header : "周材规格",
		dataIndex : "specifications",
		renderer : function(value, metadata, record) {
			if(record.json.specifications !=null){
				record.data.specifications = record.json.specifications;
				return record.data.specifications;
			}
			return value;
		}
	}, {
		header : "助记码",
		dataIndex : "mnemonics",
		renderer : function(value, metadata, record) {
			if(record.json.mnemonics !=null){
				record.data.mnemonics = record.json.mnemonics;
				return record.data.mnemonics;
			}
			return value;
		}
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit",
		renderer : function(value, metadata, record) {
			if(record.json.mnemonics !=null){
				record.data.measurementUnit = record.json.measurementUnit;
				return record.data.measurementUnit;
			}
			return value;
		}
	}, {
		header : "制作数量 ",
		dataIndex : "makeQuantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			allowNegative: false,
			allowDecimals: false
		}),
		renderer : function(value, metadata, record) {
			if(Ext.isEmpty(value)){
				if(record.json.makeQuanity !=null){
					record.data.makeQuantity = record.json.makeQuanity;
					return record.data.makeQuantity;
				}
			}
			return value;
		}
	},{
		hidden : true,
		header : "换算数量",
		dataIndex : "auxiliaryQuantity",
		renderer : function(value, metadata, record) {
			if(record.json.secondConvertedQuantity !=null){
				record.data.auxiliaryQuantity = record.json.secondConvertedQuantity;
				return record.data.auxiliaryQuantity;
			}
			return value;
		}
	}, {
		header : "辅助数量",
		dataIndex : "convertedQuantity",
		renderer : function(value, metadata, record) {
			if(record.json.auxiliaryQuantity !=null || record.data.makeQuantity != null){
				var quantity = (Number(record.json.auxiliaryQuantity==null?record.data.auxiliaryQuantity:record.json.auxiliaryQuantity)
				*Number(record.data.makeQuantity)).toFixed(2);
				record.data.convertedQuantity = quantity;
				return record.data.convertedQuantity;
			}
			return value;
		}
	}, {
		hidden : true,
		header : "入库库位id",
		dataIndex : "enterLocationId"
	}, {
		header : "入库库位",
		dataIndex : "enterLocationName",
		editor : new Ext.ux.form.SimpleCombo({
			allowBlank : false,
			codeData : this.localtionData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? Number(this.getEditor().value)+2 : value;
			var store = this.getEditor().store;
			if (!Ext.isEmpty(store.data)) {
				
				var index = store.find("code", value);
				if (index != -1) {
					record.data.enterLocationId = value;
					value = store.getAt(index).data.name;
				}
				record.data.enterLocationName = value;
			}
			return value;
		}
	}]
	MakeProductGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		addForbidden : true,
		delForbidden : true,
		title : "制作产品清单",
		option : "制作产品清单",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : MakeProductListViewField,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelMakeHandleMake.do"
	}, this.grid_config || {}));
}
Ext.extend(MakeProductGrid, Knight.ux.SubModuleBaseGrid, {
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
			commodityId : data.materialsCommodity.commodityId,
			commodity : data.materialsCommodity.commodity,
			mnemonics : (typeof(data.mnemonics) == undefined) ? "" : data.mnemonics,
			specifications : data.specifications,
			specificationsId : data.specificationsId,
			measurementUnit : data.firstUnitConversion
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