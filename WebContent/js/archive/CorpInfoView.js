var CorpInfoView = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});

	this.corpInfo = (new CorpInfoForm(a)).formPanel;
	this.corpInfo.setTitle("基本信息");

	this.corpCert = new CorpCertListView({
		id : this.corpId + "CorpCertListView",
		searchDisenable : true,
		tbarDisenable : true,
		params : {
			"Q_corpId_L_EQ" : this.corpId
		}
	});
	this.practitioner = new PractitionerListView({
		id : this.corpId + "PractitionerListView",
		searchDisenable : true,
		tbarDisenable : true,
		actionDisenable : true,
		params : {
			"Q_corpId_L_EQ" : this.corpId
		}
	});
	CorpInfoView.superclass.constructor.call(this, {
		id : "CorpInfoView",
		title : (Ext.isEmpty(this.corpName) ? this.corpId : this.corpName) + "-企业信息总览",
		activeTab : 0,
		frame : true,
		iconCls : "menu-business-corpview",
		closable : true,
		enableTabScroll : true,
		resizeTabs : false,
		items : [ this.corpInfo, this.corpCert, this.practitioner ]
	});
};
Ext.extend(CorpInfoView, Ext.TabPanel, {});