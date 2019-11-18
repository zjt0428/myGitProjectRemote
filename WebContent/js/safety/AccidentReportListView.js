var AccidentReportListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var accidentLevelCombo = $initComboBoxField("事故级别", "Q_[accident.accidentLevel]_S_EQ", "ACCIDENT_LEVEL", {
			readOnly : false,
			allowBlank : false
		});
		var generalItems = [ {
			lable : "报告编号",
			name : "Q_reportSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_[accident.equipment.recordId]_S_LK"
		}, {
			lable : "责任单位",
			name : "Q_[accident.responsibleUnit]_S_LK"
		}, accidentLevelCombo ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readAccidentReport
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : AccidentReportListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "事故编号",
			dataIndex : "reportSerial"
		}, {
			header : "发生时间",
			dataIndex : "accident",
			renderer : function(n) {
				return n.accidentDate;
			}
		}, {
			header : "事故设备",
			dataIndex : "accident",
			renderer : function(n) {
				return n.equipment.equipGenericName;
			}
		}, {
			header : "备案编号",
			dataIndex : "accident",
			renderer : function(n) {
				return n.equipment.recordId;
			}
		}, {
			header : "项目名称",
			dataIndex : "accident",
			renderer : function(n) {
				return n.project.projectName;
			}
		}, {
			header : "事故地址",
			dataIndex : "accident",
			renderer : function(n) {
				return n.address;
			}
		}, {
			header : "事故责任人",
			dataIndex : "accident",
			renderer : function(n) {
				return n.responsible;
			}
		}, {
			header : "事故级别",
			dataIndex : "accident",
			renderer : function(n) {
				return n.accidentLevelName;
			}
		} ]
	};
	AccidentReportListView.superclass.constructor.call(this, Ext.apply({
		id : "AccidentReportListView",
		title : TabTitle.ACCDENT_REPORT_LIST,
		iconCls : "menu-business-customer",
		url : __ctxPath + "/safety/listAccidentReport.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AccidentReportListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AccidentReportAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addAccidentReport.createDelegate(this)
			});
		}
		if (isGranted("_AccidentReportEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAccidentReport.createDelegate(this)
			});
		}
		if (isGranted("_AccidentReportMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delAccidentReport.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_AccidentReportPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printAccidentReport.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的事故报告记录！";
		var msg2 = "您确认要【" + op + "】所选的事故报告记录吗？";
		var msg3 = "成功【" + op + "】所选的事故报告记录！";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	readAccidentReport : function(a) {
		new AccidentReportForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addAccidentReport : function() {
		new AccidentSelector({
			single : true,
			params : {
				"Q_status_S_EQ" : "0"
			},
			callback : function(d) {
				var data = d[0].data;
				var data = d[0].data;
				new AccidentReportForm({
					accident : data
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editAccidentReport : function() {
		$editGridrowSelecte(this.dataGridPanel, null, function(a) {
			new AccidentReportForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delAccidentReport : function() {
		this.speciallyGridAction(this.dataGridPanel, "accidentReportId", __ctxPath + "/safety/multiDelAccidentReport.do", "删除");
	},
	printAccidentReport : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/safety/printAccidentReport.do?formpage=AccidentReport&accidentReportId=" + a[0].data["accidentReportId"];
		});
	}
});