var EquipmentAffiliatedGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;

	var columns = [ {
		header : "配件名称",
		dataIndex : "componGenericName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	},{
		header : "配件规格",
		dataIndex : "dimensions",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "单位",
		dataIndex : "unit",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	} ];
	EquipmentAffiliatedGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : EquipmentAffiliatedListViewField,
		title : "附件清单",
		option : "备注部件",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelAffiliatedEquipment.do"
	}, this.grid_config || {}));
};
Ext.extend(EquipmentAffiliatedGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {};
	},
	addSubModuleDate : function(data) {
	for (var i = 0; i < this.getStore().getCount(); i++) {
		if (this.getStore().getAt(i).data.disAllInitId == data.disAllInitId) {
			return;
		}
	}
	var RecordType = this.getStore().recordType;
	var recordType = new RecordType();
	Ext.apply(recordType.data, {
		disAllInitId : data.disAllInitId,
		componGenericName : data.componGenericName,
		componSpecific:data.componSpecific,
		dimensions : data.dimensions,
		unit : data.calculate,
		quantity : data.quantity
		
	});
	this.stopEditing();
	this.getStore().add(recordType);
	this.startEditing(0, 0);
}
});