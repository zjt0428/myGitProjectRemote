var DispatchMaterialsGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
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
		header : "仓库库存表id",
		dataIndex : "materialsStoreId"
	},{
		hidden : true,
		header : "规格id",
		dataIndex : "specificationsId"
	},{
		header : "规格",
		dataIndex : "specifications"
	},{
		header : "单位",
		dataIndex : "measurementUnit"
	},{
		header : "调度数量",
		dataIndex : "dispatchCounts",
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
		dataIndex : "secondConvertedQuantity"
	},{
		header : "辅助数量",
		dataIndex : "auxiliaryQuantity",
		renderer : function(value, metadata, record) {
			value =(Number(record.get("dispatchCounts"))*Number(record.get("secondConvertedQuantity"))).toFixed(2);
			if(Ext.isEmpty(value)){
				value = 0;
			}
			record.data.auxiliaryQuantity = value;
			return value;
		}
	} ];
	DispatchMaterialsGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "调度清单",
		option : "调度清单",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : DispatchMaterialsListViewField,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDispatchMaterialsDispatch.do"
	}, this.grid_config || {}));
};
Ext.extend(DispatchMaterialsGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			quantity : 0
		};
	},	
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.materialsStoreId == data.storeId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var Commodity = this.getStore().recordType;
		var commodity = new Commodity();
		Ext.apply(commodity.data, {
			commodityId : data["materialsSpecifications.materialsCommodity"].commodityId,
			materialsStoreId : data.storeId,
			commodity : data["materialsSpecifications.materialsCommodity"].commodity,
			mnemonics : data["materialsSpecifications"].mnemonics,
			specificationsId : data["materialsSpecifications"].specificationsId,
			specifications : data["materialsSpecifications"].specifications,
			measurementUnit : data["materialsSpecifications"].firstUnitConversion,//单位=计量单位
			secondUnitConversion : data["materialsSpecifications"].secondUnitConversion,//辅助单位=换算单位
			secondConvertedQuantity : data["materialsSpecifications"].secondConvertedQuantity,//辅助数量=换算数量*调度数量
			dispatchCounts : 0
		});
		this.stopEditing();
		this.getStore().add(commodity);
		this.startEditing(0, 0);
	},
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
			}.createDelegate(this),
			contractId : this.contractId,
			confirm : function() {
				var data = null;
				if (!this.targetEnable) {
					data = this.sourcePanel.getSelectionModel().getSelections();
				} else {
					if (this.config.target.collect) {
						data = this.targetPanel.getStore().data.items;
					} else {
						data = this.targetPanel.getSelectionModel().getSelections();
					}
					if (this.targetRemoteEnable) {
						for (var i = 0; i < data.length; i++) {
							data[i].data[this.config.target.parent] = {};
							Ext.apply(data[i].data[this.config.target.parent], this.clickrowdb.data);
						}
					}
				}
				if (data.length == 0) {
					Ext.Msg.alert("信息提示", this.config.emptySelectedText);
					return;
				}
				//对比选中周材 是否在该合同中有约定
				var contractMaterials = $ajaxSyncCall(__ctxPath + "/dispatch/loadContractMaterials.do",
						{contractmaId : this.contractId}).data[0];
				var set = contractMaterials.priceSettingSet;
				for(var i=0;i<data.length;i++){
					var b= false;
					var selected = data[i].data;
					for(var j=0;j<set.length;j++) {
						if(set[j].specificationsId== selected.materialsSpecifications.specificationsId) {
							b = true;
						}
					}
					if(!b) {
						Ext.Msg.alert("提示","【"+selected.materialsSpecifications.materialsCommodity.commodity
								+selected.materialsSpecifications.specifications
								+"】在【周材合同】没有约定，请在【周材合同】添加后再进行操作");
						return;
					}
				}
				if (this.callback) {
					this.callback.call(this, data);
				}
				this.close();
			}
		}).show();
	}
});