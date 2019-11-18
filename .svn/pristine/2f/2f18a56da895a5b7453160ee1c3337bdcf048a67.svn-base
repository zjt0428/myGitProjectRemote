var LogisticsCostSummary = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "发货日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[DELIVERY_DATE_BEG]_S",
			value : new Date()
		},  {
			lable : "发货日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[DELIVERY_DATE_END]_S",
			value : new Date()
		}, {
			width : 80,
			lable : "发货地",
			name : "Q_[SEND_WAREHOUSE_NAME]_S"
		} , {
			width : 80,
			lable : "目的地",
			name : "Q_[RECEIVE_WAREHOUSE_NAME]_S"
		} , {
			width : 80,
			lable : "运输单位",
			name : "Q_[PROPERTY_NAME]_S"
		}];
	
	LogisticsCostSummary.superclass.constructor.call(this,{
		id : "LogisticsCostSummary",
		title : "物流费用汇总表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_LOGISTICS_COST_SUNMMARY_RPT",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(LogisticsCostSummary, Knight.ux.BaseReportView, {});