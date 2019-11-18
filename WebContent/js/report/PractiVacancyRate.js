var PractiVacancyRate = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	var kindWorkCombo = $initComboBoxField("从业工种", "Q_[KIND_WORK]_S", "kindWork", {
		width : 80,
		lable : "从业工种",
		allowBlank : true
	});
	var maxStatDate = new Date(2079, 5, 5);
	var generalItems = [ {
		lable : "统计时间:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		maxValue : maxStatDate,
		name : "Q_[START_DATE]_S",
		value : new Date()
	}, {
		lable : "至",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		maxValue : maxStatDate,
		name : "Q_[END_DATE]_S",
		value : new Date()
	}, {
		width : 80,
		lable : "人员名称",
		name : "Q_[PRACTI_NAME]_S"
	}, {
		width : 80,
		lable : "岗位",
		name : "Q_[STATION]_S"
	}, kindWorkCombo ];
	PractiVacancyRate.superclass.constructor.call(this, {
		id : "PractiVacancyRate",
		title : "人员闲置率分析表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_PRACTI_VACANCY_RATE",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(PractiVacancyRate, Knight.ux.BaseReportView, {});
