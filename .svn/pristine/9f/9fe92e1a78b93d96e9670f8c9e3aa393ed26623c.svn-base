var AccidentReportForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.accidentReportId,
		relateModule : RelationModule.accidentReport.relateModule,
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
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "报告编号",
					name : "accidentReport.reportSerial"
				}, {
					fieldLabel : "事故设备",
					name : "accidentReport.accident.equipment.equipGenericName"
				}, {
					fieldLabel : "规格型号",
					name : "accidentReport.accident.equipment.equipSpecificName"
				}, {
					fieldLabel : "事故类别",
					name : "accidentReport.accident.accidentCategory"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "事故编号",
					name : "accidentReport.accident.accidentSerial"
				}, {
					fieldLabel : "备案编号",
					name : "accidentReport.accident.equipment.recordId"
				}, {
					fieldLabel : "项目名称",
					name : "accidentReport.accident.project.projectName"
				}, {
					fieldLabel : "事故级别",
					name : "accidentReport.accident.accidentLevelName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "发生时间",
					name : "accidentReport.accident.accidentDate"
				}, {
					fieldLabel : "出厂编号",
					name : "accidentReport.accident.equipment.exwSerial"
				}, {
					fieldLabel : "事故地址",
					name : "accidentReport.accident.address"
				}, {
					fieldLabel : "事故责任单位",
					name : "accidentReport.accident.responsibleUnit"
				} ]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "主要责任人",
					name : "accidentReport.accident.responsible"
				}, {
					allowBlank : false,
					maxLength : 32,
					fieldLabel : "事故填报单位",
					name : "accidentReport.providedUnit"
				}, {
					xtype : "datefield",
					width : 125,
					allowBlank : false,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "事故填报时间",
					name : "accidentReport.providedDate"
				}, {
					xtype : "radiogroup",
					disabled : !this.saveable,
					fieldLabel : "是否结案",
					items : [ {
						boxLabel : "是",
						name : "accidentReport.status",
						inputValue : 1,
						checked : true
					}, {
						boxLabel : "否",
						name : "accidentReport.status",
						inputValue : 0
					} ]
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					xtype : "textarea",
					anchor : "95%",
					maxLength : 1000,
					height : 48,
					fieldLabel : "防止措施",
					name : "accidentReport.prevent"
				}, {
					xtype : "textarea",
					anchor : "95%",
					maxLength : 1000,
					height : 48,
					fieldLabel : "参加事故分析人员",
					name : "accidentReport.participants"
				} ]
			} ]
		}, fileAttachContainer ]
	} ];
	AccidentReportForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 450,
		form_config : {
			title : "事故报告",
			object : "accidentReport",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveAccidentReport.do",
			items : items,
			fieldMapping : AccidentReportFieldMapping,
			hiddenField : AccidentReportHiddenField
		}
	});
};
Ext.extend(AccidentReportForm, Knight.ux.FormPanelWindow, {
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
		if (!Ext.isEmpty(this.accidentReportId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/safety/loadAccidentReport.do?accidentReportId=" + this.accidentReportId,
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
			this.setMultiFieldValue(this.paddingFieldNames("accident.equipment", fieldNames), this.paddingValues(this.accident.equipment, fieldNames));
			fieldNames = [ "projectName" ];
			this.setMultiFieldValue(this.paddingFieldNames("accident.project", fieldNames), this.paddingValues(this.accident.project, fieldNames));
			fieldNames = [ "accidentId", "accidentCategory", "responsible", "accidentSerial", "accidentLevelName", "accidentDate", "address", "responsibleUnit" ];
			this.setMultiFieldValue(this.paddingFieldNames("accident", fieldNames), this.paddingValues(this.accident, fieldNames));
		}
	}
});