var LostHandleListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "丢损日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_lostDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_lostDate_S_LE"
		}, {
			lable : "丢失单号",
			name : "Q_lostSerial_S_LK"
		}, {
		    lable : "设备自编号",
			name : "Q_equipSerial_S_LK"
		} ,applyforStatusCombo ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadLostHandle
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
			fields : LostHandleListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "状态",
			dataIndex : "applyforStateName"
		},{
			header : "单据编号",
			dataIndex : "lostSerial",
		},{
			header : "填报人",
			dataIndex : "userName"
		},{
			header : "丢损日期",
			dataIndex : "lostDate"
		},{
			header : "合同编号",
			dataIndex : "contractNo"
		}, {
			header : "项目名称",
			dataIndex : "projectName"
		}, {
			header : "设备型号",
			dataIndex : "equipSpecificName"
		}, {
			header : "设备自编号",
			dataIndex : "equipSerial"
		},{
			width : 50,
			header : "承租单位",
			dataIndex : "paEntName"
		},{
			width : 50,
			header : "费用合计",
			dataIndex : "costTotal"
		} ]
	};
	LostHandleListView.superclass.constructor.call(this, Ext.apply({
		id : "LostHandleListView",
		title : TabTitle.LOST_HANDLE_LIST,
		iconCls : "menu-business-employ",
		url : __ctxPath + "/equip/listLostHandle.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(LostHandleListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveLostHandle
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "2":
				if (isGranted("_LostHandleApprove")) {
					action[1].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_LostHandleAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addLostHandle.createDelegate(this)
			});
		}
		if (isGranted("_LostHandleEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editLostHandle.createDelegate(this)
			});
		}
		if (isGranted("_LostHandleMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitLostHandle.createDelegate(this)
			});
		}
		if (isGranted("_LostHandleMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLostHandle.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_LostHandleMultiPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printLostHandle.createDelegate(this)
			});
		}	if (isGranted("_LostHandleExport")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportLostHandle.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的丢失处理申请！";
		var msg2 = "您确认要【" + op + "】所选的丢失处理申请吗？";
		var msg3 = "成功【" + op + "】所选的丢失处理申请！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	approveLostHandle : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的丢失处理申请必须是【待审批】的状态！");
			return;
		}
		new LostHandleForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadLostHandle : function(a) {
		new LostHandleForm(a).show();
	},
	addLostHandle : function() {
		new ContractLeaseSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "3",
				Q_applyforState_S_LE : "6"
			},
			callback : function(d) {
				var data = d[0].data;
				new LostHandleForm({
					contractId : data.contractId,
					
					contractLease : data
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();

	},
	editLostHandle : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.applyforState) {
				$toast("【修改】的丢失处理申请必须是【待提交】的丢失处理申请！");
				return false;
			}
			return true;
		}, function(a) {
			new LostHandleForm(a.data, {
				contractId : a.data.contracttId,
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	submitLostHandle : function() {
		this.speciallyGridAction(this.dataGridPanel, "lostId", __ctxPath + "/equip/multiSubmitLostHandle.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的丢失处理申请必须是【待提交】的丢失处理申请！");
			return false;
		}.createDelegate(this));
	},
	delLostHandle : function() {
		this.speciallyGridAction(this.dataGridPanel, "lostId", __ctxPath + "/equip/multiDelLostHandle.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的丢失处理申请必须是【待提交】的丢失处理申请！");
			return false;
		}.createDelegate(this));
	},
	
	exportLostHandle : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/equip/exportLostHandle.do", this.dataGridPanel);
	},
	printLostHandle : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/equip/printLostHandle.do?lostId=" + a[0].data["lostId"];
		});
	}
});