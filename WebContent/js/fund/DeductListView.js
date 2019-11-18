var DeductListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ {
			lable : "提成编号",
			name : "Q_deductSerial_S_LK"
		}, {
			lable : ContractLeaseFormConfigure.contractSerialHeader,
			name : "Q_contractSerial_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadDeduct
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
			sortField : "deductId",
			sortDir : "desc",
			id : "deductId",
			fields : DeductListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 80,
			header : "提成编号",
			dataIndex : "deductSerial"
		}, {
			width : 80,
			header : ContractLeaseFormConfigure.contractSerialHeader,
			dataIndex : "contractSerial"
		}, {
			width : 80,
			header : "合同主题",
			dataIndex : "contractTheme"
		}, {
			width : 80,
			header : "提成基数",
			dataIndex : "acardinalName"
		}, {
			width : 80,
			header : "提成比例",
			dataIndex : "proportionTypeName"
		}, {
			width : 80,
			header : "提成总额",
			dataIndex : "deductTotalAmount"
		}, {
			width : 40,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ]
	};
	DeductListView.superclass.constructor.call(this, Ext.apply({
		id : "DeductListView",
		title : TabTitle.DEDUCT_LIST,
		iconCls : "menu-business-deduct",
		url : __ctxPath + "/fund/listDeduct.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(DeductListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptDeduct
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveDeduct
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_DeductAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_DeductApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_DeductAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addDeduct.createDelegate(this)
			});
		}
		if (isGranted("_DeductEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editDeduct.createDelegate(this)
			});
		}
		if (isGranted("_DeductMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitDeduct.createDelegate(this)
			});
		}
		if (isGranted("_DeductMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delDeduct.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的提成！";
		var msg2 = "您确认要【" + op + "】所选的提成吗？";
		var msg3 = "成功【" + op + "】所选的提成！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptDeduct : function(a) {
		if ("1" != a.applyforState) {
			$toast("【审核】的提成信息必须是【待审核】的状态！");
			return;
		}
		new DeductForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveDeduct : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的提成信息必须是【待审批】的状态！");
			return;
		}
		new DeductForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadDeduct : function(a) {
		new DeductForm(a).show();
	},
	addDeduct : function() {
		new ContractLeaseSelector({
			single : true,
			params : {
				Q_fundType_S_EQ : "1",
				Q_deduct_S_EQ : "1",
				Q_applyforState_S_GE : "4",
				Q_applyforState_S_LE : "6"
			},
			callback : function(d) {
				var data = d[0].data;
				var deductForm = new DeductForm({
					contract : data
				}, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
				deductForm.show();
				new Ext.util.DelayedTask(function() {
					deductForm.deductPractiGrid.addSubModuleDate({
						practiId : data.salesmanId,
						practiName : data.salesman
					});
				}.createDelegate(this)).delay(500);
			}.createDelegate(this)
		}).show();

	},
	editDeduct : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的提成信息必须是【待提交】的提成！");
			return;
		}
		new DeductForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitDeduct : function() {
		this.speciallyGridAction(this.dataGridPanel, "deductId", __ctxPath + "/fund/multiSubmitDeduct.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的提成信息必须是【待提交】的提成！");
			return false;
		}.createDelegate(this));
	},
	delDeduct : function() {
		this.speciallyGridAction(this.dataGridPanel, "deductId", __ctxPath + "/fund/multiDelDeduct.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的提成信息必须是【待提交】的提成！");
			return false;
		}.createDelegate(this));
	}
});