var ChangeContractNumForm = function(a) {
	Ext.apply(this, a || {});
	var items = [ {
		xtype : "hidden",
		name : "ids",
		value : this.contractId
	}, {
		fieldLabel : "修改合同编号",
		name : "number",
		value : this.contractNo,
		selectOnFocus : true,
		enableKeyEvents : true,
		listeners:{
		    keyup:function(textField, e){
		           if(e.getKey() == 13){
		        	  this.submit();
		           }
		     }.createDelegate(this)
		}
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
	ChangeContractNumForm.superclass.constructor.call(this, {
		title : "修改合同编号",
		width : 400,
		height : 120,
		buttonAlign : "center",
		buttons : this.buttons,
		form_config : {
			labelWidth : 85,
			items : items,
			url : __ctxPath + "/dispatch/changeContractLease.do"
		},
	});
};
Ext.extend(ChangeContractNumForm, Knight.ux.FormPanelWindow, {
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