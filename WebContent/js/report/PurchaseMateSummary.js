var PurchaseMateSummary = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "采购起始日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[PURCHASE_DATE_BEG]_S",
			value : new Date()
		},  {
			lable : "采购截至日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[PURCHASE_DATE_END]_S",
			value : new Date()
		}, {
			width : 80,
			lable : "采购项目名称",
			name : "Q_[BRIEF_NAME]_S"
		} , {
			width : 80,
			lable : "采购主题",
			name : "Q_[PURCHASE_THEME]_S"
		} ];
	
	PurchaseMateSummary.superclass.constructor.call(this,{
		id : "PurchaseMateSummary",
		title : "采购清单汇总表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_PURCHASE_MATE_SUNMMARY_RPT",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(PurchaseMateSummary, Knight.ux.BaseReportView, {});