var EquipInspectSchemaBatchForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
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
		xtype : "hidden",
		name : "equipInspectSchema.relateIds"
	}, {
		xtype : "hidden",
		name : "equipInspectSchema.relateModule"
	}, {
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
					xtype : "numberfield",
//					allowBlank : false,
//					minValue : 1,
					disabled : true,
					fieldLabel : "巡检周期天数",
					name : "equipInspectSchema.cycleDays"
				}, generatedCycleCombo ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [  {
					xtype : "datetimefield",
					readOnly : true,
					format : "Y-m-d H:i:s",
					fieldLabel : "制单日期",
					name : "equipInspectSchema.applyDate",
					value : new Date()
				},{
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
			xtype : "textarea",
			height : 48,
			allowBlank : false,
			anchor : "95%",
			maxLength : 256,
			fieldLabel : "巡检说明",
			name : "equipInspectSchema.description"
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.relateEquipFlowGrid ]
	} ];
	EquipInspectSchemaBatchForm.superclass.constructor.call(this, {
		title : "巡检计划批量制定",
		width : 800,
		height : 450,
		form_config : {
			labelWidth : 90,
			object : "equipInspectSchema",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveBatchEquipInspectSchema.do",
			items : items
		}
	});
};
Ext.extend(EquipInspectSchemaBatchForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		if (this.relateEquipFlowGrid.getStore().getCount() <= 1) {
			Ext.Msg.alert("警告", "选择超过两条以上设备信息!");
			return;
		}
		var relateIds = [];
		for (var i = 0; i < this.relateEquipFlowGrid.getStore().getCount(); i++) {
			var r = this.relateEquipFlowGrid.getStore().getAt(i).data;
			relateIds.push(r.relateId);
		}
		this.setFieldValue("relateIds", relateIds.join(","));

		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/equip/multiSubmitEquipInspectSchema.do", resp.activeId, null, "是否全部【激活】，点击确认后将无法进行修改");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();			
		}.createDelegate(this));
	},
	loadFormData : function() {
		this.setFieldValue("relateModule", this.relateModule);
	}
});