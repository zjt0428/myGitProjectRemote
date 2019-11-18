var LostCompensationDetailReport = function(a){
	this.params = {};
	this.jasperFile = a.jasperFile;
	Ext.apply(this.params, ( a && a.params )||{} );

	var contractIds = null;
	var projectName = null;
	var startDate = null;
	var endDate = null;
	
	if(this.params!=null) {
		contractIds = this.params.contractIds;
		projectName = this.params.projectName;
		startDate = this.params.startDate;
		endDate = this.params.endDate;
	}
	
	var generaltems =[ {
			lable : "日期:",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_startDate_S",
			value : startDate
		},  {
			lable : "至:",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_endDate_S",
			value : endDate
		}, {
			xtype : "relationCompositeField",
			lable : "项目名称",
			allowBlank : true,
			name : "Q_projectName_S",
			params : {
				"Q_applyforState_S_GE" : 3
			},
			single : false,
			collectEnable : true,
			relateModule : RelationModule.contractMaterialsSecond.relateModule,
			importhandler : this.importContractId.createDelegate(this),
			value : projectName
		}, 	{
			hidden : true,
			width : 80,
			name : "Q_contractIds_S",
			value : contractIds
		} ];

	LostCompensationDetailReport.superclass.constructor.call(this,{
		id : "LostCompensationDetailReport",
		title : "周转材料丢失赔偿明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : this.jasperFile,
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(LostCompensationDetailReport, Knight.ux.BaseReportView, {
	importContractId : function(data) {
		var contractIds = "";
		var projectNames = "";
		for(var i=0;i<data.length;i++) {
			contractIds = contractIds.concat(data[i].data.contractmaId);
			projectNames = projectNames.concat(data[i].data.projectName);
			if(i==data.length-1) {
				break;
			}
			contractIds = contractIds.concat(",");
			projectNames = projectNames.concat(",");
		}
		this.searchPanel.getForm().findField("Q_contractIds_S").setValue(contractIds);
		this.searchPanel.getForm().findField("Q_projectName_S").setValue(projectNames);
	}
});
