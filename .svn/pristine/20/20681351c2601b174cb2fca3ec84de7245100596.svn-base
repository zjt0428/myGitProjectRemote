var MoneyLendForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

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
					name : "moneyLend.userName"
				}, {
					readOnly : true,
					fieldLabel : "借款单号",
					name : "moneyLend.lendSerial"
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
					name : "moneyLend.providedDate",
					value : new Date()
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "借款主题",
					name : "moneyLend.lendTheme"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "moneyLend.department.depName"
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
					name : "moneyLend.paymentEntName",
					relateModule : RelationModule.corpAccount.relateModule,
					importhandler : this.importCorpAccountArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "借款人员",
					name : "moneyLend.practiName",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					xtype : "numberfield",
					allowBlank : false,
					maxLength : 9,
					fieldLabel : "借款金额",
					name : "moneyLend.lendAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "付款开户行",
					name : "moneyLend.paymentBank"
				}, {
					readOnly : true,
					fieldLabel : "联系方式",
					name : "moneyLend.practiTel"
				}, {
					readOnly : true,
					fieldLabel : "当前欠款总额",
					name : "moneyLend.arrearsAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "付款账号",
					name : "moneyLend.paymentAccount"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "借款时间",
					name : "moneyLend.lendDate",
					value : new Date()
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "预计还款时间",
					name : "moneyLend.backDate",
					value : new Date()
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "借款说明",
			name : "moneyLend.description"
		} ]
	} ];
	MoneyLendForm.superclass.constructor.call(this, {
		title : "借款信息明细",
		animateTarget : this.animateTarget,
		height : 350,
		width : 900,
		form_config : {
			labelWidth : 100,
			object : "moneyLend",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.lendId,
				relateModule : RelationModule.moneyLend.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.lendId,
				relateModule : RelationModule.moneyLend.relateModule
			},
			url : __ctxPath + "/fund/saveMoneyLend.do",
			items : items,
			fieldMapping : MoneyLendFieldMapping,
			hiddenField : MoneyLendHiddenField
		}
	});
};
Ext.extend(MoneyLendForm, Knight.ux.FormPanelWindow, {
	importCorpAccountArchives : function(data) {
		var fieldNames = [ "paymentEntId", "paymentModule", "paymentEntName", "paymentEntAccountId", "paymentBank", "paymentAccount" ];
		var values = [ data.corp.corpId, RelationModule.corp.relateModule, data.corp.corpName, data.corpAccountId, data.bankDeposit, data.account ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importPractiArchives : function(data, relation) {
		this.setMultiFieldValue([ "practiId", "practiName", "practiTel" ], [ data.practiId, data.practiName, data.mobile ]);
	},
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/fund/multiSubmitMoneyLend.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.lendId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/fund/loadMoneyLend.do?lendId=" + this.lendId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];

				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName", "practiId", "practiName", "practiTel" ];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname, curUserInfo.userId, curUserInfo.fullname, curUserInfo.mobile ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});