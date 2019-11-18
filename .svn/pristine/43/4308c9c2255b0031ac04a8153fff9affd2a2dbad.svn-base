var DestributionGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;

	var columns = [ {
		header : "配件名称",
		dataIndex : "componGeneric"
	}, {
		header : "规格型号",
		dataIndex : "componSpecific"
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}];
	DestributionGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : LogisticsDestributionListViewField,
		title : "配送清单",
		option : "配送清单",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelDestributionLogisticsTransport.do"
	}, this.grid_config || {}));
};
Ext.extend(DestributionGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.amount);
		}
		return summaryAmount;
	},
	addSubModuleDate : function(data) {
	/*	for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.carId == data.carId) {
				return;
			}
		}*/
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			componGeneric:data.componGenericName,
			componSpecific:data.componSpecificName,
			quantity:data.consumeCounts,
	
			destributionId:data.destributionId,
			transportId:data.transportId,
			carId : data.carId,
			motorcoach : 0,
			unitPrice : 0,
			licensePlate : data.licensePlate,
			sedan : data.sedan,
			propertyName : data.propertyName
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new ComponentSelector({
			params : {
				"Q_delFlag_S_EQ" : "1"
			},
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});