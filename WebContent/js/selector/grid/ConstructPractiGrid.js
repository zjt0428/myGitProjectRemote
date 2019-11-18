var ConstructPractiGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
		header : "企业人员",
		readOnly : true,
		dataIndex : "practiName"
	}, {
		header : "联系方式",
		readOnly : true,
		dataIndex : "mobile"
	} ];
	ConstructPractiGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ConstructPractiListViewField,
		title : this.title,
		option : "作业人员",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
	}, this.grid_config || {}));
};
Ext.extend(ConstructPractiGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.userId == data.userId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			userId : data.userId,
			constructId : this.constructId,
            practiName : data.fullname,
            mobile : data.mobile,
            type : this.type
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this, record);
		}
	},
	addSubModule : function() {
		new UserSimpleSelector({
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});