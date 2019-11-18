var EquipMaintSchemaListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	this.serialLable = this.serialLable ? this.serialLable : "业务编号";
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : this.serialLable,
			name : "Q_relateSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_equipment.recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipment.exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipment.projectName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadEquipMaintSchema
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
			fields : EquipMaintSchemaListViewField
		},
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [{
			header : "项目名称",
			dataIndex : "equipment",
			renderer : function(n) {
	
				return n.projectName;

			}
		}, {
			header : "备案编号",
			dataIndex : "equipment",
			renderer : function(n) {

					return n.recordId;

			}
		}, {
			header : "出厂编号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.exwSerial;
			}
		}, {
			header : "保养类别",
			dataIndex : "maintTypeName"
		}, {
			header : "计划开始时间",
			dataIndex : "cycleActivateDate"
		}, {
			width : 50,
			header : "周期天数",
			dataIndex : "cycleDays"
		}, {
			width : 50,
			header : "计划频率",
			dataIndex : "timesInCycle"
		}, {
			width : 50,
			header : "完成次数",
			dataIndex : "maintTimes"
		}, {
			width : 50,
			header : "状态",
			dataIndex : "active",
			renderer : function(n) {
				if ("0" == n) {
					return "待提交";
				}
				return "激活";
			}
		} ]
	};
	EquipMaintSchemaListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipMaintSchemaListView",
		title : TabTitle.EQUIP_MAINT_SCHEMA_LIST,
		iconCls : "menu-business-employ",
		url : __ctxPath + "/equip/listEquipMaintSchema.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipMaintSchemaListView, Knight.ux.SearchGridPanel, {
	speciallyGridAction : function(g, id, url, op, va, cmm) {
		var msg1 = "请选择要【" + op + "】的保养计划！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的保养计划吗？";
		var msg3 = "成功【" + op + "】所选的保养计划！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadEquipMaintSchema : function(a) {
		new EquipMaintSchemaForm(a).show();
	},
	editEquipMaintSchema : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.active) {
				$toast("【修改】的保养计划必须是【未提交】的计划！");
				return false;
			}
			return true;
		}, function(a) {
			new EquipMaintSchemaForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	submitEquipMaintSchema : function() {
		this.speciallyGridAction(this.dataGridPanel, "maintSchemaId", __ctxPath + "/equip/multiSubmitEquipMaintSchema.do", "提交", function(a) {
			if ("0" == a.active) {
				return true;
			}
			$toast("【提交】的保养计划必须是【待提交】的保养计划！");
			return false;
		}.createDelegate(this), "是否确认激活，点击确认后将无法进行修改");
	},
	delEquipMaintSchema : function() {
		this.speciallyGridAction(this.dataGridPanel, "maintSchemaId", __ctxPath + "/equip/multiDelEquipMaintSchema.do", "删除");
	}
});