var EquipInspectSchemaForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	Ext.apply(this, {
		generatedOpportunityComboId : Ext.id()
	})
	var belongToAreaCombo = $initComboBoxField("计划区域", "equipInspectSchema.belongToArea", "belongToArea", {
		editable : true,
		readOnly : !this.saveable
	});
	
	var generatedCycleCombo = $initComboBoxField("生成周期", "equipInspectSchema.generatedCycle", "GENERATED_CYCLE", {
		editable : false,
		readOnly : !this.saveable
	});
	
	var generatedOpportunityCombo = $initComboBoxField("生成时间", "equipInspectSchema.generatedOpportunity", "GENERATED_OPPORTUNITY", {
		id : this.generatedOpportunityComboId,
		editable : false,
		readOnly : !this.saveable
	});
	
	var items = [ {
		xtype : "fieldset",
		title : "计划信息",
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
					fieldLabel : "制单人",
					name : "equipInspectSchema.userName",
					value : curUserInfo.fullname
				}, {
					readOnly : true,
					fieldLabel : "关联项目",
					name : "equipInspectSchema.equipDiary.projectName"
				}, {
					xtype : "numberfield",
//					allowBlank : false,
					disabled : true,
//					minValue : 1,
					fieldLabel : "巡检周期天数",
					name : "equipInspectSchema.cycleDays"
				}, generatedCycleCombo]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datetimefield",
					readOnly : true,
					format : "Y-m-d H:i:s",
					fieldLabel : "制单日期",
					name : "equipInspectSchema.applyDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "备案编号",
					name : "equipInspectSchema.equipDiary.recordId"
				}, {
					xtype : "numberfield",
					allowBlank : false,
					minValue : 1,
					fieldLabel : "计划巡检频率",
					name : "equipInspectSchema.timesInCycle"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "equipInspectSchema.equipDiary.exwSerial"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
//					editable : false,
					disabled : true,
					fieldLabel : "周期起始日期",
					name : "equipInspectSchema.cycleActivateDate",
					value : new Date()
				}, generatedOpportunityCombo ]
			} ]
		}, {
			xtype : "textfield",
			allowBlank : false,
			anchor : "95%",
			fieldLabel : "巡检说明",
			name : "equipInspectSchema.description"
		} ]
	} ];
	EquipInspectSchemaForm.superclass.constructor.call(this, {
		title : "巡检计划信息明细",
		width : 800,
		height : 210,
		form_config : {
			labelWidth : 100,
			object : "equipInspectSchema",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveEquipInspectSchema.do",
			items : items,
			fieldMapping : EquipInspectSchemaFieldMapping,
			hiddenField : EquipInspectSchemaHiddenField
		}
	});
};
Ext.extend(EquipInspectSchemaForm, Knight.ux.FormPanelWindow, {
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
		if (!Ext.isEmpty(this.inspectSchemaId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipInspectSchema.do?inspectSchemaId=" + this.inspectSchemaId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("belongToArea", data.belongToAreaName);
					this.setFieldRawValue("generatedCycle", data.generatedCycleName);
//					if(this.saveable && data.activateTime != null) {
						//激活后失效再修改的计划，只能选择次月生成 --yxl
//						Ext.getCmp(this.generatedOpportunityComboId).setValue("1");
//						Ext.getCmp(this.generatedOpportunityComboId).setReadOnly(true);
//						this.findFormField("generatedOpportunity").setReadOnly(true);
//					}else{
						this.setFieldRawValue("generatedOpportunity", data.generatedOpportunityName);
//					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "flowId", "relateId", "relateSerial", "relateModule", "cycleActivateDate", "userId"];
			var values = [ this.flowId, this.relateId, this.relateSerial, this.relateModule, this.equipDiary.activateDate, curUserInfo.userId ];
			this.setMultiFieldValue(fieldNames, values);
			fieldNames = [ "equipDiaryId", "projectName", "recordId", "exwSerial" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipDiary", fieldNames), this.paddingValues(this.equipDiary, fieldNames));
		}
	}
});