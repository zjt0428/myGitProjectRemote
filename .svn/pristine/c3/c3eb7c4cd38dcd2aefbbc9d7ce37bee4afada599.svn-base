var AccidentForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮

	var accidentLevelCombo = $initComboBoxField("事故级别", "accident.accidentLevel", "ACCIDENT_LEVEL", {
		readOnly : false,
		allowBlank : false
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.accidentId,
		relateModule : RelationModule.accident.relateModule,
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
					fieldLabel : "事故编号",
					name : "accident.accidentSerial"
				}, {
					readOnly : true,
					fieldLabel : "事故设备",
					name : "accident.equipment.equipGenericName"
				}, {
					maxLength : 32,
					fieldLabel : "事故责任单位",
					name : "accident.responsibleUnit"
				}, {
					xtype : "numberfield",
					fieldLabel : "受伤人数",
					value : 0,
					name : "accident.injuries"
				}, {
					maxLength : 32,
					fieldLabel : "经济损失",
					name : "accident.economicLosses"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					width : 125,
					allowBlank : false,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "发生时间",
					name : "accident.accidentDate"
				}, {
					readOnly : true,
					fieldLabel : "规格型号",
					name : "accident.equipment.equipSpecificName"
				}, {
					maxLength : 32,
					fieldLabel : "事故类别",
					name : "accident.accidentCategory"
				}, {
					xtype : "numberfield",
					fieldLabel : "死亡人数",
					value : 0,
					name : "accident.deaths"
				}, {
					xtype : "datefield",
					width : 125,
					allowBlank : false,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "登记日期",
					name : "accident.providedDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "accident.equipment.exwSerial"
				}, {
					readOnly : true,
					fieldLabel : "备案编号",
					name : "accident.equipment.recordId"
				}, accidentLevelCombo, {
					maxLength : 32,
					fieldLabel : "主要责任人",
					name : "accident.responsible"
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
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "accident.project.projectName",
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProjectArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					anchor : "95%",
					fieldLabel : "事故地址",
					name : "accident.address"
				} ]
			} ]
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 1000,
			height : 48,
			fieldLabel : "事故概况与损失",
			name : "accident.accidentDesc"
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 1000,
			height : 48,
			fieldLabel : "事故原因",
			name : "accident.accidentReason"
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 1000,
			height : 48,
			fieldLabel : "事故处理结果",
			name : "accident.accidentResult"
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 1000,
			height : 48,
			fieldLabel : "设备修复情况",
			name : "accident.equipRepairDesc"
		}, fileAttachContainer ]
	} ];
	AccidentForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 500,
		form_config : {
			title : "事故登记",
			object : "accident",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveAccident.do",
			items : items,
			fieldMapping : AccidentFieldMapping,
			hiddenField : AccidentHiddenField
		}
	});
};
Ext.extend(AccidentForm, Knight.ux.FormPanelWindow, {
	importProjectArchives : function(data) {
		this.setMultiFieldValue([ "project.projectId", "project.projectName", "address" ], [ data.projectId, data.projectName, data.address ]);
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
		if (!Ext.isEmpty(this.accidentId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/safety/loadAccident.do?accidentId=" + this.accidentId,
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