var ConsumeProductGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		dataIndex : "commodityId"
	}, {
		header : "周材名称",
		dataIndex : "commodity"
	}, {
		hidden : true,
		dataIndex : "specificationsId"
	}, {
		header : "周材规格",
		dataIndex : "specifications"
	}, {
		header : "助记码",
		dataIndex : "mnemonics"
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "仓库库存",
		dataIndex : "quantity"
	}, {
		header : "耗用数量 ",
		dataIndex : "consumeQuantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			allowNegative: false,
			allowDecimals: false
		}),
		renderer : function(value, metadata, record) {
			if (Number(value) > Number(record.get("quantity"))) {
				record.data.consumeQuantity = record.data.quantity;
				value = record.data.consumeQuantity;
				Ext.Msg.alert("信息警告", "耗用数量不能大于库存数量!");
			}
			return value;
		}
	},{
		hidden : true,
		header : "换算数量",
		dataIndex : "auxiliaryQuantity"
	}, {
		header : "辅助数量",
		dataIndex : "convertedQuantity",
		renderer : function(value, metadata, record) {
			value =Number(record.get("consumeQuantity"))*Number(record.get("auxiliaryQuantity"));
			if(Ext.isEmpty(value)){
				value = 0;
			}
			record.data.convertedQuantity = value;
			return value.toFixed(2);
		}
	}, {
		hidden : true,
		header : "出库库位id",
		dataIndex : "exitLocationId"
	}, {
		header : "出库库位",
		dataIndex : "exitLocationName"
	}]
	ConsumeProductGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "耗用产品清单",
		option : "耗用产品清单",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : ConsumeProductListViewField,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelConsumeHandleMake.do"
	}, this.grid_config || {}));
}
Ext.extend(ConsumeProductGrid, Knight.ux.SubModuleBaseGrid, {
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
			commodityId : data["materialsSpecifications.materialsCommodity"].commodityId,
			commodity : data["materialsSpecifications.materialsCommodity"].commodity,
			mnemonics : (typeof(data["materialsSpecifications"].mnemonics) == undefined) ? "" : data["materialsSpecifications"].mnemonics,
			specifications : data["materialsSpecifications"].specifications,
			specificationsId : data["materialsSpecifications"].specificationsId,
			measurementUnit : data["materialsSpecifications"].firstUnitConversion,
			auxiliaryQuantity : data["materialsSpecifications"].secondConvertedQuantity,
			quantity : data.quantity,
			exitLocationId : data["baseLocation"].locationId,
			exitLocationName : data["baseLocation"].locationName,
			consumeQuantity : 0
		});
		this.stopEditing();
		this.getStore().add(subRecord);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new MaterialsStoreSelector({
			collectEnable : true,
			params : {
				"Q_baseDepot.depotId_L_EQ" : this.storeId
			},
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
})