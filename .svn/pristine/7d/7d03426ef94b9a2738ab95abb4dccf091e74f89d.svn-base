var AfterRemodelGrid = function(a,b) {
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
		header : "数量",
		dataIndex : "quantity",
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
			value = (Number(record.data.quantity)*Number(value.secondConvertedQuantity)).toFixed(1);
			return value;
		}
	},{
		header : "入库库位",
		dataIndex : "baseLocation",
		renderer : function(n) {
			return n.locationName;
		}
	} ];
	AfterRemodelGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "改型后",
		option : "改型后",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : ["afterId","materialsSpecifications","baseLocation","quantity"],
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelAfterMaterialsRemodel.do",
	}, this.grid_config || {}));
};
Ext.extend(AfterRemodelGrid, Knight.ux.SubModuleBaseGrid, {	
	
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.materialsSpecifications.specificationsId == data.materialsSpecifications.specificationsId
					&&this.getStore().getAt(i).data.baseLocation.locationId==data.baseLocation.locationId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			materialsSpecifications : data.materialsSpecifications,
			baseLocation : data.baseLocation,
			quantity : 0
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		if(this.depotId==null) {
			Ext.MessageBox.alert('提示','请先选择仓库!');
			return;
		}
		new MaterialsStoreSelector({
			collectEnable : true,
			params : {
				"Q_baseDepot.depotId_L_EQ" : this.depotId
			},
			callback : function(d){
				for(var i=0;i<d.length;i++){
					this.addSubModuleDate(d[i].data);
				}
			}.createDelegate(this)
		}).show();
	}
});
