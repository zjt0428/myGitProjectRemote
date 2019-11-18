var LeaseRepairAfterGrid = function(a, b) {
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
	
	LeaseRepairAfterGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "维修后",
		option : "维修后",
		fields : LeaseRepairAfterListViewField,
		tbarItems : this.tbarItems,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelAfterLeaseRepair.do"
	}, this.grid_config || {}));
}
Ext.extend(LeaseRepairAfterGrid, Knight.ux.SubModuleBaseGrid, {
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
			}.createDelegate(this)
		}).show()
	}
})