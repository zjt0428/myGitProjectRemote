var RiskForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.riskId,
		relateModule : RelationModule.risk.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "通知编号",
					name : "risk.riskSerial"
				}, {
					readOnly : true,
					fieldLabel : "事故设备",
					name : "risk.equipment.equipGenericName"
				}, {
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "检查部门",
					name : "risk.checkDepartment"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "整改单位",
					name : "risk.rectifyEntName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "主题",
					name : "risk.riskTheme"
				}, {
					readOnly : true,
					fieldLabel : "规格型号",
					name : "risk.equipment.equipSpecificName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "检查单位",
					name : "risk.checkCustomName",
					relateModule : RelationModule.customer.relateModule,
					importhandler : this.importCustomerArchives.createDelegate(this)
				}, {
					maxLength : 32,
					fieldLabel : "整改负责人",
					name : "risk.improvePerson"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "risk.equipment.exwSerial"
				}, {
					readOnly : true,
					fieldLabel : "备案编号",
					name : "risk.equipment.recordId"
				}, {
					maxLength : 32,
					fieldLabel : "参加检查人",
					name : "risk.inspector"
				}, {
					xtype : "datefield",
					width : 125,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "整改日期",
					name : "risk.improveDate"
				} ]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					maxLength : 32,
					fieldLabel : "检查负责人",
					name : "risk.checkPerson"
				}, {
					xtype : "datefield",
					width : 125,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "检查日期",
					name : "risk.checkDate"
				}, {
					maxLength : 32,
					fieldLabel : "复查人",
					name : "risk.reviewPerson"
				}, {
					xtype : "datefield",
					width : 125,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "复查日期",
					name : "risk.reviewDate"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "risk.project.projectName",
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProjectArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					anchor : "92%",
					height : 48,
					xtype : "textarea",
					fieldLabel : "现场存在问题",
					name : "risk.riskDesc"
				}, {
					anchor : "92%",
					height : 48,
					xtype : "textarea",
					fieldLabel : "复查意见",
					name : "risk.riskDesc"
				}, {
					anchor : "92%",
					readOnly : true,
					fieldLabel : "项目地址",
					name : "risk.project.address"
				} ]
			} ]
		}, fileAttachContainer ]
	} ];
	RiskForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 480,
		form_config : {
			title : "隐患上报",
			object : "risk",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveRisk.do",
			items : items,
			fieldMapping : RiskFieldMapping,
			hiddenField : RiskHiddenField
		}
	});
};
Ext.extend(RiskForm, Knight.ux.FormPanelWindow, {
	importProjectArchives : function(data) {
		this.setMultiFieldValue([ "project.projectId", "project.projectName", "project.address" ], [ data.projectId, data.projectName, data.address ]);
	},
	importCustomerArchives : function(data) {
		this.setMultiFieldValue([ "checkCustom", "checkCustomName" ], [ data.customerId, data.customerName ]);
	},
	importCorpInfoArchives : function(data) {
		this.setMultiFieldValue([ "rectifyEnt", "rectifyEntName" ], [ data.corpId, data.corpName ]);
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
		if (!Ext.isEmpty(this.riskId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/safety/loadRisk.do?riskId=" + this.riskId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "equipId", "equipGenericName", "equipSpecificName", "recordId", "exwSerial" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(this.equipment, fieldNames));
		}
	}
});