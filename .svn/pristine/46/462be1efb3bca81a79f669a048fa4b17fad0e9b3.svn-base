var EquipSummary = function(a) {
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	this.equipCategoryId = Ext.id();
	
	var generalItems = [{
		xtype : "datacombo",
		width : 75,
		lable : "状态",
		name : "Q_[STATUS]_S",
		store : ["闲置在仓","出仓未启用","在用","停租未入仓","注销","报废"]
	},{
		xtype : "hidden",
		id : this.equipCategoryId,
		name : "Q_[EQUIP_CATEGORY]_S"
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
		lable : "规格型号",
		name : "Q_[EQUIP_SPECIFIC]_S"
	}, {
		width : 80,
		lable : "制造厂家",
		name : "Q_[EQUIP_VENDER]_S"
	}, {
		width : 80,
		lable : "归属仓库",
		name : "Q_[STORE_NAME]_S"
	}, {
		width : 80,
		lable : "当前项目",
		name : "Q_[PROJECT_NAME]_S"
	}];
	EquipSummary.superclass.constructor.call(this, {
		id : "EquipSummary",
		title : "设备汇总表",
		iconCls : "menu-business-equipmargin",
		jasperFile : "REPORT_EQUIP_SUMMARY_RATE",
		search_config : {
			generalItems : generalItems
		},
		base_params : this.params
	});
};
Ext.extend(EquipSummary, Knight.ux.BaseReportView, {});
