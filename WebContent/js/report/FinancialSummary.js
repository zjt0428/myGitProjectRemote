var FinancialSummary = function(a) {
	this.params = {};
	this.params["Q_[CORP_NAME]_S"] = __companyName;
	Ext.apply(this.params, (a && a.params) || {});
	this.yearComboId = Ext.id();
	this.monthComboId = Ext.id();

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
		id : this.yearComboId,
		width : 60,
		xtype : "combo",
		lable : "年份",
		mode : "local",
		editable : true,
		triggerAction : "all",
		store : [ "", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025" ]
	}, {
		id : this.monthComboId,
		width : 60,
		xtype : "combo",
		lable : "月份",
		mode : "local",
		editable : true,
		triggerAction : "all",
		store : [ "", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ]
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

	FinancialSummary.superclass.constructor.call(this, {
		id : "FinancialSummary",
		title : "财务总表",
		iconCls : "menu-business-financial",
		jasperFile : "REPORT_FINANCIAL",
		search_config : {
			generalItems : generalItems,
			searchActionItems : searchActionItems
		},
		base_params : this.params
	});
};
Ext.extend(FinancialSummary, Knight.ux.BaseReportView, {
	searchSubmit : function() {
		var yearField = Ext.getCmp(this.yearComboId);
		var monthField = Ext.getCmp(this.monthComboId);
		if (Ext.isEmpty(yearField.getValue())) {
			FinancialSummary.superclass.searchSubmit.call(this);
			return;
		}
		var ranges = new Array();
		if (Ext.isEmpty(monthField.getValue())) {
			ranges[0] = new Date(yearField.getValue(), 0, 1);
			ranges[1] = new Date(yearField.getValue(), 11, 31);
		} else {
			var shortcut = yearField.getValue() + monthField.getValue();
			ranges = KnightUtil.date.getMonthStartStop(Date.parseDate(shortcut, "Ym"));
		}
		this.searchPanel.getForm().findField("Q_[START_DATE]_S").setValue(ranges[0]);
		this.searchPanel.getForm().findField("Q_[END_DATE]_S").setValue(ranges[1]);
		FinancialSummary.superclass.searchSubmit.call(this);
	},
	currentMonth : function() {
		var se = KnightUtil.date.getCurrentMonth();
		this.searchPanel.getForm().findField("Q_[START_DATE]_S").setValue(se[0]);
		this.searchPanel.getForm().findField("Q_[END_DATE]_S").setValue(se[1]);
		FinancialSummary.superclass.searchSubmit.call(this);
	},
	currentSeason : function() {
		var se = KnightUtil.date.getCurrentSeason();
		this.searchPanel.getForm().findField("Q_[START_DATE]_S").setValue(se[0]);
		this.searchPanel.getForm().findField("Q_[END_DATE]_S").setValue(se[1]);
		FinancialSummary.superclass.searchSubmit.call(this);
	},
	currentYear : function() {
		var se = KnightUtil.date.getCurrentYear();
		this.searchPanel.getForm().findField("Q_[START_DATE]_S").setValue(se[0]);
		this.searchPanel.getForm().findField("Q_[END_DATE]_S").setValue(se[1]);
		FinancialSummary.superclass.searchSubmit.call(this);
	}
});