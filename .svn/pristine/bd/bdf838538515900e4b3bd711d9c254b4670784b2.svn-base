var ScrapContractListView = function(a) {
	this.saveable = this.saveable; // 保存/重置功能按钮
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "SCRAP_CONTRACT_APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo, {
			lable : "资产属性",
			name : "Q_contractSerial_S_LK"
		}, {
			lable : "存放仓库",
			name : "Q_storeName_S_LK"
		}, {
			lable : "库位",
			name : "Q_storageLocation_S_LK"
		},{
			lable : "制单日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_applyDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadScrap
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
			fields : ScrapContractListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "状态",
			dataIndex : "applyforStateName"
		},{
			header : "制单人",
			dataIndex : "userName"
		}, {
			header : "合同主题",
			dataIndex : "contractTheme"
		}, {
			header : "合同编号",
			dataIndex : "contractSerial"
		}, {
			header : "制单日期",
			dataIndex : "contractDate"
		}, {
			header : "仓库名称",
			dataIndex : "storeName"
		}, {
			header : "库位",
			dataIndex : "storageLocation"
		}]
	};
	ScrapContractListView.superclass.constructor.call(this, Ext.apply({
		id : "ScrapContractListView",
		title : TabTitle.SCRAP_CONTRACT_LIST,
		iconCls : "menu-business-install",
		url : __ctxPath + "/stock/listScrapContract.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(ScrapContractListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptScrap
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveScrap
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "评审",
			hidden : true,
			handler : this.reviewScrap
		});
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_ScrapContractAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_ScrapContractApprove")) {
					action[2].hidden = false;
				}
				break;
			case "4":
				if (isGranted("_ScrapContractReview")&& record.data.isReviewed == '0') {
					action[3].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ScrapContractAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addScrapContract.createDelegate(this)		
			});
		}
		if (isGranted("_ScrapContractEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editScrapContract.createDelegate(this)
			});
		}
		if (isGranted("_ScrapContractSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitScrapContract.createDelegate(this)
			});
		}
		if (isGranted("_ScrapContractMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delScrapContract.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_BorrowPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printScrapContract.createDelegate(this)
			});
		}
		if (isGranted("_BorrowExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportScrapContract.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的合同！";
		var msg2 = "您确认要【" + op + "】所选的合同吗？";
		var msg3 = "成功【" + op + "】所选的合同！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptScrap : function(a) {
		if ("1" != a.applyforState) {S
			$toast("【审核】的合同信息必须是【待审核】的状态！");
			return;
		}
		new ScrapContractForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	reviewScrap : function(a) {
		if ("4" != a.applyforState) {
			$toast("【评审】的申请信息必须是【待评审】的状态！");
			return;
		}
		new ScrapContractForm(a, {
			reviewtable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveScrap : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的合同信息必须是【待审批】的状态！");
			return;
		}
		new ScrapContractForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadScrap : function(a) {
		new ScrapContractForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addScrapContract : function(a) {
		new ScrapApplySelector({
			params : {
				Q_applyforState_S_EQ : '3'
			},
			saveable : true,
			single : true,
			callback : function(d) {
				var data = d[0].data;
				data.demandDetailSet= d[0].json.demandDetailSet;
				new ScrapContractForm(data, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();
	},
//	addScrapContract : function() {
//		new ScrapContractForm(null, {
//			saveable : true,
//			callback : function() {
//				this.dataGridPanel.getStore().reload();
//			}.createDelegate(this)
//		}).show();
//	},
	editScrapContract : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的合同信息必须是【待提交】的合同！");
			return;
		}
		new ScrapContractForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitScrapContract : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractId", __ctxPath + "/stock/multiSubmitScrapContract.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的合同信息必须是【待提交】的合同！");
			return false;
		}.createDelegate(this));
	},
	delScrapContract : function() {
		this.speciallyGridAction(this.dataGridPanel, "contractId", __ctxPath + "/stock/multiDelScrapContract.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的合同信息必须是【待提交】的合同！");
			return false;
		}.createDelegate(this));
	},
	printScrapContract : function() {
		$print(this.dataGridPanel, function(a) {
			return __ctxPath + "/stock/printFormScrapContract.do?contractId=" + a[0].data["contractId"];
		});
	},
	exportScrapContract : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/stock/exportScrapContract.do", this.dataGridPanel);
	}
});