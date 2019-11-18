var EquipInsuranceListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	var actionItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_effective_S_EQ", "INSURE_EFFECTIVE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ {
			xtype : "datacombo",
			width : 75,
			lable : "是否理赔",
			name : "Q_claims_S_EQ",
			store : [ [ "0", "否" ], [ "1", "是" ] ]
		}, applyforStatusCombo, {
			lable : "保险单号",
			name : "Q_insureSerial_S_LK"
		}, {
			lable : "保险公司",
			name : "Q_insuranceCompany_S_LK"
		}, {
			lable : "出厂编号",
			name : "Q_equipInsuranceDetailSet.equipment.exwSerial_S_LK"
		}, {
			lable : "设备自编号",
			name : "Q_equipInsuranceDetailSet.equipment.equipSerial_S_LK"
		}, {
			lable : "归属仓库",
			name : "Q_equipInsuranceDetailSet.equipment.storeName_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_equipInsuranceDetailSet.equipment.projectName_S_LK"
		}, {
			xtype : "checkboxgroup",
			width : 100,
			items : [ {
				boxLabel : "一个月内到期",
				name : "expire",
				inputValue : "1"
			} ]
		}];
	}
	   actionItems = [ {
		iconCls : "btn-package_green",
		qtip : "详情",
		handler : this.readStock
	}, {
		iconCls : "btn-package_go",
		qtip : "明细",
		handler : this.readEquipInsurance
	}, {
		iconCls : "btn-grid-read",
		qtip : "查看",
		handler : this.loadEquipInsurance
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
			fields : EquipInsuranceListViewField
		},
		rowAction : {
			width : 70,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 80,
			header : "状态 ",
			dataIndex : "effectiveName"
		}, {
			header : "保险单号",
			dataIndex : "insureSerial"
		}, {
			header : "保险公司",
			dataIndex : "insuranceCompany"
		}, {
			header : "起保日期",
			dataIndex : "startInsureDate"
		}, {
			header : "停保日期",
			dataIndex : "endInsureDate"
		}, {
			header : "理赔电话",
			dataIndex : "claimPhone"
		}, {
			header : "保费总额",
			dataIndex : "totalPremium"
		}]
	};
	this.equipmentInsuranceView = new EquipmentInsuranceView({
	});
	this.equipInsuranceTabPanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		width : 600,
		maxSize : 600,
		region : "east",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [ this.equipmentInsuranceView]
	});

	this.equipmentInsuranceForm = new EquipmentInsuranceForm();
	this.equipmentInsuranceTabPanel = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		autoHeight : false,
		height : 150,
		maxSize : 300,
		region : "south",
		split : true,
		collapsed : true,
		collapseMode : "mini",
		items : [ this.equipmentInsuranceForm]
	});
	
	EquipInsuranceListView.superclass.constructor.call(this, Ext.apply({
		id : "EquipInsuranceListView",
		title : "保险管理",
		iconCls : "menu-business-storehouse",
		url : __ctxPath + "/equip/listEquipInsurance.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config,
		items : [  this.equipInsuranceTabPanel,this.equipmentInsuranceTabPanel]
	}, a));
};
Ext.extend(EquipInsuranceListView, Knight.ux.SearchGridPanel, {
	loadEquipInsurance : function(a) {
		new EquipInsuranceFrom(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	initRowActionItems : function(actionItems) {
		actionItems.push({
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveAllocation
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_EquipInsuranceAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_EquipInsuranceApprove")) {
					action[3].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_EquipInsuranceAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addEquipInsurance.createDelegate(this)
			});
		}
		if (isGranted("_EquipInsuranceEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editEquipInsurance.createDelegate(this)
			});
		}
//		if (isGranted("_EquipInsuranceMultiSubmit")) {
//			tbarItems.push({
//				iconCls : "btn-submit",
//				text : "提交",
//				handler : this.submitEquipInsurance.createDelegate(this)
//			});	
//		}
		if (isGranted("_EquipInsuranceMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delEquipInsurance.createDelegate(this)
			});
		}
		if (isGranted("_EquipInsuranceMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveEquipInsurance.createDelegate(this)
			});
		}
		if (isGranted("_EquipInsuranceMultiLoseEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "失效",
				handler : this.loseEffectiveEquipInsurance.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_EquipInsuranceExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportEquipInsurance.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的保险！";
		var msg2 = "您确认要【" + op + "】所选保险吗？";
		var msg3 = "成功【" + op + "】所选保险！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	readEquipInsurance : function(a) {
		this.equipInsuranceTabPanel.expand();
		var equipstore = this.equipmentInsuranceView.getDataGridPanel().getStore();
		Ext.apply(equipstore.baseParams, {
			"Q_insureId_L_EQ" : a.insureId,
		});
		equipstore.load();
		this.equipmentInsuranceView.setTitle(a.insureSerial + "-保险设备");
	},
	readStock : function(a) {
		this.equipmentInsuranceTabPanel.expand();
		var equipInsuranceFrom = this.equipmentInsuranceForm.getDataGridPanel().getStore();
		Ext.apply(equipInsuranceFrom.baseParams, {
   		   "Q_insureId_L_EQ" : a.insureId,
		});
		equipInsuranceFrom.load();
		this.equipmentInsuranceForm.insureId = a.insureId;
		this.equipmentInsuranceForm.searchResetOriginal({
			"Q_insureId_L_EQ" : a.insureId,
		});
	},
	submitEquipInsurance : function() {
		this.speciallyGridAction(this.dataGridPanel, "insureId", __ctxPath + "/equip/multiSubmitEquipInsurance.do", "提交", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【提交】的保险申请必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	addEquipInsurance : function() {
		new EquipInsuranceFrom(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editEquipInsurance : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.effective) {
			$toast("【修改】的合同信息必须是【未提交】的合同！");
			return;
		}
		new EquipInsuranceFrom(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveAllocation : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的保险信息必须是【待审批】的状态！");
			return;
		}
		new EquipInsuranceFrom(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delEquipInsurance : function() {
		this.speciallyGridAction(this.dataGridPanel, "insureId", __ctxPath + "/equip/multiDelEquipInsurance.do", "删除", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("【删除】的保险信息必须是【未生效】的保险！");
			return false;
		}.createDelegate(this));
	},
	exportEquipInsurance : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportEquipInsurance.do", this.dataGridPanel);
	},
	printsEquipInsurancet : function(type) {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printEquipInsurance.do?insureId=" + a[0].data["insureId"];
		}, null, 1000, 600);
	},
	loseEffectiveEquipInsurance : function() {
		this.speciallyGridAction(this.dataGridPanel, "insureId", __ctxPath + "/equip/multiLoseEffectiveEquipInsurance.do", "失效", function(a) {
			if ("0" != a.effective) {
				return true;
			}
			$toast("该保险信息已经【失效】！");
			return false;
		}.createDelegate(this), "是否确认失效");
	},
	effectiveEquipInsurance : function() {
		this.speciallyGridAction(this.dataGridPanel, "insureId", __ctxPath + "/equip/multiEffectiveEquipInsurance.do", "生效", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("该保险信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改");
	},
});