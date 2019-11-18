var ChangeContractCategoryForm = function(a) {
	Ext.apply(this, a || {});
	var categoryCombo = $initComboBoxField("合同类别", "contractCategory", "contractCategory", {
		editable : false
	});
	var items = [ {
		xtype : "hidden",
		name : "contractIds",
		value : this.contractIds
	}, categoryCombo];
	this.buttons = [ {
		text : "确认",
		iconCls : "btn-save",
		handler : this.submit.createDelegate(this)
	}, {
		text : "取消",
		iconCls : "btn-cancel",
		handler : this.cancel.createDelegate(this)
	} ];
	ChangeContractCategoryForm.superclass.constructor.call(this, {
		title : "修改合同类别",
		width : 400,
		height : 120,
		buttonAlign : "center",
		buttons : this.buttons,
		form_config : {
			labelWidth : 85,
			items : items,
			url : __ctxPath + "/dispatch/modifyCategoryContractLease.do"
		},
	});
};
Ext.extend(ChangeContractCategoryForm, Knight.ux.FormPanelWindow, {
	submit : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("合同类别修改成功！");
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