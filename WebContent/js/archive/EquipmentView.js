var EquipmentView = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	this.equipment = (new EquipmentForm(a, {
		baseWidth : 0.25
	})).formPanel;
	this.equipment.setTitle("基本信息");

/*	this.insure = new InsureEquipListView({
		id : this.equipId + "EquipmentView_InsureEquipListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_equipment.equipId_L_EQ" : this.equipId
		}
	});
	this.amountPayment = new AmountPaymentListView({
		id : this.equipId + "EquipmentView_AmountPaymentListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"QUERY_FILTER" : "equipPayment",
			"Q_[ae.equipId]_L_EQ" : this.equipId,
			"Q_[vo.applyforState]_S_EQ" : "3"
		}
	});
	this.amountPayment.setTitle("支出款项");*/

	this.install = new EquipInstallListView({
		id : this.equipId + "EquipmentView_EquipInstallListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_[equipFlow.equipDiary.equipId]_L_EQ" : this.equipId,
			"Q_applyforState_S_EQ" : "3"
		}
	});
/*	this.detect = new EquipDetectListView({
		id : this.equipId + "EquipmentView_EquipDetectListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_[equipFlow.equipDiary.equipId]_L_EQ" : this.equipId
		}
	});
	this.verify = new EquipVerifyListView({
		id : this.equipId + "EquipmentView_EquipVerifyListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_[equipFlow.equipDiary.equipId]_L_EQ" : this.equipId
		}
	});
	this.employ = new EquipEmployListView({
		id : this.equipId + "EquipmentView_EquipEmployListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_[equipFlow.equipDiary.equipId]_L_EQ" : this.equipId,
			"Q_applyforState_S_EQ" : "3"
		}
	});*/
	this.repair = new EquipRepairListView({
		id : this.equipId + "EquipmentView_EquipRepairListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_[equipment.equipId]_L_EQ" : this.equipId
		}
	});
	/*this.maint = new EquipMaintListView({
		id : this.equipId + "EquipmentView_EquipMaintListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_[equipMaintSchema.equipment.equipId]_L_EQ" : this.equipId
		}
	});*/
	this.dismantle = new EquipDismantleListView({
		id : this.equipId + "EquipmentView_EquipDismantleListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_[equipFlow.equipDiary.equipId]_L_EQ" : this.equipId,
			"Q_applyforState_S_EQ" : "3"
		}
	});
	this.contract = new ContractLeaseListView({
		id : this.equipId + "EquipmentView_ContractLeaseListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
//			"QUERY_FILTER" : "equipcontract",
			equipIds : this.equipId
		}
	});
	this.contractarrange = new ContractArrangeListView({
		id : this.equipId + "EquipmentView_ContractArrangeListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
//			"QUERY_FILTER" : "equipcontract",
			equipIds : this.equipId
		}
	});
	this.dispatch = new DispatchListView({
		id : this.equipId + "EquipmentView_DispatchListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
//			"QUERY_FILTER" : "equipcontract",
			equipIds : this.equipId
		}
	});
	this.eise = new EquipInspectSchemaEmployListView({
		id : this.equipId + "EquipmentView_EquipInspectSchemaEmployListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
//			"QUERY_FILTER" : "equipcontract",
			equipIds : this.equipId
		}
	});
	this.eie = new EquipInspectEmployListView({
		id : this.equipId + "EquipmentView_EquipInspectEmployListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
//			"QUERY_FILTER" : "equipcontract",
			equipIds : this.equipId
		}
	});
	this.sc = new SettleContractListView({
		id : this.equipId + "EquipmentView_SettleContractListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
//			"QUERY_FILTER" : "equipcontract",
			equipIds : this.equipId
		}
	});
	this.insurance = (new EquipmentInsuranceDetailForm({
		id : this.equipId + "EquipmentView_EquipmentInsuranceDetailForm",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
//			"QUERY_FILTER" : "equipcontract",
			equipIds : this.equipId
		}
	})).formPanel;
	this.insurance.setTitle("保险管理");
	/*this.purchase = new PurchaseListView({
		id : this.equipId + "EquipmentView_PurchaseListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_equipId_L_EQ" : this.equipId,
			"Q_applyforState_S_GE" : "3"
		}
	});
	this.amountReceive = new AmountReceiveListView({
		id : this.equipId + "EquipmentView_AmountReceiveListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"QUERY_FILTER" : "equipReceive",
			"Q_[ae.equipId]_L_EQ" : this.equipId,
			"Q_[vo.applyforState]_S_EQ" : "3"
		}
	});
	this.amountReceive.setTitle("营收款项");*/

	EquipmentView.superclass.constructor.call(this, {
		id : "EquipmentView",
		title : (Ext.isEmpty(this.recordId) ? this.recordSerial : this.recordId) + "-设备信息总览",
		activeTab : 0,
		frame : true,
		iconCls : "menu-business-corpview",
		closable : true,
		enableTabScroll : true,
		resizeTabs : false,
		items : [ this.equipment, /*this.insure,*/ this.install,/* this.detect, this.verify, this.employ, */this.repair, this.dismantle, this.contract,this.contractarrange,this.dispatch,this.eise,this.eie,this.sc ,this.insurance /*, this.purchase, this.amountReceive, this.amountPayment */]
	});
};
Ext.extend(EquipmentView, Ext.TabPanel, {});