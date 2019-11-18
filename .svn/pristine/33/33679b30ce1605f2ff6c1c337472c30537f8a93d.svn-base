var MaterialsLostCompensationReport = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "日期:",
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
			xtype : "relationCompositeField",
			allowBlank : true,
			lable : "项目名称",
			name : "Q_projectName_S",
			params : {
				"Q_applyforState_S_GE" : 3
			},
			single : false,
			collectEnable : true,
			relateModule : RelationModule.contractMaterialsSecond.relateModule,
			importhandler : this.importContractId.createDelegate(this)
		}, 	{
			hidden : true,
			width : 80,
			name : "Q_contractIds_S"
		}];
	var searchActionItems = [];
	searchActionItems.push({
		xtype : "tbsplit",
		iconCls : "btn-search",
		text : "明细查询",
		menu : {
			items : [{
				text : "按规格",
				handler : this.queryDetail.createDelegate(this,["specifications"])
			},{
				text : "按品名",
				handler : this.queryDetail.createDelegate(this,["commodity"])
			},{
				text : "按项目",
				handler : this.queryDetail.createDelegate(this,["project"])
			}]
		}
	});
	MaterialsLostCompensationReport.superclass.constructor.call(this,{
		id : "MaterialsLostCompensationReport",
		title : "周转材料丢失赔偿汇总表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_MATERIALS_LOST_COMPENSATION",
		search_config : {
			generalItems : generaltems,
			searchActionItems : searchActionItems
		},
		base_params : this.params
	});
};
Ext.extend(MaterialsLostCompensationReport, Knight.ux.BaseReportView, {
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
	},
	queryDetail : function(action) {
		var jasperFile = null;
		if(action=="specifications") {
			jasperFile = "REPORT__LOST_COMPENSATION_BY_SPECIFICATIONS";
		}
		if(action=="commodity") {
			jasperFile = "REPORT_LOST_COMPENSATION_BY_COMMODITY";
		}
		if(action=="project") {
			jasperFile = "REPORT_LOST_COMPENSATION_BY_PROJECT";
		}
		var  contractIds = this.searchPanel.getForm().findField("Q_contractIds_S").getValue();
		var  projectName = this.searchPanel.getForm().findField("Q_projectName_S").getValue();
		var  startDate = this.searchPanel.getForm().findField("Q_startDate_S").getValue();
		var  endDate = this.searchPanel.getForm().findField("Q_endDate_S").getValue();
		
		new LostCompensationDetailWin({
			params : {
				contractIds : contractIds,
				projectName : projectName,
				startDate : startDate,
				endDate : endDate
			},
			jasperFile : jasperFile
		}).show();
	}
});