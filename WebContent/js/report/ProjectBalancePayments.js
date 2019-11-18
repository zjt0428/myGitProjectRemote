var ProjectBalancePayments = function(a) {
	this.params = {};
	
	Ext.apply(this.params, (a && a.params) || {});
	var generalItems = [ {
		lable : "项目名称:",
		name : "Q_[PROJECT_NAME]_S",
	} ];
	ProjectBalancePayments.superclass.constructor.call(this, {
		id : "ProjectBalancePayments",
		title : "项目收支明细表",
		iconCls : "menu-business-equipmargin",
		jasperFile : "REPORT_PROJECT_BALANCE_PAYMENTS",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(ProjectBalancePayments, Knight.ux.BaseReportView, {});
