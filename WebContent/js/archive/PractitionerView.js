var PractitionerView = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.practiInfo = (new PractitionerForm(a)).formPanel;
	this.practiInfo.setTitle("基本信息");

	this.practiCert = new PractiCertListView({
		id : this.practiId + "PractiCertListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_practiId_L_EQ" : this.practiId
		}
	});

	this.practiResume = new PractiResumeListView({
		id : this.practiId + "PractiResumeListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_practiId_L_EQ" : this.practiId
		}
	});

	this.practiCredit = new PractiCreditListView({
		id : this.practiId + "PractiCreditListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_practiId_L_EQ" : this.practiId
		}
	});

	this.contractLease = new ContractLeaseListView({
		id : this.practiId + "ContractLeaseListView",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_salesmanId_L_EQ" : this.practiId
		}
	});
	this.insurance = (new PractiInsuranceDetailForm({
		id : this.practiId + "PractitionerView_PractiInsuranceDetailForm",
		searchDisenable : true,
		actionDisenable : true,
		tbarDisenable : true,
		params : {
			practiIds : this.practiId
		}
	})).formPanel;
	this.insurance.setTitle("保险管理");
	
	PractitionerView.superclass.constructor.call(this, {
		id : "PractitionerView",
		title : (Ext.isEmpty(this.practiName) ? this.corpId : this.practiName) + "-从业人员信息总览",
		activeTab : 0,
		frame : true,
		closable : true,
		enableTabScroll : true,
		resizeTabs : false,
		items : [ this.practiInfo, this.practiCert, this.practiResume, this.practiCredit, this.contractLease,this.insurance ]
	});
};
Ext.extend(PractitionerView, Ext.TabPanel, {});
