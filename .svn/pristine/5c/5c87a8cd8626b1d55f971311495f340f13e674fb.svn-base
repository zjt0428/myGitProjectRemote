var BeforeMaterialsRepairGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
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
		}),
		renderer : function(value,meta,record) {
			if(Number(value) > Number(record.data.storeNum)&&record.data.storeNum!="") {
				Ext.MessageBox.alert('提示','维修数量不能大于库存数量！');
				return record.data.quantity = record.data.storeNum;
			}
			return value;
		}
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
		header : "出库库位",
		dataIndex : "storageLocation"
//		editor : new Ext.ux.form.SimpleCombo({
//			allowBlank : true,
//			codeData : this.beforeResultData
//		}),
//		renderer : function(value, metadata, record){
//			value = Ext.isEmpty(value) ?  this.getEditor().value : value;
//			var store = this.getEditor().store;
//			if (!Ext.isEmpty(store.data)) {
//				var index = store.find("code", value);
//				if (index != -1) {
//					record.data.locationId = value;
//					value = store.getAt(index).data.name;
//				}
//				record.data.storageLocation = value;
//			} else {
//				return record.data.locationId;
//			}
//			if(this.storeId!=null && record.data.locationId!=null && record.data.specificationsId!=null) {
//				installFeeData = $ajaxSyncCall(__ctxPath + "/equip/listInstallPriceSet.do",{
//					"Q_contractId_L_EQ":contractId,
//					"Q_equipSpecificName_S_EQ" :equipSpecificName,
//					"Q_belongToAreaName_S_EQ":belongToArea,
//					"Q_installDismantleTypeName_S_EQ":value
//				});
//			}
//			return value;
//		}
	} ];
	BeforeMaterialsRepairGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "维修前周材明细",
		option : "业务设备",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : BeforeMaterialsRepairListViewField,
		columns : columns,
		delurl : __ctxPath + "/daily/multiDelBeforeMaterialsRepair.do"
	}, this.grid_config || {}));
};
Ext.extend(BeforeMaterialsRepairGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			quantity : 0
		};
	},	
	getDetailData : function(){
		var detailData = [];
		for(var i=0;i<this.getStore().getCount();i++){
			detailData[i] = this.getStore().getAt(i).data;
		}
		return detailData;
	},
	addSubModuleDate : function(data) {
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
			storageLocation : data.baseLocation.locationName,
			locationId : data.baseLocation.locationId
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	},
//	addSubModule : function() {
//		new MaterialsInfoSelector({
//			collectEnable : true,
//			callback : function(d) {
//				for(var i=0;i<d.length;i++){
//					var data = d[i].data;
//					this.addSubModuleDate(data);
//				}
//			}.createDelegate(this)
//		}).show();
//	}
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