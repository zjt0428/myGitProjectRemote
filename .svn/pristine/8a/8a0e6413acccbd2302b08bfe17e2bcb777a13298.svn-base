var EquipMaintListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var statusCombo = $initComboBoxField("状态", "Q_status_S_EQ", "SCHEMA_FORM_STATUS", {
			width : 60,
			lable : "状态",
			allowBlank : true
		});
		var maintResultCombo = $initComboBoxField("巡检结果", "Q_maintResult_S_EQ", "INSPECT_RESULT", {
			width : 80,
			lable : "保养结果",
			allowBlank : true
		});
		generalItems = [ statusCombo, maintResultCombo, {
			lable : "备案编号",
			name : "Q_equipMaintSchema.equipDiary.recordId_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipMaintSchema.equipDiary.projectName_S_LK"
		}, {
			lable : "保养时间",
			width : 90,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_maintDate_DL_LE"
		}, {
			lable : "计划截止时间",
			width : 90,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_thisEndCycleDate_DL_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_thisEndCycleDate_DG_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadEquipMaint
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
			fields : EquipMaintListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 60,
			header : "状态",
			dataIndex : "statusName"
		}, {
			header : "保养编号",
			dataIndex : "maintSerial"
		}, {
			header : "保养级别",
			dataIndex : "equipMaintSchema",
			renderer : function(n) {
				return n.maintTypeName;
			}
		}, {
			header : "备案编号",
			dataIndex : "equipMaintSchema",
			renderer : function(n) {
				if(n.equipment){
					return n.equipment.recordId;
				}
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipMaintSchema",
			renderer : function(n) {
				if(n.equipment) {
					return n.equipment.exwSerial;
				}
			}
		}, {
			header : "项目名称",
			dataIndex : "equipMaintSchema",
			renderer : function(n) {
				if(n.equipment) {
					return n.equipment.projectName;
				}
			}
		}, {
			header : "频次",
			dataIndex : "cycleTimes"
		}, {
			header : "计划截止时间",
			dataIndex : "thisEndCycleDate"
		}, {
			header : "保养时间",
			dataIndex : "maintDate"
		}, {
			header : "保养结果",
			dataIndex : "maintResultName"
		} ]
	};
	EquipMaintListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipMaintListView",
		title : TabTitle.EQUIP_MAINT_LIST,
		iconCls : "menu-business-maint",
		url : __ctxPath + "/equip/listEquipMaint.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipMaintListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, va,cmm) {
		var msg1 = "请选择要【" + op + "】的保养信息！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的保养信息吗？";
		var msg3 = "成功【" + op + "】所选的保养信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadEquipMaint : function(a) {
		new EquipMaintForm(a).show();
	},
	editEquipMaint : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.status) {
				$toast("【填报】的保养信息必须是【未完成】状态！");
				return false;
			}
			return true;
		}, function(a) {
			new EquipMaintForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	resetEquipMaint : function(a) {
		this.speciallyGridAction(this.dataGridPanel, "maintId", __ctxPath + "/equip/multiResetEquipMaint.do", "清除", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("【清除】的保养信息必须是【未完成】状态！");
			return false;
		}.createDelegate(this));
	},
	submitEquipMaint : function() {
		this.speciallyGridAction(this.dataGridPanel, "maintId", __ctxPath + "/equip/multiSubmitEquipMaint.do", "提交", function(a) {
			if (Ext.isEmpty(a.maintDate) || Ext.isEmpty(a.maintResultName)) {
				$toast("【提交】的保养信息未进行填报！");
				return false;
			}
			if ("0" != a.status) {
				$toast("【提交】的保养信息必须是【未完成】状态！");
				return false;
			}
			return true;
		}.createDelegate(this), "是否确认激活，点击确认后将无法进行修改");
	},
	delEquipMaint : function() {
		this.speciallyGridAction(this.dataGridPanel, "maintId", __ctxPath + "/equip/multiDelEquipMaint.do", "删除", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("【删除】的保养信息必须是【待提交】状态！");
			return false;
		}.createDelegate(this));
	},
	exportEquipMaint : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportEquipMaint.do", this.dataGridPanel);
	},
	printEquipMaint : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的申请信息！");
			return;
		}
		var url = __ctxPath + "/equip/printEquipMaint.do?maintId=" + a[0].data["maintId"];
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	},
	comPrintEquipMaint : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的申请信息！");
			return;
		}
		var url = __ctxPath + "/equip/comPrintEquipMaint.do?maintId=" + a[0].data["maintId"];
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	}
});