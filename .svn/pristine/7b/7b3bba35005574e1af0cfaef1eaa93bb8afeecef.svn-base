var PractiInsuranceInfoQuery = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "起保日期:",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_startDate_S",
			value : new Date()
		}, {
			lable : "至",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_endDate_S",
			value : new Date()
		}, {
			width : 80,
			lable : "项目名称",
			name : "Q_projectName_S",
		}, {
			width : 80,
			lable : "保单号",
			name : "Q_insureSerial_S",
		}, {
			width : 80,
			lable : "保险公司",
			name : "Q_insuranceCompany_S",
		}, {
			width : 60,
			lable : "姓名",
			name : "Q_practiName_S",
		}, {
			width : 80,
			lable : "身份证号",
			name : "Q_insuranceCompany_S",
		}, {
			width : 80,
			xtype : "relationCompositeField",
			allowBlank : false,
			lable : "所属公司",
			name : "Q_corpName_S",
			relateModule : RelationModule.corp.relateModule,
			importhandler : this.importCorpArchives.createDelegate(this)
		}, {
			hidden : true,
			name : "Q_corpId_L"
		}];
	PractiInsuranceInfoQuery.superclass.constructor.call(this,{
		id : "PractiInsuranceInfoQuery",
		title : "人员参保情况查询表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_PRACTI_INSURANCE_DETAIL_SUMMARY",
		search_config : {
			generalItems : generaltems,
		},
		base_params : this.params
	});
};
Ext.extend(PractiInsuranceInfoQuery, Knight.ux.BaseReportView, {
	importCorpArchives : function(data) {
		var corpNames = "";
		var corpIds = data.corpId;
		corpNames = corpNames.concat(data.corpName);
		this.searchPanel.getForm().findField("Q_corpId_L").setValue(corpIds);
		this.searchPanel.getForm().findField("Q_corpName_S").setValue(corpNames);
	}
});