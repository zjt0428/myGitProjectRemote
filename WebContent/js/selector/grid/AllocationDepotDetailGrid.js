var AllocationDepotDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
		header : "项目仓库库存Id",
		dataIndex : "storeId",
		hidden : true
	},{
		header : "助记码",
		dataIndex : "mnemonicCode"
	}, {
		header : "品名",
		dataIndex : "commodity"
	}, {
		hidden : true,
		header : "规格id",
		dataIndex : "specificationsId"
	}, {
		header : "规格",
		dataIndex : "specifications"
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		hidden :true,
		header : "调出库位Id",
		dataIndex : "outLocationId"
	}, {
		header : "调出库位",
		dataIndex : "outLocationName"
	}, {
		header : "调出库存",
		dataIndex : "quantity"
	}, {
		header : "调拨数量",
		dataIndex : "allocationCounts",
		editor : new Ext.form.NumberField({
			decimalPrecision : 2,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record){
			if(Ext.isEmpty(value)){
				value = 0;
				record.data.allocationCounts =value;
				return value;
			}
			if(Number(value)>Number(record.get("quantity"))){
				Ext.Msg.alert("提示","调拨数量不能大于库存数量");
				record.data.allocationCounts =record.get("quantity");
				return value=record.get("quantity");
			}
			return value;
		}
	}, {
		hidden :true,
		header : "调入库位Id",
		dataIndex : "inLocationId"
	}, {
		header : "调入库位",
		dataIndex : "inLocationName",
		editor : new Ext.ux.form.SimpleCombo({
			allowBlank : false,
			codeData : this.localtionData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			if (!Ext.isEmpty(store.data)) {
				
				var index = store.find("code", value);
				if (index != -1) {
					record.data.inLocationId = value;
					value = store.getAt(index).data.name;
				}
				record.data.inLocationName = value;
			} else {
				return record.data.locationId;
			}
			return value;
		}
	}, {
		header : "剩余数量",
		dataIndex : "surplusCounts",
		editor : new Ext.form.NumberField({
			decimalPrecision : 2,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			if(Number(record.get("allocationCounts"))==null){
				if(Ext.isEmpty(value)){
					value = 0;
					record.data.surplusCounts =value;
					return value;
				}				
			}else{
				value = (Number(record.get("quantity"))-Number(record.get("allocationCounts"))).toFixed(1);
				record.data.surplusCounts =value;
				return value;
			}
			return value;
		}
	}, {
		hidden : true,
		header : "换算数量",
		dataIndex : "secondConvertedQuantity"
	},{
		header : "辅助数量",
		dataIndex : "auxiliaryQuantity",
		renderer : function(value, metadata, record) {
			value =(Number(record.get("allocationCounts"))*Number(record.get("secondConvertedQuantity"))).toFixed(2);
			if(Ext.isEmpty(value)){
				return value = 0;
			}
			record.data.auxiliaryQuantity = value;
			return value;
		}
	} ];
	AllocationDepotDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : AllocationDepotDetailListViewField,
		title : "调拨清单",
		option : "调拨清单",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDetailAllocationDepot.do",
	}, this.grid_config || {}));
};
Ext.extend(AllocationDepotDetailGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		
	},
	change : function(c){
		Ext.getCmp('inDepotId').getValue();
		var localtionData = $ajaxSyncCall(__ctxPath + "/materials/arrayListBaseLocation.do",{
			"Q_baseLocationPermissionSet.userId_L_EQ" : curUserInfo.userId,
			"Q_baseDepot.depotId_L_EQ" : this.inDepotId
		});
	},
	addSubModule : function(data) {
		if(this.outDepotId==this.inDepotId){
			$toast("请先选择调出/调入仓库且不能相同！");
			return;
		}
		new MaterialsStoreSelector({
			params : {
				"Q_baseDepot.depotId_L_EQ":this.outDepotId
			},
			callback : function(d){
				for(var i=0;i<d.length;i++){
					var data = d[i].json;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.storeId == data.storeId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data,{
			mnemonicCode : data.materialsSpecifications.mnemonics,
			commodity : data.materialsSpecifications.materialsCommodity.commodity,
			commodityId : data.materialsSpecifications.materialsCommodity.commodityId,
			specifications : data.materialsSpecifications.specifications,
			specificationsId : data.materialsSpecifications.specificationsId,
			measurementUnit : data.materialsSpecifications.firstUnitConversion,
			secondConvertedQuantity : data.materialsSpecifications.secondConvertedQuantity,//换算数量
			quantity : data.quantity,
			outLocationId : data.baseLocation.locationId,
			outLocationName : data.baseLocation.locationName,
			storeId : data.storeId
		});
		this.stopEditing();
		this.getStore().add(recordType);
//		this.starting(0,0);
	}
});