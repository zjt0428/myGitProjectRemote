var SideSystemForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;
	
	var genericCombo = $initComboBoxField("设备名称", "sideSystem.equipGeneric", "equipGeneric", {
		editable : true,
		allowBlank : false,
		readOnly : !this.saveable
	});
	
	var specificCombo = $initComboBoxField("规格型号", "sideSystem.equipSpecific", "equipSpecific", {
		editable : true,
		allowBlank : false,
		readOnly : !this.saveable
	});
	
	this.sideReportingGrid = new SideReportingGrid(null, {
		saveable : this.saveable
	});
	
	var items = [{
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "项目名称",
					name : "sideSystem.projectName",
					relateModule : RelationModule.project.relateModule,
					fields : [ "projectName" ],
					importhandler : this.importProject.createDelegate(this)
				}, genericCombo, specificCombo ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					xtype : "datefield",
					width : 130,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "作业时间",
					name : "sideSystem.operationDate"
				}, {
					fieldLabel : "作业人员",
					name : "sideSystem.operationPersonnel"
				}, {
					fieldLabel : "作业内容",
					name : "sideSystem.operationDetail"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [{
					fieldLabel : "旁站人员",
					name : "sideSystem.reportingPersonnel"
				}]
			}]
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "过程问题及处理措施",
			name : "sideSystem.measure"
		}]
	}]
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.sideReportingGrid ]
	});
	items.push(this.relateTabPanel);
	SideSystemForm.superclass.constructor.call(this, {
		title : "旁站记录信息",
		animateTarget : this.animateTarget,
		height : 600,
		form_config : {
			object : "sideSystem",
			saveable : this.saveable,
			//url : __ctxPath + "",
			items : items,
			fieldMapping : SideSystemFieldMapping,
			hiddenField : SideSystemHiddenField
		}
	});
};
Ext.extend(SideSystemForm, Knight.ux.FormPanelWindow, {
	importProject : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.projectName ]);
	},
	loadFormData : function() {
		if(!Ext.isEmpty(this.sideId)){
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/app/loadSideSystem.do?sideId=" + this.sideId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.safeCheckContentSet, this.safeCheckGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	}
});