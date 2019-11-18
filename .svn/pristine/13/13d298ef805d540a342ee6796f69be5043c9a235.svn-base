var LeaseCostAccountingReport = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "日期:",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_startDate_S",
			value : new Date(),
			listeners : {
				change : function(a,newValue,oldValue) {
					var b = this.compareDate(newValue,"Q_endDate_S","startDate");
					if(b) {
						a.setValue(oldValue);
						Ext.Msg.alert("提示","开始日期不能大于结束日期！");
					}
				}.createDelegate(this)
			}
		},  {
			lable : "至:",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_endDate_S",
			value : new Date(),
			listeners : {
				change : function(a,newValue,oldValue) {
					var b = this.compareDate(newValue,"Q_startDate_S","endDate");
					if(b) {
						a.setValue(oldValue);
						Ext.Msg.alert("提示","开始日期不能大于结束日期！");
					}
				}.createDelegate(this)
			}
		},{
			width : 80,
			lable : "合同编号",
			name : "Q_contractSerial_S"
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
		}, {
			xtype : "treecombo",
			readOnly : false,
			allowBlank : true,
			lable : "项目主管部门",
			name : "Q_competentDepartment_S",
			url : __ctxPath + "/system/listDepartment.do"
		}, 	{
			width : 80,
			lable : "承租单位",
			name : "Q_paEntName_S"
		}, 	{
			width : 80,
			lable : "租借单位",
			name : "Q_leaseUnit_S"
		}, 	{
			width : 80,
			lable : "项目地址",
			name : "Q_address_S"
		}];
	
	LeaseCostAccountingReport.superclass.constructor.call(this,{
		id : "LeaseCostAccountingReport",
		title : "租借产值成本核算表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_LEASE_COST_ACCOUNTING",
		search_config : {
			preLableHidden : true,
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(LeaseCostAccountingReport, Knight.ux.BaseReportView, {
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
		this.searchPanel.getForm().findField("Q_depotId_N").setValue(data.depotId);
		this.searchPanel.getForm().findField("Q_depotName_S").setValue(data.depotName);
	}
});