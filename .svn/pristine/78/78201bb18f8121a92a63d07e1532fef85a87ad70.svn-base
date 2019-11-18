var EquipMargin = function(a) {
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
		lable : "备案编号",
		name : "Q_[RECORD_ID]_S"
	}, {
		width : 80,
		lable : "项目名称",
		name : "Q_[PROJECT_NAME]_S"
	} ];
	EquipMargin.superclass.constructor.call(this, {
		id : "EquipMargin",
		title : "设备毛利分析表",
		iconCls : "menu-business-equipmargin",
		jasperFile : "REPORT_EQUIP_MARGIN",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(EquipMargin, Knight.ux.BaseReportView, {});
