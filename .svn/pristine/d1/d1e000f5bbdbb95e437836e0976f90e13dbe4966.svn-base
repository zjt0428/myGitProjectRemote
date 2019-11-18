var ProjectForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;

	var projectTypeCombo = $initComboBoxField("项目类别", "project.projectType", "projectType", {
		allowBlank : true
	});
	var taxModeCombo = $initComboBoxField("计税方式", "project.taxMode", "TAX_MODE", {
		allowBlank : true
	});
	var scaleCombo = $initComboBoxField("项目规模", "project.scale", "projectScale", {
		allowBlank : true
	});
	var depSelector = new TreeSelector("depTreeSelector", __ctxPath + "/system/listDepartment.do?opt=project", "所属部门", "project.depId",false);

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.projectId,
		relateModule : RelationModule.project.relateModule,
		saveable : this.saveable
	});

	var practiFields = [ "practiId", "practiName" ];
	var ctCustomerFields = [ "ctCustomId", "ctCustomName", "ctCustomLinker", "ctCustomLinkTel" ];
	var unCustomerFields = [ "unCustomId", "unCustomName", "unCustomLinker", "unCustomLinkTel","customerNickName" ];
	var supCustomerFields = [ "supCustomId", "supCustomName", "supCustomLinker", "supCustomLinkTel" ];
	var items = [ {
		xtype : "fieldset",
		title : "项目信息",
		anchor : "95%",
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					allowBlank : true
				},
				items : [ {
					maxLength : 24,
					readOnly : true,
					fieldLabel : "项目编号",
					name : "project.projectSerial"
				}, {
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "project.projectName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "施工单位",
					name : "project.unCustomName",
					relateModule : RelationModule.customer.relateModule,
					fields : unCustomerFields,
					cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
					importhandler : this.importCustomerArchives.createDelegate(this)
				}, depSelector,{
					xtype : "textfield",
					allowBlank : true,
					fieldLabel : "施工单位项目经理",
					name : "project.leaseProjectHead"
				}, {
					xtype : "hidden",
					name : "project.department.depId",
					id : "project.depId"
				}   ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					allowBlank : true
				},
				items : [ projectTypeCombo, 
				{
					xtype : "datefield",
					width : 130,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "计划开工日期",
					name : "project.startPlanDate"
				}, 
				{
					width : 130,
					maxLength : 32,
					fieldLabel : "施工单位联系人",
					name : "project.unCustomLinker"
				},{
					width : 130,
					maxLength : 64,
					fieldLabel : "客户简称",
					name : "project.customerNickName"
				}, 
				{
					xtype : "datefield",
					width : 130,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "计划峻工日期",
					name : "project.endPlanDate"
				}, taxModeCombo]
			}, {
				layout : "form",
				columnWidth : 0.33,
				items : [ 
				{
					xtype : "numberfield",
					allowBlank : true,
					fieldLabel : "工程造价(万元)",
					name : "project.projectCost"
				}, {
					xtype : "numberfield",
					allowBlank : true,
					fieldLabel : "总建筑面积(㎡)",
					name : "project.cover"
				}, 
				{
					xtype : "textfield",
					maxLength : 16,
					fieldLabel : "联系电话",
					name : "project.unCustomLinkTel"
				}, 
				{
					xtype : "numberfield",
					allowBlank : true,
					fieldLabel : "楼层高度(m)",
					maxValue : 999,
					name : "project.overallHeight"
				}, 
				{
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "物资接收人",
					single:false,
					readOnly : true,
					name : "project.projectPractiName",
					relateModule : RelationModule.appUser.relateModule,
					fields :  [ "projectPractiName"],
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importProjectPractiArchives.createDelegate(this)
				},{
					xtype : "relationCompositeField",
					allowBlank : true,
					disabled : !this.saveable,
					fieldLabel : "项目管理人员",
					single:false,
					readOnly : true,
					allowBlank : false,
					name : "project.materialPractiName",
					relateModule : RelationModule.practitioner.relateModule,
					fields : [ "materialPractiName"],
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importMaterialPractiArchives.createDelegate(this)
				}
				]
			} ]
		}, {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				defaults : {
					allowBlank : false
				},
				items : [ {
					xtype : "areaCompositeField",
					width : 130,	
					disabled : !this.saveable,
					fieldLabel : "所在地",
					provinceName : "project.province",
					cityName : "project.city",
					countyName : "project.county"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.34,
				items : [ {
					xtype : "textfield",
					allowBlank : true,
					fieldLabel : "工程地址",
					name : "project.street"
				}]
			} ]
		}, {
			layout : "column",
			items : [
			{
				layout : "form",
				columnWidth : 0.8,
				items : [ {
					xtype : "textarea",
					maxLength : 128,
					maxLengthText : MoreThanMaxLength,
					anchor : "95%",
					height : "60",
					fieldLabel : "备注",
					name : "project.remark"
				} ]
			} ]
		}, fileAttachContainer ]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		bodyStyle : "background:#dfe8f7;",
		anchor : "98%",
		activeTab : 0,
		items : [ {
			xtype : "panel",
			bodyStyle : "background:#dfe8f7; margin:5px 0px 0px 0px;",
			title : "客户单位信息",
			anchor : "98%",
			layout : "form",
			height : 100,
			items : [ {
				layout : "column",
				items : [ {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						xtype : "relationCompositeField",
						disabled : !this.saveable,
						allowBlank : true,
						fieldLabel : "建设单位",
						name : "project.ctCustomName",
						relateModule : RelationModule.customer.relateModule,
						fields : ctCustomerFields,
						cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
						importhandler : this.importCustomerArchives.createDelegate(this)
					}, {
						xtype : "relationCompositeField",
						disabled : !this.saveable,
						allowBlank : true,
						fieldLabel : "监理单位",
						name : "project.supCustomName",
						relateModule : RelationModule.customer.relateModule,
						fields : supCustomerFields,
						cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
						importhandler : this.importCustomerArchives.createDelegate(this)
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						maxLength : 32,
						fieldLabel : "建设单位联系人",
						name : "project.ctCustomLinker"
					}, {
						maxLength : 32,
						fieldLabel : "监理单位联系人",
						name : "project.supCustomLinker"
					} ]
				}, {
					layout : "form",
					columnWidth : 0.33,
					defaultType : "textfield",
					items : [ {
						maxLength : 16,
						fieldLabel : "联系电话",
						name : "project.ctCustomLinkTel"
					}, {
						maxLength : 16,
						fieldLabel : "联系电话",
						name : "project.supCustomLinkTel"
					} ]
				} ]
			} ]
		}]
	});
	items.push(this.relateTabPanel);
	ProjectForm.superclass.constructor.call(this, {
		title : "项目商务信息",
		height : 600,
		animateTarget : this.animateTarget,
		centerLayout : true,
		form_config : {
			object : "project",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveProject.do",
			items : items,
			fieldMapping : ProjectFieldMapping,
			hiddenField : ProjectHiddenField
		}
	});
};
Ext.extend(ProjectForm, Knight.ux.FormPanelWindow, {
	importMaterialPractiArchives : function(data, fields) {
		var s = "";
		for(var i=0;i<data.length;i++){
			s+= data[i].data.practiName+",";
//			s+= data[i].data.fullname+",";
		}
		if(data.length>0){
			s = s.substr(0,s.length-1);
		}
		this.setMultiFieldValue(fields, [s]);
	},
	importProjectPractiArchives : function(data, fields) {
		var s = "";
		for(var i=0;i<data.length;i++){
			s+= data[i].data.fullname+",";
			//s+= data[i].data.fullname+"  ";
		}
		this.setMultiFieldValue(fields, [s]);
	},
	importCustomerArchives : function(data, fields) {
		this.findFormField(fields[1]).setReadOnly(true);
		this.setMultiFieldValue(fields, [ data.customerId, data.customerName, data.customerLinker.linker, data.customerLinker.tel,data.customerNiceName ]);
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.projectId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadProject.do?projectId=" + this.projectId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("province", data.provinceName);
					this.setFieldRawValue("city", data.cityName);
					this.setFieldRawValue("county", data.countyName);
					this.setFieldRawValue("scale", data.scaleName);
					this.setFieldRawValue("projectType", data.projectTypeName);
					this.setFieldRawValue("taxMode", data.taxModeName);
					this.setFormSubModuleGrid(data.projectExpenseSet);
					if (data.department) {
						this.getForm().findField("project.depId").setValue(data.department.depId);
						var  rep = $ajaxSyncCall(__ctxPath + "/system/detailDepartment.do",{ depId : data.department.parentId });
						if(rep.data[0]!=null) {
							this.getForm().findField("depTreeSelector").setValue(rep.data[0].depName+data.department.depName);
						}else{
							this.getForm().findField("depTreeSelector").setValue(data.department.depName);
						}
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}
	},
	saveFormData : function() {
		var depId = this.getForm().findField("project.department.depId").value;
		if (Ext.isEmpty(depId)) {
			$toast("错误信息", "请选择用户所属部门!");
			return;
		}
		this.setFieldValue("projectExpenses", $gridstore2json(this.projectExpenseGrid));
		if (this.getForm().isValid()) {
			$formsubmit(this.getForm(), function() {
				$toast("信息操作成功！");
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this));
		}
	}
});
