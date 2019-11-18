var EquipInspectSchemaListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	this.serialLable = this.serialLable ? this.serialLable : "业务编号";
	// =====================================================================//
	var generalItems = null;
	var belongToAreaCombo = $initComboBoxField("计划区域", "Q_belongToArea_S_LK", "belongToArea", {
		width : 140,
		lable : "计划区域",
		editable : true,
		allowBlank : true,
	});
	
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "设备自编号",
			name : "Q_equipDiary.equipSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_equipDiary.recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipDiary.exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipDiary.projectName_S_LK"
		}, {
			lable : "制单人",
			name : "Q_userName_S_LK"
		}/*,belongToAreaCombo*/];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadEquipInspectSchema
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
			fields : EquipInspectSchemaListViewField
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "制单人",
			dataIndex : "userName"
		}, {
			hidden : true,
			header : "计划区域",
			dataIndex : "belongToAreaName"
		}, {
			header : "项目名称",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.projectName;
			}
		}, {
			header : "楼号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.buildingNum;
			}
		}, {
			header : "备案编号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.recordId;
			}
		}, {
			header : "设备自编号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.equipSerial;
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipDiary",
			renderer : function(n) {
				return n.exwSerial;
			}
		}, {
			header : "计划开始时间",
			dataIndex : "cycleActivateDate"
		}, {
			hidden : true,
			width : 50,
			header : "周期天数",
			dataIndex : "cycleDays"
		}, {
			width : 50,
			header : "生成周期",
			dataIndex : "generatedCycleName"
		}, {
			width : 50,
			header : "计划频率",
			dataIndex : "timesInCycle"
		}, {
			width : 50,
			header : "生成次数",
			dataIndex : "createTimes"
		}, {
			width : 50,
			header : "完成次数",
			dataIndex : "inspectTimes"
		}, {
			width : 50,
			header : "完成率",
			dataIndex : "finishRate",
			renderer : function(value,p,record) {
				var rate = record.data.inspectTimes/record.data.createTimes;
				return value = Ext.util.Format.number(rate,'0.000')*100+"%";
			}
		}, {
			width : 50,
			header : "状态",
			dataIndex : "active",
			renderer : function(n) {
				if ("0" == n) {
					return "待激活";
				}else if("2"== n){
					return "终止";
				}else if("3"== n){
					return "<font color='purple'>作废</font>";
				}else{
					return "激活";
				}
			}
		} ]
	};
	EquipInspectSchemaListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipInspectSchemaListView",
		title : TabTitle.EQUIP_INSPECT_SCHEMA_LIST,
		iconCls : "menu-business-employ",
		url : __ctxPath + "/equip/listEquipInspectSchema.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipInspectSchemaListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, va, cmm) {
		var msg1 = "请选择要【" + op + "】的巡检计划！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的巡检计划吗？";
		var msg3 = "成功【" + op + "】所选的巡检计划！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadEquipInspectSchema : function(a) {
		new EquipInspectSchemaForm(a).show();
	},
	editEquipInspectSchema : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.active) {
				$toast("【修改】的巡检计划必须是【未激活】的计划！");
				return false;
			}
			return true;
		}, function(a) {
			new EquipInspectSchemaForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	submitEquipInspectSchema : function() {
		this.speciallyGridAction(this.dataGridPanel, "inspectSchemaId", __ctxPath + "/equip/multiSubmitEquipInspectSchema.do", "激活", function(a) {
			if ("0" == a.active) {
				return true;
			}
			$toast("【激活】的巡检计划必须是【待激活】的巡检计划！");
			return false;
		}.createDelegate(this), "是否确认激活，点击确认后将无法进行修改");
	},
	delEquipInspectSchema : function() {
		this.speciallyGridAction(this.dataGridPanel, "inspectSchemaId", __ctxPath + "/equip/multiDelEquipInspectSchema.do", "删除", function(a) {
			if ("0" == a.active) {
				return true;
			}
			$toast("【删除】的巡检计划必须是【待激活】的巡检计划！");
			return false;
		}.createDelegate(this), "是否确认删除，点击确认后将无法进行修改");
	},
	loseEffectiveEquipInspectSchema : function() {
		this.speciallyGridAction(this.dataGridPanel, "inspectSchemaId", __ctxPath + "/equip/multiLoseEffectiveEquipInspectSchema.do", "失效", function(a) {
			if ("1" == a.active) {
				return true;
			}
			$toast("【失效】的巡检计划必须是【激活】的巡检计划！");
			return false;
		}.createDelegate(this), "是否确认失效");
	}
});