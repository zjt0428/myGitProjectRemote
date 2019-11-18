var SparePartsList = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[{
		lable : "借用日期:",
		xtype : "datefield",
		editable : false,
		format : "Ymd",
		name : "Q_[BORROW_DATE_BEG]_S"
	},  {
		lable : "至:",
		xtype : "datefield",
		editable : false,
		format : "Ymd",
		name : "Q_[BORROW_DATE_END]_S"
	},{
		xtype : "datacombo",
		width : 75,
		lable : "借用类别",
		name : "Q_[BORROW_TYPE]_S",
		store : ["借出","借进"]
	}, {
		width : 80,
		lable : "借入单位",
		name : "Q_[INRELATE_NAME]_S"
	}, {
		width : 80,
		lable : "借出单位",
		name : "Q_[OUTRELATE_NAME]_S"
	}, {
		width : 80,
		lable : "归属设备",
		name : "Q_[EXW_SERIAL]_S"
	}, {
		width : 80,
		lable : "配件名称",
		name : "Q_[COMPON_GENERIC_NAME]_S"
	}, {
		width : 80,
		lable : "配件规格",
		name : "Q_[DIMENSIONS]_S"
	}];
	
	SparePartsList.superclass.constructor.call(this,{
		id : "SparePartsList",
		title : "借用零配件明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_SPARE_PARTS_LIST_RPT",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(SparePartsList, Knight.ux.BaseReportView, {});