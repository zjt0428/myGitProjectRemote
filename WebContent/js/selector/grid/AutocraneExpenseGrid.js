var AutocraneExpenseGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	var specificNameData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "AUTOCRANE_MODEL"
	});
//	specificNameData : specificNameData;
	var columns = [	{
		header : "规格型号",
		dataIndex : "specificName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : specificNameData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.specificName = value;
			return value;
		}
	},  {
		header : "单价",
		dataIndex : "accountPrice",
		editor : new Ext.form.NumberField({
			maxValue : 999999,
			minValue : 0,
			value : 0
		}),
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			maxValue : 9999,
			minValue : 0,
			allowDecimals: true, 
			value : 0
		}),
	}, {
		header : "台班",
		dataIndex : "machineTeam",
		editor : new Ext.form.NumberField({
			maxValue : 9999,
			minValue : 0,
			allowDecimals: true, 
			value : 0
		})
	}, {
		header : "合计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			var accountPrice = Number(record.data.accountPrice);
			var machineTeam = Number(record.data.machineTeam);
			var quantity = Number(record.data.quantity);
			summary = accountPrice * quantity * machineTeam;
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
	AutocraneExpenseGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : AutocraneExpenseListViewField,
		title : "汽吊费用",
		option : "汽吊费用",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelExpensesAutocrane.do"
	}, this.grid_config || {}));
};
Ext.extend(AutocraneExpenseGrid, Knight.ux.SubModuleBaseGrid, {
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.summary);
		}
		return summaryAmount;
	},
	createSubModule : function() {
		return {
			accountPrice : 0,
			machineTeam : 1,
			quantity : 1
		};
	}
});