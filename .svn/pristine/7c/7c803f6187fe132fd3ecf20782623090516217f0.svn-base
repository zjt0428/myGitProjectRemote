var AllocationDepotListView  = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	var advancedItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "调出仓库",
			name : "Q_outDepotName_S_LK"
		}, {
			lable : "调入仓库",
			name : "Q_inDepotName_S_LK"
		}, {
			lable : "主题",
			name : "Q_allocationTheme_S_LK"
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
			fields : AllocationDepotListViewField
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
			width : 50,
			header : "调拨编号",
			dataIndex : "allocationSerial"
		}, {
			header : "调拨主题",
			dataIndex : "allocationTheme"
		}, {
			header : "制单人",
			dataIndex : "userName"
		}, {
			header : "调拨日期",
			dataIndex : "allocationDate"
		},  {
			header : "调出仓库",
			dataIndex : "outDepotName"
		},  {
			header : "调入仓库",
			dataIndex : "inDepotName"
		},{
			header : "负责人",
			dataIndex : "chargeMan"
		}  ]
	};
	AllocationDepotListView .superclass.constructor.call(this, Ext.apply({
		id : "AllocationDepotListView",
		title : TabTitle.ALLOCATION_DEPOT_LIST,
		iconCls : "menu-business-dispatch",
		url : __ctxPath + "/materials/listAllocationDepot.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AllocationDepotListView , Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
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
			case "2":
				if (isGranted("_AllocationDepotApprove")) {
					action[1].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AllocationDepotAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addAllocation.createDelegate(this)
			});
		}
		if (isGranted("_AllocationDepotEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAllocation.createDelegate(this)
			});
		}
		if (isGranted("_AllocationDepotMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitAllocation.createDelegate(this)
			});
		}
		if (isGranted("_AllocationDepotMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delAllocation.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_AllocationDepotPrint")) {
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
	approveAllocation : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的调拨信息必须是【待审批】的状态！");
			return;
		}
		new AllocationDepotForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadAllocation : function(a) {
		new AllocationDepotForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addAllocation : function(){
		new BaseDepotSelector({
			outDepot : true,
			callback : function(d) {
				var data1 = d[0].json;					//调出
				this.data1 = data1;
				this.outDepotId = data1.depotId;
				new BaseDepotSelector({
					params : {
						Q_depotId_L_NEQ : data1.depotId 
					},
					inDepot : true,
					callback : function(d) {
						var data2 = d[0].json;			//调入
						this.data2 = data2;
						new AllocationDepotForm({
							data1 : this.data1,
							data2 : this.data2,
							saveable : true,
							callback : function() {
								var data = d[0].data;
								inDepotId : data.depotId;
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
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
		new AllocationDepotForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitAllocation : function() {
		this.speciallyGridAction(this.dataGridPanel, "allocationId", __ctxPath + "/materials/multiSubmitAllocationDepot.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的调度信息必须是【待提交】的调拨信息！");
			return false;
		}.createDelegate(this));
	},
	delAllocation : function() {
		this.speciallyGridAction(this.dataGridPanel, "allocationId", __ctxPath + "/materials/multiDelAllocationDepot.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的调拨信息必须是【待提交】的调拨信息！");
			return false;
		}.createDelegate(this));
	},
	printAllocation : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/printFormAllocationDepot.do?allocationId=" + a[0].data["allocationId"];
		});
	}
});