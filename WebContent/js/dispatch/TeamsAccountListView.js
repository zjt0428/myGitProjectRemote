var TeamsAccountListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			xtype : "datacombo",
			width : 75,
			lable : "状态",
			name : "Q_fundStatus_S_EQ",
			store : [ [ "0", "待付款" ], [ "1", "付款中" ], [ "2", "已付款" ] ]
		}, {
			lable : "班组名称",
			name : "Q_teams_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "班组负责人",
			name : "Q_practiName_S_LK"
		}, {
			lable : "填报日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadTeamsAccount
	} ];
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : TeamsAccountListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 40,
			header : "付款情况",
			dataIndex : "fundStatusName"
		}, {
			header : "结算编号",
			dataIndex : "teamsAccountSerial"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "班组负责人",
			dataIndex : "practiName"
		}, {
			header : "班组名称",
			dataIndex : "teams"
		}, {
			header : "费用合计",
			dataIndex : "paymentAmount"
		}, {
			header : "填报日期",
			dataIndex : "providedDate"
		}, {
			width : 40,
			header : "状态",
			dataIndex : "effective",
			renderer : function(n) {
				if (n == "0") {
					return "<font face='宋体' color='red'>未生效</font>";
				}
				return "已生效";
			}
		} ]
	};
	TeamsAccountListView.superclass.constructor.call(this, Ext.apply({
		id : "TeamsAccountListView",
		title : TabTitle.TEAMS_ACCOUNT_LIST,
		iconCls : "menu-business-borrow",
		url : __ctxPath + "/dispatch/listTeamsAccount.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(TeamsAccountListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_TeamsAccountAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addTeamsAccount.createDelegate(this)
			});
		}
		if (isGranted("_TeamsAccountEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editTeamsAccount.createDelegate(this)
			});
		}
		if (isGranted("_TeamsAccountMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "生效",
				handler : this.effectiveTeamsAccount.createDelegate(this)
			});
		}
		if (isGranted("_TeamsAccountMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delTeamsAccount.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_TeamsAccountPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printTeamsAccount.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va, cmm) {
		var msg1 = "请选择要【" + op + "】的班组核算！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的班组核算吗？";
		var msg3 = "成功【" + op + "】所选的班组核算！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadTeamsAccount : function(a) {
		new TeamsAccountForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addTeamsAccount : function(a) {
		new TeamsAccountQueryForm({
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editTeamsAccount : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.effective) {
			$toast("【修改】的核算信息必须是【待提交】的核算！");
			return;
		}
		new TeamsAccountForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	effectiveTeamsAccount : function() {
		this.speciallyGridAction(this.dataGridPanel, "teamsAccountId", __ctxPath + "/dispatch/multiEffectiveTeamsAccount.do", "生效", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("【提交】的核算信息必须是【待提交】的核算！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	delTeamsAccount : function() {
		this.speciallyGridAction(this.dataGridPanel, "teamsAccountId", __ctxPath + "/dispatch/multiDelTeamsAccount.do", "删除", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("【删除】的核算信息必须是【待提交】的核算！");
			return false;
		}.createDelegate(this));
	},
	printTeamsAccount : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/dispatch/printTeamsAccount.do?formpage=TeamsAccount&teamsAccountId=" + a[0].data["teamsAccountId"];
		});
	}
});