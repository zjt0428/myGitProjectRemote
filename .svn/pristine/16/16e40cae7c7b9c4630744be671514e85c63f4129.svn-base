var PurchasePlanListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delflag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "PURCHASE_PLAN_APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ 
		                 applyforStatusCombo, {
			lable : "填报人",
			name : "Q_personName_S_LK"
		}, {
			lable : "申请人",
			name : "Q_applicantName_S_LK"
		},{
			lable : "询价负责人",
			name : "Q_inquiryName_S_LK"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadPurchasePlan
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
			sortField : "purchasePlanId",
			sortDir : "desc",
			id : "purchasePlanId",
			fields : PurchasePlanListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "填报人",
			dataIndex : "personName"
		}, {
			header : "申请人",
			dataIndex : "applicantName"
		}, {
			header : "填报日期",
			dataIndex : "fillDate"
		}, {
			header : "申请部门",
			dataIndex : "applicantDept"
		}, {
			header : "询价负责人",
			dataIndex : "inquiryName"
		}, {
			header : "询价日期",
			dataIndex : "inquiryDate"
		}, {
			header : "费用合计",
			dataIndex : "totalCost"
		},{
			width : 40,
			header : "审批情况",
			dataIndex : "applyforStateName"
		} ]
	};
	PurchasePlanListView.superclass.constructor.call(this, Ext.apply({
		id : "PurchasePlanListView",
		title : "采购计划",
		iconCls : "menu-business-purchase",
		url : __ctxPath + "/dispatch/listPurchasePlan.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PurchasePlanListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-accept",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptPurchase
		});
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approvePurchase
		});
	},
	rendererRowActionItems : function(action, record) {
//		switch (record.data.applyforState) {
//			case "2":
//				if (isGranted("_PurchaseAccept")) {
//					action[1].hidden = false;
//				}
//				break;
//			case "3":
//				if (isGranted("_PurchaseApprove")) {
//					action[2].hidden = false;
//				}
//				break;
//		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_PurchaseAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addPurchase.createDelegate(this)
			});
		}
		if (isGranted("_PurchaseEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editPurchase.createDelegate(this)
			});
		}
		if (isGranted("_PurchaseMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitPurchase.createDelegate(this)
			});
		}
		if (isGranted("_PurchasePlanMultiFill")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "填报",
				handler : this.fillPurchase.createDelegate(this)
			});
		}
		if (isGranted("_PurchaseMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPurchase.createDelegate(this)
			});
		}
		if (isGranted("_PurchaseOnekeyApprove")) {
			tbarItems.push({
				iconCls : "btn-approve",
				text : "一键审批",
				handler : this.onekeyApprovePurchase.createDelegate(this)
			});
		}

		tbarItems.push("->");
		if (isGranted("_PurchasePlanPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "物资采购单申请表",
				handler : this.printPurchasePlan.createDelegate(this)
			});
		}
		if (isGranted("_PurchaseExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportPurchase.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的采购！";
		var msg2 = "您确认要【" + op + "】所选的采购吗？";
		var msg3 = "成功【" + op + "】所选的采购！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptPurchase : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审核】的采购信息必须是【待审核】的状态！");
			return;
		}
		new PurchasePlanForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approvePurchase : function(a) {
		if ("3" != a.applyforState) {
			$toast("【审批】的采购信息必须是【待审批】的状态！");
			return;
		}
		new PurchasePlanForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadPurchasePlan : function(a) {
		new PurchasePlanForm(a, {
			selectable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	onekeyApprovePurchase : function() {
		this.speciallyGridAction(this.dataGridPanel, "purchasePlanId", __ctxPath + "/dispatch/onekeyApprovePurchasePlan.do", "一键审批", function(a) {
			if ("3" != a.applyforState) {
				$toast("【一键审批】的采购信息必须是【待审批】的信息！");
				return false;
			}
			return true;
		}.createDelegate(this));
	},
	addPurchase : function() {
		new PurchasePlanForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editPurchase : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if ("0" != a[0].data.applyforState) {
			$toast("【修改】的采购信息必须是【待提交】的采购！");
			return;
		}
		new PurchasePlanForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitPurchase : function() {
		this.speciallyGridAction(this.dataGridPanel, "purchasePlanId", __ctxPath + "/dispatch/multiSubmitPurchasePlan.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的采购信息必须是【待提交】的采购！");
			return false;
		}.createDelegate(this));
	},
	fillPurchase : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【填报】的记录！");
			return;
		}
		if ("1" != a[0].data.applyforState) {
			$toast("【填报】的采购信息必须是【未填报】的采购！");
			return;
		}
		new PurchasePlanForm(a[0].data, {
			selectable : true,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delPurchase : function() {
		this.speciallyGridAction(this.dataGridPanel, "purchasePlanId", __ctxPath + "/dispatch/multiDelPurchasePlan.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的采购信息必须是【待提交】的采购！");
			return false;
		}.createDelegate(this));
	},
	exportPurchase : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportPurchasePlan.do", this.dataGridPanel);
	},
	printPurchasePlan : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的申请信息！");
			return;
		}
		var url = __ctxPath + "/dispatch/printPurchasePlan.do?purchasePlanId=" + a[0].data["purchasePlanId"];
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	},
	amountPayment : function(data){
        var mount = {
            relateId : data.purchaseId,
            relateSerial : data.purchaseSerial,
            relateTheme : data.purchaseTheme,
            relateModule : RelationModule.purchase.relateModule,
            relateModuleName : RelationModule.purchase.relateModuleName,
            receiveId : data.supplierId,
            receiveModule : RelationModule.supplier.relateModule,
            receiveName : data.supplierName,
            relationData : data
        };
        if (mount && mount.relateId && mount.relateModule) {
            mount.relation = {};
            Ext.apply(mount.relation, {
                relateId : mount.relateId,
                relateTheme : mount.relateTheme,
                relateModule : mount.relateModule,
                relateModuleName : mount.relateModuleName,
                projectName : mount.projectName
            });
        }
        new AmountPaymentForm(mount, {
            saveable : true,
            auto:true,
            paymentPlanDisabled : true,
            callback : function() {
                this.dataGridPanel.getStore().reload();
            }.createDelegate(this)
        }).show();
    }
});