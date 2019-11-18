var IndisSchemaForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	this.indisSchemaPractiGrid = new IndisSchemaPractiGrid({
		schemaId : this.schemaId
	}, {
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.schemaId,
		relateModule : RelationModule.indisSchema.relateModule,
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
					fieldLabel : "发放人",
					name : "indisSchema.issuer"
				}, {
					readOnly : true,
					fieldLabel : "方案编号",
					name : "indisSchema.schemaSerial"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "设备编号",
					name : "indisSchema.equipment.recordId",
					relateModule : RelationModule.equipment.relateModule,
					importhandler : this.importEquipmentArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "安装单位",
					name : "indisSchema.inEntName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "使用单位",
					name : "indisSchema.emEntName",
					relateModule : RelationModule.customer.relateModule,
					importhandler : this.importCustomerArchives.createDelegate(this)
				}, {
					xtype : "numberfield",
					fieldLabel : "建筑高度(M)",
					value : 0,
					name : "indisSchema.overallHeight"
				}, {
					xtype : "numberfield",
					fieldLabel : "最终安装高度(M)",
					value : 0,
					name : "indisSchema.finalHeight"
				}, {
					maxLength : 16,
					fieldLabel : "楼号",
					name : "indisSchema.blockNumber"
				} , {
					fieldLabel : "吊臂长度",
					name : "indisSchema.boomLength"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					fieldLabel : "发放部门",
					name : "indisSchema.issuerDepartment"
				}, {
					xtype : "datefield",
					width : 125,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "填报日期",
					name : "indisSchema.providedDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "设备名称",
					name : "indisSchema.equipment.equipGenericName"
				}, {
					allowBlank : false,
					fieldLabel : "安拆资质证书号",
					name : "indisSchema.inEntCertNum",
					value : "无"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : false,
					allowBlank : true,
					fieldLabel : "技术负责人",
					name : "indisSchema.technicalDirector",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importTechnicalArchives.createDelegate(this)
				}, {

					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : false,
					allowBlank : true,
					fieldLabel : "方案编制人",
					name : "indisSchema.schemaDesigner",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importSchemaArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : false,
					allowBlank : true,
					fieldLabel : "安全负责人",
					name : "indisSchema.secureDirector",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importSecureArchives.createDelegate(this)
				}, {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报人",
					name : "indisSchema.userName"
				}, {
					maxLength : 20,
					fieldLabel : "轴线位置",
					name : "indisSchema.axisPosition"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "审批状态",
					name : "indisSchema.applyforStateName"
				}, {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "indisSchema.equipment.exwSerial"
				}, {
					readOnly : true,
					fieldLabel : "规格型号",
					name : "indisSchema.equipment.equipSpecificName"
				}, {
					allowBlank : false,
					fieldLabel : "资质等级",
					name : "indisSchema.inEntTitleLevel",
					value : "无"
				}, {
					maxLength : 16,
					fieldLabel : "联系电话",
					name : "indisSchema.technicalPhone"
				}, {
					maxLength : 16,
					fieldLabel : "联系电话",
					name : "indisSchema.schemaPhone"
				}, {
					maxLength : 16,
					fieldLabel : "联系电话",
					name : "indisSchema.securePhone"
				}, {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "indisSchema.department.depName"
				}, {
					maxLength : 20,
					fieldLabel : "项目负责人",
					name : "indisSchema.projectPrincipal"
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
					fieldLabel : "项目名称",
					name : "indisSchema.project.projectName",
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProjectArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					anchor : "92%",
					readOnly : true,
					fieldLabel : "项目地址",
					name : "indisSchema.project.address"
				} ]
			} ]
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			height : 48,
			fieldLabel : "备注",
			name : "indisSchema.remark"
		}, fileAttachContainer ]
	}/*, {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.indisSchemaPractiGrid ]
	}*/ ];
	IndisSchemaForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			object : "indisSchema",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.schemaId,
				relateModule : RelationModule.indisSchema.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.schemaId,
				relateModule : RelationModule.indisSchema.relateModule
			},
			url : __ctxPath + "/safety/saveIndisSchema.do",
			items : items,
			fieldMapping : IndisSchemaFieldMapping,
			hiddenField : IndisSchemaHiddenField
		}
	});
};
Ext.extend(IndisSchemaForm, Knight.ux.FormPanelWindow, {
	importProjectArchives : function(data) {
		var fieldNames = [ "projectId", "projectName", "address" ];
		this.setMultiFieldValue(this.paddingFieldNames("project", fieldNames), this.paddingValues(data, fieldNames));
	},
	importCustomerArchives : function(data) {
		this.setMultiFieldValue([ "emEnt", "emEntModule", "emEntName" ], [ data.customerId, RelationModule.customer.relateModule, data.customerName ]);
	},
	importCorpInfoArchives : function(data) {
		var fieldNames = [ "inEnt", "inEntModule", "inEntName", "inEntCertNum" ];
		var values = [ data.corpId, RelationModule.corp.relateModule, data.corpName, data.corpCert ? data.corpCert.certNum : "" ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importTechnicalArchives : function(data) {
		var fieldNames = [ "technicalDirector", "technicalPhone"];
		var values = [ data.practiName ,data.mobile ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importSchemaArchives : function(data) {
		var fieldNames = [ "schemaDesigner", "schemaPhone"];
		var values = [ data.practiName ,data.mobile ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importSecureArchives : function(data) {
		var fieldNames = [ "secureDirector", "securePhone"];
		var values = [ data.practiName ,data.mobile ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importEquipmentArchives : function(data) {
		var fieldNames = [ "equipId", "equipGenericName", "equipSpecificName", "recordId", "exwSerial" ];
		this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(data, fieldNames));
	},
	saveFormData : function() {
		this.setFieldValue("indisSchemaPractis", $gridstore2json(this.indisSchemaPractiGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			//if (this.callback) {
			//	this.callback.call(this);
			//}
			//this.close();
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/safety/multiSubmitIndisSchema.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.schemaId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/safety/loadIndisSchema.do?schemaId=" + this.schemaId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					//this.setFormSubModuleGrid(data.indisSchemaPractiSet, this.indisSchemaPractiGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			if(this.contractArrange){
				//项目名称等等		
				this.setFieldValue("project.address", this.contractArrange.projectAddress);
				var fieldNames = [ "projectId", "projectName" ];
				this.setMultiFieldValue(this.paddingFieldNames("project", fieldNames), this.paddingValues(this.contractArrange, fieldNames));
				var contractArrange = this.contractArrange;
				var equipment = this.equipment;
				var fieldNames = [ "equipId", "equipGenericName", "equipSpecificName", "recordId", "exwSerial" ];
				this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(equipment, fieldNames));
				var corpCert = this.inEntInfo.corpCert;

				fieldNames = [ "issuer", "issuerDepartment", "department.depId", "department.depName", "userId", "userName", "contractArrange.arrangeId", "relateModule",
								"inEntCertNum","inEnt", "inEntModule", "inEntName", "inEntCertNum","inEntTitleLevel","emEnt", "emEntModule", "emEntName"  ]; 
				var values = [ curUserInfo.fullname, curUserInfo.depName, curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, contractArrange.contractId, this.relateModule,
								corpCert ? corpCert.certNum : "",contractArrange.inEnt,contractArrange.inEntModule,contractArrange.inEntName,contractArrange.inEntCertNum,contractArrange.inEntTitleLevel,
										contractArrange.customerId,RelationModule.corp.relateModule,contractArrange.customerName];
				this.setMultiFieldValue(fieldNames, values);		
			}else{
				//项目名称等等		
				this.setFieldValue("project.address", this.ContractLease.address);
				var fieldNames = [ "projectId", "projectName" ];
				this.setMultiFieldValue(this.paddingFieldNames("project", fieldNames), this.paddingValues(this.ContractLease, fieldNames));
				var contractArrange = this.ContractLease;
				var equipment = this.equipment;
				var fieldNames = [ "equipId", "equipGenericName", "equipSpecificName", "recordId", "exwSerial" ];
				this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(equipment, fieldNames));

				fieldNames = [ "issuer", "issuerDepartment", "department.depId", "department.depName", "userId", "userName", "contractArrange.arrangeId", "relateModule",
							"inEnt", "inEntModule", "inEntName","emEnt", "emEntModule", "emEntName"  ]; 
				var values = [ curUserInfo.fullname, curUserInfo.depName, curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, contractArrange.contractId, this.relateModule,
							contractArrange.pbEnt,contractArrange.pbModule,contractArrange.pbEntName,
										contractArrange.pbEnt,RelationModule.corp.relateModule,contractArrange.pbEntName];
				this.setMultiFieldValue(fieldNames, values);		
			}
				
		}
	}
});