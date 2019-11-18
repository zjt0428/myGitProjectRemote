var MaterialsInRentDistribution = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "截止日期:",
			xtype : "datefield",
			editable : false,
			format : "Y-m-d",
			name : "Q_queryDate_S",
			value : new Date()
		},{
			width : 80,
			lable : "品名",
			name : "Q_commodity_S"
		},{
			width : 80,
			lable : "规格",
			name : "Q_specifications_S"
		} ];
	
	MaterialsInRentDistribution.superclass.constructor.call(this,{
		id : "MaterialsInRentDistribution",
		title : "租赁物资在租分布",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_MATERIALS_IN_RENT_DISTRIBUTION",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(MaterialsInRentDistribution, Knight.ux.BaseReportView, {
	importDepotId : function(data) {
		this.searchPanel.getForm().findField("Q_depotId_S").setValue(data.depotId);
		this.searchPanel.getForm().findField("Q_depotName_S").setValue(data.depotName);
	}
});