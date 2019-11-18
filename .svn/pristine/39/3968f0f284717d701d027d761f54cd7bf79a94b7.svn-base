var MaterialsRecycleCountTempGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var columns = [ {
		header : "库位",
		dataIndex : "locationName"
	},{
		hidden : true,
		header : "库位id",
		dataIndex : "locationId"
	},{
		hidden : true,
		header : "规格id",
		dataIndex : "specificationsId"
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : true
		})
	}];
	var tbarItems = [];
	if(this.editable){
		tbarItems.push({
			iconCls : "btn-save",
			text : "保存",
			handler : this.confirm.createDelegate(this)
		});
	}
	
	MaterialsRecycleCountTempGrid.superclass.constructor.call(this, Ext.apply({
		id : "materialsRecycleCountTempGrid",
		addForbidden : true,
		saveable : true,
		fields : ["tempId","locationId","locationName","quantity","specificationsId"],
		height : this.height,
		tbarItems : tbarItems,
//		loadurl : __ctxPath + "/materials/listInputCountRecycleManage.do",
		base_params : this.params,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(MaterialsRecycleCountTempGrid, Knight.ux.SubModuleBaseGrid, {
	confirm : function(){
		var array = [];
		var input = null;
		for(var i=0;i<this.getStore().getCount();i++){
			var r  = this.getStore().getAt(i).data;
			input += Number(this.getStore().getAt(i).data.quantity);
			array.push(r);
		}
		this.callback.call(this, array,input);
		Ext.getCmp("MaterialsInputCountWindow").close();
	},
	addSubModuleDate : function(data) {
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			item : data.item,
			amount : data.amount
			
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	}
	
});