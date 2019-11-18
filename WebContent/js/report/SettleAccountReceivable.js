var SettleAccountReceivable = function(a) {
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
	} ];
	SettleAccountReceivable.superclass.constructor.call(this, {
		id : "SettleAccountReceivable",
		title : "应收款明细表",
		iconCls : "menu-business-accountdue",
		jasperFile : "REPORT_SETTLE_ACCOUNT_RECEIVABLE",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(SettleAccountReceivable, Knight.ux.BaseReportView, {});