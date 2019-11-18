var EquipMaintSchemaBatchForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

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
		xtype : "hidden",
		name : "equipMaintSchema.relateIds"
	}, {
		xtype : "hidden",
		name : "equipMaintSchema.relateModule"
	}, {
		xtype : "hidden",
		name : "equipMaintSchema.maintSchemaStandards"
	}, {
		xtype : "hidden",
		name : "equipMaintSchema.maintType"
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
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
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
					name : "equipMaintSchema.maintTypeName",
					value : this.maintTypeName
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
				}]
			} ]
		} ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.maintSchemaStandardGrid, this.relateEquipFlowGrid ]
	});
	items.push(this.relateTabPanel);
	EquipMaintSchemaBatchForm.superclass.constructor.call(this, {
		title : "保养计划批量制定",
		width : 800,
		height : 450,
		form_config : {
			labelWidth : 90,
			object : "equipMaintSchema",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveBatchEquipMaintSchema.do",
			items : items
		}
	});
};
Ext.extend(EquipMaintSchemaBatchForm, Knight.ux.FormPanelWindow, {
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
		this.setFieldValue("maintSchemaStandards", $gridstore2json(this.maintSchemaStandardGrid));
		$formsubmit(this.getForm(), function(c, e) {-
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		this.setFieldValue("relateModule", this.relateModule);
		this.setFieldValue("maintType", this.maintType);
	}
});