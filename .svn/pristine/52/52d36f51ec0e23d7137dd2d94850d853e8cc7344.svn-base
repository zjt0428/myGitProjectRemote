var CustomerMargin = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	var generalItems = [ {
		lable : "统计时间:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[START_DATE]_S",
		value : new Date()
	}, {
		lable : "至",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[END_DATE]_S",
		value : new Date()
	}, {
		width : 80,
		lable : "客户名称",
		name : "Q_[CUSTOMER]_S_LK"
	} ];
	CustomerMargin.superclass.constructor.call(this, {
		id : "CustomerMargin",
		title : "客户毛利分析表",
		iconCls : "menu-business-customermargin",
		jasperFile : "REPORT_CUSTOMER_MARGIN",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(CustomerMargin, Knight.ux.BaseReportView, {});
