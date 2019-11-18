var AppNavigationView = function() {
	this.items = [];
	this.items.push(this.initForwardItems({
		img : "bg3-2",
		width : 1200,
		height : 5,
		x : 5,
		y : 225
	}));
	this.items.push(this.initForwardItems({
		img : "bg3-2",
		width : 1200,
		height : 5,
		x : 5,
		y : 370
	}));
	this.items.push(this.initForwardItems({
		img : "bg3-2",
		width : 1200,
		height : 5,
		x : 5,
		y : 520
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-2",
		x : 506,
		y : 50
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-2",
		x : 706,
		y : 50
	}));
	// ===============================================经营分析(4)==============================================//
	this.items.push(this.initForwardItems({
		img : "analyse/btn-1",
		x : 5,
		y : 550
	}));
	this.items.push(this.initForwardItems({
		img : "bg1-1",
		x : 140,
		y : 550
	}));
	this.items.push(this.initNavigationItems({
		img1 : "analyse/btn-2",
		img2 : "analyse/btn-2_1",
		x : 150,
		y : 550,
		buttonsgroup : [ [ {
			disabled : !isGranted("_FinancialSummaryQuery"),
			text : "总表",
			handler : this.activateCenter.createDelegate(this, [ "FinancialSummary" ])
		}, {
			disabled : !isGranted("_CashFlowStatementQuery"),
			text : "现金流",
			handler : this.activateCenter.createDelegate(this, [ "CashFlowStatement" ])
		}, {
			disabled : !isGranted("_IncomeExpenseQuery"),
			text : "收支",
			handler : this.activateCenter.createDelegate(this, [ "IncomeExpenseListView" ])
		} ], [ {
			disabled : !isGranted("_AccountDueQuery"),
			text : "应收款",
			handler : this.activateCenter.createDelegate(this, [ "AccountDue" ])
		}, {
			disabled : !isGranted("_AccountPayableQuery"),
			text : "应付款",
			handler : this.activateCenter.createDelegate(this, [ "AccountPayable" ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 310,
		y : 580
	}));
	this.items.push(this.initNavigationItems({
		img1 : "analyse/btn-3",
		img2 : "analyse/btn-3_1",
		x : 350,
		y : 550,
		buttonsgroup : [ [ {
			disabled : !isGranted("_EquipMarginQuery"),
			text : "毛利率",
			handler : this.activateCenter.createDelegate(this, [ "EquipMargin" ])
		}, {
			disabled : !isGranted("_EquipVacancyRateQuery"),
			text : "闲置率",
			handler : this.activateCenter.createDelegate(this, [ "EquipVacancyRate" ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 510,
		y : 580
	}));
	this.items.push(this.initNavigationItems({
		img1 : "analyse/btn-4",
		img2 : "analyse/btn-4_1",
		x : 550,
		y : 550,
		buttonsgroup : [ [ {
			disabled : !isGranted("_CustomerMarginQuery"),
			text : "毛利率",
			handler : this.activateCenter.createDelegate(this, [ "CustomerMargin" ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 710,
		y : 580
	}));
	this.items.push(this.initNavigationItems({
		img1 : "analyse/btn-5",
		img2 : "analyse/btn-5_1",
		x : 750,
		y : 550,

		buttonsgroup : [ [ {
			disabled : !isGranted("_PractiVacancyRateQuery"),
			text : "闲置率",
			handler : this.activateCenter.createDelegate(this, [ "PractiVacancyRate" ])
		} ] ]
	}));
	// ===============================================资产管理(3)==============================================//
	this.items.push(this.initForwardItems({
		img : "assets/btn-1",
		x : 5,
		y : 400
	}));
	this.items.push(this.initForwardItems({
		img : "bg1-1",
		x : 140,
		y : 400
	}));
	this.items.push(this.initNavigationItems({
		img1 : "assets/btn-2",
		img2 : "assets/btn-2_1",
		x : 125,
		y : 400,
		buttonsgroup : [ [ {
			disabled : !isGranted("_PickupAdd"),
			text : "新增",
			handler : this.fireBusinessEvent.createDelegate(this, [ "PickupListView", ListViewButtonsId.pickupAdd ])
		}, {
			disabled : !isGranted("_PickupAccept"),
			text : "审核",
			handler : this.activateCenter.createDelegate(this, [ "PickupListView", {
				params : {
					"Q_applyforState_S_EQ" : "1"
				}
			} ])
		}, {
			disabled : !isGranted("_PickupApprove"),
			text : "审批",
			handler : this.activateCenter.createDelegate(this, [ "PickupListView", {
				params : {
					"Q_applyforState_S_EQ" : "2"
				}
			} ])
		}, {
			disabled : !isGranted("_PickupReturn"),
			text : "归还",
			handler : this.activateCenter.createDelegate(this, [ "PickupListView", {
				params : {
					"Q_applyforState_S_EQ" : "3",
					"Q_pickupStatus_S_GT" : "0",
					"Q_pickupStatus_S_LT" : "3"
				}
			} ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 310,
		y : 430
	}));
	this.items.push(this.initNavigationItems({
		img1 : "assets/btn-3",
		img2 : "assets/btn-3_1",
		x : 320,
		y : 400,
		buttonsgroup : [ [ {
			disabled : !isGranted("_PurchaseAdd"),
			text : "新增",
			handler : this.fireBusinessEvent.createDelegate(this, [ "PurchaseListView", ListViewButtonsId.purchaseAdd ])
		}, {
			disabled : !isGranted("_PurchaseAccept"),
			text : "审核",
			handler : this.activateCenter.createDelegate(this, [ "PurchaseListView", {
				params : {
					"Q_applyforState_S_EQ" : "1"
				}
			} ])
		}, {
			disabled : !isGranted("_PurchaseApprove"),
			text : "审批",
			handler : this.activateCenter.createDelegate(this, [ "PurchaseListView", {
				params : {
					"Q_applyforState_S_EQ" : "2"
				}
			} ])
		}, {
			disabled : !isGranted("_PurchaseAcceptance"),
			width : 64,
			text : "验收",
			menu : {
				items : [ {
					iconCls : "btn-play",
					text : "验收合格",
					handler : this.acceptancePurchase.createDelegate(this, [ "multiQualified" ])
				}, '-', {
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
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 510,
		y : 430
	}));
	this.items.push(this.initNavigationItems({
		img1 : "assets/btn-4",
		img2 : "assets/btn-4_1",
		x : 550,
		y : 400,
		buttonsgroup : [ [ {
			disabled : !isGranted("_BorrowAdd"),
			text : "新增",
			menu : {
				items : [ {
					iconCls : "btn-signIn",
					text : "借进",
					handler : this.fireBusinessEvent.createDelegate(this, [ "BorrowListView", ListViewButtonsId.borrowAdd1 ])
				}, {
					iconCls : "btn-signOff",
					text : "借出",
					handler : this.fireBusinessEvent.createDelegate(this, [ "BorrowListView", ListViewButtonsId.borrowAdd2 ])
				} ]
			}
		}, {
			disabled : !isGranted("_BorrowAccept"),
			text : "审核",
			handler : this.activateCenter.createDelegate(this, [ "BorrowListView", {
				params : {
					"Q_applyforState_S_EQ" : "1"
				}
			} ])
		}, {
			disabled : !isGranted("_BorrowApprove"),
			text : "审批",
			handler : this.activateCenter.createDelegate(this, [ "BorrowListView", {
				params : {
					"Q_applyforState_S_EQ" : "2"
				}
			} ])
		} ], [ {
			xtype : "tbsplit",
			disabled : !isGranted("_BorrowRenewSubmit"),
			width : 64,
			text : "续借",
			menu : {
				items : [ {
					text : "选择续借日期",
					iconCls : "calendar",
					menu : {
						xtype : "kudatemenu",
						pickerConfig : {
							minDate : new Date()
						},
						handler : this.applyforRenewBorrow.createDelegate(this)
					}
				} ]
			}
		}, {
			disabled : !isGranted("_BorrowAcceptance"),
			width : 64,
			text : "归还",
			menu : {
				items : [ {
					iconCls : "btn-play",
					text : "合格归还",
					handler : this.acceptanceBorrow.createDelegate(this, [ "returned" ])
				}, '-', {
					iconCls : "btn-stop",
					text : "报损维修",
					handler : this.acceptanceBorrow.createDelegate(this, [ "damage" ])
				}, {
					iconCls : "btn-stop",
					text : "遗失/重新购买",
					handler : this.acceptanceBorrow.createDelegate(this, [ "lose" ])
				} ]
			}
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 710,
		y : 430
	}));
	this.items.push(this.initNavigationItems({
		img1 : "assets/btn-5",
		img2 : "assets/btn-5_1",
		x : 750,
		y : 400,
		buttonsgroup : [ [ {
			disabled : !isGranted("_InventoryQuery"),
			text : "盘点",
			handler : this.activateCenter.createDelegate(this, [ "InventoryListView" ])
		} ] ]
	}));
	// ===============================================款项管理(2)==============================================//
	this.items.push(this.initForwardItems({
		img : "fund/btn-1",
		x : 5,
		y : 250
	}));
	this.items.push(this.initForwardItems({
		img : "bg1-1",
		x : 140,
		y : 250
	}));
	this.items.push(this.initNavigationItems({
		img1 : "fund/btn-2",
		img2 : "fund/btn-2_1",
		x : 150,
		y : 250,
		buttonsgroup : [ [ {
			disabled : !isGranted("_InvoiceIssueAdd"),
			text : "开票",
			handler : this.fireBusinessEvent.createDelegate(this, [ "InvoiceIssueListView", ListViewButtonsId.invoiceIssueAdd ])
		}, {
			disabled : !isGranted("_AmountReceiveAdd"),
			text : "合同",
			handler : this.fireBusinessEvent.createDelegate(this, [ "AmountReceiveListView", ListViewButtonsId.amountReceiveAdd1 ])
		}, {
			disabled : !isGranted("_AmountReceiveAdd"),
			text : "借用",
			handler : this.fireBusinessEvent.createDelegate(this, [ "AmountReceiveListView", ListViewButtonsId.amountReceiveAdd2 ])
		} ], [ {
			disabled : !isGranted("_AmountReceiveAdd"),
			text : "采购",
			handler : this.fireBusinessEvent.createDelegate(this, [ "AmountReceiveListView", ListViewButtonsId.amountReceiveAdd3 ])
		}, {
			disabled : !isGranted("_AmountReceiveAdd"),
			text : "其他",
			handler : this.fireBusinessEvent.createDelegate(this, [ "AmountReceiveListView", ListViewButtonsId.amountReceiveAdd4 ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 290,
		y : 280
	}));
	this.items.push(this.initNavigationItems({
		img1 : "fund/btn-3",
		img2 : "fund/btn-3_1",
		x : 320,
		y : 250,
		buttonsgroup : [ [ {
			disabled : !isGranted("_InvoiceCollectAdd"),
			text : "收票",
			handler : this.fireBusinessEvent.createDelegate(this, [ "InvoiceCollectListView", ListViewButtonsId.invoiceCollectAdd ])
		}, {
			disabled : !isGranted("_AmountPaymentAdd"),
			text : "按揭",
			handler : this.fireBusinessEvent.createDelegate(this, [ "AmountPaymentListView", ListViewButtonsId.amountPaymentAdd1 ])
		}, {
			disabled : !isGranted("_AmountPaymentAdd"),
			text : "合同",
			handler : this.fireBusinessEvent.createDelegate(this, [ "AmountPaymentListView", ListViewButtonsId.amountPaymentAdd2 ])
		} ], [ {
			disabled : !isGranted("_AmountPaymentAdd"),
			text : "借用",
			handler : this.fireBusinessEvent.createDelegate(this, [ "AmountPaymentListView", ListViewButtonsId.amountPaymentAdd3 ])
		}, {
			disabled : !isGranted("_AmountPaymentAdd"),
			text : "采购",
			handler : this.fireBusinessEvent.createDelegate(this, [ "AmountPaymentListView", ListViewButtonsId.amountPaymentAdd4 ])
		}, {
			disabled : !isGranted("_AmountPaymentAdd"),
			text : "检测",
			handler : this.fireBusinessEvent.createDelegate(this, [ "AmountPaymentListView", ListViewButtonsId.amountPaymentAdd5 ])
		} ], [ {
			disabled : !isGranted("_AmountPaymentAdd"),
			text : "保险",
			handler : this.fireBusinessEvent.createDelegate(this, [ "AmountPaymentListView", ListViewButtonsId.amountPaymentAdd6 ])
		}, {
			disabled : !isGranted("_AmountPaymentAdd"),
			text : "其他",
			handler : this.fireBusinessEvent.createDelegate(this, [ "AmountPaymentListView", ListViewButtonsId.amountPaymentAdd7 ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 460,
		y : 280
	}));
	this.items.push(this.initNavigationItems({
		img1 : "fund/btn-4",
		img2 : "fund/btn-4_1",
		x : 490,
		y : 250,
		buttonsgroup : [ [ {
			disabled : !isGranted("_MoneyLendAdd"),
			text : "借款",
			handler : this.fireBusinessEvent.createDelegate(this, [ "MoneyLendListView", ListViewButtonsId.moneyLendAdd ])
		}, {
			disabled : !isGranted("_MoneyBackAdd"),
			text : "还款",
			handler : this.fireBusinessEvent.createDelegate(this, [ "MoneyBackListView", ListViewButtonsId.moneyBackAdd ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 630,
		y : 280
	}));
	this.items.push(this.initNavigationItems({
		img1 : "fund/btn-5",
		img2 : "fund/btn-5_1",
		x : 660,
		y : 250,
		buttonsgroup : [ [ {
			disabled : !isGranted("_DeductAdd"),
			text : "新增",
			handler : this.fireBusinessEvent.createDelegate(this, [ "DeductListView", ListViewButtonsId.deductAdd ])
		}, {
			disabled : !isGranted("_DeductAccept"),
			text : "审核",
			handler : this.activateCenter.createDelegate(this, [ "DeductListView", {
				params : {
					"Q_applyforState_S_EQ" : "1"
				}
			} ])
		}, {
			disabled : !isGranted("_DeductApprove"),
			text : "审批",
			handler : this.activateCenter.createDelegate(this, [ "DeductListView", {
				params : {
					"Q_applyforState_S_EQ" : "2"
				}
			} ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 800,
		y : 280
	}));
	this.items.push(this.initNavigationItems({
		img1 : "fund/btn-6",
		img2 : "fund/btn-6_1",
		x : 830,
		y : 250,
		buttonsgroup : [ [ {
			disabled : !isGranted("_SalaryAdd"),
			text : "新增",
			handler : this.fireBusinessEvent.createDelegate(this, [ "SalaryListView", ListViewButtonsId.salaryAdd ])
		}, {
			disabled : !isGranted("_SalaryAccept"),
			text : "审核",
			handler : this.activateCenter.createDelegate(this, [ "SalaryListView", {
				params : {
					"Q_applyforState_S_EQ" : "1"
				}
			} ])
		}, {
			disabled : !isGranted("_SalaryApprove"),
			text : "审批",
			handler : this.activateCenter.createDelegate(this, [ "SalaryListView", {
				params : {
					"Q_applyforState_S_EQ" : "2"
				}
			} ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 970,
		y : 280
	}));
	this.items.push(this.initNavigationItems({
		img1 : "fund/btn-7",
		img2 : "fund/btn-7_1",
		x : 1000,
		y : 250,
		buttonsgroup : [ [ {
			disabled : !isGranted("_ReimburseAdd"),
			text : "新增",
			handler : this.fireBusinessEvent.createDelegate(this, [ "ReimburseListView", ListViewButtonsId.reimburseAdd ])
		}, {
			disabled : !isGranted("_ReimburseAccept"),
			text : "审核",
			handler : this.activateCenter.createDelegate(this, [ "ReimburseListView", {
				params : {
					"Q_applyforState_S_EQ" : "1"
				}
			} ])
		}, {
			disabled : !isGranted("_ReimburseApprove"),
			text : "审批",
			handler : this.activateCenter.createDelegate(this, [ "ReimburseListView", {
				params : {
					"Q_applyforState_S_EQ" : "2"
				}
			} ])
		} ] ]
	}));
	// ===============================================业务管理(1)-2==============================================//
	this.items.push(this.initNavigationItems({
		img1 : "business/btn-4",
		img2 : "business/btn-4_1",
		x : 430,
		y : 110,
		buttonsgroup : [ [ {
			disabled : !isGranted("_DispatchAdd"),
			text : "合同",
			handler : this.fireBusinessEvent.createDelegate(this, [ "DispatchListView", ListViewButtonsId.dispatchAdd1 ])
		}, {
			disabled : !isGranted("_DispatchAdd"),
			text : "安装",
			handler : this.fireBusinessEvent.createDelegate(this, [ "DispatchListView", ListViewButtonsId.dispatchAdd2 ])
		}, {
			disabled : !isGranted("_DispatchAdd"),
			text : "使用",
			handler : this.fireBusinessEvent.createDelegate(this, [ "DispatchListView", ListViewButtonsId.dispatchAdd3 ])
		}, {
			disabled : !isGranted("_DispatchAdd"),
			text : "拆卸",
			handler : this.fireBusinessEvent.createDelegate(this, [ "DispatchListView", ListViewButtonsId.dispatchAdd4 ])
		} ] ]
	}));
	this.items.push(this.initNavigationItems({
		img1 : "business/btn-6",
		img2 : "business/btn-6_1",
		x : 650,
		y : 110,
		buttonsgroup : [ [ {
			disabled : !isGranted("_EquipDetectAdd"),
			text : "安装",
			handler : this.fireBusinessEvent.createDelegate(this, [ "EquipDetectListView", ListViewButtonsId.equipDetectAdd1 ])
		}, {
			disabled : !isGranted("_EquipDetectAdd"),
			text : "使用",
			handler : this.fireBusinessEvent.createDelegate(this, [ "EquipDetectListView", ListViewButtonsId.equipDetectAdd2 ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 810,
		y : 145
	}));
	this.items.push(this.initNavigationItems({
		img1 : "business/btn-7",
		img2 : "business/btn-7_1",
		x : 850,
		y : 110,
		buttonsgroup : [ [ {
			disabled : !isGranted("_EquipVerifyAdd"),
			text : "安装",
			handler : this.fireBusinessEvent.createDelegate(this, [ "EquipVerifyListView", ListViewButtonsId.equipVerifyAdd1 ])
		}, {
			disabled : !isGranted("_EquipVerifyAdd"),
			text : "使用",
			handler : this.fireBusinessEvent.createDelegate(this, [ "EquipVerifyListView", ListViewButtonsId.equipVerifyAdd2 ])
		} ] ]
	}));
	// ===============================================业务管理(1)-1==============================================//
	this.items.push(this.initForwardItems({
		img : "business/btn-1",
		x : 5,
		y : 10
	}));
	this.items.push(this.initForwardItems({
		img : "bg1-1",
		x : 140,
		y : 10
	}));
	this.items.push(this.initNavigationItems({
		img1 : "business/btn-2",
		img2 : "business/btn-2_1",
		x : 150,
		y : 10,
		buttonsgroup : [ [ {
			disabled : !isGranted("_EquipmentAdd"),
			text : "设备",
			handler : this.fireBusinessEvent.createDelegate(this, [ "EquipmentListView", ListViewButtonsId.equipmentAdd ])
		}, {
			disabled : !isGranted("_ProjectAdd"),
			text : "项目",
			handler : this.fireBusinessEvent.createDelegate(this, [ "ProjectListView", ListViewButtonsId.projectAdd ])
		}, {
			disabled : !isGranted("_SupplierAdd"),
			text : "供应商",
			handler : this.fireBusinessEvent.createDelegate(this, [ "SupplierListView", ListViewButtonsId.supplierAdd ])
		} ], [ {
			disabled : !isGranted("_CustomerAdd"),
			text : "客户",
			handler : this.fireBusinessEvent.createDelegate(this, [ "CustomerListView", ListViewButtonsId.customerAdd ])
		}, {
			disabled : !isGranted("_ComponentAdd"),
			text : "零配件",
			handler : this.fireBusinessEvent.createDelegate(this, [ "ComponentListView", ListViewButtonsId.componentAdd ])
		}, {
			disabled : !isGranted("_PractitionerAdd"),
			text : "员工",
			handler : this.fireBusinessEvent.createDelegate(this, [ "PractitionerListView", ListViewButtonsId.practitionerAdd ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 310,
		y : 45
	}));
	this.items.push(this.initNavigationItems({
		img1 : "business/btn-3",
		img2 : "business/btn-3_1",
		x : 350,
		y : 10,
		buttonsgroup : [ [ {
			disabled : !isGranted("_ContractLeaseAdd"),
			text : "新增",
			handler : this.fireBusinessEvent.createDelegate(this, [ "ContractLeaseListView", ListViewButtonsId.contractLeaseAdd ])
		}, {
			disabled : !isGranted("_ContractLeaseAccept"),
			text : "受理",
			handler : this.activateCenter.createDelegate(this, [ "ContractLeaseListView", {
				params : {
					"Q_applyforState_S_EQ" : "1"
				}
			} ])
		}, {
			disabled : !isGranted("_ContractLeaseApprove"),
			text : "审批",
			handler : this.activateCenter.createDelegate(this, [ "ContractLeaseListView", {
				params : {
					"Q_applyforState_S_EQ" : "2"
				}
			} ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 510,
		y : 45
	}));
	this.items.push(this.initNavigationItems({
		img1 : "business/btn-5",
		img2 : "business/btn-5_1",
		x : 550,
		y : 10,
		buttonsgroup : [ [ {
			disabled : !isGranted("_EquipInstallAdd"),
			text : "新增",
			handler : this.fireBusinessEvent.createDelegate(this, [ "EquipInstallListView", ListViewButtonsId.equipInstallAdd ])
		}, {
			disabled : !isGranted("_EquipInstallApprove"),
			text : "审核",
			handler : this.activateCenter.createDelegate(this, [ "EquipInstallListView", {
				params : {
					"Q_applyforState_S_EQ" : "2"
				}
			} ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 710,
		y : 45
	}));
	this.items.push(this.initNavigationItems({
		img1 : "business/btn-8",
		img2 : "business/btn-8_1",
		x : 750,
		y : 10,
		buttonsgroup : [ [ {
			disabled : !isGranted("_EquipInspectAdd"),
			text : "巡检",
			handler : this.fireBusinessEvent.createDelegate(this, [ "EquipInspectListView", ListViewButtonsId.equipInspectAdd2 ])
		}, {
			disabled : !isGranted("_EquipMaintAdd"),
			text : "维保",
			handler : this.fireBusinessEvent.createDelegate(this, [ "EquipMaintListView", ListViewButtonsId.equipMaintAdd2 ])
		}, {
			disabled : !isGranted("_EquipEmployAdd"),
			text : "告知",
			handler : this.fireBusinessEvent.createDelegate(this, [ "EquipEmployListView", ListViewButtonsId.equipEmployAdd ])
		} ] ]
	}));
	this.items.push(this.initForwardItems({
		img : "bg2-1",
		x : 910,
		y : 45
	}));
	this.items.push(this.initNavigationItems({
		img1 : "business/btn-9",
		img2 : "business/btn-9_1",
		x : 950,
		y : 10,
		buttonsgroup : [ [ {
			disabled : !isGranted("_EquipDismantleAdd"),
			text : "新增",
			handler : this.fireBusinessEvent.createDelegate(this, [ "EquipDismantleListView", ListViewButtonsId.equipDismantleAdd2 ])
		}, {
			disabled : !isGranted("_EquipDismantleApprove"),
			text : "审核",
			handler : this.activateCenter.createDelegate(this, [ "EquipDismantleListView", {
				params : {
					"Q_applyforState_S_EQ" : "2"
				}
			} ])
		} ] ]
	}));
	AppNavigationView.superclass.constructor.call(this, {
		id : "AppNavigationView",
		// cls : "background_navigation",
		baseCls : "ex-panel",
		title : "流程导航",
		iconCls : "menu-idx-navigation",
		layout : "absolute"
	});
};
Ext.extend(AppNavigationView, Ext.Panel, {
	initForwardItems : function(cfg) {
		var html = "<img src='" + __ctxPath + "/img/navigation/" + cfg.img + ".png' />";
		if (cfg.width && cfg.height) {
			html = "<img src='" + __ctxPath + "/img/navigation/" + cfg.img + ".png' width=" + cfg.width + " height=" + cfg.height + "/>";
		}
		var navigation = new Ext.Panel(Ext.apply({
			baseCls : "ex-panel",
			disable : true,
			frame : false,
			border : false,
			layout : "fit",
			html : html
		}, cfg));
		return navigation;
	},
	initNavigationItems : function(cfg) {
		var deviationH = 0; // 高度偏差
		var deviationW = 0; // 宽度偏差
		var btnHboxItems = [];
		if (cfg.buttonsgroup && cfg.buttonsgroup.length > 0) {
			deviationH = cfg.buttonsgroup.length * 26 + 8;
			for ( var i = 0; i < cfg.buttonsgroup.length; i++) {
				var btnHbox = cfg.buttonsgroup[i];
				var bwidth = 0;
				for ( var j = 0; j < btnHbox.length; j++) {
					Ext.applyIf(btnHbox[j], {
						xtype : "button",
						width : 48,
						height : 25
					});
					bwidth += (btnHbox[j].width + 2);
				}
				deviationW = deviationW > bwidth ? deviationW : bwidth;
				btnHboxItems.push({
					baseCls : "ex-panel",
					layout : "hbox",
					layoutConfig : {
						pack : "center",
						align : "middle"
					},
					defaults : {
						margins : "1 1 0 0"
					},
					items : btnHbox
				});
			}
		}
		var btnPanel = new Ext.Panel({
			baseCls : "ex-panel",
			style : "padding:0px 0px 0px 0px;",
			height : deviationH,
			items : btnHboxItems
		});

		cfg.buttons = undefined;
		var baseHeight = 85;
		var baseWidth = deviationW > 153 ? deviationW : 153;
		var imgstyle = "padding:0px 0px 0px " + ((baseWidth - baseHeight) / 2) + "px;";
		var navigation = new Ext.Panel(Ext.apply({
			baseCls : "ex-panel",
			frame : false,
			border : false,
			layout : "column",
			height : baseHeight + deviationH,
			width : baseWidth,
			items : [ {
				baseCls : "ex-panel",
				xtype : "panel",
				style : imgstyle,
				html : "<img src='" + __ctxPath + "/img/navigation/" + cfg.img1 + ".png'/>"
			}, {
				hidden : true,
				baseCls : "ex-panel",
				xtype : "panel",
				items : [ {
					baseCls : "ex-panel",
					xtype : "panel",
					style : imgstyle,
					height : baseHeight,
					width : baseWidth,
					html : "<img src='" + __ctxPath + "/img/navigation/" + cfg.img2 + ".png'/>"
				}, btnPanel ]
			} ],
			listeners : {
				afterrender : this.initNavigationListener.createDelegate(this, navigation)
			}
		}, cfg));
		return navigation;
	},
	initNavigationListener : function(navigation) {
		navigation.el.on("mouseover", this.showBottomButton.createDelegate(this, [ navigation ]), this);
		navigation.el.on("mouseout", this.hideBottomButton.createDelegate(this, [ navigation ]), this);
	},
	showBottomButton : function(p) {
		p.items.itemAt(0).hide();
		p.items.itemAt(1).show();
	},
	hideBottomButton : function(p) {
		p.items.itemAt(0).show();
		p.items.itemAt(1).hide();
	},
	activateCenter : function(view, params) {
		var center = Ext.getCmp("centerTabPanel");
		var tabItem = center.getItem(view);
		if (tabItem == null) {
			var panel = eval("new " + view + "(params)");
			tabItem = center.add(panel);
			center.activate(tabItem);
		} else {
			center.activate(tabItem);
		}
	},
	activeMenuItem : function(item) {
		var panel = Ext.getCmp(item);
		if (panel) {
			panel.expand(true);
		}
	},
	fireBusinessEvent : function(listViewPanle, buttonId, params) {
		var center = Ext.getCmp("centerTabPanel");
		var tabItem = center.getItem(listViewPanle);
		if (tabItem == null) {
			var panel = eval("new " + listViewPanle + "(params)");
			tabItem = center.add(panel);
		}
		var button = Ext.getCmp(buttonId);
		button.handler.call(this);
	},
	acceptancePurchase : function(method) {
		var params = {
			Q_applyforState_S_GE : "3",
			Q_applyforState_S_LE : "5",
		};
		new PurchaseSelector({
			single : true,
			params : params,
			callback : function(d) {
				var data = d[0].data;
				var center = Ext.getCmp("centerTabPanel");
				var tabItem = center.getItem("PurchaseListView");
				if (tabItem == null) {
					var panel = eval("new PurchaseListView(params)");
					tabItem = center.add(panel);
				}
				tabItem.fillInPurchaseAcceptance(data, method);
			}.createDelegate(this)
		}).show();
	},
	acceptanceBorrow : function(method) {
		var params = {
			Q_applyforState_S_EQ : "3"
		};
		new BorrowSelector({
			single : true,
			params : params,
			callback : function(d) {
				var data = d[0].data;
				var center = Ext.getCmp("centerTabPanel");
				var tabItem = center.getItem("BorrowListView");
				if (tabItem == null) {
					var panel = eval("new BorrowListView(params)");
					tabItem = center.add(panel);
				}
				tabItem.fillInBorrowAcceptance(data, method);
			}.createDelegate(this)
		}).show();
	},
	applyforRenewBorrow : function(dp) {
		var date = dp.value;
		var renewDate = date.format("Y-m-d");
		var params = {
			Q_applyforState_S_EQ : "3",
			Q_returnDate_S_LT : renewDate
		};
		Ext.util.Format.round(amount, 2);
		Ext.util.Format.number(amount, "0.00")
		var selector = new BorrowSelector({
			single : true,
			params : params,
			callback : function(d) {
				var data = d[0].data;
				var center = Ext.getCmp("centerTabPanel");
				var tabItem = center.getItem("BorrowListView");
				if (tabItem == null) {
					var panel = eval("new BorrowListView(params)");
					tabItem = center.add(panel);
				}
				tabItem.submitRenewBorrow(data, date);
			}.createDelegate(this)
		});
		selector.setTitle("请选择续借日期至[" + renewDate + "]信息记录:");
		selector.show();
	}
});