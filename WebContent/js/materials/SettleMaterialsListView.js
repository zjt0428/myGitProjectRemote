var SettleMaterialsListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = '1';
	this.params.Q_settledAmount_BD_NEQ = 0;
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var statusCombo = $initComboBoxField("状态", "Q_status_S_EQ", "EFFECTIVE_FLAG", {
			width : 75,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [statusCombo, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		},{
			lable : "结算主题",
			name : "Q_settleTitle_S_LK"
		},{
			lable : "承租单位",
			name : "Q_paEntName_S_LK"
		},{
			lable : "结算日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_settleDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_settleDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadSettleMaterials
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
			fields : SettleMaterialsListViewField
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
		},{
			header : "结算主题",
			dataIndex : "settleTitle"
		},{
			header : "结算人员",
			dataIndex : "settleMan"
		}, {
			header : "结算单号",
			dataIndex : "settleSerial"
		},{
			header : "合同编号",
			dataIndex : "contractSerial"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "承租单位",
			dataIndex : "paEntName"
		}, {
			header : "本次结算金额",
			dataIndex : "settledAmount"
		}, {
			xtype : "datecolumn",
			format : "Y-m-d H:i",
			header : "结算日期",
			dataIndex : "settleDate"
		}, {
			header : "起始日期",
			dataIndex : "startDate"
		}, {
			header : "截止日期",
			dataIndex : "endDate"
		}]
	};
	SettleMaterialsListView.superclass.constructor.call(this, Ext.apply({
		id : "SettleMaterialsListView",
		title : TabTitle.SETTLE_MATERIALS_LIST,
		iconCls : "menu-business-cashflow",
		url : __ctxPath + "/materials/listSettleMaterials.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(SettleMaterialsListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_SettleMaterialsAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addSettleMaterials.createDelegate(this)		
			});
		}
		if (isGranted("_SettleMaterialsEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editSettleMaterials.createDelegate(this)
			});
		}
		if (isGranted("_SettleMaterialsMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delSettleMaterials.createDelegate(this)
			});
		}
		if (isGranted("_SettleMaterialsMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveSettleMaterials.createDelegate(this)
			});
		}
		if (isGranted("_SettleMaterialsMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveSettleMaterials.createDelegate(this)
			});
		}
		if (isGranted("_SettleMaterialsMultiAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "批量新增",
				handler : this.multiAddSettleMaterials.createDelegate(this)		
			});
		}
		tbarItems.push("->");
		if (isGranted("_SettleMaterialsPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printSettleMaterials.createDelegate(this)
			});
		}
		if (isGranted("_SettleMaterialsExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportSettleMaterials.createDelegate(this)
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
	loadSettleMaterials : function(a) {
		new SettleMaterialsForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addSettleMaterials : function(a) {
		new ContractMaterialsSelector({
			params : {
				"Q_applyforState_S_GE": '3'
			},
			saveable : true,
			single : true,
			callback : function(d) {
				var data = d[0].data;
				new SettleMaterialsForm(data, {
					saveable : true,
					isMulti:false,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	multiAddSettleMaterials : function(a) {
		new ContractMaterialsSecondSelector({
			params : {
				"Q_applyforState_S_GE": '3'
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
				new SettleMaterialsForm(d, {
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
	editSettleMaterials : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length==0) {
			$toast("请选择一条数据！");
			return;
		}
		if(a.length>1) {
			$toast("请勿选择多条数据！");
			return;
		}
		if ("1" == a[0].data.status) {
			$toast("该信息已经【生效】！无法修改！");
			return;
		}
		new SettleMaterialsForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delSettleMaterials : function() {
		this.speciallyGridAction(this.dataGridPanel, "settleId", __ctxPath + "/materials/multiDelSettleMaterials.do", "删除", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("该信息已经【生效】！");
		}.createDelegate(this));
	},
	effectiveSettleMaterials : function() {
		this.speciallyGridAction(this.dataGridPanel, "settleId", __ctxPath + "/materials/multiEffectiveSettleMaterials.do", "生效", function(a) {
			if ("0" == a.status) {
				return true;
			}
			$toast("该信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
	loseEffectiveSettleMaterials : function() {
		this.speciallyGridAction(this.dataGridPanel, "settleId", __ctxPath + "/materials/multiLoseEffectiveSettleMaterials.do", "失效", function(a) {
			if ("1" == a.status) {
				return true;
			}
			$toast("该信息已经【失效】！");
			return false;
		}.createDelegate(this), "是否确认失效");
	},
	printSettleMaterials : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/printFormSettleMaterials.do?settleId=" + a[0].data["settleId"];
		});
	},
	exportSettleMaterials : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/materials/exportSettleMaterials.do", this.dataGridPanel);
	}
});