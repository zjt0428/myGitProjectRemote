var TemporaryReturnListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "AUDIT_APPROVAL_STATUS", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo, {
			lable : "退货单号",
			name : "Q_returnSerial_S_LK"
		}, {
			lable : "工程名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "仓库名称",
			name : "Q_depotName_S_LK"
		},{
			lable : "制单时间",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d H:i:s",
			name : "Q_applyDate_S_LE",
			listeners : {
				'select' : function(field,date) {
					var Y = date.getFullYear();
					var m = date.getMonth();
					var d = date.getDate();
					var newDate = new Date(Y,m,d,23,59,0)
					field.setValue(newDate);
				}.createDelegate(this)
			}
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadMaterials
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
			fields : TemporaryReturnListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width :50,
			header : "状态",
			dataIndex : "applyforStateName"
		},{
			header : "退货单号",
			dataIndex : "returnSerial"
		},{
			header : "合同编号",
			dataIndex : "contractMaterials",
			renderer : function(n) {
				return n.contractSerial;
			}
		}, {
			width : 170,
			header : "工程名称",
			dataIndex : "projectName"
		}, {
			width : 70,
			header : "收发人员",
			dataIndex : "deliveryMan"
		}, {
			width : 70,
			header : "仓库名称",
			dataIndex : "depotName"
		}, {
			width : 70,
			header : "运输车牌",
			dataIndex : "licensePlate"
		}, {
			header : "制单时间",
			dataIndex : "applyDate"
		}, {
			header : "审核时间",
			dataIndex : "acceptTime"
		}, {
			header : "审批时间",
			dataIndex : "approveTime"
		}]
	};
	TemporaryReturnListView.superclass.constructor.call(this, Ext.apply({
		id : "TemporaryReturnListView",
		title : TabTitle.TEMPORARY_RETURN,
		iconCls : "menu-business-install",
		url : __ctxPath + "/materials/listTemporaryReturn.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(TemporaryReturnListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptMaterials
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveMaterials
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_TemporaryReturnAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_TemporaryReturnApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_TemporaryReturnAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addTemporaryReturn.createDelegate(this)		
			});
		}
		if (isGranted("_TemporaryReturnEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editTemporaryReturn.createDelegate(this)
			});
		}
		if (isGranted("_TemporaryReturnSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitTemporaryReturn.createDelegate(this)
			});
		}
		if (isGranted("_TemporaryReturnMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delTemporaryReturn.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_TemporaryReturnPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printTemporaryReturn.createDelegate(this)
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
	acceptMaterials : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的申请信息必须是【待审核】的状态！");
			return;
		}
		new TemporaryReturnForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveMaterials : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的申请信息必须是【待审批】的状态！");
			return;
		}
		new TemporaryReturnForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadMaterials : function(a) {
		new TemporaryReturnForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addTemporaryReturn : function(){
		new ContractMaterialsSelector({
			single : true,
			params : {
				"Q_applyforState_S_LK" : "3"
			},
			callback : function(d) {
				var data = d[0].data;
				new TemporaryReturnForm({
					contractMaterials : data
				},{
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
	editTemporaryReturn : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的申请信息必须是【待提交】的申请！");
			return;
		}
		new TemporaryReturnForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitTemporaryReturn : function() {
		this.speciallyGridAction(this.dataGridPanel, "returnId", __ctxPath + "/materials/multiSubmitTemporaryReturn.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的申请信息必须是【待提交】的申请！");
			return false;
		}.createDelegate(this));
	},
	delTemporaryReturn : function() {
		this.speciallyGridAction(this.dataGridPanel, "returnId", __ctxPath + "/materials/multiDelTemporaryReturn.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的申请信息必须是【待提交】的申请！");
			return false;
		}.createDelegate(this));
	},
	printTemporaryReturn : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/materials/printFormTemporaryReturn.do?returnId=" + a[0].data["returnId"];
		});
	}
	
});