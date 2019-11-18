var MoneyBackForm = function(a, b) {
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
					name : "moneyBack.userName"
				}, {
					readOnly : true,
					fieldLabel : "还款单号",
					name : "moneyBack.backSerial"
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
					name : "moneyBack.providedDate",
					value : new Date()
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "还款主题",
					name : "moneyBack.backTheme"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "moneyBack.department.depName"
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
					fieldLabel : "收款单位",
					name : "moneyBack.receiveEntName",
					relateModule : RelationModule.corpAccount.relateModule,
					importhandler : this.importCorpAccountArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "借款单号",
					name : "moneyBack.lendSerial"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "还款人员",
					name : "moneyBack.practiName",
					relateModule : RelationModule.practitioner.relateModule,
					importhandler : this.importPractiArchives.createDelegate(this)
				}, {
					xtype : "numberfield",
					allowBlank : false,
					maxLength : 9,
					fieldLabel : "还款金额",
					name : "moneyBack.backAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "收款开户行",
					name : "moneyBack.receiveBank"
				}, {
					readOnly : true,
					fieldLabel : "借款金额",
					name : "moneyBack.lendAmount"
				}, {
					readOnly : true,
					fieldLabel : "联系方式",
					name : "moneyBack.practiTel"
				}, {
					readOnly : true,
					fieldLabel : "当前欠款总额",
					name : "moneyBack.arrearsAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "收款账号",
					name : "moneyBack.receiveAccount"
				}, {
					readOnly : true,
					fieldLabel : "借款人",
					name : "moneyBack.lendPractiName"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "还款时间",
					name : "moneyBack.backDate",
					value : new Date()
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "还款说明",
			name : "moneyBack.description"
		} ]
	} ];
	MoneyBackForm.superclass.constructor.call(this, {
		title : "还款信息明细",
		animateTarget : this.animateTarget,
		height : 350,
		width : 890,
		form_config : {
			labelWidth : 100,
			object : "moneyBack",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.backId,
				relateModule : RelationModule.moneyBack.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.backId,
				relateModule : RelationModule.moneyBack.relateModule
			},
			url : __ctxPath + "/fund/saveMoneyBack.do",
			items : items,
			fieldMapping : MoneyBackFieldMapping,
			hiddenField : MoneyBackHiddenField
		}
	});
};
Ext.extend(MoneyBackForm, Knight.ux.FormPanelWindow, {
	importCorpAccountArchives : function(data) {
		var fieldNames = [ "receiveEntId", "receiveModule", "receiveEntName", "receiveEntAccountId", "receiveBank", "receiveAccount" ];
		var values = [ data.corp.corpId, RelationModule.corp.relateModule, data.corp.corpName, data.corpAccountId, data.bankDeposit, data.account ];
		this.setMultiFieldValue(fieldNames, values);
	},
	importPractiArchives : function(data) {
		this.setMultiFieldValue([ "practiId", "practiName", "practiTel" ], [ data.practiId, data.practiName, data.mobile ]);
	},
	saveFormData : function() {
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/fund/multiSubmitMoneyBack.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.backId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/fund/loadMoneyBack.do?backId=" + this.backId,
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
			fieldNames = [ "lendId", "lendSerial", "lendTheme", "lendPractiId", "lendPractiName", "lendAmount" ];
			values = [ this.lend.lendId, this.lend.lendSerial, this.lend.lendTheme, this.lend.practiId, this.lend.practiName, this.lend.lendAmount ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});