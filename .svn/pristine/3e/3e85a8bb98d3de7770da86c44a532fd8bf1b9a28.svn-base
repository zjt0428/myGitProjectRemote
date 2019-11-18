var AccountReceivable = function(a) {
	this.params = {};
	this.params["Q_[CORP_NAME]_S"] = __companyName;
	Ext.apply(this.params, (a && a.params) || {});
	AccountReceivable.superclass.constructor.call(this, {
		id : "AccountReceivable",
		title : "应收款明细表",
		params : this.params
	});
};
Ext.extend(AccountReceivable, SettleAccountReceivable, {});