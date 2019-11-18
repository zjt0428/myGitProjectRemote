var SalaryListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	var searchActionItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "支付企业",
			name : "Q_entName_S_LK"
		}, {
			lable : "薪资月份",
			editable : false,
			xtype : "datefield",
			format : "Y年m月",
			name : "Q_salaryMonth_S_EQ"
		} ];
		searchActionItems = [];
		if (isGranted("_SalaryMonthPrint")) {
			searchActionItems.push({
				xtype : "button",
				text : "工资条预览",
				iconCls : "btn-head-print",
				handler : this.printSalaryMonth.createDelegate(this)
			});
		}
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadSalary
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : SalaryListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "薪资编号",
			dataIndex : "salarySerial"
		}, {
			header : "主题",
			dataIndex : "salaryTheme"
		}, {
			width : 80,
			header : "薪资年月",
			dataIndex : "salaryMonth"
		}, {
			width : 80,
			header : "支付企业",
			dataIndex : "entName"
		}, {
			width : 80,
			header : "开户行",
			dataIndex : "bank"
		}, {
			width : 100,
			header : "企业账号",
			dataIndex : "account"
		}, {
			width : 70,
			header : "薪资总额",
			dataIndex : "salaryAmount"
		}, {
			width : 40,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ]
	};
	SalaryListView.superclass.constructor.call(this, Ext.apply({
		id : "SalaryListView",
		title : TabTitle.SALARY_LIST,
		iconCls : "menu-business-salary",
		url : __ctxPath + "/fund/listSalary.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			searchActionItems : searchActionItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SalaryListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptSalary
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveSalary
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_SalaryAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_SalaryApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_SalaryAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSalary.createDelegate(this)
			});
		}
		if (isGranted("_SalaryEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSalary.createDelegate(this)
			});
		}
		if (isGranted("_SalaryMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitSalary.createDelegate(this)
			});
		}
		if (isGranted("_SalaryMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSalary.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的薪资！";
		var msg2 = "您确认要【" + op + "】所选的薪资吗？";
		var msg3 = "成功【" + op + "】所选的薪资！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptSalary : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的薪资信息必须是【待审核】的状态！");
			return;
		}
		new SalaryForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveSalary : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的薪资信息必须是【待审批】的状态！");
			return;
		}
		new SalaryForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadSalary : function(a) {
		new SalaryForm(a).show();
	},
	addSalary : function() {
		new SalaryForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editSalary : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的薪资信息必须是【待提交】的薪资！");
			return;
		}
		new SalaryForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitSalary : function() {
		this.speciallyGridAction(this.dataGridPanel, "salaryId", __ctxPath + "/fund/multiSubmitSalary.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的薪资信息必须是【待提交】的薪资！");
			return false;
		}.createDelegate(this));
	},
	delSalary : function() {
		this.speciallyGridAction(this.dataGridPanel, "salaryId", __ctxPath + "/fund/multiDelSalary.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的薪资信息必须是【待提交】的薪资！");
			return false;
		}.createDelegate(this));
	},
	printSalaryMonth : function() {
		var salaryMonth = this.currentSearchPanel.getForm().findField("Q_salaryMonth_S_EQ").value;
		if (Ext.isEmpty(salaryMonth)) {
			Ext.MessageBox.alert("提示", "薪资月份未选择!");
			return;
		}
		var url = __ctxPath + "/fund/printPractiMonthSalary.do?salaryMonth=" + encodeURI(encodeURI(salaryMonth));
		window.open(url, "人员薪资", "height=600,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	}
});