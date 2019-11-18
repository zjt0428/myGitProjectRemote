var AccountDue = function(a) {
	this.params = {};
	this.params["Q_[CORP_NAME]_S"] = __companyName;
	Ext.apply(this.params, (a && a.params) || {});
	var generalItems = [ {
		lable : "统计截止时间:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[END_DATE]_S",
		value : new Date()
	}, {
		width : 80,
		lable : "客户名称",
		name : "Q_[ENT_NAME]_S"
	}, {
		width : 80,
		lable : "销售人员",
		name : "Q_[SALESMAN]_S"
	} ];
	AccountDue.superclass.constructor.call(this, {
		id : "AccountDue",
		title : "应收款明细表",
		iconCls : "menu-business-accountdue",
		jasperFile : "REPORT_ACCOUNT_DUE",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(AccountDue, Knight.ux.BaseReportView, {});