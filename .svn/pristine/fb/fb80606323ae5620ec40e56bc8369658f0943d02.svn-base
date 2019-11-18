var MaterialsInputCountGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.btnId = Ext.id();
	var columns = [ {
		header : "入库数量",
		dataIndex : "inputCount",
		renderer : function(value, metadata, record) {
			var sum = 0;
			for(var i=0;i<this.data.length;i++){
				 sum += Number(record.data['locationName'+i]);
				 record.data.inputCount = sum;
			}
			return record.data.inputCount;
		}.createDelegate(this)
	} ];
	var fields = ["inputCount"];
	for(var i=0;i<this.data.length;i++){
		var a = {
				header : this.data[i].locationName,
				dataIndex : 'locationName'+i,
				editor : new Ext.form.NumberField({
					allowBlank : true
				}),
				renderer : function(value, metadata, record) {
					if(Ext.isEmpty(value)){
						return value = 0;
					}
					return value;
				}.createDelegate(this)
			}
		columns.push(a);
		fields.push('locationName'+i);
	}
	var tbarItems = [];
	tbarItems.push({
		id : this.btnId,
		iconCls : "btn-save",
		text : "保存",
		handler : this.confirm.createDelegate(this)
	});
	
	MaterialsInputCountGrid.superclass.constructor.call(this, Ext.apply({
		addForbidden : true,
		saveable : true,
		selectable : false,
		fields : fields,
		columns : columns,
		tbarItems :tbarItems
	}, this.viewConfig || {}));
};
Ext.extend(MaterialsInputCountGrid, Knight.ux.SubModuleBaseGrid, {
	confirm : function (){
		var data = [];
		var map = {};
		map['inputCount'] = this.getStore().getAt(0).data["inputCount"];
		for(var i=0;i<this.data.length;i++){
			var r = {};
			r['specificationsId'] = this.specificationsId;
			r['locationId'] = this.data[i].locationId;
			r['quantity'] = this.getStore().getAt(0).data['locationName'+i]=="" ? 0 : this.getStore().getAt(0).data['locationName'+i];
			data.push(r);
		}
		this.callback.call(this, data,map);
		Ext.getCmp("MaterialsInputCountWindow").close();
	},
	init : function() {
		if(this.materialsInputCountTemps!=null){
			new Ext.util.DelayedTask(function() {
				var inputCount = 0;
				for(var i=0;i<this.materialsInputCountTemps.length;i++){
					if(this.materialsInputCountTemps[i].specificationsId==this.specificationsId){
						this.getStore().getAt(0).data['locationName'+i]= materialsInputCountTemps[i].quantity;
						inputCount += materialsInputCountTemps[i].quantity;
					}
				}
				this.getStore().getAt(0).data["inputCount"]=inputCount;
				this.getStore().reload();
			}.createDelegate(this)).delay(100);
		};
	}
});