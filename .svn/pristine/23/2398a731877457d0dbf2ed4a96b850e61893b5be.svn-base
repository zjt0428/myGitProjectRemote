var ConstructOperationForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var constructTaskData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "constructTask"
	});
	this.constructOperationPlanTaskGrid = new ConstructOperationTaskGrid(null, {
		title : "计划任务清单",
		constructTaskData : constructTaskData,
		saveable : this.saveable
	});
	this.constructOperationRealTaskGrid = new ConstructOperationTaskGrid(null, {
		title : "实际任务清单",
		constructTaskData : constructTaskData,
		saveable : this.saveable,
		tbarItems : [ {
			iconCls : "btn-head-add",
			text : "导入计划",
			handler : this.importPlanTask.createDelegate(this)
		} ]
	});
	this.constructPlanPractiGrid = new ConstructPractiGrid(null,{
		title : "计划作业人员",
		saveable : this.saveable,
		selectable :true,
        type : 0
	});
	this.constructRealPractiGrid = new ConstructPractiGrid(null,{
		title : "实际作业人员",
		saveable : this.saveable,
		selectable :true,
		type : 1
	});
	this.constructManagersGrid = new ConstructManagersGrid(null,{
		title : "管理人员",
		saveable : this.saveable,
		selectable :true,
		type : 2
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.constructId,
		relateModule : RelationModule.constructOperation.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "填报人信息",
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
					readOnly : true,
					fieldLabel : "填报人",
					name : "constructOperation.userName"
				}, {
					allowBlank : false,
					fieldLabel : "施工作业主题",
					name : "constructOperation.constructTheme"
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
					fieldLabel : "填报日期",
					name : "constructOperation.providedDate",
					value : new Date()
				}, {
					fieldLabel : "项目负责人",
					name : "constructOperation.projectPrincipal"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "作业单单号",
					name : "constructOperation.constructSerial"
				}, {
					fieldLabel : "班组长",
					name : "constructOperation.teams"
				} ]
			} ]
		} ]
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
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "项目名称",
					name : "constructOperation.project.projectName"
				}, {
					fieldLabel : "项目地址",
					name : "constructOperation.project.address"
				}, {
					readOnly : false,
					fieldLabel : "楼号",
					name : "constructOperation.buildingNum"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "设备编号",
					allowBlank : true,
					name : "constructOperation.equipment.recordId",
					fields : [ "equipment.equipId", "equipment.exwSerial", "equipment.propertyName", "equipment.recordId", "equipment.equipSpecificName","buildingNum"],
					relateModule : RelationModule.equipment.relateModule,
					importhandler : this.importEquipmentArchives.createDelegate(this)
				}, {
					xtype : "numberfield",
					readOnly : false,
					fieldLabel : "已付金额",
					name : "constructOperation.finishedAmount"
				}, {
					readOnly : false,
					fieldLabel : "建筑物高度",
					name : "constructOperation.planHeight"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "规格型号",
					name : "constructOperation.equipment.equipSpecificName"
				}, {
					fieldLabel : "出厂编号",
					name : "constructOperation.equipment.exwSerial"
				}, {
					fieldLabel : "产权单位",
					name : "constructOperation.equipment.propertyName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "使用单位",
					name : "constructOperation.paEntName",
					relateModule : RelationModule.customer.relateModule,
					importhandler : this.importCustomerArchives.createDelegate(this)
				}, {
					xtype : "numberfield",
					readOnly : false,
					fieldLabel : "未付金额",
					name : "constructOperation.remainderAmount"
				}, {
					readOnly : false,
					fieldLabel : "最高安装高度",
					name : "constructOperation.realHeight"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "安装单位",
					name : "constructOperation.pbEntName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				}, {
					fieldLabel : "费用合计",
					name : "constructOperation.summary"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					readOnly : false,
					allowBlank : false,
					fieldLabel : "计划完成时间",
					name : "constructOperation.constructDate"
				}, {
					readOnly : false,
					fieldLabel : "款项状态",
					name : "constructOperation.fundStatusName"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			height : 32,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "备注",
			name : "constructOperation.remark"
		}, fileAttachContainer ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.constructOperationRealTaskGrid, this.constructOperationPlanTaskGrid,this.constructPlanPractiGrid,this.constructRealPractiGrid,this.constructManagersGrid ]
	});
	items.push(this.relateTabPanel);
	ConstructOperationForm.superclass.constructor.call(this, {
		title : "施工作业单明细",
		width : 960,
		height : 760,
		form_config : {
			object : "constructOperation",
			saveable : this.saveable,
			url : __ctxPath + "/dispatch/saveConstructOperation.do",
			items : items,
			fieldMapping : ConstructOperationFieldMapping,
			hiddenField : ConstructOperationHiddenField
		}
	});
};
Ext.extend(ConstructOperationForm, Knight.ux.FormPanelWindow, {
	importPlanTask : function() {
		for (var i = 0; i < this.constructOperationPlanTaskGrid.getStore().getCount(); i++) {
			var data = this.constructOperationPlanTaskGrid.getStore().getAt(i).data;
			this.constructOperationRealTaskGrid.addSubModuleDate(data);
		}
	},
	importEquipmentArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.equipId, data.exwSerial, data.propertyName, data.recordId, data.equipSpecificName,data.buildingNum]);
	},
	importCustomerArchives : function(data) {
		this.setMultiFieldValue([ "paEntName" ], [ data.customerName ]);
	},
	importCorpInfoArchives : function(data) {
		this.setMultiFieldValue([ "pbEntName","certNum","certLevel" ], [ data.corpName,data.certNum,data.certLevel ]);
	},
	saveFormData : function() {
		this.setFieldValue("constructOperationPlanTasks", $gridstore2json(this.constructOperationPlanTaskGrid));
		this.setFieldValue("constructOperationRealTasks", $gridstore2json(this.constructOperationRealTaskGrid));
        this.setFieldValue("constructPlanPractis", $gridstore2json(this.constructPlanPractiGrid));
        this.setFieldValue("constructRealPractis", $gridstore2json(this.constructRealPractiGrid));
		this.setFieldValue("constructManagers", $gridstore2json(this.constructManagersGrid));
		this.setFieldValue("summary", this.constructOperationRealTaskGrid.getTotalSummary());
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.constructId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadConstructOperation.do?constructId=" + this.constructId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.constructOperationPlanTaskSet, this.constructOperationPlanTaskGrid);
					this.setFormSubModuleGrid(data.constructOperationRealTaskSet, this.constructOperationRealTaskGrid);
					this.setFormSubModuleGrid(data.constructPlanPractiSet, this.constructPlanPractiGrid);
                    this.setFormSubModuleGrid(data.constructRealPractiSet, this.constructRealPractiGrid);
                    this.setFormSubModuleGrid(data.constructManagerSet, this.constructManagersGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userName", "paEntName", "pbEntName", "project.projectId", "project.projectName", "project.address" ];
			var values = [ curUserInfo.fullname, this.contract.paEntName, this.contract.pbEntName, this.contract.projectId, this.contract.projectName, this.contract.address ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});