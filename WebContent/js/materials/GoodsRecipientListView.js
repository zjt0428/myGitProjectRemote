var GoodsRecipientListView = function (a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var statusCombo = $initComboBoxField("状态", "Q_status_S_EQ", "AUDIT_APPROVAL_STATUS", {
		width : 80,
		allowBlank : true
	});
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [statusCombo,{
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		}, {
			lable : "收货单号",
			name : "Q_recipientSerial_S_LK"
		}, {
			lable : "合同编号",
			name : "Q_[leaseContract.leaseIdentifier]_S_LK"
		}, {
			lable : "附属单据号",
			name : "Q_subsidiarySerial_S_LK"
		}, {
			width : 120,
			lable : "租借单位",
			name : "Q_leaseUnit_S_LK"
		}];
	}
	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readGoodsRecipient
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
				fields : GoodsRecipientListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems,
				renderer : this.rendererRowActionItems.createDelegate(this)
			},
			tbarItems : tbarItems,
			columns : [{
				width : 40,
				header : "状态",
				dataIndex : "statusName"
			}, {
				width : 50,
				header : "制单人",
				dataIndex : "userName"
			}, {
				header : "收货单号",
				dataIndex : "recipientSerial"
			}, {
				width : 120,
				header : "合同编号",
				dataIndex : "leaseContract.leaseIdentifier"
			}, {
				header : "附属单据号",
				dataIndex : "subsidiarySerial"
			}, {
				header : "收货主题",
				dataIndex : "recipientTheme"
			}, {
				width : 150,
				header : "项目名称",
				dataIndex : "project.projectName"
			}, {
				header : "租借单位",
				dataIndex : "leaseUnit"
			}, {
				header : "承租单位",
				dataIndex : "lesseeUnit"
			}, {
				width : 70,
				header : "运输车辆",
				dataIndex : "transportVehicle"
			}, {
				width : 50,
				header : "运输人员",
				dataIndex : "transportPersonnel"
			}, {
				width : 50,
				header : "发货时间",
				dataIndex : "deliveryDate"
			}]
	}
	
	GoodsRecipientListView.superclass.constructor.call(this, Ext.apply({
		id : "GoodsRecipientListView",
		title : "收货管理",
		url : __ctxPath + "/materials/listGoodsRecipient.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}
Ext.extend(GoodsRecipientListView, Knight.ux.SearchGridPanel, {

	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材信息！";
		var msg2 = "您确认要【" + op + "】所选的周材信息吗？";
		var msg3 = "成功【" + op + "】所选的周材信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptGoodsRecipient
		});
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveGoodsRecipient
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.status) {
		case "1":
			if (isGranted("_GoodsRecipientAccept")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_GoodsRecipientApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_GoodsRecipientAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addGoodsRecipient.createDelegate(this)
			});
		}
		if (isGranted("_GoodsRecipientEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editGoodsRecipient.createDelegate(this)
			});
		}
		if (isGranted("_GoodsRecipientMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delGoodsRecipient.createDelegate(this)
			});
		}
		if (isGranted("_GoodsRecipientMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitGoodsRecipient.createDelegate(this)
			});
		}	
		tbarItems.push("->");
		if (isGranted("_GoodsRecipientPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printGoodsRecipient.createDelegate(this)
			});
		}
		return tbarItems;
	},
	readGoodsRecipient : function (a) {
		new GoodsRecipientForm(a).show();
	},
	addGoodsRecipient : function () {
		new GoodsRecipientForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editGoodsRecipient : function () {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.status != "0") {
			$toast("要【修改】的记录必须是【待提交】状态！");
			return;
		}
		new GoodsRecipientForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delGoodsRecipient : function () {
		this.speciallyGridAction(this.dataGridPanel, "recipientId", __ctxPath + "/materials/multiDelGoodsRecipient.do", "删除", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【删除】的收货信息必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	submitGoodsRecipient : function () {
		this.speciallyGridAction(this.dataGridPanel, "recipientId", __ctxPath + "/materials/multiSubmitGoodsRecipient.do", "提交", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【提交】的申请必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	acceptGoodsRecipient : function (a) {
		if ("1" != a.status) {
			$toast("【审核】的信息必须是【待审核】的状态！");
			return;
		}
		new GoodsRecipientForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveGoodsRecipient : function (a) {
		if ("2" != a.status) {
			$toast("【审核】的信息必须是【待审核】的状态！");
			return;
		}
		new GoodsRecipientForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	printGoodsRecipient : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/printFormGoodsRecipient.do?recipientId=" + a[0].data["recipientId"];
		});
	}
})