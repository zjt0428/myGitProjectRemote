var MemoDeputyGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "工作代理人",
		dataIndex : "practiName"
	} ];
	if (this.saveable) {
		if (!this.tbarItems) {
			this.tbarItems = [ "->", {
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSubModule.createDelegate(this)
			}, {
				iconCls : "btn-approvalTask",
				text : "删除",
				handler : this.delSubModule.createDelegate(this)
			} ];
		}
	}
	MemoDeputyGrid.superclass.constructor.call(this, Ext.apply({
		saveable : false,
		selectable : this.selectable,
		fields : MemoDeputyListViewField,
		title : "工作代理人",
		option : "代理人",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(MemoDeputyGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.practiId == data.practiId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			practiId : data.practiId,
			practiName : data.practiName
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new PractitionerSelector({
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	},
	delSubModule : function(data, grid, action, rowIndex) {
		var m = this.getSelectionModel().getSelections();
		for (var i = 0; i < m.length; i++) {
			this.stopEditing();
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});