var ContractArrangeListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	this.params["Q_arrangeType_S_EQ"] = "0";
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "制单人",
			name : "Q_userName_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "承租单位",
			name : "Q_customerName_S_LK"
		}, {
			lable : "申请日期",
			width : 115,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_GE"
		}, {
			lable : "至",
			width : 115,
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_providedDate_S_LE"
		},{
			id : Ext.id(),
			xtype : "treecombo",
			lable : "所属部门",
			width: 160,
			readOnly : false,
			allowBlank : true,
			name : "Q_competentDepartment_S_LK",
			url : __ctxPath + "/system/listDepartment.do"
		}];
	}
	var advancedItems = [ {
		fieldType : "CHAR_FIELD",
		name : "Q_userName_S_LK",
		fieldLabel : "制单人"
	}, 
	{
		fieldType : "CHAR_FIELD",
		name : "Q_projectName_S_LK",
		fieldLabel : "项目名称"
	}, {
		fieldType : "CHAR_FIELD",
		name : "Q_customerName_S_LK",
		fieldLabel : "承租单位"
	}, 
	{
		fieldType : "DATE_RANGE_FIELD",
		fieldLabel : "申请日期",
		leftFieldLabel : "Q_providedDate_S_GE",
		rightFieldLabel : "Q_providedDate_S_LE"
	},
	{
		fieldType : "ADDRESS_FIELD"
	} ];
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadContractArrange
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
			fields : ContractArrangeListViewField
		},
		rowAction : {
			width : 80,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "业务申请编号",
			dataIndex : "arrangeSerial"
		},  {
			width : 60,
			header : "制单人",
			dataIndex : "userName"
		}, {
			header : "申请日期",
			dataIndex : "providedDate"
		}, {
			header : "所属省份",
			dataIndex : "provinceName"
		}, {
			header : "承租单位",
			dataIndex : "customerName"
		}, {
			header : "所属公司",
			dataIndex : "corpName"
		}, {
			header : "所属部门",
			dataIndex : "competentDepartment"
		},/*{
			header : "设备类别",
			dataIndex : "equipCategoryName"
		}, */{
			width : 60,
			header : "需求数量(台)",
			dataIndex : "quantity"
		}, {
			header : "项目名称 ",
			dataIndex : "projectName"
		}, {
			header : "预计进场时间 ",
			dataIndex : "startDate"
		}, {
			width : 60,
			header : "状态 ",
			dataIndex : "applyforStateName"
		}]
	};
	ContractArrangeListView.superclass.constructor.call(this, Ext.apply({
		id : "ContractArrangeListView",
		title : TabTitle.CONTRACT_ARRANGE_LIST,
		iconCls : "menu-business-borrow",
		url : __ctxPath + "/dispatch/listContractArrange.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ContractArrangeListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptContractArrange
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveContractArrange
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
		case "1":
			if (isGranted("_ContractArrangeAccept")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_ContractArrangeApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ContractArrangeNewAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addContractArrange.createDelegate(this)
			});
		}
		if (isGranted("_ContractArrangeEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editContractArrange.createDelegate(this)
			});
		}
		if (isGranted("_ContractArrangeMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitContractArrange.createDelegate(this)
			});
		}
		if (isGranted("_ContractArrangeMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delContractArrange.createDelegate(this)
			});
		}
		if (isGranted("_ContractArrangeRollback")) {
			tbarItems.push({
				iconCls : "btn-head-recover",
				text : "回退",
				handler : this.rollbackContractArrange.createDelegate(this)
			});
		}
		if (isGranted("_ContractArrangePlanQuery")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "塔吊/升降机安排",
				handler : this.queryContractArrangePlan.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_ContractArrangePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printContractArrange.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的业务申请！";
		var msg2 = "您确认要【" + op + "】所选的业务申请吗？";
		var msg3 = "成功【" + op + "】所选的业务申请！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptContractArrange : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的业务申请必须是【待审核】的状态！");
			return;
		}
		new ContractArrangeForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveContractArrange : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的业务申请必须是【待审批】的状态！");
			return;
		}
		new ContractArrangeForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadContractArrange : function(a) {
		new ContractArrangeForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addContractArrange : function() {
		new ContractArrangeForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editContractArrange : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的业务申请必须是【待提交】的状态！");
			return;
		}
		new ContractArrangeForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	queryContractArrangePlan : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		var f = Ext.getCmp("centerTabPanel");
		var g = Ext.getCmp("ContractArrangePlanListView");
		if (g != null) {
			f.remove(g);
		}
		g = new ContractArrangePlanListView(a[0].data);
		f.add(g);
		f.activate(g);
	},
	submitContractArrange : function() {
		this.speciallyGridAction(this.dataGridPanel, "arrangeId", __ctxPath + "/dispatch/multiSubmitContractArrange.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的业务申请必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	delContractArrange : function() {
		this.speciallyGridAction(this.dataGridPanel, "arrangeId", __ctxPath + "/dispatch/multiDelContractArrange.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的业务申请必须是【待提交】的状态！");
			return false;
		}.createDelegate(this));
	},
	rollbackContractArrange : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length > 1) {
			$toast("请不要选择多条记录进行回退！");
			return;
		}
		this.speciallyGridAction(this.dataGridPanel, "arrangeId", __ctxPath + "/dispatch/rollbackContractArrange.do", "回退", function(a) {
			if ("3" == a.applyforState) {
				return true;
			}
			$toast("【回退】的业务申请必须是【审批通过】的状态！");
			return false;
		}.createDelegate(this));
	},
	printContractArrange : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/dispatch/printContractArrange.do?formpage=ContractArrange&arrangeId=" + a[0].data["arrangeId"];
		});
	}
});