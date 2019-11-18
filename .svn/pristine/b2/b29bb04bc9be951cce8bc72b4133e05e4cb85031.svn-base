var EquipInspectDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "巡检部位",
		dataIndex : "position",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	}, {
		header : "巡检内容",
		dataIndex : "substance",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 256
		})
	}, {
		header : "巡检结果",
		dataIndex : "detailResult",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.inspectResultData
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
		header : "巡检结果标记",
		dataIndex : "inspectFlag",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	}, {
		header : "巡检人员",
		dataIndex : "detailPepoles",
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
			handler : this.importVerifyResource.createDelegate(this)
		});
	}
	EquipInspectDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : EquipInspectDetailListViewField,
		title : "巡检内容",
		option : "入库配件",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/equip/multiDelDetailEquipInspect.do",
	}, this.grid_config || {}));
};
Ext.extend(EquipInspectDetailGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			detailResult : this.inspectResultData[0][0]
		};
	},
	addSubModuleDate : function(data) {
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			detailResult : this.inspectResultData[0][0],
			position : data.ITEM_NAME,
			substance : data.DEMAND_DES,
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	importVerifyResource : function() {
		var verifyType = this.parentForm.getFieldValue("equipInspectSchema.equipDiary.verifyType");
		new VerifyItemSelector({
			params : {
				"Q_I.LEVEL_N_EQ" : 1,
				"Q_[I.VITEM_TYPE]_S_EQ" : verifyType + "EI"
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