var EquipOutputValueDetail = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	Ext.apply(this, {
		practiDepartmentId : Ext.id()
	});
	
	var generaltems = [ {
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
		single : false,
		readOnly : true,
		collectEnable : true,
		params : {
			"Q_applyforState_S_GE" : 3
		},
		relateModule : RelationModule.project.relateModule,
		fields : ["Q_projectName_S", "Q_projectIds_S"],
		cleanhandler : this.cleanMultiField.createDelegate(this),
		importhandler : this.importContractId.createDelegate(this)
	}, {
		hidden : true,
		width : 80,
		name : "Q_projectIds_S"
	}, {
		xtype : "relationCompositeField",
		allowBlank : true,
		lable : "承租方",
		readOnly : true,
		name : "Q_paEntName_S",
		editable : false,
		relateModule : RelationModule.customer.relateModule,
		fields : ["Q_paEntName_S", "Q_paEnt_L"],
		importhandler : this.importPaRelationArchives.createDelegate(this),
		cleanhandler : this.cleanMultiField.createDelegate(this)
	}, {
		hidden : true,
		width : 80,
		name : "Q_paEnt_L"
	}, {
		id : Ext.id(),
		xtype : "treecombo",
		valId : this.practiDepartmentId,
		width : 130,
		lable : "所属部门",
		url : __ctxPath + "/system/listDepartment.do?opt=appUser",
		name : "Q_depName_S"
	}, {
		xtype : "hidden",
		id : this.practiDepartmentId,
		name : "Q_depId_L"
	} ];

	EquipOutputValueDetail.superclass.constructor.call(this,{
		id : "EquipOutputValueDetail",
		title : "设备产值明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_EQUIP_OUTPUT_VALUE_DETAIL",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(EquipOutputValueDetail, Knight.ux.BaseReportView, {
	importContractId : function(data) {
		var projectIds = "";
		var projectNames = "";
		for(var i=0;i<data.length;i++) {
			projectIds = projectIds.concat(data[i].data.projectId);
			projectNames = projectNames.concat(data[i].data.projectName);
			if(i==data.length-1) {
				break;
			}
			projectIds = projectIds.concat(",");
			projectNames = projectNames.concat(",");
		}
		this.searchPanel.getForm().findField("Q_projectIds_S").setValue(projectIds);
		this.searchPanel.getForm().findField("Q_projectName_S").setValue(projectNames);
	},
	importPaRelationArchives : function(data) {
		this.searchPanel.getForm().findField("Q_paEntName_S").setValue(data.customerName);
		this.searchPanel.getForm().findField("Q_paEnt_L").setValue(data.customerId);
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
		var  projectIds = this.searchPanel.getForm().findField("Q_projectIds_S").getValue();
		var  projectName = this.searchPanel.getForm().findField("Q_projectName_S").getValue();
		var  startDate = this.searchPanel.getForm().findField("Q_startDate_S").getValue();
		var  endDate = this.searchPanel.getForm().findField("Q_endDate_S").getValue();
		
		new LostCompensationDetailWin({
			params : {
				projectIds : projectIds,
				projectName : projectName,
				startDate : startDate,
				endDate : endDate
			},
			jasperFile : jasperFile
		}).show();
	}
});