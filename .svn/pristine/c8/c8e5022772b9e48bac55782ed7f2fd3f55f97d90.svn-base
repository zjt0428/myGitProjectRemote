var AmountPaymentListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if (!isGranted("_AmountPaymentQueryAll")) {
		this.params.Q_userId_L_EQ = curUserInfo.userId;
	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var applyforStatusCombo = $initComboBoxField("审批情况", "Q_applyforState_S_EQ", "APPLYFOR_STATE", {
		width : 80,
		lable : "审批情况",
		allowBlank : true
	});
	var relateModuleNameCombo = $initComboBoxField("关联业务", "Q_relateModule_S_LK", "RELATE_MODULE", {
		width : 80,
		lable : "关联业务",
		allowBlank : true
	});
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [ applyforStatusCombo,{
			lable : "付款单号",
			name : "Q_amountSerial_S_LK"
		}, {
			lable : "付款单位",
			name : "Q_paymentEntName_S_LK"
		}, {
			lable : "收款单位",
			name : "Q_receiveName_S_LK"
		}, {
			lable : "付款主题",
			name : "Q_amountTheme_S_LK"
		}, {
			lable : "关联项目",
			name : "Q_projectName_S_LK"
		}, relateModuleNameCombo, {
			lable : "付款日期",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_paymentDate_S_GE"
		}, {
			lable : "至",
			editable : false,
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_paymentDate_S_LE"
		},{
			lable : "填报人",
			name : "Q_userName_S_LK"
		} ];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.loadAmountPayment
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
			fields : AmountPaymentListViewField
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
			dataIndex : "paymentStatusName"
		}, {
			header : "付款单号",
			dataIndex : "amountSerial"
		}, {
			header : "付款主题",
			dataIndex : "amountTheme"
		}, {
			header : "业务主题",
			dataIndex : "relateTheme"
		}, {
			header : "收款方",
			dataIndex : "receiveName"
		}, {
			header : "当前应付金额",
			dataIndex : "payableDebit",
			renderer : function(a, b, c) {
				return Number(a) + Number(c.data.paymentAmount);
			}
		}, {
			header : "付款金额",
			dataIndex : "paymentAmount"
		}, {
			header : "余额",
			dataIndex : "payableDebit"
		}, {
			header : "付款日期",
			dataIndex : "paymentDate"
		}, {
			header : "经办人员",
			dataIndex : "practiName"
		}, {
			header : "关联业务",
			dataIndex : "relateModuleName"
		},
			{
				header : "关联项目",
				dataIndex : "projectName"
			},
//		{
//			header : "业务编号",
//			dataIndex : "relateSerial"
//		}, 
			{
				width : 40,
				header : "审批情况",
				dataIndex : "applyforStateName"
			}, {
				header : "填报时间",
				dataIndex : "providedDate"
			} ]
	};
	AmountPaymentListView.superclass.constructor.call(this, Ext.apply({
		id : "AmountPaymentListView",
		title : TabTitle.AMOUNT_PAYMENT_LIST,
		iconCls : "menu-business-payment",
		url : __ctxPath + "/fund/listAmountPayment.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(AmountPaymentListView, Knight.ux.SearchGridPanel, {
	initRowActionItems : function(actionItems) {
		actionItems.push({
			iconCls : "btn-accept",
			qtip : "审核",
			hidden : true,
			handler : this.acceptAmountPayment
		});
		actionItems.push({
			iconCls : "btn-approve",
			qtip : "审批",
			hidden : true,
			handler : this.approveAmountPayment
		});
	},
	rendererRowActionItems : function(action, record) {
		if (this.actionDisenable) {
			return;
		}
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_AmountPaymentAccept")) {
					action[1].hidden = false;
				}
				break;
			case "2":
				if (isGranted("_AmountPaymentApprove")) {
					action[2].hidden = false;
				}
				break;
		}
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AmountPaymentAdd")) {
			tbarItems.push({
				xtype : "tbsplit",
				iconCls : "btn-head-add",
				text : "新增",
				menu : {
					items : [ {
						text : "设备按揭",
						handler : this.addEquipPayment.createDelegate(this)
					}, {
						text : "合同结算",
						handler : this.addSettleContractPayment.createDelegate(this)
					}, {
						text : "代租结算",
						handler : this.addRentContractPayment.createDelegate(this)
					}, {
						text : "借用付款",
						iconCls : "calendar",
						handler : this.addBorrowPayment.createDelegate(this)
					}, {
						text : "采购付款",
						iconCls : "calendar",
						handler : this.addPurchasePayment.createDelegate(this)
					}, {
						text : "检测信息",
						iconCls : "calendar",
						handler : this.addEquipDetectPayment.createDelegate(this)
					}, {
						text : "保险信息",
						iconCls : "calendar",
						handler : this.addInsureEquipPayment.createDelegate(this)
					}, {
						text : "物流信息",
						iconCls : "calendar",
						handler : this.addLogisticsTransportPayment.createDelegate(this)
					}, {
						text : "回场物流",
						iconCls : "calendar",
						handler : this.addLogisticsBacksportPayment.createDelegate(this)
					}, {
						text : "班组结算",
						iconCls : "calendar",
						handler : this.addTeamsAccountPayment.createDelegate(this)
					}, {
						text : "汽车吊结算",
						iconCls : "calendar",
						handler : this.addDispatchPayment.createDelegate(this)
					}, {
						text : "施工作业结算",
						iconCls : "calendar",
						handler : this.addConstructOperation.createDelegate(this)
					}, {
						text : "汽吊结算",
						iconCls : "calendar",
						handler : this.addAutocrane.createDelegate(this)
					}, {
						text : "维修管理",
						iconCls : "calendar",
						handler : this.addEquipRepairPayment.createDelegate(this)
					}, {
						text : "领用管理",
						iconCls : "calendar",
						handler : this.addPickupPayment.createDelegate(this)
					}, {
						text : "其他",
						iconCls : "calendar",
						handler : this.addAmountPayment.createDelegate(this)
					} ]
				}
			}, {
				iconCls : "btn-head-edit",
				text : "复制",
				handler : this.editAmountPayment.createDelegate(this, [ true ])
			});
		}
		if (isGranted("_AmountPaymentEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAmountPayment.createDelegate(this, [ false ])
			});
		}
		if (isGranted("_AmountPaymentMultiSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitAmountPayment.createDelegate(this)
			});
		}
		if (isGranted("_AmountPaymentMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delAmountPayment.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_AmountPaymentPrint")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printAmountPayment.createDelegate(this)
			});
		}
		if (isGranted("_AmountPaymentExporter")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportAmountPayment.createDelegate(this)
			});
		}
		return tbarItems;
	},
	showAmountPaymentDetail : function(data, cfg) {

		if (data && data.relateId && data.relateModule) {
			data.relation = {};
			Ext.apply(data.relation, {
				relateId : data.relateId,
//				relateSerial : data.relateSerial,
				relateTheme : data.relateTheme,
				relateModule : data.relateModule,
				relateModuleName : data.relateModuleName,
				projectName : data.projectName
			});
		}
		new AmountPaymentForm(data, cfg).show();
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的付款！";
		var msg2 = "您确认要【" + op + "】所选的付款吗？";
		var msg3 = "成功【" + op + "】所选的付款！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	acceptAmountPayment : function(data) {
		if ("1" != data.applyforState) {
			$toast("【审核】的付款信息必须是【待审核】的状态！");
			return;
		}
		this.showAmountPaymentDetail(data, {
			acceptable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},
	approveAmountPayment : function(data) {
		if ("2" != data.applyforState) {
			$toast("【审批】的付款信息必须是【待审批】的状态！");
			return;
		}
		this.showAmountPaymentDetail(data, {
			approveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},

	loadAmountPayment : function(data) {
		this.showAmountPaymentDetail(data, null);
	},
	addEquipPayment : function() {
		new EquipSelector({
			single : true,
			params : {
				Q_mortgage_S_EQ : "1",
				Q_fundStatus_S_LT : "2"
			},
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.equipId,
					relateSerial : data.recordSerial,
					relateTheme : data.equipGenericName,
					relateModule : RelationModule.equipment.relateModule,
					relateModuleName : RelationModule.equipment.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addSettleContractPayment : function() {
		new SettleContractSelector({
			single : true,
			params : {
				Q_effective_S_EQ : "1"
			},
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.settleId,
					relateSerial : data.settleSerial,
					relateTheme : data.settleTheme,
					relateModule : RelationModule.settleContract.relateModule,
					relateModuleName : RelationModule.settleContract.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addRentContractPayment : function() {
		new RentContractSelector({
			single : true,
			params : {
				Q_effective_S_EQ : "1"
			},
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.rentId,
					relateSerial : data.rentSerial,
					relateTheme : data.rentTheme,
					relateModule : RelationModule.rentContract.relateModule,
					relateModuleName : RelationModule.rentContract.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addBorrowPayment : function() {
		new BorrowSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "3"
			},
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.borrowId,
					relateSerial : data.borrowSerial,
					relateTheme : data.borrowTheme,
					relateModule : RelationModule.borrow.relateModule,
					relateModuleName : RelationModule.borrow.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addPurchasePayment : function() {
		new PurchaseSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "3"
			},
			callback : function(d) {
				var data = d[0].data;
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
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addEquipDetectPayment : function() {
		new EquipDetectSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.detectId,
					relateSerial : data.detectSerial,
					relateTheme : data.detectSerial,
					relateModule : RelationModule.equipDetect.relateModule,
					relateModuleName : RelationModule.equipDetect.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addInsureEquipPayment : function() {
		new InsureEquipSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.insureId,
					relateSerial : data.insureSerial,
					relateTheme : data.recordSerial,
					relateModule : RelationModule.insureEquip.relateModule,
					relateModuleName : RelationModule.insureEquip.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addLogisticsTransportPayment : function() {
		new LogisticsTransportSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.transportId,
					relateSerial : data.transportSerial,
					relateTheme : data.transportTheme,
					relateModule : RelationModule.logisticsTransport.relateModule,
					relateModuleName : RelationModule.logisticsTransport.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					auto : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addLogisticsBacksportPayment : function() {
		new LogisticsBacksportSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.backsportId,
					relateSerial : data.backsportSerial,
					relateTheme : data.backsportTheme,
					relateModule : RelationModule.logisticsBacksport.relateModule,
					relateModuleName : RelationModule.logisticsBacksport.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addTeamsAccountPayment : function() {
		new TeamsAccountSelector({
			single : true,
			title : "班组结算",
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					receiveId : data.practiId,
					receiveModule : RelationModule.practitioner.relateModule,
					receiveName : data.practiName,
					relateId : data.teamsAccountId,
					relateSerial : data.teamsAccountSerial,
					relateTheme : data.teamsAccountSerial,
					relateModule : RelationModule.teamsAccount.relateModule,
					relateModuleName : RelationModule.teamsAccount.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addDispatchPayment : function() {
		new DispatchSelector({
			single : true,
			title : "汽车吊结算",
			params : {
				"Q_fundStatus_S_LE" : "1"
			},
			callback : function(d) {
				var data = d[0].data;
				var mount = {
					relateId : data.dispatchId,
					relateSerial : data.dispatchSerial,
					relateTheme : data.dispatchTheme,
					relateModule : RelationModule.dispatch.relateModule,
					relateModuleName : RelationModule.dispatch.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					paymentPlanDisabled : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addConstructOperation : function() {
		new ConstructOperationSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				if (Ext.isEmpty(data.project)) {
					data.project = {};
				}
				if (Ext.isEmpty(data.equipment)) {
					data.equipment = {};
				}
				data.projectId = data.project.projectId;
				data.projectSerial = data.project.projectSerial;
				data.projectName = data.project.projectName;
				data.address = data.project.address;
				var mount = {
					relateId : data.constructId,
					relateSerial : data.constructSerial,
					relateTheme : data.constructTheme,
					relateModule : RelationModule.constructOperation.relateModule,
					relateModuleName : RelationModule.constructOperation.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					paymentPlanDisabled : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addAutocrane : function() {
		new AutocraneSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				if (Ext.isEmpty(data.project)) {
					data.project = {};
				}
				data.projectId = data.project.projectId;
				data.projectSerial = data.project.projectSerial;
				data.projectName = data.project.projectName;
				data.address = data.project.address;
				var mount = {
					relateId : data.autocraneId,
					relateSerial : data.autocraneSerial,
					relateTheme : data.autocraneSerial,
					relateModule : RelationModule.autocrane.relateModule,
					relateModuleName : RelationModule.autocrane.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					paymentPlanDisabled : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},

	addEquipRepairPayment : function (){
		new EquipRepairSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				if (Ext.isEmpty(data.project)) {
					data.project = {};
				}
				data.projectId = data.project.projectId;
				data.projectSerial = data.project.projectSerial;
				data.projectName = data.project.projectName;
				data.address = data.project.address;
				var mount = {
					relateId : data.repairId,
					relateSerial : data.repairSerial,
					relateTheme : data.repairSerial,
					relateModule : RelationModule.equipRepair.relateModule,
					relateModuleName : RelationModule.equipRepair.relateModuleName,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					paymentPlanDisabled : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addPickupPayment : function (){
		new PickupSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				if (Ext.isEmpty(data.project)) {
					data.project = {};
				}
				data.projectId = data.project.projectId;
				data.projectSerial = data.project.projectSerial;
				data.projectName = data.projectName;
				data.address = data.project.address;
				var mount = {
					relateId : data.pickupId,
					relateSerial : data.pickupSerial,
					relateTheme : data.pickupSerial,
					relateModule : RelationModule.pickup.relateModule,
					relateModuleName : RelationModule.pickup.relateModuleName,
					projectName : data.projectName,
					amountTheme : data.pickupTheme,
					relationData : data
				};
				this.showAmountPaymentDetail(mount, {
					saveable : true,
					paymentPlanDisabled : true,
					callback : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addAmountPayment : function() {
		this.showAmountPaymentDetail(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		});
	},
	editAmountPayment : function(cp) {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (!cp && "0" != a[0].data.applyforState) {
			$toast("【修改】的付款信息必须是【待提交】的付款！");
			return;
		}
		var receiveDisabled = false;
		var paymentPlanDisabled = false;
		if (a[0].data.relateId && a[0].data.relateModule) {
			a[0].data.relation = {
				relateId : a[0].data.relateId,
				relateSerial : a[0].data.relateSerial,
				relateModule : a[0].data.relateModule
			};
		}
		if (RelationModule.teamsAccount.relateModule == a[0].data.relateModule) {
			receiveDisabled = true;
			paymentPlanDisabled = true;
		}
		new AmountPaymentForm(a[0].data, {
			copyable : cp,
			saveable : true,
			receiveDisabled : receiveDisabled,
			paymentPlanDisabled : paymentPlanDisabled,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	submitAmountPayment : function() {
		this.speciallyGridAction(this.dataGridPanel, "amountPaymentId", __ctxPath + "/fund/multiSubmitAmountPayment.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的付款信息必须是【待提交】的付款！");
			return false;
		}.createDelegate(this));
	},
	delAmountPayment : function() {
		this.speciallyGridAction(this.dataGridPanel, "amountPaymentId", __ctxPath + "/fund/multiDelAmountPayment.do", "删除", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【删除】的付款信息必须是【待提交】的付款！");
			return false;
		}.createDelegate(this));
	},
	printAmountPayment : function() {
		$print(this.dataGridPanel, function(a) {
			if (a[0].data["applyforState"] != "3") {
				$toast("该条付款单需要审批通过后才能进行打印！");
				return null;
			}
			return __ctxPath + "/fund/printAmountPayment.do?formpage=AmountPayment&amountPaymentId=" + a[0].data["amountPaymentId"];
		});
	},
	exportAmountPayment : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/fund/exportAmountPayment.do", this.dataGridPanel);
	}
});