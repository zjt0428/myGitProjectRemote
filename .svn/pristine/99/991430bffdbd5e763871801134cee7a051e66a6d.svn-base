var RiskReportForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.riskReportId,
		relateModule : RelationModule.riskReport.relateModule,
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
					fieldLabel : "反馈编号",
					name : "riskReport.reportSerial"
				}, {
					readOnly : true,
					fieldLabel : "事故设备",
					name : "riskReport.risk.equipment.equipGenericName"
				}, {
					readOnly : true,
					fieldLabel : "项目名称",
					name : "riskReport.risk.project.projectName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "通知编号",
					name : "riskReport.risk.riskSerial"
				}, {
					readOnly : true,
					fieldLabel : "规格型号",
					name : "riskReport.risk.equipment.equipSpecificName"
				}, {
					readOnly : true,
					fieldLabel : "项目地址",
					name : "riskReport.risk.project.address"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "riskReport.risk.equipment.exwSerial"
				}, {
					readOnly : true,
					fieldLabel : "备案编号",
					name : "riskReport.risk.equipment.recordId"
				}, {
					readOnly : true,
					fieldLabel : "施工单位",
					name : "riskReport.risk.checkCustomName"
				} ]
			} ]
		} ]
	}, {
		xtype : "fieldset",
		title : "反馈情况",
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
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "检查部位",
					name : "riskReport.checkPosition"
				}, {
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "整改负责人",
					name : "riskReport.improvePerson"
				}, {
					xtype : "datefield",
					allowBlank : false,
					width : 130,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "完成日期",
					name : "riskReport.completeDate"
				}, {
					xtype : "radiogroup",
					disabled : !this.saveable,
					fieldLabel : "整改结果",
					items : [ {
						boxLabel : "可行",
						name : "riskReport.improveResult",
						inputValue : 1,
						checked : true
					}, {
						boxLabel : "不可行",
						name : "riskReport.improveResult",
						inputValue : 0
					} ]
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					anchor : "95%",
					height : 48,
					xtype : "textarea",
					fieldLabel : "整改结果说明",
					name : "riskReport.improveDesc"
				}, {
					anchor : "95%",
					height : 48,
					xtype : "textarea",
					fieldLabel : "其它说明",
					name : "riskReport.remark"
				} ]
			} ]
		}, fileAttachContainer ]
	} ];
	RiskReportForm.superclass.constructor.call(this, {
		height : 450,
		form_config : {
			title : "整改反馈",
			object : "riskReport",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveRiskReport.do",
			items : items,
			fieldMapping : RiskReportFieldMapping,
			hiddenField : RiskReportHiddenField
		}
	});
};
Ext.extend(RiskReportForm, Knight.ux.FormPanelWindow, {
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
		if (!Ext.isEmpty(this.riskReportId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/safety/loadRiskReport.do?riskReportId=" + this.riskReportId,
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
			this.setMultiFieldValue(this.paddingFieldNames("risk.equipment", fieldNames), this.paddingValues(this.risk.equipment, fieldNames));
			fieldNames = [ "projectName", "address" ];
			this.setMultiFieldValue(this.paddingFieldNames("risk.project", fieldNames), this.paddingValues(this.risk.project, fieldNames));
			fieldNames = [ "riskId", "riskSerial", "checkCustomName" ];
			this.setMultiFieldValue(this.paddingFieldNames("risk", fieldNames), this.paddingValues(this.risk, fieldNames));
		}
	}
});