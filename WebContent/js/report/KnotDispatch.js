var KnotDispatch = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "起始时间:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[BEGIN_DATE]_S",
			value : new Date()
		}, {
			lable : "结束时间:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[END_DATE]_S",
			value : new Date()
		}, {
			width : 80,
			lable : "项目名称",
			name :  "Q_[PROJECT_NAME]_S"
		}, {
			width : 80,
			lable : "备案编号",
			name : "Q_[RECORD_ID]_S"
		}, {
			width : 80,
			lable : "出厂编号",
			name : "Q_[EXW_SERIAL]_S"
		} ];
	
	KnotDispatch.superclass.constructor.call(this,{
		id : "KnotDispatch",
		title : "标准节调度情况表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_KNOT_DISPATCH_RPT",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(KnotDispatch, Knight.ux.BaseReportView, {});