var ComponentHoldForm = function(a) {
	Ext.apply(this, a || {});
	var items = [ {
		xtype : "hidden",
		name : "ids",
		value : this.ids
	}, {
		xtype : "numberfield",
		maxValue : 9999999,
		fieldLabel : "调整数量",
		name : "number",
		value : 0,
	},{
		xtype : "hidden",
		name : "userId",
		value : this.userId
	},{
		xtype : "hidden",
		name : "userName",
		value : this.userName
	}];
	this.buttons = [ {
		text : "确认",
		iconCls : "btn-save",
		handler : this.submit.createDelegate(this)
	}, {
		text : "取消",
		iconCls : "btn-cancel",
		handler : this.cancel.createDelegate(this)
	} ];
	ComponentHoldForm.superclass.constructor.call(this, {
		title : "库存调整",
		width : 400,
		height : 120,
		buttonAlign : "center",
		buttons : this.buttons,
		userName : this.userName,
		userId : this.userId,
		form_config : {
			labelWidth : 85,
			items : items,
			url : __ctxPath + "/archive/holdAdjustComponent.do"
		}
	});
};
Ext.extend(ComponentHoldForm, Knight.ux.FormPanelWindow, {
	submit : function() {
		$formsubmit(this.getForm(), function(c, e) {
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