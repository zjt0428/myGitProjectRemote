var UseMateDetail = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "领用起始日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[USE_DATE_BEG]_S",
			value : new Date()
		},  {
			lable : "领用截至日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[USE_DATE_END]_S",
			value : new Date()
		}, {
			width : 80,
			lable : "配件名称",
			name : "Q_[COMPON_GENERIC]_S"
		}, {
			width : 80,
			lable : "领用人",
			name : "Q_[RECIPIENTS]_S"
		} , {
			width : 80,
			lable : "项目名称",
			name : "Q_[PROJECT_NAME]_S"
		} , {
			width : 80,
			lable : "出厂编号",
			name : "Q_[EXW_SERIAL]_S"
		}  , {
			width : 80,
			lable : "领用用途",
			name : "Q_[PICKUP_PURPOSE]_S"
		}];
	
	UseMateDetail.superclass.constructor.call(this,{
		id : "UseMateDetail",
		title : "领用物资明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_USE_MATE_DETAIL_RPT",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(UseMateDetail, Knight.ux.BaseReportView, {});