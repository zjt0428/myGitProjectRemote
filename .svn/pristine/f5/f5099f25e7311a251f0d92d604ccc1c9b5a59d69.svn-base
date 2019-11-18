var ReturnListGrid = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		dataIndex : "specificationsId"
	}, {
		hidden : true,
		dataIndex : "commodityId"
	}, {
		header : "周材编号",
		dataIndex : "mnemonics"
	}, {
		header : "周材名称",
		dataIndex : "commodity"
	}, {
		header : "规格型号",
		dataIndex : "specifications"
	},{
		header : "计量单位",
		dataIndex : "measurementUnit"
	}, {
		header : "退货数量",
		dataIndex : "returnQuantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			allowNegative: false,
			allowDecimals: false
		}),
		renderer : function (value, metadata, record) {
			if (value != null && value != "" && value != undefined) {
				record.data.assistQuantity = (value * Number(record.data.coefficient)).toFixed(2);
				return value;
			}
		}
	}, {
		header : "辅助单位",
		dataIndex : "assistUnit"
	}, {
		header : "辅助数量",
		dataIndex : "assistQuantity"
	}, {
		hidden :true,
		header : "换算系数",
		dataIndex : "coefficient"
	}, {
		hidden :true,
		header : "调拨余量",
		dataIndex : "remain"
	}, {
		header : "备注",
		dataIndex : "remarks",
		editor : new Ext.form.TextField({
			allowBlank : false
		})
	}]
	
	ReturnListGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "退货管理清单",
		option : "退货管理",
		fields : ReturnListListViewField,
		tbarItems : this.tbarItems,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelListReturnGoods.do"
	}, this.grid_config || {}));
}
Ext.extend(ReturnListGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.materialsSpecifications.specificationsId) {
				return;
			}
		}
		this.addRecordHeight(recordHeight);
		var SubModuleType = this.getStore().recordType;
		var subRecord = new SubModuleType();
		Ext.apply(subRecord.data, {
			specificationsId : data.materialsSpecifications.specificationsId,
			commodityId : data.materialsSpecifications.materialsCommodity.commodityId,
			commodity : data.materialsSpecifications.materialsCommodity.commodity,
			mnemonics : data.materialsSpecifications.mnemonics,
			specifications : data.materialsSpecifications.specifications,
			measurementUnit : data.materialsSpecifications.firstUnitConversion,
			coefficient : data.materialsSpecifications.secondConvertedQuantity,
			assistUnit : data.materialsSpecifications.secondUnitConversion,
			remain : null
		})
		this.stopEditing();
		this.getStore().add(subRecord);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new LeaseMaterialsRecordSelector({
			params : {
				"Q_leaseId_L_EQ" : this.leaseId
			},
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this),
			//重写selector 的 confirm 方法
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
	},
	addLeaseId : function (data) {
		this.leaseId = data;
	}
})
