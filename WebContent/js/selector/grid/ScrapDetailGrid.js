var ScrapDetailGrid = function(a,b) {
	Ext.apply(this, a||{});
	Ext.apply(this, b||{});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var columns = [ {
		header : "助记码",
		dataIndex : "materialsSpecifications",
		renderer : function(n) {
			return n.mnemonics;
		}
	},{
		header : "品名",
		dataIndex : "materialsSpecifications",
		renderer : function(n) {
			return n.materialsCommodity.commodity;
		}
	},{
		header : "规格",
		dataIndex : "materialsSpecifications",
		renderer : function(n) {
			return n.specifications;
		}
	},{
		header : "计量单位",
		dataIndex : "materialsSpecifications",
		renderer : function(n) {
			return n.firstUnitConversion;
		}
	},{
		header : "报废数量",
		dataIndex : "scrapNum",
		editor : new Ext.form.NumberField({
		})
	},{
		header : "辅助单位",
		dataIndex : "materialsSpecifications",
		renderer : function(n) {
			return n.secondUnitConversion;
		}
	}, {
		header : "辅助数量",
		dataIndex : "materialsSpecifications",
		renderer : function(value,metadata,record) {
			value = (Number(record.data.scrapNum)*Number(value.secondConvertedQuantity)).toFixed(2);
			return value;
		}
	}, {
		hidden : !this.scrapContract,
		header : "吨位",
		dataIndex : "tonnage",
		editor : new Ext.form.NumberField({
		})
	}, {
		hidden : !this.scrapContract,
		header : "单价",
		dataIndex : "unitPrice",
		editor : new Ext.form.NumberField({
		})
	}, {
		hidden : !this.scrapContract,
		header : "合同金额",
		dataIndex : "summary",
		renderer : function(val,meta,record) {
			if(!Ext.isEmpty(record.data.tonnage) && !Ext.isEmpty(record.data.unitPrice)) {
				value = (Number(record.data.tonnage)*Number(record.data.unitPrice)).toFixed(2);
				record.data.summary = value;
			}
			return value;
		}
	} ];
	ScrapDetailGrid.superclass.constructor.call(this, Ext.apply({
		addForbidden : this.addForbidden,
		saveable : this.saveable,
		selectable : this.selectable,
		title : this.title,
		option : this.option,
		tbarItems : this.tbarItems,
		height : this.height,
		fields : ["detailId","materialsSpecifications","scrapNum","tonnage","unitPrice","summary"],
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDetailScrapApply.do",
	}, this.grid_config || {}));
};
Ext.extend(ScrapDetailGrid, Knight.ux.SubModuleBaseGrid, {	
	
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.materialsSpecifications.specificationsId == data.materialsSpecifications.specificationsId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			materialsSpecifications : data.materialsSpecifications,
			scrapNum : 0,
			tonnage : 0,
			unitPrice : 0
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		if(this.depotId==null||this.locationId==null) {
			Ext.MessageBox.alert('提示','请先选择库位!');
			return;
		}
		new MaterialsStoreSelector({
			collectEnable : true,
			params : {
				"Q_baseDepot.depotId_L_EQ" : this.depotId,
				"Q_baseLocation.locationId_L_EQ" : this.locationId
			},
			callback : function(d){
				for(var i=0;i<d.length;i++){
					this.addSubModuleDate(d[i].data);
				}
			}.createDelegate(this)
		}).show();
	}
});
