var EquipmentInRentRate = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	var generalItems = [ {
		lable : "所属片区",
		name : "Q_[BELONG_TO_AREA]_S"
	}, {
		name : "Q_[EQUIPCATEGORY]_S_EQ",
		lable : "设备类别",
		url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory"
	}
//	, {
//		lable : "统计时间:",
//		xtype : "datefield",
//		editable : false,
//		format : "Ymd",
//		name : "Q_[START_DATE]_S",
//		value : new Date()
//	}, {
//		lable : "至",
//		xtype : "datefield",
//		editable : false,
//		format : "Ymd",
//		name : "Q_[END_DATE]_S",
//		value : new Date()
//	}
	];
	EquipmentInRentRate.superclass.constructor.call(this, {
		id : "EquipmentInRentRate",
		title : "设备在租率表",
		iconCls : "menu-business-equipmargin",
		jasperFile : "REPORT_EQUIPMENT_IN_RENT_RATE",
		search_config : {
			preLableHidden : true,
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(EquipmentInRentRate, Knight.ux.BaseReportView, {});
