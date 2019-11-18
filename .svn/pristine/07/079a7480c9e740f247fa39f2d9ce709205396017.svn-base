var ApplyMakeListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
//	this.params["Q_arrangeType_S_EQ"] = "0";
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo,{
			lable : "申请人",
			name : "Q_makeMan_S_LK"
		}, {
			lable : "制作主题",
			name : "Q_makeTheme_S_LK"
		}, {
			lable : "仓库名称",
			name : "Q_storeName_S_LK"
		}, {
			lable : "申请日期",
			width : 115,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_makeDate_S_GE"
		}, {
			lable : "至",
			width : 115,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_makeDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadApplyMake
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
			fields : ApplyMakeListViewField
		},
		rowAction : {
			width : 80,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 60,
			header : "状态 ",
			dataIndex : "applyforStateName"
		},{
			width : 70,
			header : "生效状态",
			dataIndex : "effective",
			renderer : function(n) {
				if (n == "0") {
					return "<font face='宋体' color='red'>失效</font>";
				}
				return "生效";
			}
		}, {
			header : "制作单号",
			dataIndex : "makeSerial"
		}, {
			header : "制作主题",
			dataIndex : "makeTheme"
		}, {
			header : "申请日期",
			dataIndex : "makeDate"
		}, {
			header : "申请人",
			dataIndex : "makeMan"
		}, {
			header : "审批人",
			dataIndex : "approveMan"
		}, {
			header : "审批时间",
			dataIndex : "approveDate"
		}, {
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			header : "计划完成时间",
			dataIndex : "completeDate"
		} ]
	};
	ApplyMakeListView.superclass.constructor.call(this, Ext.apply({
		id : "ApplyMakeListView",
		title : "制作申请",
		iconCls : "menu-business-borrow",
		url : __ctxPath + "/daily/listApplyMake.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ApplyMakeListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveApplyMake
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
		case "2":
			if (isGranted("_ApplyMakeApprove")) {
				action[1].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ApplyMakeAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addApplyMake.createDelegate(this)
			});
		}
		if (isGranted("_ApplyMakeEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editApplyMake.createDelegate(this)
			});
		}
		if (isGranted("_ApplyMakeMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitApplyMake.createDelegate(this)
			});
		}
		if (isGranted("_ApplyMakeMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delApplyMake.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_ApplyMakePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printApplyMake.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的业务申请！";
		var msg2 = "您确认要【" + op + "】所选的业务申请吗？";
		var msg3 = "成功【" + op + "】所选的业务申请！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	approveApplyMake : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的业务申请必须是【待审批】的状态！");
			return;
		}
		new ApplyMakeForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadApplyMake : function(a) {
		new ApplyMakeForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addApplyMake : function() {
		new ApplyMakeForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editApplyMake : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的业务申请必须是【待提交】的状态！");
			return;
		}
		new ApplyMakeForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitApplyMake : function() {
		this.speciallyGridAction(this.dataGridPanel, "applyMakeId", __ctxPath + "/daily/multiSubmitApplyMake.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的业务申请必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	delApplyMake : function() {
		this.speciallyGridAction(this.dataGridPanel, "applyMakeId", __ctxPath + "/daily/multiDelApplyMake.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的业务申请必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	printApplyMake : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/daily/printApplyMake.do?formpage=printForm&applyMakeId=" + a[0].data["applyMakeId"];
		});
	}
});