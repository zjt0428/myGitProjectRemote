var EquipDetectListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "备案编号",
			name : "Q_equipFlow.equipDiary.recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipFlow.equipDiary.exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipFlow.equipDiary.projectName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadEquipDetect
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
			fields : EquipDetectListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 40,
			header : "楼号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.buildingNum;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "备案编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.recordId;
			}
		}, {
			header : "检测编号",
			dataIndex : "detectSerial"
		}, {
			header : "检测日期",
			dataIndex : "detectDate"
		}, {
			header : "关联业务",
			dataIndex : "relateModuleName"
		}, {
			header : "检测费用",
			dataIndex : "detectAmount",
			renderer : function(a) {
				return Ext.util.Format.number(a, "0.00");
			}
		}, {
			header : "应付金额",
			dataIndex : "balanceAmount",
			renderer : function(a, b, c) {
				return Ext.util.Format.number(a, "0.00");
			}
		}, {
			header : "已付金额",
			dataIndex : "paymentAmount",
			renderer : function(a) {
				return Ext.util.Format.number(a, "0.00");
			}
		}, {
			header : "出厂编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.exwSerial;
			}
		}, {
			header : "设备名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipGenericName;
			}
		}, {
			header : "项目所属地",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.address;
			}
		}, {
			header : "检测单位",
			dataIndex : "detectEntName"
		} ]
	};
	EquipDetectListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipDetectListView",
		title : TabTitle.EQUIP_DETECT_LIST,
		iconCls : "menu-business-detector",
		url : __ctxPath + "/equip/listEquipDetect.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipDetectListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipDetectAdd")) {
			tbarItems.push({
				xtype : "tbsplit",
				iconCls : "btn-head-add",
				text : "新增",
				tooltip : {
					text : "关联业务检测报告",
					title : "检测管理"
				},
				menu : {
					items : [ {
						text : "安装检测",
						handler : this.addInstallEquipDetect.createDelegate(this)
					} ]
				}
			});
		}
		if (isGranted("_EquipDetectEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipDetect.createDelegate(this)
			});
		}
		if (isGranted("_EquipDetectMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipDetect.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipDetectPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipDetect.createDelegate(this, [ "" ])
			});
		}
		if (isGranted("_EquipDetectMiddlePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipDetect.createDelegate(this, [ "Middle" ])
			});
		}
		if (isGranted("_EquipDetectExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportEquipDetect.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的检测信息！";
		var msg2 = "您确认要【" + op + "】所选的检测信息吗？";
		var msg3 = "成功【" + op + "】所选的检测信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadEquipDetect : function(a) {
		new EquipDetectForm(a).show();
	},
	addInstallEquipDetect : function() {
		new EquipFlowInstallSelector({
			params : {
				"Q_flowState_S_EQ" : "2"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do?loadProject=true&flowId=" + data.flowId,
					success : function(g, h) {
						var equipFlow = Ext.util.JSON.decode(g.responseText).data[0];
						new EquipDetectForm({
							relateId : equipFlow.equipInstall.installId,
							relateSerial : equipFlow.equipInstall.installSerial,
							relateModule : RelationModule.equipInstall.relateModule,
							relateModuleName : RelationModule.equipInstall.relateModuleName,
							equipFlow : equipFlow
						}, {
							saveable : true,
							callback : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addEmployEquipDetect : function() {
		new EquipFlowEmploySelector({
			params : {
				"Q_flowState_S_EQ" : "4"
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do?loadProject=true&flowId=" + data.flowId,
					success : function(g, h) {
						var equipFlow = Ext.util.JSON.decode(g.responseText).data[0];
						new EquipDetectForm({
							relateId : equipFlow.equipEmploy.employId,
							relateSerial : equipFlow.equipEmploy.employSerial,
							relateModule : RelationModule.equipEmploy.relateModule,
							relateModuleName : RelationModule.equipEmploy.relateModuleName,
							equipFlow : equipFlow
						}, {
							saveable : true,
							callback : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	editEquipDetect : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new EquipDetectForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delEquipDetect : function() {
		this.speciallyGridAction(this.dataGridPanel, "detectId", __ctxPath + "/equip/multiDelEquipDetect.do", "删除");
	},
	printEquipDetect : function(type) {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printEquipDetect.do?formpage=EquipDetect" + type + "&detectId=" + a[0].data["detectId"];
		});
	},
	exportEquipDetect : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportEquipDetect.do", this.dataGridPanel);
	}
});