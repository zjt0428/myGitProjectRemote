var LeaseApplicationForm = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	
	var assetsPropertyCombo = $initComboBoxField("资产属性", "leaseApplication.assetsProperty", "assetsProperty", {
		editable : false,
		readOnly : !this.saveable,
		disabled : !this.saveable,
		width : 150,
		allowBlank : false
	});
	var paymentMethodCombo = $initComboBoxField("支付方式", "leaseApplication.paymentMethod", "paymentType", {
		editable : false,
		readOnly : !this.saveable,
		disabled : !this.saveable,
		width : 150,
		allowBlank : false
	});
	
	this.leaseListGrid = new LeaseListGrid({
		saveable : this.saveable
	});
	
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.applicationId,
		relateModule : RelationModule.leaseApplication.relateModule,
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
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "leaseApplication.project.projectName",
					fields : ["project.projectId", "project.projectName"],
					relateModule : RelationModule.project.relateModule,
					cleanhandler : this.cleanMultiFieldRelease.createDelegate(this),
					importhandler : this.importProject.createDelegate(this)
				}, assetsPropertyCombo, paymentMethodCombo, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					fieldLabel : "供应商",
					readOnly : true,
					editable : false,
					allowBlank : false,
					name : "leaseApplication.suppliers",
					relateModule : RelationModule.supplier.relateModule,
					fields : ["suppliers"],
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importSupplierArchives.createDelegate(this)
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					fieldLabel : "申请人",
					name : "leaseApplication.userName"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					readOnly : true,
					fieldLabel : "申请单位",
					name : "leaseApplication.applyingUnit"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					allowBlank : false,
					editable : false,
					readOnly : true,
					value : new Date(),
					fieldLabel : "申请日期",
					name : "leaseApplication.fillDate"
				}, {
					xtype : "numberfield",
					disabled : !this.saveable,
					allowDecimals : true,
					allowNegative : false,
					allowBlank : false,
					unitText : "%",
					fieldLabel : "税率",
					name : "leaseApplication.taxRate"
				}]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					disabled : !this.saveable,
					readOnly : true,
					editable : false,
					fieldLabel : "申请编号",
					name : "leaseApplication.applicationSerial"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "租借主题",
					name : "leaseApplication.leaseTheme"
				}, {
					disabled : !this.saveable,
					fieldLabel : "生产厂家",
					name : "leaseApplication.manufacturer"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					allowBlank : false,
					editable : false,
					fieldLabel : "进场时间",
					name : "leaseApplication.approachDate"
				}]
			}]
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			disabled : !this.saveable,
			fieldLabel : "质量及其他要求",
			name : "leaseApplication.otherRequirements"
		}]
	}, {
		xtype : "fieldset",
		anchor : "98%",
		labelWidth : 30,
		items : [fileAttachContainer]
	}, {
		xtype : "panel",
		anchor : "98%",
		layout : "fit",
		items : [this.leaseListGrid]
	}]
	
	LeaseApplicationForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		title : "租借申请明细",
		form_config : {
			object : "leaseApplication",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.applicationId,
				relateModule : RelationModule.leaseApplication.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.applicationId,
				relateModule : RelationModule.leaseApplication.relateModule
			},
			url : __ctxPath + "/materials/saveLeaseApplication.do",
			items : items,
			fieldMapping : LeaseApplicationFieldMapping,
			hiddenField : LeaseApplicationHiddenField
		}
	});
}

Ext.extend(LeaseApplicationForm, Knight.ux.FormPanelWindow, {
	importProject : function (data, fields) {
		this.setMultiFieldValue(fields, [ data.projectId, data.projectName ]);
	},
	importSupplierArchives : function (data, fields) {
		this.setMultiFieldValue(fields, [ data.supplierName]);
	},
	saveFormData : function() {
		this.setFieldValue("leaseLists", $gridstore2json(this.leaseListGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			if (resp.applyforId) {
				this.submitApplication(__ctxPath + "/materials/multiSubmitLeaseApplication.do", resp.applyforId);
			} else {
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}
		}.createDelegate(this))
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.applicationId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/materials/loadLeaseApplication.do?applicationId=" + this.applicationId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("assetsProperty", data.assetsPropertyName);
					this.setFieldRawValue("paymentMethod", data.paymentMethodName);
					this.setFormSubModuleGrid(data.leaseListSet, this.leaseListGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			})
		} else {
			var fieldNames = [ "userId", "userName", "applyingUnit" ];
			var values = [ curUserInfo.userId, curUserInfo.fullname, curUserInfo.depName];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
})