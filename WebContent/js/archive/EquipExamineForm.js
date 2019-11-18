var EquipExamineForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var items = [ {
		xtype : "datefield",
		width : 130,
		editable : false,
		format : "Y-m-d",
		fieldLabel : "性能检测日期",
		name : "equipment.examineDate"
	}]
	EquipExamineForm.superclass.constructor.call(this, {
		centerLayout : true,
		width : 370,
		height : 200,
		title : "年检信息",
		iconCls : "menu-set-role",
		form_config : {
			labelWidth : 90,
			object : "equipment",
			saveable : true,
			url : __ctxPath + "/archive/examineEquipment.do",
			items : items,
			fieldMapping : EquipmentFieldMapping,
			hiddenField : EquipmentHiddenField
		}
	});
};
Ext.extend(EquipExamineForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		$formsubmit(this.getForm(), function(e, g) {
			$toast("保存成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.equipId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadEquipment.do?equipId=" + this.equipId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this)
			});
		}
	}
});