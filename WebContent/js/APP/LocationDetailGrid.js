var LocationDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
		header : "上传时间",
		dataIndex : "upTime",
		editor : new Ext.form.DateField({
			format : "H:i:s",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "H-i");
			record.data.dealwithDate = value;
			return value;
		}
	}, {
		header : "上传地址",
		dataIndex : "location",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	}];
	if (this.saveable) {
		if (!this.tbarItems) {
			this.tbarItems = [];
		}
		this.tbarItems.push({
			iconCls : "btn-approvalTask",
			text : "删除",
			handler : this.delSubModule.createDelegate(this)
		});
	}
	LocationDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : LocationDetailListViewField,
		title : "位置",
		option : "位置",
		tbarItems : this.tbarItems,
		height : 300,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(LocationDetailGrid, Knight.ux.SubModuleBaseGrid, {
	delSubModule : function(data, grid, action, rowIndex) {
		var m = this.getSelectionModel().getSelections();
		for ( var i = 0; i < m.length; i++) {
			this.stopEditing();
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});