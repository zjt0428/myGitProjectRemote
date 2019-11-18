var TechnicalDisclosureForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.disclosureId,
		relateModule : RelationModule.technicalDisclosure.relateModule,
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
					fieldLabel : "备案编号",
					name : "technicalDisclosure.recordId"
				},{
					readOnly : true,
					fieldLabel : "交底类型",
					name : "technicalDisclosure.relateModule"
				},
				{
					readOnly : true,
					fieldLabel : "项目名称",
					name : "technicalDisclosure.projectName"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					width : 125,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "填报日期",
					name : "technicalDisclosure.providedDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "设备名称",
					name : "technicalDisclosure.equipGenericName"
				}, {
					fieldLabel : "交底人",
					name : "technicalDisclosure.disclosureMan"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "technicalDisclosure.exwSerial"
				}, {
					readOnly : true,
					fieldLabel : "规格型号",
					name : "technicalDisclosure.equipSpecificName"
				},  {
					xtype : "datefield",
					width : 125,
					editable : false,
					format : "Y-m-d H:i:s",
					fieldLabel : "交底日期",
					name : "technicalDisclosure.disclosureDate"
				} ]
			} ]
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 2000,
			height : 48,
			fieldLabel : "交底内容",
			name : "technicalDisclosure.contents"
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 2000,
			height : 48,
			fieldLabel : "其他针对性安全技术交底",
			name : "technicalDisclosure.replenishContents"
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 256,
			height : 48,
			fieldLabel : "备注",
			name : "technicalDisclosure.remark"
		}, fileAttachContainer ]
	} ];
	TechnicalDisclosureForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			title : "技术交底",
			object : "technicalDisclosure",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveTechnicalDisclosure.do",
			items : items,
			fieldMapping : TechnicalDisclosureFieldMapping,
			hiddenField : TechnicalDisclosureHiddenField
		}
	});
};
Ext.extend(TechnicalDisclosureForm, Knight.ux.FormPanelWindow, {
	 loadFormData : function() {
			if (!Ext.isEmpty(this.disclosureId)) {
				var data = $ajaxSyncCall( __ctxPath + "/safety/loadDetailTechnicalDisclosure.do?disclosureId=" + this.disclosureId);
				var fields = [ "equipGenericName", "equipSpecificName",
						"acceptMan", "disclosureMan",
						"disclosureDate", "disclosurePhoto",
						"relateModule", "relateId",
						"projectName", "exwSerial", "recordId",
						"contractSerial","equipSerial" ];
				var value = [ data.result[0].equipGeneric,
						data.result[0].equipSpecific,
						data.result[0].acceptMan,
						data.result[0].disclosureMan,
						data.result[0].disclosureDate,
						data.result[0].disclosurePhoto,
						data.result[0].relateModule,
						data.result[0].relateId,
						data.result[0].projectName,
						data.result[0].exwSerial,
						data.result[0].recordSerial,
						data.result[0].contractSerial,
						data.result[0].equipSerial];
				this.setMultiFieldValue(fields, value);
			}
		}
});