var RiskReportListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "反馈编号",
			name : "Q_reportSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_[risk.equipment.recordId]_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_[risk.equipment.exwSerial]_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_[risk.project.projectName]_S_LK"
		}, {
			lable : "完成日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_complateDate_S_EQ"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readRiskReport
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : RiskReportListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "反馈编号",
			dataIndex : "reportSerial"
		}, {
			header : "整改结果",
			dataIndex : "improveResult",
			renderer : function(n) {
				return n == "0" ? "<font color='red'>整改不可行</font>" : "整改可行";
			}
		}, {
			header : "整改设备",
			dataIndex : "risk",
			renderer : function(n) {
				return n.equipment.equipGenericName;
			}
		}, {
			header : "备案编号",
			dataIndex : "risk",
			renderer : function(n) {
				return n.equipment.recordId;
			}
		}, {
			header : "规格型号",
			dataIndex : "risk",
			renderer : function(n) {
				return n.equipment.equipSpecificName;
			}
		}, {
			header : "项目名称",
			dataIndex : "risk",
			renderer : function(n) {
				return n.project.projectName;
			}
		}, {
			header : "施工单位",
			dataIndex : "risk",
			renderer : function(n) {
				return n.checkCustomName;
			}
		}, {
			header : "检查部位",
			dataIndex : "checkPosition",
		}, {
			header : "整改负责人",
			dataIndex : "improvePerson",
		}, {
			header : "完成时间",
			dataIndex : "completeDate",
		} ]
	};
	RiskReportListView.superclass.constructor.call(this, Ext.apply({
		id : "RiskReportListView",
		title : TabTitle.RISK_REPORT_LIST,
		iconCls : "menu-business-customer",
		url : __ctxPath + "/safety/listRiskReport.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(RiskReportListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_RiskReportAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addRiskReport.createDelegate(this)
			});
		}
		if (isGranted("_RiskReportEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editRiskReport.createDelegate(this)
			});
		}
		if (isGranted("_RiskReportMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delRiskReport.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_RiskReportPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printRiskReport.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的整改记录！";
		var msg2 = "您确认要【" + op + "】所选的整改记录吗？";
		var msg3 = "成功【" + op + "】所选的整改记录！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readRiskReport : function(a) {
		new RiskReportForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addRiskReport : function() {
		new RiskSelector({
			single : true,
			params : {
				"Q_status_S_EQ" : "0"
			},
			callback : function(d) {
				var data = d[0].data;
				new RiskReportForm({
					risk : data
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editRiskReport : function() {
		$editGridrowSelecte(this.dataGridPanel, null, function(a) {
			new RiskReportForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delRiskReport : function() {
		this.speciallyGridAction(this.dataGridPanel, "riskReportId", __ctxPath + "/safety/multiDelRiskReport.do", "删除");
	},
	printRiskReport : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/safety/printRiskReport.do?formpage=RiskReport&riskReportId=" + a[0].data["riskReportId"];
		});
	}
});