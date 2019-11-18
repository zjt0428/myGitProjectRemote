var TeamsAccountForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮

	this.teamsAccountKnotGrid = new TeamsAccountKnotGrid(null, {
		parentForm : this,
		saveable : this.saveable
	});
	this.teamsAccountWallGrid = new TeamsAccountWallGrid(null, {
		parentForm : this,
		saveable : this.saveable
	});
	this.teamsAccountOtherGrid = new TeamsAccountOtherGrid(null, {
		parentForm : this,
		saveable : this.saveable
	});
	var practiTopbarItems = null;
	if (this.saveable) {
		practiTopbarItems = [ {
			iconCls : "btn-share",
			text : "分摊",
			handler : this.sharePaymentAmount.createDelegate(this)
		}, {
			iconCls : "btn-clean",
			text : "清空",
			handler : this.cleanPaymentAmount.createDelegate(this)
		} ];
	}
	this.teamsAccountPractiGrid = new TeamsAccountPractiGrid(null, {
		parentForm : this,
		saveable : this.saveable,
		tbarItems : practiTopbarItems
	});

	var items = [ {
		xtype : "fieldset",
		title : "核算信息",
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
					name : "teamsAccount.userName"
				}, {
					readOnly : true,
					fieldLabel : "项目名称",
					name : "teamsAccount.projectName"
				}, {
					readOnly : true,
					fieldLabel : "核算开始时间",
					name : "teamsAccount.accountStartDate"
				}, {
					readOnly : true,
					fieldLabel : "标准节单价",
					name : "teamsAccount.knotPrice"
				}, {
					readOnly : true,
					fieldLabel : "标准节总额",
					name : "teamsAccount.knotAmount"
				}, {
					readOnly : true,
					fieldLabel : "运输费总额",
					name : "teamsAccount.lgisticsAmount"
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
					name : "teamsAccount.providedDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "班组负责人",
					name : "teamsAccount.practiName"
				}, {
					readOnly : true,
					fieldLabel : "核算截止时间",
					name : "teamsAccount.accountEndDate"
				}, {
					readOnly : true,
					fieldLabel : "附墙单价",
					name : "teamsAccount.wallAttachePrice"
				}, {
					readOnly : true,
					fieldLabel : "附墙总额",
					name : "teamsAccount.wallAmount"
				}, {
					readOnly : true,
					fieldLabel : "其他费用总额",
					name : "teamsAccount.otherAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 24,
					allowBlank : false,
					fieldLabel : "结算主题",
					name : "teamsAccount.teamsAccountSerial"
				}, {
					readOnly : true,
					fieldLabel : "所属班组",
					name : "teamsAccount.teams"
				}, {
					readOnly : true,
					fieldLabel : "应扣总额",
					name : "teamsAccount.deductAmount"
				}, {
					readOnly : true,
					fieldLabel : "应付总额",
					name : "teamsAccount.paymentAmount"
				}, {
					readOnly : true,
					fieldLabel : "汽车吊总额",
					name : "teamsAccount.autocraneAmount"
				}, {
					readOnly : true,
					fieldLabel : "人员费用总额",
					name : "teamsAccount.practiAmount"
				} ]
			} ]
		} ]
	}, {
		xtype : "tabpanel",
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.teamsAccountKnotGrid, this.teamsAccountWallGrid, this.teamsAccountOtherGrid, this.teamsAccountPractiGrid ]
	} ];
	TeamsAccountForm.superclass.constructor.call(this, {
		title : "班组核算明细",
		width : 960,
		height : 760,
		// maximized : true,
		form_config : {
			labelWidth : 100,
			object : "teamsAccount",
			saveable : this.saveable,
			url : __ctxPath + "/dispatch/saveTeamsAccount.do",
			items : items,
			fieldMapping : TeamsAccountFieldMapping,
			hiddenField : TeamsAccountHiddenField
		}
	});
};
Ext.extend(TeamsAccountForm, Knight.ux.FormPanelWindow, {
	getTotalPaymentAmount : function() {
		var knotAmount = this.teamsAccountKnotGrid.getTotalSummary();
		var wallAmount = this.teamsAccountWallGrid.getTotalSummary();
		var otherAmount = this.teamsAccountOtherGrid.getTotalSummary();
		return knotAmount + wallAmount + otherAmount;
	},
	getTotalDeductAmount : function() {
		var knotAmount = this.teamsAccountKnotGrid.getTotalDeductAmount();
		var wallAmount = this.teamsAccountWallGrid.getTotalDeductAmount();
		var otherAmount = this.teamsAccountOtherGrid.getTotalDeductAmount();
		return knotAmount + wallAmount + otherAmount;
	},
	sharePaymentAmount : function() {
		this.setFieldValue("paymentAmount", this.getTotalPaymentAmount());
		this.setFieldValue("deductAmount", this.getTotalDeductAmount());
		var items = this.teamsAccountPractiGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "请添加班组人员!");
			return;
		}
		var paymentAmount = this.getTotalPaymentAmount();
		if (paymentAmount <= 0) {
			Ext.ux.Toast.msg("信息", "应付金额必须大于零!");
			return;
		}
		var presentAmount = Ext.util.Format.number(paymentAmount / items.length, "0.00")
		for (var i = 0; i < items.length; i++) {
			items[i].set("presentAmount", presentAmount);
		}
	},
	cleanPaymentAmount : function() {
		var items = this.teamsAccountPractiGrid.getStore().data.items;
		if (items.length <= 0) {
			Ext.ux.Toast.msg("信息", "请添加班组人员!");
			return;
		}
		for (var i = 0; i < items.length; i++) {
			items[i].set("presentAmount", 0);
		}
	},
	saveFormData : function() {
		var paymentAmount = this.getTotalPaymentAmount();
		if (paymentAmount == 0) {
			Ext.MessageBox.alert("操作信息", "结算金额为【0】!");
			return;
		}
		this.setFieldValue("paymentAmount", paymentAmount);
		this.setFieldValue("deductAmount", this.getTotalDeductAmount());
		this.setFieldValue("knotAmount", this.teamsAccountKnotGrid.getTotalSummary());
		this.setFieldValue("wallAmount", this.teamsAccountWallGrid.getTotalSummary());
		this.setFieldValue("otherAmount", this.teamsAccountOtherGrid.getTotalSummary());
		this.setFieldValue("practiAmount", this.teamsAccountPractiGrid.getTotalSummary());

		this.setFieldValue("teamsAccountKnots", $gridstore2json(this.teamsAccountKnotGrid));
		this.setFieldValue("teamsAccountWalls", $gridstore2json(this.teamsAccountWallGrid));
		this.setFieldValue("teamsAccountOthers", $gridstore2json(this.teamsAccountOtherGrid));
		this.setFieldValue("teamsAccountPractis", $gridstore2json(this.teamsAccountPractiGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.teamsAccountId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadTeamsAccount.do?teamsAccountId=" + this.teamsAccountId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.teamsAccountKnotSet, this.teamsAccountKnotGrid);
					this.setFormSubModuleGrid(data.teamsAccountWallSet, this.teamsAccountWallGrid);
					this.setFormSubModuleGrid(data.teamsAccountOtherSet, this.teamsAccountOtherGrid);
					this.setFormSubModuleGrid(data.teamsAccountPractiSet, this.teamsAccountPractiGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.teamsAccountKnotGrid.loadResource(this.teamsAccount.teamsAccountKnotList);
			this.teamsAccountWallGrid.loadResource(this.teamsAccount.teamsAccountWallList);
			var fieldNames = [ "projectId", "projectName", "practiId", "practiName", "teams", "accountStartDate", "accountEndDate", "knotPrice", "wallAttachePrice" ];
			this.copyMultiFieldValue(fieldNames, this.teamsAccount);
			fieldNames = [ "userId", "userName" ];
			var values = [ curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});