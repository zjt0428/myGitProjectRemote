var ApplicationDetailGrid = function(a,b) {
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
		dataIndex : "unit"
	},{
		hidden :true,
		header : "库位Id",
		dataIndex : "locationId"
	},{
		header : "库位名称",
		dataIndex : "locationName"
	},{
		header : "库存数量",
		dataIndex : "quantity"
	},{
		header : "数量",
		dataIndex : "number",
		editor : new Ext.form.NumberField({
			allowBlank : true
		})
	},{
		header : "辅助单位",
		dataIndex : "supplementUnit"
	},{
		hidden : true,
		header : "换算数量",
		dataIndex : "secondConvertedQuantity"
	},{
		header : "辅助数量",
		dataIndex : "supplementNum",
		renderer : function(value, metadata, record) {
			value =(Number(record.get("number"))*Number(record.get("secondConvertedQuantity"))).toFixed(2);
			if(Ext.isEmpty(value)){
				value = 0;
				record.data.supplementNum=value;
				return value;
			}
			record.data.supplementNum = value;
			return value;
		}
	}];
	
	ApplicationDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ["applicationDetailId","otherMaterialStockId","materialsStoreId","mnemonics","commodityId","commodity","specificationsId",
		          "specifications","unit","number","supplementUnit","supplementNum","quantity","secondConvertedQuantity","locationId","locationName"],
		title : this.title,
		option : this.title,
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDetailOtherMaterialStock.do",
	}, this.grid_config || {}));
};

Ext.extend(ApplicationDetailGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModule : function() {
		if(this.locationId == null & this.locationIds==null){
			$toast("请先选择仓库和库位");
			return;
		}
		new MaterialsStoreSelector({
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
		}).show();
	},
	addSubModuleDate : function(data){
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.materialsStoreId == data.storeId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			materialsStoreId : data.storeId,
			commodityId : data["materialsSpecifications.materialsCommodity"].commodityId,
			commodity : data["materialsSpecifications.materialsCommodity"].commodity,
			mnemonics : data["materialsSpecifications"].mnemonics,
			specificationsId : data["materialsSpecifications"].specificationsId,
			specifications : data["materialsSpecifications"].specifications,
			unit : data["materialsSpecifications"].firstUnitConversion,//单位=计量单位
			quantity : data.quantity,
			locationId : data.baseLocation.locationId,
			locationName : data.baseLocation.locationName,
			supplementUnit : data["materialsSpecifications"].secondUnitConversion,//辅助单位=换算单位
			secondConvertedQuantity : data["materialsSpecifications"].secondConvertedQuantity,//换算数量
			number : 0
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	}
});