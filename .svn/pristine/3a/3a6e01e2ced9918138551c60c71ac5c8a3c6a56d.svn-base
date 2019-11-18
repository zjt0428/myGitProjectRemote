var ReceivedPayments = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	
	var generalItems = [ {
		lable : "月份",
		xtype : "datefield",
		editable : false,
		format : "Ym",
		name : "Q_[YEARMTH_END]_S",
		value : new Date()
	}, {
		width : 80,
		lable : "项目名称",
		name : "Q_[PROJECT_NAME]_S"
	} ];
	ReceivedPayments.superclass.constructor.call(this, {
		id : "ReceivedPayments",
		title : "项目收款明细表",
		iconCls : "menu-business-accountdue",
		jasperFile : "REPORT_RECEIVED_PAYMENTS",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(ReceivedPayments, Knight.ux.BaseReportView, {});