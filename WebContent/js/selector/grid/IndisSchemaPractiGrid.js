var IndisSchemaPractiGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var columns = [ {
		header : "从业人员",
		dataIndex : "practiName"
	}, {
		header : "资质证书编号",
		dataIndex : "certNum"
	}, {
		header : "从业工种",
		dataIndex : "practiKindwork"
	} ];
	IndisSchemaPractiGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : IndisSchemaPractiListViewField,
		title : "安排人员",
		option : "方案人员",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/safety/multiDelPractiIndisSchema.do"
	}, this.grid_config || {}));
};
Ext.extend(IndisSchemaPractiGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.certId == data.certId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			schemaId : this.schemaId,
			certId : data.certId,
			practiId : data.practiId,
			practiName : data.practitioner.practiName,
			certNum : data.certNum,
			practiKindwork : data.practiKindworkName,
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this, record);
		}
	},
	addSubModule : function() {
		new PractiCertSelector({
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});