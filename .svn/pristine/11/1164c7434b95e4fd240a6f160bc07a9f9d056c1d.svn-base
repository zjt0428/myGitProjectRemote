var TransfersDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
		header : "项目仓库库存Id",
		dataIndex : "storeId",
		hidden : true
	},{
		header : "设备型号",
		dataIndex : "equipSpecific"
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
		header : "调出库存",
		dataIndex : "quantity"
	}, {
		header : "调拨数量",
		dataIndex : "transfersCounts",
		editor : new Ext.form.NumberField({
			decimalPrecision : 2,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record){
			if(Ext.isEmpty(value)){
				value = 0;
				record.data.transfersCounts =value;
				return value;
			}
			if(Number(value)>Number(record.get("quantity"))){
				Ext.Msg.alert("提示","调拨数量不能大于库存数量");
				record.data.transfersCounts =record.get("quantity");
				return value=record.get("quantity");
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
			if(Number(record.get("transfersCounts"))==null){
				if(Ext.isEmpty(value)){
					value = 0;
					record.data.surplusCounts =value;
 				    return value;
				}				
			}else{
				value = (Number(record.get("quantity"))-Number(record.get("transfersCounts"))).toFixed(1);
				record.data.surplusCounts =value;
				return value;
			}
			return value;
		}
	}];
	TransfersDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : TransfersDetailListViewField,
		title : "配件调拨",
		option : "配件调拨",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDetailDepotTransfers.do",
	}, this.grid_config || {}));
};
Ext.extend(TransfersDetailGrid, Knight.ux.SubModuleBaseGrid, {
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
		new ComponentJoinStoreHouseSelector({
			params : {
				"storeId":this.outDepotId
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
//		for ( var i = 0; i < this.getStore().getCount(); i++) {
//			if (this.getStore().getAt(i).data.storeId == data.storeId) {
//				return;
//			}
//		}
//		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data,{
			equipSpecific : data.componSpecificName,
			specificationsId : data.componId,
			specifications : data.dimensions,
			measurementUnit : data.calculate,
			quantity : data.storeCounts,
			storeId : data.storeId
		});
		this.stopEditing();
		this.getStore().add(recordType);
	}
});