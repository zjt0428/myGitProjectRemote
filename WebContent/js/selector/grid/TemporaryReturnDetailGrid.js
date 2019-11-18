var TemporaryReturnDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [ {
		header : "助记码",
		dataIndex : "mnemonics"
	},{
		hidden : true,
		header : "退货清单id",
		dataIndex : "returnId"
	},{
		hidden : true,
		header : "品名id",
		dataIndex : "commodityId"
	},{
		sortable: true,
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
		header : "计量单位",
		dataIndex : "unit"
	},{
		header : "暂存库存",
		dataIndex : "temporaryQuantity"
	},{
		header : "退货数量",
		dataIndex : "returnQuantity",
		editor : new Ext.form.NumberField({
			allowBlank : true,
			maxValue : 99999
		}),
		renderer : function(value,meta,record) {
			if(!Ext.isEmpty(value)) {
				if(Number(value)>Number(record.data.temporaryQuantity)){
					Ext.Msg.alert("出错","退货数量不能大于库存");
					value = 0;
					record.data.returnQuantity = 0;
				}
				return value;
			}
		}
	},{
		header : "辅助单位",
		dataIndex : "supplementUnit"
	},{
		header : "辅助数量",
		dataIndex : "supplementQuantity",
		renderer : function(value,meta,record) {
			if(record.data.returnQuantity!=null && record.data.conversionNum != null) {
				value = Number(record.data.returnQuantity) * Number(record.data.conversionNum);
				record.data.supplementQuantity = value.toFixed(2);
			}
			return value.toFixed(2);
		}
	},{
		hidden : true,
		header : "转换系数",
		dataIndex : "conversionNum"
	},{
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : true
		})	
	} ];
	TemporaryReturnDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		title : "退货清单",
		option : "退货清单",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : TemporaryReturnDetailListViewField,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDetailTemporaryReturn.do"
	}, this.grid_config || {}));
};
Ext.extend(TemporaryReturnDetailGrid, Knight.ux.SubModuleBaseGrid, {
	getDetailData : function(){
		var detailData = [];
		this.dispacthId
		for(var i=0;i<this.getStore().getCount();i++){
			detailData[i] = this.getStore().getAt(i).data;
		}
		return detailData;
	},
	addSubModuleDate : function(data) {
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			commodityId : data.materialsSpecifications.materialsCommodity.commodityId,
			mnemonics : data.materialsSpecifications.mnemonics,
			commodity : data.materialsSpecifications.materialsCommodity.commodity,
			specifications : data.materialsSpecifications.specifications,
			specificationsId : data.materialsSpecifications.specificationsId,
			unit : data.materialsSpecifications.firstUnitConversion,
			conversionNum : data.materialsSpecifications.secondConvertedQuantity,
			supplementUnit : data.materialsSpecifications.secondUnitConversion,
			supplementQuantity : 0,
			returnQuantity : 0,
			temporaryQuantity : data.quantity
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		if(this.depotId==null) {
			$toast("请先选择退货仓库");
			return;
		}
		new ReturnTempStoreSelector({
			params : {
				"Q_depotId_L_EQ" : this.depotId,
				"Q_contractId_L_EQ" : this.contractId
			},
			collectEnable : true,
			callback : function(d) {
				for(var i=0;i<d.length;i++){
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});