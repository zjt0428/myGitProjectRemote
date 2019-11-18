var InvoiceCollectForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	var invoiceTypeCombo = $initComboBoxField("票据类型", "invoiceCollect.invoiceType", "invoiceType", {
		editable : true
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
					name : "invoiceCollect.userName"
				}, {
					maxLength : 24,
					allowBlank : true,
					fieldLabel : "票据单号",
					name : "invoiceCollect.invoiceSerial"
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
					name : "invoiceCollect.providedDate",
					value : new Date()
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "票据名称",
					name : "invoiceCollect.invoiceTheme"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "invoiceCollect.department.depName"
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
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "收票项目",
					name : "invoiceCollect.invoiceItem"
				}, invoiceTypeCombo, {
					xtype : "relationCompositeMenuButtonField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "关联业务",
					name : "invoiceCollect.relateModuleName",
					relations : [ {
						relation : RelationModule.settleContract
					},/* {
						relation : RelationModule.purchase
					}, {
						relation : RelationModule.borrow
					}, */{
						relation : RelationModule.equipment
					},/* {
						relation : RelationModule.equipDetect
					},*/ {
						relation : RelationModule.insureEquip
					} ],
					importhandler : this.importRelationArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "已收票金额(元)",
					name : "invoiceCollect.hasCollectAmount"
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
					fieldLabel : "收票日期",
					name : "invoiceCollect.collectDate",
					value : new Date()
				}, {
					maxLength : 32,
					allowBlank : false,
					fieldLabel : "收票单位",
					name : "invoiceCollect.issueEnterprise"
				}, {
					readOnly : true,
					fieldLabel : "业务编号",
					name : "invoiceCollect.relateSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "numberfield",
					allowBlank : false,
					maxLength : 9,
					fieldLabel : "收票金额(元)",
					name : "invoiceCollect.collectAmount"
				}, {
					readOnly : true,
					fieldLabel : "关联业务金额(元)",
					name : "invoiceCollect.relateAmount"
				}, {
					readOnly : true,
					fieldLabel : "业务主题",
					name : "invoiceCollect.relateTheme"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "收票说明",
			name : "invoiceCollect.description"
		} ]
	} ];
	InvoiceCollectForm.superclass.constructor.call(this, {
		title : "收票信息明细",
		animateTarget : this.animateTarget,
		form_config : {
			labelWidth : 80,
			object : "invoiceCollect",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.invoiceCollectId,
				relateModule : RelationModule.invoiceCollect.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.invoiceCollectId,
				relateModule : RelationModule.invoiceCollect.relateModule
			},
			url : __ctxPath + "/fund/saveInvoiceCollect.do",
			items : items,
			fieldMapping : InvoiceCollectFieldMapping,
			hiddenField : InvoiceCollectHiddenField
		}
	});
};
Ext.extend(InvoiceCollectForm, Knight.ux.FormPanelWindow, {
	importRelationArchives : function(data, relation) {
		var fieldNames = [ "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName" ];
		var values = [ relation.relateId, relation.relateSerial, relation.relateTheme, relation.relateModule, relation.relateModuleName ];
		this.setMultiFieldValue(fieldNames, values);
	},
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/fund/multiSubmitInvoiceCollect.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.invoiceCollectId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/fund/loadInvoiceCollect.do?invoiceCollectId=" + this.invoiceCollectId,
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
		}
	}
});