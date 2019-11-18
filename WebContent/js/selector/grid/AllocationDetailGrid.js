var AllocationDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
		header : "项目仓库Id",
		dataIndex : "storeId",
		hidden : true
	},{
		header : "助记码",
		dataIndex : "mnemonicCode"
	}, {
		hidden : true,
		header : "品名id",
		dataIndex : "commodityId"
	}, {
		header : "品名",
		dataIndex : "commodity"
	}, {
		header : "规格",
		dataIndex : "specfications"
	}, {
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		hidden : true,
		header : "换算单位",
		dataIndex : "secondUnitConversion"
	}, {
		header : "项目库存",
		dataIndex : "projectTotal"
	}, {
		header : "调拨数量",
		dataIndex : "allocationCounts",
		editor : new Ext.form.NumberField({
			decimalPrecision : 1,
			minValue : 0,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record){
			if(Ext.isEmpty(value)){
				value = 0;
				record.data.allocationCounts =value;
				return value;
			}
			if(Number(value)>Number(record.get("projectTotal"))){
				Ext.Msg.alert("提示","调拨数量不能大于库存数量");
				record.data.allocationCounts =record.get("projectTotal")>0 ? record.get("projectTotal") : 0;
				return record.data.allocationCounts;
			}
			return value;
		}
	}, {
		header : "剩余数量",
		dataIndex : "surplusCounts",
		renderer : function(value, metadata, record) {
			if(Number(record.get("allocationCounts"))==null){
				if(Ext.isEmpty(value)){
					value = 0;
					record.data.surplusCounts =value;
					return value;
				}				
			}else{
				value = (Number(record.get("projectTotal"))-Number(record.get("allocationCounts"))).toFixed(1);
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
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	} ];
	AllocationDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : AllocationDetailListViewField,
		title : "调拨清单",
		option : "调拨清单",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDetailAllocationProject.do",
	}, this.grid_config || {}));
};
Ext.extend(AllocationDetailGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		
	},
	addSubModule : function(data) {
		if(this.projectId==null){
			$toast("请先选择调出合同项目！");
			return;
		}
		new ProjectMaterialsStoreSelector({
			params:{
				"Q_project.projectId_L_EQ": this.projectId
			},
			collectEnable : true,
			contractId : this.contractId,
			callback : function(d) {
				for(var i=0;i<d.length;i++){
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this),
			//重写selector 的 confirm 方法
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
								+"】在周材合同没有约定，请添加周材合同后再进行操作");
						return;
					}
				}
				if (this.callback) {
					this.callback.call(this, data);
				}
				this.close();
			}
		}).show();
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specficationsId == data.materialsSpecifications.specificationsId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data,{
			mnemonicCode : data.materialsSpecifications.mnemonics,
			commodityId : data.materialsSpecifications.materialsCommodity.commodityId,
			commodity : data.materialsSpecifications.materialsCommodity.commodity,
			specficationsId : data.materialsSpecifications.specificationsId,
			specfications : data.materialsSpecifications.specifications,
			secondConvertedQuantity : data.materialsSpecifications.secondConvertedQuantity,//换算数量
			secondUnitConversion : data.materialsSpecifications.secondUnitConversion,//换算单位
			measurementUnit : data.materialsSpecifications.firstUnitConversion,//计量单位
			projectId : this.projectId,
			storeId : data.storeId,
			projectTotal : data.quantity
		});
		this.stopEditing();
		this.getStore().add(recordType);
//		this.starting(0,0);
	}
});