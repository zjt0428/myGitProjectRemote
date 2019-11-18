var RentalFeeApplication = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	var genericCombo = $initComboBoxField("设备名称", "Q_[EQUIP_GENERIC]_S", "equipGeneric", {
		width : 100,
		lable : "设备名称",
		allowBlank : true
	});
	var specificCombo = $initComboBoxField("规格型号", "Q_[EQUIP_SPECIFIC]_S", "equipSpecific", {
		width : 100,
		lable : "规格型号",
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
	}, genericCombo, specificCombo, {
		width : 100,
		lable : "备案编号",
		name : "Q_[RECORD_ID]_S"
	} ];
	RentalFeeApplication.superclass.constructor.call(this, {
		id : "RentalFeeApplication",
		title : "设备在用明细表",
		iconCls : "menu-business-equipmargin",
		jasperFile : "REPORT_RENTAL_FEE_APPLICATION",
		search_config : {
			preLableHidden : true,
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(RentalFeeApplication, Knight.ux.BaseReportView, {});
