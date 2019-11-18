var EquipDetectForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	this.equipDetectStatementGrid = new EquipDetectStatementGrid({
		detectId : this.detectId
	}, {
		parentForm : this,
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.detectId,
		relateModule : RelationModule.equipDetect.relateModule,
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "报告编号",
		anchor : "98%",
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					allowBlank : false,
					fieldLabel : "检测单号",
					name : "equipDetect.detectSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "检测费用",
					name : "equipDetect.detectAmount"
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
				columnWidth : 0.34,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "使用设备",
					name : "equipDetect.equipFlow.equipDiary.recordSerial"
				}, {
					fieldLabel : "规格型号",
					name : "equipDetect.equipFlow.equipDiary.equipSpecificName"
				}, {
					fieldLabel : "关联业务",
					name : "equipDetect.relateModuleName"
				}, {
					fieldLabel : "使用单位",
					name : "equipDetect.emEntName"
				}, {
					fieldLabel : "监理单位",
					name : "equipDetect.supEntName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "安全生产许可证号",
					name : "equipDetect.licenseNumber",
					relateModule : RelationModule.corpCert.relateModule,
					importhandler : this.importCorpCertArchives.createDelegate(this)
				}, {
					fieldLabel : "报告签发日期",
					name : "equipDetect.eportDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "设备类别",
					name : "equipDetect.equipFlow.equipDiary.equipCategoryName"
				}, {
					fieldLabel : "备案编号",
					name : "equipDetect.equipFlow.equipDiary.recordId"
				}, {
					fieldLabel : "出厂编号",
					name : "equipDetect.equipFlow.equipDiary.exwSerial"
				}, {
					fieldLabel : "关联业务编号",
					name : "equipDetect.relateSerial"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "安装主要负责人",
					fields : [ "installPrincipal" ],
					name : "equipDetect.installPrincipal",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractitionerArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "安装项目负责人",
					fields : [ "projectPrincipal" ],
					name : "equipDetect.projectPrincipal",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractitionerArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "安全生产管理人",
					fields : [ "safetyPrincipal" ],
					name : "equipDetect.safetyPrincipal",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractitionerArchives.createDelegate(this)
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					readOnly : false,
					editable : false,
					fieldLabel : "检测日期",
					name : "equipDetect.detectDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "设备名称",
					name : "equipDetect.equipFlow.equipDiary.equipGenericName"
				}, {
					fieldLabel : "项目编号",
					name : "equipDetect.equipFlow.equipDiary.projectSerial"
				}, {
					fieldLabel : "项目名称",
					name : "equipDetect.equipFlow.equipDiary.projectName"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "证书编号",
					fields : [ "installCertNum" ],
					name : "equipDetect.installCertNum",
					relateModule : RelationModule.practiCert.relateModule,
					importhandler : this.importPractiCertArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "证书编号",
					fields : [ "projectCertNum" ],
					name : "equipDetect.projectCertNum",
					relateModule : RelationModule.practiCert.relateModule,
					importhandler : this.importPractiCertArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "证书编号",
					fields : [ "safetyCertNum" ],
					name : "equipDetect.safetyCertNum",
					relateModule : RelationModule.practiCert.relateModule,
					importhandler : this.importPractiCertArchives.createDelegate(this)
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					readOnly : false,
					editable : false,
					fieldLabel : "下次检测日期",
					name : "equipDetect.redetectDate",
					value : new Date()
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "资料报检设备",
					name : "equipDetect.exwSerial",
					relateModule : RelationModule.equipment.relateModule,
					importhandler : this.importExwSerialArchives.createDelegate(this)
				} ]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "检测单位",
					name : "equipDetect.detectEntName",
					relateModule : RelationModule.supplier.relateModule,
					importhandler : this.importSupplierArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					xtype : "textfield",
					anchor : "90%",
					readOnly : true,
					fieldLabel : "项目所属地",
					name : "equipDetect.equipFlow.equipDiary.address"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			fieldLabel : "备注",
			name : "equipDetect.remark"
		}, fileAttachContainer ]
	}, {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.equipDetectStatementGrid ]
	} ];
	EquipDetectForm.superclass.constructor.call(this, {
		title : "检测信息明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "equipDetect",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveEquipDetect.do",
			items : items,
			fieldMapping : EquipDetectFieldMapping,
			hiddenField : EquipDetectHiddenField
		}
	});
};
Ext.extend(EquipDetectForm, Knight.ux.FormPanelWindow, {
	importPractiCertArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.certNum ]);
	},
	importPractitionerArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiName ]);
	},
	importCorpCertArchives : function(data) {
		this.setMultiFieldValue([ "licenseNumber" ], [ data.certNum ]);
	},
	importSupplierArchives : function(data) {
		this.setMultiFieldValue([ "detectEnt", "detectEntName" ], [ data.supplierId, data.supplierName ]);
	},
	importExwSerialArchives : function(data) {
		this.setMultiFieldValue([ "exwSerial" ], [ data.exwSerial ]);
	},
	saveFormData : function() {
		this.setFieldValue("detectAmount", this.equipDetectStatementGrid.getTotalSummary());
		this.setFieldValue("equipDetectStatements", $gridstore2json(this.equipDetectStatementGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.detectId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadEquipDetect.do?detectId=" + this.detectId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.getForm().findField("equipDetect.detectSerial").setReadOnly(true);

					this.setFormSubModuleGrid(data.equipDetectStatementSet, this.equipDetectStatementGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "relateId", "relateSerial", "relateModule", "relateModuleName", "equipFlow.flowId" ];
			var values = [ this.relateId, this.relateSerial, this.relateModule, this.relateModuleName, this.equipFlow.flowId ];
			this.setMultiFieldValue(fieldNames, values);
			fieldNames = [ "recordSerial", "equipSpecificName", "equipCategoryName", "recordId","exwSerial", "equipGenericName", "projectSerial", "projectName", "address" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipFlow.equipDiary", fieldNames), this.paddingValues(this.equipFlow.equipDiary, fieldNames));
			$request({
				url : __ctxPath + "/archive/loadProject.do?projectId=" + this.equipFlow.equipDiary.projectId,
				success : function(g, h) {
					var data = Ext.util.JSON.decode(g.responseText).data[0];
					var fieldNames = [ "emEntName", "supEntName" ];
					var values = [ data.unCustomName, data.supCustomName ];
					this.setMultiFieldValue(fieldNames, values);
				}.createDelegate(this)
			});
		}
	}
});