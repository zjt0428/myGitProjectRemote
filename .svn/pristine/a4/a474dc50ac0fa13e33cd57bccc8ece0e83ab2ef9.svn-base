/**
 * <pre><code>
 * saveable : Boolean,
 * selectable : Boolean,
 * height : Number,
 * contractId : Number,
 * measurementData : Array
 * </code></pre>
 */
var ContractCostitemGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var columns = [ {
		width : 100,
		header : "费用项目",
		dataIndex : "costitemName",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.contractCostitemData
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.costitemName = value;
			return value;
		}
	}, {
		width : 100,
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		width : 100,
		header : "费用单价",
		dataIndex : "expense",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999999
		})
	}, {
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
	} ];
	ContractCostitemGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ContractCostitemListViewField,
		title : "进出场等费用",
		option : "合同费用项目信息",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelCostitemContractLease.do"
	}, this.grid_config || {}));
};
Ext.extend(ContractCostitemGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		var costitemName = this.getTopArrayCodeName(this.contractCostitemData) == null ? this.getTopArrayCodeName(this.contractCostitemData) : "其他";
		return {
			contractId : this.contractId,
			costitemName : costitemName,
			quantity : 0,
			expense : 0
		};
	}
});