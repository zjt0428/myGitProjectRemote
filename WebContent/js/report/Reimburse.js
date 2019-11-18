var Reimburse = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	var reimburseTypeCombo = $initComboBoxField("费用类别", "Q_[REIMBURSE_TYPE]_S", "reimburseType", {
		width : 80,
		lable : "费用类别",
		allowBlank : true
	});
	var generalItems = [ reimburseTypeCombo, {
		lable : "开始日期",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[TICKET_DATE_BGN]_S"
	}, {
		width : 80,
		lable : "截止日期",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[TICKET_DATE_END]_S"
	}, {
		width : 80,
		lable : "车号",
		name : "Q_[LICENSE_PLATE]_S"
	}, {
		width : 80,
		lable : "报销人员",
		name : "Q_[PRACTI_NAME]_S"
	} ];
	Reimburse.superclass.constructor.call(this, {
		id : "Reimburse",
		title : "报销费用明细",
		iconCls : "menu-business-accountdue",
		jasperFile : "REPORT_REIMBURSE",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(Reimburse, Knight.ux.BaseReportView, {});