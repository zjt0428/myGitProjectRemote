var TeamsAccountLogisticsGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var columns = [ {
		header : "日期",
		dataIndex : "accountDate",
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
			record.data.accountDate = value;
			return value;
		}
	}, {
		header : "费用类别",
		dataIndex : "amountType",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "规格型号",
		dataIndex : "specificName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "单位",
		dataIndex : "measurement",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			decimalPrecision : 0,
			maxValue : 999999
		})
	}, {
		header : "单价",
		dataIndex : "accountPrice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		header : "应扣除数",
		dataIndex : "deductQuantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			decimalPrecision : 0,
			maxValue : 999999
		})
	}, {
		width : 80,
		header : "租金累计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			var quantity = Number(record.data.quantity);
			var accountPrice = Number(record.data.accountPrice);
			var deductQuantity = Number(record.data.deductQuantity);
			record.data.summary = (quantity - deductQuantity) * accountPrice;
			return Ext.util.Format.number(record.data.summary, "0.00");
		}
	}, {
		header : "班组负责人",
		dataIndex : "practiName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "项目名称",
		dataIndex : "projectName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	} ];
	TeamsAccountLogisticsGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : TeamsAccountLogisticsListViewField,
		title : "运输费",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelLogisticsTeamsAccount.do"
	}, this.grid_config || {}));
};
Ext.extend(TeamsAccountLogisticsGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			quantity : 0,
			deductQuantity : 0,
			accountPrice : 0
		};
	},
	getTotalDeductAmount : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.deductQuantity) * Number(r.accountPrice);
		}
		return summaryAmount;
	},
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.summary);
		}
		return summaryAmount;
	}
});