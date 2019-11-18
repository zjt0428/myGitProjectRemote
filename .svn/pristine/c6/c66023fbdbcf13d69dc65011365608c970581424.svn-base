var TeamsAccountKnotGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var columns = [ {
		header : "日期",
		dataIndex : "accountDate"
	}, {
		header : "类型",
		dataIndex : "knotType",
		renderer : function(value, metadata, record) {
			if (value == "1") {
				return "首次安装";
			} else if (value == "2") {
				return "顶升"
			} else {
				return "拆卸"
			}
		}
	}, {
		header : "备案编号",
		dataIndex : "recordId"
	}, {
		header : "楼号",
		dataIndex : "buildingNum"
	}, {
		header : "配件名称",
		dataIndex : "componGenericName"
	}, {
		header : "规格型号",
		dataIndex : "componSpecificName"
	}, {
		header : "单位",
		dataIndex : "measurement",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : [ [ "0", "节" ], [ "1", "米" ], [ "2", "台" ] ]
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
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			decimalPrecision : 0,
			maxValue : 999999
		}),
		renderer : function(value, metadata, record) {
			if (record.data.measurement1 == record.data.measurement) {
				record.data.quantity = value;
				return value;
			}
			if (record.data.measurement == "节") {
				value = record.data.counts;
				record.data.quantity = value;
			} else if (record.data.measurement == "米") {
				value = Number(record.data.counts) * Number(record.data.knotMetric);
				record.data.quantity = value;
			} else {
				value = 1;
				record.data.quantity = 1;
			}
			record.data.measurement1 = record.data.measurement;
			return value;
		}
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
			var accountPrice = record.data.accountPrice ? Number(record.data.accountPrice) : 0;
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
	TeamsAccountKnotGrid.superclass.constructor.call(this, Ext.apply({
		addForbidden : true,
		saveable : this.saveable,
		fields : TeamsAccountKnotListViewField,
		title : "标准节",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(TeamsAccountKnotGrid, Knight.ux.SubModuleBaseGrid, {
	loadResource : function(records) {
		for (var i = 0; i < records.length; i++) {
			var data = records[i];
			var RecordType = this.getStore().recordType;
			var recordType = new RecordType();
			Ext.apply(recordType.data, {
				accountKnotId : data.accountKnotId,
				teamsAccountId : data.teamsAccountId,
				accountDate : data.accountDate,
				knotType : data.knotType,
				recordId : data.recordId,
				buildingNum : data.buildingNum,
				componGeneric : data.componGeneric,
				componGenericName : data.componGenericName,
				componSpecific : data.componSpecific,
				componSpecificName : data.componSpecificName,
				quantity : data.quantity,
				measurement : data.measurement,
				accountPrice : this.parentForm.teamsAccount.knotPrice,
				deductQuantity : 0,
				counts : data.counts,
				knotMetric : data.knotMetric,
				practiId : data.practiId,
				practiName : data.practiName,
				projectId : data.projectId,
				projectName : data.projectName,
				summary : data.quantity * this.accountPrice
			});
			this.stopEditing();
			this.getStore().add(recordType);
			this.startEditing(0, 0);
		}
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