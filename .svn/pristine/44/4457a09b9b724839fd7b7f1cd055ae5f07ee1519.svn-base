var EquipMaintDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "保养内容",
		dataIndex : "substance",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	}, {
		header : "保养部位",
		dataIndex : "component",
		renderer : function(n) {
			if (n) {
				return n.componGenericName;
			}
		}
	}, {
		header : "保养结果",
		dataIndex : "detailResult",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.maintResultData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			return value;
		}
	}, {
		header : "结果说明",
		dataIndex : "description",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	}, {
		header : "保养结果标记",
		dataIndex : "maintFlag",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	} ];
	if (this.saveable) {
		if (!this.tbarItems) {
			this.tbarItems = [];
		}
		this.tbarItems.push({
			iconCls : "btn-head-import",
			text : "导入",
			handler : this.importComponResource.createDelegate(this)
		}, {
			iconCls : "btn-approvalTask",
			text : "删除",
			handler : this.delSubModule.createDelegate(this)
		});
	}
	EquipMaintDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : EquipMaintDetailListViewField,
		title : "保养内容",
		option : "入库配件",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(EquipMaintDetailGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			detailResult : this.maintResultData[0][0]
		};
	},
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			var component = this.getStore().getAt(i).data.component;
			if (component && component.componId == data.componId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			detailResult : this.maintResultData[0][0],
			component : data
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	importComponResource : function() {
		new ComponentSelector({
			params : {
				"Q_consumeFlag_S_EQ" : "0"
			},
			collectEnable : true,
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					this.addSubModuleDate(d[i].data);
				}
			}.createDelegate(this)
		}).show();
	},
	delSubModule : function(data, grid, action, rowIndex) {
		var m = this.getSelectionModel().getSelections();
		this.subtractRecordHeight(m.length);
		for ( var i = 0; i < m.length; i++) {
			this.stopEditing();
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});