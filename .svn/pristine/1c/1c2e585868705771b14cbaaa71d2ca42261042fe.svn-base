var EquipRepairComponGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [  {
		header : "维修部位",
		dataIndex : "faultLocation",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.faultLocationData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.faultLocation = value;
			return value;
		}
	}, {
		header : "耗材名称",
		dataIndex : "componGenericName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 24
		})
	}, {
		header : "规格型号",
		dataIndex : "componSpecificName",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 24
		})
	}, {
		header : "计量单位",
		dataIndex : "unit",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 24
		})
	}, {
		header : "耗用数量",
		dataIndex : "counts",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		header : "单价",
		dataIndex : "unitPrice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		header : "金额",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			var summary = Ext.util.Format.number(Number(record.data.counts) * Number(record.data.unitPrice), "0.00");
			record.data.summary = summary;
			return summary;
		}
	}, {
		header : "备注",
		dataIndex : "remark",
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
			iconCls : "btn-approvalTask",
			text : "删除",
			handler : this.delSubModule.createDelegate(this)
		});
	}
	EquipRepairComponGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : EquipRepairComponListViewField,
		title : this.title,
		option : "维修配件",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(EquipRepairComponGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.summary);
		}
		return Ext.util.Format.number(summaryAmount, "0.00");
	},
//	addSubModuleDate : function(data) {
//		for (var i = 0; i < this.getStore().getCount(); i++) {
//			if (this.getStore().getAt(i).data.componId == data.componId) {
//				return;
//			}
//		}
//		this.addHeight(recordHeight);
//		var RecordType = this.getStore().recordType;
//		var subrecord = new RecordType();
//		Ext.apply(subrecord.data, {
//			counts : 1,
//			unitPrice : data.unitprice,
//			summary : 0,
//			component : data
//		});
//		this.stopEditing();
//		this.getStore().add(subrecord);
//		this.startEditing(0, 0);
//	},
//	addSubModule : function() {
//		new ComponentSelector({
//			collectEnable : true,
//			callback : function(d) {
//				for (var i = 0; i < d.length; i++) {
//					var data = d[i].data;
//					this.addSubModuleDate(data);
//				}
//			}.createDelegate(this)
//		}).show();
//	},
	createSubModule : function() {
		return {
			repairId : this.repairId
			
		};
	},
	delSubModule : function(data, grid, action, rowIndex) {
		var m = this.getSelectionModel().getSelections();
		this.subtractRecordHeight(m.length);
		for (var i = 0; i < m.length; i++) {
			this.stopEditing();
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});