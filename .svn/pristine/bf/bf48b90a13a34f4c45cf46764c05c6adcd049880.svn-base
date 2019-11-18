var BaseDepotInitDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	var columns = [{
		header : "库位名称",
		dataIndex : "locationName"
	}, {
		header : "计量单位",
		dataIndex : "unit"
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : true,
		}),
		renderer : function(value, metadata, record) {
			if(Ext.isEmpty(value)){
				record.data.quantity = 0;
				return value = 0;
			}else{
				return value;
			}
		}
	},{
		header : "辅助单位",
		dataIndex : "supplementUnit"
	},{
		header : "换算系数",
		dataIndex : "conversion",
		hidden : true
	}, {
		header : "辅助数量",
		dataIndex : "supplementQuantity",
		renderer : function(value, metadata, record) {
			if(this.saveable){
				if(Ext.isEmpty(value)&&record.data.quantity==0){
					return value = 0;
				}else{
					record.data.supplementQuantity = (Number(record.data.quantity)*Number(record.data.conversion)).toFixed(2);
					this.change();
					return record.data.supplementQuantity;
				}
			}
			return value;
		}.createDelegate(this)
	}];
	BaseDepotInitDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : BaseDepotInitDetailListViewField,
		title : "库存初始化",
		tbarItems : this.tbarItems,
		addForbidden : true,
		height : this.height,
		columns : columns,
		grid_view : {
			enableHdMenu : true
		}
	}, this.grid_config || {}));
};
Ext.extend(BaseDepotInitDetailGrid, Knight.ux.SubModuleBaseGrid, {
	change : function(){
		var total = 0;
		var supplementTotal = 0;
		for(var i=0;i<this.getStore().getCount();i++){
			total += Number(this.getStore().getAt(i).data.quantity);
			supplementTotal += Number(this.getStore().getAt(i).data.supplementQuantity==null? 0 : this.getStore().getAt(i).data.supplementQuantity);
		}
		Ext.getCmp('total').setValue(total); 
		Ext.getCmp('supplementTotal').setValue(supplementTotal.toFixed(2)); 
	},
	
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.locationId == data.locationId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			locationId : data.locationId,
			locationName : data.locationName,
			unit : data.unit,
			supplementUnit : data.supplementUnit,
			conversion : data.conversion
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	addSubModule : function(data){
		for(var i=0;i<data.length;i++){
			this.addSubModuleDate(data[i]);
		}
	}
});