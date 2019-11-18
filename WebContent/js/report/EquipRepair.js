var EquipRepair = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
//	var specificCombo = $initComboBoxField("规格型号", "Q_[EQUIP_SPECIFIC]_S", "equipSpecific", {
//		width : 100,
//		lable : "规格型号",
//		allowBlank : true
//	});
	var maxStatDate = new Date(2079, 5, 5);
	var generalItems = [ {
		lable : "维修日期:",
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
		width : 100,
		lable : "项目名称",
		name : "Q_[PROJECT_NAME]_S"
	}, {
		width : 100,
		lable : "出厂编号",
		name : "Q_[EXW_SERIAL]_S"
	} ];
	EquipRepair.superclass.constructor.call(this, {
		id : "EquipRepair",
		title : "设备维修统计表",
		iconCls : "menu-business-equipmargin",
		jasperFile : "REPORT_EQUIP_REPAIR",
		search_config : {
			preLableHidden : true,
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(EquipRepair, Knight.ux.BaseReportView, {});
