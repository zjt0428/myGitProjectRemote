var CeaseReportListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var statusCombo = $initComboBoxField("状态", "Q_status_S_EQ", "EFFECTIVE_FLAG", {
			width : 75,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ statusCombo, {
			lable : "工程名称",
			name : "Q_contractMaterials.projectName_S_LK"
		}, {
			lable : "报停主题",
			name : "Q_ceaseTitle_S_LK"
		},{
			lable : "承租单位",
			name : "Q_contractMaterials.paEntName_S_LK"
		},{
			lable : "报停日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadScrap
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
			fields : CeaseReportListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "statusName"
		},{
			header : "报停主题",
			dataIndex : "ceaseTitle"
		}, {
			header : "制单人",
			dataIndex : "userName"
		}, {
			header : "报停单号",
			dataIndex : "ceaseSerial"
		}, {
			header : "合同编号",
			dataIndex : "contractMaterials.contractSerial"
		}, {
			header : "项目名称",
			dataIndex : "contractMaterials.projectName"
		}, {
			header : "承租单位",
			dataIndex : "contractMaterials.paEntName"
		}, {
			header : "本次结算金额",
			dataIndex : "settledAmount"
		}, {
			header : "报停日期",
			dataIndex : "applyDate"
		}, {
			header : "起始日期",
			dataIndex : "startDate"
		}, {
			header : "截止日期",
			dataIndex : "endDate"
		}]
	};
	CeaseReportListView.superclass.constructor.call(this, Ext.apply({
		id : "CeaseReportListView",
		title : TabTitle.CEASE_REPORT_LIST,
		iconCls : "menu-business-storehouse",
		url : __ctxPath + "/materials/listCeaseReport.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(CeaseReportListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptScrap
		});
	},

	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_CeaseReportAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addCeaseReport.createDelegate(this)		
			});
		}
		if (isGranted("_CeaseReportEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editCeaseReport.createDelegate(this)
			});
		}
		if (isGranted("_CeaseReportMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delCeaseReport.createDelegate(this)
			});
		}
		if (isGranted("_CeaseReportMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveCeaseReport.createDelegate(this)
			});
		}
		if (isGranted("_CeaseReportMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveCeaseReport.createDelegate(this)
			});
		}
		if (isGranted("_CeaseReportMultiAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "批量新增",
				handler : this.multiAddCeaseReport.createDelegate(this)		
			});
		}
		tbarItems.push("->");
		if (isGranted("_CeaseReportPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printCeaseReport.createDelegate(this)
			});
		}
		if (isGranted("_CeaseReportExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportCeaseReport.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的申请！";
		var msg2 = "您确认要【" + op + "】所选的申请吗？";
		var msg3 = "成功【" + op + "】所选的申请！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadScrap : function(a) {
		new CeaseReportForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addCeaseReport : function(a) {
//		new CeaseReportForm(null, {
//			saveable : true,
//			callback : function() {
//				this.dataGridPanel.getStore().reload();
//			}.createDelegate(this)
//		}).show();
		new ContractMaterialsSelector({
			params : {
				"Q_applyforState_S_EQ": 3
			},
			saveable : true,
			single : true,
			callback : function(d) {
				var data = d[0].data;
				new CeaseReportForm(data, {
					saveable : true,
					isMulti:false,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	multiAddCeaseReport : function(a) {
		new ContractMaterialsSecondSelector({
			params : {
				"applyforState": 3
			},
			collectEnable : true,
			saveable : true,
			single : false,
			callback : function(d) {
				var data = d[0].data;
				var contractIds =Array();
				for(var i =0;i<d.length;i++){
					contractIds.push(d[i].data.contractmaId);
				}
				new CeaseReportForm(d, {
					saveable : true,
					isMulti:true,
					contractIds :Ext.util.JSON.encode(contractIds),
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editCeaseReport : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的申请信息必须是【待提交】的申请！");
			return;
		}
		new CeaseReportForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitCeaseReport : function() {
		this.speciallyGridAction(this.dataGridPanel, "ceaseId", __ctxPath + "/materials/multiSubmitCeaseReport.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的申请信息必须是【待提交】的申请！");
			return false;
		}.createDelegate(this));
	},
	delCeaseReport : function() {
		this.speciallyGridAction(this.dataGridPanel, "ceaseId", __ctxPath + "/materials/multiDelCeaseReport.do", "删除", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("【删除】的申请信息必须是【待提交】的申请！");
			return false;
		}.createDelegate(this));
	},
	effectiveCeaseReport : function() {
		this.speciallyGridAction(this.dataGridPanel, "ceaseId", __ctxPath + "/materials/multiEffectiveCeaseReport.do", "生效", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("该信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	loseEffectiveCeaseReport : function() {
		this.speciallyGridAction(this.dataGridPanel, "ceaseId", __ctxPath + "/materials/multiLoseEffectiveCeaseReport.do", "失效", function(a) {
			if ("1" == a.status) {
				return true;
			}
			$toast("该信息已经【失效】！");
			return false;
		}.createDelegate(this), "是否确认失效");
	},
	printCeaseReport : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/printFormCeaseReport.do?ceaseId=" + a[0].data["ceaseId"];
		});
	},
	exportCeaseReport : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/materials/exportCeaseReport.do", this.dataGridPanel);
	}
});