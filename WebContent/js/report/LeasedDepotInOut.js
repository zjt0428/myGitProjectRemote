var LeasedDepotInOut = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var operationWayData = new Ext.data.SimpleStore({
		fields : [ "code", "name" ],
		data : [["4","租借出租"],["8","退货管理"],["11","租借维修出库"],["12","租借维修入库"],["13","租借丢失赔偿"]]
	}); 
	var operationWayCombo = $initSimpleComboBoxField("出入库方式","Q_operationWay_S",operationWayData,{
		editable : true,
		allowBlank : true,
		valueField : "name",
		displayField : "name"
	});
	
	var generaltems =[ {
			lable : "日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_startDate_S",
			value : new Date()
		},  {
			lable : "至:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_endDate_S",
			value : new Date()
		}, {
			xtype : "relationCompositeField",
			allowBlank : false,
			lable : "项目名称",
			name : "Q_projectName_S",
			single : false,
			collectEnable : true,
			relateModule : RelationModule.leaseContract.relateModule,
			importhandler : this.importProjectId.createDelegate(this)
		}, 	{
			hidden : true,
			width : 80,
//			lable : "项目id",
			name : "Q_projectId_S"
		}, {
			hidden : true,
			width : 80,
			name : "Q_leaseId_S"
		}, {
			hidden : true,
			width : 80,
			name : "Q_relateId_S"
		}, {
			width : 80,
			lable : "品名",
			name : "Q_commodity_S"
		} , {
			width : 80,
			lable : "规格",
			name : "Q_specifications_S"
		},operationWayCombo];
	
	LeasedDepotInOut.superclass.constructor.call(this,{
		id : "LeasedDepotInOut",
		title : "租借库存查询",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_LEASED_DEPOT_QUERY",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(LeasedDepotInOut, Knight.ux.BaseReportView, {
	importProjectId : function(data) {
		var projectIds = "";
		var projectNames = "";
		var leaseIds = "";
		for(var i=0;i<data.length;i++) {
			projectIds = projectIds.concat(data[i].data.project.projectId);
			projectNames = projectNames.concat(data[i].data.project.projectName);
			leaseIds = leaseIds.concat(data[i].data.leaseId);
			if(i==data.length-1) {
				break;
			}
			projectIds = projectIds.concat(",");
			projectNames = projectNames.concat(",");
			leaseIds = leaseIds.concat(",");
		}
//		var data = $ajaxSyncCall(__ctxPath + "/materials/getRelateIdsLeaseSettlement.do",{leaseIds : leaseIds});
//		var relateIds="";
//		for(var j=0;j<data.result.length;j++){
//			relateIds = relateIds.concat(data.result[j].relateId);
//			if(j==data.result.length-1) {
//				break;
//			}
//			relateIds = relateIds.concat(",");
//		}
//		this.searchPanel.getForm().findField("Q_relateId_S").setValue(relateIds);
		this.searchPanel.getForm().findField("Q_leaseId_S").setValue(leaseIds);
		this.searchPanel.getForm().findField("Q_projectId_S").setValue(projectIds);
		this.searchPanel.getForm().findField("Q_projectName_S").setValue(projectNames);
	}
});