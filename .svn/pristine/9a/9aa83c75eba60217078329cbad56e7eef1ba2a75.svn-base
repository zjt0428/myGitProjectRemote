var EquipmentBalancePayments = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	var relateModuleCombo = $initSimpleComboBoxField("类型", "Q_[RELATE_MODULE]_S", [ [ "0", "收入" ], [ "1", "支出" ] ], {
		width : 80,
		lable : "类型",
		allowBlank : true
	});
	var generalItems = [ {
		lable : "统计时间:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[BEGIN_DATE]_S",
		value : new Date()
	}, {
		lable : "至",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[END_DATE]_S",
		value : new Date()
	}, relateModuleCombo, {
		width : 80,
		lable : "项目名称",
		name : "Q_[PROJECT_NAME]_S"
	}, {
		width : 80,
		lable : "备案编号",
		name : "Q_[RECORD_ID]_S"
	}, {
		width : 80,
		lable : "出厂编号",
		name : "Q_[EXW_SERIAL]_S"
	}, {
		width : 80,
		lable : "经办人",
		name : "Q_[PRACTI_NAME]_S"
	} ];
	EquipmentBalancePayments.superclass.constructor.call(this, {
		id : "EquipmentBalancePayments",
		title : "设备收支明细表",
		iconCls : "menu-business-accountdue",
		jasperFile : "REPORT_EQUIPMENT_BALANCE_PAYMENTS",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(EquipmentBalancePayments, Knight.ux.BaseReportView, {});