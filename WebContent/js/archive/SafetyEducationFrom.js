var SafetyEducationFrom = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.safetyId,
		relateModule : RelationModule.safetyEducation.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		id : this.safetyId,
		xtype : "hidden",
	}, {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					width : 250,
					fieldLabel : "教育主题",
					name : "safetyEducation.safetySerial"
				}, {
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "授课人",
					width : 250,
					name : "safetyEducation.teachMan",
					fields : [ "teachManId", "teachMan"],
					params : {
						"QVO_permissionFlag_S_LK" : curUserInfo.labourPermission
					},
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importMaterialPractiArchives.createDelegate(this)
				}, {
					width : 500,
					height : 50,
					fieldLabel : "教育内容",
					name : "safetyEducation.safetyDetail"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d H:i:s",
					width : 250,
					editable : false,
					fieldLabel : "教育日期",
					name : "safetyEducation.edcationTime",
					value : new Date()
				}, {
					xtype : "relationCompositeField",
					single : false,
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "受教育人员",
					width : 250,
					name : "safetyEducation.educaMan",
					params : {
						"QVO_permissionFlag_S_LK" : curUserInfo.labourPermission
					},
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importMutilPractiArchives.createDelegate(this)
				}, {
					hidden : true,
					name : "safetyEducation.educaManId",
				} ]
			} ]
		}, {
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.99,
				items : [ {
					xtype : "textarea",
					maxLength : 128,
					maxLengthText : 600,
					anchor : "95%",
					height : "60",
					fieldLabel : "备注",
					name : "safetyEducation.remark"
				} ]
			} ]
		},fileAttachContainer]
	} ];
	SafetyEducationFrom.superclass.constructor.call(this, {
		title : "安全交底信息",
		animateTarget : this.animateTarget,
		y : 10,
		width : 860,
		height : 560,
		constrain: true,//禁止窗口移出浏览器屏幕
		layout : "fit",
		form_config : {
			labelWidth : 90,
			object : "safetyEducation",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveSafetyEducation.do",
			items : items,
			fieldMapping : SafetyEducationFieldMapping,
			hiddenField : SafetyEducationHiddenField
		}
	});
};
Ext.extend(SafetyEducationFrom, Knight.ux.FormPanelWindow, {
	importMaterialPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [data.practiId,data.practiName]);
	},
	importMutilPractiArchives : function(datas) {
		var partakeField = this.findFormField("educaMan");
		var partakeFieldId = this.findFormField("educaManId");
		console.log(partakeField.getValue());
		for (var i = 0; i < datas.length; i++) {
			var data = datas[i].data;
			if (Ext.isEmpty(partakeField.getValue())) {
				partakeField.setValue(data.practiName);
				partakeFieldId.setValue(data.practiId);
			} else {
				partakeField.setValue(partakeField.getValue() + "," + data.practiName);
				partakeFieldId.setValue(partakeFieldId.getValue() + "," + data.practiId);
			}
		}
	},
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.safetyId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadSafetyEducation.do?safetyId=" + this.safetyId,
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