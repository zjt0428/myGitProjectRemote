var EquipRepairLocationGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
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
		header : "维修时间",
		dataIndex : "spendDate",
		editor : new Ext.ux.form.DateTimeField({
			format : "Y-m-d H:i:s",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d H:i:s");
			record.data.spendDate = value;
			return value;
		}
	}, {
		header : "维修诊断",
		dataIndex : "diagnosis",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.diagnosisData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.diagnosis = value;
			return value;
		}
	}, {
		width : 150,
		header : "维修班组",
		dataIndex : "repairTeam",
		editor : new Knight.ux.TreeCombo({
			url : __ctxPath + "/system/listDepartment.do"
		}),
		renderer : function(value, metadata, record) {
			if (value == undefined) {
				return;
			}
			record.data.repairTeam = value;
			return value;
		}
	},{
		header : "排除时间",
		dataIndex : "troubleshootDate",
		editor : new Ext.ux.form.DateTimeField({
			format : "Y-m-d H:i:s",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d H:i:s");
			record.data.troubleshootDate = value;
			return value;
		}
	}, {
		header : "维修工时",
		dataIndex : "repairTime",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 99999999
		})
	},  {
		header : "单价",
		dataIndex : "unitPrice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 99999999
		})
	}, {
		header : "人工费用",
		dataIndex : "labourCharges",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			record.data.labourCharges = Number(record.data.repairTime) * Number(record.data.unitPrice) ;
			return record.data.labourCharges;
		}
	} , {
		header : "备注",
		dataIndex : "remark",
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
	EquipRepairLocationGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : EquipRepairLocationListViewField,
		title : this.title,
		option : "维修配件",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(EquipRepairLocationGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.labourCharges);
		}
		return Ext.util.Format.number(summaryAmount, "0.00");
	},
	createSubModule : function() {
		return {
			repairId : this.repairId,
			spendDate : new Date(),
			troubleshootDate : new Date(),
			repairTime : 0,
			unitPrice : 0,
			labour : 0
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