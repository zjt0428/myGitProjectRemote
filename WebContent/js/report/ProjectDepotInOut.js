var ProjectDepotInOut = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var operationWayData = new Ext.data.SimpleStore({
		fields : [ "code", "name" ],
		data : [["1","初始化"],["2","正常出租"],["3","项目间调拨入库"],["4","租借出租"],["5","正常回收"],["6","丢失赔偿出库"],["7","项目间调拨出库"],["8","退货管理"],
		        ["9","项目维修出库"],["10","项目维修入库"],["11","租借维修出库"],["12","租借维修入库"]]
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
//			lable : "项目id",
			name : "Q_contractIds_S"
		}, 	{
			width : 80,
			lable : "品名",
			name : "Q_commodity_S"
		} , {
			width : 80,
			lable : "规格",
			name : "Q_specifications_S"
		},operationWayCombo];
	
	ProjectDepotInOut.superclass.constructor.call(this,{
		id : "ProjectDepotInOut",
		title : "项目库存查询",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_PROJECT_MATERIALS_STORE_QUERY",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(ProjectDepotInOut, Knight.ux.BaseReportView, {
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