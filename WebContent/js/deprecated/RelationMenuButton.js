Ext.ns("Knight.ux");
Knight.ux.RelationMenuButton = function(a) {
	this.relationView = a.relationView;
	a.relationView = undefined;
	this.params = this.params ? this.relationView.params : {};
	var items = [];
	this.relationView.relation = this.relationView.relation ? this.relationView.relation : [];
	for (var i = 0; i < this.relationView.relation.length; i++) {
		var module = this.relationView.relation[i].relateModule;
		var simple_params = {};
		Ext.apply(simple_params, this.params);
		Ext.apply(simple_params, this.relationView.relation[i].params || {});
		switch (module) {
			case RelationModule.corp.relateModule:
				items.push({
					text : RelationModule.corp.relateModuleName,
					handler : this.importCorpInfo.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.corp ])
				});
				break;
			case RelationModule.corpAccount.relateModule:
				items.push({
					text : RelationModule.corpAccount.relateModuleName,
					handler : this.importCorpAccount.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.corpAccount ])
				});
				break;
			case RelationModule.customer.relateModule:
				items.push({
					text : RelationModule.customer.relateModuleName,
					handler : this.importCustomer.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.customer ])
				});
				break;
			case RelationModule.customerAccount.relateModule:
				items.push({
					text : RelationModule.customerAccount.relateModuleName,
					handler : this.importCustomerAccount.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.customerAccount ])
				});
				break;
			case RelationModule.customerLinker.relateModule:
				items.push({
					text : RelationModule.customerLinker.relateModuleName,
					handler : this.importCustomerLinker.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.customerLinker ])
				});
				break;
			case RelationModule.supplier.relateModule:
				items.push({
					text : RelationModule.supplier.relateModuleName,
					handler : this.importSupplier.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.supplier ])
				});
				break;
			case RelationModule.supplierAccount.relateModule:
				items.push({
					text : RelationModule.supplierAccount.relateModuleName,
					handler : this.importSupplierAccount.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.supplierAccount ])
				});
				break;
			case RelationModule.supplierLinker.relateModule:
				items.push({
					text : RelationModule.supplierLinker.relateModuleName,
					handler : this.importSupplierLinker.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.supplierLinker ])
				});
				break;
			case RelationModule.equipment.relateModule:
				items.push({
					text : RelationModule.equipment.relateModuleName,
					handler : this.importEquipment.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.equipment ])
				});
				break;
			case RelationModule.contractLease.relateModule:
				items.push({
					text : RelationModule.contractLease.relateModuleName,
					handler : this.importContractLease.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.contractLease ])
				});
				break;
			case RelationModule.settleContract.relateModule:
				items.push({
					text : RelationModule.settleContract.relateModuleName,
					handler : this.importSettleContract.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.settleContract ])
				});
				break;
			case RelationModule.dispatch.relateModule:
				items.push({
					text : RelationModule.dispatch.relateModuleName,
					handler : this.importDispatch.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.dispatch ])
				});
				break;
			case RelationModule.pickup.relateModule:
				items.push({
					text : RelationModule.pickup.relateModuleName,
					handler : this.importPickup.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.pickup ])
				});
				break;
			case RelationModule.purchase.relateModule:
				items.push({
					text : RelationModule.purchase.relateModuleName,
					handler : this.importPurchase.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.purchase ])
				});
				break;
			case RelationModule.borrow.relateModule:
				items.push({
					text : RelationModule.borrow.relateModuleName,
					handler : this.importBorrow.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.borrow ])
				});
				break;
			case RelationModule.equipInstall.relateModule:
				items.push({
					text : RelationModule.equipInstall.relateModuleName,
					handler : this.importEquipInstall.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.equipInstall ])
				});
				break;
			case RelationModule.equipEmploy.relateModule:
				items.push({
					text : RelationModule.equipEmploy.relateModuleName,
					handler : this.importEquipEmploy.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.equipEmploy ])
				});
				break;
			case RelationModule.equipDismantle.relateModule:
				items.push({
					text : RelationModule.equipDismantle.relateModuleName,
					handler : this.importEquipDismantle.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.equipDismantle ])
				});
				break;
			case RelationModule.equipDetect.relateModule:
				items.push({
					text : RelationModule.equipDetect.relateModuleName,
					handler : this.importEquipDetect.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.equipDetect ])
				});
				break;
			case RelationModule.equipInspect.relateModule:
				items.push({
					text : RelationModule.equipInspect.relateModuleName,
					handler : this.importEquipInspect.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.equipInspect ])
				});
				break;
			case RelationModule.equipMaint.relateModule:
				items.push({
					text : RelationModule.equipMaint.relateModuleName,
					handler : this.importEquipMaint.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.equipMaint ])
				});
				break;
			case RelationModule.insureEquip.relateModule:
				items.push({
					text : RelationModule.insureEquip.relateModuleName,
					handler : this.importInsureEquip.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.insureEquip ])
				});
				break;
			case RelationModule.moneyLend.relateModule:
				items.push({
					text : RelationModule.moneyLend.relateModuleName,
					handler : this.importMoneyLend.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.moneyLend ])
				});
				break;
			case RelationModule.moneyBack.relateModule:
				items.push({
					text : RelationModule.moneyBack.relateModuleName,
					handler : this.importMoneyBack.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.moneyBack ])
				});
				break;
			case RelationModule.others.relateModule:
				items.push({
					text : RelationModule.others.relateModuleName,
					handler : this.importOthers.createDelegate(this, [ simple_params, this.relationView.returnback, RelationModule.other ])
				});
				break;

		}
	}
	Knight.ux.RelationMenuButton.superclass.constructor.call(this, Ext.apply({
		iconCls : "btn-anchor-point",
		menu : new Ext.menu.Menu({
			items : items
		})
	}, a || {}));
};
Ext.extend(Knight.ux.RelationMenuButton, Ext.SplitButton, {
	importCorpInfo : function(simple_params, returnback, relation) {
		new CorpSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.corpId;
					relation.relateSerial = data.corpName; // 企业名称
					relation.relateTheme = data.dutyman; // 企业责任人
					relation.relateMen = data.dutyman; // 企业责任人
					relation.relateTel = data.dutymanTel1; // 企业责任人联系电话
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importCorpAccount : function(simple_params, returnback, relation) {
		new CorpAccountSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.corpAccountId;
					relation.relateSerial = data.account;
					relation.relateTheme = data.bankDeposit;

					relation.parentId = data.corp.corpId;
					relation.parentName = data.corp.corpName;
					relation.parentModule = RelationModule.corp.relateModule;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importCustomer : function(simple_params, returnback, relation) {
		new CustomerSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.customerId;
					relation.relateSerial = data.customerName;
					relation.relateTheme = data.unitType;
					relation.relateMen = ""; // 无联系人基本信息
					relation.relateTel = data.tel; // 客户联系方式
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importCustomerAccount : function(simple_params, returnback, relation) {
		new CustomerAccountSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.customerAccountId;
					relation.relateSerial = data.account;
					relation.relateTheme = data.bankDeposit;

					relation.parentId = data.customer.customerId;
					relation.parentName = data.customer.customerName;
					relation.parentModule = RelationModule.customer.relateModule;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importCustomerLinker : function(simple_params, returnback, relation) {
		new CustomerLinkerSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.customerLinkerId;
					relation.relateSerial = data.linker;
					relation.relateTheme = data.officePhone;

					relation.parentId = data.customer.customerId;
					relation.parentName = data.customer.customerName;
					relation.parentModule = RelationModule.customer.relateModule;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importSupplier : function(simple_params, returnback, relation) {
		new SupplierSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.supplierId;
					relation.relateSerial = data.supplierName;
					relation.relateTheme = data.unitType;

					relation.relateMen = ""; // 无联系人基本信息
					relation.relateTel = data.tel; // 办公电话
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importSupplierAccount : function(simple_params, returnback, relation) {
		new SupplierAccountSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.supplierAccountId;
					relation.relateSerial = data.account;
					relation.relateTheme = data.bankDeposit;

					relation.parentId = data.supplier.supplierId;
					relation.parentName = data.supplier.supplierName;
					relation.parentModule = RelationModule.supplier.relateModule;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importSupplierLinker : function(simple_params, returnback, relation) {
		new SupplierLinkerSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.supplierLinkerId;
					relation.relateSerial = data.linker;
					relation.relateTheme = data.officePhone;

					relation.parentId = data.supplier.supplierId;
					relation.parentName = data.supplier.supplierName;
					relation.parentModule = RelationModule.supplier.relateModule;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importEquipment : function(simple_params, returnback, relation) {
		new EquipSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.equipId;
					relation.relateSerial = data.recordSerial;
					relation.relateTheme = data.recordId;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importContractLease : function(simple_params, returnback, relation) {
		var params = {
			Q_applyforState_S_GE : "4",
			Q_applyforState_S_LE : "6"
		};
		Ext.apply(params, simple_params || {});
		new ContractLeaseSelector({
			single : true,
			params : params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.contractId;
					relation.relateSerial = data.contractSerial;
					relation.relateTheme = data.contractTheme;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importSettleContract : function(simple_params, returnback, relation) {
		var params = {
			Q_effective_S_EQ : "1"
		};
		Ext.apply(params, simple_params || {});
		new SettleContractSelector({
			single : true,
			params : params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.settleId;
					relation.relateSerial = data.settleSerial;
					relation.relateTheme = data.settleTheme;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importDispatch : function(simple_params, returnback, relation) {
		var params = {
			Q_applyforState_S_EQ : "3"
		};
		Ext.apply(params, simple_params || {});
		new DispatchSelector({
			single : true,
			params : params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.dispatchId;
					relation.relateSerial = data.dispatchSerial;
					relation.relateTheme = data.dispatchTheme;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importPickup : function(simple_params, returnback, relation) {
		new PickupSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.pickupId;
					relation.relateSerial = data.pickupSerial;
					relation.relateTheme = data.pickupTheme;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importPurchase : function(simple_params, returnback, relation) {
		var params = {
			Q_applyforState_S_GE : "3"
		};
		Ext.apply(params, simple_params || {});
		new PurchaseSelector({
			single : true,
			params : params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.purchaseId;
					relation.relateSerial = data.purchaseSerial;
					relation.relateTheme = data.purchaseTheme;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importBorrow : function(simple_params, returnback, relation) {
		var params = {
			Q_applyforState_S_GE : "3"
		};
		Ext.apply(params, simple_params || {});
		new BorrowSelector({
			single : true,
			params : params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.borrowId;
					relation.relateSerial = data.borrowSerial;
					relation.relateTheme = data.borrowTheme;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importEquipInstall : function(simple_params, returnback, relation) {
		new EquipFlowInstallSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.equipInstall.installId;
					relation.relateSerial = data.equipInstall.installSerial;
					relation.relateTheme = data.equipInstall.installTheme;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importEquipEmploy : function(simple_params, returnback, relation) {
		new EquipFlowEmploySelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.equipEmploy.employId;
					relation.relateSerial = data.equipEmploy.employSerial;
					relation.relateTheme = data.equipEmploy.employTheme;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importEquipDismantle : function(simple_params, returnback, relation) {
		new EquipFlowDismantleSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.equipDismantle.dismantleId;
					relation.relateSerial = data.equipDismantle.dismantleSerial;
					relation.relateTheme = data.equipDismantle.dismantleTheme;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importEquipDetect : function(simple_params, returnback, relation) {
		new EquipDetectSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.detectId;
					relation.relateSerial = data.detectSerial;
					relation.relateTheme = data.detectSerial; // 检测无主题信息
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importEquipInspect : function(simple_params, returnback, relation) {
		new EquipInspectSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.inspectId;
					relation.relateSerial = data.inspectSerial;
					relation.relateTheme = data.inspectSerial; // 巡检无主题信息
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importEquipMaint : function(simple_params, returnback, relation) {
		new EquipMaintSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.maintId;
					relation.relateSerial = data.maintSerial;
					relation.relateTheme = data.maintSerial; // 维保无主题信息
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importInsureEquip : function(simple_params, returnback, relation) {
		new InsureEquipSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.insureId;
					relation.relateSerial = data.insureSerial;
					relation.relateTheme = data.recordSerial; // 保险无主题信息
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importMoneyLend : function(simple_params, returnback, relation) {
		new MoneyLendSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.lendId;
					relation.relateSerial = data.lendSerial;
					relation.relateTheme = data.lendTheme;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importMoneyBack : function(simple_params, returnback, relation) {
		new MoneyBackSelector({
			single : true,
			params : simple_params,
			callback : function(d) {
				var data = d[0].data;
				if (returnback) {
					relation.relateId = data.backId;
					relation.relateSerial = data.backSerial;
					relation.relateTheme = data.backTheme;
					returnback.call(this, data, relation);
				}
			}.createDelegate(this)
		}).show();
	},
	importOthers : function(simple_params, returnback, relation) {
		if (returnback) {
			returnback.call(this, null, relation);
		}
	}
});
Ext.reg("relationMenuButton", Knight.ux.RelationMenuButton);