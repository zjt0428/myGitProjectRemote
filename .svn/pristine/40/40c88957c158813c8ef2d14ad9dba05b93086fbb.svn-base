var TeamsAccountWallGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var columns = [ {
		header : "日期",
		dataIndex : "accountDate"
	}, {
		header : "类型",
		dataIndex : "wallType",
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
			codeData : [ [ "0", "道" ], [ "1", "套" ] ]
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
	TeamsAccountWallGrid.superclass.constructor.call(this, Ext.apply({
		addForbidden : true,
		saveable : this.saveable,
		fields : TeamsAccountWallListViewField,
		title : "附墙",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns
	}, this.grid_config || {}));
};
Ext.extend(TeamsAccountWallGrid, Knight.ux.SubModuleBaseGrid, {
	loadResource : function(records) {
		for (var i = 0; i < records.length; i++) {
			var data = records[i];
			var RecordType = this.getStore().recordType;
			var recordType = new RecordType();
			Ext.apply(recordType.data, {
				accountWallId : data.accountWallId,
				teamsAccountId : this.teamsAccountId,
				accountDate : data.accountDate,
				wallType : data.wallType,
				recordId : data.recordId,
				buildingNum : data.buildingNum,
				componGeneric : data.componGeneric,
				componGenericName : data.componGenericName,
				componSpecific : data.componSpecific,
				componSpecificName : data.componSpecificName,
				measurement : data.measurement,
				quantity : data.quantity,
				accountPrice : this.parentForm.teamsAccount.wallAttachePrice,
				deductQuantity : 0,
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