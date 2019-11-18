var ReceivementGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.title = this.title ? this.title : "回款计划";
	this.showremark = this.showremark ? true : false;
	this.invoiceTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "invoiceType"
	});
	var invoiceFlagChecked = new Ext.grid.CheckColumn({
		width : 40,
		header : "是否先开票",
		dataIndex : "invoiceFlag"
	});
	var columns = [ {
		header : "关联业务",
		dataIndex : "relateModuleName"
	}, {
		header : "业务名称",
		dataIndex : "relateSerial"
	}, {
		header : "期数",
		sortable : true,
		dataIndex : "periods",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 3
		})
	}, {
		header : "预计回款额",
		dataIndex : "receivement",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 16
		})
	}, {
		header : "回款日期",
		dataIndex : "receiveDate",
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
			record.data.receiveDate = value;
			return value;
		}
	}, invoiceFlagChecked, {
		header : "票据类型",
		dataIndex : "invoiceType",
		editor : new Ext.form.ComboBox({
			emptyText : '请选择...',
			mode : 'local',
			editable : false,
			triggerAction : 'all',
			valueField : "code",
			displayField : "name",
			store : new Ext.data.SimpleStore({
				fields : [ "code", "name" ],
				data : this.invoiceTypeData
			})
		}),
		renderer : function(value, metadata, record) {
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				value = store.getAt(index).data.name;
			}
			record.data.invoiceTypeName = value;
			return value;
		}
	}, {
		header : "已回款金额",
		dataIndex : "alreadyReceivement"
	}, {
		header : "回款状态",
		dataIndex : "statusName"
	} ];
	if (this.showremark) {
		columns.push({
			header : "备注",
			dataIndex : "remark"
		});
	}
	ReceivementGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ReceivementListViewField,
		title : this.title,
		option : "回款计划",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/archive/multiDelReceivement.do",
		grid_view : {
			plugins : invoiceFlagChecked
		},
		listeners : {
			afterrender : this.loadGridStore.createDelegate(this)
		}
	}, this.grid_config || {}));
};
Ext.extend(ReceivementGrid, Knight.ux.SubModuleBaseGrid, {
	loadGridStore : function() {
		this.getStore().sort("periods", "ASC");
	},
	getTotalReceivement : function() {
		var summaryAmount = 0;
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.receivement);
		}
		return summaryAmount;
	},
	createSubModule : function() {
		return {
			relateId : this.relateId,
			relateSerial : this.relateSerial,
			relateModule : this.relateModule,
			relateModuleName : this.relateModuleName,
			periods : this.getStore().getCount() + 1,
			receivement : 0,
			receiveDate : new Date(),
			invoiceType : "1",
			invoiceFlag : false,
			presentReceivement : 0,
			status : 0,
			statusName : "待收款"
		};
	}
});