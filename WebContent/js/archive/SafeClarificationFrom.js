var SafeClarificationFrom = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.clarificaId,
		relateModule : RelationModule.safeClarification.relateModule,
		saveable : this.saveable
	});
	var supplierFields = ["projectId","projectName","address"];
	var clarificaMans = ["clarificaManId","clarificaMan"];
	var userFields = ["clarificaHeadId", "clarificaHead","copeId", "copeName"];
	var items = [ {
		id : this.clarificaId,
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
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					width : 250,
					fieldLabel : "项目名称",
					name : "safeClarification.projectName",
					relateModule : RelationModule.project.relateModule,
					fields : supplierFields,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importProjectArchives.createDelegate(this)
				}, {
					fieldLabel : "项目地址",
					width : 250,
					name : "safeClarification.address"
				}, {
					xtype : "datefield",
					format : "Y-m-d H:i:s",
					width : 180,
					allowBlank : false,
					fieldLabel : "交底日期",
					name : "safeClarification.clarificaTime",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					single : false,
					allowBlank : true,
					disabled : !this.saveable,
					width : 250,
					fieldLabel : "交底人员",
					name : "safeClarification.clarificaMan",
					params : {
						"Q_projectId_L_NOTNULL" : 1,
						"Q_clarificaStatus_S_EQ" : 0
					},
					fields : clarificaMans,
					params : {
						"QVO_permissionFlag_S_LK" : curUserInfo.labourPermission
					},
					relateModule : RelationModule.practitioner.relateModule,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importMutilPractiArchives.createDelegate(this)
				}, {
					hidden : true,
					name : "safeClarification.clarificaManId",
				}, {
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					readOnly : true,
					width : 250,
					fieldLabel : "交底负责人",
					name : "safeClarification.clarificaHead",
					fields : userFields,
					params : {
						"QVO_permissionFlag_S_LK" : curUserInfo.labourPermission
					},
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importMutilUserArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "所属公司",
					width : 250,
					name : "safeClarification.copeName"
				}]
			}  ]
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
					name : "safeClarification.remark"
				} ]
			} ]
		}, fileAttachContainer]
	} ];
	SafeClarificationFrom.superclass.constructor.call(this, {
		title : "安全交底信息",
		animateTarget : this.animateTarget,
		y : 10,
		width : 860,
		height : 560,
		constrain: true,//禁止窗口移出浏览器屏幕
		layout : "fit",
		form_config : {
			labelWidth : 90,
			object : "safeClarification",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveSafeClarification.do",
			items : items,
			fieldMapping : SafeClarificationFieldMapping,
			hiddenField : SafeClarificationHiddenField
		}
	});
};
Ext.extend(SafeClarificationFrom, Knight.ux.FormPanelWindow, {
	importMutilUserArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [data.practiId,data.practiName,data.corpInfo.corpId,data.corpInfo.corpName]);
	},
	importProjectArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.projectId, data.projectName, data.address ]);
	},
	importMutilPractiArchives : function(datas) {
		var partakeField = this.findFormField("clarificaMan");
		var partakeFieldId = this.findFormField("clarificaManId");
		var regPartakeFieldId = ","+partakeFieldId.value+",";
		for (var i = 0; i < datas.length; i++) {
			var data = datas[i].data;
			if(regPartakeFieldId.indexOf(","+data.practiId+",") != -1){
				continue;
			}
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
		if (!Ext.isEmpty(this.clarificaId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadSafeClarification.do?clarificaId=" + this.clarificaId,
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