var CashFlowStatement = function(a) {
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
	} ];
	var searchActionItems = [ {
		xtype : "button",
		text : "本月",
		iconCls : "btn-search",
		handler : this.currentMonth.createDelegate(this)
	}, {
		xtype : "button",
		text : "本季度",
		iconCls : "btn-search",
		handler : this.currentSeason.createDelegate(this)
	}, {
		xtype : "button",
		text : "本年度",
		iconCls : "btn-search",
		handler : this.currentYear.createDelegate(this)
	} ];
	CashFlowStatement.superclass.constructor.call(this, {
		id : "CashFlowStatement",
		title : "现金流量表表",
		iconCls : "menu-business-cashflow",
		jasperFile : "REPORT_CASH_FLOW",
		search_config : {
			generalItems : generalItems,
			searchActionItems : searchActionItems
		},
		base_params : this.params
	});
};
Ext.extend(CashFlowStatement, Knight.ux.BaseReportView, {
	currentMonth : function() {
		var se = KnightUtil.date.getCurrentMonth();
		this.searchPanel.getForm().findField("Q_[START_DATE]_S").setValue(se[0]);
		this.searchPanel.getForm().findField("Q_[END_DATE]_S").setValue(se[1]);
		this.searchSubmit();
	},
	currentSeason : function() {
		var se = KnightUtil.date.getCurrentSeason();
		this.searchPanel.getForm().findField("Q_[START_DATE]_S").setValue(se[0]);
		this.searchPanel.getForm().findField("Q_[END_DATE]_S").setValue(se[1]);
		this.searchSubmit();
	},
	currentYear : function() {
		var se = KnightUtil.date.getCurrentYear();
		this.searchPanel.getForm().findField("Q_[START_DATE]_S").setValue(se[0]);
		this.searchPanel.getForm().findField("Q_[END_DATE]_S").setValue(se[1]);
		this.searchSubmit();
	}
});