var EquipMaintSchemaForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	this.maintSchemaStandardGrid = new VerifyStandardGrid({
		grid_config : {
			title : "保养项目",
		},
		select_params : {
			"Q_I.LEVEL_N_EQ" : 1,
			"Q_[I.VITEM_TYPE]_S_EQ" : this.maintType
		},
		itemNameLable : "作业项目",
		demandDesLable : "技术要求及说明",
		remarkLable : "备注"
	}, {
		saveable : this.saveable
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
					fieldLabel : "关联项目",
					name : "equipMaintSchema.equipment.projectName"
				}, {
					xtype : "numberfield",
					allowBlank : false,
					minValue : 1,
					fieldLabel : "保养周期天数",
					name : "equipMaintSchema.cycleDays"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "备案编号",
					name :"equipMaintSchema.equipment.recordId"
				}, {
					xtype : "numberfield",
					allowBlank : false,
					minValue : 1,
					fieldLabel : "计划保养频率",
					name : "equipMaintSchema.timesInCycle"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "出厂编号",
					name :"equipMaintSchema.equipment.exwSerial"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					allowBlank : false,
					fieldLabel : "周期起始日期",
					name : "equipMaintSchema.cycleActivateDate",
					value : new Date()
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
					readOnly : true,
					fieldLabel : "保养类别",
					name : "equipMaintSchema.maintTypeName"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					xtype : "textfield",
					anchor : "100%",
					fieldLabel : "保养说明",
					name : "equipMaintSchema.description"
				} ]
			} ]
		} ]
	}, {
		xtype : "panel",
		layout : "fit",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		items : [ this.maintSchemaStandardGrid ]
	} ];
	EquipMaintSchemaForm.superclass.constructor.call(this, {
		title : "保养计划信息明细",
		width : 800,
		form_config : {
			labelWidth : 100,
			object : "equipMaintSchema",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveEquipMaintSchema.do",
			items : items,
			fieldMapping : EquipMaintSchemaFieldMapping,
			hiddenField : EquipMaintSchemaHiddenField
		}
	});
};
Ext.extend(EquipMaintSchemaForm, Knight.ux.FormPanelWindow, {
	saveFormData : function() {
		this.setFieldValue("maintSchemaStandards", $gridstore2json(this.maintSchemaStandardGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.maintSchemaId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipMaintSchema.do?maintSchemaId=" + this.maintSchemaId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.maintSchemaStandardSet, this.maintSchemaStandardGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			/*if(this.maintType=="SM"){
				var fieldNames = [ "flowId", "relateId", "relateSerial", "relateModule", "maintType", "maintTypeName","recordId","exwSerial" ];
				var values = [ this.flowId, this.relateId, this.relateSerial, this.relateModule,this.maintType, this.maintTypeName,this.equipment.recordId,this.equipment.exwSerial ];
				this.setMultiFieldValue(fieldNames, values);
			}*/
			var fieldNames = [ "flowId", "relateId", "relateSerial", "relateModule", "cycleActivateDate", "maintType", "maintTypeName" ];
			var values = [ this.flowId, this.relateId, this.relateSerial, this.relateModule, this.equipDiary.activateDate, this.maintType, this.maintTypeName ];
			this.setMultiFieldValue(fieldNames, values);
		/*	fieldNames = [ "equipDiaryId", "projectName", "recordId", "exwSerial" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipDiary", fieldNames), this.paddingValues(this.equipDiary, fieldNames));*/
			fieldNames = [ "equipId", "recordId", "exwSerial" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(this.equipment, fieldNames));
	
		}
	}
});