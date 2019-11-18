var EquipContractLeaseForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.activateId,
		relateModule : RelationModule.equipContractLease.relateModule,
		saveable : this.saveable
	});
	
	equipFlowFields = ["recordSerial","equipGenericName","equipSpecificName","equipCategoryName","recordId","exwSerial","propertyName" ];
	prjectFields = [ "projectId","emEntName" ];
	
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
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报人",
					name : "equipContractLease.userName"
				}, {
					readOnly : false,
					fieldLabel : "启用单号",
					name : "equipContractLease.activateSerial"
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
					name : "equipContractLease.providedDate",
					value : new Date()
				}, {
					xtype : "datetimefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					allowBlank : false,
					fieldLabel : "启用日期",
					name : "equipContractLease.activateDate"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "equipContractLease.department.depName"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "验收日期",
					name : "equipContractLease.acceptanceDate",
					value : new Date()
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
					maxLength : 64,
					//readOnly : false,
					fieldLabel : "合同编号",
					name : "equipContractLease.contractSerial"
				}, {
					readOnly : false,
					fieldLabel : "安装告知",
					name : "equipContractLease.installSerial"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					fieldLabel : "启用设备",
					name : "equipContractLease.recordSerial",
					fields : equipFlowFields,
					relateModule : RelationModule.equipT.relateModule,
					cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
					importhandler : this.importEquipFlowArchives.createDelegate(this)
				}, {
					fieldLabel : "规格型号",
					name : "equipContractLease.equipSpecificName"
				}, {
					fieldLabel : "产权单位",
					name : "equipContractLease.propertyName"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					readOnly : false,
					fieldLabel : "司机上岗日期",
					name : "equipContractLease.appointmentDate",
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
					readOnly : false,
					fieldLabel : "安装主题",
					name : "equipContractLease.installTheme"
				}, {
					readOnly : false,
					fieldLabel : "安装高度",
					name : "equipContractLease.installHeight"
				}, {
					fieldLabel : "设备类别",
					name : "equipContractLease.equipCategoryName"
				}, {
					fieldLabel : "备案编号",
					name : "equipContractLease.recordId"
				}, {
					fieldLabel : "项目编号",
					name : "equipContractLease.projectSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					readOnly : false,
					disabled : !this.saveable,
					fieldLabel : "安装日期",
					name : "equipContractLease.startinDate"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					allowBlank : true,
					fields : prjectFields,
					fieldLabel : "使用单位",
					name : "equipContractLease.emEntName",
					relateModule : RelationModule.project.relateModule,
					cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
					importhandler : this.importProjectArchives.createDelegate(this)
				}, {
					fieldLabel : "设备名称",
					name : "equipContractLease.equipGenericName"
				}, {
					fieldLabel : "出厂编号",
					name : "equipContractLease.exwSerial"
				}, {
					fieldLabel : "项目名称",
					name : "equipContractLease.projectName"
				} ]
			} ]
		}, {
			xtype : "textfield",
			anchor : "95%",
			readOnly : true,
			fieldLabel : "项目所属地",
			name : "equipContractLease.address"
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			fieldLabel : "备注",
			name : "equipContractLease.remark"
		}, fileAttachContainer ]
	} ];
	EquipContractLeaseForm.superclass.constructor.call(this, {
		title : "启用信息明细",
		maximized : true,
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 100,
			object : "equipContractLease",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveContractLeaseEquipActivate.do",
			items : items,
			fieldMapping : EquipContractLeaseFieldMapping,
			hiddenField : EquipContractLeaseHiddenField
		}
	});
};
Ext.extend(EquipContractLeaseForm, Knight.ux.FormPanelWindow, {
	importEquipFlowArchives : function(data, fields){
		this.setMultiFieldValue(fields, [ data.recordSerial,data.equipGenericName,data.equipSpecificName,data.equipCategoryName,data.recordId,data.exwSerial,data.propertyName]);
	},

	importProjectArchives : function(data, fields){
		this.setMultiFieldValue(fields, [ data.projectId,data.unCustomName ]);
	},
	
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.activateId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadContractEquipActivate.do?activateId=" + this.activateId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this),
				failure : function(c, d) { 
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames =  [ "userId", "userName", "department.depId", "department.depName", "contractSerial", "address","projectName","projectSerial" ];
			var values = [ curUserInfo.userId, curUserInfo.fullname, curUserInfo.depId, curUserInfo.depName, this.contractSerial ,this.address,this.projectName,this.projectSerial ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});