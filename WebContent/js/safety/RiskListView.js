var RiskListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	if (!this.searchDisenable) {
		var generalItems = [ {
			lable : "通知编号",
			name : "Q_riskSerial_S_LK"
		}, {
			lable : "备案编号",
			name : "Q_[equipment.recordId]_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_[equipment.exwSerial]_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		}, {
			lable : "检查单位",
			name : "Q_checkCustomName_S_LK"
		}, {
			lable : "检查日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_checkDate_S_EQ"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readRisk
	} ];
	if (!this.tbarDisenable) {
		var tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : RiskListViewField
		},
		rowAction : {
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "status",
			width : 50,
			renderer : function(n) {
				return n == "0" ? "<font color='red'>未反馈</font>" : "已反馈";
			}
		}, {
			header : "通知编号",
			dataIndex : "riskSerial"
		}, {
			header : "检查日期",
			dataIndex : "checkDate"
		}, {
			header : "整改设备",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipGenericName;
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
			header : "规格型号",
			dataIndex : "equipment",
			renderer : function(n) {
				return n.equipSpecificName;
			}
		}, {
			header : "项目名称",
			dataIndex : "project",
			renderer : function(n) {
				return n.projectName;
			}
		}, {
			header : "检查单位",
			dataIndex : "checkCustomName"
		}, {
			header : "整改负责人",
			dataIndex : "improvePerson"
		} ]
	};
	RiskListView.superclass.constructor.call(this, Ext.apply({
		id : "RiskListView",
		title : TabTitle.RISK_LIST,
		iconCls : "menu-business-customer",
		url : __ctxPath + "/safety/listRisk.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(RiskListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_RiskAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addRisk.createDelegate(this)
			});
		}
		if (isGranted("_RiskEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editRisk.createDelegate(this)
			});
		}
		if (isGranted("_RiskMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delRisk.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_RiskPrint")) {
			tbarItems.push({
				xtype : "tbsplit",
				iconCls : "btn-head-print",
				text : "打印",
				tooltip : {
					text : "隐患信息",
					title : "打印样式表"
				},
				menu : {
					items : [ {
						text : "隐患整改通知单",
						handler : this.printRisk.createDelegate(this, [ "Notice" ])
					}, {
						text : "整改登记表",
						handler : this.printRisk.createDelegate(this, [ "Rectify" ])
					} ]
				}
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的隐患记录！";
		var msg2 = "您确认要【" + op + "】所选的隐患记录吗？";
		var msg3 = "成功【" + op + "】所选的隐患记录！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	readRisk : function(a) {
		new RiskForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addRisk : function() {
		new EquipSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				new RiskForm({
					equipment : data
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editRisk : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.status) {
				$toast("【修改】的隐患信息必须是【未反馈】状态！");
				return false;
			}
			return true;
		}, function(a) {
			new RiskForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	delRisk : function() {
		this.speciallyGridAction(this.dataGridPanel, "riskId", __ctxPath + "/safety/multiDelRisk.do", "删除", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("【删除】的隐患信息必须是【未反馈】状态！");
			return false;
		}.createDelegate(this));
	},
	printRisk : function(type) {
		if ("Notice" == type) {
			$print(this.dataGridPanel, function(a) {
				return __ctxPath + "/safety/printRisk.do?formpage=Risk" + type + "&riskId=" + a[0].data["riskId"];
			});
			return;
		}
		if ("Rectify" == type) {
			$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/safety/printListRisk.do?formpage=Risk" + type, this.dataGridPanel, null, "_blank");
			return;
		}
	}
});