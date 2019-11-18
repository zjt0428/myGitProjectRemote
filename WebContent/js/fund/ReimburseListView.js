var ReimburseListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if (!isGranted("_ReimburseQueryAll")) {
		this.params.Q_userId_L_EQ = curUserInfo.userId;
	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "报销单号",
			name : "Q_reimburseSerial_S_LK"
		}, {
			lable : "报销人员",
			name : "Q_practiName_S_LK"
		}, {
			lable : "报销日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_reimburseDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_reimburseDate_S_LE"
		} ];
		advancedItems = [ {
			fieldType : "CHAR_FIELD",
			fieldLabel : "报销人员",
			name : "Q_practiName_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "报销主题",
			name : "Q_reimburseTheme_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "关联项目",
			name : "Q_projectName_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "备案编号",
			name : "Q_recordId_S_LK"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "报销年月",
			leftFieldLabel : "Q_providedDate_S_GE",
			rightFieldLabel : "Q_providedDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadReimburse
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
			sortField : "reimburseId",
			sortDir : "desc",
			id : "reimburseId",
			fields : ReimburseListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "报销编号",
			dataIndex : "reimburseSerial"
		}, {
			header : "报销主题",
			dataIndex : "reimburseTheme"
		}, {
			header : "报销人员",
			dataIndex : "practiName"
		}, {
			header : "报销年月",
			dataIndex : "reimburseMonth"
		}, {
			width : 60,
			header : "报销金额",
			dataIndex : "askforAmount"
		}, {
			header : "关联业务",
			dataIndex : "relateModuleName"
		}, {
			header : "业务编号",
			dataIndex : "relateSerial"
		}, {
			width : 60,
			header : "审批金额",
			dataIndex : "reimburseAmount"
		}, {
			width : 60,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ]
	};
	ReimburseListView.superclass.constructor.call(this, Ext.apply({
		id : "ReimburseListView",
		title : TabTitle.REIMBURSE_LIST,
		iconCls : "menu-business-reimburse",
		url : __ctxPath + "/fund/listReimburse.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ReimburseListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptReimburse
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveReimburse
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
		case "1":
			if (isGranted("_ReimburseAccept")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_ReimburseApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ReimburseAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addReimburse.createDelegate(this)
			});
		}
		if (isGranted("_ReimburseEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editReimburse.createDelegate(this)
			});
		}
		if (isGranted("_ReimburseMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitReimburse.createDelegate(this)
			});
		}
		if (isGranted("_ReimburseMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delReimburse.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_ReimbursePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printReimburse.createDelegate(this)
			});
		}
		if (isGranted("_ReimburseExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportReimburse.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的报销！";
		var msg2 = "您确认要【" + op + "】所选的报销吗？";
		var msg3 = "成功【" + op + "】所选的报销！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptReimburse : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的报销信息必须是【待审核】的状态！");
			return;
		}
		new ReimburseForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveReimburse : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的报销信息必须是【待审批】的状态！");
			return;
		}
		var reimburseForm = new ReimburseForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
		reimburseForm.getForm().findField("reimburse.reimburseAmount").setReadOnly(false);
		reimburseForm.show();
	},
	loadReimburse : function(a) {
		new ReimburseForm(a).show();
	},
	addReimburse : function() {
		new ReimburseForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editReimburse : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的报销信息必须是【待提交】的报销！");
			return;
		}
		new ReimburseForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitReimburse : function() {
		this.speciallyGridAction(this.dataGridPanel, "reimburseId", __ctxPath + "/fund/multiSubmitReimburse.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的报销信息必须是【待提交】的报销！");
			return false;
		}.createDelegate(this));
	},
	delReimburse : function() {
		this.speciallyGridAction(this.dataGridPanel, "reimburseId", __ctxPath + "/fund/multiDelReimburse.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的报销信息必须是【待提交】的报销！");
			return false;
		}.createDelegate(this));
	},
	printReimburse : function() {
		$print(this.dataGridPanel, function(a) {
			if (a[0].data["applyforState"] != "2"&&a[0].data["applyforState"] != "3") {
				$toast("【打印】的报销信息必须是【受理通过】或【审批通过】的报销！");
				return null;
			}
			return __ctxPath + "/fund/printReimburse.do?formpage=Reimburse&reimburseId=" + a[0].data["reimburseId"];
		});
	},
	exportReimburse : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/fund/exportReimburse.do", this.dataGridPanel);
	}
});