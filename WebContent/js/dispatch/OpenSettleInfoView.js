var OpenSettleInfoView = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	this.closedSettleInfoGrid = new ClosedSettleInfoGrid({
		saveable : this.saveable,
		years : new Date().getFullYear()
	});	
	var items = [ {
		hidden : true,
		fieldLable : "id",
		name : "closedSettleInfo.closeSettleId"
	},{
		xtype : "datefield",
		format : "Y-m",
		allowBlank : false,
		fieldLabel : "选择反关账月份",
		name : "closedSettleInfo.months"
	},{
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.closedSettleInfoGrid]
	} ];
	this.formPanel = new Ext.form.FormPanel({
		frame : false,
		bodyStyle : "padding : 5px;",
		layout : "form",
		labelAlign : "right",
		defaultType : "textfield",
		defaults : {
			anchor : "95%,95%",
			allowBlank : true,
			selectOnFocus : true,
			msgTarget : "side"
		},
		url : __ctxPath + "/dispatch/openClosedSettleInfo.do",
		reader : new Ext.data.JsonReader({
			root : "result"
		}, ClosedSettleInfoFieldMapping),
		items : items
	});

	this.buttons = [ {
		text : "反关账",
		iconCls : "btn-save",
		handler : this.submitForm.createDelegate(this)
	}, {
		text : "取消",
		iconCls : "btn-del",
		handler : this.cancel.createDelegate(this)
	} ];
	OpenSettleInfoView.superclass.constructor.call(this, {
		title : "结算反关账",
		layout : "fit",
		width : 420,
		height : 440,
		minWidth : 399,
		minHeight : 99,
		items : this.formPanel,
		border : false,
		modal : true,
		plain : true,
		buttonAlign : "center",
		buttons : this.buttons,
	});
};
Ext.extend(OpenSettleInfoView, Ext.Window, {
	submitForm : function() {
		$formsubmit(this.formPanel.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	cancel : function() {
		this.close();
	}
});