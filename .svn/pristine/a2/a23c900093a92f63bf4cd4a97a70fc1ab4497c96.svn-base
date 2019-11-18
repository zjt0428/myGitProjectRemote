var AfterMaterialsRepairGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var tbarItems = [];
	if (this.saveable) {
		tbarItems.push({
			iconCls : "btn-search",
			text : "加载",
			handler : this.loadDetail.createDelegate(this)
		});
	}
	var columns = [ {
		header : "助记码",
		dataIndex : "mnemonicCode"
	},{
		header : "品名",
		dataIndex : "commodity"
	},{
		header : "规格",
		dataIndex : "specifications"
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "辅助单位",
		dataIndex : "secondUnitConversion"
	},{
		hidden:true,
		header : "换算系数",
		dataIndex : "conversionNum"
	},{
		hidden:true,
		dataIndex : "specificationsId"
	},{
		hidden:true,
		dataIndex : "commodityId"
	}, {
		hidden:true,
		dataIndex : "locationId"
	}, {
		header : "库存数量",
		dataIndex : "storeNum"
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : true
		})
	},{
		header : "辅助数量",
		dataIndex : "auxiliaryNum",
		renderer : function(value,meta,record){
			if(!Ext.isEmpty(record.data.quantity)){
				return record.data.auxiliaryNum = (Number(record.data.quantity)*Number(record.data.conversionNum)).toFixed(2);
			}
			return value;
		}
	},{
		header : "入库库位",
		dataIndex : "enterLocation",
		editor : new Ext.ux.form.SimpleCombo({
			allowBlank : true,
			codeData : this.beforeResultData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? null : value;
			var store = this.getEditor().store;
			if (!Ext.isEmpty(store.data)) {
				var index = store.find("code", value);
				if (index != -1) {
					record.data.locationId = value;
					value = store.getAt(index).data.name;
				}
				record.data.enterLocation = value;
			} else {
				return record.data.locationId;
			}
			return value;
		}
	} ];
	AfterMaterialsRepairGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "维修后周材明细",
		option : "业务设备",
		tbarItems : tbarItems,
		height : this.height,
		fields : AfterMaterialsRepairListViewField,
		columns : columns,
		delurl : __ctxPath + "/daily/multiDelAfterMaterialsRepair.do"
	}, this.grid_config || {}));
};
Ext.extend(AfterMaterialsRepairGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			quantity : 0
		};
	},	
	loadDetail : function(){
		var detailData =  this.beforeMaterialsRepairGrid.getDetailData();
		for(var j=0;j<detailData.length;j++){
			this.addSubModuleDate2(detailData[j]);
		}
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.materialsSpecifications.specificationsId &&
					this.getStore().getAt(i).data.locationId == data.baseLocation.locationId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			mnemonicCode : data.materialsSpecifications.mnemonics,
			commodity : data.materialsSpecifications.materialsCommodity.commodity,
			commodityId : data.materialsSpecifications.materialsCommodity.commodityId,
			specifications : data.materialsSpecifications.specifications,
			measurementUnit : data.materialsSpecifications.firstUnitConversion,
			specificationsId : data.materialsSpecifications.specificationsId,
			secondUnitConversion : data.materialsSpecifications.secondUnitConversion,
			conversionNum : data.materialsSpecifications.secondConvertedQuantity,
			storeNum : data.quantity,
			enterLocation : data.baseLocation.locationName,
			locationId : data.baseLocation.locationId
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	},
	addSubModuleDate2 : function(data) {
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			mnemonicCode : data.mnemonicCode,
			commodity : data.commodity,
			commodityId : data.commodityId,
			specifications : data.specifications,
			measurementUnit : data.measurementUnit,
			specificationsId : data.specificationsId,
			secondUnitConversion : data.secondUnitConversion,
			conversionNum : data.conversionNum,
			storeNum : data.storeNum,
			quantity : data.quantity
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new MaterialsStoreSelector({
			collectEnable : true,
			params : {
				"Q_baseDepot.depotId_L_EQ" : this.storeId
			},
			callback : function(d) {
				for(var i=0;i<d.length;i++){
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});