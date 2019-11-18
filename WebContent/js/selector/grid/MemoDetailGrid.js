var MemoDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "办理日期",
		dataIndex : "dealwithDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.dealwithDate = value;
			return value;
		}
	}, {
		header : "办理内容",
		dataIndex : "contents",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	}, {
		header : "计划完成时间",
		dataIndex : "planFinishedDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.planFinishedDate = value;
			return value;
		}
	}, {
		width : 80,
		header : "完成情况",
		dataIndex : "finished",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : [ [ "1", "已完成" ], [ "0", "未完成" ] ]
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				return store.getAt(index).data.name;
			}
			return value;
		}
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	} ];
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
	MemoDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : MemoDetailListViewField,
		title : "办理内容",
		option : "办理内容",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(MemoDetailGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			dealwithDate : new Date(),
			planFinishedDate : new Date(),
			finished : "1"
		};
	},
	delSubModule : function(data, grid, action, rowIndex) {
		var m = this.getSelectionModel().getSelections();
		for ( var i = 0; i < m.length; i++) {
			this.stopEditing();
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});