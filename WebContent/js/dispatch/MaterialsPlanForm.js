var MaterialsPlanForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 核准功能按钮
	this.approveable = this.approveable; // 确认功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.materialsPlanId,
		relateModule : RelationModule.materialsPlan.relateModule,
		saveable : this.saveable
	});
	var assetsPropertyCombo = $initComboBoxField("资产属性", "materialsPlan.assetsProperty", "assetsProperty", {
		editable : true,
		readOnly : !this.saveable
	});
	var projectTypeCombo = $initComboBoxField("工程类别", "materialsPlan.projectType", "projectType", {
		editable : true,
		allowBlank : true,
		readOnly : !this.saveable
	});
	var planTypeCombo = $initComboBoxField("计划类型", "materialsPlan.planType", "planType", {
		editable : true,
		readOnly : !this.saveable
	});
	var belongToAreaCombo = $initComboBoxField("工程区域", "materialsPlan.belongToArea", "belongToArea", {
		editable : true,
		readOnly : !this.saveable
	});
	this.demandDetailGrid = new DemandDetailGrid(null, {
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
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : false,
					fieldLabel : "标题",
					name : "materialsPlan.title"
				}, belongToAreaCombo, planTypeCombo, {
					maxLength : 20,
					readOnly : false,
					fieldLabel : "确认人",
					name : "materialsPlan.confirmingPerson"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "单据号",
					name : "materialsPlan.documentSerial"
				},projectTypeCombo, {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "计划申报人",
					name : "materialsPlan.userName"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "确认日期",
					name : "materialsPlan.confirmationDate",
				} ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "申报时间",
					name : "materialsPlan.reportingTime",
					value : new Date()
				}, {
					maxLength : 20,
					readOnly : false,
					fieldLabel : "工程进度",
					name : "materialsPlan.engineeringSchedule"
				}, {
					maxLength : 20,
					readOnly : false,
					fieldLabel : "核准人",
					name : "materialsPlan.approver"
				}, {
					xtype : "textarea",
					anchor : "95%",
					maxLength : 50,
					height : 24,
					maxLengthText : MoreThanMaxLength,
					fieldLabel : "备注",
					name : "materialsPlan.remark"
				}, ]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "项目名称",
					name : "materialsPlan.projectName",
					relateModule : RelationModule.project.relateModule,
					fields : [ "projectId", "projectName","address"],
					importhandler : this.importProjectArchives.createDelegate(this)
				},assetsPropertyCombo, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "核准日期",
					name : "materialsPlan.approvalDate",
				} ]
			} ]
		},fileAttachContainer ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.demandDetailGrid ]
	});
	items.push(this.relateTabPanel);
	MaterialsPlanForm.superclass.constructor.call(this, {
		title : "周材计划明细",
		animateTarget : this.animateTarget,
		y : 10,
		width : 960,
		height : 760,
		form_config : {
			labelWidth : 100,
			object : "materialsPlan",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.materialsPlanId,
				relateModule : RelationModule.materialsPlan.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.materialsPlanId,
				relateModule : RelationModule.materialsPlan.relateModule
			},
			url : __ctxPath + "/dispatch/saveMaterialsPlan.do",
			items : items,
			fieldMapping : MaterialsPlanFieldMapping,
			hiddenField : MaterialsPlanHiddenField
		}
	});
};
Ext.extend(MaterialsPlanForm, Knight.ux.FormPanelWindow, {
//	importSupplierArchives : function(data, fields) {
//		this.setMultiFieldValue(fields, [ data.supplierName ]);
//	},
//	importRelationArchives : function(data, relation) {
//		var fieldNames = [ "pbEntName" ];
//		var values = [ relation.relateSerial];
//		this.setMultiFieldValue(fieldNames, values);
//	},
	importProjectArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.projectId, data.projectName,data.address]);
	},
	saveFormData : function() {
		this.setFieldValue("demandDetails", $gridstore2json(this.demandDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/dispatch/multiSubmitMaterialsPlan.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.materialsPlanId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadMaterialsPlan.do?materialsPlanId=" + this.materialsPlanId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("assetsProperty", data.assetsPropertyName);
					this.setFieldRawValue("projectType", data.projectTypeName);
					this.setFieldRawValue("planType", data.planTypeName);
					this.setFieldRawValue("belongToArea", data.belongToAreaName);
					this.setFormSubModuleGrid(data.demandDetailSet, this.demandDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName", "arrangeType" ];
			var values = [ curUserInfo.userId, curUserInfo.fullname, "0" ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});