var EquipInspectSelfListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
	// this.params.Q_flowState_S_LT = "5";
//	this.params.Q_status_S_EQ = "0";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	var searchActionItems = null;
	var advancedItems = null;

	if (!this.searchDisenable) {
		var inspectResultCombo = $initLovComboField("巡检结果", "QVO_inspectResult_S_EQ", "INSPECT_RESULT", {
			width : 120,
			lable : "自检结果"
		});
		var equipSourceCombo = $initComboBoxField("设备来源", "Q_equipInspectSchema.equipDiary.equipSource_S_LK", "equipSource", {
			width : 140,
			lable : "设备来源",
			editable : true,
			allowBlank : true
		});
		generalItems = [ inspectResultCombo,{
			lable : "项目名称",
			name : "Q_equipInspectSchema.equipDiary.projectName_S_LK"
		},equipSourceCombo, {
			lable : "设备自编号",
			name : "Q_equipInspectSchema.equipDiary.equipSerial_S_LK"
		}, {
			lable : "自检人员",
			name : "Q_inspectPepoles_S_LK"
		}, {
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			lable : "自检时间",
			name : "Q_inspectDate_DL_GE"
		}, {
			lable : "至",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_inspectDate_DG_LE"
		} ];
		advancedItems = [ {
			fieldType : "CHAR_FIELD",
			fieldLabel : "备案编号",
			name : "Q_equipInspectSchema.equipDiary.recordId_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "出厂编号",
			name : "Q_equipInspectSchema.equipDiary.exwSerial_S_LK"
		}, {
			fieldType : "DATE_FIELD",
			fieldLabel : "自检时间",
			name : "Q_inspectDate_DL_LE"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadEquipInspect
	} ];
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var datagrid_config = {
		store : {
			fields : EquipInspectListViewField
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
		},  {
			header : "自检编号",
			dataIndex : "inspectSerial"
		},{
			header : "设备自编号",
			dataIndex : "equipInspectSchema",
			renderer : function(n) {
				return n.equipDiary.equipSerial;
			}
		},{
			header : "设备名称",
			dataIndex : "equipInspectSchema",
			renderer : function(n) {
				return n.equipDiary.equipGenericName;
			}
		}, {
			header : "规格型号",
			dataIndex : "equipInspectSchema",
			renderer : function(n) {
				return n.equipDiary.equipSpecificName;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipInspectSchema",
			renderer : function(n) {
				return n.equipDiary.exwSerial;
			}
		}, {
			header : "设备来源",
			dataIndex : "equipInspectSchema",
			renderer : function(n) {
				return n.equipDiary.equipSourceName;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipInspectSchema",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "市",
			dataIndex : "equipInspectSchema",
			renderer : function(n) {
				return n.equipDiary.cityName;
			}
		}, {
			header : "区",
			dataIndex : "equipInspectSchema",
			renderer : function(n) {
				return n.equipDiary.countyName;
			}
		}, {
			header : "自检时间",
			dataIndex : "inspectDate"
		}, {
			header : "自检结果",
			dataIndex : "inspectResultName"
		},{
			header : "自检人员",
			dataIndex : "inspectPepoles"
		}, {
			header : "使用单位",
			dataIndex : "paEntName"
		}, {
			header : "所属部门",
			dataIndex : "depName"
		}]
	};
	EquipInspectSelfListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipInspectSelfListView",
		title : "自检管理",
		iconCls : "menu-business-inspect",
		url : __ctxPath + "/equip/listEquipInspect.do",
		base_params : this.params,
		search_config : {
			preLableHidden : true,
			generalItems : generalItems,
			searchActionItems : searchActionItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipInspectSelfListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, va, cmm) {
		var msg1 = "请选择要【" + op + "】的巡检报告！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的巡检报告吗？";
		var msg3 = "成功【" + op + "】所选的巡检报告！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	approveEquipInspect : function(a) {
		if ("1" != a.status) {
			$toast("【审批】的巡检信息必须是【待审批】的状态！");
			return;
		}
		new EquipInspectForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadEquipInspect : function(a) {
		new EquipInspectForm(a).show();
	},
	editEquipInspect : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.status) {
				$toast("【填报】的巡检报告必须是【未完成】的报告！");
				return false;
			}
			return true;
		}, function(a) {
			new EquipInspectForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	costEquipInspect : function(a) {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("请最多选择一个进行操作！");
			return ;
		}
		if(a[0].data.status!=1){
			$toast("请选择状态为“已完成”进行操作！");
			return ;
		}
		new EquipInspectForm(a[0].data,{
			saveable : true,
			cost : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	resetEquipInspect : function(a) {
		this.speciallyGridAction(this.dataGridPanel, "inspectId", __ctxPath + "/equip/multiResetEquipInspect.do", "清除", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("【清除】的巡检报告必须是【未完成】状态！");
			return true;
		}.createDelegate(this));
	},
	submitEquipInspect : function() {
		this.speciallyGridAction(this.dataGridPanel, "inspectId", __ctxPath + "/equip/multiSubmitEquipInspect.do", "提交", function(a) {
			if (Ext.isEmpty(a.inspectDate) || Ext.isEmpty(a.inspectResultName)) {
				$toast("【提交】的巡检报告未进行填报！");
				return false;
			}
			if ("0" != a.status) {
				$toast("【提交】的巡检报告必须是【未完成】状态！");
				return false;
			}
			return true;
		}.createDelegate(this), "是否确认激活，点击确认后将无法进行修改");
	},
	delEquipInspect : function() {
		this.speciallyGridAction(this.dataGridPanel, "inspectId", __ctxPath + "/equip/multiDelEquipInspect.do", "删除", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("【删除】的巡检报告必须是【未完成】状态！");
			return false;
		}.createDelegate(this));
	},
	printEquipInspect : function(type) {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printEquipInspect.do?formpage=EquipInspect" + type + "&inspectId=" + a[0].data["inspectId"];
		});
	},
	exportEquipInspect : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportEquipInspect.do", this.dataGridPanel);
	}
});