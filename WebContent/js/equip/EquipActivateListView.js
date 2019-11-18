var EquipActivateListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")) {
		this.params['QVO_equipFlow.contractLease.permissionFlag_S_LK'] = curUserInfo.dataPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});  
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("生效状态", "Q_effective_S_EQ", "EFFECTIVE_FLAG", {
			width : 80,
			lable : "生效状态",
			allowBlank : true
		});
		generalItems = [ {
			lable : "备案编号",
			name : "Q_equipFlow.equipDiary.recordId_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipFlow.equipDiary.exwSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipFlow.equipDiary.projectName_S_LK"
		}, {
			lable : "设备自编号",
			name : "Q_equipFlow.equipDiary.equipSerial_S_LK"
		}, applyforStatusCombo,
		{
			lable : "所属分公司",
			name : "Q_department.depName_S_LK"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadEquipActivate
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
			fields : EquipActivateListViewField
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
				return n.equipDiary.buildingNum ;
			}
		}, {
			header : "启用日期",
			dataIndex : "activateDate" 
		}, {
			header : "备案编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.recordId;
			}
		}, {
			header : "规格型号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipSpecificName;
			}
		},{
			header : "设备自编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.equipSerial;
			}
		},{
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
			header : "合同编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.contractLease.contractNo;
			}
		},{
			header : "合同编号",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.contractLease.contractSerial;
			}
		}, {
			header : "项目名称",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipDiary.projectName;
			}
		}, {
			header : "项目地址",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.contractLease.address;
			}
		}, {
			header : "承租单位",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.contractLease.paEntName;
			}
		}, {
			width : 40,
			header : "生效状态",
			dataIndex : "effectiveName",
			renderer : function(n, meta, record) {
				if (record.data.effective == "0") {
					return "<font face='宋体' color='red'>"+n+"</font>";
				}
				return n;
			}	
		}, {
			header : "进场日期",
			dataIndex : "equipFlow",
			renderer : function(n) {
				return n.equipInstall.startinDate;
			}
		} ]
	};
	EquipActivateListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipActivateListView",
		title : TabTitle.EQUIP_ACTIVATE_LIST,
		iconCls : "menu-business-activate",
		url : __ctxPath + "/equip/listEquipActivate.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(EquipActivateListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipActivateAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				tooltip : {
					text : "关联业务检测报告",
					title : "按设备"
				},
				handler : this.addInstallEquipActivate.createDelegate(this)			
			});
		}
		if (isGranted("_EquipActivateEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipActivate.createDelegate(this)
			});
		}
		if (isGranted("_EquipActivateMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveEquipActivate.createDelegate(this)
			});
		}
		if (isGranted("_EquipActivateMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveEquipActivate.createDelegate(this)
			});
		}
		if (isGranted("_EquipActivateMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipActivate.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipActivateExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportEquipActivate.createDelegate(this)
			});
		}
		if (isGranted("_EquipActivatePrinter")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printEquipActivate.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va, cmm) {
		var msg1 = "请选择要【" + op + "】的启用信息！";
		var msg2 = cmm ? cmm : "您确认要【" + op + "】所选的启用信息吗？";
		var msg3 = "成功【" + op + "】所选的启用信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	loadEquipActivate : function(a) {		
		new EquipActivateForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addInstallEquipActivate : function() {
		new EquipFlowInstallSelector({
		    single : true,
			params : { // 过滤已启用
				"Q_[activateId]_L_NULL" : "0",
				"Q_flowState_S_LE" : "8",
				"Q_equipInstall.delFlag_S_EQ" : "1"
			},
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/equip/loadEquipFlow.do",
					params : {
						loadProject : true,
						flowId : data.flowId
					},
					success : function(g, h) {
						var resp = Ext.util.JSON.decode(g.responseText);
						new EquipActivateForm(resp.data[0], {
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
	editEquipActivate : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.effective) {
				Ext.MessageBox.alert("操作信息", "该启用信息已经【生效】不允许修改！");
				return false;
			}
			return true;
		}.createDelegate(this), function(a) {
			new EquipActivateForm(a.data, {
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	exportEquipActivate : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportEquipActivate.do", this.dataGridPanel);
	},
	effectiveEquipActivate : function() {
		this.speciallyGridAction(this.dataGridPanel, "activateId", __ctxPath + "/equip/multiEffectiveEquipActivate.do", "生效", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("该启用信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	loseEffectiveEquipActivate : function() {
		this.speciallyGridAction(this.dataGridPanel, "activateId", __ctxPath + "/equip/multiLoseEffectiveEquipActivate.do", "失效", function(a) {
			if ("1" == a.effective) {
				return true;
			}
			$toast("【未生效】的启用信息无法【失效】！");
			return false;
		}.createDelegate(this));
	},
	delEquipActivate : function() {
		this.speciallyGridAction(this.dataGridPanel, "activateId", __ctxPath + "/equip/multiDelEquipActivate.do", "删除", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("【已生效】的启用信息无法【删除】！");
			return false;
		}.createDelegate(this));
	},
	printEquipActivate : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printEquipActivate.do?formpage=EquipActivate&activateId=" + a[0].data["activateId"];
		});
	}
});