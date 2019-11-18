var EquipBlockupActivateForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	var items = [ {
		xtype : "hidden",
		name : "ids",
		value : this.ids
	}, {
		xtype : "datefield",
		format : "Y-m-d",
		width : 145,
		editable : false,
		fieldLabel : "恢复日期",
		name : "reactivateDate",
		value : new Date()
	} ];
	EquipBlockupActivateForm.superclass.constructor.call(this, {
		title : "设备恢复日期",
		width : 400,
		height : 150,
		form_config : {
			saveable : true,
			url :  __ctxPath + "/equip/multiActivateEquipBlockup.do",
			items : items
		}
	});
};
Ext.extend(EquipBlockupActivateForm, Knight.ux.FormPanelWindow, {
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