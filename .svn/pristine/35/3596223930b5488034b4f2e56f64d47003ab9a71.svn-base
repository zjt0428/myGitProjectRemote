Ext.ns("Knight.ux");
Knight.ux.RelationCompositeMenuButtonField = function(a) {
	a.allowBlank = a.allowBlank === false ? a.allowBlank : true;
	this.cleanhandler = a.cleanhandler;
	this.importhandler = a.importhandler;
	this.disabled = a.disabled;
	this.params = a.params;
	var menuItems = [];
	this.initMenuItems(menuItems, a.relations);
	var width = a.width ? a.width : 130;
	var textView = {
		xtype : "textfield",
		margins : "0 0 0 0",
		disabled : this.disabled,
		name : a.name,
		readOnly : a.readOnly,
		allowBlank : a.allowBlank,
		flex : 1
	}, cleanView = {
		xtype : "button",
		margins : "0 3 0 0",
		disabled : this.disabled,
		autoWidth : true,
		iconCls : "btn-clean",
		handler : this.cleanFieldHandler.createDelegate(this)
	}, relationView = {
		xtype : "splitbutton",
		margins : "0 0 0 0",
		disabled : this.disabled,
		autoWidth : true,
		iconCls : "btn-anchor-point",
		menu : new Ext.menu.Menu({
			items : menuItems
		})
	};
	Ext.apply(textView, a.textView || {});

	var items = [ textView ];
	if (!this.disabled) {
		if (this.cleanhandler) {
			Ext.apply(cleanView, a.cleanView || {});
			items.push(cleanView);
		}
		Ext.apply(relationView, a.relationView || {});
		items.push(relationView);
		width += 35;
	}
	Knight.ux.RelationCompositeMenuButtonField.superclass.constructor.call(this, {
		fieldLabel : a.fieldLabel,
		allowBlank : a.allowBlank,
		width : width,
		items : items
	});
};
Ext.extend(Knight.ux.RelationCompositeMenuButtonField, Ext.form.CompositeField, {
	initMenuItems : function(items, relations) {
		for (var i = 0; i < relations.length; i++) {
			items.push({
				text : relations[i].relation.relateModuleName,
				handler : this.importFieldHandler.createDelegate(this, [ relations[i].relation, relations[i].params ])
			});
		}
	},
	cleanFieldHandler : function() {
		this.cleanhandler.call(this, this.params);
	},
	relateCallback : function(data, relation) {
		this.importhandler.call(this, data, relation, this.params);
	},
	importFieldHandler : function(relation, simple_params) {
		var module = relation.relateModule;
		switch (relation.relateModule) {
		case RelationModule.corp.relateModule:
			new CorpSelector({
				single : true,
				params : simple_params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.corpId;
					relation.relateSerial = data.corpName; // 企业名称
					relation.relateTheme = data.dutyman; // 企业责任人
					relation.relateMen = data.dutyman; // 企业责任人
					relation.relateTel = data.dutymanTel1; // 企业责任人联系电话
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.corpAccount.relateModule:
			new CorpAccountSelector({
				single : true,
				params : simple_params,
				collectEnable : true,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.corp.corpId;
					relation.relateSerial = data.corp.corpName;
					relation.relateTheme = data.corp.dutyman;
					relation.relateMen = data.corp.dutyman; // 企业责任人
					relation.relateTel = data.corp.dutymanTel1; // 企业责任人联系电话

					relation.relateAccountId = data.corpAccountId;
					relation.relateAccount = data.account;
					relation.relateBankDeposit = data.bankDeposit;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.customer.relateModule:
			new CustomerSelector({
				single : true,
				params : simple_params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.customerId;
					relation.relateSerial = data.customerName;
					relation.relateTheme = data.unitType;
					relation.relateMen = ""; // 无联系人基本信息
					relation.relateTel = data.tel; // 客户联系方式
					// 联系人信息
					if (data.customerLinker) {
						relation.relateMen = data.customerLinker.linker;
					}
					// 帐户信息
					if (data.customerAccount) {
						relation.relateAccountId = data.customerAccount.customerAccountId;
						relation.relateAccount = data.customerAccount.account;
						relation.relateBankDeposit = data.customerAccount.bankDeposit;
					}
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.supplier.relateModule:
			new SupplierSelector({
				single : true,
				params : simple_params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.supplierId;
					relation.relateSerial = data.supplierName;
					relation.relateTheme = data.unitType;
					relation.relateMen = ""; // 无联系人基本信息
					relation.relateTel = data.tel; // 办公电话

					// 帐户信息
					if (data.supplierAccount) {
						relation.relateAccountId = data.supplierAccount.supplierAccountId;
						relation.relateAccount = data.supplierAccount.account;
						relation.relateBankDeposit = data.supplierAccount.bankDeposit;
					}
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.equipment.relateModule:
			new EquipSelector({
				single : true,
				params : simple_params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.equipId;
					relation.relateSerial = data.recordSerial;
					relation.relateTheme = data.recordId;
					relation.projectName = data.projectName;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.contractLease.relateModule:
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
					relation.relateId = data.contractId;
					relation.relateSerial = data.contractSerial;
					relation.relateTheme = data.contractTheme;
					relation.projectName = data.projectName;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.contractMaterials.relateModule:
			var params = {
//				Q_applyforState_S_EQ : "3"
			};
			Ext.apply(params, simple_params || {});
			new ContractMaterialsSelector({
				single : true,
				params : params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.contractmaId;
					relation.relateSerial = data.contractSerial;
					relation.projectId = data.projectId;
//					relation.relateTheme = data.contractTheme;
					relation.projectName = data.projectName;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.baseLocation.relateModule:
			var params = {
//				Q_depotId_S_EQ : "3"
			};
			Ext.apply(params, simple_params || {});
			new BaseLocationSelector({
				single : true,
				params : params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.LocationId;
					relation.relateSerial = data.LocationName;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.settleContract.relateModule:
			var params = {
				Q_effective_S_EQ : "1"
			};
			Ext.apply(params, simple_params || {});
			new SettleContractSelector({
				single : true,
				params : params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.settleId;
					relation.relateSerial = data.settleSerial;
					relation.relateTheme = data.settleTheme;
					relation.invoiceType = data.invoiceType;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.dispatch.relateModule:
			var params = {
				Q_applyforState_S_EQ : "3"
			};
			Ext.apply(params, simple_params || {});
			new DispatchSelector({
				single : true,
				params : params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.dispatchId;
					relation.relateSerial = data.dispatchSerial;
					relation.relateTheme = data.dispatchTheme;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.equipInstall.relateModule:
			new EquipFlowInstallSelector({
				single : true,
				params : simple_params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.equipInstall.installId;
					relation.relateSerial = data.equipInstall.installSerial;
					relation.relateTheme = data.equipInstall.installTheme;
					relation.projectName = data.equipDiary.projectName;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.equipEmploy.relateModule:
			new EquipFlowEmploySelector({
				single : true,
				params : simple_params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.equipEmploy.employId;
					relation.relateSerial = data.equipEmploy.employSerial;
					relation.relateTheme = data.equipEmploy.employTheme;
					relation.projectName = data.equipDiary.projectName;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.equipDetect.relateModule:
			new EquipDetectSelector({
				single : true,
				params : simple_params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.detectId;
					relation.relateSerial = data.detectSerial;
					relation.relateTheme = data.detectSerial; // 检测无主题信息
					relation.projectName = data.equipFlow.equipDiary.projectName;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.equipMaint.relateModule:
			new EquipMaintSelector({
				single : true,
				params : simple_params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.maintId;
					relation.relateSerial = data.maintSerial;
					relation.relateTheme = data.maintSerial; // 维保无主题信息
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.purchase.relateModule:
			var params = {
				Q_applyforState_S_GE : "3"
			};
			Ext.apply(params, simple_params || {});
			new PurchaseSelector({
				single : true,
				params : params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.purchaseId;
					relation.relateSerial = data.purchaseSerial;
					relation.relateTheme = data.purchaseTheme;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.borrow.relateModule:
			var params = {
				Q_applyforState_S_GE : "3"
			};
			Ext.apply(params, simple_params || {});
			new BorrowSelector({
				single : true,
				params : params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.borrowId;
					relation.relateSerial = data.borrowSerial;
					relation.relateTheme = data.borrowTheme;
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.materialsInit.relateModule:
			new MaterialsInitSelector({
				single : true,
				params : simple_params,
				callback : function(d) {
					var data = d[0].data;
					relation.specificationsId = data["materialsSpecifications.specificationsId"];
					relation.commodity = data["materialsSpecifications.materialsCommodity"].commodity;
					relation.mnemonics = data["materialsSpecifications.mnemonics"];
					relation.specifications = data["materialsSpecifications.specifications"];
					relation.unit = data["materialsSpecifications.firstUnitConversion"];
					relation.quantity = data["materialsSpecifications.firstConvertedQuantity"];
					relation.supplementUnit = data["materialsSpecifications.secondUnitConversion"];
					relation.conversion = data["materialsSpecifications.secondConvertedQuantity"];
								
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		case RelationModule.insureEquip.relateModule:
			new InsureEquipSelector({
				single : true,
				params : simple_params,
				callback : function(d) {
					var data = d[0].data;
					relation.relateId = data.insureId;
					relation.relateSerial = data.insureSerial;
					relation.relateTheme = data.recordSerial; // 保险无主题信息
					this.relateCallback(data, relation);
				}.createDelegate(this)
			}).show();
			break;
		default:
			this.relateCallback(null, relation);
			break;
		}
	}
});
Ext.reg("relationCompositeMenuButtonField", Knight.ux.RelationCompositeMenuButtonField);