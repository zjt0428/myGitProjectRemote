var ConstructOperationTaskGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var columns = [ {
		width : 100,
		header : "任务内容",
		dataIndex : "contents",
		editor : new Ext.form.ComboBox({
			allowBlank : false,
			emptyText : "请选择...",
			mode : "local",
			triggerAction : "all",
			store : this.constructTaskData
		}),
		  renderer : function(value, metadata, record) {
	            value = Ext.isEmpty(value) ? this.getEditor().value : value;
	            var store = this.getEditor().store;
	            var index = store.find("field1", value);
	            if (index != -1) {
	                value = store.getAt(index).data.field2;
	            }
	            record.data.contents = value;
	            return value;
	        }
	}, {
		width : 60,
		header : "单位",
		dataIndex : "unit",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 8
		})
	}, {
		width : 60,
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			decimalPrecision : 0,
			maxValue : 999999
		})
	}, {
		width : 60,
		header : "单价",
		dataIndex : "unitPrice",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	}, {
		width : 60,
		header : "合计",
		dataIndex : "summary",
		renderer : function(value, metadata, record) {
			var quantity = Number(record.data.quantity);
			var unitPrice = Number(record.data.unitPrice);
			record.data.summary = quantity * unitPrice;
			return Ext.util.Format.number(record.data.summary, "0.00");
		}
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	} ];
	ConstructOperationTaskGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		fields : ConstructOperationTaskListViewField,
		title : this.title ? this.title : "任务清单",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		tbarItems : this.tbarItems,
		delurl : __ctxPath + "/dispatch/multiDelTaskConstructOperation.do"
	}, this.grid_config || {}));
};
Ext.extend(ConstructOperationTaskGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			contents : data.contents,
			unit : data.unit,
			quantity : data.quantity,
			unitPrice : data.unitPrice,
			summary : data.summary,
			remark : data.remark
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this);
		}
	},
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
			quantity : 0,
			unitPrice : 0,
			summary : 0
		};
	}
});