var AutoCraneCost = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[DATE_BEG]_S",
			value : new Date()
		},  {
			lable : "至:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[DATE_END]_S",
			value : new Date()
		}, {
			width : 80,
			lable : "项目名称",
			name : "Q_[PROJECT_NAME]_S"
		} , {
			width : 80,
			lable : "汽吊类型",
			name : "Q_[CRANE_TYPE]_S"
		} , {
			width : 80,
			lable : "吊运公司",
			name : "Q_[CRANE_COMPANY]_S"
		}];
	
	AutoCraneCost.superclass.constructor.call(this,{
		id : "TruckCraneCost",
		title : "汽车吊费用明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_AUTO_CRANE_COST_RPT",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(AutoCraneCost, Knight.ux.BaseReportView, {});