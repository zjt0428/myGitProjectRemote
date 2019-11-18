var DispatchAutocraneGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "规格型号",
		dataIndex : "specificName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "单价",
		dataIndex : "rentStandard",
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
			value : 0
		}),
	}, {
		header : "台次",
		dataIndex : "machineTeam",
		editor : new Ext.form.NumberField({
			maxValue : 9999,
			minValue : 0,
			value : 0
		})
	}, {
		header : "合计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			var rentStandard = Number(record.data.rentStandard);
			var machineTeam = Number(record.data.machineTeam);
			var quantity = Number(record.data.quantity);
			summary = rentStandard * quantity * machineTeam;
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
	DispatchAutocraneGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : DispatchAutocraneListViewField,
		title : "汽车吊",
		option : "调度汽车吊",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelAutocraneDispatch.do"
	}, this.grid_config || {}));
};
Ext.extend(DispatchAutocraneGrid, Knight.ux.SubModuleBaseGrid, {
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
			dispatchId : this.dispatchId,
			machineTeam : 0,
			rentStandard : 0,
			quantity : 1
		};
	}
});