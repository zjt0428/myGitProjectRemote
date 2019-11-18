var InspectProjectImageForm = function(a) {
	Ext.apply(this, a || {});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.inprojectId,
		relateModule : RelationModule.inspectProject.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		id : this.inprojectId,
		xtype : "hidden",
	}, fileAttachContainer];
	InspectProjectImageForm.superclass.constructor.call(this, {
		title : "查看考勤自检项目图片",
		id : "InspectProjectImageForm",
		width : 1000,
		height : 200,
		buttonAlign : "center",
		buttons : this.buttons,
		form_config : {
			labelWidth : 85,
			items : items,
			object : "inspectProjectRecord",
			fieldMapping : InspectProjectRecordFieldMapping,
			hiddenField : InspectProjectRecordHiddenField
		},
	});
};
Ext.extend(InspectProjectImageForm, Knight.ux.FormPanelWindow, {
	loadFormData : function() {
		if (!Ext.isEmpty(this.inprojectId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadInspectProjectRecord.do?inprojectId=" + this.inprojectId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
});