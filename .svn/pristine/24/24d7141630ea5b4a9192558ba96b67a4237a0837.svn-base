var MaterialsWorkSiteOccupancy = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "截止日期:",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_queryDate_S",
			value : new Date()
		}, {
			xtype : "relationCompositeField",
			allowBlank : false,
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
	
	MaterialsWorkSiteOccupancy.superclass.constructor.call(this,{
		id : "MaterialsWorkSiteOccupancy",
		title : "周转材料工地占有量表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_MATERIALS_WORK_SITE_OCCUPANCY",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(MaterialsWorkSiteOccupancy, Knight.ux.BaseReportView, {
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
	importDepotId : function(data) {
		this.searchPanel.getForm().findField("Q_depotId_S").setValue(data.depotId);
		this.searchPanel.getForm().findField("Q_depotName_S").setValue(data.depotName);
	}
});