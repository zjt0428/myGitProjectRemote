var AllocationProjectListView  = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	var advancedItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "AUDIT_APPROVAL_STATUS", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo,{
			lable : "调出项目",
			name : "Q_outProjectName_S_LK"
		}, {
			lable : "调入项目",
			name : "Q_inProjectName_S_LK"
		}, {
			lable : "附属单号",
			name : "Q_attachSerial_S_LK"
		}, {
			xtype : "datefield",
			format :"Y-m-d",
			lable : "调拨日期",
			name : "Q_allocationDate_S_GE",
			editable : false
		},{
			xtype : "datefield",
			format :"Y-m-d",
			lable : "至",
			name : "Q_allocationDate_S_LE",
			editable : false
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadAllocation
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
			fields : AllocationProjectListViewField
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
		}, {
			width : 70,
			header : "调拨编号",
			dataIndex : "allocationSerial"
		}, {
			width : 50,
			header : "主题",
			dataIndex : "allocationTheme"
		}, {
			width : 50,
			header : "制单人",
			dataIndex : "userName"
		}, {
			width : 70,
			header : "制单日期",
			dataIndex : "makeDate"
		}, {
			width : 70,
			header : "调拨日期",
			dataIndex : "allocationDate"
		},  {
			width : 50,
			header : "调拨类型",
			dataIndex : "allocationTypeName"
		},  {
			width : 70,
			header : "调出合同",
			dataIndex : "outContractSerial"
		},  {
			header : "调出项目",
			dataIndex : "outProjectName"
		},  {
			width : 70,
			header : "调入合同",
			dataIndex : "inContractSerial"
		},  {
			header : "调入项目",
			dataIndex : "inProjectName"
		},  {
			width : 50,
			header : "附属单号",
			dataIndex : "attachSerial"
		} ]
	};
	AllocationProjectListView .superclass.constructor.call(this, Ext.apply({
		id : "AllocationProjectListView",
		title : TabTitle.ALLOCATION_PROJECT_LIST,
		iconCls : "menu-business-dispatch",
		url : __ctxPath + "/materials/listAllocationProject.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AllocationProjectListView , Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptAllocation
		});
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveAllocation
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_AllocationProjectAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_AllocationProjectApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AllocationProjectAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addAllocation.createDelegate(this)
			});
		}
		if (isGranted("_AllocationProjectEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAllocation.createDelegate(this)
			});
		}
		if (isGranted("_AllocationProjectMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitAllocation.createDelegate(this)
			});
		}
		if (isGranted("_AllocationProjectMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delAllocation.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_AllocationProjectPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printAllocation.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的调拨信息！";
		var msg2 = "您确认要【" + op + "】所选的调拨信息吗？";
		var msg3 = "成功【" + op + "】所选的调拨信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptAllocation : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的调拨信息必须是【待审核】的状态！");
			return;
		}
		new AllocationProjectForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveAllocation : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的调拨信息必须是【待审批】的状态！");
			return;
		}
		new AllocationProjectForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadAllocation : function(a) {
		new AllocationProjectForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addAllocation : function(){
		new AllocationProjectForm(null, {
			saveable : true,
			allocationType : "0",
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editAllocation : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的调拨信息必须是【待提交】的调拨信息！");
			return;
		}
		new AllocationProjectForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitAllocation : function() {
		this.speciallyGridAction(this.dataGridPanel, "allocationId", __ctxPath + "/materials/multiSubmitAllocationProject.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的调度信息必须是【待提交】的调拨信息！");
			return false;
		}.createDelegate(this));
	},
	delAllocation : function() {
		this.speciallyGridAction(this.dataGridPanel, "allocationId", __ctxPath + "/materials/multiDelAllocationProject.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的调拨信息必须是【待提交】的调拨信息！");
			return false;
		}.createDelegate(this));
	},
	printAllocation : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/printFormAllocationProject.do?allocationId=" + a[0].data["allocationId"];
		});
	}
});