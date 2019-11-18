var ComponentExamineForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;

	var items = [{
		xtype : "datefield",
		width : 130,
		allowBlank : true,
		editable : false,
		format : "Y-m-d",
		fieldLabel : "防坠器检测日期",
		name : "component.leftcageCheckDate",
		value : new Date()
	}];
	ComponentExamineForm.superclass.constructor.call(this, {
		title : "零配件年龄信息",		
		height : 200,
		width :300,
		form_config : {
			labelWidth : 90,
			object : "component",
			saveable : this.saveable,
			url : __ctxPath + "/archive/examineComponent.do",
			items : items,
			fieldMapping : ComponentFieldMapping,
			hiddenField : ComponentHiddenField
		}
	});
};
Ext.extend(ComponentExamineForm, Knight.ux.FormPanelWindow, {	
	loadFormData : function() {
		if (!Ext.isEmpty(this.componId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadComponent.do?componId=" + this.componId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];					
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	},
	saveFormData : function() {
		if (this.getForm().isValid()) {
			$formsubmit(this.getForm(), function() {
				$toast("信息操作成功！");
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this));
		}
	}
});