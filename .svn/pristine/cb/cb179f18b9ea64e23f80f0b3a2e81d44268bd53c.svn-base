var ReimburseForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	this.reimburseTicketGrid = new ReimburseTicketGrid(null, {
		saveable : this.saveable
	});
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.reimburseId,
		relateModule : RelationModule.reimburse.relateModule,
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
					name : "reimburse.userName"
				}, {
					readOnly : true,
					fieldLabel : "报销编号",
					name : "reimburse.reimburseSerial"
				}, {
					xtype : "numberfield",
					readOnly : true,
					maxValue : 9999999999,
					fieldLabel : "报销批复总额",
					name : "reimburse.reimburseAmount"
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
					name : "reimburse.providedDate",
					value : new Date()
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "报销主题",
					name : "reimburse.reimburseTheme"
				}, {
					readOnly : true,
					fieldLabel : "收款开户行",
					name : "reimburse.receiveBank"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "reimburse.department.depName"
				}, {
					xtype : "datefield",
					format : "Y年m月",
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "报销年月",
					name : "reimburse.reimburseMonth",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "收款账号",
					name : "reimburse.receiveAccount"
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
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "付款单位",
					name : "reimburse.paymentEntName",
					relateModule : RelationModule.corpAccount.relateModule,
					importhandler : this.importCorpAccountArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "报销人员",
					name : "reimburse.practiName",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "总票据张数",
					name : "reimburse.ticketCount"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "关联设备",
					name : "reimburse.recordSerial",
					relateModule : RelationModule.equipment.relateModule,
					importhandler : this.importEquipmentArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "关联客户",
					name : "reimburse.customerName",
					relations : [ {
						relation : RelationModule.corp
					}, {
						relation : RelationModule.customer
					}, {
						relation : RelationModule.supplier
					} ],
					importhandler : this.importCustomerRelationArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "关联业务",
					name : "reimburse.relateModuleName",
					relations : [ {
						relation : RelationModule.contractLease
					}, {
						relation : RelationModule.purchase
					}, {
						relation : RelationModule.borrow
					} ],
					importhandler : this.importRelationArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "关联项目",
					name : "reimburse.projectName",
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProjectArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "付款开户行",
					name : "reimburse.paymentBank"
				}, {
					readOnly : true,
					fieldLabel : "联系方式",
					name : "reimburse.practiTel"
				}, {
					readOnly : true,
					fieldLabel : "已欠款总额",
					name : "reimburse.arrearsAmount"
				}, {
					readOnly : true,
					fieldLabel : "设备类别",
					name : "reimburse.equipCategoryName"
				}, {
					readOnly : true,
					fieldLabel : "联系方式",
					name : "reimburse.customerTel"
				}, {
					readOnly : true,
					fieldLabel : "业务编号",
					name : "reimburse.relateSerial"
				}, {
					readOnly : true,
					fieldLabel : "项目编号",
					name : "reimburse.projectSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "付款账号",
					name : "reimburse.paymentAccount"
				}, {
					readOnly : true,
					fieldLabel : "申请报销总额",
					name : "reimburse.askforAmount"
				}, {
					readOnly : true,
					fieldLabel : "规格型号",
					name : "reimburse.equipSpecificName"
				}, {
					readOnly : true,
					fieldLabel : "设备名称",
					name : "reimburse.equipGenericName"
				}, {
					readOnly : true,
					fieldLabel : "备案编号",
					name : "reimburse.recordId"
				}, {
					readOnly : true,
					fieldLabel : "业务主题",
					name : "reimburse.relateTheme"
				}, {
					readOnly : true,
					fieldLabel : "项目地址",
					name : "reimburse.address"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 500,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "报销说明",
			name : "reimburse.description"
		} ,fileAttachContainer]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.reimburseTicketGrid ]
	} ];
	ReimburseForm.superclass.constructor.call(this, {
		title : "报销信息明细",
		animateTarget : this.animateTarget,
		width : 890,
		height : 590,
		form_config : {
			title : "报销管理",
			labelWidth : 80,
			object : "reimburse",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.reimburseId,
				relateModule : RelationModule.reimburse.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.reimburseId,
				relateModule : RelationModule.reimburse.relateModule
			},
			url : __ctxPath + "/fund/saveReimburse.do",
			items : items,
			fieldMapping : ReimburseFieldMapping,
			hiddenField : ReimburseHiddenField
		}
	});
};
Ext.extend(ReimburseForm, Knight.ux.FormPanelWindow, {
	importCorpAccountArchives : function(data) {
		var fieldNames = [ "paymentEntId", "paymentModule", "paymentEntName", "paymentEntAccountId", "paymentBank", "paymentAccount" ];
		var values = [ data.corp.corpId, RelationModule.corp.relateModule, data.corp.corpName, data.corpAccountId, data.bankDeposit, data.account ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importPractiArchives : function(data) {
		this.setMultiFieldValue([ "practiId", "practiName", "practiTel" ], [ data.practiId, data.practiName, data.mobile ]);
	},
	importEquipmentArchives : function(data) {
		this.setMultiFieldValue([ "equipId", "recordSerial", "equipCategory", "equipCategoryName", "equipGeneric", "equipGenericName", "equipSpecific", "equipSpecificName", "recordId" ], [ data.equipId, data.recordSerial, data.equipCategory, data.equipCategoryName, data.equipGeneric, data.equipGenericName, data.equipSpecific, data.equipSpecificName, data.recordId ]);
	},
	importCustomerRelationArchives : function(data, relation) {
		var fieldNames = [ "customerId", "customerName", "customerTel" ];
		var values = [ relation.relateId, relation.relateSerial, relation.relateTel ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importRelationArchives : function(data, relation) {
		var fieldNames = [ "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName" ];
		var values = [ relation.relateId, relation.relateSerial, relation.relateTheme, relation.relateModule, relation.relateModuleName ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importProjectArchives : function(data) {
		this.setMultiFieldValue([ "projectId", "projectSerial", "projectName", "address" ], [ data.projectId, data.projectSerial, data.projectName, data.address ]);
	},
	saveFormData : function() {
		var ticketAmount = 0;
		var ticketCount = 0;
		for (var i = 0; i < this.reimburseTicketGrid.getStore().getCount(); i++) {
			var r = this.reimburseTicketGrid.getStore().getAt(i).data;
			if (Ext.isEmpty(r.reimburseType)) {
				Ext.Msg.alert("信息不完整", "第[" + (i + 1) + "]条记录费用类别未选择!");
				return;
			}
			ticketAmount += Number(r.summary);
			ticketCount += Number(r.ticketQuantity);
		}
		this.setFieldValue("reimburseAmount", ticketAmount);
		this.setFieldValue("askforAmount", ticketAmount);
		this.setFieldValue("ticketCount", ticketCount);
		this.setFieldValue("reimburseTickets", $gridstore2json(this.reimburseTicketGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/fund/multiSubmitReimburse.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.reimburseId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/fund/loadReimburse.do?reimburseId=" + this.reimburseId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.reimburseTicketSet, this.reimburseTicketGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
		}
	},
	preApproveApplicationSubmit : function(a) {
		var reimburseAmountField = this.getForm().findField("reimburse.reimburseAmount");
		if (reimburseAmountField.isValid()) {
			var reimburseAmount = reimburseAmountField.getValue();
			a.getForm().findField("formApprove.extendMessage").setValue(reimburseAmount);
			return true;
		}
		return false;
	}
});