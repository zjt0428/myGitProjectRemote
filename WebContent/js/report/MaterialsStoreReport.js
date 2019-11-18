var MaterialsStoreReport = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[DATE_BEG]_S",
			value : new Date(),
			listeners : {
				change : function(a,newValue,oldValue) {
					var b = this.compareDate(newValue,"Q_[DATE_END]_S","startDate");
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
			name : "Q_[DATE_END]_S",
			value : new Date(),
			listeners : {
				change : function(a,newValue,oldValue) {
					var b = this.compareDate(newValue,"Q_[DATE_BEG]_S","endDate");
					if(b) {
						a.setValue(oldValue);
						Ext.Msg.alert("提示","开始日期不能大于结束日期！");
					}
				}.createDelegate(this)
			}
		}, {
			xtype : "relationCompositeField",
			allowBlank : false,
			lable : "仓库名称",
			name : "Q_[DEPOT_NAME]_S",
			relateModule : RelationModule.baseDepotJoinUser.relateModule,
			importhandler : this.importDepotName.createDelegate(this)
		} , {
			width : 80,
			hidden : true,
			name : "Q_[DEPOT_ID]_L"
		} , {
			width : 80,
			lable : "品名",
			name : "Q_[COMMODITY]_S"
		} , {
			width : 80,
			lable : "规格",
			name : "Q_[SPECIFICATIONS]_S"
		}];
	
	MaterialsStoreReport.superclass.constructor.call(this,{
		id : "MaterialsStoreReport",
		title : "基地仓库查询",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_MATERIALS_STORE_QUERY",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(MaterialsStoreReport, Knight.ux.BaseReportView, {
	importDepotName : function(data, fields) {
		this.searchPanel.getForm().findField("Q_[DEPOT_NAME]_S").setValue(data.depotName);
		this.searchPanel.getForm().findField("Q_[DEPOT_ID]_L").setValue(data.depotId);
	}
});