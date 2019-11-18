var ExeuntPlanForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	this.demandDetailForExeuntPlanGrid = new DemandDetailForExeuntPlanGrid(null, {
		saveable : this.saveable
	});
	
	var items = [ {
		xtype : "hidden",
		name : "exeuntPlan.demandDetailForExeuntPlans"
	}, {
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
				items : [ {
					fieldLabel : "标题",
					name : "exeuntPlan.title"
				},$initComboBoxField("工程区域", "exeuntPlan.belongToArea", "belongToArea", {
					editable : false,
					width : 143
				}),{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					width : 143,
					readOnly : true,
					fieldLabel : "退回仓库",
					name : "exeuntPlan.backStoreName",
					relateModule : RelationModule.storeHouse.relateModule,
					fields : [ "backStoreId","backStoreName"],
					importhandler : this.importStoreHouseArchives.createDelegate(this)
				}, $initComboBoxField("计划类型", "exeuntPlan.planType", "planType", {
					editable : false,
					width : 143
				}),
				this.initFileAttachContainer({
					saveable : this.saveable,
					relateModule : RelationModule.exeuntPlan.relateModule,
					relateId : this.exeuntPlanId
				})
				]
			},{
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "单据号",
					readOnly : true,
					name : "exeuntPlan.exeuntPlanSerial"
				},$initComboBoxField("工程类型", "exeuntPlan.projectType", "projectType", {
					editable : false,
					width : 143
				}),{
					readOnly : true,
					fieldLabel : "填报人",
					name : "exeuntPlan.planApplicant"
				},$initComboBoxField("租赁资产属性", "exeuntPlan.assetsProperty", "assetsProperty", {
					editable : false,
					width : 143
				}),{
					xtype : "textarea",
					width : "100%",
					fieldLabel : "备注",
					name : "exeuntPlan.remark",
					colspan : 2
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					width : 143,
					readOnly : true,
					fieldLabel : "项目名称",
					name : "exeuntPlan.projectName",
					relateModule : RelationModule.project.relateModule,
					fields : [ "projectId","projectName"],
					importhandler : this.importProjectArchives.createDelegate(this)
				},{
					fieldLabel : "工程进度",
					name : "exeuntPlan.projectSchedule"
				},{
					fieldLabel : "申报时间",
					width : 143,
					editable : false,
					xtype : "datefield",
					format : "Y-m-d",
					name : "exeuntPlan.declareDate",
					allowBlank : false
				}]
			}]
		}]
	}];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.demandDetailForExeuntPlanGrid ]
	});
	items.push(this.relateTabPanel);
	ExeuntPlanForm.superclass.constructor.call(this, {
		title : this.title ? this.title : "退场计划",
		animateTarget : this.animateTarget,
		y : 10,
		width : 860,
		height : 560,
		form_config : {
			labelWidth : 90,
			object : "exeuntPlan",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.exeuntPlanId,
				relateModule : RelationModule.exeuntPlan.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.exeuntPlanId,
				relateModule : RelationModule.exeuntPlan.relateModule
			},
			url : __ctxPath + "/dispatch/saveExeuntPlan.do",
			items : items,
			fieldMapping : ExeuntPlanFieldMapping,
			hiddenField : ExeuntPlanHiddenField
		}
	});
};
Ext.extend(ExeuntPlanForm, Knight.ux.FormPanelWindow, {
	importStoreHouseArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.storeId,data.storeName ]);
	},
	importProjectArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.projectId,data.projectName]);
	},
	saveFormData : function() {
		this.setFieldValue("demandDetailForExeuntPlans", $gridstore2json(this.demandDetailForExeuntPlanGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/dispatch/multiSubmitExeuntPlan.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.exeuntPlanId)) {
			//延迟加载表单信息，避免因为combo内容未加载完成而导致combo值设置异常
			setTimeout(function(){
				this.getForm().load({
					deferredRender : false,
					url : __ctxPath + "/dispatch/loadExeuntPlan.do?exeuntPlanId=" + this.exeuntPlanId,
					waitMsg : "正在载入数据...",
					success : function(g, h) {
						var data = Ext.util.JSON.decode(h.response.responseText).data[0];
						this.setFormSubModuleGrid(data.demandDetailForExeuntPlanSet, this.demandDetailForExeuntPlanGrid);
					}.createDelegate(this),
					failure : function(c, d) {
						Ext.Msg.alert("出错", "载入数据失败!");
					}
				});
			}.createDelegate(this),300);
		} else {
			var fieldNames = [ "userId", "planApplicant","declareDate" ];
			var values = [ curUserInfo.userId, curUserInfo.fullname ,new Date().format("Y-m-d")];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});