var EquipUseMateStatistics = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "领用起始日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[PURPOSE_DATE_BEG]_S",
			value : new Date()
		},  {
			lable : "领用截至日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[PURPOSE_DATE_END]_S",
			value : new Date()
		}, {
			width : 80,
			lable : "出厂编号",
			name : "Q_[EXW_SERIAL]_S"
		}, {
			width : 80,
			lable : "备案编号",
			name : "Q_[RECORD_ID]_S"
		} ];
	
	EquipUseMateStatistics.superclass.constructor.call(this,{
		id : "EquipUseMateStatistics",
		title : "设备领用物资统计表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_EQUIP_USE_MATE_STATISTICS_RPT",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(EquipUseMateStatistics, Knight.ux.BaseReportView, {});