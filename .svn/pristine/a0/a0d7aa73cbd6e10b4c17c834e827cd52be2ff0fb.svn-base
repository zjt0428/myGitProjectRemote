var BaldetailGrid =  function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		header : "仓库库存表id",
		dataIndex : "materialsStoreId"
	},{
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
		header : "单位",
		dataIndex : "firstUnitConversion"
	}, {
		hidden :true,
		header : "库位Id",
		dataIndex : "locationId"
	}, {
		header : "库位名称",
		dataIndex : "locationName"
	},{
		header : "账面库存",
		dataIndex : "bookInventory"
	},{
		header : "实盘库存",
		dataIndex : "firmofferInventory",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 99999
		})
	},{
		header : "盈亏量",
		dataIndex : "amountProLoss",
		renderer : function(value, metadata, record) {
			value =Number(record.get("firmofferInventory"))-Number(record.get("bookInventory"));
			if(value<0){
				value = (-1)*value;
			}
			if(Ext.isEmpty(value)){
				value = 0;
			}
			record.data.amountProLoss = value;
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
			value =(Number(record.get("amountProLoss"))*Number(record.get("secondConvertedQuantity"))).toFixed(2);
			if(Ext.isEmpty(value)){
				value = 0;
			}
			record.data.auxiliaryQuantity = value;
			return value;
		}
	}];
	
	if (this.saveable) {
		if (!this.tbarItems) {
			this.tbarItems = [];
		}
	}
	BaldetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ["baldetailId","takeStockId","materialsStoreId","mnemonics","commodityId","commodity","specificationsId","specifications",
		          "firstUnitConversion","locationId","locationName","bookInventory","firmofferInventory","amountProLoss","secondConvertedQuantity"
		          ,"auxiliaryQuantity"],
		title : this.title,
		option : this.title,
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/takestock/multiDelDetailTakeStock.do",
	}, this.grid_config || {}));
};
Ext.extend(BaldetailGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModule : function() {
		var storeId = this.parentForm.getFieldValue("storeId");
		var locationId = this.parentForm.getFieldValue("locationId");
		var takeStockDate = this.parentForm.getFieldValue("takeStockDate");
		if(locationId == null||locationId == ""){
			$toast("请先选择仓库和库位");
			return;
		}
		/*new MaterialsStoreSelector({
			collectEnable : true,
			params : {
				"Q_baseDepot.depotId_L_EQ" : this.storeId==null?this.depotId:this.storeId,
				"Q_baseLocation.locationId_L_EQ" : this.locationId==null?this.locationIds:this.locationId
			},
			callback : function(d) {
				for(var i=0;i<d.length;i++){
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();*/
		new MaterialsStoreByDateSelector({
			collectEnable : true,
			params : {
				depotId :  storeId,
				locationId : locationId,
				selectedDate : takeStockDate
			},
			callback : function(d) {
				for(var i=0;i<d.length;i++){
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	},
	addSubModuleDate : function(data){
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.specificationsId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			commodityId : data.commodityId,
			materialsStoreId : data.storeId,
			commodity : data.commodity,
			mnemonics : data.mnemonics,
			specificationsId : data.specificationsId,
			specifications : data.specifications,
			firstUnitConversion : data.unit,//单位=计量单位
			bookInventory : data.quantity,
			firmofferInventory : 0,
			locationId : this.parentForm.getFieldValue("locationId"),
			locationName :this.parentForm.getFieldValue("locationName"),
			secondConvertedQuantity : data.conversionNum,//换算数量
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	}
});