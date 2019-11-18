var ProjectDepotInitDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [{
		header : "品名",
		dataIndex : "commodity"
	},{
		header : "规格",
		dataIndex : "specifications"
	},{
		header : "助记码",
		dataIndex : "mnemonics"
	},{
		header : "单位",
		dataIndex : "unit"
	}, {
		header : "期初数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : true,
		}),
		renderer : function(value, metadata, record) {
			if(Ext.isEmpty(value)){
				value = 0
				record.data.quantity = value;
				return value;
			}else{
//				this.change();
				return value;
			}
		}.createDelegate(this)
	},{
		header : "辅助单位",
		dataIndex : "supplementUnit"
	},{
		header : "辅助数量",
		dataIndex : "supplementQuantity",
		renderer : function(value, metadata, record) {
			value = record.get("quantity")*record.get("convertedQuantity")*10000/10000;
			if(Ext.isEmpty(value)){
				return value = 0;
			}
			record.data.supplementQuantity = value.toFixed(2);
			return value.toFixed(2);
		}
	},{
		hidden : true,
		header : "换算数量",
		dataIndex : "convertedQuantity"
	}];
	ProjectDepotInitDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ProjectDepotInitDetailListViewField,
		title : "项目初始化",
//		option : "合同设备",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/materials/multiDelDetailProjectDepotInit.do",
		grid_view : {
			enableHdMenu : true
		}
	}, this.grid_config || {}));
};
Ext.extend(ProjectDepotInitDetailGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function(){
		return {
			projectInitId :this.projectInitId
		};
	},
	change : function(){
		if(this.projectInitId==null){
			var total = 0;
			for(var i=0;i<this.getStore().getCount();i++){
				if(Ext.isNumber(this.getStore().getAt(i).data.quantity)){
				total += this.getStore().getAt(i).data.quantity;
				}
			}
//		BaseDepotInitFrom.getForm().findField("baseDepotInit.total").setValue(s);
		Ext.getCmp('total').setValue(total); 
		}
	},
	addSubModule : function(){
		new MaterialsInfoSelector({
			collectEnable : true,
			callback : function(d){
				for(var i=0;i<d.length;i++){
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show()
	},
	addSubModuleDate : function(data){
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data,{
			specificationsId : data.specificationsId,
			commodity : data.materialsCommodity.commodity,
			mnemonics : data.mnemonics,
			specifications : data.specifications,
			unit : data.firstUnitConversion,
//			quantity : data.firstConvertedQuantity,
			supplementUnit : data.secondUnitConversion,
			convertedQuantity : data.secondConvertedQuantity,
			quantity : 0
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	}
});