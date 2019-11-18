var MaterialsGeneralLedger = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	
	var generaltems =[{
		lable : "查询截止日期:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[END_DATE]_S"
	}, {
		lable : "品名",
		name : "Q_[COMMODITY]_S"
	}, {
		lable : "规格",
		name : "Q_[SPECIFICATIONS]_S"
	}]
	
	MaterialsGeneralLedger.superclass.constructor.call(this, {
		id : "MaterialsGeneralLedger",
		title : "周材总账查询",
		jasperFile : "REPORT_MATERIALS_GENERAL_LEDGER",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
}
Ext.extend(MaterialsGeneralLedger, Knight.ux.BaseReportView, {});