var UsePurposeSummary = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "领用起始日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[PURPOSE_DATE_BEG]_S",
			value : new Date()
		},  {
			lable : "领用截至日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[PURPOSE_DATE_END]_S",
			value : new Date()
		}, {
			width : 80,
			lable : "领用物资名称",
			name : "Q_[GENERIC_NAME]_S"
		}, {
			width : 80,
			lable : "领用用途",
			name : "Q_[PURPOSE_NAME]_S"
		}];
	
	UsePurposeSummary.superclass.constructor.call(this,{
		id : "UsePurposeSummary",
		title : "领用用途汇总表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_USE_PURPOSE_SUMMARY_RPT",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(UsePurposeSummary, Knight.ux.BaseReportView, {});