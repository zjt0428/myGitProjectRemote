var MaterialsHandingChargeReport = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
//	表码
//	var feesTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
//		codeId : "feesType"
//	});
	var feesTypeData = new Ext.data.SimpleStore({
		fields : [ "code", "name" ],
		data : [[1,"装车费"],[2,"卸车费"],[3,"打包费"]]
	});
	var feesTypeCombo = $initSimpleComboBoxField("收费","Q_feesType_S",feesTypeData,{
		width : 70,
		editable : true,
		allowBlank : true,
		lable : "收费类型",
		valueField : "name",
		displayField : "name"
	});
	var paymentTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do ", {
		codeId : "paymentType"
	});
	var paymentTypeCombo = $initSimpleComboBoxField("收费方式","Q_chargeWay_S",paymentTypeData,{
		width : 70,
		lable : "收费方式",
		editable : true,
		allowBlank : true
	});
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
			xtype : "relationCompositeField",
			width : 80,
			allowBlank : true,
			lable : "收费仓库",
			name : "Q_depotName_S",
			relateModule : RelationModule.baseDepot.relateModule,
			importhandler : this.importDepotId.createDelegate(this)
		}, 	{
			hidden : true,
			width : 80,
			name : "Q_depotId_N"
		}, 	{
			width : 80,
			lable : "合同编号",
			name : "Q_contractSerial_S"
		},feesTypeCombo, paymentTypeCombo];
	
	MaterialsHandingChargeReport.superclass.constructor.call(this,{
		id : "MaterialsHandingChargeReport",
		title : "租赁物资装卸费",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_MATERIALS_HANDING_CHARGE_REPORT",
		search_config : {
			preLableHidden : true,
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(MaterialsHandingChargeReport, Knight.ux.BaseReportView, {
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