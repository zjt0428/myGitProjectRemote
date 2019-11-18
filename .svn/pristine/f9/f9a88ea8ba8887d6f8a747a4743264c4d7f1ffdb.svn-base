var AmountPaymentShareGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		width : 50,
		header : "期数",
		dataIndex : "periods"
	}, {
		header : "预计付款额",
		dataIndex : "payment"
	}, {
		header : "付款日期",
		dataIndex : "payDate"
	}, {
		header : "已付款金额",
		dataIndex : "alreadyPayment"
	}, {
		header : "分摊费用",
		dataIndex : "presentPayment",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999
		})
	} ];
	AmountPaymentShareGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "付款计划分摊",
		option : "分摊计划",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : AmountPaymentShareListViewField,
		columns : columns,
		delurl : __ctxPath + "/fund/multiDelShareAmountPayment.do"
	}, this.grid_config || {}));
};
Ext.extend(AmountPaymentShareGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.instalmentId == data.instalmentId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			amountPaymentId: this.amountPaymentId,
			instalmentId: data.instalmentId,
			relateId: data.relateId,
			relateSerial: data.relateSerial,
			relateModule: data.relateModule,
			relateModuleName: data.relateModuleName,
			periods: data.periods,
			payment: data.payment,
			payDate: data.payDate,
			alreadyPayment: data.alreadyPayment,
			remark: data.remark,
			presentPayment: 0,
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new InstalmentSelector({
			params : {
				"Q_relateId_L_EQ" : this.relateId,
				"Q_relateModule_S_EQ" : this.relateModule,
				"Q_status_S_GE" : "0",
				"Q_status_S_LT" : "2"
			},
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});