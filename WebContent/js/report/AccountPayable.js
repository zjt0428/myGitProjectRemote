var AccountPayable = function(a) {
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
		lable : "收款方",
		name : "Q_[ENT_NAME]_S"
	} ];
	AccountPayable.superclass.constructor.call(this, {
		id : "AccountPayable",
		title : "应付款明细表",
		iconCls : "menu-business-accountpayable",
		jasperFile : "REPORT_ACCOUNT_PAYABLE",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(AccountPayable, Knight.ux.BaseReportView, {});