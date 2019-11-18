var PurchaseListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	if (!this.searchDisenable) {
		var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "PURCHASE_APPLYFOR_STATE", {
			width : 80,
			lable : "状态",
			allowBlank : true
		});
		generalItems = [ applyforStatusCombo, {
			lable : "采购编号",
			name : "Q_purchaseSerial_S_LK"
		}, {
			lable : "采购人员",
			name : "Q_purchaserName_S_LK"
		}, {
			lable : "采购日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_purchaseDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_purchaseDate_S_LE"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadPurchase
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
			sortField : "purchaseId",
			sortDir : "desc",
			id : "purchaseId",
			fields : PurchaseListViewField
		},
		rowAction : {
			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [ {
			width : 50,
			header : "款项",
			dataIndex : "fundStatusName"
		}, {
			header : "采购单号",
			dataIndex : "purchaseSerial",
			renderer : function(a, b, c) {
				return a;
			}

//			renderer : function(a, b, c) {
//				return a.substring(0,8)+a.substring(10,14);
//			}

		}, {
			header : "采购主题",
			dataIndex : "purchaseThemeName"
		}, {
			header : "供应商",
			dataIndex : "supplierName"
		}, {
			header : "采购人",
			dataIndex : "purchaserName"
		}, {
			header : "采购时间",
			dataIndex : "purchaseDate"
		}, {
			header : "关联业务",
			dataIndex : "relateModuleName"
		}, {
			header : "采购金额",
			dataIndex : "purchaseAmount",
			renderer : function(a, b, c) {
				return Ext.util.Format.number(a, "0.00");
			}
		}, {
			header : "应付金额",
			dataIndex : "paymentAmount",
			renderer : function(a, b, c) {
				return Ext.util.Format.number((c.data.purchaseAmount - a), "0.00");
			}
		}, {
			header : "已付金额",
			dataIndex : "paymentAmount",
			renderer : function(a, b, c) {
				return Ext.util.Format.number(a, "0.00");
			}
		}, {
			header : "业务编号",
			dataIndex : "relateSerial"
		}, {
			width : 40,
			header : "审批情况",
			dataIndex : "applyforStateName"
		}, {
			header : "填报时间",
			dataIndex : "providedDate"
		} ]
	};
	PurchaseListView.superclass.constructor.call(this, Ext.apply({
		id : "PurchaseListView",
		title : TabTitle.PURCHASE_LIST,
		iconCls : "menu-business-purchase",
		url : __ctxPath + "/dispatch/listPurchase.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(PurchaseListView, Knight.ux.SearchGridPanel, {
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
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_PurchaseAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_PurchaseApprove")) {
					action[2].hidden = false;
				}
				break;
		}
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
		if (isGranted("_PurchaseMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delPurchase.createDelegate(this)
			});
		}
		if (isGranted("_PurchaseAuto")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "生成付款单",
				handler : this.autoPurchase.createDelegate(this)
			});
		}
		if (isGranted("_PurchaseAcceptance")) {
			tbarItems.push({
				xtype : "tbsplit",
				text : "验收",
				tooltip : {
					text : "采购验收方式选择",
					title : "验收管理"
				},
				iconCls : "btn-task",
				menu : {
					items : [ {
						iconCls : "btn-play",
						text : "合格",
						handler : this.acceptancePurchase.createDelegate(this, [ "multiQualified" ])
					}, '-', {
						iconCls : "btn-stop",
						text : "不合格",
						menu : {
							items : [ {
								iconCls : "btn-stop",
								text : "换货",
								handler : this.acceptancePurchase.createDelegate(this, [ "multiExchange" ])
							}, {
								iconCls : "btn-stop",
								text : "退货退款",
								handler : this.acceptancePurchase.createDelegate(this, [ "multiReturned" ])
							}, {
								iconCls : "btn-stop",
								text : "其他",
								handler : this.acceptancePurchase.createDelegate(this, [ "multiUnqualified" ])
							} ]
						}
					} ]
				}
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
		if (isGranted("_PurchasePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "采购单打印",
				handler : this.printPurchase.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_PurchaseReceivePrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "验收单打印",
				handler : this.printReceivePurchase.createDelegate(this)
			});
		}
//		tbarItems.push("->");
//		if (isGranted("_PurchaseApplyPrint")) {
//			tbarItems.push({
//				iconCls : "btn-head-print",
//				text : "采购申请表打印",
//				handler : this.printApplyPurchase.createDelegate(this)
//			});
//		}
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
		if ("1" != a.applyforState) {
			$toast("【审核】的采购信息必须是【待审核】的状态！");
			return;
		}
		new PurchaseForm(a, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approvePurchase : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的采购信息必须是【待审批】的状态！");
			return;
		}
		new PurchaseForm(a, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	loadPurchase : function(a) {
		new PurchaseForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addPurchase : function() {
		new PurchaseForm(null, {
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
		new PurchaseForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitPurchase : function() {
		this.speciallyGridAction(this.dataGridPanel, "purchaseId", __ctxPath + "/dispatch/multiSubmitPurchase.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的采购信息必须是【待提交】的采购！");
			return false;
		}.createDelegate(this));
	},
	delPurchase : function() {
		this.speciallyGridAction(this.dataGridPanel, "purchaseId", __ctxPath + "/dispatch/multiDelPurchase.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的采购信息必须是【待提交】的采购！");
			return false;
		}.createDelegate(this));
	},
	fillInPurchaseAcceptance : function(data, method) {
		switch (method) {
			case "multiReturned":
				data.acceptanceStatus = "2";
				data.handleMethod = "5";
				data.acceptanceStatusName = "不合格";
				data.handleMethodName = "退货退款";
				data.refundPlanDate = new Date();
				break;
			case "multiExchange":
				data.acceptanceStatus = "2";
				data.handleMethod = "4";
				data.acceptanceStatusName = "不合格";
				data.handleMethodName = "换货";
				data.arrivalPlanDate = new Date();
				break;
			case "multiQualified":
				data.acceptanceStatus = "1";
				data.acceptanceStatusName = "合格";
				break;
			case "multiUnqualified":
				data.acceptanceStatus = "2";
				data.handleMethod = "7";
				data.acceptanceStatusName = "不合格";
				data.handleMethodName = "其他";
				break;
		}
		data.accMethod = method;
		new PurchaseAcceptanceForm(data, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	acceptancePurchase : function(method) {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【验收】的记录！");
			return;
		}
		if (Number(a[0].data.applyforState) < 3 || Number(a[0].data.applyforState) == 6) {
			$toast("【验收】的采购信息必须是审批【完成】的但未完成验收！");
			return;
		}
		var data = a[0].data;
		this.fillInPurchaseAcceptance(data, method);
	},
	printPurchase : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的申请信息！");
			return;
		}
		var url = __ctxPath + "/dispatch/printFormPurchase.do?purchaseId=" + a[0].data["purchaseId"];
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	},
	
	printReceivePurchase : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的申请信息！");
			return;
		}
		var url = __ctxPath + "/dispatch/printReceiveFormPurchase.do?purchaseId=" + a[0].data["purchaseId"];
		window.open(url, "附件详细信息", "height=600,width=600,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	},
//	printApplyPurchase : function() {
//		var a = this.dataGridPanel.getSelectionModel().getSelections();
//		if (a.length == 0) {
//			$toast("请选择要打印的申请信息！");
//			return;
//		}
//		var url = __ctxPath + "/dispatch/printApplyFormPurchase.do?purchaseId=" + a[0].data["purchaseId"];
//		window.open(url, "附件详细信息", "height=800,width=800,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
//	},
	exportPurchase : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportPurchase.do", this.dataGridPanel);
	},
	autoPurchase : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if(a.length>1){
			$toast("请最多选择一个进行生成付款单！");
			return ;
		}
		for(var c = 0;c<length;c++){
			$request({
				url : __ctxPath + "/dispatch/loadPurchase.do",
				params : {
					purchaseId : a[c].data.purchaseId
				},
				success : function(g, h) {
					var resp = Ext.util.JSON.decode(g.responseText);
					var data = resp.data[0];
					var mount = {
							relateId : data.purchaseId,
							relateSerial : data.purchaseSerial,
							relateTheme : data.purchaseSerial,
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
				}.createDelegate(this)
			});}
	},
	onekeyApprovePurchase : function() {
		this.speciallyGridAction(this.dataGridPanel, "purchaseId", __ctxPath + "/dispatch/onekeyApprovePurchase.do", "一键审批", function(a) {
			if ("6" == a.applyforState) {
				$toast("【一键审批】的采购信息必须是【未完成】的信息！");
				return false;
			}
			return true;
		}.createDelegate(this));
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