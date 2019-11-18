var AmountReceiveShareGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		width : 50,
		header : "期数",
		dataIndex : "periods"
	}, {
		header : "预计回款额",
		dataIndex : "receivement"
	}, {
		header : "回款日期",
		dataIndex : "receiveDate"
	}, {
		header : "票据类型",
		dataIndex : "invoiceTypeName"
	}, {
		header : "已回款金额",
		dataIndex : "alreadyReceivement"
	}, {
		header : "分摊费用",
		dataIndex : "presentReceivement",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999999
		})
	} ];
	AmountReceiveShareGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "回款计划分摊",
		option : "分摊计划",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : AmountReceiveShareListViewField,
		columns : columns,
		delurl : __ctxPath + "/fund/multiDelShareAmountReceive.do"
	}, this.grid_config || {}));
};
Ext.extend(AmountReceiveShareGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.receivementId == data.receivementId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var recordType = new RecordType();
		Ext.apply(recordType.data, {
			amountReceiveId : this.amountReceiveId,
			receivementId : data.receivementId,
			relateId : this.relateId,
			relateSerial : this.relateSerial,
			relateModule : this.relateModule,
			relateModuleName : this.relateModuleName,
			periods : data.periods,
			receivement : data.receivement,
			receiveDate : data.receiveDate,
			alreadyReceivement : data.alreadyReceivement,
			issueInvoice : data.issueInvoice,
			invoiceType : data.invoiceType,
			invoiceTypeName : data.invoiceTypeName,
			remark : data.remark,
			presentReceivement : 0
		});
		this.stopEditing();
		this.getStore().add(recordType);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new ReceivementSelector({
			params : {
				"Q_relateId_L_EQ" : this.relateId,
				"Q_relateModule_S_EQ" : this.relateModule,
				"Q_status_S_GE" : "5",
				"Q_status_S_LT" : "7"
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