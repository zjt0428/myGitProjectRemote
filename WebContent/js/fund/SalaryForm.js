var SalaryForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.acceptable = this.acceptable; // 审核功能按钮
	this.approveable = this.approveable; // 审批功能按钮

	this.currentDate = new Date();
	var selectDeductDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 1);
	var maxDeductDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 1, 23, 59, 59);

	var salaryPractiTopbarItems = null;
	if (this.saveable) {
		salaryPractiTopbarItems = [ {
			iconCls : "btn-loading",
			text : "加载上月薪资",
			handler : this.loadPrePractiSalay.createDelegate(this)
		}, {
			iconCls : "btn-loading",
			text : "加载奖金",
			handler : this.loadReward.createDelegate(this)
		}, {
			iconCls : "btn-panel-refresh",
			text : "重置奖金",
			handler : this.cleanReward.createDelegate(this)
		} ];
	}
	this.salaryPractiGrid = new SalaryPractiGrid(null, {
		saveable : this.saveable,
		tbarItems : salaryPractiTopbarItems
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
					name : "salary.userName"
				}, {
					readOnly : true,
					fieldLabel : "薪资编号",
					name : "salary.salarySerial"
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
					name : "salary.providedDate",
					value : new Date()
				}, {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "薪资主题",
					name : "salary.salaryTheme"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "填报部门",
					name : "salary.department.depName"
				}, {
					xtype : "datefield",
					format : "Y年m月",
					width : 130,
					allowBlank : false,
					editable : false,
					fieldLabel : "薪资年月",
					name : "salary.salaryMonth",
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
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "支付企业",
					name : "salary.entName",
					relateModule : RelationModule.corpAccount.relateModule,
					importhandler : this.importCorpAccountArchives.createDelegate(this)
				}, {
					readOnly : true,
					fieldLabel : "薪资总额",
					name : "salary.salaryAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "企业开户行",
					name : "salary.bank"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i",
					readOnly : false,
					editable : false,
					allowBlank : false,
					maxValue : maxDeductDate,
					fieldLabel : "奖金提取日期",
					name : "salary.deductPassDate",
					value : selectDeductDate,
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "企业账号",
					name : "salary.account"
				} ]
			} ]
		}, {
			anchor : "95%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			xtype : "textarea",
			readOnly : !this.saveable,
			fieldLabel : "备注",
			name : "salary.remark"
		} ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.salaryPractiGrid ]
	} ];
	SalaryForm.superclass.constructor.call(this, {
		title : "薪资信息明细",
		animateTarget : this.animateTarget,
		height : 500,
		width : 960,
		form_config : {
			labelWidth : 100,
			object : "salary",
			saveable : this.saveable,
			accept : {
				action : this.acceptable,
				relateId : this.salaryId,
				relateModule : RelationModule.salary.relateModule
			},
			approve : {
				action : this.approveable,
				relateId : this.salaryId,
				relateModule : RelationModule.salary.relateModule
			},
			url : __ctxPath + "/fund/saveSalary.do",
			items : items,
			fieldMapping : SalaryFieldMapping,
			hiddenField : SalaryHiddenField
		}
	});
};
Ext.extend(SalaryForm, Knight.ux.FormPanelWindow, {
	importCorpAccountArchives : function(data) {
		this.setMultiFieldValue([ "entId", "entName", "entAccountId", "bank", "account" ], [ data.corp.corpId, data.corp.corpName, data.corpAccountId, data.bankDeposit, data.account ]);
	},
	loadPrePractiSalay : function() {
		var items = this.salaryPractiGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "请添加企业人员!");
			return;
		}
		var salaryMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1).format("Ym");
		$request({
			url : __ctxPath + "/fund/loadPrePractiSalary.do",
			params : {
				salaryMonth : salaryMonth
			},
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var data = resp.data[0];
				for ( var i = 0; i < items.length; i++) {
					var practiSalary = data[items[i].get("practiId")];
					if (!practiSalary) {
						continue;
					}
					var propertys = [ "station", "overtimeWork", "mealFee", "endowment", "socialInsurance", "housingFund", "tax", "otherDeduct", "otherItems" ];
					for ( var j = 0; j < propertys.length; j++) {
						var property = propertys[j];
						items[i].set(property, practiSalary[property]);
					}
				}
			}.createDelegate(this)
		});
	},
	loadReward : function() {
		var items = this.salaryPractiGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "请添加企业人员!");
			return;
		}
		var deductPassDateField = this.getForm().findField("salary.deductPassDate");
		var deductPassDate = deductPassDateField.getValue();
		$request({
			url : __ctxPath + "/fund/listUnpickupDeduct.do",
			params : {
				deductPassDate : deductPassDate
			},
			success : function(g, h) {
				var resp = Ext.util.JSON.decode(g.responseText);
				var data = resp.data[0];
				for ( var i = 0; i < items.length; i++) {
					var reward = data[items[i].get("practiId")];
					items[i].set("reward", reward ? reward : 0);
				}
				deductPassDateField.setReadOnly(true);
			}.createDelegate(this)
		});
	},
	cleanReward : function() {
		var items = this.salaryPractiGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "请添加企业人员!");
			return;
		}
		for ( var i = 0; i < items.length; i++) {
			items[i].set("reward", 0);
		}
		var deductPassDateField = this.getForm().findField("salary.deductPassDate");
		deductPassDateField.setReadOnly(false);
	},
	saveFormData : function() {
		this.getForm().findField("salary.salaryAmount").setValue(this.salaryPractiGrid.getTotalSummary());
		this.getForm().findField("salary.salaryPractis").setValue($gridstore2json(this.salaryPractiGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			var resp = Ext.util.JSON.decode(e.response.responseText);
			this.submitApplication(__ctxPath + "/fund/multiSubmitSalary.do", resp.applyforId);
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.salaryId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/fund/loadSalary.do?salaryId=" + this.salaryId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					if (data.salaryPractiSet && data.salaryPractiSet.length > 0) {
						this.salaryPractiGrid.addRecordHeight(data.salaryPractiSet.length);
						this.salaryPractiGrid.getStore().loadData(data.salaryPractiSet);
					}
					this.getForm().findField("salary.deductPassDate").setReadOnly(true);
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