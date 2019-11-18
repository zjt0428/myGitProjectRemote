var TemporaryStoreQuery = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
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
			format : "Ymd",
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
		}, {
			xtype : "relationCompositeField",
			allowBlank : false,
			lable : "仓库名称",
			name : "Q_depotName_S",
			relateModule : RelationModule.baseDepot.relateModule,
			importhandler : this.importDepotId.createDelegate(this)
		}, 	{
			hidden : true,
			width : 80,
			name : "Q_depotId_S"
		}, 	{
			width : 80,
			lable : "合同编号",
			name : "Q_contractSerial_S"
		} ];
	
	TemporaryStoreQuery.superclass.constructor.call(this,{
		id : "TemporaryStoreQuery",
		title : "周材暂存查询",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_TEMPORARY_STORE_QUERY",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(TemporaryStoreQuery, Knight.ux.BaseReportView, {
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