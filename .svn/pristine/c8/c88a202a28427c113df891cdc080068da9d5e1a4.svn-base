var OverduePaymentForm = function(a) {
	Ext.apply(this, a || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮
	var items = [ {
		readOnly : true,
		fieldLabel : "催款编号",
		name : "overduePayment.overduePaymentSerial"
	}, {
		xtype : "relationCompositeField",
		readOnly : true,
		allowBlank : false,
		fieldLabel : "承租单位",
		name : "overduePayment.customerName",
		fields : [ "customerId", "customerName" ],
		relateModule : RelationModule.customer.relateModule,
		importhandler : this.importCustomerArchives.createDelegate(this)
	}, {
		xtype : "relationCompositeField",
		readOnly : true,
		allowBlank : false,
		fieldLabel : "出租单位",
		name : "overduePayment.corpName",
		fields : [ "corpId", "corpName" ],
		relateModule : RelationModule.corp.relateModule,
		importhandler : this.importCorpArchives.createDelegate(this)
	} ];
	OverduePaymentForm.superclass.constructor.call(this, {
		title : "催款函",
		width : 320,
		height : 200,
		form_config : {
			labelWidth : 85,
			saveable : this.saveable,
			object : "overduePayment",
			items : items,
			url : __ctxPath + "/dispatch/saveOverduePayment.do",
			fieldMapping : OverduePaymentFieldMapping,
			hiddenField : OverduePaymentHiddenField
		}
	});
};
Ext.extend(OverduePaymentForm, Knight.ux.FormPanelWindow, {
	importCustomerArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.customerId, data.customerName ]);
	},
	importCorpArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.corpId, data.corpName ]);
	},
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	}
});