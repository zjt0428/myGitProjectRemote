var ProjectRepairAfterGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [{
		hidden : true,
		dataIndex : "specificationsId"
	}, {
		header : "周材名称",
		dataIndex : "materialsSpecifications",
		renderer : function(n) {
			return n.materialsCommodity.commodity;
		}
	}, {
		header : "规格型号",
		dataIndex : "materialsSpecifications",
		renderer : function(n) {
			return n.specifications;
		}
	}, {
		header : "助记码",
		dataIndex : "materialsSpecifications",
		renderer : function(n) {
			return n.mnemonics;
		}
	}, {
		header : "计量单位",
		dataIndex : "materialsSpecifications",
		renderer : function(n) {
			return n.firstUnitConversion;
		}
	}, {
		hidden : true,
		header : "换算系数",
		dataIndex : "materialsSpecifications",
		renderer : function(n) {
			return n.secondConvertedQuantity;
		}
	}, {
		header : "维修数量",
		dataIndex : "repairQuantity",
		editor : new Ext.form.NumberField({
			allowDecimals: false,
			allowNegative: false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if(value != null && value != "" && value != undefined) {
				record.data.assistQuantity = (value * Number(record.data.materialsSpecifications.secondConvertedQuantity)).toFixed(2);
				return value;
			}
		}
	}, {
		header : "辅助数量",
		dataIndex : "assistQuantity"
	}]
	
	ProjectRepairAfterGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "维修后",
		option : "维修后",
		fields : ProjectRepairAfterListViewField,
		tbarItems : this.tbarItems,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelAfterProjectRepair.do"
	}, this.grid_config || {}));
}
Ext.extend(ProjectRepairAfterGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.materialsSpecifications == data.materialsSpecifications) {
				return;
			}
		}
		this.addRecordHeight(recordHeight);
		var SubModuleType = this.getStore().recordType;
		var subRecord = new SubModuleType();
		Ext.apply(subRecord.data, {
			materialsSpecifications : data
		})
		this.stopEditing();
		this.getStore().add(subRecord);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new MaterialsInfoSelector({
			collectEnable : true,
			callback : function(d) {
				for(var i=0;i<d.length;i++){
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
						if(set[j].specificationsId== selected.specificationsId) {
							b = true;
						}
					}
					if(!b) {
						Ext.Msg.alert("提示","【"+selected.materialsCommodity.commodity
								+selected.specifications
								+"】在【周材合同】没有约定，请在【周材合同】添加后再进行操作");
						return;
					}
				}
				if (this.callback) {
					this.callback.call(this, data);
				}
				this.close();
			}
		}).show()
	}
})