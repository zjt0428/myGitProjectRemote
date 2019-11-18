var ReturnGoodsListView = function (a) {
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
			lable : "合同编号",
			name : "Q_[leaseContract.leaseIdentifier]_S_LK"
		}, {
			lable : "退货单号",
			name : "Q_[returnSerial]_S_LK"
		}, {
			lable : "附属单据号",
			name : "Q_[subsidiarySerial]_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_[project.projectName]_S_LK"
		}, {
			lable : "租借单位",
			name : "Q_leaseUnit_S_LK"
		}]
	}
	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readReturnGoods
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
				fields : ReturnGoodsListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems,
				renderer : this.rendererRowActionItems.createDelegate(this)
			},
			tbarItems : tbarItems,
			columns : [{
				width : 25,
				header : "状态",
				dataIndex : "statusName"
			}, {
				width : 50,
				header : "退货单号",
				dataIndex : "returnSerial"
			}, {
				width : 35,
				header : "填报人",
				dataIndex : "userName"
			}, {
				width : 70,
				header : "填报日期",
				dataIndex : "fillDate"
			}, {
				header : "附属单据号",
				dataIndex : "subsidiarySerial"
			}, {
				width : 60,
				header : "合同编号",
				dataIndex : "leaseContract",
				renderer : function (n) {
					return n.leaseIdentifier;
				}
			}, {
				header : "项目名称",
				dataIndex : "project",
				renderer : function (n) {
					return n.projectName;
				}
			}, {
				header : "承租单位",
				dataIndex : "lesseeUnit"
			}, {
				header : "租借单位",
				dataIndex : "leaseUnit"
			}, {
				width : 40,
				header : "运输车辆",
				dataIndex : "transportVehicle"
			}, {
				width : 35,
				header : "运输人员",
				dataIndex : "transportPersonnel"
			}]
	}
	
	ReturnGoodsListView.superclass.constructor.call(this, Ext.apply({
		id : "ReturnGoodsListView",
		title : "退货管理",
		url : __ctxPath + "/materials/listReturnGoods.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}
Ext.extend(ReturnGoodsListView, Knight.ux.SearchGridPanel, {
	
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
			handler : this.acceptReturnGoods
		});
		actionItems.push({
			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveReturnGoods
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.status) {
		case "1":
			if (isGranted("_ReturnGoodsAccept")) {
				action[1].hidden = false;
			}
			break;
		case "2":
			if (isGranted("_ReturnGoodsApprove")) {
				action[2].hidden = false;
			}
			break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ReturnGoodsAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addReturnGoods.createDelegate(this)
			});
		}
		if (isGranted("_ReturnGoodsEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editReturnGoods.createDelegate(this)
			});
		}
		if (isGranted("_ReturnGoodsMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delReturnGoods.createDelegate(this)
			});
		}
		if (isGranted("_ReturnGoodsMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitReturnGoods.createDelegate(this)
			});
		}	
		tbarItems.push("->");
		if (isGranted("_ReturnGoodsPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printReturnGoods.createDelegate(this)
			});
		}
		return tbarItems;
	},
	readReturnGoods : function (a) {
		new ReturnGoodsForm(a).show();
	},
	addReturnGoods : function () {
		new LeaseContractSelector({
			params : {
				"Q_status_S_NEQ" : "7"
			},
			single : true,
			callback : function(a) {
				var data = $ajaxSyncCall(__ctxPath + "/materials/loadLeaseContract.do", {
					leaseId : a[0].data.leaseId
				})
				new ReturnGoodsForm(null, {
					saveable : true,
					data : data.data[0],
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editReturnGoods : function () {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.status != "0") {
			$toast("要【修改】的记录必须是【待提交】状态！");
			return;
		}
		new ReturnGoodsForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delReturnGoods : function () {
		this.speciallyGridAction(this.dataGridPanel, "returnId", __ctxPath + "/materials/multiDelReturnGoods.do", "删除", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【删除】的退货管理必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	submitReturnGoods : function () {
		this.speciallyGridAction(this.dataGridPanel, "returnId", __ctxPath + "/materials/multiSubmitReturnGoods.do", "提交", function(a) {
			if (a.status == "0" ) {
				return true;
			}
			$toast("【提交】的退货管理必须是【待提交】状态！");
			return false;
		}.createDelegate(this))
	},
	acceptReturnGoods : function (a) {
		if ("1" != a.status) {
			$toast("【审核】的信息必须是【待审核】的状态！");
			return;
		}
		new ReturnGoodsForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show()
	},
	approveReturnGoods : function (a) {
		if ("2" != a.status) {
			$toast("【审批】的信息必须是【待审批】的状态！");
			return;
		}
		new ReturnGoodsForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show()
	},
	printReturnGoods : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/printFormReturnGoods.do?returnId=" + a[0].data["returnId"];
		});
	}
})