var InvoiceIssueForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var invoiceTypeCombo = $initComboBoxField("票据类型", "invoiceIssue.invoiceType", "invoiceType", {
		editable : true
	});
	var invoiceContentCombo = $initComboBoxField("开票内容", "invoiceIssue.invoiceContent", "invoiceContent", {
		editable : true
	});
	var invoiceStatusCombo = $initComboBoxField("开票情况", "invoiceIssue.invoiceStatus", "invoiceStatus", {
		editable : true
	});
	var taxRateData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "taxRate"
	});
	for (var i = 0; i < taxRateData.length; i++) {
		taxRateData[i] = taxRateData[i][1];
	}
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
					name : "invoiceIssue.userName"
				}, {
					maxLength : 24,
					allowBlank : true,
					fieldLabel : "票据单号",
					name : "invoiceIssue.invoiceSerial"
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
					name : "invoiceIssue.providedDate",
					value : new Date()
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "票据名称",
					name : "invoiceIssue.invoiceTheme"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "invoiceIssue.department.depName"
				}, invoiceTypeCombo,invoiceContentCombo,invoiceStatusCombo ]
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
				items : [ {
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "开票项目",
					name : "invoiceIssue.invoiceItem"
				}, {
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "关联业务",
					name : "invoiceIssue.relateModuleName",
					relations : [ {
						relation : RelationModule.settleContract
					}, {
						relation : RelationModule.purchase
					}, {
						relation : RelationModule.borrow
					} ],
					importhandler : this.importRelationArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "业务金额(元)",
					name : "invoiceIssue.relateAmount"
				}, {
					readOnly : true,
					fieldLabel : "已开票金额(元)",
					name : "invoiceIssue.hasIssueAmount"
				} ,{
					readOnly : true,
					fieldLabel : "项目地址",
					name : "invoiceIssue.receiveAddress"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "开票日期",
					name : "invoiceIssue.issueDate",
					value : new Date()
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "经办单位",
					name : "invoiceIssue.handleEntName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "合同编号",
					name : "invoiceIssue.relateSerial"
				}, 
				  {
					readOnly : true,
					fieldLabel : "项目编号",
					name : "invoiceIssue.projectSerial"
				},
			     {
					xtype : "datacombo",
					width : 130,
					fieldLabel : "税率",
					name : "invoiceIssue.taxRate",
					store : taxRateData
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "numberfield",
					allowBlank : false,
					maxValue : 999999999,
					fieldLabel : "开票金额(元)",
					name : "invoiceIssue.issueAmount",
					value : 0
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "开票人",
					name : "invoiceIssue.issuePractiName",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "业务主题",
					name : "invoiceIssue.relateTheme"
				}, {
					readOnly : true,
					fieldLabel : "税金",
					name : "invoiceIssue.taxAmount"
				},  
					{
						readOnly : true,
						fieldLabel : "项目名称",
						name : "invoiceIssue.projectName"
					} 
				  ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "开票说明",
			name : "invoiceIssue.description"
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : true,
			fieldLabel : "备注",
			name : "invoiceIssue.remark"
		} ]
	} ];
	InvoiceIssueForm.superclass.constructor.call(this, {
		title : "开票信息明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 95,
			object : "invoiceIssue",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.invoiceIssueId,
				relateModule : RelationModule.invoiceIssue.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.invoiceIssueId,
				relateModule : RelationModule.invoiceIssue.relateModule
			},
			url : __ctxPath + "/fund/saveInvoiceIssue.do",
			items : items,
			fieldMapping : InvoiceIssueFieldMapping,
			hiddenField : InvoiceIssueHiddenField
		}
	});
};
Ext.extend(InvoiceIssueForm, Knight.ux.FormPanelWindow, {
	importCorpInfoArchives : function(data) {
		this.setMultiFieldValue([ "handleEntId", "handleEntName" ], [ data.corpId, data.corpName ]);
	},
	importPractiArchives : function(data) {
		this.setMultiFieldValue([ "issuePractiId", "issuePractiName" ], [ data.practiId, data.practiName ]);
	},
	importRelationArchives : function(data, relation) {
		var fieldNames = [ "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName","invoiceType" ];
		var values = [ relation.relateId, relation.relateSerial, relation.relateTheme, relation.relateModule, relation.relateModuleName,
		               relation.invoiceType ];
		this.setMultiFieldValue(fieldNames, values);
	},
	saveFormData : function() {
		var taxRate = this.getFieldValue("taxRate");
		var issueAmount = this.getFieldValue("issueAmount");
		var a = 0;
		a =(issueAmount * parseInt(taxRate))/100;
		if (Ext.isEmpty(taxRate)) {
			this.setFieldValue("taxRate", 0);
			this.setFieldValue("taxAmount", 0);
		} else if (!Ext.isEmpty(issueAmount)) {
			this.setFieldValue("taxAmount", a);
		}
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/fund/multiSubmitInvoiceIssue.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.invoiceIssueId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/fund/loadInvoiceIssue.do?invoiceIssueId=" + this.invoiceIssueId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
			var fieldNames = [ "projectId", "projectSerial", "projectName", "receiveAddress", "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName", "manager","contractId" ];
			var values = [ this.relation.projectId, this.relation.projectSerial, this.relation.projectName, this.relation.address, this.relation.relateId, this.relation.relateSerial, this.relation.relateTheme, this.relation.relateModule, this.relation.relateModuleName, this.relation.manager,this.relation.contractId ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});