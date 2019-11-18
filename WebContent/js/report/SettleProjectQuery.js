var SettleProjectQuery = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var Y = new Date().getFullYear();
	var m = new Date().getMonth();
	var d = new Date().getDate();
	var startDate = null;
	var endDate = null;
	if(d>=21) {
		startDate = Y+'-'+m+'-'+'21';
		endDate = Y+'-'+(m+1)+'-'+'20';
	}else {
		startDate =  Y+'-'+(m-1)+'-'+'21';
		endDate = Y+'-'+m+'-'+'20';
	}
	startDate = new Date(startDate);
	endDate = new Date(endDate);
	
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
		} ];
	var searchActionItems = [];
	searchActionItems.push({
		xtype : "button",
		iconCls : "btn-search",
		text : "明细查询",
		handler : this.queryDetail.createDelegate(this)
	});
	SettleProjectQuery.superclass.constructor.call(this,{
		id : "SettleProjectQuery",
		title : "设备结算查询",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_SETTLE_PROJECT_QUERY",
		search_config : {
			generalItems : generaltems,
			searchActionItems : searchActionItems
		},
		base_params : this.params
	});
};
Ext.extend(SettleProjectQuery, Knight.ux.BaseReportView, {
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
	queryDetail : function() {
		var  contractIds = this.searchPanel.getForm().findField("Q_contractIds_S").getValue();
		var  projectName = this.searchPanel.getForm().findField("Q_projectName_S").getValue();
		var  startDate = this.searchPanel.getForm().findField("Q_startDate_S").getValue();
		var  endDate = this.searchPanel.getForm().findField("Q_endDate_S").getValue();
		
		new SettleMaterialsDetailWindow({
			params : {
				relateModule : RelationModule.settleProject.relateModule,
				contractIds : contractIds,
				projectName : projectName,
				startDate : startDate,
				endDate : endDate
			}
		}).show();
	}
});