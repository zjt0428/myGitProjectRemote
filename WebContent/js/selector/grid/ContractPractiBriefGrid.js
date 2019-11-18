/**
 * <pre><code>
 * saveable : Boolean,
 * selectable : Boolean,
 * height : Number,
 * contractId : Number,
 * kindWorkData : Array,
 * measurementData : Array
 * </code></pre>
 */
var ContractPractiBriefGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();

	var columns = [ {
		width : 80,
		header : this.kindWorkHeader,
		dataIndex : "kindWork",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.kindWorkData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			record.data.kindWork = value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			return value;
		}
	}, {
		header : this.quantityHeader,
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 16
		})
	}, {
		header : this.expenseHeader,
		dataIndex : "expense",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 7
		})
	}, {
		hidden : this.measurementHidden,
		width : 80,
		header : "计量单位",
		dataIndex : "measurement",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.measurementData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.measurement = value;
			return value;
		}
	}, {
		header : "预计进场时间",
		dataIndex : "startDate",
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
			record.data.startDate = value;
			return value;
		}
	}, {
		hidden : this.endDateHidden,
		header : "预计退场时间",
		dataIndex : "endDate",
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
			record.data.endDate = value;
			return value;
		}
	}, {
		hidden : this.summaryHidden,
		header : "工资小计",
		dataIndex : "summary",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 10
		}),
		renderer : function(value, metadata, record) {
			if (value != record.data.summary1) {
				record.data.summary1 = value;
				return value;
			}
			var startDate = Date.parseDate(record.data.startDate, "Y-m-d");
			var endDate = Date.parseDate(record.data.endDate, "Y-m-d");
			var rent = record.data.expense;
			var quantity = record.data.quantity;
			var summary = rent * quantity * (KnightUtil.date.monthDiff(startDate, endDate) + 1);
			record.data.summary = summary;
			record.data.summary1 = summary;
			return summary;
		}
	}, {
		hidden : this.remarkHidden,
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	} ];
	ContractPractiBriefGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ContractPractiBriefListViewField,
		title : "合同指派司机",
		option : "合同人员信息",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelPractiBriefContractLease.do"
	}, this.grid_config || {}));
};
Ext.extend(ContractPractiBriefGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			contractId : this.contractId,
			startDate : this.currentDate,
			endDate : this.currentDate,
			quantity : 0,
			expense : 0
		};
	}
});