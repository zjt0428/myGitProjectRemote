var CarExpenseGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [{
		header : "费用项目",
		dataIndex : "expense",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "支出金额",
		dataIndex : "paymentAmount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		header : "用途说明",
		dataIndex : "instructions",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 16
		})
	}, {
		header : "经办人",
		dataIndex : "practiName",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 16
		})
	}, {
		header : "发生时间",
		dataIndex : "spendDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : true,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.spendDate = value;
			return value;
		}
	}, {
		header : "里程",
		dataIndex : "mileage",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 16
		})
	}, {
		header : "油耗",
		dataIndex : "oilWear",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 16
		})
	}, {
		width : 130,
		header : "备 注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : true,
			maxLength : 128
		})
	} ];
	CarExpenseGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : CarExpenseListViewField,
		title : "费用信息",
		option : "费用信息",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelExpenseCar.do"
	}, this.grid_config || {}));
};
Ext.extend(CarExpenseGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			carId : this.carId,
			name : null,
			money : 0,
			usefor : null,
			practiName : null,
			spendDate : new Date(),
			remark : null
		};
	}
});