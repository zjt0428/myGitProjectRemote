var TemporaryStorageGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [ {
		header : "品名",
		dataIndex : "commodity"
	}, {
		header : "助记码",
		dataIndex : "mnemonics"
	}, {
		header : "规格",
		dataIndex : "specifications"
	}, {
		header : "单位",
		dataIndex : "unit"
	}, {
		header : "暂存数量",
		dataIndex : "temporaryQuantity",
		editor : new Ext.form.NumberField({
			allowBlank : true
		})
	}, {
		header : "辅助单位",
		dataIndex : "supplementUnit"
	}, {
		header : "辅助数量",
		dataIndex : "supplementQuantity",
		renderer : function(value,medata,record) {
			if(!Ext.isEmpty(record.data.temporaryQuantity)){
				return record.data.supplementQuantity = (Number(record.data.temporaryQuantity)*Number(record.data.conversionNum)).toFixed(2);
			}
		}
	}, {
		hidden : true,
		header : "换算数量",
		dataIndex : "conversionNum"
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : true
		})	
	}];

	
	TemporaryStorageGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : TemporaryStorageListViewField,
		title : "暂存清单",
		option : "暂存清单",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelTemporaryStorageRecycleManage.do"
	}, this.grid_config || {}));
};
Ext.extend(TemporaryStorageGrid, Knight.ux.SubModuleBaseGrid, {
	getDetailData : function(){
		var detailData = [];
		for(var i=0;i<this.getStore().getCount();i++){
			detailData[i] = this.getStore().getAt(i).data;
		}
		return detailData;
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.specificationsId == data.specificationsId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			commodityId : data.materialsCommodity.commodityId,
			commodity : data.materialsCommodity.commodity,
			mnemonics : data.mnemonics,
			specificationsId : data.specificationsId,
			specifications : data.specifications,
			unit : data.firstUnitConversion,
			supplementUnit:data.secondUnitConversion,
			supplementQuantity:0,
			conversionNum : data.secondConvertedQuantity,
			remark:""
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new MaterialsInfoSelector({
			collectEnable : true,
			params : {
				
			},
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});